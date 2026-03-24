import dotenv from "dotenv";
dotenv.config();  // loads variables from .env into process.env

const envConfig = {
    PORT: process.env.PORT || 3000,  // fallback if PORT not defined
    MONGODB_URL: process.env.MONGODB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET || "superSecret123"  // good to define session secret here
};

export default envConfig;