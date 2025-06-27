// src/components/DeleteProduct.jsx
import axios from "axios";

function DeleteProduct({ id, onDelete }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Call parent's update function to remove item from UI
        onDelete(id);
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("❌ Delete failed:", err);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h12M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
        />
      </svg>
      <span>Delete</span>
    </button>
  );
}

export default DeleteProduct;
