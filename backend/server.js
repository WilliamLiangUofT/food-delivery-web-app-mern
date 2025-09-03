import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import foodMenuRouter from "./routes/foodMenuRouter.js"
import userRouter from "./routes/userRouter.js"
import { endPointNotFound, errorHandler } from "./middleware/errorMiddleware.js"
import logger from "./middleware/loggerMiddleware.js"
import cookieParser from "cookie-parser"

dotenv.config();
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
app.use('/images', express.static('uploads')); // Serve images so frontend can access them easily

app.use(endPointNotFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});

