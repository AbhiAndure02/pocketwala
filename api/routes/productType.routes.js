import express from 'express';
import {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
  
} from '../controllers/productType.controller.js';

const router = express.Router();

router.post('/product-types', createProductType);
router.get('/product-types', getAllProductTypes);
router.get('/product-types/:id', getProductTypeById);
router.put('/product-types/:id', updateProductType);
router.delete('/product-types/:id', deleteProductType);

export default router;