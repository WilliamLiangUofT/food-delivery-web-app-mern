import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import foodMenuRouter from "./routes/foodMenuRouter.js"
import { endPointNotFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config();
const port = process.env.PORT;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// API Endpoints
app.use('/api/foodMenu', foodMenuRouter);
app.use('/images', express.static('uploads')); // Serve images so frontend can access them easily

app.use(endPointNotFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});

