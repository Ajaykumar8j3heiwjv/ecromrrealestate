# Changes Made to Fix Black Screen Issue

## Files Modified:

### 1. vite.config.js
**Change**: Fixed JSX runtime configuration
- Switched from `jsxRuntime: 'classic'` to automatic JSX runtime (React 17+ default)
- This fixes the `jsxDEV is not a function` error
- Removed unnecessary Babel configuration
- Added proper terser options for minification

### 2. src/components/Hero.jsx
**Change**: Fixed hero background image path
- Changed from hardcoded `/src/assets/hero_bg.png` to proper import: `import heroBgImg from '../assets/hero_bg.png'`
- This ensures the image loads correctly in production

### 3. src/components/ContactSection.jsx
**Change**: Fixed hardcoded localhost URLs
- Line 71: Changed `'http://localhost:5173'` to `window.location.origin`
- Line 144: Changed hardcoded localhost to dynamic origin
- This allows form redirection to work in production

### 4. .env.production (New File)
**Change**: Created production environment variables template
- Template for setting API URLs and environment variables on Vercel

### 5. vercel.json
**Change**: Enhanced Vercel configuration
- Added explicit buildCommand and outputDirectory
- Added environment variable references

## How to Deploy:

1. **Commit changes to Git:**
   ```bash
   git add .
   git commit -m "Fix: Resolve jsxDEV error and production build issues"
   git push origin main
   ```

2. **Redeploy on Vercel:**
   - Go to vercel.com dashboard
   - Your project should auto-detect the new push
   - Click "Deploy" or wait for automatic deployment
   - Clear browser cache (Ctrl+Shift+Delete) and reload

3. **Set Environment Variables on Vercel:**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL=<your-backend-url-or-/api>`
   - Redeploy

## Testing:
The production build now works correctly locally on http://localhost:4174/ - no black screen, no jsxDEV error.
