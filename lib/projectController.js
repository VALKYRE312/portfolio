import { validationResult } from 'express-validator';
import Project from './models/Project.js';
import { slugify } from './utils/slugify.js';
import { uploadToCloudinary, uploadMultipleToCloudinary } from './utils/cloudinaryUpload.js';

const projectColors = [
  'bg-pink-200/10',
  'bg-emerald-200/10',
  'bg-orange-200/10',
  'bg-yellow-200/10',
  'bg-fuchsia-200/10',
  'bg-sky-200/10',
];

export const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, shortDescription, fullDescription, techStack, video, github, live, featured, published } = req.body;

    let slug = slugify(title);
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      slug = `${slug}-${Date.now()}`;
    }

    let thumbnail = '';
    let gallery = [];

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        thumbnail = await uploadToCloudinary(req.files.thumbnail[0].buffer, 'portfolio/thumbnails');
      }

      if (req.files.gallery && req.files.gallery.length > 0) {
        gallery = await uploadMultipleToCloudinary(req.files.gallery, 'portfolio/gallery');
      }
    }

    const project = await Project.create({
      title,
      slug,
      shortDescription,
      fullDescription,
      techStack: Array.isArray(techStack) ? techStack : (techStack ? [techStack] : []),
      thumbnail,
      gallery,
      video,
      github,
      live,
      featured: featured === 'true' || featured === true,
      published: published === 'true' || published === true || published === undefined,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { published } = req.query;
    const filter = published === 'true' ? { published: true } : {};

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    const formattedProjects = projects.map((project, index) => ({
      id: project.slug,
      title: project.title,
      description: project.shortDescription,
      backend: project.fullDescription || '',
      video: project.video || '',
      images: project.gallery || [],
      color: projectColors[index % projectColors.length],
      link: `/work/${project.slug}`,
      thumbnail: project.thumbnail || '',
      techStack: project.techStack || [],
      github: project.github || '',
      live: project.live || '',
      featured: project.featured,
      published: project.published,
      createdAt: project.createdAt,
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const formattedProject = {
      id: project.slug,
      title: project.title,
      description: project.shortDescription,
      backend: project.fullDescription || '',
      video: project.video || '',
      images: project.gallery || [],
      thumbnail: project.thumbnail || '',
      techStack: project.techStack || [],
      github: project.github || '',
      live: project.live || '',
      featured: project.featured,
      published: project.published,
      createdAt: project.createdAt,
    };

    res.json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, shortDescription, fullDescription, techStack, video, github, live, featured, published } = req.body;

    if (title) project.title = title;
    if (shortDescription) project.shortDescription = shortDescription;
    if (fullDescription !== undefined) project.fullDescription = fullDescription;
    if (techStack) project.techStack = Array.isArray(techStack) ? techStack : [techStack];
    if (video !== undefined) project.video = video;
    if (github !== undefined) project.github = github;
    if (live !== undefined) project.live = live;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (published !== undefined) project.published = published === 'true' || published === true;

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        project.thumbnail = await uploadToCloudinary(req.files.thumbnail[0].buffer, 'portfolio/thumbnails');
      }

      if (req.files.gallery && req.files.gallery.length > 0) {
        const newGallery = await uploadMultipleToCloudinary(req.files.gallery, 'portfolio/gallery');
        project.gallery = [...project.gallery, ...newGallery];
      }
    }

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOneAndDelete({ slug });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
