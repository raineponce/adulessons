// Load HTML components
async function loadComponent(componentPath, elementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);

        if (!element) {
            throw new Error(`Missing mount point: ${elementId}`);
        }

        element.innerHTML = html;
    } catch (error) {
        console.error(`Error loading component (${elementId}):`, error);
    }
}

async function getAuthState() {
    try {
        const response = await fetch('/auth/me', {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            return { loggedIn: false };
        }

        return await response.json();
    } catch (error) {
        console.error('Error checking auth state:', error);
        return { loggedIn: false };
    }
}

function getAvatarSrc(avatar) {
    const avatarMap = {
        default: '/assets/images/profile-pic.png',
        avatar1: '/assets/images/profile-pic2.png',
        avatar2: '/assets/images/profile-pic3.png',
        avatar3: '/assets/images/profile-pic.png',
        avatar4: '/assets/images/profile-pic.png',
        avatar5: '/assets/images/profile-pic.png'
    };

    return avatarMap[avatar] || avatarMap.default;
}

function populateLoggedInNavbar(user) {
    const navbar = document.getElementById('navbar');

    if (!navbar || !user) {
        return;
    }

    const username = user.username || 'User';
    const points = Number.isFinite(user.points) ? user.points : 0;
    const avatarSrc = getAvatarSrc(user.avatar);

    navbar.querySelectorAll('[data-nav-username]').forEach((element) => {
        element.textContent = username;
    });

    navbar.querySelectorAll('[data-nav-points]').forEach((element) => {
        element.textContent = `${points} pts`;
    });

    navbar.querySelectorAll('[data-nav-avatar]').forEach((element) => {
        element.src = avatarSrc;
        element.alt = `${username} avatar`;
    });
}

async function loadNavbar() {
    const authState = await getAuthState();
    const navPath = authState.loggedIn
        ? '/components/nav-loggedin.html'
        : '/components/nav-loggedout.html';

    await loadComponent(navPath, 'navbar');

    if (authState.loggedIn) {
        populateLoggedInNavbar(authState.user);
    }

    return authState;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadNavbar();
    await loadComponent('/components/footer.html', 'footer');
});

window.AppComponents = {
    loadComponent: loadComponent,
    getAuthState: getAuthState,
    loadNavbar: loadNavbar
};