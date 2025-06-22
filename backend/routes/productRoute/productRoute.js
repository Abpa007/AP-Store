import express from "express";
import { getData } from "../../controller/productController/getData.js";
import { getProductById } from "../../controller/productController/getProductById.js";
import { createData } from "../../controller/productController/createData.js";
import { updateData } from "../../controller/productController/updateData.js";
import { deleteData } from "../../controller/productController/deleteData.js";
import upload from "../../middleware/upload.js";

const productRoute = express.Router();

// ✅ Get all products
productRoute.get("/", getData);

// ✅ Get single product by ID (used for edit)
productRoute.get("/:id", getProductById);

// ✅ Create new product with image
productRoute.post("/", upload.single("image"), createData);

// ✅ Update product with optional image upload
productRoute.put("/:id", upload.single("image"), updateData);

// ✅ Delete product
productRoute.delete("/:id", deleteData);

export default productRoute;
