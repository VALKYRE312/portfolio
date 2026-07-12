import { connectDatabase } from '../../lib/database.js';
import { getProjectBySlug, updateProject, deleteProject } from '../../lib/projectController.js';
import { upload } from '../../lib/upload.js';

// Configure Cloudinary
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to database
  await connectDatabase();

  // Add slug from URL to params
  req.params = { slug: req.query.slug };

  if (req.method === 'GET') {
    return getProjectBySlug(req, res);
  }

  if (req.method === 'PUT') {
    try {
      const uploadMiddleware = upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ]);
      
      await runMiddleware(req, res, uploadMiddleware);
      return updateProject(req, res);
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    return deleteProject(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
