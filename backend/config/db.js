import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }

};