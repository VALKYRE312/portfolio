# Portfolio CMS Setup Guide

## Overview
Your portfolio is now a full CMS-driven application with MongoDB and Cloudinary integration. All existing projects remain intact, and new projects can be added through the admin panel.

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Get Cloudinary Credentials
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Paste them into your `.env` file

#### Start MongoDB
Make sure MongoDB is running locally:
```bash
# macOS/Linux
mongod

# Windows
mongod.exe
```

Or use MongoDB Atlas (cloud):
- Sign up at https://mongodb.com/atlas
- Create a cluster
- Get your connection string
- Replace `MONGODB_URI` in `.env`

#### Start Backend Server
```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### 2. Frontend Setup

#### Configure Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

### Existing Projects (Preserved)
All your hardcoded projects remain untouched:
- Personify
- Year Wrap
- Brew n Crumbs
- Smart Health
- Italian Cuisine
- Eye Opener

These projects:
- Keep their original routes (`/work/personify`, etc.)
- Keep their original styling and behavior
- Continue to work exactly as before
- Are NOT stored in the database

### New Projects (From Admin Panel)
Projects added through the admin panel:
- Automatically appear on the Work page
- Display after the existing projects
- Use the same UI/styling as existing projects
- Store images in Cloudinary
- Store data in MongoDB
- Can be edited/deleted from admin panel

### Admin Panel Features
Access at `/admin`:
- Add new projects with title, descriptions, tech stack
- Upload thumbnail and gallery images to Cloudinary
- Add video URLs (YouTube or Cloudinary)
- Add GitHub and live demo links
- Mark projects as featured
- Publish/unpublish projects
- Delete projects
- View all database projects

### API Endpoints

#### GET /api/projects
Fetch all projects (or only published ones)
```
GET /api/projects?published=true
```

#### GET /api/projects/:slug
Fetch a single project by slug
```
GET /api/projects/my-awesome-project
```

#### POST /api/projects
Create a new project (multipart/form-data)
```
FormData fields:
- title (required)
- shortDescription (required)
- fullDescription
- techStack (array or comma-separated)
- video
- github
- live
- featured (boolean)
- published (boolean)
- thumbnail (file)
- gallery (files, multiple)
```

#### PUT /api/projects/:slug
Update an existing project

#### DELETE /api/projects/:slug
Delete a project

## How It Works

### Work Page (`/work`)
1. Loads all existing hardcoded projects
2. Fetches new projects from MongoDB
3. Combines both lists
4. Renders them with identical UI
5. Only one video plays at a time
6. Clicking title/description navigates to detail page

### Project Detail Page (`/work/:slug`)
1. For existing projects: Uses hardcoded routes (Personify.jsx, etc.)
2. For new projects: Uses DynamicProject.jsx with API data
3. Displays project info, video, and image gallery
4. All images are clickable for full-screen view

### Admin Panel (`/admin`)
1. Form to add new projects
2. Image uploads go directly to Cloudinary
3. Only Cloudinary URLs are stored in MongoDB
4. Projects appear immediately on Work page
5. Can delete projects from database
6. Existing projects are NOT shown here (they're hardcoded)

## Important Notes

### DO NOT Modify
- Existing project components (Personify.jsx, YearWrap.jsx, etc.)
- defaultProjects array in portfolioData.js
- Any UI styling or layout
- Video preview behavior
- Card animations

### Cloudinary Setup
- Images are uploaded on form submission
- No local storage of images
- Cloudinary automatically optimizes images
- URLs are permanent and CDN-backed

### Database
- Only NEW projects are stored in MongoDB
- Existing projects remain in code
- Projects have auto-generated slugs
- Slugs must be unique

### Production Deployment
Update environment variables:
```env
# Frontend .env
VITE_API_URL=https://your-backend-domain.com/api

# Backend .env
MONGODB_URI=your_production_mongodb_uri
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env file exists with correct values
- Check port 5000 is not in use

### Images not uploading
- Verify Cloudinary credentials in .env
- Check file size (max 50MB)
- Ensure file is image type

### Projects not appearing
- Check backend is running
- Open browser console for errors
- Verify API_BASE_URL in frontend .env
- Check CORS settings

### Existing projects missing
- They should never be missing (hardcoded)
- Check defaultProjects in portfolioData.js
- Verify imports in App.jsx

## Next Steps

1. Add authentication to admin panel
2. Add project edit functionality
3. Add bulk upload for gallery images
4. Add search/filter in admin panel
5. Add project analytics
