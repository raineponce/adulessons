# AduLessons — AI Coding Assistant Quick Reference

> Copy and paste this entire file into your AI assistant chat before asking
> it to write any code for this project. It gives the assistant everything
> it needs to produce code that matches our team conventions.

---

## Project Context

AduLessons is an educational website built on the **MEN stack**
(MongoDB · Express · Node.js) with a plain HTML/CSS/JS frontend (no framework).
The frontend calls an Express REST API. Sessions are managed server-side
(no JWTs). All API responses are JSON.

---

## Rule 1 — Script Loading Order

Every HTML page must load scripts in this exact order — no exceptions:

```html
<script src="/js/utils.js"></script>   <!-- FIRST: shared helpers -->
<script src="/js/auth.js"></script>    <!-- SECOND: auth state -->
<script src="/js/page.js"></script>    <!-- LAST: page-specific logic -->
```

---

## Rule 2 — Always Use `apiFetch()` for Backend Calls

Never call `fetch()` directly. Use the `apiFetch()` helper from `utils.js`:

```javascript
// ✅ Correct
const data = await apiFetch('/prizes');

// ✅ POST with body
const result = await apiFetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

// ❌ Never do this
const res = await fetch('/prizes');
const data = await res.json();
```

`apiFetch()` automatically:
- Adds `Accept: application/json` and `Content-Type: application/json` headers.
- Redirects to `/login.html` on a 401 response and returns `null`.
- Throws an `Error` with `data.error` for all other non-ok responses.
- Logs errors to the console.

Always check the return value: `if (!data) return;`

---

## Rule 3 — Use Shared Message Helpers

Never manipulate error/success DOM elements directly. Use helpers from `utils.js`:

```javascript
showError('element-id', 'Something went wrong.');
showSuccess('element-id', 'Done! You earned <strong>50 pts</strong>.');
clearMessage('element-id');          // call this before a new request
updateProgressBar('bar-id', 42);     // sets width, aria-valuenow, text
```

---

## Rule 4 — async/await + try/catch, Always

```javascript
// ✅ Correct
async function loadData() {
  try {
    const data = await apiFetch('/route');
    if (!data) return;
    // use data …
  } catch (err) {
    showError('feature-error', err.message);
  }
}

// ❌ Never use .then() chains
// ❌ Never leave async functions without try/catch
// ❌ Never use var — only const and let
```

---

## Rule 5 — Feature Script Template

Every page script must follow this structure:

```javascript
/**
 * Feature Name — brief description
 * Owner: Person N
 * Depends on: utils.js, auth.js
 * HTML page: feature.html
 * Backend routes: GET /route, POST /route
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadFeatureData();
});

// ============================================
// DATA LOADING
// ============================================
/**
 * Load and display feature data.
 */
async function loadFeatureData() {
  try {
    const data = await apiFetch('/route');
    if (!data) return;
    document.getElementById('feature-title').textContent = data.title;
  } catch (err) {
    showError('feature-error', err.message);
  }
}

// ============================================
// USER ACTIONS
// ============================================
/**
 * Handle a user action.
 * @param {string} itemId - ID of the item to act on.
 */
async function handleAction(itemId) {
  try {
    clearMessage('feature-error');
    const data = await apiFetch(`/route/${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ key: 'value' })
    });
    if (!data) return;
    showSuccess('feature-result', data.message);
    if (window.initAuthState) await window.initAuthState(); // refresh points/avatar
  } catch (err) {
    showError('feature-error', err.message);
  }
}

// ============================================
// EXPOSE GLOBALLY (for HTML onclick handlers)
// ============================================
window.handleAction = handleAction;
```

---

## Rule 6 — Backend Route Template

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

Backend rules:
- Use `require` (CommonJS), not `import`.
- Always use `requireAuth` middleware on protected routes.
- Success → `{ success: true, ...data }`.  Error → `{ error: 'message' }`.
- Status codes: 200 success · 201 created · 400 bad input · 401 unauth · 404 not found · 500 server error.

---

## Key HTML Element IDs

| Page | IDs |
|------|-----|
| `login.html` | `#login-form`, `#login-error` |
| `register.html` | `#register-form`, `#register-error` |
| `dashboard.html` | `#overall-progress-bar`, `#continue-lesson`, `#modules-list`, `#streak-count`, `#points-display` |
| `lesson.html` | `#lesson-title`, `#lesson-content`, `#next-btn`, `#prev-btn`, `#page-indicator`, `#quiz-feedback` |
| `prizes.html` | `#prizes-list`, `#redeemed-list`, `#prize-error` |
| `codes.html` | `#code-form`, `#code-input`, `#code-result` |
| `profile.html` | `#current-avatar`, `#avatar-grid`, `#address-section`, `#address-form` |
| All pages | `.logged-in-only`, `.logged-out-only`, `.user-username`, `.user-avatar`, `.user-points`, `.user-streak` |

---

## Updating User Data After an Action

After any action that changes points, avatar, or other user data, refresh the
navbar and global UI by calling:

```javascript
if (window.initAuthState) await window.initAuthState();
```

`initAuthState` is defined in `auth.js` and calls `GET /auth/me`.
