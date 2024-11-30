const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }, // Store the price for the specific order
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
