import React, { useState } from "react";
import axios from "axios";

function CreateProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product created");
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      alert("Error creating product");
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
