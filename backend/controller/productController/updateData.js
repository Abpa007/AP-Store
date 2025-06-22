import productModel from "../../model/productModel/productSchema.js";

export const updateData = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // 🔁 Use old image if no new file is uploaded
  let image = req.body.image;

  // ✅ If user uploads a new image
  if (req.file) {
    image = req.file.filename;
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, image },
      {
        new: true, // Return updated document
        runValidators: true, // Apply Mongoose validations
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};
