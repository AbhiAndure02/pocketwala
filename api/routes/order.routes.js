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
router.post("/", addOrder);

// My orders
router.get("/myorders",  getMyOrders);

// Get order by id
router.get("/:id",  getOrderById);

// Update to paid
router.put("/:id/pay",  updateOrderToPaid);

// Update to delivered
router.put("/:id/deliver",  updateOrderToDelivered);

// Admin: get all orders
router.get("/", getAllOrders);

export default router;
