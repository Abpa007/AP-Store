import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
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
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    fetchProducts();
  }, [navigate]);

  if (error) {
    return <p className="text-red-600 p-4 font-semibold">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-green-600 font-medium">₹{p.price}</p>

              {/* ✅ Edit Button */}
              <Link
                to={`/products/edit/${p._id}`}
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/products/delete/${p._id}`}
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
