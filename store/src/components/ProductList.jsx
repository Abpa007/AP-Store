import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice"; // Removed .jsx extension

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setError("Invalid product data format.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load products. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        🛍️ Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-56 object-cover transition-transform duration-200 hover:scale-105"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {p.name}
                  </h2>
                  <p className="text-green-600 font-bold text-xl mt-1">
                    ₹{p.price}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full py-2 px-4 bg-green-600 text-white font-semibold hover:bg-green-700 shadow-lg transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m6-9v9m-4-4h4"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
