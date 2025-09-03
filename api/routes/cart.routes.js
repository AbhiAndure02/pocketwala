import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);       // add item to cart
router.get("/:userId", getCart);      // get cart for user
router.delete("/:id", removeFromCart); // remove item
router.delete("/clear", clearCart);   // clear cart

export default router;
