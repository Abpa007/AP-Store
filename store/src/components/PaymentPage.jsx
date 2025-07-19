import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../store/OrderSlice";
import { clearCart } from "../store/CartSlice";
import { useState } from "react";

const PaymentPage = () => {
  const { state } = useLocation();
  const { shippingInfo, cartItems, totalAmount } = state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingInfo || !cartItems) {
    navigate("/checkout");
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setLoading(true);
    try {
      await dispatch(
        createOrder({ cartItems, shippingInfo, totalAmount, paymentMethod })
      ).unwrap();
      dispatch(clearCart());
      navigate("/thank-you");
    } catch (error) {
      alert(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">💳 Payment</h2>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <p className="text-gray-700 font-medium">
          Total Amount: <span className="font-bold">₹{totalAmount}</span>
        </p>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="QR"
            checked={paymentMethod === "QR"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Pay via QR Code</span>
        </label>

        {paymentMethod === "QR" && (
          <div className="text-center mt-4">
            <img
              src="/qr-code.jpg"
              alt="QR Code"
              className="w-48 h-48 mx-auto"
            />
            <p className="text-sm text-gray-700 mt-2">
              Please scan and complete payment, then send receipt to
              <span className="font-bold"> WhatsApp 9406969849 </span>
              for confirmation.
            </p>
          </div>
        )}

        {paymentMethod === "COD" && (
          <p className="text-sm text-gray-700 mt-2">
            We will send a confirmation message on your registered number after
            placing your COD order.
          </p>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full py-3 rounded font-semibold text-white transition ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Placing Order..." : "Confirm and Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
