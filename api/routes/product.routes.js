import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

// @route   POST /products
router.post('/', addProduct);

// @route   GET /products
router.get('/', getAllProducts);

// @route   GET /products/:id
router.get('/:id', getProductById);

// @route   PUT /products/:id
router.put('/:id', updateProduct);

// @route   DELETE /products/:id
router.delete('/:id', deleteProduct);

export default router;
