const Order = require("./order.model");
const RealUser = require("../real-user/real-user.model");
const Book = require("../books/book.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body.content);
    const user = await RealUser.findOne({ uid: req.body.userUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    newOrder.realUser = user._id;
    const savedOrder = await newOrder.save();

    user.orders.push(savedOrder._id);
    await user.save();

    return res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const orders = await Order.find({ email })
      .sort({ createdAt: -1 })
      .populate("productIds"); 

    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
};
