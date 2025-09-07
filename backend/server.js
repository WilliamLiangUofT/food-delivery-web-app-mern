import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodMenuRouter from "./routes/foodMenuRouter.js"
import userRouter from "./routes/userRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from './routes/orderRouter.js'
import { endPointNotFound, errorHandler } from "./middleware/errorMiddleware.js"
import logger from "./middleware/loggerMiddleware.js"
import cookieParser from "cookie-parser"

const port = process.env.PORT;
const allowed_origins = [
  process.env.FRONTEND_ORIGIN,
  process.env.ADMIN_ORIGIN
]

const app = express();

// Middleware
app.use(logger);
app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: allowed_origins,
  credentials: true, // allow cookies
}));

app.use(cookieParser()); // populates req.cookies

// MongoDB connection
connectDB();

// API Endpoints
app.use('/api/foodMenu', foodMenuRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads')); // Serve images so frontend can access them easily

app.use(endPointNotFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});

