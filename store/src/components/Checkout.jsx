import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../store/OrderSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill all shipping details.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        createOrder({ cartItems, shippingInfo, totalAmount })
      ).unwrap();
      alert("✅ Order placed successfully!");
      dispatch(clearCart());
      navigate("/products");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛍️ Checkout
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.quantity * item.price}</span>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingInfo.name}
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-green-200"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-green-200"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`mt-6 w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white py-3 rounded transition font-semibold`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
