# Frontend Deployment Fix Guide

## Issue
Vercel build failed with `npm install` exiting with code 1.

## Root Cause
The `react-paypal-button-v2` package has peer dependency conflicts with React 18, requiring `--legacy-peer-deps` flag.

## Solution Applied ✅

### 1. Added `.npmrc` Configuration
Created `frontend/.npmrc` to tell npm to use legacy peer deps:
```
legacy-peer-deps=true
```

### 2. Configured API URL Dynamically
Updated `frontend/src/App.js` to read the API URL from environment variables:
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
axios.defaults.baseURL = apiUrl;
```

This ensures:
- **Local Development**: Uses `http://localhost:8000` (via proxy)
- **Production**: Uses `https://coshop-backend-lkbk.onrender.com`

### 3. Environment Files Setup

**Development**: `.env.local`
```
REACT_APP_API_URL=http://localhost:8000
```

**Production**: `.env.production`
```
REACT_APP_API_URL=https://coshop-backend-lkbk.onrender.com
```

### 4. Updated Vercel Configuration
`frontend/vercel.json`:
- Specifies build command
- Sets output directory
- Configures SPA rewrites

## Files Changed
- ✅ `frontend/.npmrc` - npm configuration
- ✅ `frontend/.env.local` - local dev environment
- ✅ `frontend/.env.production` - production environment
- ✅ `frontend/src/App.js` - axios base URL configuration
- ✅ `frontend/vercel.json` - Vercel deployment config
- ✅ `frontend/src/api.js` - axios client (new)

## Next Steps

1. **Commit and push** all changes to GitHub:
   ```bash
   git add .
   git commit -m "fix: Configure frontend for production deployment"
   git push origin master
   ```

2. **Retry deployment** on Vercel:
   - Go to your Vercel dashboard
   - Click "Redeploy" on the failed deployment
   - Or push another commit to trigger auto-deploy

3. **Verify environment variables** in Vercel:
   - Project Settings → Environment Variables
   - Ensure `REACT_APP_API_URL` is set to your backend URL
   - Should already be set if you configured it before

## Testing After Deployment

1. **Visit your Vercel URL**
2. **Check browser console** for API errors
3. **Test API calls**:
   - Product listing should load
   - Try login/register
   - Try adding to cart
4. **Check Vercel logs** for any errors:
   - Dashboard → Deployments → Logs

## Debugging Commands

### Local Development
```bash
cd frontend
npm start
# Uses proxy to http://localhost:8000
```

### Production Build Test
```bash
cd frontend
REACT_APP_API_URL=https://coshop-backend-lkbk.onrender.com npm run build
# Tests if build works with production URL
```

## Common Issues After Fix

### Still Getting CORS Errors
- Backend `CORS_ORIGINS` env var must include your Vercel domain
- Check Render dashboard → Environment

### API Returning 404
- Verify backend URL is correct in `.env.production`
- Check if backend service is running on Render

### Blank Page After Deploy
- Check Vercel deployment logs
- Check browser DevTools → Network tab
- Verify `REACT_APP_API_URL` is being used

## Vercel Deployment URLs

- **Frontend**: https://coshop-frontend-git-master-hemanth-sai-chinthalapudis-projects.vercel.app/
- **Backend**: https://coshop-backend-lkbk.onrender.com/

## API Configuration

All API requests now use:
- **Development**: `http://localhost:8000/api/...`
- **Production**: `https://coshop-backend-lkbk.onrender.com/api/...`

The axios configuration automatically selects the correct URL based on `REACT_APP_API_URL` environment variable.

