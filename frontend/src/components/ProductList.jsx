// src/components/DeleteProduct.jsx
import axios from "axios";

function DeleteProduct({ id, onDelete }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product deleted");
      onDelete(); // callback to refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-2 inline-block text-sm text-red-600 hover:underline ml-4"
    >
      Delete
    </button>
  );
}

export default DeleteProduct;
