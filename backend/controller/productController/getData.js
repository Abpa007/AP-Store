import productModel from "../../model/productModel/productSchema.js";

export const getData = async (req, res) => {
  try {
    const product = await productModel.find({});
    console.log(product);
    return res.status(200).json({
      message: "Data fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
