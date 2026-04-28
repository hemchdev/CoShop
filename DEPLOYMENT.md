# CoShop - Deployment Guide

## 🚀 Free Deployment Options

This guide covers deploying both frontend and backend for **FREE**.

---

## Backend Deployment (Django API)

### Option 1: **Render.com** (Recommended - Free Tier)

**Free Tier Includes:**
- 0.5 GB RAM
- Free PostgreSQL database (500 MB)
- SSL/HTTPS included
- GitHub integration

**Steps:**

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `coshop-backend`
   - Runtime: `Python 3.11`
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - Start Command: `gunicorn backend.wsgi`

3. **Add Environment Variables**
   - Go to "Environment"
   - Add these variables:
     ```
     DEBUG=False
     SECRET_KEY=your-very-secret-key-here-generate-a-random-string
     ALLOWED_HOSTS=coshop-backend.onrender.com
     DATABASE_URL=postgresql://... (will be provided by Render)
     CORS_ORIGINS=https://your-frontend-domain.vercel.app
     ```

4. **Connect Database**
   - Render auto-creates a PostgreSQL database
   - DATABASE_URL is auto-added to environment

5. **Deploy**
   - Push to GitHub
   - Render auto-deploys

**Your Backend URL:** `https://coshop-backend.onrender.com`

---

## Frontend Deployment (React App)

### Option: **Vercel** (Best for React - Free Tier)

**Free Tier Includes:**
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- GitHub integration

**Steps:**

1. **Deploy with Vercel**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```
   Or use GitHub integration at [vercel.com](https://vercel.com)

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://coshop-backend.onrender.com
     ```

3. **Update Frontend Code**
   - In `frontend/src/store.js` or API config, update API base URL:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

**Your Frontend URL:** `https://coshop.vercel.app` (or your custom domain)

---

## Database Setup

### PostgreSQL on Render
- Automatically provisioned with free web service
- 500 MB free storage
- Automatically backed up

### Run Initial Migrations
```bash
# After deploying backend to Render
curl https://coshop-backend.onrender.com/api/products/

# First request will run migrations automatically via build script
```

---

## CORS Configuration

Update your backend `ALLOWED_HOSTS` and `CORS_ORIGINS`:

**Backend (.env on Render):**
```
ALLOWED_HOSTS=coshop-backend.onrender.com
CORS_ORIGINS=https://coshop.vercel.app
```

**Frontend (.env on Vercel):**
```
REACT_APP_API_URL=https://coshop-backend.onrender.com
```

---

## Alternative: All-in-One Free Options

### **Railway.app**
- Free tier: $5/month credit
- Easy GitHub deployment
- PostgreSQL included

### **Fly.io**
- Free tier includes services
- PostgreSQL available
- Global deployment

### **PythonAnywhere** (Backend only)
- Free tier: basic web app
- Limited features but completely free

### **Netlify** (Frontend)
- Free tier: unlimited sites
- Great for static builds

---

## Cost Breakdown (Completely FREE)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Render Backend | 0.5GB RAM, PostgreSQL | **FREE** |
| Vercel Frontend | Unlimited deployments | **FREE** |
| Custom Domain | No (or $12/yr) | **FREE** |
| **Total Monthly** | | **$0** |

---

## Deployment Checklist

### Before Deploying:

- [ ] Generate a strong `SECRET_KEY`
- [ ] Set `DEBUG=False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set `CORS_ORIGINS` correctly
- [ ] Test locally with `.env` file
- [ ] Commit all changes to GitHub
- [ ] Update API URLs in frontend

### After Deploying:

- [ ] Test login/register
- [ ] Test product listing
- [ ] Test creating orders
- [ ] Monitor logs for errors
- [ ] Set up backups for database

---

## Common Issues

### **CORS Errors**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `CORS_ORIGINS` in backend `.env` to match your frontend URL

### **Database Connection Failed**
```
psycopg2.OperationalError: could not connect to server
```
**Solution:** Check `DATABASE_URL` in environment variables

### **Static Files Not Loading**
```
GET /static/css/main.css 404
```
**Solution:** Run `python manage.py collectstatic` in build script

### **Frontend Shows Blank Page**
```
Error in console: API not responding
```
**Solution:** 
1. Check `REACT_APP_API_URL` env variable
2. Verify backend is running
3. Check CORS configuration

---

## Environment Variables Reference

### Backend (.env)
```
SECRET_KEY=generate-random-string-min-50-chars
DEBUG=False
ALLOWED_HOSTS=coshop-backend.onrender.com,localhost
DATABASE_URL=postgresql://user:pass@host:5432/db
CORS_ORIGINS=https://coshop.vercel.app,http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=https://coshop-backend.onrender.com
```

---

## Monitoring & Logs

### Render Logs
- Dashboard → Your Service → Logs tab
- Real-time error tracking

### Vercel Logs
- Dashboard → Your Project → Deployments
- Live function logs

---

## Next Steps

1. Push code to GitHub
2. Create Render account & deploy backend
3. Create Vercel account & deploy frontend
4. Update environment variables
5. Test full workflow
6. Share your live app! 🎉

---

**Need Help?**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Django Deployment: https://docs.djangoproject.com/en/5.0/howto/deployment/

