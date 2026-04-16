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
Page HTML: lesson-list.html
Page script target: lesson-list.js
Branch: ftb-lessons

Backend Endpoints This Page Must Use

GET /lessons for loading modules and lesson availability/progress
GET /profile/progress for progress display if needed by page UI

Required Behavior

On load: fetch lesson/module data and identify the active module from query param moduleId, defaulting to mod1 if absent.
Render: populate lesson cards from backend lessonIds/order instead of hardcoded links where possible.
User actions: clicking an unlocked lesson navigates to its lesson page with query params moduleId and lessonId.
Navigation format: lesson-taxes.html?moduleId=mod1&lessonId=mod1-lesson1 for Taxes card.
Progress state: use completedLessons from GET /lessons response to visually mark completed lessons.
Progress state: keep lessons already in completedLessons unlocked and styled as completed.
Progress state: use completedLessons to decide which lesson cards remain locked.
Locked lessons: keep existing modal behavior and prevent navigation.
Success state: lesson cards render with correct titles/order and unlocked/locked state.
Empty state: show no lessons available message.
Error state: show friendly error with retry action.
401 state: redirect to /login.html

Implementation Requirements

Include scripts in this order:
api.js
lesson-list.js
Page script responsibilities:
Cache DOM refs
Attach event listeners
Call AppApi methods
Render UI from response data
Handle errors cleanly
Keep functions small and readable
Avoid inline script blocks in HTML when possible

Deliverables

Updated lesson-list.html with any required data hooks and script include(s)
New/updated lesson-list.js
Short testing notes:
what was manually tested
one success case
one error case
Acceptance Checklist

Uses AppApi helper (no direct fetch in page script)
Handles loading/success/empty/error/401
Works on hard refresh and direct URL visit
No hardcoded placeholder data where backend data is required
Clicking Taxes opens lesson page carrying lessonId=mod1-lesson1
Completed lessons from backend are visibly marked as complete