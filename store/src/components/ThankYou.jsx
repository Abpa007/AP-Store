import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Thank You!</h1>
      <p className="text-gray-700 mb-6">
        Your order has been placed successfully. We appreciate your purchase!
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
      >
        Return to Products
      </button>
    </div>
  );
};

export default ThankYou;
