# Deployment Guide

## Production Deployment Checklist

### Backend Deployment

#### Option 1: Railway (Recommended)

1. **Sign up at Railway.app**
   - Connect your GitHub account

2. **Create New Project**
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` folder

3. **Add Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Configure Build Settings**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Deploy**
   - Railway will provide a URL like: `https://your-app.railway.app`

#### Option 2: Render

1. **Sign up at Render.com**

2. **Create Web Service**
   - Connect repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables** (same as above)

4. **Deploy**

#### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-portfolio-api

# Set root directory to server
echo "web: cd server && npm start" > Procfile

# Add environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret

# Deploy
git push heroku main
```

### Frontend Deployment

#### Option 1: Vercel (Recommended)

1. **Sign up at Vercel.com**
   - Connect GitHub account

2. **Import Project**
   - Select your repository
   - Vercel auto-detects Vite

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Deploy**
   - Vercel will provide URL like: `https://your-portfolio.vercel.app`

#### Option 2: Netlify

1. **Sign up at Netlify.com**

2. **Add New Site**
   - Import from Git
   - Select repository

3. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Deploy**

#### Option 3: GitHub Pages (Static Only)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Update vite.config.js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})

# Deploy
npm run deploy
```

### MongoDB Atlas Setup (Production Database)

1. **Create Cluster**
   - Go to MongoDB.com/atlas
   - Create free M0 cluster
   - Choose cloud provider & region

2. **Database Access**
   - Create database user
   - Set username & password
   - Save credentials

3. **Network Access**
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific IPs from Railway/Render

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

### Cloudinary Setup (No Changes Needed)

Your existing Cloudinary credentials work for production. Free tier includes:
- 25 GB storage
- 25 GB bandwidth/month
- Perfect for portfolio projects

### Environment Variables Summary

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

### DNS & Custom Domain (Optional)

#### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., yourportfolio.com)
3. Follow DNS configuration instructions
4. Add CNAME record pointing to Vercel

#### For Backend:
1. Most hosting provides custom domains
2. Or use provided subdomain (e.g., api.yoursite.com)

### Post-Deployment Verification

1. **Test Backend API**
   ```bash
   curl https://your-backend-url.com/api/health
   # Should return: {"status":"OK","message":"Portfolio API is running"}
   
   curl https://your-backend-url.com/api/projects
   # Should return: [] or list of projects
   ```

2. **Test Frontend**
   - Visit https://your-frontend-url.com
   - Check existing 6 projects are visible
   - Navigate to /admin
   - Try adding a test project
   - Verify it appears on /work page

3. **Test Image Upload**
   - Go to /admin
   - Add project with image
   - Check image appears on Work page
   - Open browser console for any errors

### CORS Configuration (If Needed)

If you get CORS errors, update `server/server.js`:

```javascript
// Replace
app.use(cors());

// With
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### Performance Optimization

#### Frontend:
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
```

#### Backend:
```javascript
// server/server.js
import compression from 'compression';
app.use(compression());
```

### Monitoring & Logs

#### Railway:
- View logs in dashboard
- Set up alerts for errors

#### Vercel:
- Check deployment logs
- Monitor function invocations

#### MongoDB Atlas:
- Monitor database performance
- Set up alerts for high usage

### Backup Strategy

1. **MongoDB Atlas** - Automatic backups included
2. **Cloudinary** - All images stored permanently
3. **Git** - All code versioned

### Cost Breakdown (Free Tier)

- **MongoDB Atlas**: Free (M0 cluster)
- **Cloudinary**: Free (25GB storage)
- **Railway**: Free ($5 credit/month)
- **Vercel**: Free (unlimited websites)
- **Total**: $0/month for small portfolios

### Scaling Considerations

When you need to upgrade:

1. **More Storage**: Upgrade Cloudinary plan
2. **More Traffic**: Upgrade Railway/Render compute
3. **Database**: Upgrade MongoDB Atlas tier
4. **CDN**: Cloudinary includes CDN globally

### Troubleshooting Deployment Issues

#### Build Fails
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check build logs for specific errors

#### API Returns 404
- Verify VITE_API_URL includes /api
- Check backend is deployed and running
- Test backend health endpoint

#### Images Not Loading
- Check Cloudinary credentials
- Verify CORS settings
- Check browser console for errors

#### Database Connection Fails
- Verify MongoDB URI format
- Check IP whitelist in Atlas
- Ensure password doesn't have special chars (URL encode if needed)

### Security Checklist

- [ ] Add authentication to /admin route
- [ ] Use environment variables (never commit .env)
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS for all requests
- [ ] Set appropriate CORS origins
- [ ] Add rate limiting to API
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated

### Continuous Deployment

Both Vercel and Railway support automatic deployments:

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Update project"
   git push origin main
   ```

2. **Automatic deployment starts**
   - Frontend: Rebuilds on Vercel
   - Backend: Redeploys on Railway

3. **Changes are live in ~2 minutes**

### Rollback Strategy

If deployment breaks:

**Vercel:**
- Go to Deployments
- Find previous working deployment
- Click "Promote to Production"

**Railway:**
- Go to Deployments
- Redeploy previous version

**MongoDB:**
- Restore from Atlas backup
- Or manually fix data

### Success Metrics

After deployment, monitor:
- Page load time (< 3s)
- API response time (< 500ms)
- Image load time (< 2s)
- Error rate (< 1%)
- Uptime (> 99.9%)

### Final Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas configured
- [ ] Cloudinary working
- [ ] Environment variables set
- [ ] Existing 6 projects visible
- [ ] Can add new projects via /admin
- [ ] New projects appear on /work
- [ ] Images upload to Cloudinary
- [ ] Videos play correctly
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain (optional)
- [ ] Analytics setup (optional)

## Support

Need help? Check:
- Railway docs: railway.app/docs
- Vercel docs: vercel.com/docs
- MongoDB Atlas docs: docs.atlas.mongodb.com
- Cloudinary docs: cloudinary.com/documentation

Your portfolio is now live! 🎉
