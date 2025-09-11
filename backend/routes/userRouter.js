import express from 'express'
import { registerUser, authUser, logoutUser, checkCookie, authAdmin } from '../controllers/userController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

router.post('/admin/login', authAdmin);

router.get('/me', authProtect, checkCookie);

export default router;