# Sami's Health Tracker — PWA Deployment Guide

## What's in this zip:
- `index.html` — The full app (JSX + Recharts charts)
- `manifest.json` — PWA config (app name, icon, standalone mode)
- `sw.js` — Service worker (offline caching)
- `apple-touch-icon.png` — Home screen icon (180x180)
- `icon-192.png` / `icon-512.png` — PWA icons

## Deploy to GitHub Pages (FREE, ~5 minutes)

### Step 1: Create GitHub repo
1. Go to https://github.com → Sign in (or create free account)
2. Click the green **"New"** button (top left)
3. Repository name: `sami-health`
4. Set to **Public**
5. Click **"Create repository"**

### Step 2: Upload files
1. On the new repo page, click **"uploading an existing file"**
2. Drag ALL 6 files from the zip into the upload area
3. Click **"Commit changes"**

### Step 3: Enable GitHub Pages
1. Go to **Settings** tab (top of repo page)
2. Scroll down to **"Pages"** in the left sidebar
3. Under "Source" select **"Deploy from a branch"**
4. Branch: **main**, Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes, then your site is live at:
   `https://YOUR-USERNAME.github.io/sami-health/`

### Step 4: Add to Sami's iPhone Home Screen
1. Open Safari on her iPhone
2. Go to `https://YOUR-USERNAME.github.io/sami-health/`
3. Tap the **Share button** (box with up arrow at bottom)
4. Scroll down and tap **"Add to Home Screen"**
5. Name it: `Sami Health` (or whatever she wants)
6. Tap **Add**

Done! Purple heart icon on her home screen. Opens fullscreen like a real app.

## Important Notes
- All data is stored locally on her phone (localStorage)
- No accounts, no servers, completely private
- Works offline after first load (service worker caches everything)
- **Back up regularly** via Settings → Backup → Full Backup
- If she ever clears Safari data, the app data could be lost — backups are important!
