import Order from "../../model/orderModel/orderModel.js";

// @desc Create new order
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      return res
        .status(400)
        .json({ message: "Incomplete shipping information" });
    }

    const newOrder = new Order({
      cartItems,
      shippingInfo,
      totalAmount,
      status: "Pending", // ✅ Explicitly set status to Pending on creation
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

// @desc Fetch all orders
// @route GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// @desc Update order status (Pending -> Completed)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || "Completed"; // default to "Completed" if not provided
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
