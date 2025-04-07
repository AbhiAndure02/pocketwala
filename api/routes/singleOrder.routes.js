import express from 'express';
import { createSingleOrder, getAllSingleOrders } from '../controllers/singleOrder.controller.js';

const router = express.Router();

router.post('/', createSingleOrder)
router.get('/', getAllSingleOrders);
//         const updatedOrder = await SingleOrder.findByIdAndUpdate(


export default router;