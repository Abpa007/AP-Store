import productModel from "../../model/productModel/productSchema.js";

export const updateData = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, body, {
      new: true, // return the updated document
      runValidators: true, // ensure the schema validators run
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};
