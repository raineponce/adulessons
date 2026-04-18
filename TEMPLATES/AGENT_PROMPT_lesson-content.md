# Agent Prompt Template For Frontend-Backend Page Integration

You are integrating one frontend page with backend APIs in this repo.
Follow these rules:

Use shared API helper only: api.js
Create or update one page script file under frontend/js/pages/...
Keep HTML structure mostly unchanged; add IDs/classes only when needed for hooks
Handle loading, success, empty, error, and 401 states
On 401, redirect to /login.html
Do not duplicate fetch boilerplate in page script

Assignment

Page owner: Raine
Page HTML: lesson-taxes.html
Page script target: lesson-taxes.js
Branch: ftb-lessons

Backend Endpoints This Page Must Use

GET /lessons/:lessonId for lesson pages and quiz data
POST /lessons/:lessonId/complete for awarding points and completion tracking
GET /profile/progress for refreshed user points/progress display after completion

Required Behavior

On load: read moduleId and lessonId from query params.
On load: fetch lesson with GET /lessons/:lessonId.
Render: build lesson content from lesson.pages and block types.
Pagination: next/back must use pages.length from backend data.
Back behavior: from page 1, return to lesson-list page for same module; otherwise go to previous page.
Quiz button behavior: navigate to modules/lesson-quiz.html with moduleId and lessonId params.
Completion trigger: when user reaches final lesson page and clicks Quiz Question, call POST /lessons/:lessonId/complete before navigating.
Completion rule: completion call must be idempotent and safe to call again; do not duplicate local completion UI updates if already completed.
Progress update: after successful completion call, update points/progress UI from response or by calling GET /profile/progress.
Success state: correct lesson content renders and completion call succeeds at lesson end.
Empty state: show lesson content coming soon if pages are empty.
Error state: show friendly error with retry.
401 state: redirect to /login.html.

Implementation Requirements

Include scripts in this order:
api.js
lesson-taxes.js
Page script responsibilities:
Cache DOM refs
Attach event listeners
Call AppApi methods
Render UI from response data
Handle errors cleanly
Keep functions small and readable
Avoid inline script blocks in HTML when possible

Deliverables

Updated lesson-taxes.html with any required data hooks and script include(s)
New/updated lesson-taxes.js
Short testing notes:
what was manually tested
one success case
one error case

Acceptance Checklist

Uses AppApi helper (no direct fetch in page script)
Handles loading/success/empty/error/401
Works on hard refresh and direct URL visit
No hardcoded placeholder data where backend data is required
Clicking Quiz Question from final lesson page calls completion endpoint
User receives lesson points once and lesson is tracked as completed in backend
