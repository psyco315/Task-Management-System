import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pdfs',
    resource_type: 'raw',
    format: 'pdf',
    type: 'upload', // <- ensure it's normal public upload
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace('.pdf', '')}`,
  },
});


export { cloudinary, storage };
