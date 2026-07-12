# Setup & Testing Checklist

Use this checklist to ensure everything is working correctly.

## ✅ Initial Setup

### Backend Setup
- [ ] Navigate to `server` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Add MongoDB URI to `.env`
- [ ] Add Cloudinary credentials to `.env`
- [ ] MongoDB is running (local or Atlas)

### Frontend Setup
- [ ] Run `npm install` in root directory
- [ ] Copy `.env.example` to `.env`
- [ ] Add `VITE_API_URL` to `.env`

## ✅ Backend Testing

### Start Backend
- [ ] Open terminal in `server` folder
- [ ] Run `npm run dev`
- [ ] See "Server running on port 5000"
- [ ] See "MongoDB Connected: ..."

### Test API Endpoints
- [ ] Run `node test-api.js` in server folder
- [ ] Health check passes ✓
- [ ] Projects endpoint works ✓
- [ ] No errors in terminal

### Manual API Test
```bash
# In new terminal
curl http://localhost:5000/api/health
# Should return: {"status":"OK","message":"Portfolio API is running"}

curl http://localhost:5000/api/projects
# Should return: [] or array of projects
```

- [ ] Health endpoint returns OK
- [ ] Projects endpoint returns array

## ✅ Frontend Testing

### Start Frontend
- [ ] Open terminal in root directory
- [ ] Run `npm run dev`
- [ ] See "Local: http://localhost:5173/"
- [ ] No errors in terminal

### Test Home Page
- [ ] Open http://localhost:5173
- [ ] Page loads without errors
- [ ] Navigation menu visible
- [ ] Footer visible
- [ ] No console errors (F12)

### Test Work Page
- [ ] Navigate to http://localhost:5173/work
- [ ] See 6 existing projects:
  - [ ] Personify
  - [ ] Year Wrap
  - [ ] Brew n Crumbs
  - [ ] Smart Health
  - [ ] Italian Cuisine
  - [ ] Eye Opener
- [ ] All project cards render correctly
- [ ] Videos/thumbnails display
- [ ] No console errors

### Test Project Details
- [ ] Click on "Personify" title
- [ ] Navigate to `/work/personify`
- [ ] Project details page loads
- [ ] Title and description show
- [ ] Image gallery displays
- [ ] Back button works
- [ ] Repeat for 2-3 other existing projects
- [ ] All existing projects work

### Test Video Behavior
- [ ] Go back to `/work`
- [ ] Click on a project's video/thumbnail area
- [ ] Video starts playing in same card
- [ ] Card size doesn't change
- [ ] Click another project's video
- [ ] First video stops automatically
- [ ] Only one video plays at a time ✓
- [ ] Page doesn't jump or move ✓

## ✅ Admin Panel Testing

### Access Admin Panel
- [ ] Navigate to http://localhost:5173/admin
- [ ] Admin panel loads
- [ ] "Add New Project" form visible
- [ ] "All Projects from Database" section visible
- [ ] No console errors

### Add Test Project (No Images)
- [ ] Fill in Title: "Test Project"
- [ ] Fill in Short Description: "Testing the CMS"
- [ ] Fill in Tech Stack: "React, MongoDB"
- [ ] Leave images empty for now
- [ ] Click "Add Project"
- [ ] See success message
- [ ] Project appears in "All Projects" section

### Verify Test Project
- [ ] Go to http://localhost:5173/work
- [ ] See 7 projects now (6 existing + 1 new)
- [ ] New project appears at the bottom
- [ ] New project has same styling as others
- [ ] Click on new project title
- [ ] Navigate to `/work/test-project`
- [ ] Project detail page loads
- [ ] Title and description display

### Delete Test Project
- [ ] Go back to `/admin`
- [ ] Find "Test Project" in list
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Project removed from list
- [ ] Go to `/work`
- [ ] Back to 6 projects (only existing ones)

## ✅ Image Upload Testing

### Setup Cloudinary
- [ ] Have Cloudinary account
- [ ] Credentials in `server/.env`
- [ ] Cloud name is correct
- [ ] API key is correct
- [ ] API secret is correct

### Add Project with Thumbnail
- [ ] Go to `/admin`
- [ ] Fill in Title: "Image Test"
- [ ] Fill in Short Description: "Testing image upload"
- [ ] Select thumbnail image (< 10MB)
- [ ] Click "Add Project"
- [ ] Wait for upload (2-5 seconds)
- [ ] See success message
- [ ] No errors in console

### Verify Thumbnail Upload
- [ ] Go to `/work`
- [ ] Find "Image Test" project
- [ ] Thumbnail displays in card
- [ ] Image loads (not broken)
- [ ] Image is from Cloudinary (check URL)

### Add Project with Gallery
- [ ] Go to `/admin`
- [ ] Fill in Title: "Gallery Test"
- [ ] Fill in Short Description: "Testing gallery"
- [ ] Select thumbnail image
- [ ] Select 3-5 gallery images
- [ ] Click "Add Project"
- [ ] Wait for upload
- [ ] See success message

### Verify Gallery Upload
- [ ] Go to `/work`
- [ ] Find "Gallery Test" project
- [ ] Click on project title
- [ ] Navigate to detail page
- [ ] See all gallery images
- [ ] All images load correctly
- [ ] Click on an image
- [ ] Full-screen modal opens
- [ ] Click outside to close
- [ ] Works for all gallery images

## ✅ Complete Feature Testing

### Video URL
- [ ] Go to `/admin`
- [ ] Add project with video URL (YouTube or Cloudinary)
- [ ] Save project
- [ ] Go to `/work`
- [ ] Video displays in card
- [ ] Click to play video
- [ ] Video plays correctly

### Tech Stack
- [ ] Add project with tech stack: "React, Node.js, MongoDB"
- [ ] Go to project detail page
- [ ] Tech stack displays (if implemented in UI)

### GitHub/Live Links
- [ ] Add project with GitHub URL
- [ ] Add project with Live Demo URL
- [ ] Go to detail page
- [ ] Links display correctly (if implemented in UI)

### Featured Toggle
- [ ] Add project with "Featured" checked
- [ ] Save project
- [ ] Check if visual indicator shows (if implemented)

### Published Toggle
- [ ] Add project with "Published" unchecked
- [ ] Save project
- [ ] Go to `/work`
- [ ] Project should not appear (unpublished)
- [ ] Edit to Published = true (if edit feature exists)
- [ ] Project now appears

## ✅ Cross-Browser Testing

### Chrome
- [ ] All pages work
- [ ] Videos play
- [ ] Images load
- [ ] Admin works

### Firefox
- [ ] All pages work
- [ ] Videos play
- [ ] Images load
- [ ] Admin works

### Safari (if on Mac)
- [ ] All pages work
- [ ] Videos play
- [ ] Images load
- [ ] Admin works

### Mobile (Chrome/Safari)
- [ ] Responsive design works
- [ ] Cards stack properly
- [ ] Videos play
- [ ] Navigation works
- [ ] Admin panel usable

## ✅ Performance Testing

### Load Times
- [ ] Home page loads < 3 seconds
- [ ] Work page loads < 3 seconds
- [ ] Project detail loads < 2 seconds
- [ ] Admin panel loads < 2 seconds
- [ ] Images load progressively
- [ ] No long delays

### Network Tab (F12)
- [ ] Check API requests
- [ ] API responses < 500ms
- [ ] Images load from Cloudinary
- [ ] No 404 errors
- [ ] No CORS errors

## ✅ Error Handling

### Test Edge Cases
- [ ] Try to add project without title
  - [ ] Shows validation error
- [ ] Try to add project without description
  - [ ] Shows validation error
- [ ] Try to upload non-image file
  - [ ] Shows error or rejects file
- [ ] Try to upload huge file (> 50MB)
  - [ ] Shows file size error
- [ ] Navigate to non-existent project `/work/fake-project`
  - [ ] Shows "not found" message

## ✅ Data Persistence

### Refresh Tests
- [ ] Add a project
- [ ] Refresh the page
- [ ] Project still there
- [ ] Restart backend server
- [ ] Projects still load
- [ ] Close and reopen browser
- [ ] Projects persist

### Database Check
```bash
# In MongoDB shell
use portfolio
db.projects.find().pretty()
```
- [ ] See all created projects
- [ ] Data structure looks correct
- [ ] Cloudinary URLs are stored

## ✅ Production Readiness

### Security
- [ ] `.env` files NOT committed to git
- [ ] `.env` in `.gitignore`
- [ ] No secrets in code
- [ ] No API keys exposed

### Documentation
- [ ] README.md is clear
- [ ] Installation steps work
- [ ] API documentation exists
- [ ] Environment variables documented

### Build
```bash
# Test production build
npm run build
npm run preview
```
- [ ] Build succeeds
- [ ] Preview works
- [ ] No build errors
- [ ] Assets optimized

## ✅ Final Verification

### Complete Workflow
1. [ ] Start backend
2. [ ] Start frontend
3. [ ] View existing 6 projects on `/work`
4. [ ] Go to `/admin`
5. [ ] Add new project with:
   - [ ] Title
   - [ ] Description
   - [ ] Thumbnail
   - [ ] Gallery (3+ images)
   - [ ] Video URL
   - [ ] Tech stack
   - [ ] GitHub link
   - [ ] Live link
6. [ ] Go to `/work`
7. [ ] See 7 projects (6 + 1)
8. [ ] Click new project title
9. [ ] Detail page shows all data
10. [ ] All images display
11. [ ] Video plays
12. [ ] Links work
13. [ ] Go back to `/admin`
14. [ ] Delete test project
15. [ ] Verify it's gone from `/work`
16. [ ] Only 6 existing projects remain

### Everything Works!
- [ ] Existing projects preserved ✓
- [ ] New projects can be added ✓
- [ ] Images upload to Cloudinary ✓
- [ ] Projects display correctly ✓
- [ ] Admin panel functional ✓
- [ ] No errors anywhere ✓
- [ ] Ready for production ✓

## 🎉 Success!

If all boxes are checked, your portfolio CMS is working perfectly!

## 📝 Notes

### Issues Found
(Document any issues you encountered and how you fixed them)

### Custom Modifications
(Document any changes you made to the setup)

### Next Steps
- [ ] Add authentication to admin panel
- [ ] Deploy to production
- [ ] Add more projects
- [ ] Customize styling
- [ ] Add analytics
