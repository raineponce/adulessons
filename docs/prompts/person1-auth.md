# Person 1 — Auth & User Accounts — AI Prompt Starter

## Paste this at the start of every AI coding session:

I'm working on the AduLessons educational website (MEN stack: MongoDB, Express, Node.js). The frontend is plain HTML/CSS/JS — no frameworks.

Follow these rules strictly:
- Use `apiFetch()` from utils.js for ALL backend calls (never raw fetch)
- Use `showError()` / `showSuccess()` / `clearMessage()` for user-facing messages
- Use async/await (never .then() chains)
- Use const/let (never var)
- Always wrap async code in try/catch
- After any action that changes user data, call `window.initAuthState()`

Frontend script template — use this structure:
1. INITIALIZATION (DOMContentLoaded listener)
2. DATA LOADING (async functions that fetch + populate DOM)
3. USER ACTIONS (async functions for button clicks / form submits)
4. EXPOSE GLOBALLY (window.functionName for onclick handlers)

Backend route template — use this structure:
- requireAuth middleware on all protected routes
- Validate input → return 400 if invalid
- Business logic → return 404 if not found
- Return JSON: `{ success: true, ...data }` or `{ error: 'message' }`
- Wrap in try/catch → return 500 on unexpected errors
- Use CommonJS (`const`, `require`) — NOT ES modules

---

## My Feature — Auth & User Accounts

### Files I Own
- `backend/routes/auth.js` — login, register, logout, /me endpoint
- `backend/models/User.js` — user schema with bcrypt password hashing
- `backend/middleware/authMiddleware.js` — session check middleware
- `frontend/js/auth.js` — auth state check (loaded on every page)
- `frontend/js/login.js` — login form handler
- `frontend/js/register.js` — registration form handler

### Route Signatures
```
GET  /auth/me       → { loggedIn: true, user: { _id, username, email, avatar, points, streak: { current, lastActive } } }
                    → { loggedIn: false }
POST /auth/login    → body: { email, password }         → { success: true, user: { username, points } }
POST /auth/register → body: { username, email, password } → { success: true }
POST /auth/logout   → (no body)                         → redirects to /
```

### HTML Element IDs
- `login.html`: `#login-form`, `#login-error`
- `register.html`: `#register-form`, `#register-error`
- ALL pages: `.logged-in-only`, `.logged-out-only`, `.user-username`, `.user-avatar`, `.user-points`, `.user-streak`

### Key Requirements
- Passwords hashed with bcrypt (12 salt rounds) via pre-save hook
- Sessions managed with express-session + connect-mongo
- Streak logic: increment if 24-48hrs since lastActive, reset if >48hrs
- `requireAuth` middleware: return 401 JSON for fetch requests (check Accept header), redirect to /login.html for page navigations
- Client-side validation: username 3-20 alphanumeric chars, email must contain @ and ., password min 8 chars

### Predefined Avatar IDs
`default`, `cat`, `dog`, `robot`, `star`, `rocket`, `book`, `globe`