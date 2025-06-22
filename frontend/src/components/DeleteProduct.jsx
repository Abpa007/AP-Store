const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product deleted");
        fetchProducts(); // reload product list
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete product");
      }
    }