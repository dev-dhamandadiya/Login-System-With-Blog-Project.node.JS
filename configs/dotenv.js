
import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL,
  SESSION_SECRET: process.env.SESSION_SECRET
};

export default envConfig;