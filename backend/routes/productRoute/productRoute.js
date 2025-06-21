import express from "express";
import { getData } from "../../controller/productController/getData.js";
import { createData } from "../../controller/productController/createData.js";
import { updateData } from "../../controller/productController/updateData.js";
import { deleteData } from "../../controller/productController/deleteData.js";
import upload from "../../middleware/upload.js";

const productRoute = express.Router();

productRoute.get("/", getData);
productRoute.post("/", upload.single("image"), createData);
productRoute.put("/:id", updateData);
productRoute.delete("/:id", deleteData);

export default productRoute;
