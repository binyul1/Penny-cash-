import { config } from "dotenv";

config();

export const MongodbConfig = {
  url: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_DB_NAME,
};

export const Secrets = {
  jwtSecret: process.env.JWT_SECRET,
};

export const CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
}
