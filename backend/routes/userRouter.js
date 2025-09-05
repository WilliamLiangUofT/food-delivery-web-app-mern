import express from 'express'
import { registerUser, authUser, logoutUser, checkCookie } from '../controllers/userController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

router.get('/me', authProtect, checkCookie);

export default router;