# Person 5 — Secret Codes & Profile — AI Prompt Starter

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

### My Feature: Secret Codes & Profile

**Files I own:**
- `backend/routes/codes.js` — secret code redemption
- `backend/models/SecretCode.js` — SecretCode mongoose schema
- `backend/routes/profile.js` — avatar and address endpoints (shared with Person 3 who owns the progress endpoint)
- `frontend/js/codes.js` — secret code form handler
- `frontend/js/profile.js` — profile page, avatar selection, shipping address form

**My route signatures:**

Secret Codes:
```
POST /codes/redeem
→ body: { code: string }
→ { success: true, rewardType: 'points' | 'prize', pointsAwarded: number, prizeName: string | null }
```

Profile:
```
GET  /profile
→ { username, email, avatar, points, streak, completedLessons, allLessonsComplete, shippingAddress }

PUT  /profile/avatar
→ body: { avatar: string }
→ { success: true, avatar: string }

PUT  /profile/address
→ body: { name, street, city, state, zip }
→ { success: true, message: 'Address saved' }
```

**My HTML element IDs:**
- `codes.html`: `#code-form`, `#code-input`, `#code-result`
- `profile.html`: `#current-avatar`, `#avatar-grid`, `#address-section`, `#address-form`

**SecretCode model schema:**
- `code`: string, unique, required, uppercase
- `rewardType`: string, enum `['points', 'prize']`, required
- `pointsValue`: number, default 0 (used when rewardType is 'points')
- `prizeId`: ObjectId ref to Prize, default null (used when rewardType is 'prize')
- `active`: boolean, default true
- `expiresAt`: Date, default null

**Secret code validation order (POST /codes/redeem):**
1. Trim and uppercase the input code
2. Check code is not empty → 400 "Please enter a code"
3. Find code in DB → 404 "Invalid code"
4. Check code is active → 400 "Code is no longer active"
5. Check code is not expired (`expiresAt` is null OR `expiresAt > now`) → 400 "Code has expired"
6. Check user hasn't already used this code (`user.usedCodes` array) → 400 "Code already used"
7. If `rewardType === 'points'`:
   - Add `code.pointsValue` to `user.points`
   - Return `{ success: true, rewardType: 'points', pointsAwarded: code.pointsValue, prizeName: null }`
8. If `rewardType === 'prize'`:
   - Load the prize by `code.prizeId`
   - Add prize to `user.redeemedPrizes`
   - Return `{ success: true, rewardType: 'prize', pointsAwarded: 0, prizeName: prize.name }`
9. Add code string to `user.usedCodes`
10. Save user

**Secret code form handler (`codes.js`):**
1. On submit of `#code-form`, prevent default
2. Get value from `#code-input`, trim and uppercase
3. If empty → `showError('code-result', 'Please enter a code')`, return
4. `clearMessage('code-result')`
5. `await apiFetch('/codes/redeem', { method: 'POST', body: JSON.stringify({ code }) })`
6. If successful:
   - If `data.rewardType === 'points'` → `showSuccess('code-result', '🎉 You earned ${data.pointsAwarded} points!')`
   - If `data.rewardType === 'prize'` → `showSuccess('code-result', '🎉 You won: ${data.prizeName}!')`
   - Call `window.initAuthState()` to refresh points display
7. If error → `showError('code-result', err.message)`
8. Clear the input field after submission

**Predefined avatar IDs:**
`['default', 'cat', 'dog', 'robot', 'star', 'rocket', 'book', 'globe']`

Users pick from this set — they cannot upload photos.

**Profile page logic (`loadProfile()`):**
1. Fetch `GET /profile`
2. Populate display fields: username, email (display only), points, streak count, total lessons completed
3. Show current avatar: set `#current-avatar` src to `/img/avatars/${data.avatar}.png`
4. Render avatar grid in `#avatar-grid`:
   - For each avatar ID, create a clickable `<img>` with src `/img/avatars/${id}.png`, class `avatar-option`, `data-avatar` attribute
   - Highlight current avatar with class `selected`
   - On click → call `selectAvatar(avatarId)`
5. If `data.allLessonsComplete === true`:
   - Show `#address-section` (`style.display = 'block'`)
   - If user already has `shippingAddress`, pre-fill the form fields
6. If `allLessonsComplete` is false, keep `#address-section` hidden

**`selectAvatar(avatarId)` function:**
1. `await apiFetch('/profile/avatar', { method: 'PUT', body: JSON.stringify({ avatar: avatarId }) })`
2. Update `#current-avatar` src
3. Move `selected` class to the clicked avatar
4. Call `window.initAuthState()` to update avatar in nav

**Address form (for final prize — 3D printed mascot):**
1. Attach submit listener to `#address-form`
2. Validate all fields non-empty (name, street, city, state, zip)
3. `await apiFetch('/profile/address', { method: 'PUT', body: JSON.stringify({ name, street, city, state, zip }) })`
4. Show success: "Address saved! Your 3D printed mascot is on the way! 🎉"

**Backend avatar endpoint (PUT /profile/avatar):**
1. Validate `avatar` is in the predefined set → 400 "Invalid avatar"
2. Update `user.avatar`
3. Save and return `{ success: true, avatar: user.avatar }`

**Backend address endpoint (PUT /profile/address):**
1. Validate all 5 fields are present and non-empty → 400 "All address fields are required"
2. Set `user.shippingAddress = { name, street, city, state, zip }`
3. Set `user.finalPrizeClaimed = true`
4. Save and return `{ success: true, message: 'Address saved' }`

### Quick-check after AI generates code:
- [ ] Uses `apiFetch()` (not raw `fetch`) in frontend files?
- [ ] Uses `showError()` / `showSuccess()` / `clearMessage()` from utils.js?
- [ ] Every async function wrapped in `try/catch`?
- [ ] File structured as INITIALIZATION → DATA LOADING → USER ACTIONS → EXPOSE GLOBALLY?
- [ ] Backend routes return JSON with `{ error: 'message' }` on failure?