const Product = require("../models/Product.model");
const OrderItem = require("../models/OrderItem.model");
const Order = require("../models/Order.model");

const createProduct = async (req, res) => {
  // TODO: get the product data from the body object
  // TODO: validate the product data
  // TODO: save the product data to the database
  const { name, price } = req.body;
  const product = await Product.findOne({ name });
  if (product) {
    return res.status(400).json({ message: "Product already exists" });
  }
  const newProduct = new Product({
    name,
    price,
  });
  await newProduct.save();
  res.status(201).json({ message: "Product created successfully", newProduct });
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price } = req.body;
  const product = await Product.findByIdAndUpdate(
    productId,
    { name, price },
    { new: true }
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({
    message: "Product updated successfully",
    updatedProduct: product,
  });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await ProductItem.deleteMany({ productId }); // delete associated order items
  res.json({ message: "Product deleted successfully" });
};

const createOrderItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validate request body
    if (!productId || !quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid product ID or quantity" });
    }

    // Fetch the product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new order item with the product details and price
    const newOrderItem = new OrderItem({
      product: product._id,
      quantity,
      price: product.price, // Store the product's price in the order item
    });

    // Save the order item to the database
    await newOrderItem.save();

    res.status(201).json({
      message: "Order item created successfully",
      orderItem: newOrderItem,
    });
  } catch (error) {
    console.error("Error creating order item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order item" });
  }
};

const getOrderItems = async (req, res) => {
  try {
    // Retrieve all order items and populate the product details
    const orderItems = await OrderItem.find({})
      .populate("product", "name price") // Populate product details (name and price only)
      .exec();

    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error retrieving order items:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching order items" });
  }
};

const getOrderItemsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    // Validate the productId format
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find order items by product ID and populate product details
    const orderItems = await OrderItem.find({ product: productId })
      .populate("product", "name price") // Populate product details
      .exec();

    // Check if any order items exist for the product
    if (!orderItems.length) {
      return res
        .status(404)
        .json({ message: "No order items found for this product" });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error retrieving order items by product ID:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching order items" });
  }
};

const updateOrderItem = async (req, res) => {
  const { productId, orderId } = req.params;
  const { quantity } = req.body;

  try {
    // Validate that the quantity is a positive number
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero" });
    }

    // Find the order item by orderId and update the quantity
    const orderItem = await OrderItem.findByIdAndUpdate(
      orderId,
      { quantity },
      { new: true }
    ).populate("product", "name price"); // Populate the product details

    // If order item does not exist
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    // Optionally, update the price if required (assuming price is static based on the product)
    if (orderItem.product._id.toString() === productId) {
      orderItem.price = orderItem.product.price * orderItem.quantity;
    }

    // Save the updated order item
    await orderItem.save();

    res.status(200).json({
      message: "Order item updated successfully",
      updatedOrderItem: orderItem,
    });
  } catch (error) {
    console.error("Error updating order item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the order item" });
  }
};

const deleteOrderItem = async (req, res) => {
  const { productId, orderId } = req.params;

  try {
    // Find and delete the order item based on productId and orderId
    const orderItem = await OrderItem.findOneAndDelete({
      product: productId,
      _id: orderId,
    });

    // If the order item was not found
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error("Error deleting order item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the order item" });
  }
};

const createOrder = async (req, res) => {
  const { userId, items } = req.body; // Assuming items is an array of { productId, quantity }

  try {
    // Step 1: Create order items first
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      // Create an order item for each product in the order
      const newOrderItem = new OrderItem({
        product: item.productId,
        quantity: item.quantity,
        price: product.price, // Store the product price in the order item
      });

      await newOrderItem.save();
      orderItems.push(newOrderItem._id); // Push the order item ID to be used in the order
    }

    // Step 2: Create the order with the calculated total price
    const order = new Order({
      user: userId,
      items: orderItems, // List of order item IDs
      totalPrice: 0, // Default value, will be updated by pre-save hook
    });

    // Step 3: Save the order (pre-save hook will calculate totalPrice)
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order" });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find and delete the order by ID
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optionally, we could also delete associated OrderItems if needed
    // However, this is not required here, as OrderItems may be referenced by other orders.

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the order" });
  }
};

module.exports = {
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
};
