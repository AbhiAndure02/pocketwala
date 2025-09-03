import express from "express";
import {
  createBulkOrder,
  getBulkOrders,
  getBulkOrder,
  updateBulkOrder,
  deleteBulkOrder,
  getBulkOrdersByUser,
} from "../controllers/bulkOrder.controller.js";

const router = express.Router();

router.post("/", createBulkOrder);           // Create
router.get("/", getBulkOrders);              // Get all
router.get("/:id", getBulkOrder);            // Get one
router.put("/:id", updateBulkOrder);         // Update
router.delete("/:id", deleteBulkOrder);      // Delete
router.get("/:userId", getBulkOrdersByUser);

export default router;
