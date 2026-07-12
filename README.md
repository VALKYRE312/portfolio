# Portfolio CMS

A modern, full-stack portfolio website with CMS capabilities. Built with React, Express, MongoDB, and Cloudinary.

## ✨ Features

- **Hybrid Content System**: Combines hardcoded projects with dynamic CMS content
- **Image Management**: Automatic upload and hosting via Cloudinary CDN
- **Modern Stack**: React + Vite frontend, Express + MongoDB backend
- **Admin Panel**: Easy-to-use interface for managing projects
- **Responsive Design**: Beautiful UI that works on all devices
- **Video Previews**: Interactive video cards with auto-pause
- **Zero Downtime**: Existing projects preserved 100%

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Cloudinary account (free)

### Installation

```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Setup environment variables
cp .env.example .env
cp server/.env.example server/.env

# 3. Edit .env files with your credentials

# 4. Start backend
cd server && npm run dev

# 5. Start frontend (new terminal)
npm run dev
```

Visit http://localhost:5173 to see your portfolio!

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- **[Installation Guide](INSTALLATION.md)** - Detailed setup instructions
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[Feature Documentation](README_SETUP.md)** - Complete feature list
- **[Project Summary](PROJECT_SUMMARY.md)** - Architecture overview
- **[API Documentation](server/README.md)** - Backend API reference

## 🎯 Key Routes

- `/` - Home page
- `/work` - All projects (existing + new)
- `/about` - About page
- `/contact` - Contact page
- `/admin` - Admin panel (add/manage projects)

## 🏗️ Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Framer Motion
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary
- Multer

## 🔧 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📁 Project Structure

```
portfolio/
├── src/                  # Frontend source
│   ├── pages/           # Page components
│   │   ├── Work.jsx     # Projects list
│   │   ├── AdminNew.jsx # Admin panel
│   │   └── ...
│   ├── components/      # Reusable components
│   └── data/           # Data utilities
├── server/              # Backend API
│   ├── models/         # MongoDB schemas
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   └── config/         # Configuration
└── public/             # Static assets
```

## 🎨 Existing Projects (Preserved)

The following projects are hardcoded and will always be available:
- Personify
- Year Wrap
- Brew n Crumbs
- Smart Health
- Italian Cuisine
- Eye Opener

New projects added via the admin panel will appear alongside these.

## 🛠️ Development

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd server
npm run dev          # Start API server
node test-api.js     # Test API endpoints
```

## 🧪 Testing the API

```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects

# Or use the test script
cd server
node test-api.js
```

## 📦 API Endpoints

- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get single project
- `PUT /api/projects/:slug` - Update project
- `DELETE /api/projects/:slug` - Delete project

See [server/README.md](server/README.md) for detailed API documentation.

## 🚢 Deployment

### Quick Deploy
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy to Railway/Render
- **Database**: MongoDB Atlas (free tier)
- **Images**: Cloudinary (included)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## 📝 License

MIT

## 🆘 Support

Having issues? Check:
1. [QUICK_START.md](QUICK_START.md) - Common problems
2. [INSTALLATION.md](INSTALLATION.md) - Setup details
3. Browser console for errors
4. Server logs for API issues

## 🎉 What's New

- ✅ MongoDB integration
- ✅ Cloudinary image hosting
- ✅ Admin panel for project management
- ✅ REST API backend
- ✅ Dynamic project loading
- ✅ All existing projects preserved
- ✅ Same UI/UX maintained
