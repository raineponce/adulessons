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
Page HTML: modules/lesson-quiz.html
Page script target: modules/lesson-quiz.js
Branch: ftb-lessons

Backend Endpoints This Page Must Use

GET /lessons/:lessonId for quiz question and options
POST /lessons/:lessonId/complete only if completion is finalized on quiz submit instead of lesson page
GET /profile/progress for refreshed user points/progress display after completion

Required Behavior

On load: read moduleId and lessonId from query params.
On load: fetch lesson with GET /lessons/:lessonId and render lesson.quiz data.
Render: question, options, selected state, submit state, result feedback, and explanation.
Submit behavior: user can submit only after selecting one option.
Correctness behavior: compare selected option index to correctIndex from lesson.quiz and show result.
Completion policy: if completion is owned by quiz page in this flow, call POST /lessons/:lessonId/complete after submit.
Completion policy: if completion is already owned by lesson page, do not call complete again; rely on idempotent backend behavior if called.
Progress update: after completion call, refresh points/progress UI from response or GET /profile/progress.
Continue behavior: send user to the next step page with moduleId and lessonId preserved.
Success state: quiz displays and submit flow works.
Empty state: show quiz unavailable message if quiz data is missing.
Error state: show friendly error with retry.
401 state: redirect to /login.html.

Implementation Requirements

Include scripts in this order:
api.js
modules/lesson-quiz.js
Page script responsibilities:
Cache DOM refs
Attach event listeners
Call AppApi methods
Render UI from response data
Handle errors cleanly
Keep functions small and readable
Avoid inline script blocks in HTML when possible

Deliverables

Updated modules/lesson-quiz.html with any required data hooks and script include(s)
New/updated modules/lesson-quiz.js
Short testing notes:
what was manually tested
one success case
one error case

Acceptance Checklist

Uses AppApi helper (no direct fetch in page script)
Handles loading/success/empty/error/401
Works on hard refresh and direct URL visit
No hardcoded placeholder quiz data where backend data is required
Completion endpoint is called at the chosen single source of completion in flow
User points and completedLessons behavior is correct and not double-counted
