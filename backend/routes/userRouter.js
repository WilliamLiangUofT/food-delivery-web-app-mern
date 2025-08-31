import express from 'express'
import { registerUser, authUser, logoutUser, addCartItems, getCartItems, removeCartItems } from '../controllers/userController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

router.get('/listCart', authProtect, getCartItems);

export default router;