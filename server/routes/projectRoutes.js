import express from 'express';
import { body } from 'express-validator';
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
];

router.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  projectValidation,
  createProject
);

router.get('/', getAllProjects);

router.get('/:slug', getProjectBySlug);

router.put(
  '/:slug',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  updateProject
);

router.delete('/:slug', deleteProject);

export default router;
