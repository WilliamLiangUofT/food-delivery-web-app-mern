import express from 'express';
import { getOrders, placeOrder, verifyOrder } from '../controllers/orderController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', authProtect, placeOrder);
router.post('/verify', authProtect, verifyOrder);

router.get('/list', authProtect, getOrders);

export default router;