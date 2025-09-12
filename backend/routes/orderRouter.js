import express from 'express';
import { getOrders, placeOrder, verifyOrder, getAllOrders, setOrderStatus } from '../controllers/orderController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', authProtect, placeOrder);
router.post('/verify', authProtect, verifyOrder);

router.get('/list', authProtect, getOrders);

router.get('/listAll', getAllOrders);
router.post('/setOrderStatus', setOrderStatus);

export default router;
