import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from "./app-env.js";
cloudinary.config({
    cloud_name: CloudinaryConfig.cloud_name,
    api_key: CloudinaryConfig.apiKey,
    api_secret: CloudinaryConfig.apiSecret
});
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map