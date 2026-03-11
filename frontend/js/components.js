// Load HTML components
async function loadComponent(componentPath, elementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(elementId);
        container.innerHTML = html;

        // Re-execute any <script> tags — innerHTML does not run them
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
            newScript.remove();
        });
    } catch (error) {
        console.error(`Error loading component (${elementId}):`, error);
    }
}

// Check if user is logged in
function isUserLoggedIn() {
    // Option A: Check localStorage
    return localStorage.getItem('authToken') !== null;

    // Option B: Check sessionStorage
    // return sessionStorage.getItem('user') !== null;

    // Option C: Check a global variable set by your backend
    // return window.user !== null;

    // Option D: Check a cookie
    // return document.cookie.includes('authToken=');
}

document.addEventListener('DOMContentLoaded', () => {
    // Load appropriate nav based on login state
    const navPath = isUserLoggedIn()
      // will change link after ':' to nav-loggedin.html later
      ? '/components/nav-loggedin.html'
        : '/components/nav-loggedin.html';

    loadComponent(navPath, 'navbar');
    loadComponent('/components/footer.html', 'footer');
});