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
    formData.append("image", image); // only once

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product created");
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      alert("Error creating product");
      console.log("Error:", error.response?.data || error.message); // Optional: show details
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProducts;
