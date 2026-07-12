# Portfolio CMS - Installation Guide

## Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- Cloudinary account (free tier works)

## Step-by-Step Installation

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Setup Cloudinary

1. Go to https://cloudinary.com and sign up (free)
2. After login, go to Dashboard
3. You'll see:
   - Cloud Name
   - API Key
   - API Secret
4. Keep these handy for next step

### 3. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://mongodb.com/try/download/community
# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create a cluster (free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your password

### 4. Configure Backend Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 5. Configure Frontend Environment

```bash
# In root directory
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
VITE v5.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 7. Test the Setup

1. Open http://localhost:5173
2. You should see your existing 6 projects
3. Go to http://localhost:5173/admin
4. Try adding a test project with:
   - Title: "Test Project"
   - Short Description: "Testing the CMS"
   - Upload a thumbnail image
   - Click "Add Project"
5. Go back to http://localhost:5173/work
6. You should see 7 projects now (6 existing + 1 new)

## Verify Everything Works

✅ Existing projects are visible on /work  
✅ Clicking a project title navigates to detail page  
✅ Video preview works on cards  
✅ Only one video plays at a time  
✅ Admin panel loads at /admin  
✅ Can add new project with image upload  
✅ New project appears on /work page  
✅ New project has its own detail page  

## Common Issues

### Backend won't start
- **MongoDB connection error**: Make sure MongoDB is running
- **Port 5000 in use**: Change PORT in server/.env
- **Missing .env**: Copy from .env.example

### Images not uploading
- **Cloudinary error**: Check credentials in server/.env
- **File too large**: Max 50MB per file
- **Wrong file type**: Only images accepted

### Projects not appearing
- **Backend not running**: Start server in Terminal 1
- **Wrong API URL**: Check VITE_API_URL in .env
- **CORS error**: Make sure backend is on port 5000

### Existing projects missing
- Should never happen (they're hardcoded)
- Check src/data/portfolioData.js for defaultProjects
- Make sure imports are correct in src/App.jsx

## Production Deployment

### Backend (e.g., Railway, Render, Heroku)
1. Deploy backend to hosting service
2. Add environment variables (same as .env)
3. Note the deployed URL (e.g., https://api.yoursite.com)

### Frontend (e.g., Vercel, Netlify)
1. Update `.env`:
   ```env
   VITE_API_URL=https://api.yoursite.com/api
   ```
2. Build: `npm run build`
3. Deploy `dist` folder
4. Configure build command: `npm run build`
5. Configure output directory: `dist`

## Next Steps

- Add authentication to /admin route
- Customize project colors
- Add more fields to projects
- Add project categories/tags
- Enable project editing
- Add image optimization settings

## Support

If you encounter issues:
1. Check browser console for errors
2. Check terminal outputs for server errors
3. Verify all environment variables are set
4. Ensure MongoDB is running
5. Test Cloudinary credentials separately

## Architecture Overview

```
Frontend (React + Vite)
├── Existing Projects (Hardcoded)
│   ├── Personify, Year Wrap, etc.
│   └── Always visible
└── New Projects (Dynamic)
    ├── Fetched from API
    └── Added via admin panel

Backend (Express + Node.js)
├── REST API
├── MongoDB (Project data)
└── Cloudinary (Image storage)
```

## File Structure

```
portfolio/
├── src/                    # Frontend code
│   ├── pages/
│   │   ├── Work.jsx       # Shows all projects
│   │   ├── AdminNew.jsx   # CMS admin panel
│   │   └── DynamicProject.jsx  # New project details
│   └── data/
│       └── portfolioData.js    # Existing projects
├── server/                 # Backend code
│   ├── models/
│   │   └── Project.js     # MongoDB schema
│   ├── controllers/
│   │   └── projectController.js
│   ├── routes/
│   │   └── projectRoutes.js
│   └── server.js          # Express app
└── public/                 # Existing project images
```
