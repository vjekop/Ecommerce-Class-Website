# Final Project Report: FrostForge
**Bespoke 3D Fabrication E-Commerce Platform**

**Team:** Sydney Phillips, Zachary Mason, Connor Lancaster  
**Date:** May 12, 2024

---

## 1. Project Summary
FrostForge is a specialized e-commerce platform dedicated to high-fidelity 3D-printed figurines. Unlike traditional online stores, FrostForge features an interactive, real-time 3D storefront that allows users to inspect products from any angle before purchasing. The platform includes a fully dynamic inventory management system (Admin Dashboard) and secure payment processing through Stripe.

---

## 2. Technical Details

### Architecture
- **Framework:** Next.js 16 (App Router)
- **3D Engine:** Three.js / React Three Fiber
- **Database:** Neon PostgreSQL (Serverless)
- **Payments:** Stripe API
- **Deployment:** Vercel

### Database Schema (ERD)
The platform uses a relational PostgreSQL schema:
- **Products Table:** Stores `id`, `name`, `price`, `description`, `image_url`, `features` (JSONB), `model_path`, and `model_scale`.
- **Relationship:** The schema is optimized for "Stateless-First" retrieval, with Stripe handling the separate Transactional database for PCI compliance.

### API Documentation
- `GET /api/products`: Fetches active inventory from the database.
- `POST /api/checkout`: Initiates secure payment session via Stripe.
- `CRUD /api/admin`: Private routes for Create, Update, and Delete operations.
- `GET /api/seed`: Automated database initialization script.

---

## 3. AI Contribution
We utilized AI as a senior-level technical partner to handle complex optimizations and backend scaffolding.

**Major AI Contributions:**
- **Optimization:** Automated Draco compression of 3D assets, reducing load times by 66%.
- **Architecture:** Generated the full serverless database bridge (`lib/db.ts`) with robust fallback handling.
- **UX Debugging:** Solved the "Mobile Scroll Trap" issue by generating custom touch-action CSS for the 3D canvas.
- **Rapid Prototyping:** Built the functional Admin CRUD dashboard and API in a single development session.

---

## 4. Challenges & Solutions

### Challenge: Heavy 3D Performance
**Solution:** We implemented a two-step optimization: first, using Draco compression to shrink GLB files, and second, implementing a hover-triggered preload system so assets download in the background based on user intent.

### Challenge: Mobile User Experience
**Problem:** The 3D viewer blocked page scrolling on touch devices.
**Solution:** We disabled OrbitControls and applied `touch-action: pan-y` across the DOM hierarchy, allowing users to scroll past the 3D section comfortably on phones.

### Challenge: Database Reliability
**Problem:** Connection errors during the Vercel-to-Neon handshake.
**Solution:** Built a dual-variable environment check (`POSTGRES_URL` + `DATABASE_URL`) with a static JSON fallback so the site stays live even during database maintenance.

---
*FrostForge Project Documentation - Spring 2026*
