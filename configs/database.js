import mongoose from "mongoose";
import envConfig from "./dotenv.js";

const db = async () => {
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log("Mongoose Connected Successfully!");
    } catch (error) {
        console.error("Mongoose Connection Error:", error.message);
    }
};

export default db;