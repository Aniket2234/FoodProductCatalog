# Netlify Deployment Guide

Your application is now ready to deploy on Netlify with MongoDB! 🎉

## ✅ What's Been Configured

- ✅ MongoDB integration with Mongoose
- ✅ Netlify serverless functions for API (`netlify/functions/api.ts`)
- ✅ Netlify configuration file (`netlify.toml`)
- ✅ Build scripts for production deployment
- ✅ CORS headers for cross-origin requests

## 📋 Deployment Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Ready for Netlify deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Netlify

#### Option A: Using Netlify Dashboard (Recommended)

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site" → "Import an existing project"**
3. Connect your GitHub repository
4. Netlify will auto-detect the settings from `netlify.toml`
5. **IMPORTANT: Add environment variable:**
   - Go to **Site settings → Environment variables**
   - Click **"Add a variable"**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://abhijeet18012001_db_user:oRmN22d9d7lUYxX4@product.zza5ljw.mongodb.net/?appName=Product`
6. Click **"Deploy site"**

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### 3. MongoDB Atlas Setup (Already Done ✅)

Your MongoDB Atlas is already configured with:
- Connection string: `mongodb+srv://abhijeet18012001_db_user:...@product.zza5ljw.mongodb.net`
- **IMPORTANT**: Make sure MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs)
  - Go to MongoDB Atlas → Network Access → Add IP Address
  - Select "Allow Access from Anywhere" (required for Netlify functions)

## 🔍 Testing Your Deployment

After deployment, your API will be available at:

```
https://your-site-name.netlify.app/.netlify/functions/api/products
https://your-site-name.netlify.app/.netlify/functions/api/categories
```

The frontend will be at:
```
https://your-site-name.netlify.app/
```

## 🛠️ Build Configuration

The `netlify.toml` file contains:

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist/public"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

This means:
- All `/api/*` requests go to your serverless function
- Frontend is served from `dist/public`

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Check that `MONGODB_URI` is set in Netlify environment variables
- Verify MongoDB Atlas allows IP `0.0.0.0/0`

### Error: "Function timeout"
- This is normal on first request (cold start)
- Subsequent requests will be faster

### Error: "404 on API routes"
- Check that your frontend is calling `/.netlify/functions/api/products` not `/api/products`
- Or verify the redirect in `netlify.toml` is working

## 📦 Environment Variables Needed

| Variable | Value | Where to Add |
|----------|-------|--------------|
| `MONGODB_URI` | Your MongoDB connection string | Netlify Dashboard → Site Settings → Environment Variables |

## 🚀 Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Rebuild on every push to `main` branch
- Run `npm run build`
- Deploy new version

## ✨ Your App URLs (After Deployment)

- **Frontend**: `https://your-site-name.netlify.app/`
- **API**: `https://your-site-name.netlify.app/.netlify/functions/api/`

---

**Note**: The app is using MongoDB Atlas (not Neon/PostgreSQL) for permanent data storage, which is perfect for Netlify deployments!
