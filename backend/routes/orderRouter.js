import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', authProtect, placeOrder);

export default router;