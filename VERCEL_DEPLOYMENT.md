# Deploy to Vercel (All-in-One)

Your portfolio is now configured for **serverless deployment** on Vercel! Everything (frontend + API) runs on Vercel.

## ✨ Architecture

```
Vercel
├── React Frontend (Static)
└── API Functions (Serverless)
    ├── /api/health
    ├── /api/projects
    └── /api/projects/[slug]

External Services:
├── MongoDB Atlas (Database)
└── Cloudinary (Images)
```

## 🚀 Quick Deploy

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Portfolio CMS ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy on Vercel

#### Option A: Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://katie:portfolio312@cluster0.vi4hldg.mongodb.net/portfolio
   CLOUDINARY_CLOUD_NAME=dbnqvbllo
   CLOUDINARY_API_KEY=549393958999978
   CLOUDINARY_API_SECRET=wsjgsZlN7Mxe5rywJ8bg7cDrKeg
   ```

6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add MONGODB_URI
# Paste: mongodb+srv://katie:portfolio312@cluster0.vi4hldg.mongodb.net/portfolio

vercel env add CLOUDINARY_CLOUD_NAME
# Paste: dbnqvbllo

vercel env add CLOUDINARY_API_KEY
# Paste: 549393958999978

vercel env add CLOUDINARY_API_SECRET
# Paste: wsjgsZlN7Mxe5rywJ8bg7cDrKeg

# Deploy to production
vercel --prod
```

## 📁 File Structure

```
portfolio/
├── api/                      # Serverless API functions
│   ├── health.js            # GET /api/health
│   ├── projects/
│   │   ├── index.js         # GET/POST /api/projects
│   │   └── [slug].js        # GET/PUT/DELETE /api/projects/:slug
│
├── lib/                      # Shared code for API
│   ├── database.js          # MongoDB connection
│   ├── projectController.js # Business logic
│   ├── upload.js            # Multer config
│   ├── models/              # Mongoose models
│   └── utils/               # Helpers
│
├── src/                      # React frontend
├── public/                   # Static assets
├── dist/                     # Build output
└── vercel.json              # Vercel configuration
```

## 🔧 How It Works

### API Routes
Each file in `/api` becomes an endpoint:
- `api/health.js` → `/api/health`
- `api/projects/index.js` → `/api/projects`
- `api/projects/[slug].js` → `/api/projects/:slug`

### Serverless Functions
- Each request spawns a function
- Functions auto-scale
- No server to maintain
- Cold start: ~100-500ms first request
- Warm: ~50-100ms subsequent requests

### Frontend
- Built as static files
- Served from Vercel CDN
- Global edge network
- Instant page loads

## ✅ Benefits

### No Separate Backend Server Needed
- ✅ Frontend + Backend = 1 Deployment
- ✅ No Railway/Render/Heroku needed
- ✅ No server sleeping issues
- ✅ Auto-scaling built-in

### Performance
- ✅ Global CDN for frontend
- ✅ Functions deployed globally
- ✅ Fast cold starts (<500ms)
- ✅ Automatic SSL/HTTPS

### Developer Experience
- ✅ Git push = auto deploy
- ✅ Preview URLs for branches
- ✅ Instant rollbacks
- ✅ Real-time logs

### Cost
- ✅ **Free tier includes:**
  - 100 GB bandwidth
  - Unlimited sites
  - 100 GB-hours serverless
  - Good for most portfolios!

## 🧪 Testing Locally

### Development Mode
```bash
# Terminal 1: Start Vite
npm run dev

# Terminal 2: Start Vercel Dev (simulates serverless)
vercel dev
```

Visit http://localhost:3000

### Test API Endpoints
```bash
# Health check
curl http://localhost:3000/api/health

# Get projects
curl http://localhost:3000/api/projects

# Add project (with form data)
curl -X POST http://localhost:3000/api/projects \
  -F "title=Test" \
  -F "shortDescription=Testing" \
  -F "thumbnail=@image.jpg"
```

## 📦 Environment Variables

### Production (Vercel Dashboard)
Add these in Project Settings → Environment Variables:

```env
MONGODB_URI=mongodb+srv://katie:portfolio312@cluster0.vi4hldg.mongodb.net/portfolio
CLOUDINARY_CLOUD_NAME=dbnqvbllo
CLOUDINARY_API_KEY=549393958999978
CLOUDINARY_API_SECRET=wsjgsZlN7Mxe5rywJ8bg7cDrKeg
```

### Local (.env)
Already configured:
```env
VITE_API_URL=/api
```

## 🔄 Continuous Deployment

Once deployed, every `git push` triggers:
1. Automatic build
2. Run tests (if any)
3. Deploy to preview URL
4. Merge to main = production deploy

### Preview Deployments
Every branch gets its own URL:
- `feature-branch` → `portfolio-xyz123.vercel.app`
- `main` → `portfolio.vercel.app`

## 🎯 Post-Deployment

### Update Frontend API URL
Your `.env` is already set to `/api` which means:
- Development: `http://localhost:5173/api` → Proxied to backend
- Production: `https://your-domain.vercel.app/api` → Vercel Functions

### Test Production
```bash
# Get your deployment URL
# Example: https://portfolio-abc123.vercel.app

# Test health
curl https://portfolio-abc123.vercel.app/api/health

# Test projects
curl https://portfolio-abc123.vercel.app/api/projects
```

### Access Admin
```
https://your-domain.vercel.app/admin
Login: Kyrie / Kyrie@312
```

## 🐛 Troubleshooting

### API Functions Not Working
1. Check Vercel Deployment Logs
2. Verify environment variables are set
3. Check function logs in Vercel dashboard

### MongoDB Connection Issues
```bash
# Verify MongoDB Atlas allows Vercel IPs
# Add 0.0.0.0/0 to IP Whitelist in Atlas
```

### Image Upload Fails
- Check Cloudinary credentials
- Verify file size < 50MB
- Check Vercel function timeout (10s default)

### Cold Starts Slow
- Normal for serverless
- First request: 100-500ms
- Subsequent: 50-100ms
- Consider upgrading Vercel plan for faster cold starts

## 💰 Cost Estimates

### Free Tier (Hobby)
- ✅ Unlimited static sites
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution
- ✅ Perfect for portfolios

### Pro Tier ($20/month)
- 1 TB bandwidth
- Faster cold starts
- Custom domains
- Analytics

### Typical Portfolio Usage
```
100 visitors/day × 5 pages = 500 page views/day
500 × 30 days = 15,000 page views/month
~5 GB bandwidth/month

Admin uploads: 50 images/month
API calls: 1,000/month

Result: FREE TIER IS ENOUGH! ✅
```

## 🎉 You're Done!

Your portfolio now runs entirely on Vercel:
- ✅ No backend server to maintain
- ✅ Auto-scales to demand
- ✅ Global CDN
- ✅ Free hosting
- ✅ One command deploy
- ✅ Git-based workflow

Just `git push` and you're live! 🚀

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Functions: https://vercel.com/docs/functions
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
- Cloudinary: https://cloudinary.com/documentation
