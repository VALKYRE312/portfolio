import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      trim: true,
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    video: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    live: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
