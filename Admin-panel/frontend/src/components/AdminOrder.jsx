// Updated AdminOrders.jsx with paymentMethod display

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders, updateOrderStatus } from "../store/adminOrderSlice";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const ordersPerPage = 5;

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const filteredOrders = orders
    .filter(
      (order) =>
        order.shippingInfo.name.toLowerCase().includes(search.toLowerCase()) ||
        order.shippingInfo.phone.includes(search)
    )
    .filter((order) =>
      statusFilter === "All" ? true : order.status === statusFilter
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMarkCompleted = async (orderId) => {
    try {
      setUpdatingId(orderId);
      await dispatch(updateOrderStatus(orderId)).unwrap();
      toast.success("Order marked as Completed ✅");
    } catch (error) {
      toast.error(`Failed to update: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
        🗂️ Admin Orders
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by customer or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-green-600 font-medium">
          Loading orders...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">Error: {error}</p>
      ) : currentOrders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow-sm bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-green-500 text-white text-xs uppercase">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th> {/* Added Payment column */}
                <th className="p-3">Items</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-green-50 transition"
                >
                  <td className="p-3">{indexOfFirstOrder + index + 1}</td>
                  <td className="p-3">{order.shippingInfo.name}</td>
                  <td className="p-3">{order.shippingInfo.phone}</td>
                  <td className="p-3 truncate max-w-[120px]">
                    {order.shippingInfo.address}
                  </td>
                  <td className="p-3 font-semibold text-green-700">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-3 font-medium text-blue-700">
                    {order.paymentMethod} {/* Display paymentMethod */}
                  </td>
                  <td className="p-3 space-y-1">
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="text-gray-700">
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    <span className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-3">
                    {order.status === "Pending" ? (
                      <button
                        onClick={() => handleMarkCompleted(order._id)}
                        disabled={updatingId === order._id}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                          updatingId === order._id
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {updatingId === order._id
                          ? "Updating..."
                          : "Mark as Completed"}
                      </button>
                    ) : (
                      <span className="text-green-600 text-xs font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
