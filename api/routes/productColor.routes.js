import express from 'express';
import {
  createProductColor,
  getAllProductColors,
  getProductColorById,
  updateProductColor,
  deleteProductColor,
  
} from '../controllers/productColor.controller.js';

const router = express.Router();

router.post('/product-colors', createProductColor);
router.get('/product-colors', getAllProductColors);
router.get('/product-colors/:id', getProductColorById);
router.put('/product-colors/:id', updateProductColor);
router.delete('/product-colors/:id', deleteProductColor);

export default router;