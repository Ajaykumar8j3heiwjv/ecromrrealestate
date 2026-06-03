# Deploy Backend to Render - Complete Guide

## Problem
- Frontend (Netlify) ✅ is deployed and working
- Admin page loads ✅
- But adding properties fails with "Failed to fetch" ❌

**Reason**: Backend API (`server/index.js`) is not deployed to production

---

## Solution: Deploy to Render (Free Tier)

### **Step 1: Create Render Account**
1. Go to [render.com](https://render.com)
2. Click **"Sign Up"**
3. Use GitHub to sign up (easier) or email
4. Verify email

### **Step 2: Create Web Service**
1. In Render Dashboard, click **"New +"**
2. Select **"Web Service"**
3. Select **"Deploy an existing repository"**
4. Find your repo: `ecromrrealestate`
5. Click **"Connect"**

### **Step 3: Configure Service**
Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | `ecromrrealestate-api` |
| **Root Directory** | `.` (leave empty) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server/index.js` |

### **Step 4: Add Environment Variables**
Click **"Advanced"** → **"Add Environment Variable"**

Add each one:

```
SUPABASE_URL=https://yvrhurpmyjzzmojmozfo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cmh1cnBteWp6em1vam1vemZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE4NDEzOCwiZXhwIjoyMDkwNzYwMTM4fQ.D6W7gCx4HrxN9HxXBT0RhLJPqDpXTzT42IYkcvEMff8
PORT=10000
NODE_ENV=production
```

### **Step 5: Deploy**
Click **"Create Web Service"**

- Wait 2-3 minutes for build
- You'll see a live URL like: `https://ecromrrealestate-api.onrender.com`

### **Step 6: Test Backend**
Visit: `https://ecromrrealestate-api.onrender.com/properties`

You should see your properties list (JSON).

---

## Step 7: Update Netlify Environment Variable

Once Render deployment is complete:

1. Go to **Netlify Dashboard**
2. Select your site: `ecromrrealestate`
3. Go to **Settings → Environment variables**
4. Find or create: `VITE_API_URL`
5. Set value to: `https://ecromrrealestate-api.onrender.com`
6. Click **"Save"**
7. Go to **Deploys** → Click **"Trigger Deploy"**
8. Wait for build to complete ✓

---

## Step 8: Test Everything

1. Go to `https://ecromrrealestate.com/admin`
2. Try adding a property
3. Should now save to database ✅
4. Go to Listings page, click Refresh
5. New property should appear ✅

---

## Important Notes

### **Render Free Tier**
- ✅ Free to deploy
- ✅ Auto-stops after 15 mins of inactivity
- ❌ Wakes up after 30-50 seconds on first request
- Solution: Keep hitting the site to keep it alive, or upgrade to paid ($7/month)

### **If Backend Falls Asleep**
First request takes 30-50 seconds to wake up. This is normal on free tier.

### **Custom Domain (Optional)**
You can use a custom domain for Render backend:
1. Add your domain in Render settings
2. Update DNS records (Render will show you how)
3. Use that custom domain in `VITE_API_URL`

---

## Troubleshooting

### **Still Getting "Failed to fetch"**
1. Check Render deployment logs for errors
2. Verify Supabase credentials in environment variables
3. Test the API directly: `https://ecromrrealestate-api.onrender.com/properties`
4. Check Netlify build logs

### **Getting CORS errors**
Already configured in `server/index.js`:
```javascript
app.use(cors({ origin: '*' }))
```
This allows all origins, so CORS shouldn't be an issue.

### **Backend URL Not Updating**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Or trigger a fresh Netlify deploy

---

## Summary

```
Your Backend (server/index.js)
         ↓
Deploy to Render
         ↓
Get URL (e.g., https://ecromrrealestate-api.onrender.com)
         ↓
Update VITE_API_URL in Netlify
         ↓
Trigger Netlify Redeploy
         ↓
Admin page can now add properties! ✅
```

**Estimated time: 10-15 minutes**

---

**Need help? Check Render logs at your service dashboard for detailed error messages.**
