// INITIALIZATION — no DOM needed, utilities only

async function apiFetch(url, options = {}) {
  const defaults = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  const mergedOptions = {
    ...defaults,
    ...options,
    headers: { ...defaults.headers, ...(options.headers || {}) }
  };
  const res = await fetch(url, mergedOptions);
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function clearMessage(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
}

function updateProgressBar(barId, percent) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.style.width = `${percent}%`;
  bar.setAttribute('aria-valuenow', percent);
}

// EXPOSE GLOBALLY
window.apiFetch = apiFetch;
window.showError = showError;
window.showSuccess = showSuccess;
window.clearMessage = clearMessage;
window.updateProgressBar = updateProgressBar;
