import express from 'express';
import { addFoodDish, getFoodDishes, removeFoodDish } from '../controllers/foodMenuController.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage});

router.post('/add', upload.single("image"), addFoodDish);
router.get('/list', getFoodDishes);
router.post('/remove', removeFoodDish);

export default router; 



