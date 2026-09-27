# Deployment guide

This guide covers the BarterX React client, Express API, MongoDB/Cloudinary configuration, and the optional ML service required for visual image search.

## Deployment architecture

```text
Browser
  |
  v
Static React host
  |
  v
Express API host ---- MongoDB Atlas / Cloudinary
  |
  v
FastAPI ML service (required for visual search)
```

The ML service should be treated as a separate long-running Python process. Do not deploy the PyTorch/CLIP service as a Vercel serverless function.

## 1. Production API configuration

Set these variables in the Express API host. `CLIENT_ORIGIN` can contain a comma-separated list of allowed frontend origins.

```env
PORT=5000
CLIENT_ORIGIN=https://app.example.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=a-long-random-production-secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ML_SERVICE_URL=https://ml.example.com
NODE_ENV=production
COOKIE_SAME_SITE=lax
SMTP_HOST=...
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=no-reply@example.com
```

`ML_SERVICE_URL` is required for product-image embeddings, visual search, and image classification. The URL must not end with a slash.

Use `COOKIE_SAME_SITE=none` only if the client and API are on different sites, and only over HTTPS.

## 2. Client configuration

Set these build-time variables before building the Vite client:

```env
VITE_API_URL=https://api.example.com/api
VITE_SOCKET_URL=https://api.example.com
```

Build the client:

```bash
cd client
npm ci
npm run build
```

Deploy the generated `client/dist` folder to a static host. The included `client/vercel.json` supports Vercel SPA routing.

## 3. ML service

### Local demonstration setup

For a college demonstration, run the ML service on the same machine as the API:

```powershell
cd ml-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Set the API environment variable:

```env
ML_SERVICE_URL=http://127.0.0.1:8000
```

### Hosted setup

For a hosted API, `ML_SERVICE_URL` must point to a publicly reachable or private-network ML service. A local `127.0.0.1` ML URL works only when both processes run on the same machine.

Use this start command for a FastAPI host:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Configure the ML host health check to call:

```text
/health
```

The current CLIP/PyTorch service needs at least 2 GB RAM. Free 512 MB instances are not sufficient. The ML service downloads the base CLIP model on first start, so expect a slower first deployment/startup.

The saved classifier file `ml-service/models/fashion_category_head.pt` is required by the `/classify` endpoint. Keep it available in the service build artifact or retrain it before starting the service.

## 4. Post-deployment checks

Verify each service in this order:

1. Express API root returns a response:

   ```text
   GET https://api.example.com/
   ```

2. ML service health check returns:

   ```json
   { "status": "ok" }
   ```

3. Register and sign in through the deployed client.
4. Create a new product with an image while `ML_SERVICE_URL` is configured.
5. Call `POST /api/products/visual-search` with an authenticated multipart field named `image`.
6. Confirm that the client **Search by Photo** flow displays the matching listing.

## E2E tests

Use a dedicated database and Cloudinary folder. Copy the `E2E_*` variables from `server/.env.example`, set `RUN_E2E=true`, then run:

```bash
cd server
npm run test:e2e
```

The suite creates and removes its own database records. Use a separate Cloudinary folder through `E2E_CLOUDINARY_FOLDER` to isolate uploaded test artifacts.

## One-time migration

After deploying the barter-conversation update, run this once against the intended database:

```bash
cd server
npm run migrate:barter-conversations
```

## Security checklist

- Store all secrets in the host's environment-variable manager; never commit `.env` files.
- Use a strong, unique production `JWT_SECRET`.
- Restrict `CLIENT_ORIGIN` to the deployed client domain(s).
- Use HTTPS for all public client, API, and ML-service traffic.
- Keep MongoDB network access and Cloudinary credentials restricted to the intended deployment.
- If the ML service is publicly accessible, protect it with private networking or a service-to-service secret before exposing it to real users.
