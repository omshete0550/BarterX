# BarterX

BarterX is a full-stack peer-to-peer marketplace for exchanging products without money. Users can publish listings, discover products, propose swaps, communicate in real time, and save items to a wishlist.

The project also includes ML-powered visual search: a user can take or upload a product photo, and BarterX returns visually similar active listings.

> **Don't buy it. Barter it.**

## Highlights

- JWT-based registration, login, and protected routes
- Product listings with Cloudinary image uploads
- Text search, category, condition, location, sorting, and pagination filters
- Camera or image-upload visual product search powered by CLIP embeddings
- Product swap requests, conversations, Socket.IO notifications, and ratings
- Wishlists, saved items, public profiles, and editable user/product profiles
- Responsive React interface for desktop and mobile

## Architecture

```text
React + Vite client
        |
        v
Node.js + Express API ---- MongoDB / Cloudinary
        |
        v
Local FastAPI ML service (CLIP image embeddings)
```

The browser communicates only with the Express API. The API sends uploaded product/search images to the Python service, stores image embeddings with products, and returns matched listings.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Client | React, Vite, Redux Toolkit, React Router, Axios, Lucide, CSS |
| API | Node.js, Express, Mongoose, JWT, Socket.IO, Multer |
| Data & media | MongoDB, Cloudinary |
| ML service | Python, FastAPI, PyTorch, Transformers, CLIP, Pillow |
| Testing | Node test runner, Supertest |

## Project structure

```text
BarterX/
├── client/                 # React application
│   └── src/
│       ├── api/            # Axios and authentication helpers
│       ├── component/      # Common, layout, product, and search components
│       ├── features/       # Redux slices and API requests
│       ├── pages/          # Application pages
│       └── routes/         # Route definitions and guards
├── server/                 # Express API
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── utils/
├── ml-service/             # Local FastAPI and ML training/inference code
│   └── app/
│       ├── embeddings.py
│       ├── fashion_classifier.py
│       ├── main.py
│       └── train_fashion_classifier.py
├── DEPLOYMENT.md
└── README.md
```

## Prerequisites

- Node.js 20 or later
- Python 3.10–3.12
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account
- Git

## Local setup

Clone the repository and install each service's dependencies:

```bash
git clone <repository-url>
cd BarterX
```

### 1. Configure the Express API

Copy `server/.env.example` to `server/.env` and set the required values:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ML_SERVICE_URL=http://127.0.0.1:8000
```

Install and start the API:

```bash
cd server
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### 2. Start the ML service

Open a second terminal:

```powershell
cd ml-service
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The ML service runs at `http://127.0.0.1:8000`. On its first start, Transformers downloads the CLIP model. This can take several minutes and requires an internet connection.

Check it with:

```text
http://127.0.0.1:8000/health
```

### 3. Start the React client

Open a third terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Visual search workflow

1. A seller creates or updates a product with images.
2. Express sends each uploaded image to `POST /embed` on the ML service.
3. The CLIP embedding is saved with the MongoDB product record.
4. A buyer takes/uploads a photo using **Search by Photo**.
5. `POST /api/products/visual-search` creates an embedding for the query image and ranks active products by cosine similarity.
6. The client displays the matching BarterX product cards.

For visual search to return a listing, that listing must have been created or had its images replaced while `ML_SERVICE_URL` was configured.

## ML learning assets

`ml-service` also contains optional training scripts used for the fashion category classifier:

```text
prepare_fashion_data.py       # Validates image/label pairs
split_fashion_data.py         # Creates train and validation CSV files
evaluate_fashion_baseline.py  # Measures zero-shot CLIP accuracy
train_fashion_classifier.py   # Trains a linear classifier on frozen CLIP embeddings
```

The classifier predicts `Apparel`, `Accessories`, `Footwear`, or `Personal Care`. It is separate from general visual product search, which uses image similarity and supports all marketplace categories.

## Available scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Build the production client |
| `client` | `npm run lint` | Run ESLint |
| `server` | `npm run dev` | Start Express with Nodemon |
| `server` | `npm start` | Start Express in production mode |
| `server` | `npm run test:e2e` | Run configured end-to-end tests |
| `server` | `npm run migrate:barter-conversations` | Run the barter conversation migration |

## Environment and deployment

Never commit real `.env` files, JWT secrets, database connection strings, Cloudinary credentials, or user data. See [DEPLOYMENT.md](DEPLOYMENT.md) for production variables, deployment order, E2E testing, and ML-service hosting guidance.

## Author

Om Shete
