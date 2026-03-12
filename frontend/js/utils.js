// ============================================================
// utils.js — Shared utility functions for AduLessons frontend
// ============================================================

/**
 * Wrapper around fetch() for all backend API calls.
 * Automatically sets JSON headers, handles 401 redirects, and parses JSON.
 * @param {string} url — API endpoint (e.g. '/profile/progress')
 * @param {object} options — fetch options (method, body, etc.)
 * @returns {object|null} — parsed JSON response, or null on 401
 */
async function apiFetch(url, options = {}) {
  const defaults = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
  };

  const config = {
    ...defaults,
    ...options,
    headers: { ...defaults.headers, ...(options.headers || {}) },
  };

  // Stringify body if it's an object
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);

  // Redirect to login on 401
  if (res.status === 401) {
    window.location.href = "/login.html";
    return null;
  }

  return res.json();
}

/**
 * Display an error message in a target element.
 * @param {string} elementId — ID of the message container
 * @param {string} message — error text to display
 */
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = "message message-error";
  el.style.display = "block";
}

/**
 * Display a success message in a target element.
 * @param {string} elementId — ID of the message container
 * @param {string} message — success text to display
 */
function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = "message message-success";
  el.style.display = "block";
}

/**
 * Clear a message element.
 * @param {string} elementId — ID of the message container
 */
function clearMessage(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = "";
  el.style.display = "none";
}

/**
 * Update a progress bar element's width, ARIA values, and text.
 * @param {string} barId — ID of the inner progress bar element
 * @param {number} percent — percentage (0–100)
 */
function updateProgressBar(barId, percent) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  const clamped = Math.max(0, Math.min(100, percent));
  bar.style.width = clamped + "%";
  bar.setAttribute("aria-valuenow", clamped);
  bar.textContent = clamped + "%";
}

/**
 * Format a points number for display (e.g. 1500 → "1,500").
 * @param {number} points — raw point value
 * @returns {string} — formatted string
 */
function formatPoints(points) {
  if (typeof points !== "number" || isNaN(points)) return "0";
  return points.toLocaleString();
}

// Expose globally for use by other scripts
window.apiFetch = apiFetch;
window.showError = showError;
window.showSuccess = showSuccess;
window.clearMessage = clearMessage;
window.updateProgressBar = updateProgressBar;
window.formatPoints = formatPoints;
