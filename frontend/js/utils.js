/**
 * utils.js — Shared Utility Functions
 *
 * This file MUST be loaded FIRST on every HTML page, before auth.js and any
 * page-specific scripts. It provides a consistent set of helpers that every
 * feature script should use so that error handling, API calls, and UI updates
 * always behave the same way across the entire application.
 *
 * Usage (in every HTML page):
 *   <script src="/js/utils.js"></script>
 *   <script src="/js/auth.js"></script>
 *   <script src="/js/page-specific.js"></script>
 */

// ============================================================
// API FETCH WRAPPER
// ============================================================

/**
 * Wraps the native `fetch()` with consistent defaults for the AduLessons API.
 *
 * Behaviour:
 * - Always sends `Accept: application/json`.
 * - Automatically adds `Content-Type: application/json` when `options.body`
 *   is a JSON string (i.e. already serialised with JSON.stringify).
 * - Caller-supplied headers take priority over the defaults above.
 * - On HTTP 401 the user is redirected to `/login.html` and `null` is returned
 *   so callers can do `if (!data) return;` without extra auth checks.
 * - On any other non-ok response an `Error` is thrown whose `message` is either
 *   `data.error` (from the JSON body) or the fallback `Request failed (NNN)`.
 * - Network / parse errors are logged to the console then re-thrown so the
 *   calling `catch` block can surface them to the user via `showError()`.
 *
 * @async
 * @param {string} url - The API endpoint path, e.g. `'/auth/me'`.
 * @param {RequestInit} [options={}] - Optional fetch options (method, body, headers, …).
 * @returns {Promise<any|null>} Parsed JSON response body, or `null` after a 401
 *   redirect.
 * @throws {Error} When the response is not ok (non-2xx, non-401) or when the
 *   network request itself fails.
 *
 * @example
 * // GET request
 * const profile = await apiFetch('/profile');
 * if (!profile) return; // 401 already redirected
 *
 * @example
 * // POST with a JSON body
 * const result = await apiFetch('/auth/login', {
 *   method: 'POST',
 *   body: JSON.stringify({ email, password })
 * });
 */
async function apiFetch(url, options = {}) {
  try {
    const defaultHeaders = {
      'Accept': 'application/json',
    };

    // Set Content-Type when the body is a string — callers are expected to
    // pass JSON.stringify(…) output here (as documented in the JSDoc above).
    // If you need to send a different content type, pass it explicitly via
    // options.headers and it will override this default.
    if (typeof options.body === 'string') {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    });

    // 401 → redirect to login; caller checks for null
    if (res.status === 401) {
      window.location.href = '/login.html';
      return null;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }

    return data;
  } catch (err) {
    console.error(`apiFetch error [${url}]:`, err);
    throw err;
  }
}

// ============================================================
// MESSAGE HELPERS
// ============================================================

/**
 * Display an error message inside a named element.
 *
 * The element's `textContent` is set (not innerHTML) to prevent XSS.
 * The element is made visible and given the `.error-message` CSS class so
 * that the stylesheet can style it uniformly.
 *
 * @param {string} elementId - The `id` of the DOM element to populate.
 * @param {string} message   - The error text to display.
 *
 * @example
 * showError('login-error', 'Invalid email or password.');
 */
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
  el.classList.add('error-message');
}

/**
 * Display a success message inside a named element.
 *
 * Unlike `showError`, this uses `innerHTML` so that callers can include
 * simple HTML markup (e.g. bold text, links) in the success message.
 * **Security notice:** Only pass static, developer-controlled strings here.
 * Never interpolate raw user input into the message; doing so would create
 * a Cross-Site Scripting (XSS) vulnerability.
 *
 * @param {string} elementId - The `id` of the DOM element to populate.
 * @param {string} message   - The success HTML/text to display.
 *
 * @example
 * showSuccess('code-result', 'Code redeemed! You earned <strong>50 points</strong>.');
 */
function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = message;
  el.style.display = 'block';
  el.classList.add('success-message');
}

/**
 * Clear (hide) a message element, regardless of whether it was showing an
 * error or a success message.
 *
 * Typically called at the start of a user action so that stale messages from
 * a previous attempt are removed before the new request is sent.
 *
 * @param {string} elementId - The `id` of the DOM element to clear.
 *
 * @example
 * clearMessage('login-error');
 */
function clearMessage(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
}

// ============================================================
// PROGRESS BAR
// ============================================================

/**
 * Update a Bootstrap-style progress bar to reflect a new percentage value.
 *
 * The inner bar element (identified by `barId`) must have the attributes
 * `role="progressbar"`, `aria-valuemin="0"`, and `aria-valuemax="100"` set
 * in the HTML. This function updates `aria-valuenow`, `style.width`, and the
 * visible text label.
 *
 * @param {string} barId   - The `id` of the inner progress-bar element.
 * @param {number} percent - A value between 0 and 100 (inclusive).
 *
 * @example
 * updateProgressBar('overall-progress-bar', 42);
 * // Sets width to '42%', aria-valuenow to '42', textContent to '42%'
 */
function updateProgressBar(barId, percent) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  const pct = `${percent}%`;
  bar.style.width = pct;
  bar.textContent = pct;
  bar.setAttribute('aria-valuenow', String(percent));
}

// ============================================================
// FORMATTING HELPERS
// ============================================================

/**
 * Format an ISO 8601 date string into a short human-readable date.
 *
 * @param {string} dateString - An ISO date string, e.g. `'2026-01-15T00:00:00Z'`.
 * @returns {string} A formatted date string, e.g. `'Jan 15, 2026'`.
 *
 * @example
 * formatDate('2026-01-15T00:00:00Z'); // → 'Jan 15, 2026'
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a numeric points value with thousands separators for display.
 *
 * @param {number} points - The points value, e.g. `1250`.
 * @returns {string} A locale-formatted string, e.g. `'1,250'`.
 *
 * @example
 * formatPoints(1250);  // → '1,250'
 * formatPoints(500);   // → '500'
 */
function formatPoints(points) {
  return points.toLocaleString();
}

// ============================================================
// EXPOSE ON WINDOW (required for HTML onclick handlers and
// cross-script access — auth.js calls these too)
// ============================================================

window.apiFetch = apiFetch;
window.showError = showError;
window.showSuccess = showSuccess;
window.clearMessage = clearMessage;
window.updateProgressBar = updateProgressBar;
window.formatDate = formatDate;
window.formatPoints = formatPoints;
