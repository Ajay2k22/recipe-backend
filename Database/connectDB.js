import mongoose from "mongoose";
import { DB } from "../config";

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB)
        console.log('Database connected sucessfully')
    }
    catch (error) {
        // database connection error
        console.log(error)
    }
}