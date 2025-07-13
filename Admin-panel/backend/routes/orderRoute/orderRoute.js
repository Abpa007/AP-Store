import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../../controller/orderController/ordercontroller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus); // ✅ Add this

export default router;
