# Person 4 — Prize Shop — AI Prompt Starter

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
<script src="/js/utils.js"></script>
<script src="/js/auth.js"></script>
<script src="/js/page-specific.js"></script>
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
- Status codes: 200, 201, 400, 401, 404, 500
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

### My Feature: Prize Shop

**Files I own:**
- `backend/routes/prizes.js` — prize listing, redemption, redeemed history
- `backend/models/Prize.js` — Prize mongoose schema
- `frontend/js/prizes.js` — prize shop page logic

**My route signatures:**
```
GET  /prizes
→ [{ _id, name, description, type, cost, fileUrl, couponCode, available }]

POST /prizes/:prizeId/redeem
→ { success: true, prize: { name, type, couponCode, fileUrl }, remainingPoints }

GET  /prizes/redeemed
→ [{ prizeId, name, type, redeemedAt }]
```

**My HTML element IDs:**
- `prizes.html`:
  - `#prizes-list` — container where prize cards are rendered
  - `#redeemed-list` — container where user's redeemed prizes are listed
  - `#prize-error` — error message display element

**Prize model schema:**
- `name`: string, required
- `description`: string
- `type`: string, enum `['coupon', 'printable']`, required
- `cost`: number, required (points cost)
- `fileUrl`: string (URL/path for printable file or coupon image)
- `couponCode`: string (for coupon-type prizes)
- `available`: boolean, default true

**Prize shop page logic (`loadPrizes()`):**
1. Fetch `GET /prizes` and `GET /auth/me` in parallel (use `Promise.all`)
2. For each prize, render a card into `#prizes-list`:
   - Prize name, description
   - Type badge: "🎟️ Coupon" or "📄 Printable"
   - Cost: "X points" (use `formatPoints()` from utils.js)
   - If user has enough points AND prize is available → show "Redeem" button with `onclick="redeemPrize('${prize._id}')"`
   - If user doesn't have enough points → disable button, add class `insufficient-points`, show "Need X more points"
   - If prize is not available → show "Out of stock" (no button)
3. Also load `GET /prizes/redeemed` and render redeemed prizes in `#redeemed-list`:
   - Prize name, type, redeemed date (use `formatDate()` from utils.js)

**`redeemPrize(prizeId)` function:**
1. `clearMessage('prize-error')`
2. `await apiFetch(`/prizes/${prizeId}/redeem`, { method: 'POST' })`
3. If successful:
   - Show success message with prize details
   - If type is `'coupon'` → display the coupon code prominently
   - If type is `'printable'` → show a download link to `fileUrl`
   - Call `window.initAuthState()` to refresh points in nav
   - Reload the prizes list (call `loadPrizes()` again to update button states)
4. If error → `showError('prize-error', err.message)`

**Backend redemption logic (POST /prizes/:prizeId/redeem):**
1. Load user and prize
2. Check prize exists → 404 if not
3. Check prize is available → 400 "Prize is not available"
4. Check user has enough points (`user.points >= prize.cost`) → 400 "Not enough points"
5. Deduct points: `user.points -= prize.cost`
6. Add to `user.redeemedPrizes`: `{ prizeId: prize._id, redeemedAt: new Date() }`
7. Save user
8. Return: `{ success: true, prize: { name, type, couponCode, fileUrl }, remainingPoints: user.points }`

**Backend redeemed history (GET /prizes/redeemed):**
1. Load user, populate `redeemedPrizes.prizeId` (to get prize name and type)
2. Return array of `{ prizeId, name, type, redeemedAt }`

### Quick-check after AI generates code:
- [ ] Uses `apiFetch()` (not raw `fetch`) in frontend files?
- [ ] Uses `showError()` / `showSuccess()` / `formatPoints()` / `formatDate()` from utils.js?
- [ ] Every async function wrapped in `try/catch`?
- [ ] File structured as INITIALIZATION → DATA LOADING → USER ACTIONS → EXPOSE GLOBALLY?
- [ ] Backend routes return JSON with `{ error: 'message' }` on failure?