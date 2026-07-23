# Deploy QuranApp to Render — 5 Minute Guide

This guide gets your app live on [Render](https://render.com) using the included Dockerfile.

## Prerequisites

- A [Render](https://render.com) account (free to sign up)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) free cluster (Render has no managed MongoDB) — grab your connection string
- This repo pushed to GitHub

## Option A: One-Click via render.yaml (Recommended)

1. **Push this repo to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add deployment config"
   git push origin main
   ```

2. **Create a new Blueprint on Render:**
   - Go to https://dashboard.render.com/select-repo?type=blueprint
   - Select your repository — Render will detect `render.yaml` automatically

3. **Set the two required secret env vars** in the Render dashboard (Environment tab) before first deploy:
   - `MONGO_URI` → your MongoDB Atlas connection string
   - `CORS_ORIGIN` → your Render app URL, e.g. `https://quranapp.onrender.com`

Render will build the Docker image and deploy automatically. Done!

## Option B: Manual Web Service Setup

1. **Log in to Render** → Click **New +** → **Web Service**
2. **Connect your GitHub repo**
3. Configure:
   - **Runtime:** Docker
   - **Dockerfile Path:** `./Dockerfile`
   - **Health Check Path:** `/health`
   - **Plan:** Starter (or Free)
4. **Add environment variables:**
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGO_URI` | your Atlas connection string |
   | `CORS_ORIGIN` | your Render service URL |
5. Click **Create Web Service**

## Enable Auto-Deploy from GitHub Actions (Optional but Recommended)

1. In Render, go to your service → **Settings** → **Deploy Hook** → copy the URL
2. In GitHub, go to repo **Settings → Secrets and variables → Actions**
3. Add a secret named `RENDER_DEPLOY_HOOK_URL` with the copied URL
4. Every push to `main` will now build, test, then trigger a Render deploy automatically

## Run Locally with Docker (Test Before Deploying)

```bash
docker compose up --build
```

Then visit: http://localhost:10000/health — should return `200 OK`

## Verify Production Deployment

```bash
curl https://<your-app-name>.onrender.com/health
```

You should see a `200` response confirming the server and DB connection are healthy.

---

**Important:** Your `server/index.js` must expose a `GET /health` route returning HTTP 200 (e.g. `{ status: "ok" }`) for the health checks in Docker and Render to pass. Add this if it doesn't exist yet:

```js
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));