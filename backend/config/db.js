import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI, );
        console.log(`MongoDB Connected ✅: ${conn.connection.host}`);
    } catch (error) {
        process.exit(1);
        console.log(`Error in connection to dataabse ❌: ${error.message}`);
    }  
};
