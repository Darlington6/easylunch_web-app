const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Product Model

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
