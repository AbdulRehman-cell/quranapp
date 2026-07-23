# Deploy QuranApp to Render — 5 Minute Guide

This guide gets you from zero to a live, production-ready deployment on [Render](https://render.com).

## Prerequisites

- A [Render account](https://dashboard.render.com/register) (free)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) free-tier cluster (or any MongoDB URI)
- This repo pushed to GitHub/GitLab

## 1. Get your MongoDB connection string

1. In MongoDB Atlas, create a free cluster (M0).
2. Go to **Database Access** → create a user with a strong password.
3. Go to **Network Access** → allow access from `0.0.0.0/0` (or Render's IPs).
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/quranapp?retryWrites=true&w=majority
   ```

## 2. Deploy to Render (Blueprint method — fastest)

```bash
# 1. Push your code (if not already)
git add .
git commit -m "Add Render deployment config"
git push origin main
```

```bash
# 2. Install Render CLI (optional, or just use the dashboard)
brew install render   # macOS, or see https://render.com/docs/cli
```

```bash
# 3. Launch the blueprint (or do this via dashboard: New > Blueprint > select repo)
render blueprint launch
```

### Or via Dashboard (no CLI needed)

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
2. Connect your GitHub repo — Render auto-detects `render.yaml`.
3. When prompted, set these environment variables:
   | Key | Value |
   |---|---|
   | `MONGO_URI` | your Atlas connection string from step 1 |
   | `CORS_ORIGIN` | `https://<your-service-name>.onrender.com` |
4. Click **Apply** — Render builds the Dockerfile and deploys automatically.

## 3. Verify deployment

Once deployed, Render gives you a URL like `https://quranapp.onrender.com`.

```bash
curl https://quranapp.onrender.com/health
```

You should see a `200 OK` response. If it fails, check **Logs** in the Render dashboard.

## 4. Enable auto-deploy from GitHub Actions (optional but recommended)

1. In Render Dashboard → your service → **Settings** → copy the **Deploy Hook URL**.
2. In your GitHub repo → **Settings → Secrets and variables → Actions**, add:
   - `RENDER_DEPLOY_HOOK_URL` = the URL you copied.
3. Now every push to `main` runs tests, builds the Docker image, and triggers a Render deploy via `.github/workflows/deploy.yml`.

## Local testing before deploy

```bash
docker compose up --build
curl http://localhost:10000/health
```

## Troubleshooting

- **Build fails on client**: ensure `client/package.json` has a `build` script outputting to `client/dist`.
- **App can't connect to MongoDB**: double check `MONGO_URI` and that Atlas Network Access allows `0.0.0.0/0`.
- **Health check failing**: confirm your Express server has a `GET /health` route returning `200`.