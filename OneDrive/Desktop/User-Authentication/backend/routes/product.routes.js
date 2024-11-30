const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createOrderItem,
  getOrderItems,
  getOrderItemsByProductId,
  updateOrderItem,
  deleteOrderItem,
  createOrder,
  deleteOrder,
} = require("../controllers/product.controller.js");
const jwtValidate = require("../config/jwtValidate.js");
const {
  ValidateUserOnJwt,
  ValidateAdminPre,
  ValidateStaffPre,
  canDeleteOrder,
} = require("../config/jwtValidate");

const router = express.Router();

// Product routes
router.post("/products", ValidateStaffPre, createProduct); // Create a product
router.get("/products", getProducts); // Get all products
router.get("/products/:productId", getProductById); // Get a product by its ID
router.put("/products/:productId", ValidateStaffPre, updateProduct); // Update product details
router.delete("/products/:productId", ValidateStaffPre, deleteProduct); // Delete a product

// OrderItem routes
router.post("/order-items", createOrderItem); // Create an order item
router.get("/order-items", ValidateStaffPre, getOrderItems); // Get all order items
router.get("/order-items/product/:productId", getOrderItemsByProductId); // Get order items by product ID
router.put("/order-items/:orderId", ValidateStaffPre, updateOrderItem); // Update an order item
router.delete("/order-items/:orderId", ValidateStaffPre, deleteOrderItem); // Delete an order item

// Order routes
router.post("/orders", createOrder); // Create an order
router.delete("/orders/:orderId", canDeleteOrder, deleteOrder); // Delete an order

module.exports = router;
