# Completion Backlog

Ranked list of the highest-value work needed to move this repo from a partial auth/catalog prototype to a credible ecommerce MVP.

## 1. Build cart state end-to-end

There is no actual cart implementation yet. Cart count, subtotal, and checkout contents are hard-coded, and "Add To Basket" is not wired to persistent or shared state.

- Add real frontend cart state.
- Wire item actions into the cart.
- Add backend cart persistence if the cart is meant to survive refresh/login/device changes.

Relevant files:

- `frontend/src/components/home/Navbar.jsx`
- `frontend/src/components/home/ItemCard.jsx`
- `frontend/src/pages/CheckoutPage.jsx`
- `backend/server.js`

## 2. Add checkout and order persistence

The checkout UI is mostly a mock layout and there is no backend concept of orders, shipping details, payment state, or order history. This is the largest missing business workflow.

- Implement checkout data collection.
- Add order creation and persistence.
- Add order history and order status retrieval.

Relevant files:

- `frontend/src/pages/CheckoutPage.jsx`
- `backend/models/userModel.js`
- `backend/models/`
- `backend/routes/`
- `backend/controllers/`

## 3. Fix authentication security

Authentication currently stores and compares passwords in plaintext, and logout does not invalidate the token-based session model in any meaningful way. This needs to be corrected before treating the system as usable.

- Hash passwords with `bcryptjs`.
- Compare hashed passwords on login.
- Revisit token/session/logout behavior.

Relevant files:

- `backend/controllers/authController.js`
- `backend/models/userModel.js`
- `backend/routes/loginRoutes.js`

## 4. Protect product mutation endpoints

Product creation and deletion are currently insufficiently protected. `addItem` can fall back to `"Admin"` when `req.user` is missing, which creates a direct integrity problem.

- Require authentication on product mutation routes.
- Enforce authorization for seller/admin-only actions.
- Remove unsafe fallback ownership behavior.

Relevant files:

- `backend/routes/itemRoutes.js`
- `backend/controllers/itemController.js`
- `backend/controllers/authController.js`

## 5. Replace or reduce placeholder account surfaces

The profile area, seller dashboard, settings, and wishlist-adjacent flows are mostly demo UI with fake values and unsaved forms. They currently make the product appear more complete than it is.

- Replace placeholder data with authenticated user data.
- Add real persistence for editable account sections.
- Cut non-essential surfaces if they are not part of the MVP.

Relevant files:

- `frontend/src/pages/ProfilePage.jsx`
- `frontend/src/components/profile/MyProfile.jsx`
- `frontend/src/components/profile/SellerDashboard.jsx`
- `frontend/src/components/profile/Settings.jsx`
- `frontend/src/pages/WishlistPage.jsx`

## 6. Remove or implement dead navigation and discovery controls

Some visible UI leads to dead ends or implies features that do not exist yet.

- Add a real `/wishlist` route or remove the link.
- Add a real `/change-password` route or remove the link.
- Implement category filtering and search, or temporarily remove those controls.

Relevant files:

- `frontend/src/components/home/Navbar.jsx`
- `frontend/src/components/home/CategoryTabs.jsx`
- `frontend/src/App.jsx`

## 7. Expand the catalog API beyond the home feed

The catalog currently supports a home-screen list and a basic single-item fetch path, but not the core discovery features expected from a storefront.

- Add search.
- Add category filtering.
- Add pagination and sorting.
- Add stock-aware listing and related-item support if needed.

Relevant files:

- `backend/controllers/itemController.js`
- `backend/models/itemModel.js`
- `backend/config/mongo_seeder.js`

## 8. Improve operability and setup documentation

The backend currently depends on Atlas connectivity at startup and the documentation is incomplete. `frontend/README.md` is still the stock Vite template, so the repo does not explain itself clearly yet.

- Add a proper root setup guide.
- Document seeding/bootstrap flow.
- Replace template documentation with project-specific docs.
- Consider adding a health check and clearer startup diagnostics.

Relevant files:

- `backend/config/database.js`
- `backend/config/mongo_seeder.js`
- `README.md`
- `frontend/README.md`
