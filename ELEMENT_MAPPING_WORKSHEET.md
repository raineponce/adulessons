# Element Mapping Worksheet

Use this worksheet before implementing page scripts so each teammate maps backend data to UI elements clearly.

## Quick Instructions
1. Duplicate the Page Worksheet section for each assigned page.
2. Fill one row per dynamic UI element.
3. Keep selectors stable by using ids or data attributes.
4. Confirm loading, empty, error, and 401 behavior before coding.

## Global Conventions
- Shared API helper: frontend/js/api.js
- One page script per page under frontend/js/pages/
- No direct fetch calls in page scripts
- 401 behavior: redirect to /login.html

## Page Worksheet

### Page Overview
- Page owner:
- HTML file path:
- Page script path:
- Related backend endpoints:
- Primary user goals on this page:

### Data To UI Mapping Table
| UI section | HTML selector | Endpoint | Response field(s) | Transform/format | Fallback if missing | Render function | Notes |
|---|---|---|---|---|---|---|---|
| Example: Welcome title | #welcomeTitle | GET /profile | username | "Welcome back, {username}!" | "Welcome back!" | renderHeader | |

### User Actions Mapping
| User action | Trigger selector | API call | Success UI update | Error UI update | 401 handling |
|---|---|---|---|---|---|
| Example: Save avatar | #saveAvatarBtn | PUT /profile/avatar | Update avatar image and toast | Show inline error text | Redirect to /login.html |

### States Checklist
- Loading state:
  - What appears while request is pending?
  - Which selectors are skeleton/disabled?
- Empty state:
  - What appears when data exists but array/list is empty?
- Error state:
  - Where is the error shown?
  - What retry option is offered?
- Unauthorized state:
  - Confirm redirect path is /login.html

### DOM Hook Plan
List any ids or data attributes that must be added to HTML for stable rendering.

- Hook name:
- File:
- Purpose:

- Hook name:
- File:
- Purpose:

### Rendering Plan
List planned page-script functions.

- initPage
- cacheElements
- bindEvents
- loadInitialData
- renderLoading
- renderData
- renderEmpty
- renderError

### Test Scenarios
- Success case:
  - Steps:
  - Expected:
- Empty case:
  - Steps:
  - Expected:
- Error case:
  - Steps:
  - Expected:
- 401 case:
  - Steps:
  - Expected:

### Done Criteria (Per Page)
- Uses AppApi helper only
- Dynamic values are not hardcoded
- Handles loading, empty, error, and 401 states
- Works on hard refresh and direct URL access
- Includes short PR notes for endpoints and UI selectors

## Optional Team Review Section
- Reviewer:
- Review date:
- Gaps found:
- Follow-up tasks:

## Example: Dashboard Page (Filled)

### Page Overview
- Page owner: Member B
- HTML file path: frontend/account/dashboard.html
- Page script path: frontend/js/pages/account/dashboard.js
- Related backend endpoints:
  - GET /profile
  - GET /profile/progress
  - GET /lessons
  - GET /prizes
- Primary user goals on this page:
  - See welcome info (name, points, streak)
  - See module progress and overall progress
  - See available rewards and collectible unlock progress

### Data To UI Mapping Table
| UI section | HTML selector | Endpoint | Response field(s) | Transform/format | Fallback if missing | Render function | Notes |
|---|---|---|---|---|---|---|---|
| Welcome title | #welcomeTitle | GET /profile | username | Welcome back, {username}! | Welcome back! | renderHeader | Add id if missing |
| Streak text | #streakText | GET /profile | streak.current | {n} day Streak! Keep the Wheel Spinning | Keep learning daily! | renderStreak | Clamp to 0+ |
| Points total | #pointsTotal | GET /profile | points | {points} pts | 0 pts | renderPoints | Number format |
| Module cards | #modulesContainer | GET /profile/progress + GET /lessons | moduleProgress + modules | Merge by moduleId and compute card status | Show no modules state | renderModules | Lock/continue logic |
| Overall collectible progress bar | #collectibleProgressBar | GET /profile/progress | overallPercent | style.width = {overallPercent}% | 0% | renderCollectible | Min/max 0-100 |
| Rewards list | #rewardsList | GET /prizes | [] prizes | Map items to reward cards | No rewards available message | renderRewards | Only show available |

### User Actions Mapping
| User action | Trigger selector | API call | Success UI update | Error UI update | 401 handling |
|---|---|---|---|---|---|
| Click Continue on module card | .continue-btn | Optional route to lesson list (or GET /lessons for latest lock state) | Navigate to next page | Show small inline banner | Redirect to /login.html |
| Open reward details | .see-details-btn | none (or GET /prizes if stale) | Show modal populated with reward text | Show fallback modal text | Redirect to /login.html |
| Collect final reward (if enabled later) | #collectNowBtn | POST /prizes/:prizeId/redeem | Update points and badge state | Show inline error text | Redirect to /login.html |

### States Checklist
- Loading state:
  - Show loading placeholders for welcome text, modules, points, and rewards
  - Disable continue and collect buttons while data is loading
- Empty state:
  - Show no modules available card when module list is empty
  - Show no rewards available card when rewards list is empty
- Error state:
  - Show top-of-page alert box with retry button
  - Keep static layout visible so page does not feel broken
- Unauthorized state:
  - Redirect to /login.html when any required call returns 401

### DOM Hook Plan
List any ids or data attributes that must be added to HTML for stable rendering.

- Hook name: #welcomeTitle
- File: frontend/account/dashboard.html
- Purpose: Set username text from GET /profile

- Hook name: #pointsTotal
- File: frontend/account/dashboard.html
- Purpose: Set points display from GET /profile

- Hook name: #modulesContainer
- File: frontend/account/dashboard.html
- Purpose: Render module cards from lessons/progress data

- Hook name: #collectibleProgressBar
- File: frontend/account/dashboard.html
- Purpose: Render overall completion percent

- Hook name: #rewardsList
- File: frontend/account/dashboard.html
- Purpose: Render available prize cards

### Rendering Plan
List planned page-script functions.

- initPage
- cacheElements
- bindEvents
- loadInitialData
- renderLoading
- renderHeader
- renderStreak
- renderPoints
- renderModules
- renderCollectible
- renderRewards
- renderEmpty
- renderError

### Test Scenarios
- Success case:
  - Steps: Log in, open dashboard, wait for requests to finish
  - Expected: Username, points, modules, and rewards all render from backend data
- Empty case:
  - Steps: Use test user with no completed lessons and no available rewards
  - Expected: Empty module/reward states render with friendly text
- Error case:
  - Steps: Simulate failing /profile/progress request
  - Expected: Error banner appears with retry option; page shell remains visible
- 401 case:
  - Steps: Expire session cookie and refresh dashboard
  - Expected: Redirect to /login.html

### Done Criteria (Per Page)
- Uses AppApi helper only
- Dynamic values are not hardcoded
- Handles loading, empty, error, and 401 states
- Works on hard refresh and direct URL access
- Includes short PR notes for endpoints and UI selectors
