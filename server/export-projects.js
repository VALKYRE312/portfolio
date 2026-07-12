import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from './models/Project.js';

dotenv.config();

async function exportProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const projects = await Project.find({}).lean();
    
    console.log('\n=== EXPORTED PROJECTS ===\n');
    console.log(JSON.stringify(projects, null, 2));
    console.log(`\n\nTotal: ${projects.length} projects`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

exportProjects();
