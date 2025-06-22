import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // old image name
  const [newImage, setNewImage] = useState(null); // new file selected

  // 🔄 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const p = res.data.data;
        setName(p.name);
        setPrice(p.price);
        setImage(p.image);
      } catch {
        alert("Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Submit form with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (newImage) {
      formData.append("image", newImage); // new file
    } else {
      formData.append("image", image); // existing image name
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated");
      navigate("/products");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Edit Product</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Name"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
          placeholder="Price"
        />
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="border p-2 w-full"
        />
        {image && (
          <img
            src={`http://localhost:5000/uploads/${image}`}
            alt="Current"
            className="w-20 h-20 object-cover rounded"
          />
        )}
        <button className="bg-blue-600 text-white p-2 w-full rounded">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
