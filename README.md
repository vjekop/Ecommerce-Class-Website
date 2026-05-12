# ❄️ FrostForge | Bespoke 3D Fabrication

**FrostForge** is a premium e-commerce platform designed for the precision manufacturing and distribution of high-fidelity 3D-printed figurines and models. Built with a "Stateless-First" philosophy, the platform combines a high-performance 3D interactive storefront with a robust serverless administrative backend.

---

## 🚀 Key Features

### 🎮 Interactive 3D Storefront
*   **Real-time 3D Preview:** Integrated **Three.js** and **React Three Fiber** (R3F) scene with dynamic lighting and environment mapping.
*   **Optimized Assets:** Utilizes **Draco compression** and lazy-loading strategies to reduce 3D model weight by over 66% (from ~76MB to ~25MB).
*   **Performance First:** Capped Device Pixel Ratio (DPR) and hover-triggered preloading ensure smooth framerates even on high-DPI mobile devices.

### 🛠️ Full Admin CRUD Dashboard
*   **Inventory Management:** A secure, password-gated portal (`/admin`) for real-time control of the product catalog.
*   **Dynamic Control:** The Admin panel controls not just the text, but the actual 3D assets, scales, and metadata shown on the home page.
*   **Secure CRUD:** Full Create, Read, Update, and Delete lifecycle powered by **Neon PostgreSQL**.

### 💳 Seamless Transactions
*   **Stripe Integration:** PCI-compliant payment processing using Stripe's Hosted Checkout.
*   **Zero-Maintenance Inventory:** Leveraging Stripe's dynamic price creation to allow instant sales of newly created admin products.

### 📱 Responsive Design
*   **Industrial Aesthetic:** A "Brutalist" design system featuring monospace typography, a zinc-black palette, and sharp 0px border-radii.
*   **Mobile Optimized:** Custom `100svh` layouts and `touch-action: pan-y` configurations to prevent mobile scroll-trapping in 3D scenes.

---

## 🛠️ Tech Stack

*   **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), [Framer Motion](https://www.framer.com/motion/)
*   **3D Engine:** [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmnd.rs/drei)
*   **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless)
*   **Payments:** [Stripe](https://stripe.com/)
*   **Deployment:** [Vercel](https://vercel.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 🔑 Admin Credentials (Demo)

For demonstration and grading purposes, the Admin Dashboard is accessible via:
*   **Path:** `/admin`
*   **Password:** `frostforge2024`

---

## ⚙️ Environment Setup

To run this project locally, create a `.env.local` file with the following keys:

```env
# Database (Neon / Vercel Postgres)
DATABASE_URL=your_neon_connection_string
POSTGRES_URL=your_neon_connection_string

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 👥 The Team

*   **Sydney Phillips** — Co-Founder & Creative Director
*   **Zachary Mason** — Co-Founder & Lead Engineer
*   **Connor Lancaster** — Co-Founder & Operations

---

© 2024 FrostForge. Based in Frostburg, Maryland.
