import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white rounded-lg shadow p-4"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: ₹{totalAmount}
          </div>

          <button
            onClick={() => alert("Checkout feature coming soon!")}
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg mt-4 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
