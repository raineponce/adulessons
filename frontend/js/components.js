function isPreLoginPage() {
    const path = window.location.pathname;
    return path.endsWith('/login.html') || path.endsWith('/signup.html') || path.endsWith('/welcome.html');
}

// Apply theme and font size immediately — before DOM renders — to avoid flash
(function () {
    if (isPreLoginPage()) return;

    // Block transitions during initial theme application to prevent white flash
    var noTransition = document.createElement('style');
    noTransition.id = 'no-transition-init';
    noTransition.textContent = '* { transition: none !important; }';
    document.head.appendChild(noTransition);

    // Dark mode
    if (localStorage.getItem('aduLessonsTheme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Re-enable transitions after first paint
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            var el = document.getElementById('no-transition-init');
            if (el) el.remove();
        });
    });

    // Inject dark mode CSS into every page that loads this script
    var style = document.createElement('style');
    style.textContent = `
        /* === NAV PLACEHOLDER — reserve height before component loads === */
        #navbar { min-height: 92px; }

        /* === BASE === */
        [data-theme="dark"] body {
            background-color: #1a1a2e !important;
            color: #e8e8f0 !important;
        }

        /* === PAGE STRUCTURE === */
        [data-theme="dark"] header,
        [data-theme="dark"] footer,
        [data-theme="dark"] nav,
        [data-theme="dark"] .site-header,
        [data-theme="dark"] .nav-container,
        [data-theme="dark"] .navbar,
        [data-theme="dark"] .sidebar {
            background-color: #2d2d44 !important;
            border-color: #4a4a6a !important;
        }

        /* === CARDS & CONTAINERS === */
        [data-theme="dark"] .card,
        [data-theme="dark"] .module-card,
        [data-theme="dark"] .lesson-card,
        [data-theme="dark"] .reward-card,
        [data-theme="dark"] .activity-item,
        [data-theme="dark"] .intro-block,
        [data-theme="dark"] .settings-card,
        [data-theme="dark"] .panel,
        [data-theme="dark"] .modal,
        [data-theme="dark"] .coupon-modal,
        [data-theme="dark"] .modal-overlay .modal {
            background-color: #2d2d44 !important;
            border-color: #4a4a6a !important;
        }

        /* === TEXT — inherit from body, only override problem cases === */
        [data-theme="dark"] h1,
        [data-theme="dark"] h2,
        [data-theme="dark"] h3,
        [data-theme="dark"] h4,
        [data-theme="dark"] h5,
        [data-theme="dark"] h6 {
            color: #e8e8f0 !important;
        }

        [data-theme="dark"] p,
        [data-theme="dark"] span,
        [data-theme="dark"] label,
        [data-theme="dark"] li,
        [data-theme="dark"] td,
        [data-theme="dark"] th,
        [data-theme="dark"] .setting-label,
        [data-theme="dark"] .section-label,
        [data-theme="dark"] .page-title,
        [data-theme="dark"] .module-title,
        [data-theme="dark"] .lesson-title,
        [data-theme="dark"] .lesson-number,
        [data-theme="dark"] .modal-title,
        [data-theme="dark"] .modal-message,
        [data-theme="dark"] .modal-text,
        [data-theme="dark"] .user-name,
        [data-theme="dark"] .points-text,
        [data-theme="dark"] .points-total,
        [data-theme="dark"] .streak-points,
        [data-theme="dark"] .day-label,
        [data-theme="dark"] .collectable-title,
        [data-theme="dark"] .collectable-description,
        [data-theme="dark"] .reward-details,
        [data-theme="dark"] .welcome-header,
        [data-theme="dark"] .profile-name,
        [data-theme="dark"] .note,
        [data-theme="dark"] .back-button {
            color: #e8e8f0 !important;
        }

        /* === SECONDARY / MUTED TEXT === */
        [data-theme="dark"] .text-muted,
        [data-theme="dark"] .subtitle,
        [data-theme="dark"] .activity-points,
        [data-theme="dark"] .section-label,
        [data-theme="dark"] .modal-note {
            color: #b0b0c0 !important;
        }

        /* === LINKS === */
        [data-theme="dark"] a {
            color: #7eaadb !important;
        }

        /* === NAV LOGO TEXT === */
        [data-theme="dark"] .logo {
            color: #ffffff !important;
        }

        /* === NAV LOGO IMAGE — swap to dark mode version === */
        [data-theme="dark"] .nav-logo-image {
            content: url('../assets/images/darkmode-logo (updated).png');
        }

        /* === NAV LINKS === */
        [data-theme="dark"] .nav-link,
        [data-theme="dark"] .nav-item,
        [data-theme="dark"] .nav-links a {
            color: #ffffff !important;
        }

        [data-theme="dark"] .nav-item:hover,
        [data-theme="dark"] .nav-link:hover,
        [data-theme="dark"] .nav-links a:hover {
            background-color: #3d3d5c !important;
            color: #ffffff !important;
        }

        /* === SEARCH BUTTON — dark text for readability === */
        [data-theme="dark"] .search-button,
        [data-theme="dark"] .search-button span {
            color: #2c3e50 !important;
        }

        /* === SEARCH DROPDOWN & MOBILE MENU — darker blue text === */
        [data-theme="dark"] .dropdown-content a,
        [data-theme="dark"] .mobile-menu a {
            color: #2a4f7a !important;
        }

        [data-theme="dark"] .dropdown-content a:hover,
        [data-theme="dark"] .mobile-menu a:hover {
            color: #1a3a5c !important;
        }

        /* === KEEP DANGER / SIGN-OUT RED READABLE === */
        [data-theme="dark"] .sign-out,
        [data-theme="dark"] .danger,
        [data-theme="dark"] .nav-item.sign-out {
            color: #ff8080 !important;
        }

        /* === BUTTONS — keep colored buttons, fix grey ones === */
        [data-theme="dark"] .modal-button.cancel,
        [data-theme="dark"] .details-button {
            background-color: #3d3d5c !important;
            color: #e8e8f0 !important;
            border-color: #4a4a6a !important;
        }

        /* === BACK BUTTON — transparent bg, just change icon/text color === */
        [data-theme="dark"] .back-button {
            background-color: transparent !important;
            border: none !important;
            color: #e8e8f0 !important;
        }

        /* === LOCKED LESSON CARDS === */
        [data-theme="dark"] .lesson-card.locked {
            background-color: #252540 !important;
            opacity: 0.7;
        }

        /* === DIVIDERS & BORDERS === */
        [data-theme="dark"] .divider-line,
        [data-theme="dark"] .setting-item,
        [data-theme="dark"] .profile-section,
        [data-theme="dark"] hr {
            border-color: #4a4a6a !important;
        }

        /* === INPUTS === */
        [data-theme="dark"] input,
        [data-theme="dark"] textarea,
        [data-theme="dark"] select,
        [data-theme="dark"] .search-box {
            background-color: #2d2d44 !important;
            color: #e8e8f0 !important;
            border-color: #4a4a6a !important;
        }

        [data-theme="dark"] input::placeholder,
        [data-theme="dark"] textarea::placeholder {
            color: #8080a0 !important;
        }

        /* === PROGRESS BARS === */
        [data-theme="dark"] .progress-bar-container,
        [data-theme="dark"] .module-progress {
            background-color: #3d3d5c !important;
        }

        /* === MODULE LIST — remove dark bg from intro block === */
        [data-theme="dark"] .intro-block,
        [data-theme="dark"] .intro-row {
            background-color: transparent !important;
        }

        /* === HAMBURGER MENU ICON — white lines on dark bg === */
        [data-theme="dark"] .hamburger span {
            background-color: #ffffff !important;
        }

        /* === STREAK SECTION — keep white bg, black text === */
        [data-theme="dark"] .streak-section {
            background: white !important;
        }
        [data-theme="dark"] .streak-section h2,
        [data-theme="dark"] .streak-section span,
        [data-theme="dark"] .streak-section p,
        [data-theme="dark"] .streak-section .day-label,
        [data-theme="dark"] .streak-section .streak-points {
            color: #2c3e50 !important;
        }

        /* === EARNED POINTS SECTION — keep white bg, black text, leave activity-tab blue === */
        [data-theme="dark"] .points-section {
            background: white !important;
        }
        [data-theme="dark"] .points-section .activity-item {
            background-color: transparent !important;
        }
        [data-theme="dark"] .points-section h2,
        [data-theme="dark"] .points-section span,
        [data-theme="dark"] .points-section p,
        [data-theme="dark"] .points-section .points-total,
        [data-theme="dark"] .points-section .activity-points {
            color: #2c3e50 !important;
        }

        /* === REWARDS & COLLECTABLE TITLES — black text === */
        [data-theme="dark"] .rewards-title,
        [data-theme="dark"] .collectable-title {
            color: #2c3e50 !important;
        }

        /* === REWARDS PAGE — earned points card: white bg, black text, no dark activity rows === */
        [data-theme="dark"] .earned-points-card {
            background: white !important;
        }
        [data-theme="dark"] .earned-points-card .activity-item {
            background-color: transparent !important;
        }
        [data-theme="dark"] .earned-points-card h2,
        [data-theme="dark"] .earned-points-card .points-value,
        [data-theme="dark"] .earned-points-card .activity-text,
        [data-theme="dark"] .earned-points-card .activity-points span {
            color: #2c3e50 !important;
        }

        /* === REWARDS PAGE — coupon items: white bg, black text === */
        [data-theme="dark"] .coupon-item {
            background: white !important;
        }
        [data-theme="dark"] .coupon-text {
            color: #2c3e50 !important;
        }

        /* === REWARDS PAGE — section titles (Rewards, Collectable) black === */
        [data-theme="dark"] .rewards-section .section-title {
            color: #2c3e50 !important;
        }

        /* === REWARDS PAGE — printables section: black text === */
        [data-theme="dark"] .printables-section {
            background: white !important;
        }
        [data-theme="dark"] .printables-section h2,
        [data-theme="dark"] .printables-subtitle,
        [data-theme="dark"] .printable-name,
        [data-theme="dark"] .printable-lock,
        [data-theme="dark"] .unlock-message {
            color: #2c3e50 !important;
        }

        /* === REWARDS PAGE — secret code section: black title text === */
        [data-theme="dark"] .secret-code-section {
            background: #FFF4CC !important;
        }
        [data-theme="dark"] .secret-code-title {
            color: #2c3e50 !important;
        }

        /* === LESSON LIST — lock icon in locked popup modal white === */
        [data-theme="dark"] .modal .modal-icon {
            color: #ffffff !important;
        }

        /* === MODULE LIST — locked popup text and close button black === */
        [data-theme="dark"] .modal-note,
        [data-theme="dark"] .note {
            color: #2c3e50 !important;
        }
        [data-theme="dark"] .modal-close {
            color: #2c3e50 !important;
        }

        /* === LESSON QUIZ — modal popups white bg, black text === */
        [data-theme="dark"] .modal-box {
            background: white !important;
        }
        [data-theme="dark"] .modal-box .modal-text,
        [data-theme="dark"] .modal-box .modal-title,
        [data-theme="dark"] .modal-box p,
        [data-theme="dark"] .modal-box span,
        [data-theme="dark"] .modal-box h2,
        [data-theme="dark"] .modal-box h3 {
            color: #2c3e50 !important;
        }

        /* === KEY TAKEAWAYS — back to module button white === */
        [data-theme="dark"] .module-button {
            color: #ffffff !important;
        }

        /* === LESSON LIST — play and lock icons white === */
        [data-theme="dark"] .play-icon,
        [data-theme="dark"] .lock-icon {
            color: #ffffff !important;
        }

        /* === TAXES LESSON — conclusion black, quiz button white === */
        [data-theme="dark"] .conclusion-box,
        [data-theme="dark"] .conclusion-box .section-heading,
        [data-theme="dark"] .conclusion-box .lesson-text {
            color: #2c3e50 !important;
        }
        [data-theme="dark"] .quiz-button {
            color: #ffffff !important;
        }

        /* === SMOOTH TRANSITION === */
        body { transition: background-color 0.3s ease, color 0.3s ease; }
    `;
    document.head.appendChild(style);
})();

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
    // Apply font size (only for logged-in pages)
    if (!isPreLoginPage()) {
        const savedFontSize = localStorage.getItem('aduLessonsFontSize');
        if (savedFontSize) {
            document.body.style.zoom = parseInt(savedFontSize) / 100;
        }
    }

    await loadNavbar();
    await loadComponent('/components/footer.html', 'footer');

    // Wire up search dropdown and mobile menu links with backend module data
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const mobileLinks = document.querySelectorAll('.mobile-menu a[style*="padding-left"]');

    const moduleLinks = [
        { index: 0, moduleId: 'mod1', fallbackHref: '/lesson-list.html' },
        { index: 1, moduleId: 'mod2', fallbackHref: '/modules/module-intro.html?moduleId=mod2' },
        { index: 2, moduleId: 'mod3', fallbackHref: '/modules/module-intro.html?moduleId=mod3' },
        { index: 3, moduleId: 'mod4', fallbackHref: '/modules/module-intro.html?moduleId=mod4' },
        { index: 4, moduleId: 'mod5', fallbackHref: '/modules/module-intro.html?moduleId=mod5' },
        { index: 5, moduleId: 'mod6', fallbackHref: '/modules/module-intro.html?moduleId=mod6' },
    ];

    for (const { index, moduleId, fallbackHref } of moduleLinks) {
        const link = dropdownLinks[index];
        const mobileLink = mobileLinks[index];
        if (link) link.href = fallbackHref;
        if (mobileLink) mobileLink.href = fallbackHref;
        try {
            const res = await fetch(`/lessons/modules/${moduleId}`, { credentials: 'include' });
            if (res.ok) {
                const mod = await res.json();
                if (link) link.textContent = mod.title;
                if (mobileLink) mobileLink.textContent = mod.title;
            }
        } catch (e) {
            // Backend unavailable — fallback href already set
        }
    }
});

// Re-apply preferences when page is restored from bfcache (back/forward navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted && !isPreLoginPage()) {
        const theme = localStorage.getItem('aduLessonsTheme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        const fontSize = localStorage.getItem('aduLessonsFontSize');
        if (fontSize) {
            document.body.style.zoom = parseInt(fontSize) / 100;
        }
    }
});

window.AppComponents = {
    loadComponent: loadComponent,
    getAuthState: getAuthState,
    loadNavbar: loadNavbar
};
