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
      className="text-red-600 text-sm hover:underline"
    >
      Delete
    </button>
  );
}

export default DeleteProduct;
