import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchMyOrders, cancelOrder } from "../store/OrderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err || "Failed to cancel order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow-sm flex flex-col gap-2 bg-white"
            >
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>Amount Paid:</strong> ₹{order.totalAmount}
              </div>
              <div>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Shipping Address:</strong> {order.shippingInfo.address}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="list-disc ml-5">
                  {order.cartItems.map((item) => (
                    <li key={item._id}>
                      {item.name} x {item.quantity} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              {order.status === "Pending" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-fit"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
