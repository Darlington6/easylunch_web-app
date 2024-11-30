const mongoose = require("mongoose");
const OrderItem = require("./OrderItem.model");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  totalPrice: { type: Number, required: true, default: 0 },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Complete", "Delivered"],
    default: "Pending",
  },
});

// Pre-save hook to calculate total price
orderSchema.pre("save", async function (next) {
  const order = this;
  const items = await OrderItem.find({ _id: { $in: order.items } });
  order.totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
