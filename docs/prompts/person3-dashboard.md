# Person 3 — Progress & Dashboard — AI Prompt Starter

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

### My Feature: Progress & Dashboard

**Files I own:**
- `backend/routes/profile.js` — progress-related endpoints (GET /profile/progress)
- `backend/middleware/progressMiddleware.js` — attaches computed progress to requests
- `frontend/js/dashboard.js` — dashboard page logic

**My route signatures:**
```
GET /profile/progress
→ {
    progressPercent: number,
    completedLessons: [string],
    currentLesson: string | null,
    modules: [{ moduleId, title, description, order, lessonIds }],
    streak: { current: number, lastActive: string | null },
    points: number
  }
```

**My HTML element IDs:**
- `dashboard.html`:
  - `#overall-progress-bar` — the inner bar element (width gets set to percentage)
  - `#continue-lesson` — container for "pick up where you left off" link (hidden by default, contains an `<a>` tag)
  - `#modules-list` — container where per-module cards are dynamically rendered
  - `#streak-count` — displays current streak number
  - `#points-display` — displays total points

**Progress bar HTML pattern:**
```html
<div class="progress-bar-container" role="progressbar" aria-valuemin="0" aria-valuemax="100">
  <div id="overall-progress-bar" class="progress-bar" aria-valuenow="0" style="width: 0%">0%</div>
</div>
```
Use `updateProgressBar('overall-progress-bar', data.progressPercent)` from utils.js.

**Dashboard page logic (`loadDashboard()`):**
1. Fetch `GET /profile/progress` — if returns null (401), apiFetch handles redirect
2. Set overall progress bar using `updateProgressBar()`
3. If `data.currentLesson` exists:
   - Show `#continue-lesson` element (`style.display = 'block'`)
   - Set the `<a>` inside it: `href = /lesson.html?id=${data.currentLesson}`
4. For each module in `data.modules`:
   - Count how many of its `lessonIds` are in `data.completedLessons`
   - Calculate percentage: `Math.round((completedInModule / total) * 100)`
   - Render a module card into `#modules-list` with:
     - `<h3>` with module title
     - Progress bar div (width = percentage)
     - Text: "X/Y lessons complete"
     - Link: "Continue →" to `/module.html?id=${mod.moduleId}`
5. Set `#streak-count` textContent to `data.streak.current`
6. Set `#points-display` textContent to `data.points` (use `formatPoints()` from utils.js)

**progressMiddleware (`attachProgress`):**
- Load user from `req.session.userId`
- If no user, call `next()` (requireAuth should catch this first)
- Calculate `progressPercent = Math.round((user.completedLessons.length / TOTAL_LESSONS) * 100)`
- Attach to `req.userProgress`:
  ```javascript
  req.userProgress = {
    completedLessons: user.completedLessons,
    progressPercent,
    points: user.points,
    streak: user.streak,
    currentLesson: user.currentLesson
  };
  ```
- Call `next()`

**TOTAL_LESSONS constant:**
- Set to 22 (6 modules × ~3.5 lessons average)
- Include a comment: `// UPDATE this to actual lesson count`

**GET /profile/progress route logic:**
1. Use `requireAuth` middleware
2. Load user from `req.session.userId`
3. Load all modules from DB, sorted by `order`
4. Calculate progressPercent
5. Return JSON with: progressPercent, completedLessons, currentLesson, modules array, streak, points

### Quick-check after AI generates code:
- [ ] Uses `apiFetch()` (not raw `fetch`) in frontend files?
- [ ] Uses `showError()` / `showSuccess()` / `updateProgressBar()` from utils.js?
- [ ] Every async function wrapped in `try/catch`?
- [ ] File structured as INITIALIZATION → DATA LOADING → USER ACTIONS → EXPOSE GLOBALLY?
- [ ] Backend routes return JSON with `{ error: 'message' }` on failure?