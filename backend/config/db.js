import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://billcliang:367524579@cluster0.lkpujmx.mongodb.net/food_delivery_fullstack');
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }

};