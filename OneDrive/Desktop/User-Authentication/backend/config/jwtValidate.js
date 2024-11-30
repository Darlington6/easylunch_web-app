const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const dotenv = require("dotenv");

dotenv.config();

const ValidateUserOnJwt = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach user data to the request object
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in JWT validation middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = ValidateUserOnJwt;

const ValidateAdminPre = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    if (req.user.userRole === "Admin") {
      next();
    }
  });
};

const ValidateStaffPre = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    if (req.user.userRole === "STAFF") {
      next();
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }
  });
};

const canDeleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params; // Extract the orderId from request params
    const userId = req.user.userId; // Assuming `req.user` is populated from the JWT middleware

    // Fetch the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.user.toString() === userId) {
      return next(); // Allow deletion
    }

    // Check if the user has the 'staff' role
    if (req.user.userRole === "STAFF") {
      if (order.status === "Delivered") {
        return next(); // Allow deletion
      } else {
        return res.status(403).json({
          message: "Staff can only delete orders with a 'Delivered' status",
        });
      }
    }

    // If none of the conditions are met
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this order" });
  } catch (error) {
    console.error("Error in canDeleteOrder middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  ValidateUserOnJwt,
  ValidateAdminPre,
  ValidateStaffPre,
  canDeleteOrder,
};
