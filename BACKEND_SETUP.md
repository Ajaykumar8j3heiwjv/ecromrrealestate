# Backend Server Setup - IMPORTANT!

## Current Status
✅ **API Server Running** on `http://localhost:10000`
✅ **Environment Fixed** - Now using local backend for development

## What Was Wrong
- `.env` was pointing to production backend (`https://ecromrrealestate.onrender.com`)
- API server wasn't running locally
- Frontend couldn't communicate with backend

## What's Fixed Now
1. ✅ Commented out `VITE_API_URL` in `.env`
2. ✅ Started API server on port 10000
3. ✅ Vite proxy now forwards `/api/*` requests to `http://localhost:10000`

## How to Use

### **Starting the Development Environment**

Open **2 Terminal Windows**:

#### **Terminal 1 - Backend Server (API)**
```powershell
cd c:\Users\smily\Desktop\ecromrrealestate
node server/index.js
```
You should see: `🚀 ECR OMR API server running on port 10000`

#### **Terminal 2 - Frontend Dev Server**
```powershell
cd c:\Users\smily\Desktop\ecromrrealestate
npm run dev
```
You should see: `Local: http://localhost:5173/` (or similar)

## Now You Can
✅ Add properties via Admin panel
✅ See properties on Listings page
✅ Submit enquiries
✅ Everything will save to Supabase database

## If Adding Property Still Fails
1. Check Terminal 1 - Are you seeing server logs?
2. Check browser console (F12) - Any error messages?
3. Verify Supabase credentials in `.env` are correct
4. Restart both servers

## For Production (Render/Vercel)
1. Deploy backend to Render
2. Copy the Render URL
3. In Vercel dashboard → Settings → Environment Variables → Add:
   - Key: `VITE_API_URL`
   - Value: `https://your-render-backend-url`

## Important Files
- `server/index.js` - Backend API server
- `.env` - Environment configuration
- `vite.config.js` - Proxy setup
- `src/data/propertyStore.js` - Frontend data layer

---
**Keep both terminals running while developing!**
