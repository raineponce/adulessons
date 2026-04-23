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
Page HTML: module-list.html
Page script target: module-list.js
Branch: ftb-modules

Backend Endpoints This Page Must Use

GET /lessons for loading module metadata and module-to-lesson relationships used for routing
GET /profile/progress for progress display only if needed by page UI

Required Behavior

On load: fetch module/lesson data and prepare module routing map using backend module IDs.
Render: keep existing module cards and visual style, but remove lock icon UI and lock-state messaging.
User actions: clicking a module list item (card surface) navigates to lesson-list.html with query param moduleId matching the clicked module.
Navigation format: lesson-list.html?moduleId=mod1 for Finance 101; similarly pass the correct moduleId for each module.
Modal behavior: keep modal functionality intact, but only open modal when the user clicks See Details.
Modal behavior: clicking See Details shows module description modal for that specific module.
Card behavior: clicking the module card/list item itself should navigate directly and should not open modal.
Unlocking rule: all modules are unlocked; no gating/locking logic should block navigation.
UI cleanup: remove any message text that says Complete the previous module to unlock the next one.
UI cleanup: remove lock icon visuals/classes from module card action UI.
Success state: module cards render and route to lesson-list.html with correct moduleId values.
Empty state: show no modules available message.
Error state: show friendly error with retry action.
401 state: redirect to /login.html.

Implementation Requirements

Include scripts in this order:
api.js
module-list.js
Page script responsibilities:
Cache DOM refs
Attach event listeners
Call AppApi methods
Render UI from response data
Handle errors cleanly
Keep functions small and readable
Avoid inline script blocks in HTML when possible

Deliverables

Updated module-list.html with any required data hooks and script include(s)
New/updated module-list.js
Short testing notes:
what was manually tested
one success case
one error case

Acceptance Checklist

Uses AppApi helper (no direct fetch in page script)
Handles loading/success/empty/error/401
Works on hard refresh and direct URL visit
No hardcoded placeholder data where backend data is required
All modules are unlocked and navigable from card/list item click
See Details opens modal; card/list item click navigates to lesson-list.html
No lock icon is shown on module cards
No Complete the previous module to unlock the next one messaging remains
lesson-list.html receives correct moduleId from clicked module
