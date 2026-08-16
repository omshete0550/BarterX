# BarterX

### A modern platform for exchanging products without money.

BarterX is a peer-to-peer product exchange platform that allows people to **trade products directly with each other** instead of buying and selling them with money.

The idea is simple: you have something you no longer need, someone else has something you want, and BarterX helps you find each other and make the exchange.

---

## What is BarterX?

Traditional marketplaces focus on buying and selling products with money. BarterX takes a different approach by focusing on **product-to-product exchanges**.

Users can list products they want to exchange, discover products listed by other users, and propose a swap based on what they are looking for.

For example:

> You have a pair of headphones and want a mechanical keyboard.
> Another user has a mechanical keyboard and is interested in headphones.
> BarterX allows both users to discover each other and propose an exchange.

---

## How It Works

### 1. List a Product

Add a product you want to exchange along with its details, condition, location, and what you would like in return.

### 2. Discover Products

Browse and explore products listed by other users.

### 3. Find a Match

Find a product you want and check what the owner is looking for in exchange.

### 4. Send a Swap Request

Propose an exchange to the product owner.

### 5. Connect & Discuss

If the request is accepted, users can communicate through the platform to discuss the exchange.

### 6. Complete the Exchange

Users arrange the final exchange between themselves.

---

## Core Features

- 🔄 **Product Swapping** — Exchange products directly with other users.
- 📦 **Product Listings** — List products with descriptions, conditions, categories, images, and desired products.
- 🔍 **Product Discovery** — Explore products available for exchange.
- 🤝 **Swap Requests** — Send and manage exchange proposals.
- 💬 **Messaging** — Communicate with other users about potential exchanges.
- ❤️ **Wishlist** — Save products you're interested in.
- 👤 **User Profiles** — View user information and listed products.
- 📍 **Location-Based Discovery** — Find exchange opportunities based on location.

---

## Why BarterX?

BarterX is built around the idea that **value doesn't always have to be measured in money**.

A product that has little use for one person may be exactly what another person needs. Instead of selling something and then spending money to buy something else, users can directly exchange value.

BarterX makes it easier to:

- Give unused products a second life
- Find things you actually need
- Reduce unnecessary spending
- Connect with people interested in exchanging products
- Make product exchanges simple and convenient

---

## Vision

The vision of BarterX is to build a trusted community where people can **exchange products based on mutual value rather than monetary price**.

> **Don't buy it. Barter it.**

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Lucide React
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

# Project Structure

```text
BarterX/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── styles/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Setup & Installation

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB
- Git

---

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

```bash
cd BarterX
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

## 3. Install Backend Dependencies

Open a new terminal and navigate to the backend:

```bash
cd server
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the values with your local or production configuration.

> **Important:** Never commit your `.env` file or private credentials to GitHub.

---

## 5. Start the Backend

```bash
npm run dev
```

The backend will start on the configured port.

---

## Running the Project

Once both frontend and backend servers are running:

```text
Frontend  →  React + Vite
Backend   →  Node.js + Express
Database  →  MongoDB
```

Open the frontend URL provided by Vite in your browser.

---

## Author

**Om Shete**

### BarterX

> **Don't buy it. Barter it.**

---
