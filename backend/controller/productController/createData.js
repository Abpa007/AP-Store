import productModel from "../../model/productModel/productSchema.js";

export const createData = async (req, res) => {
  try {
    console.log("📦 req.body:", req.body);
    console.log("🖼️ req.file:", req.file); // add this

    const { name, price } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Fill all fields" });
    }

    const newProduct = new productModel({ name, price, image });
    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("❌ Error creating product:", err); // show full error
    res.status(500).json({ message: "Internal Server Error" });
  }
};
