# Production configuration

Set these variables in the server host. `CLIENT_ORIGIN` may contain a comma-separated list of approved client origins.

```env
PORT=5000
CLIENT_ORIGIN=https://app.example.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=a-long-random-production-secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=production
# Use none only when client and API are on different sites; HTTPS is then required.
COOKIE_SAME_SITE=lax
SMTP_HOST=...
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=no-reply@example.com
```

Set these variables in the client host before building the Vite application.

```env
VITE_API_URL=https://api.example.com/api
VITE_SOCKET_URL=https://api.example.com
```

Use a separate MongoDB database and Cloudinary account or folder for E2E tests. Copy the `E2E_*` values from `server/.env.example`, set `RUN_E2E=true`, then run:

```bash
cd server
npm run test:e2e
```

The E2E test creates and removes its database records, but Cloudinary upload artifacts should be isolated by configuring `E2E_CLOUDINARY_FOLDER`.

After deploying the barter-conversation update, run this once against the intended database to link requests created before the update:

```bash
cd server
npm run migrate:barter-conversations
```
