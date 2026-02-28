// register.js — Registration Form Handler
// Handles form submission for the signup/register page with client-side validation.

// Display an error message in the register-error element.
function showRegisterError(message) {
    const errorEl = document.getElementById('register-error');
    if (errorEl) {
        errorEl.textContent = message;
    }
}

// Clear the registration error message.
function clearRegisterError() {
    const errorEl = document.getElementById('register-error');
    if (errorEl) {
        errorEl.textContent = '';
    }
}

// Validate registration fields before sending to the server.
// Returns an error string if invalid, or null if valid.
function validateRegisterForm(username, email, password) {
    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
        return 'Username must be 3-20 alphanumeric characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Please enter a valid email address';
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    const usernameField = form.querySelector('[name="username"]');
    const emailField = form.querySelector('[name="email"], [type="email"]');
    const passwordField = form.querySelector('[name="password"], [type="password"]');

    // Clear error when user starts typing
    if (usernameField) usernameField.addEventListener('input', clearRegisterError);
    if (emailField) emailField.addEventListener('input', clearRegisterError);
    if (passwordField) passwordField.addEventListener('input', clearRegisterError);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameField ? usernameField.value.trim() : '';
        const email = emailField ? emailField.value.trim() : '';
        const password = passwordField ? passwordField.value : '';

        // Client-side validation
        const validationError = validateRegisterForm(username, email, password);
        if (validationError) {
            showRegisterError(validationError);
            return;
        }

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                window.location.href = '/dashboard.html';
            } else {
                const data = await response.json();
                showRegisterError(data.message || data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            showRegisterError('Network error. Please check your connection and try again.');
        }
    });
});
