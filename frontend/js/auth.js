// auth.js — Auth State Manager (load on EVERY page as first script)
// Checks login state from the backend and updates the UI accordingly.

// Update the UI based on whether the user is logged in or out.
async function initAuthState() {
    try {
        const response = await fetch('/auth/me');
        const data = await response.json();

        if (data.loggedIn) {
            // Hide logged-out UI, show logged-in UI
            document.querySelectorAll('.logged-out-only').forEach(el => { el.style.display = 'none'; });
            document.querySelectorAll('.logged-in-only').forEach(el => { el.style.display = ''; });

            // Populate username elements
            document.querySelectorAll('.user-username').forEach(el => { el.textContent = data.user.username; });

            // Populate avatar elements
            document.querySelectorAll('.user-avatar').forEach(el => { el.src = `/img/avatars/${data.user.avatar}.png`; });

            // Populate points elements
            document.querySelectorAll('.user-points').forEach(el => { el.textContent = data.user.points; });

            // Populate streak elements
            document.querySelectorAll('.user-streak').forEach(el => { el.textContent = (data.user.streak && data.user.streak.current) || 0; });
        } else {
            // Hide logged-in UI, show logged-out UI
            document.querySelectorAll('.logged-in-only').forEach(el => { el.style.display = 'none'; });
            document.querySelectorAll('.logged-out-only').forEach(el => { el.style.display = ''; });
        }
    } catch (err) {
        // On any error, treat the user as logged out
        document.querySelectorAll('.logged-in-only').forEach(el => { el.style.display = 'none'; });
        document.querySelectorAll('.logged-out-only').forEach(el => { el.style.display = ''; });
    }
}

// Log the user out and redirect to home page.
async function logout() {
    try {
        await fetch('/auth/logout', { method: 'POST' });
    } catch (err) {
        // Ignore errors and redirect regardless
    }
    window.location.href = '/';
}

// Expose functions globally so other scripts and HTML onclick handlers can call them.
window.initAuthState = initAuthState;
window.logout = logout;

// Run auth state check when the DOM is ready.
document.addEventListener('DOMContentLoaded', initAuthState);
