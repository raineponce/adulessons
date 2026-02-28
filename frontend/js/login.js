// login.js — Login Form Handler
// Handles form submission for the login page, sending credentials to the backend.

// Display an error message in the login-error element.
function showLoginError(message) {
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
        errorEl.textContent = message;
    }
}

// Clear the login error message.
function clearLoginError() {
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
        errorEl.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    const emailField = form.querySelector('[name="email"], [type="email"]');
    const passwordField = form.querySelector('[name="password"], [type="password"]');

    // Clear error when user starts typing
    if (emailField) emailField.addEventListener('input', clearLoginError);
    if (passwordField) passwordField.addEventListener('input', clearLoginError);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailField ? emailField.value : '';
        const password = passwordField ? passwordField.value : '';

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                window.location.href = '/dashboard.html';
            } else {
                const data = await response.json();
                showLoginError(data.message || data.error || 'Login failed. Please try again.');
            }
        } catch (err) {
            showLoginError('Network error. Please check your connection and try again.');
        }
    });
});
