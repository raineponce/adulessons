# Person 1 — Auth & User Accounts — AI Prompt Starter

## Paste this at the start of every AI coding session:

I'm working on the AduLessons educational website. It uses the MEN stack
(MongoDB, Express, Node.js). The frontend is plain HTML/CSS/JS — no frameworks.
All frontend JS files are vanilla scripts loaded via `<script>` tags.

### Universal Conventions (ALL team members follow these)

**Frontend JavaScript:**
- Use `apiFetch()` from `frontend/js/utils.js` for ALL backend calls — never raw `fetch()`
- Use `showError(elementId, message)` / `showSuccess(elementId, message)` / `clearMessage(elementId)` for user-facing messages
- Use `updateProgressBar(barId, percent)` for progress bars
- Use `async/await` only — never `.then()` chains
- Use `const` and `let` only — never `var`
- Always wrap async code in `try/catch`
- Initialize on `DOMContentLoaded`
- Expose functions needed by other scripts or HTML `onclick` on `window`
- After any action that changes user data (points, avatar, etc.), call `window.initAuthState()`

**Frontend script loading order (EVERY page):**
```html
<script src="/js/utils.js"></script>   <!-- Shared utilities — FIRST -->
<script src="/js/auth.js"></script>    <!-- Auth state check — SECOND -->
<script src="/js/page-specific.js"></script> <!-- Page script — LAST -->
```

**Frontend script template — use this structure:**
1. INITIALIZATION — `DOMContentLoaded` listener
2. DATA LOADING — async functions that fetch and populate DOM
3. USER ACTIONS — async functions for button clicks / form submits
4. EXPOSE GLOBALLY — `window.functionName = functionName`

**Backend route conventions:**
- Use `const` and `require` (CommonJS) — no ES module imports
- Always use `requireAuth` middleware on protected routes
- Always return JSON: `{ success: true, ...data }` for success, `{ error: 'message' }` for errors
- Status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
- Validate input before processing
- Wrap all route handlers in `try/catch`

**Backend route template:**
```javascript
router.post('/:id/action', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;
    if (!field) return res.status(400).json({ error: 'Field is required' });

    const result = await Model.findById(id);
    if (!result) return res.status(404).json({ error: 'Not found' });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Action failed:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
```

---

### My Feature: Auth & User Accounts

**Files I own:**
- `backend/routes/auth.js` — login, register, logout, /me endpoint
- `backend/models/User.js` — User mongoose schema
- `backend/middleware/authMiddleware.js` — requireAuth middleware
- `frontend/js/auth.js` — auth state check (loaded on every page)
- `frontend/js/login.js` — login form handler
- `frontend/js/register.js` — registration form handler

**My route signatures:**
```
GET  /auth/me       → { loggedIn: true, user: { _id, username, email, avatar, points, streak: { current, lastActive } } }
                    → { loggedIn: false }
POST /auth/login    → body: { email, password }
                    → { success: true, user: { username, points } }
POST /auth/register → body: { username, email, password }
                    → { success: true }
POST /auth/logout   → (no body)
                    → session destroyed, redirect to /
```

**My HTML element IDs:**
- `login.html`: `#login-form`, `#login-error`
- `register.html`: `#register-form`, `#register-error`
- ALL pages: `.logged-in-only`, `.logged-out-only`, `.user-username`, `.user-avatar`, `.user-points`, `.user-streak`

**User model requirements:**
- `username`: unique, required, trimmed, 3-20 alphanumeric characters
- `email`: unique, required, lowercase
- `password`: required, hashed with bcrypt (12 salt rounds) via pre-save hook
- `avatar`: string, default `'default'` — predefined set only (default, cat, dog, robot, star, rocket, book, globe)
- `points`: number, default 0
- `streak`: `{ current: Number (default 0), lastActive: Date (default null) }`
- `completedLessons`: array of strings (e.g., `['mod1-lesson1', 'mod1-lesson2']`)
- `currentLesson`: string, nullable
- `redeemedPrizes`: array of `{ prizeId: ObjectId ref Prize, redeemedAt: Date }`
- `allLessonsComplete`: boolean, default false
- `shippingAddress`: `{ name, street, city, state, zip }` — all strings
- `finalPrizeClaimed`: boolean, default false
- `usedCodes`: array of strings
- `timestamps: true`
- Instance method: `comparePassword(candidatePassword)` using `bcrypt.compare`

**Streak logic (on login):**
- If `lastActive` is null → set `current` to 1
- If 24-48 hours since `lastActive` → increment `current` by 1
- If >48 hours since `lastActive` → reset `current` to 1
- If <24 hours → no change (already logged in today)
- Always update `lastActive` to now

**requireAuth middleware:**
- Check `req.session.userId`
- If missing and request accepts JSON (`req.headers.accept` includes `'application/json'`) → return `res.status(401).json({ error: 'Login required' })`
- If missing and regular page request → `res.redirect('/login.html')`
- If present → call `next()`

**Registration validation:**
- Username: 3-20 characters, alphanumeric only
- Email: valid format (contains @ and .)
- Password: minimum 8 characters
- Check for existing user with same email OR username before creating

**Sessions:**
- Using `express-session` with `connect-mongo` store
- Set `req.session.userId = user._id` on login/register
- `req.session.destroy()` on logout
- Cookie: 1 week maxAge, httpOnly, sameSite: 'lax'

### Quick-check after AI generates code:
- [ ] Uses `apiFetch()` (not raw `fetch`) in frontend files?
- [ ] Uses `showError()` / `showSuccess()` (not custom DOM manipulation) for messages?
- [ ] Every async function wrapped in `try/catch`?
- [ ] File structured as INITIALIZATION → DATA LOADING → USER ACTIONS → EXPOSE GLOBALLY?
- [ ] Backend routes return JSON with `{ error: 'message' }` on failure?