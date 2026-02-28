# Coding Conventions & AI Assistant Guide

This document defines the coding standards for the **AduLessons** project.
All team members must follow these conventions. When using an AI coding
assistant (Copilot, ChatGPT, Claude, etc.) paste the relevant sections of
this file into the chat so the assistant generates conformant code.

---

## Table of Contents

1. [Script Loading Order](#script-loading-order)
2. [JavaScript Conventions](#javascript-conventions)
3. [Correct Feature Script Template](#correct-feature-script-template)
4. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
5. [Backend Route Conventions](#backend-route-conventions)
6. [CSS Class Conventions](#css-class-conventions)
7. [AI Assistant Prompt Tip](#ai-assistant-prompt-tip)
8. [Git Workflow](#git-workflow)
9. [Dependency / Build Order](#dependency--build-order)

---

## Script Loading Order

Every HTML page **MUST** load scripts in this exact order:

| Order | File | Purpose |
|-------|------|---------|
| 1st | `utils.js` | Shared helpers — must be first |
| 2nd | `auth.js` | Auth state check — must come after utils.js |
| Last | Page-specific script(s) | Feature logic |

```html
<script src="/js/utils.js"></script>
<script src="/js/auth.js"></script>
<script src="/js/dashboard.js"></script>
```

> **Why?** `auth.js` calls `apiFetch()` from `utils.js`. Page scripts call
> functions from both. Loading out of order causes "X is not defined" errors.

---

## JavaScript Conventions

- Use `const` and `let` only — **never** `var`.
- Use `async/await` only — **never** `.then()` chains.
- Always use `apiFetch()` from `utils.js` for backend calls — **never** raw `fetch()`.
- Always use `showError()`, `showSuccess()`, `clearMessage()` from `utils.js` for user-facing messages.
- Always use `updateProgressBar()` from `utils.js` for progress bars.
- Always wrap async operations in `try/catch`.
- Use the `DOMContentLoaded` event for page initialisation.
- Functions called from HTML `onclick` attributes or from other scripts **must** be attached to `window`.
- Use descriptive variable names; avoid single-letter names except as loop indices (`i`, `j`).
- Add JSDoc comments to every function.

---

## Correct Feature Script Template

> **This is the template every feature script should follow.**

```javascript
/**
 * Feature Name — brief description
 * Owner: Person N
 *
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
 * Load and display the feature data.
 * Fetches from GET /route and populates the page.
 */
async function loadFeatureData() {
  try {
    const data = await apiFetch('/route');
    if (!data) return; // apiFetch handles 401 redirect

    // Populate the page
    document.getElementById('feature-title').textContent = data.title;

  } catch (err) {
    showError('feature-error', err.message);
  }
}

// ============================================
// USER ACTIONS
// ============================================

/**
 * Handle a user action (e.g., form submit, button click).
 * @param {string} itemId - The ID of the item to act on.
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

    // Refresh auth state if points/user data changed
    if (window.initAuthState) {
      await window.initAuthState();
    }
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

## Common Mistakes to Avoid

### ❌ Wrong patterns

```javascript
// ❌ DON'T: Use var
var data = response;

// ❌ DON'T: Use raw fetch()
const res = await fetch('/prizes');
const data = await res.json();

// ❌ DON'T: Use .then() chains
fetch('/prizes').then(res => res.json()).then(data => { /* ... */ });

// ❌ DON'T: Handle errors inline with custom DOM manipulation
document.getElementById('error').innerText = 'Something went wrong';
document.getElementById('error').style.color = 'red';

// ❌ DON'T: Forget try/catch on async functions
async function loadData() {
  const data = await apiFetch('/route'); // if this throws, it's unhandled
}

// ❌ DON'T: Use inconsistent auth checking
if (!loggedIn) { location = '/login.html'; } // apiFetch already handles this
```

### ✅ Correct equivalents

```javascript
// ✅ DO: Use const/let
const data = response;

// ✅ DO: Use apiFetch() wrapper
const data = await apiFetch('/prizes');

// ✅ DO: Use async/await
const data = await apiFetch('/prizes');

// ✅ DO: Use shared helper functions
showError('prize-error', 'Something went wrong');

// ✅ DO: Always wrap in try/catch
async function loadData() {
  try {
    const data = await apiFetch('/route');
    if (!data) return;
  } catch (err) {
    showError('feature-error', err.message);
  }
}

// ✅ DO: Let apiFetch handle auth redirects automatically
const data = await apiFetch('/route'); // auto-redirects on 401
if (!data) return;                     // just check for null
```

---

## Backend Route Conventions

- Use `const` and `require` (CommonJS) — not ES module `import`/`export`.
- Always apply `requireAuth` middleware on protected routes.
- Always return JSON: `{ success: true, ...data }` for success, `{ error: 'message' }` for errors.
- Use appropriate HTTP status codes:
  - `200` — success
  - `201` — resource created
  - `400` — bad request / validation failure
  - `401` — unauthenticated
  - `404` — not found
  - `500` — unexpected server error
- Validate all input before processing.
- Wrap every route handler body in `try/catch`.

### Backend route template

```javascript
router.post('/:id/action', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;

    // Validate input
    if (!field) {
      return res.status(400).json({ error: 'Field is required' });
    }

    // Business logic
    const result = await Model.findById(id);
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return success
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Action failed:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
```

---

## CSS Class Conventions

| Class | Purpose |
|-------|---------|
| `.logged-in-only` | Shown only when the user is authenticated |
| `.logged-out-only` | Shown only when the user is NOT authenticated |
| `.user-username` | Filled with the logged-in user's username |
| `.user-avatar` | `<img>` whose `src` is set to the user's avatar |
| `.user-points` | Filled with the user's point total |
| `.user-streak` | Filled with the user's streak count |
| `.error-message` | Added by `showError()` — style in CSS |
| `.success-message` | Added by `showSuccess()` — style in CSS |
| `.lesson-image` | Applied to images rendered in lesson content |
| `.video-wrapper` | Wraps the `<iframe>` for embedded videos |
| `.callout` | Highlights a callout content block |
| `.quiz-options` | Container for quiz answer buttons |
| `.quiz-option` | Individual quiz answer button |
| `.correct` | Applied to a quiz option after a correct answer |
| `.incorrect` | Applied to a quiz option after an incorrect answer |

**Progress bar structure** (Bootstrap-compatible):

```html
<div class="progress">
  <div id="overall-progress-bar"
       class="progress-bar"
       role="progressbar"
       aria-valuemin="0"
       aria-valuemax="100"
       aria-valuenow="0">0%</div>
</div>
```

---

## AI Assistant Prompt Tip

When using an AI coding assistant (GitHub Copilot, ChatGPT, Claude, etc.),
include the following in your prompt to get code that follows our conventions:

> "I'm working on the AduLessons educational website. Please follow the
> conventions in our `docs/coding-conventions.md` file. Use `apiFetch()`
> from `utils.js` for all backend calls, use `showError()`/`showSuccess()`
> for messages, use `async/await` (never `.then()`), use `const`/`let`
> (never `var`), always wrap async code in `try/catch`, and follow the
> feature script template pattern with sections for INITIALIZATION, DATA
> LOADING, USER ACTIONS, and EXPOSE GLOBALLY."

For a ready-to-paste version, see `docs/ai-prompt-guide.md`.

---

## Git Workflow

- **Never** commit directly to `main`.
- Create feature branches following this naming scheme:
  - `feature/auth`
  - `feature/lessons`
  - `feature/dashboard`
  - `feature/prizes`
  - `feature/codes-profile`
- Pull from `main` frequently — **at least once per day**.
- Write descriptive commit messages:
  - `feat: add login route`
  - `fix: handle expired codes`
  - `style: update progress bar CSS`
- Open a Pull Request for every change; request **at least 1 review** before merging.
- If you need to modify a file **owned by another team member** (see
  `docs/api-contract.js` § 5), coordinate with them first.

---

## Dependency / Build Order

Feature development should follow this phased approach to minimise blocked work:

### Week 1
- **Person 1** begins the Auth feature (`/auth/me`, `/auth/login`,
  `/auth/register`, `auth.js`). Everyone else is blocked on auth.
- **Person 2** begins writing lesson content JSON files (no backend dependency).

### Week 2
Once auth is working end-to-end, **Persons 2–5 work in parallel**:
- **Person 2** — Lesson routes & frontend (`lesson.js`)
- **Person 3** — Dashboard / progress routes & frontend (`dashboard.js`)
- **Person 4** — Prize routes & frontend (`prizes.js`)
- **Person 5** — Code redemption & profile routes & frontend (`codes.js`, `profile.js`)

### Week 3
- Integration testing across all features.
- Polish, edge cases, and the full prize redemption flow.
- Final review and merge to `main`.
