# Person 2 — Lessons & Content — AI Prompt Starter

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

### My Feature: Lessons & Content

**Files I own:**
- `backend/routes/lessons.js` — lesson listing, content delivery, completion
- `backend/models/Lesson.js` — Lesson mongoose schema (with content block & quiz subdocuments)
- `backend/models/Module.js` — Module mongoose schema
- `backend/seed/seedContent.js` — script to load JSON content into MongoDB
- `content/module1.json` through `content/module6.json` — lesson content files
- `frontend/js/lesson.js` — lesson content loader, page navigation, block renderer

**My route signatures:**
```
GET  /lessons
→ { modules: [{ moduleId, title, description, order, lessonIds }], completedLessons: [string], progressPercent: number }

GET  /lessons/:lessonId
→ { lessonId, moduleId, title, order, pages: [{ pageNumber, blocks: [ContentBlock] }], quiz: { question, options, correctIndex, explanation }, pointsAwarded }

POST /lessons/:lessonId/complete
→ { message, points, allComplete, progressPercent }
```

**My HTML element IDs:**
- `lesson.html`: `#lesson-title`, `#lesson-content`, `#next-btn`, `#prev-btn`, `#page-indicator`, `#quiz-feedback`

**Content block types (used in lesson pages):**
Each page has an array of `blocks`. Each block has a `type` and type-specific fields:
```
heading  → { type: 'heading', body: string }
text     → { type: 'text', body: string }
image    → { type: 'image', src: string, alt: string }
video    → { type: 'video', videoId: string, src: string }
           videoId = YouTube video ID (e.g., 'Dxcc6ycY73M')
           src = full embed URL ('https://www.youtube.com/embed/Dxcc6ycY73M')
list     → { type: 'list', items: [string], ordered: boolean }
link     → { type: 'link', href: string, linkText: string }
callout  → { type: 'callout', body: string }
```

**renderBlock(block) function spec:**
- `heading` → create `<h2>`, set textContent to `block.body`
- `text` → create `<p>`, set textContent to `block.body`
- `image` → create `<img>`, set src to `block.src`, alt to `block.alt || ''`, add class `lesson-image`
- `video` → create `<div class="video-wrapper">`, innerHTML = `<iframe src="https://www.youtube.com/embed/${block.videoId}" frameborder="0" allowfullscreen></iframe>`. Validate `videoId` against `/^[\w-]+$/` before embedding.
- `list` → create `<ol>` or `<ul>` based on `block.ordered`, create `<li>` for each item
- `link` → create `<a>`, set href, textContent to `block.linkText || block.href`, target `_blank`, rel `noopener noreferrer`
- `callout` → create `<div class="callout">`, set textContent to `block.body`
- default → return `null`

**Page navigation:**
- Track `currentPage` (starts at 0)
- Next button: increment page, if past last page → call `window.renderQuiz(lesson.quiz, lesson.lessonId)` (provided by quiz.js)
- Prev button: decrement page (minimum 0)
- Show page indicator: "Page X of Y"
- Update user's `currentLesson` on the backend when a lesson is loaded (the GET /lessons/:lessonId route handles this)

**Module schema:**
- `moduleId`: string, unique, required (e.g., 'mod1')
- `title`: string, required
- `description`: string
- `order`: number, required
- `introPage`: Mixed (content blocks)
- `summaryPage`: Mixed (content blocks)
- `lessonIds`: array of strings

**Lesson schema:**
- `lessonId`: string, unique, required (e.g., 'mod1-lesson1')
- `moduleId`: string, required
- `title`: string, required
- `order`: number, required
- `pages`: array of `{ pageNumber: Number, blocks: [ContentBlock] }` — 5 pages per lesson
- `quiz`: `{ question: String, options: [String], correctIndex: Number, explanation: String }`
- `pointsAwarded`: number, default 10

**Lesson completion logic (POST /lessons/:lessonId/complete):**
- Check if lesson is already in user's `completedLessons` — if yes, return "Already completed" with current points
- Add `lessonId` to `completedLessons` array
- Add `lesson.pointsAwarded` to user's points
- Check if `completedLessons.length >= TOTAL_LESSONS` (22) — if so, set `allLessonsComplete = true`
- Return updated points, progressPercent, and allComplete status

**Content JSON file format (for seed script):**
```json
{
  "moduleId": "mod1",
  "title": "Module Title",
  "description": "Module description",
  "order": 1,
  "introPage": { "blocks": [...] },
  "summaryPage": { "blocks": [...] },
  "lessons": [
    {
      "lessonId": "mod1-lesson1",
      "title": "Lesson Title",
      "order": 1,
      "pointsAwarded": 10,
      "pages": [
        { "pageNumber": 1, "blocks": [...] }
      ],
      "quiz": { "question": "...", "options": [...], "correctIndex": 0, "explanation": "..." }
    }
  ]
}
```

**Seed script (`seedContent.js`):**
- Connect to MongoDB
- Clear existing Module and Lesson collections
- Read all `.json` files from `/content` directory
- For each file: create Module document (with `lessonIds` array), create separate Lesson documents
- Log progress, disconnect when done

### Quick-check after AI generates code:
- [ ] Uses `apiFetch()` (not raw `fetch`) in frontend files?
- [ ] Uses `showError()` / `showSuccess()` for messages?
- [ ] Every async function wrapped in `try/catch`?
- [ ] File structured as INITIALIZATION → DATA LOADING → USER ACTIONS → EXPOSE GLOBALLY?
- [ ] Backend routes return JSON with `{ error: 'message' }` on failure?