import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // ✅ Remove deleted product from UI without refetching
  const removeProductFromUI = (id) => {
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

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

  if (error) {
    return (
      <p className="text-red-600 p-4 font-semibold text-center">{error}</p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header and Add Product Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <Link
          to="/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          + Add Product
        </Link>
      </div>

      {/* Product List or Empty State */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-10 text-lg">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-lg transition duration-200"
            >
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded-xl"
              />
              <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
              <p className="text-green-600 font-medium mb-4">₹{p.price}</p>

              <div className="flex justify-between items-center text-sm mt-auto">
                {/* Edit Button */}
                <Link
                  to={`/products/edit/${p._id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 14H9v-2.828z"
                    />
                  </svg>
                  Edit
                </Link>

                {/* Delete Button Component */}
                <DeleteProduct
                  id={p._id}
                  onDelete={removeProductFromUI}
                  customClass="text-red-600 hover:text-red-800 font-medium transition flex items-center gap-1"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
