import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "ScreenShots(snap-chat)",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const uploadMultiple = multer({ storage }).fields([
  { name: "i_phone", maxCount: 10 },
  { name: "i_pad", maxCount: 10 },
  { name: "apple_watch", maxCount: 10 },
  { name: "events_image", maxCount: 3 },
]);

export default uploadMultiple;
