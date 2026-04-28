# Keep-Alive Solution for Render Free Tier Cold Start

## Problem
Render's free tier spins down services after 15 minutes of inactivity, causing 30-60 second "cold start" delays.

## Solution Implemented

### 1. **Backend Keep-Alive Endpoint** ✅
**File:** `base/views/health_views.py`
- Lightweight GET/POST endpoint at `/api/keep-alive/`
- Returns minimal JSON response with timestamp
- No database queries - extremely fast

### 2. **Frontend Auto-Ping Service** ✅
**File:** `frontend/src/services/keepAliveService.js`
- Runs in the browser when app is open
- Pings backend every **10 minutes**
- Silently fails if network issues occur
- Integrated into `App.js` via `useEffect`

**How it works:**
```
User opens app → Keep-alive service starts → Pings every 10 min → Backend stays active
```

### 3. **GitHub Actions Cron Job** (Optional Backup) ✅
**File:** `.github/workflows/keep-alive.yml`
- Runs every 8 minutes automatically
- Free tier provided by GitHub
- Pings backend even when no users are active
- Works 24/7 without user interaction

---

## Setup Instructions

### Step 1: Deploy Backend Changes
```bash
cd c:\Users\hesai\Desktop\Python Projects\CoShop
git add base/views/health_views.py backend/urls.py
git commit -m "Add keep-alive endpoint for Render free tier"
git push
```

### Step 2: Deploy Frontend Changes
```bash
cd frontend
npm install  # Already done
git add src/services/keepAliveService.js src/App.js
git commit -m "Add keep-alive service for Render cold start prevention"
git push
```

### Step 3: Enable GitHub Actions (Optional but Recommended)
1. Push the `.github/workflows/keep-alive.yml` file
2. Go to GitHub repo → **Actions** tab
3. Enable workflows if disabled
4. **IMPORTANT:** Update the URL in the workflow file:
   ```yaml
   curl -X GET "https://YOUR_RENDER_APP_URL/api/keep-alive/" \
   ```
   Replace `YOUR_RENDER_APP_URL` with your actual Render app URL (e.g., `https://mycoshop.onrender.com`)

---

## How It Works

### Priority Order (Layered Approach):
1. **Frontend Service** (When app is used)
   - Pings every 10 minutes if user has app open
   - Low overhead, no cost

2. **GitHub Actions** (24/7 Backup)
   - Pings every 8 minutes always
   - Catches periods when no users are active
   - Free tier unlimited

### Timeline Example:
```
12:00 - User opens app → Frontend ping sent ✓
12:10 - Frontend auto-ping #1 ✓
12:18 - GitHub Actions auto-ping #1 ✓
12:20 - Frontend auto-ping #2 ✓
12:26 - GitHub Actions auto-ping #2 ✓
... service never reaches 15-minute inactivity window
```

---

## Testing Keep-Alive

### Test Backend Endpoint:
```bash
# In terminal:
curl https://YOUR_RENDER_APP_URL/api/keep-alive/
```

Expected response:
```json
{
  "status": "alive",
  "timestamp": "2026-04-28T10:30:45.123456Z"
}
```

### Test Frontend Service:
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Should see: `[KeepAlive] Service started - pinging every 10 minutes`
4. Every 10 minutes: `[KeepAlive] Ping successful at ...`

### Check GitHub Actions:
- Go to GitHub repo → **Actions** tab
- Should see workflow runs every 8 minutes
- Check logs to confirm successful pings

---

## Performance Impact

| Component | CPU | Memory | Network |
|-----------|-----|--------|---------|
| Frontend Service | <1% | <1MB | 1 request/10min |
| GitHub Actions | N/A | N/A | 1 request/8min |
| Backend Endpoint | <1ms | <1KB response | Minimal |

**Total:** ~4 requests per hour = essentially free on Render

---

## Benefits

✅ Eliminates cold start delays  
✅ Seamless user experience  
✅ Costs nothing (uses free tier features)  
✅ Layered redundancy (frontend + GitHub Actions)  
✅ Automatically handles edge cases  
✅ Can be disabled anytime by stopping the service  

---

## Disabling Keep-Alive

If needed, you can stop the service:

**In browser console:**
```javascript
keepAliveService.stop()
```

**Or disable GitHub Actions:**
- Go to `.github/workflows/keep-alive.yml` → delete or comment out

---

## Troubleshooting

**Problem:** Pings not showing in console  
**Solution:** Check browser console (F12 → Console tab) for errors

**Problem:** Backend endpoint returning 404  
**Solution:** Ensure you pushed the latest code and redeployed to Render

**Problem:** Cold start still occurring  
**Solution:** 
- Verify GitHub Actions is running (check Actions tab)
- Confirm Render URL in workflow file is correct
- Check that frontend service started (console should show `[KeepAlive] Service started`)

---

## Alternative Solutions (If Needed)

If this solution doesn't fully work:

1. **Upgrade Render Plan** - Paid tier doesn't have spin-down
2. **Use Different Provider** - AWS Lambda, Vercel, Netlify have better free tiers
3. **UptimeRobot** - Free external monitoring service with ping feature
4. **Heroku** - Alternative with similar free tier (though Heroku discontinued free tier)

---

## References

- [Render Documentation](https://render.com/docs)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [GitHub Actions Scheduling](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
