import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryConfig } from './app-env.ts';

cloudinary.config({
    cloud_name: CloudinaryConfig.cloud_name,
    api_key: CloudinaryConfig.apiKey,
    api_secret: CloudinaryConfig.apiSecret
});

export default cloudinary;