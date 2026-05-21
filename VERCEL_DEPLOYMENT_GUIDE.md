# Vercel Deployment Guide

## Current Issues Fixed
1. ✅ Hardcoded `localhost:5173` URLs in ContactSection.jsx - Now uses `window.location.origin`
2. ✅ Hero background image path - Now uses proper import instead of hardcoded `/src/assets` path

## Step 1: Prepare Environment Variables
Create a `.env.production` file locally (copy from `.env.example`):

```bash
VITE_API_URL=https://your-backend-url.com
```

Or, if using Vercel serverless functions, leave it as `/api`.

## Step 2: Configure Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `VITE_API_URL`: Set to your backend URL (or leave empty to use `/api`)
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for backend)
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key (for frontend)

## Step 3: Deploy Backend (Choose One Option)

### Option A: Deploy Express Backend on Render (Recommended for API routes)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the following:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Environment Variables: Copy from `.env.example`
6. Deploy and note the URL (e.g., `https://your-app.onrender.com`)
7. Update Vercel environment variable: `VITE_API_URL=https://your-app.onrender.com`

### Option B: Deploy Express Backend to Vercel as Serverless Functions

1. Create an `api/` directory at the project root
2. Convert server routes to Vercel functions (see example below)
3. Deploy to Vercel (same project as frontend)

### Option C: Use Firebase/Supabase Edge Functions (No Backend Needed)

Since your app already uses Supabase, you can call Supabase directly from the frontend by:
1. Removing API calls and using Supabase client directly
2. Or setting up Supabase Edge Functions for custom logic

## Step 4: Deploy Frontend to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Build command should be: `npm run build`
4. Output directory: `dist`
5. Deploy!

## Step 5: Troubleshooting

### If You See a Black Screen:

1. **Check Browser Console** (F12 → Console):
   - Look for JavaScript errors
   - Check for CORS errors
   - Check Network tab for failed requests

2. **Check Vercel Deployment Logs**:
   - Go to Vercel dashboard → Deployments → View Build Logs
   - Look for build errors or missing environment variables

3. **Common Issues**:
   - Missing VITE_API_URL: The app defaults to `/api` which may not exist
   - Backend not running: The app has fallback data, so it should still load
   - CORS errors: Check backend CORS configuration

### To Enable Debug Mode:

Add this to your browser console:
```javascript
localStorage.setItem('debug', 'true')
```

This will log additional information to the console.

## API Routes

### Current API Endpoints:
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `POST /api/contact` - Send contact form
- `GET /api/enquiries` - Get inquiries
- `DELETE /api/enquiries/:id` - Delete inquiry

## Notes:

- The frontend has fallback data (3 default properties) that loads if the API fails
- ContactSection redirects to `window.location.origin` after form submission
- All image paths are relative and handled by Vite
- The app should work even without a backend API (limited functionality)

## Quick Checklist Before Deployment:

- [ ] `.env.production` configured locally
- [ ] Environment variables added to Vercel
- [ ] Backend deployed or serverless functions set up
- [ ] `VITE_API_URL` points to correct backend
- [ ] Vercel deployment successful
- [ ] Browser console has no errors
- [ ] Site loads with content (not black screen)

## Contact Troubleshooting:

If contact form still shows 502 errors, the backend may not be properly configured. Ensure:
1. Backend is running/deployed
2. CORS is enabled in Express: `app.use(cors({ origin: '*' }))`
3. Email configuration (SMTP) is set up
4. Environment variables are correct on backend

---

For more help, check Vercel docs: https://vercel.com/docs
