// 🚀 FULL CLEAN IMPLEMENTATION OF SEPARATE PAYMENT FLOW

// 1️⃣ Checkout Page - Collect Shipping Details
// src/pages/Checkout.jsx

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill all shipping details.");
      return;
    }
    navigate("/payment", {
      state: {
        shippingInfo,
        cartItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🚚 Checkout - Shipping Details
      </h2>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingInfo.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleContinueToPayment}
          className="bg-green-600 text-white w-full py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
