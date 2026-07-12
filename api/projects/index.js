import { connectDatabase } from '../../lib/database.js';
import { getAllProjects, createProject } from '../../lib/projectController.js';
import { upload } from '../../lib/upload.js';
import multer from 'multer';

// Configure Cloudinary
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to parse multipart form data in serverless
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to database
  await connectDatabase();

  if (req.method === 'GET') {
    return getAllProjects(req, res);
  }

  if (req.method === 'POST') {
    try {
      // Handle file uploads
      const uploadMiddleware = upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ]);
      
      await runMiddleware(req, res, uploadMiddleware);
      return createProject(req, res);
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};
