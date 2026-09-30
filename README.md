# 🛒 NexusMart — Next-Gen Multi-Vendor Commerce Platform

<div align="center">
  <h3>A modern, scalable multi-vendor marketplace platform built with Next.js 15, React 19, Tailwind CSS v4, Prisma ORM, and Redux Toolkit.</h3>
  <br />
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema (Prisma)](#-database-schema-prisma)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## 🌟 Overview

**NexusMart** is a full-stack e-commerce marketplace engineered for performance, modularity, and real-world scale. It supports multi-tenant vendor operations where independent sellers can register, manage product inventory, and fulfill customer purchases, while platform administrators govern store approvals, platform-wide promotional coupons, and order commissions.

---

## ✨ Key Features

### 🛍️ Customer Storefront
- **Dynamic Catalog & Search:** Real-time search query filtering and category-based navigation.
- **Wishlist System:** Save favorite products with instant optimistic updates powered by Redux Toolkit.
- **Cart & Checkout:** Multi-item cart management with dynamic coupon code validation and discount calculation.
- **Order Tracking & Digital Invoices:** Interactive order history with printable invoices and status timeline tracking (`ORDER_PLACED`, `PROCESSING`, `SHIPPED`, `DELIVERED`).

### 🏬 Vendor Portal (`/store`)
- **Storefront Dashboard:** Dedicated merchant portal to track sales, total orders, and active listings.
- **Inventory Management:** Add new products with multi-image support, category assignments, and pricing controls.
- **Order Management:** View incoming customer orders per store and update fulfillment status.

### 🛡️ Admin Console (`/admin`)
- **Store Verification & Approvals:** Review new seller applications and approve/reject storefronts.
- **Coupon Campaign Management:** Create and manage promotional discount codes with expiration dates, member restrictions, and percentage discounts.
- **Platform Analytics:** Real-time visualizations powered by Recharts.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router with Turbopack) | Server Components, Client Hydration, Route Handlers |
| **UI Library** | React 19 & Tailwind CSS v4 | High-performance styling and component modularity |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`) | Centralized state for Cart, Wishlist, Products, Ratings, and Addresses |
| **Database & ORM** | Prisma ORM with PostgreSQL | Relational modeling, type-safe queries, migration management |
| **Visualizations** | Recharts | Sales performance and order distribution charts |
| **Icons & Notifications** | Lucide React & React Hot Toast | Polished user feedback and iconography |

---

## 📂 Project Structure

```text
nexusmart/
├── app/
│   ├── (public)/              # Customer-facing routes (shop, cart, orders, wishlist)
│   ├── admin/                 # Administrator portal (store approval, coupons)
│   ├── store/                 # Vendor dashboard (add product, manage listings)
│   ├── api/                   # Next.js App Router REST API endpoints
│   │   ├── products/          # Product catalog and search APIs
│   │   ├── orders/            # Order creation and retrieval APIs
│   │   ├── coupons/           # Coupon validation and management APIs
│   │   └── health/            # System health check endpoint
│   ├── globals.css            # Tailwind CSS v4 styling rules
│   └── layout.jsx             # Root layout with Plus Jakarta Sans typography
├── components/
│   ├── admin/                 # Admin layout, sidebar, and navbar components
│   ├── store/                 # Vendor layout and management components
│   ├── Navbar.jsx             # Main navigation with search, cart, and wishlist badges
│   ├── Footer.jsx             # Comprehensive footer with brand information
│   ├── ProductCard.jsx        # Product display card with wishlist toggle & ratings
│   └── OrderItem.jsx          # Order item component with interactive invoice modal
├── lib/
│   ├── features/              # Redux slices (cart, wishlist, product, rating, address)
│   ├── prisma.js              # Prisma client singleton helper
│   └── store.js               # Redux Toolkit root store configuration
├── prisma/
│   ├── schema.prisma          # PostgreSQL relational database schema
│   └── seed.js                # Database initialization and sample data seeder
└── assets/                    # Brand assets, SVGs, and product catalog media
```

---

## 🗄️ Database Schema (Prisma)

The platform is designed around a relational PostgreSQL data model:

- **`User`**: Account identity, contact info, associated addresses, and orders.
- **`Store`**: 1-to-1 relation with User for vendors, containing approval status, branding, and contact details.
- **`Product`**: Belongs to a `Store`, with pricing, categories, stock flags, and image arrays.
- **`Order`** & **`OrderItem`**: Normalized order records linking buyers, stores, addresses, and individual products.
- **`Coupon`**: Promotional discount codes with validity rules and user restrictions.
- **`Rating`**: Verified product reviews and star ratings linked to orders.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve products (supports `?search=`, `?category=`, `?sort=`, `?limit=`) |
| `POST` | `/api/products` | Create a new product listing (vendor action) |
| `GET` | `/api/products/[productId]` | Fetch a single product by ID |
| `GET` | `/api/orders` | Fetch user purchase orders |
| `POST` | `/api/orders` | Place a new order with items and address payload |
| `GET` | `/api/coupons` | List active promotional discount coupons |
| `POST` | `/api/coupons` | Validate coupon code and compute discount amount |
| `GET` | `/api/health` | Service health status and database connection probe |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.17 or higher recommended)
- PostgreSQL database (local instance or cloud database such as Supabase / Neon)

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd nexusmart

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and set your database connection string:
```bash
cp .env.example .env.local
```

### 4. Database Setup
```bash
# Push Prisma schema to your database
npx prisma db push

# (Optional) Seed the database with demo merchants, products, and coupons
node prisma/seed.js
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Currency symbol displayed across the storefront (default: `$`) |
| `NEXT_PUBLIC_APP_URL` | Base application URL (default: `http://localhost:3000`) |
| `DATABASE_URL` | PostgreSQL connection string for Prisma ORM |
| `DIRECT_URL` | Direct PostgreSQL connection string (useful for pooled connections like Supabase) |

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.md).
