# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Setup Cloudinary (2 min)
1. Go to https://cloudinary.com (free signup)
2. Copy: Cloud Name, API Key, API Secret from dashboard

### 3. Setup MongoDB (1 min)
**Local:**
```bash
mongod
```

**OR Cloud (MongoDB Atlas):**
1. https://mongodb.com/atlas (free signup)
2. Create cluster → Get connection string

### 4. Configure Backend
```bash
cd server
cp .env.example .env
# Edit .env with your credentials
```

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=paste_here
CLOUDINARY_API_KEY=paste_here
CLOUDINARY_API_SECRET=paste_here
```

### 5. Configure Frontend
```bash
# In root directory
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Run Everything
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 7. Test It
1. Open http://localhost:5173
2. See 6 existing projects ✓
3. Go to http://localhost:5173/admin
4. Add a test project with an image
5. Go back to /work
6. See 7 projects now ✓

## Common Commands

### Development
```bash
# Start backend
cd server && npm run dev

# Start frontend
npm run dev

# Both URLs
Backend:  http://localhost:5000
Frontend: http://localhost:5173
Admin:    http://localhost:5173/admin
```

### Production Build
```bash
# Frontend
npm run build

# Test production build
npm run preview
```

### Database
```bash
# MongoDB shell
mongosh

# Switch to portfolio database
use portfolio

# View projects
db.projects.find()

# Delete all projects
db.projects.deleteMany({})
```

## Quick Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod

# Check port 5000 is free
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### Frontend can't connect to backend
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","message":"Portfolio API is running"}
```

### Images not uploading
- Check Cloudinary credentials in `server/.env`
- Verify file is under 50MB
- Ensure file is an image type

### Projects not showing
- Check browser console (F12)
- Verify backend is running
- Check `VITE_API_URL` in frontend `.env`

## File Locations

```
portfolio/
├── .env                     ← Frontend config
├── src/pages/AdminNew.jsx   ← Admin panel
├── src/pages/Work.jsx       ← Projects list
└── server/
    ├── .env                 ← Backend config
    └── server.js            ← API entry point
```

## API Test Commands

```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects

# Create project (with image)
curl -X POST http://localhost:5000/api/projects \
  -F "title=Test Project" \
  -F "shortDescription=Testing" \
  -F "thumbnail=@path/to/image.jpg"
```

## Environment Variables Cheatsheet

### Development
```env
# Frontend .env
VITE_API_URL=http://localhost:5000/api

# Backend server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Production
```env
# Frontend .env
VITE_API_URL=https://your-api-domain.com/api

# Backend (hosting platform)
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Admin Panel Features

### Add Project
1. Go to `/admin`
2. Fill form:
   - Title (required)
   - Short description (required)
   - Full description
   - Tech stack (comma-separated)
   - Video URL
   - GitHub URL
   - Live demo URL
   - Thumbnail image
   - Gallery images (multiple)
   - Featured toggle
   - Published toggle
3. Click "Add Project"
4. Project appears on `/work`

### Delete Project
1. Go to `/admin`
2. Scroll to "All Projects from Database"
3. Click "Delete" on any project
4. Confirm deletion
5. Project removed from `/work`

## Key Routes

```
/                    → Home page
/work                → All projects (existing + new)
/about               → About page
/contact             → Contact page
/admin               → Admin panel (add/delete projects)
/work/:slug          → Project detail page
/work/personify      → Existing project (hardcoded)
/work/my-project     → New project (from database)
```

## Important Notes

### Existing Projects (DO NOT TOUCH)
- Personify, Year Wrap, Brew n Crumbs, Smart Health, Italian Cuisine, Eye Opener
- These are hardcoded and will ALWAYS appear
- They are NOT in the database
- Do NOT delete their component files
- Do NOT modify defaultProjects in portfolioData.js

### New Projects (From Admin)
- Added through `/admin` panel
- Stored in MongoDB
- Images hosted on Cloudinary
- Can be deleted from admin
- Appear after existing projects on `/work`

## Help

Need more details?
- Full setup: `INSTALLATION.md`
- Deployment: `DEPLOYMENT.md`
- Features: `README_SETUP.md`
- API docs: `server/README.md`

## Success Checklist

✅ Backend running (http://localhost:5000)  
✅ Frontend running (http://localhost:5173)  
✅ MongoDB connected  
✅ Cloudinary configured  
✅ 6 existing projects visible on /work  
✅ Can access /admin panel  
✅ Can add project with image  
✅ New project appears on /work  
✅ Can delete projects from admin  
✅ Videos play on project cards  

🎉 **You're ready to go!**
