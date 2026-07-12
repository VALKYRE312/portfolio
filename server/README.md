# Portfolio Backend API

REST API for managing portfolio projects with MongoDB and Cloudinary integration.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your credentials
# - MongoDB URI
# - Cloudinary credentials

# Start server
npm run dev
```

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Projects

#### Create Project
```
POST /api/projects
Content-Type: multipart/form-data

Body:
- title: string (required)
- shortDescription: string (required)
- fullDescription: string
- techStack: string[] or string (comma-separated)
- video: string (URL)
- github: string (URL)
- live: string (URL)
- featured: boolean
- published: boolean
- thumbnail: file (image)
- gallery: file[] (images)
```

#### Get All Projects
```
GET /api/projects
GET /api/projects?published=true
```

#### Get Single Project
```
GET /api/projects/:slug
```

#### Update Project
```
PUT /api/projects/:slug
Content-Type: multipart/form-data
```

#### Delete Project
```
DELETE /api/projects/:slug
```

## Project Schema

```javascript
{
  title: String (required),
  slug: String (unique, auto-generated),
  shortDescription: String (required),
  fullDescription: String,
  techStack: [String],
  thumbnail: String (Cloudinary URL),
  gallery: [String] (Cloudinary URLs),
  video: String (URL),
  github: String (URL),
  live: String (URL),
  featured: Boolean,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- Cloudinary - Image hosting
- Multer - File uploads
- Express Validator - Input validation
