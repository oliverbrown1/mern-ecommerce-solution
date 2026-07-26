# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is an npm workspaces monorepo. Run all root-level commands from the repo root.

**Start both servers (dev):**
```bash
npm run start         # runs frontend (port 5173) + backend (port 3001) concurrently
```

**Run individually:**
```bash
npm run frontend      # Vite dev server on http://localhost:5173
npm run backend       # nodemon on http://localhost:3001
```

**First-time setup (install all deps + build frontend):**
```bash
npm run inst
```

**Seed the MongoDB items collection from dummyjson.com:**
```bash
cd backend && node config/mongo_seeder.js
```

**Frontend lint:**
```bash
cd frontend && npm run lint
```

There are no automated tests — `npm test` in the backend exits with an error by design.

## Environment

The backend requires `backend/.env` (see `backend/.env.example`):

| Variable | Purpose |
|---|---|
| `MGURL` | MongoDB Atlas connection string |
| `SECRET_KEY` | JWT signing secret |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limiter (currently commented out in server.js) |
| `MY_EMAIL` / `GOOGLE_APP_PASSWORD` | Nodemailer for password reset emails |
| `FRONTEND_URL` | Used to build reset-password links (default: `http://localhost:5173`) |

## Architecture

### Backend (`backend/`)

Express 5 + Mongoose on Node ≥ 22.12. CommonJS throughout (`require`/`module.exports`).

- `server.js` — entry point; wires middleware, routes, starts on port 3001
- `config/database.js` — Mongoose connection (exits process on failure)
- `config/redis.js` — Upstash Redis client for rate limiting
- `middleware/ratelimiter.js` — Upstash rate limiter (currently disabled via commented `app.use(limiter)`)
- `routes/loginRoutes.js` → `controllers/authController.js` — auth: login, signup, forgot/reset password, token verification
- `routes/itemRoutes.js` → `controllers/itemController.js` — item catalog CRUD
- `models/userModel.js` — User schema (email, username, password, role, passwordResetToken)
- `models/itemModel.js` — Item schema (mirrors dummyjson product shape + `owner` field)

**Auth flow:** JWT stored in `localStorage` on the frontend under key `authtoken`. Backend reads it from `Authorization: Bearer <token>` or `authtoken` header. `verifyToken` middleware sets `req.user` to the decoded user ID.

**Known issue:** Passwords are currently stored and compared in plaintext (`authController.js:69`). The `bcryptjs` dependency is installed but the hashing code is commented out.

### Frontend (`frontend/`)

React 19 + Vite 7. ESM throughout (`import`/`export`). Styled with Tailwind CSS + DaisyUI (`data-theme="synthwave"` on the root div). Animations via Motion (Framer Motion v12).

**Routing** (`src/App.jsx`):
- Public: `/`, `/item/:id`, `/reset-password/:id/:token`, `/login`, `/register`, `/forgot`
- Protected (require auth): `/profile`, `/checkout`
- `src/utils/ProtectedRoutes.jsx` and `PublicRoutes.jsx` wrap `<Outlet>` with auth redirects

**Auth state** (`src/context/AuthContext.jsx`):
- Single React context providing `{ user, setUser, token, isLoading, logout }`
- On mount, reads `authtoken` from localStorage and POST-verifies it against `/auth/verify-token`
- `isLoading` is true until verification completes — `App.jsx` renders a spinner during this window

**API calls:** All use axios pointing directly at `http://localhost:3001`. No proxy is configured in Vite.

**Component layout:** `src/components/` is organised by page area — `home/`, `input/`, `profile/`.

### Data seeding

`backend/config/mongo_seeder.js` fetches 194 products from `https://dummyjson.com/products` and bulk-inserts them into the `items` collection, deleting existing records first. Run this once after setting up `MGURL`.

## Known gaps (from COMPLETION_BACKLOG.md)

- Cart state is not implemented — counts and subtotals in Navbar/CheckoutPage are hardcoded
- `POST /items/item` and `DELETE /items/item/:id` have no auth protection
- Profile, SellerDashboard, Settings, and WishlistPage contain placeholder/fake data
- Password hashing is disabled
- `/wishlist` and `/change-password` routes do not exist yet
