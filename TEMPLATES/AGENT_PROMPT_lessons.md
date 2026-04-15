# Agent Prompt Template For Frontend-Backend Page Integration

Use this template when assigning AI agents to integrate one frontend page with backend routes.

## How To Use
1. Copy this entire template.
2. Fill the placeholders in brackets.
3. Include relevant excerpts from INTEGRATION.md and page behavior requirements.
4. Keep scope to one page per run.

## Prompt Template

You are integrating one frontend page with backend APIs in this repo.
Follow these rules:
- Use shared API helper only: `frontend/js/api.js`
- Create or update one page script file under `frontend/js/pages/...`
- Keep HTML structure mostly unchanged; add IDs/classes only when needed for hooks
- Handle loading, success, empty, error, and 401 states
- On 401, redirect to `/login.html`
- Do not duplicate fetch boilerplate in page script

### Assignment
- Page owner: Raine
- Page HTML: 'frontend/lesson-taxes.html'
- Page script target: `frontend/js/pages/lessons/lesson-taxes.js`
- Branch: 'ftb-lessons'

### Backend Endpoints This Page Must Use
- GET /lessons - Return all modules sorted by order with user progress
- GET /lessons/:lessonId - Return lesson content and update user's currentLesson
- POST /lessons/:lessonId/complete - Mark lesson complete and award points

### Required Behavior
- On load: [WHAT DATA TO LOAD]
- Render: [WHAT UI SECTIONS TO POPULATE]
- User actions: [BUTTONS/FORMS AND WHAT THEY TRIGGER]
- Success state: User will be able to see the lesson's data, including lesson's introduction, text content, links, and
- Empty state: 'No lesson content was retrieved'
- Error state: '[WHAT USER SEES]'
- 401 state: redirect to `/login.html`

### Implementation Requirements
- Include scripts in this order:
  1. `frontend/js/api.js`
  2. page script
- Page script responsibilities:
  1. Cache DOM refs
  2. Attach event listeners
  3. Call AppApi methods
  4. Render UI from response data
  5. Handle errors cleanly
- Keep functions small and readable
- Avoid inline script blocks in HTML when possible

### Deliverables
1. Updated HTML with any required data hooks and script include(s)
2. New/updated page script file
3. Short testing notes:
- what was manually tested
- one success case
- one error case

### Acceptance Checklist
- Uses `AppApi` helper (no direct fetch in page script)
- Handles loading/success/empty/error/401
- Works on hard refresh and direct URL visit
- No hardcoded placeholder data where backend data is required

## Example Filled Prompt (Login Page)
- Page owner: Member A
- Page HTML: `frontend/login.html`
- Page script target: `frontend/js/pages/auth/login.js`
- Endpoints:
  - POST `/auth/login` for login submit
- Required behavior:
  - On submit, send credentials
  - Show inline error on invalid credentials
  - Redirect on success