// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initAuthState();
});

// DATA LOADING
async function initAuthState() {
  try {
    const { ok, data } = await apiFetch('/auth/me');
    if (ok && data.loggedIn) {
      updateAuthUI(data.user);
    } else {
      updateAuthUI(null);
    }
  } catch (err) {
    console.error('Auth check failed:', err);
    updateAuthUI(null);
  }
}

function updateAuthUI(user) {
  const loggedInEls = document.querySelectorAll('.logged-in-only');
  const loggedOutEls = document.querySelectorAll('.logged-out-only');

  if (user) {
    loggedInEls.forEach(el => el.style.display = '');
    loggedOutEls.forEach(el => el.style.display = 'none');
    document.querySelectorAll('.user-username').forEach(el => el.textContent = user.username);
    document.querySelectorAll('.user-points').forEach(el => el.textContent = user.points);
    document.querySelectorAll('.user-streak').forEach(el => el.textContent = user.streak?.current ?? 0);
    document.querySelectorAll('.user-avatar').forEach(el => {
      el.src = `/assets/images/avatars/${user.avatar}.png`;
      el.alt = user.avatar;
    });
  } else {
    loggedInEls.forEach(el => el.style.display = 'none');
    loggedOutEls.forEach(el => el.style.display = '');
  }
}

// EXPOSE GLOBALLY
window.initAuthState = initAuthState;
