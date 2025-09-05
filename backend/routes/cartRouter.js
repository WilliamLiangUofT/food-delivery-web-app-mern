import express from 'express'
import { addCartItems, getCartItems, removeCartItems } from '../controllers/cartController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addCart', authProtect, addCartItems);
router.post('/removeCart', authProtect, removeCartItems);
router.get('/listCart', authProtect, getCartItems);

export default router;
