# ✈️ TRAVEL BUDDY — Full-Stack MERN Travel Platform

> **“Plan. Explore. Travel.”**  
> A complete, production-grade travel-tech platform built on the **MERN stack** (MongoDB, Express.js, React 18, Node.js) with JWT authentication, responsive glassmorphism UI, real-time budget calculator, day-by-day itineraries, and reservation tracking.

---

## 1. System Architecture

```text
travel-buddy/
├── client/                     # React 18 + Vite Frontend
│   ├── src/
│   │   ├── assets/             # Brand logos & static assets
│   │   ├── components/         # Reusable UI (Navbar, Footer, Modal, Toast, Cards)
│   │   ├── context/            # AuthContext (JWT session), ThemeContext (Light/Dark)
│   │   ├── hooks/              # Custom hooks (useAuth, useTheme)
│   │   ├── layouts/            # MainLayout with persistent Navbar, Footer, and Toast
│   │   ├── pages/              # 14 Full Page Views
│   │   │   ├── Home.jsx
│   │   │   ├── Destinations.jsx
│   │   │   ├── DestinationDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PlanTrip.jsx
│   │   │   ├── Trips.jsx
│   │   │   ├── ItineraryPage.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Favourites.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/           # Axios API modules with JWT Bearer interceptor
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── destinationService.js
│   │   │   ├── tripService.js
│   │   │   ├── itineraryService.js
│   │   │   ├── bookingService.js
│   │   │   └── favouriteService.js
│   │   ├── styles/             # Unified CSS Design System (light/dark theme)
│   │   ├── App.jsx             # React Router v6 configuration & ProtectedRoute
│   │   └── main.jsx            # React root with Context Providers
│   ├── index.html
│   ├── vite.config.js          # API proxy (/api -> http://localhost:5000)
│   └── package.json
│
├── server/                     # Express.js + Node.js REST API Server
│   ├── config/
│   │   └── db.js               # Mongoose connection & auto-seed trigger
│   ├── controllers/            # Request handlers with full validation
│   │   ├── authController.js
│   │   ├── destinationController.js
│   │   ├── tripController.js
│   │   ├── itineraryController.js
│   │   ├── bookingController.js
│   │   └── favouriteController.js
│   ├── middleware/             # Security & Request Processing
│   │   ├── authMiddleware.js   # Bearer JWT verification
│   │   └── errorMiddleware.js  # Global 404 & JSON error formatting
│   ├── models/                 # Mongoose Persistent Schemas
│   │   ├── User.js             # Bcrypt password hashing & preferences
│   │   ├── Destination.js      # 12 catalog attributes, weather, attractions
│   │   ├── Trip.js             # User & destination refs, budget breakdown
│   │   ├── Itinerary.js        # Day tabs & activity checklist status
│   │   ├── Booking.js          # Hotels, transit, tours, confirmation codes
│   │   └── Favourite.js        # User wishlist compound index
│   ├── routes/                 # Express Router modules
│   ├── utils/
│   │   └── seedData.js         # 12 high-detail destinations with photography
│   ├── .env.example
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── .env.example                # Full environment template
├── .gitignore
├── package.json                # Root automation scripts
└── README.md
```

---

## 2. Key Features

### 🌟 Client-Side Capabilities (React + Vite)
- **Modern Glassmorphic Aesthetic**: Deep navy/sky-blue/warm-coral palette, smooth CSS micro-interactions, responsive mobile drawer.
- **Theme Support**: Integrated Light / Dark mode toggle with persistent local preferences.
- **Dynamic Budget Engine**: Instant cost projection across transit (Flight, Train, Bus, Car), lodging tiers, group size, and duration.
- **Interactive Day-by-Day Itineraries**: Activity timeline with completion checkboxes, add/edit/delete modals, and one-click print/export.
- **Reservation Manager**: Status pills (Confirmed, Cancelled, Completed), auto-generated confirmation codes, and cancellation workflows.
- **Wishlist & Favourites**: Instant heart toggle synchronized with MongoDB.
- **Protected Routing**: Automatic redirect to `/login` with return destination tracking.

### ⚙️ Server-Side Capabilities (Express + MongoDB)
- **JWT-Protected REST APIs**: Secure Bearer tokens with 30-day expiry.
- **Password Security**: Automatic salt generation and bcrypt hashing via Mongoose hooks.
- **Automated Data Seeding**: Populates 12 rich global destinations (Manali, Goa, Jaipur, Kashmir, Delhi, Mumbai, Rishikesh, Udaipur, Paris, Dubai, Bali, Switzerland) upon first connection.
- **Robust Error Handling**: Standardized JSON responses for all 4xx/5xx status codes.

---

## 3. REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Private | Fetch logged-in user profile |
| `PUT` | `/api/auth/profile` | Private | Update profile bio, phone, avatar, preferences |
| `PUT` | `/api/auth/password` | Private | Change account password |
| `GET` | `/api/destinations` | Public | List destinations with multi-filter query |
| `GET` | `/api/destinations/featured` | Public | Get curated top-rated spots |
| `GET` | `/api/destinations/:id` | Public | Get single destination with full details |
| `GET` | `/api/trips` | Private | Get all trips created by current user |
| `POST` | `/api/trips` | Private | Create a new trip & auto-generate day itinerary |
| `GET` | `/api/trips/:id` | Private | Get trip details with budget breakdown |
| `DELETE` | `/api/trips/:id` | Private | Delete trip and associated itinerary |
| `GET` | `/api/itineraries/trip/:tripId`| Private | Fetch day-by-day itinerary for a trip |
| `POST` | `/api/itineraries/:id/activities` | Private | Add activity to a specific day |
| `PUT` | `/api/itineraries/:id/activities/:actId` | Private | Edit scheduled activity |
| `PUT` | `/api/itineraries/:id/activities/:actId/toggle` | Private | Toggle activity completion status |
| `DELETE` | `/api/itineraries/:id/activities/:actId` | Private | Delete activity from schedule |
| `GET` | `/api/bookings` | Private | List user bookings (filter by type) |
| `POST` | `/api/bookings` | Private | Create new hotel/flight/tour reservation |
| `PUT` | `/api/bookings/:id/cancel` | Private | Cancel existing reservation |
| `DELETE` | `/api/bookings/:id` | Private | Remove booking record |
| `GET` | `/api/favourites` | Private | Get user's saved wishlist destinations |
| `POST` | `/api/favourites/toggle` | Private | Add / Remove destination from wishlist |

---

## 4. Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local `mongod` service running on port 27017, or a MongoDB Atlas cloud URI)
- On Windows PowerShell, execute using `npm.cmd`.

### Step 1: Clone or Navigate to Project
```bash
cd travel-buddy
```

### Step 2: Configure Environment Variables
Create or edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/travel_buddy
JWT_SECRET=travel_buddy_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your connection string).*

### Step 3: Install Dependencies
```bash
# Install server packages
cd server
npm.cmd install

# Install client packages
cd ../client
npm.cmd install
```

### Step 4: Launch the Application

#### Option A: Run Server and Client Separately
In Terminal 1 (Start Backend Server on Port 5000):
```bash
cd server
npm.cmd run dev
```

In Terminal 2 (Start React Frontend on Port 5173):
```bash
cd client
npm.cmd run dev
```

#### Option B: Build Client for Production
```bash
cd client
npm.cmd run build
```

---

## 5. Demo Evaluation Credentials

Use the convenient **"Demo Account"** button on `/login` or enter manually:
- **Email**: `alex@travelbuddy.com`
- **Password**: `password123`

You can also create any new account via the **Sign Up** page.

---

## 6. License
ISC License © 2026 Travel Buddy Team. Built for college projects, hackathons, and real-world travel planning.
