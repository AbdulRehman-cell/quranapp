# Deploy QuranApp to Render — 5 Minute Guide

This guide gets your app live on [Render](https://render.com) using Docker, with MongoDB included.

## Prerequisites

- A [GitHub](https://github.com) account with this repo pushed to it
- A [Render](https://render.com) account (free to sign up)
- Docker installed locally (optional, only for testing before deploy)

---

## Option A: One-Click Deploy via `render.yaml` (Recommended)

Render can read the `render.yaml` in this repo and provision everything automatically.

### Steps

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add production deployment config"
   git push origin main
   ```

2. **Create a new Blueprint on Render:**
   - Go to https://dashboard.render.com/blueprints
   - Click **New Blueprint Instance**
   - Connect your GitHub repo
   - Render detects `render.yaml` automatically and provisions:
     - The `quranapp` web service (Docker)
     - The `quranapp-mongo` database

3. **Set required environment variables** in the Render dashboard for the `quranapp` service:
   - `MONGO_URI` → copy the internal connection string from the `quranapp-mongo` database page
   - `CORS_ORIGIN` → your Render service URL, e.g. `https://quranapp.onrender.com`

4. **Click Apply** — Render builds the Docker image and deploys it. First deploy takes ~3-5 minutes.

Your app will be live at:
```
https://quranapp.onrender.com
```

---

## Option B: Manual Web Service Setup

If you prefer not to use the Blueprint:

1. Go to https://dashboard.render.com/create?type=web
2. Connect your GitHub repository
3. Configure:
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Health Check Path**: `/healthz`
   - **Plan**: Starter (or Free for testing)
4. Add environment variables (from `.env.example`):
   - `NODE_ENV=production`
   - `PORT=10000`
   - `MONGO_URI=<your MongoDB connection string>`
   - `CORS_ORIGIN=<your deployed URL>`
5. Click **Create Web Service**

For the database, either:
- Use **MongoDB Atlas** (free tier) → https://www.mongodb.com/cloud/atlas/register, then paste the connection string into `MONGO_URI`
- Or add a Render-managed Mongo via the Blueprint method above

---

## Enable Auto-Deploy from GitHub Actions (Optional)

1. In your Render service settings, go to **Settings → Deploy Hook** and copy the URL.
2. In your GitHub repo, go to **Settings → Secrets and variables → Actions**.
3. Add a new secret:
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: (paste the deploy hook URL)
4. Every push to `main` will now build, test, and trigger a Render deploy automatically via `.github/workflows/deploy.yml`.

---

## Test Locally Before Deploying

```bash
# Build and run with Docker Compose (includes local MongoDB)
docker compose up --build

# App available at http://localhost:10000
# Health check: http://localhost:10000/healthz
```

To stop:
```bash
docker compose down
```

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Build fails on client | Ensure `client/package.json` has a `build` script outputting to `client/dist` |
| Health check fails | Confirm your server exposes a `GET /healthz` route returning `200 OK` |
| Mongo connection refused | Double-check `MONGO_URI` matches Render's internal DB URL exactly |
| CORS errors in browser | Set `CORS_ORIGIN` to your exact deployed frontend URL (no trailing slash) |