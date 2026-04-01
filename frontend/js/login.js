// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (form) form.addEventListener('submit', handleLogin);
});

// USER ACTIONS
async function handleLogin(e) {
  e.preventDefault();
  clearMessage('login-error');

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const { ok, data } = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!ok) {
      showError('login-error', data.error || 'Login failed. Please try again.');
      return;
    }

    window.location.href = '/account/dashboard.html';
  } catch (err) {
    showError('login-error', 'Something went wrong. Please try again.');
  }
}

// EXPOSE GLOBALLY
window.handleLogin = handleLogin;
