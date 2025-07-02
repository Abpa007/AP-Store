import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
            >
              {/* Product Image */}
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Price:</span> ₹{item.price}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Subtotal:</span> ₹
                  {item.price * item.quantity}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Amount and Checkout */}
          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
