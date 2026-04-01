# Frontend-Backend Integration Team Template

## Goal
Each page should:
1. Read user input and page state.
2. Call backend routes through one shared API helper.
3. Render backend data into the page.
4. Handle loading, errors, and auth failures consistently.

## Backend Endpoints Already Available
- Auth routes:
  - POST /auth/register
  - POST /auth/login
  - POST /auth/logout
- Profile routes:
  - GET /profile
  - GET /profile/progress
  - PUT /profile/avatar
  - PUT /profile/address
- Lesson routes:
  - GET /lessons
  - GET /lessons/:lessonId
  - POST /lessons/:lessonId/complete
- Prize routes:
  - GET /prizes
  - POST /prizes/:prizeId/redeem
  - GET /prizes/redeemed

## Shared Standards
1. All backend calls go through one shared API helper.
2. Each HTML page has one page-specific script.
3. Do not duplicate fetch boilerplate in each page script.
4. Every page script handles:
- DOMContentLoaded init
- loading state
- success render
- empty state
- error state
- 401 redirect to login

## Team Roles
1. API Helper Owner
- Maintains the shared helper API.
- Ensures consistent request options, JSON parsing, and error objects.
- Exposes stable methods for the rest of the team.

2. Page Owner (one per page)
- Owns one page script and related HTML data hooks.
- Uses helper functions only for network requests.
- Implements render and interaction logic for that page.

3. QA/Integration Owner
- Verifies each page follows standards.
- Verifies 401 handling and session behavior across pages.
- Verifies no hardcoded user data remains where backend data should be used.

## What Every Page Script Should Do
1. Cache DOM refs.
2. Attach event listeners.
3. Load initial data if needed.
4. Render success and empty states.
5. Show loading and error states.
6. Handle auth failures (401 redirect).

## Suggested Script Structure
1. setup
- Cache element references.
- Create local utility functions.

2. init
- Bind events.
- Load initial data.

3. handlers
- Form submits and button clicks.
- Call helper methods.
- Trigger rerender.

4. render methods
- renderLoading
- renderData
- renderEmpty
- renderError

## Example Assignment Split
1. Member A: Login + Signup
- Handles auth forms.
- Submits credentials/registration.
- Shows inline auth errors.
- Redirects on success.

2. Member B: Dashboard
- Loads profile, progress, modules.
- Renders welcome name, streak, points, module progress.

3. Member C: Lessons
- Renders lesson/module lists from backend.
- Renders lesson content pages from backend blocks.
- Handles lesson completion calls and UI updates.

4. Member D: Account + Rewards
- Renders profile data.
- Updates avatar/address.
- Loads and redeems prizes.

## Definition of Done (Per Page)
1. Uses shared helper for all backend requests.
2. Handles loading/success/empty/error/401 states.
3. Works on hard refresh and direct URL load.
4. Removes hardcoded placeholder user data.

## Pull Request Checklist
1. Which backend endpoints are used?
2. Which DOM nodes are backend-driven?
3. What does user see on API error?
4. What happens on 401?
5. Was loading state tested?
