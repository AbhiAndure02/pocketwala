import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order
router.post("/", protect, addOrder);

// My orders
router.get("/myorders", protect, getMyOrders);

// Get order by id
router.get("/:id", protect, getOrderById);

// Update to paid
router.put("/:id/pay", protect, updateOrderToPaid);

// Update to delivered
router.put("/:id/deliver", protect, updateOrderToDelivered);

// Admin: get all orders
router.get("/", protect, getAllOrders);

export default router;
