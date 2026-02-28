/**
 * api-contract.js — API Route & HTML Element Contract
 *
 * THIS FILE IS DOCUMENTATION ONLY — it is never loaded or executed.
 * It captures the agreed-upon interfaces between the frontend and backend
 * so that every team member (and every AI coding assistant) codes against
 * the same shapes.
 *
 * Read this file before implementing any feature.
 * Update this file whenever a route signature changes — and notify the team.
 *
 * Table of Contents
 * -----------------
 * 1. Route Signatures
 *    1a. Auth routes        (Person 1)
 *    1b. Lesson routes      (Person 2)
 *    1c. Profile/Progress   (Person 3)
 *    1d. Prize routes       (Person 4)
 *    1e. Code routes        (Person 5)
 *    1f. Profile routes     (Person 5)
 * 2. Content Block Types
 * 3. HTML Element IDs
 * 4. Predefined Avatar IDs
 * 5. Team Ownership
 */

// ============================================================
// 1. ROUTE SIGNATURES
// ============================================================

// ------------------------------------------------------------
// 1a. AUTH ROUTES  (Person 1 — auth.js / login.js / register.js)
// ------------------------------------------------------------

/*
 * GET /auth/me
 *   → (when logged in)
 *     {
 *       loggedIn: true,
 *       user: {
 *         _id:      string,
 *         username: string,
 *         email:    string,
 *         avatar:   string,          // avatar ID, e.g. 'cat'
 *         points:   number,
 *         streak: {
 *           current:    number,      // consecutive-day count
 *           lastActive: string,      // ISO date string
 *         }
 *       }
 *     }
 *   → (when not logged in)
 *     { loggedIn: false }
 *
 * POST /auth/login
 *   body: { email: string, password: string }
 *   → (success) { success: true, user: { username: string, points: number } }
 *   → (error)   { error: string }           HTTP 400 / 401
 *
 * POST /auth/register
 *   body: { username: string, email: string, password: string }
 *   → (success) { success: true }
 *   → (error)   { error: string }           HTTP 400
 *
 * POST /auth/logout
 *   body: (none)
 *   → redirects to '/'                      HTTP 302
 */

// ------------------------------------------------------------
// 1b. LESSON ROUTES  (Person 2 — lesson.js / dashboard.js)
// ------------------------------------------------------------

/*
 * GET /lessons
 *   → {
 *       modules: [
 *         {
 *           moduleId:    string,
 *           title:       string,
 *           description: string,
 *           order:       number,
 *           lessonIds:   string[],
 *         }
 *       ],
 *       completedLessons: string[],  // array of lessonId strings
 *       progressPercent:  number,    // 0-100
 *     }
 *
 * GET /lessons/:lessonId
 *   → {
 *       lessonId:  string,
 *       moduleId:  string,
 *       title:     string,
 *       order:     number,
 *       pages: [
 *         {
 *           pageNumber: number,
 *           blocks: ContentBlock[],  // see Section 2
 *         }
 *       ],
 *       quiz: {
 *         question:     string,
 *         options:      string[],
 *         correctIndex: number,
 *         explanation:  string,
 *       },
 *       pointsAwarded: number,
 *     }
 *
 * POST /lessons/:lessonId/complete
 *   body: (none — authenticated user is implicit)
 *   → {
 *       message:         string,
 *       points:          number,   // total points after this lesson
 *       allComplete:     boolean,  // true when all lessons are done
 *       progressPercent: number,
 *     }
 */

// ------------------------------------------------------------
// 1c. PROFILE / PROGRESS ROUTES  (Person 3 — dashboard.js)
// ------------------------------------------------------------

/*
 * GET /profile/progress
 *   → {
 *       progressPercent:  number,
 *       completedLessons: string[],
 *       currentLesson:    string | null,  // lessonId of next lesson to take
 *       modules: [...],                   // same shape as GET /lessons → modules
 *       streak: { current: number, lastActive: string },
 *       points: number,
 *     }
 */

// ------------------------------------------------------------
// 1d. PRIZE ROUTES  (Person 4 — prizes.js)
// ------------------------------------------------------------

/*
 * GET /prizes
 *   → [
 *       {
 *         _id:         string,
 *         name:        string,
 *         description: string,
 *         type:        'digital' | 'physical' | 'coupon',
 *         cost:        number,    // points required
 *         fileUrl:     string | null,
 *         couponCode:  string | null,
 *         available:   boolean,
 *       }
 *     ]
 *
 * POST /prizes/:prizeId/redeem
 *   body: (none — authenticated user is implicit)
 *   → {
 *       success: true,
 *       prize: {
 *         name:       string,
 *         type:       string,
 *         couponCode: string | null,
 *         fileUrl:    string | null,
 *       },
 *       remainingPoints: number,
 *     }
 *   → (error) { error: string }   HTTP 400 / 404
 *
 * GET /prizes/redeemed
 *   → [
 *       {
 *         prizeId:    string,
 *         name:       string,
 *         type:       string,
 *         redeemedAt: string,   // ISO date string
 *       }
 *     ]
 */

// ------------------------------------------------------------
// 1e. CODE ROUTES  (Person 5 — codes.js)
// ------------------------------------------------------------

/*
 * POST /codes/redeem
 *   body: { code: string }
 *   → {
 *       success:       true,
 *       rewardType:    'points' | 'prize',
 *       pointsAwarded: number | null,
 *       prizeName:     string | null,
 *     }
 *   → (error) { error: string }   HTTP 400 / 404
 */

// ------------------------------------------------------------
// 1f. PROFILE ROUTES  (Person 5 — profile.js)
// ------------------------------------------------------------

/*
 * GET /profile
 *   → {
 *       username:           string,
 *       email:              string,
 *       avatar:             string,
 *       points:             number,
 *       streak:             { current: number, lastActive: string },
 *       completedLessons:   string[],
 *       allLessonsComplete: boolean,
 *       shippingAddress: {
 *         name:   string,
 *         street: string,
 *         city:   string,
 *         state:  string,
 *         zip:    string,
 *       } | null,
 *     }
 *
 * PUT /profile/avatar
 *   body: { avatar: string }    // must be a valid avatar ID (see Section 4)
 *   → { success: true, avatar: string }
 *   → (error) { error: string }   HTTP 400
 *
 * PUT /profile/address
 *   body: { name: string, street: string, city: string, state: string, zip: string }
 *   → { success: true, message: string }
 *   → (error) { error: string }   HTTP 400
 */

// ============================================================
// 2. CONTENT BLOCK TYPES
// ============================================================

/*
 * Lesson pages are composed of an ordered array of ContentBlock objects.
 * Each block has a `type` discriminator and type-specific fields.
 *
 * type: 'heading'
 *   { type: 'heading', body: string }
 *   Renders as a section heading (h2/h3 level).
 *
 * type: 'text'
 *   { type: 'text', body: string }
 *   Renders as a paragraph of plain text.
 *
 * type: 'image'
 *   { type: 'image', src: string, alt: string }
 *   `src` is an absolute URL or a root-relative path.
 *   `alt` must be a meaningful description for accessibility.
 *
 * type: 'video'
 *   { type: 'video', videoId: string, src: string }
 *   `videoId` is the YouTube video ID (e.g. 'dQw4w9WgXcQ').
 *   `src` is the full embed URL (e.g. 'https://www.youtube.com/embed/dQw4w9WgXcQ').
 *
 * type: 'list'
 *   { type: 'list', items: string[], ordered: boolean }
 *   `ordered: true`  → <ol>  (numbered list)
 *   `ordered: false` → <ul>  (bulleted list)
 *
 * type: 'link'
 *   { type: 'link', href: string, linkText: string }
 *   Renders as an anchor tag.
 *
 * type: 'callout'
 *   { type: 'callout', body: string }
 *   Renders inside a highlighted callout box (use the `.callout` CSS class).
 */

// ============================================================
// 3. HTML ELEMENT IDs
// ============================================================

/*
 * Every page-specific script and backend feature depends on these element IDs
 * being present in the corresponding HTML file. Do not rename them without
 * updating both the HTML and the JS file together.
 *
 * login.html
 *   #login-form       — <form> element for the login form
 *   #login-error      — error message container (initially hidden)
 *
 * register.html
 *   #register-form    — <form> element for the registration form
 *   #register-error   — error message container (initially hidden)
 *
 * dashboard.html
 *   #overall-progress-bar  — inner progress-bar div (role="progressbar")
 *   #continue-lesson       — link/button to resume the next lesson
 *   #modules-list          — container where module cards are injected
 *   #streak-count          — element showing the streak number
 *   #points-display        — element showing the user's point total
 *
 * lesson.html
 *   #lesson-title     — element displaying the lesson title
 *   #lesson-content   — container where page blocks are rendered
 *   #next-btn         — "Next" navigation button
 *   #prev-btn         — "Previous" navigation button
 *   #page-indicator   — shows current page, e.g. "Page 2 of 4"
 *   #quiz-feedback    — shows quiz result feedback (initially hidden)
 *
 * prizes.html
 *   #prizes-list      — container where available prizes are rendered
 *   #redeemed-list    — container where redeemed prizes are rendered
 *   #prize-error      — error message container (initially hidden)
 *
 * codes.html
 *   #code-form        — <form> element for the code entry form
 *   #code-input       — <input> for the secret code
 *   #code-result      — result/feedback container (initially hidden)
 *
 * profile.html
 *   #current-avatar   — <img> showing the currently selected avatar
 *   #avatar-grid      — container where avatar options are rendered
 *   #address-section  — section showing the saved shipping address
 *   #address-form     — <form> element for editing the shipping address
 *
 * ALL pages (populated by auth.js after GET /auth/me)
 *   .logged-in-only   — shown when the user is authenticated
 *   .logged-out-only  — shown when the user is not authenticated
 *   .user-username    — element(s) whose textContent is set to the username
 *   .user-avatar      — <img> element(s) whose src is set to the avatar image
 *   .user-points      — element(s) whose textContent is set to points
 *   .user-streak      — element(s) whose textContent is set to streak count
 */

// ============================================================
// 4. PREDEFINED AVATAR IDs
// ============================================================

/*
 * The following avatar IDs are valid values for the `avatar` field on the
 * User model and in PUT /profile/avatar requests. The corresponding image
 * files live at /assets/avatars/<id>.png (or similar).
 *
 *   'default'
 *   'cat'
 *   'dog'
 *   'robot'
 *   'star'
 *   'rocket'
 *   'book'
 *   'globe'
 */

// ============================================================
// 5. TEAM OWNERSHIP
// ============================================================

/*
 * Each file is owned by one team member. If you need to change a file
 * owned by someone else, coordinate with them first (see Git Workflow in
 * docs/coding-conventions.md).
 *
 * Person 1 — Auth
 *   routes/auth.js
 *   models/User.js
 *   middleware/authMiddleware.js
 *   frontend/js/auth.js
 *   frontend/js/login.js
 *   frontend/js/register.js
 *
 * Person 2 — Lessons
 *   routes/lessons.js
 *   models/Lesson.js
 *   models/Module.js
 *   seed/seedContent.js
 *   content/*.json
 *   frontend/js/lesson.js
 *
 * Person 3 — Dashboard
 *   routes/profile.js  (progress endpoints)
 *   middleware/progressMiddleware.js
 *   frontend/js/dashboard.js
 *
 * Person 4 — Prizes
 *   routes/prizes.js
 *   models/Prize.js
 *   frontend/js/prizes.js
 *
 * Person 5 — Codes & Profile
 *   routes/codes.js
 *   models/SecretCode.js
 *   routes/profile.js  (avatar + address endpoints)
 *   frontend/js/codes.js
 *   frontend/js/profile.js
 */
