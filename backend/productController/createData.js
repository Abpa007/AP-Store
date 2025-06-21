import productModel from "../model/productModel/productSchema.js";

export const createData = async (req, res) => {
  const product = req.body;

  // Check if any required fields are missing
  if (!product.name || !product.price || !product.image) {
    console.log("Fields need to be filled");
    return res
      .status(400)
      .json({ message: "Please fill all required fields: name, price, image" });
  }

  const newProduct = new productModel(product);

  try {
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    return res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};
