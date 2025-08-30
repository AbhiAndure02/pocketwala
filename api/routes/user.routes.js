import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getUserById,
  google,
  updateUserProfile
} from "../controllers/user.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (self)
router.get("/profile", getUserProfile);

// ✅ Get all users (admin)
router.get("/", getAllUsers);

// ✅ Get user by id (admin or self)
router.get("/:id", getUserById);
router.post('/google', google);
router.put("/profile", protect, updateUserProfile);

export default router;
