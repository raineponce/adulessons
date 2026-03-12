// Validation rules per spec
const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.com$/i;
const PASSWORD_MIN_LENGTH = 8;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (form) form.addEventListener('submit', handleRegister);
});

// USER ACTIONS
async function handleRegister(e) {
  e.preventDefault();
  clearMessage('register-error');

  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  // Client-side validation
  if (!USERNAME_REGEX.test(username)) {
    const msg = 'Username must be 3–20 characters, letters and numbers only.';
    console.error('[Register] Validation error:', msg);
    showError('register-error', msg);
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    const msg = 'Please enter a valid email address ending in .com';
    console.error('[Register] Validation error:', msg);
    showError('register-error', msg);
    return;
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    const msg = 'Password must be at least 8 characters.';
    console.error('[Register] Validation error:', msg);
    showError('register-error', msg);
    return;
  }

  try {
    const { ok, data } = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });

    if (!ok) {
      const msg = data.error || 'Registration failed. Please try again.';
      console.error('[Register] Server error:', msg);
      showError('register-error', msg);
      return;
    }

    console.log('[Register] Success — user saved:', { username, email });
    window.location.href = '/account/dashboard.html';
  } catch (err) {
    console.error('[Register] Unexpected error:', err);
    showError('register-error', 'Something went wrong. Please try again.');
  }
}

// EXPOSE GLOBALLY
window.handleRegister = handleRegister;
