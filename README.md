
# 🛒 Ap-Store — Full-Stack MERN E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=JSON%20web%20tokens" />
</p>

**Ap-Store** is a full-featured, multi-application e-commerce platform built with the **MERN Stack**. It separates concerns into a dedicated **Customer Storefront** for seamless shopping and checkout, alongside a standalone **Admin Panel** (with its own backend API and management UI) for complete inventory, user, and order control.

---

## 🌟 Key Features

### 🛍️ Customer Storefront (`store/`)
* **Authentication & Profiles:** Secure customer registration, login, and session persistence.
* **Product Discovery:** Responsive product catalog with category filtering, search, and detailed item views.
* **Cart & Checkout Flow:** Dynamic shopping cart management with real-time quantity updates and streamlined checkout.

### 🛠️ Admin Management Portal (`admin-panel/`)
* **Role-Protected Dashboard:** Secured via JWT middleware ensuring only authorized administrators can access management routes.
* **Inventory Control (CRUD):** Create, update, categorize, and remove store products in real time.
* **User & Order Management:** Monitor registered customer accounts, track order statuses, and oversee store operations.

---

## 🏗️ System Architecture & Project Structure

```text
Ap-Store/
├── admin-panel/
│   ├── backend/          # Admin & Store REST API (Node.js, Express, MongoDB)
│   └── frontend/         # Admin Management Dashboard (React.js, Tailwind CSS)
├── store/                # Customer-Facing E-Commerce Storefront (React.js, Tailwind CSS)
└── README.md             # Project Documentation
```

---

## ⚙️ Tech Stack

| Layer | Technologies | Primary Purpose |
| :--- | :--- | :--- |
| **Customer Frontend** | React.js, Tailwind CSS, Axios | Responsive storefront UI, cart state, & API consumption |
| **Admin Frontend** | React.js, Tailwind CSS, Context / Redux Toolkit | Administrative dashboard, product forms, & order tables |
| **Backend API** | Node.js, Express.js | RESTful API routing, business logic, & middleware guards |
| **Database** | MongoDB, Mongoose | Persistent storage for users, products, & order records |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs, dotenv | Password hashing, token-based auth, & env isolation |

---

## 🔐 Authentication & Security Posture

* **JWT Authorization:** Stateless token authentication protecting sensitive API endpoints and admin dashboard routes.
* **Credential Encryption:** Passwords hashed using `bcryptjs` prior to database persistence.
* **Environment Isolation:** Database URIs (`MONGO_URI`) and signing keys (`JWT_SECRET`) are decoupled into `.env` files and excluded via `.gitignore`.

---

## 🚀 Local Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Abpa007/Ap-Store.git
cd Ap-Store
```

### 2. Configure & Start Admin Backend
```bash
cd admin-panel/backend
npm install
```

Create a `.env` file inside `admin-panel/backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Start Admin Frontend
Open a second terminal window:
```bash
cd admin-panel/frontend
npm install
npm start
```

### 4. Start Customer Storefront
Open a third terminal window:
```bash
cd store
npm install
npm start
```

---

## 🌐 Deployment Architecture

| Service | Recommended Hosting | Notes |
| :--- | :--- | :--- |
| **Admin Backend** | Render / Railway | Configure `PORT`, `MONGO_URI`, and `JWT_SECRET` in dashboard |
| **Admin Frontend** | Vercel / Netlify | Point build root to `admin-panel/frontend` |
| **Customer Store** | Vercel / Netlify | Point build root to `store` |

---

## 🔮 Future Roadmap

* **Payment Gateway Integration:** Adding Stripe and Razorpay checkout webhooks.
* **Order Tracking & Invoicing:** Automated PDF invoice generation and live delivery status tracking.
* **Product Reviews & Ratings:** Verified buyer reviews and dynamic star-rating aggregations.
* **Sales Analytics:** Visual revenue charts and inventory alerts inside the Admin Dashboard.

---

## 👤 Author & Contact

**Developed by:** Abhay Panchal  
**Role:** Full-Stack MERN & Data Intelligence Developer  
* 📧 **Email:** [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)  
* 🐙 **GitHub:** [github.com/Abpa007](https://github.com/Abpa007)  
* 💼 **LinkedIn:** [linkedin.com/in/abhay-panchal-3b853b376](https://linkedin.com/in/abhay-panchal-3b853b376)  
* 🌐 **Portfolio:** [abhay-panchal-port-folio.vercel.app](https://abhay-panchal-port-folio.vercel.app)
