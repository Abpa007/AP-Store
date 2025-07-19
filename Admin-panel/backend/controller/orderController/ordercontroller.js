import Order from "../../model/orderModel/orderModel.js";

// Create new order
// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, totalAmount, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      return res.status(400).json({ message: "Incomplete shipping information" });
    }
    if (!paymentMethod || !["COD", "QR"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method. Choose COD or QR." });
    }

    const newOrder = new Order({
      cartItems,
      shippingInfo,
      totalAmount,
      paymentMethod,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Fetch all orders
// GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status
// PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || "Completed";
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
