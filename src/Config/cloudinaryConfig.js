import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.SECRET,
});

export default cloudinary;
