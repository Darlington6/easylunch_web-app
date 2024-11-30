const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.model");
const OrderItem = require("../models/OrderItem.model");
const Order = require("../models/Order.model");

dotenv.config();
SECRET = process.env.JWT_SECRET;

const getUsers = (req, res) => {};
const registerUsers = (req, res) => {};
const login = async (req, res) => {
  const { email, password } = req.body;

  // TODO: check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // TODO: check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (isMatch) {
    // TODO: generate a JWT token and send it as a response
    const token = jwt.sign({ userId: user._id, userRole: user.role }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "login successful", token: token });
  }
};
const register = async (req, res) => {
  // TODO: get the user data from the body object
  const { username, email, password } = req.body;

  // TODO: check if the user is already registered
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  // TODO: validate the user data
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  const userWithoutPassword = await User.findOne({ email }).select("-password");
  res.status(201).json({
    message: "User registered successfully",
    user: userWithoutPassword,
  });

  // TODO: hash the password

  // TODO: save the user data to the database
};


// exportt the functions
module.exports = { getUsers, registerUsers, login, register };
