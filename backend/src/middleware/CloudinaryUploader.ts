import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.ts";

const cloudinaryUploader = (dir = "/") => {
  const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: () => {
      return {
        folder: `Petty${dir}`,
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        unique_filename: true,
      };
    },
  });
  return multer({
    storage: cloudStorage,
  });
};

export default cloudinaryUploader;
