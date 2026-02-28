// profile.js — User Profile & Avatar Selection
// Loads user profile data, renders avatar selection, and handles address form submission.

// Predefined list of available avatar IDs.
const AVATAR_IDS = ['default', 'cat', 'dog', 'robot', 'star', 'rocket', 'book', 'globe'];

let selectedAvatar = 'default';

// Update the visual selection state of avatar options in the grid.
function highlightSelectedAvatar(avatarId) {
    document.querySelectorAll('.avatar-option').forEach(img => {
        img.classList.toggle('selected', img.getAttribute('data-avatar') === avatarId);
    });
}

// Select a new avatar and save it on the backend.
async function selectAvatar(avatarId) {
    try {
        const response = await fetch('/profile/avatar', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: avatarId })
        });

        if (response.ok) {
            selectedAvatar = avatarId;
            highlightSelectedAvatar(avatarId);

            // Update the current avatar preview
            const currentAvatarEl = document.getElementById('current-avatar');
            if (currentAvatarEl) {
                currentAvatarEl.src = `/img/avatars/${avatarId}.png`;
            }

            // Refresh auth state to update avatar in nav/header
            if (typeof window.initAuthState === 'function') {
                window.initAuthState();
            }
        }
    } catch (err) {
        console.error('Error saving avatar:', err);
    }
}

// Render the avatar selection grid.
function renderAvatarGrid(currentAvatarId) {
    const grid = document.getElementById('avatar-grid');
    if (!grid) return;

    grid.innerHTML = '';
    AVATAR_IDS.forEach(id => {
        const img = document.createElement('img');
        img.src = `/img/avatars/${id}.png`;
        img.alt = id;
        img.className = 'avatar-option';
        img.setAttribute('data-avatar', id);
        if (id === currentAvatarId) img.classList.add('selected');
        img.addEventListener('click', () => selectAvatar(id));
        grid.appendChild(img);
    });
}

// Populate profile UI fields with user data.
function populateProfileFields(data) {
    const usernameEl = document.querySelector('.profile-username');
    if (usernameEl) usernameEl.textContent = data.username;

    const emailEl = document.querySelector('.profile-email');
    if (emailEl) emailEl.textContent = data.email;

    const pointsEl = document.querySelector('.profile-points');
    if (pointsEl) pointsEl.textContent = data.points;

    const streakEl = document.querySelector('.profile-streak');
    if (streakEl) streakEl.textContent = data.streak && data.streak.current;

    const lessonsEl = document.querySelector('.profile-lessons-completed');
    if (lessonsEl) lessonsEl.textContent = (data.completedLessons && data.completedLessons.length) || 0;

    const currentAvatarEl = document.getElementById('current-avatar');
    if (currentAvatarEl) currentAvatarEl.src = `/img/avatars/${data.avatar}.png`;
}

// Load the user's profile from the backend and initialise the page.
async function loadProfile() {
    try {
        const response = await fetch('/profile');

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }
        if (!response.ok) throw new Error('Failed to load profile');

        const data = await response.json();
        selectedAvatar = data.avatar || 'default';

        populateProfileFields(data);
        renderAvatarGrid(selectedAvatar);

        // Show address section only when all lessons are complete
        const addressSection = document.getElementById('address-section');
        if (addressSection) {
            addressSection.style.display = data.allLessonsComplete ? 'block' : 'none';
        }

        // Pre-fill address form if data exists
        if (data.allLessonsComplete && data.shippingAddress) {
            const addr = data.shippingAddress;
            const fields = { name: addr.name, street: addr.street, city: addr.city, state: addr.state, zip: addr.zip };
            Object.entries(fields).forEach(([key, value]) => {
                const el = document.querySelector(`[name="${key}"]`);
                if (el && value) el.value = value;
            });
        }

        // Attach address form listener
        const addressForm = document.getElementById('address-form');
        if (addressForm) {
            addressForm.addEventListener('submit', handleAddressSubmit);
        }
    } catch (err) {
        console.error('Error loading profile:', err);
    }
}

// Handle submission of the shipping address form.
async function handleAddressSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = (form.querySelector('[name="name"]') || {}).value || '';
    const street = (form.querySelector('[name="street"]') || {}).value || '';
    const city = (form.querySelector('[name="city"]') || {}).value || '';
    const state = (form.querySelector('[name="state"]') || {}).value || '';
    const zip = (form.querySelector('[name="zip"]') || {}).value || '';

    // Basic validation: all fields must be non-empty
    if (!name || !street || !city || !state || !zip) {
        showAddressMessage('Please fill in all address fields.', true);
        return;
    }

    try {
        const response = await fetch('/profile/address', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, street, city, state, zip })
        });

        if (response.ok) {
            showAddressMessage("Address saved! Your 3D printed mascot is on the way! 🎉", false);
        } else {
            const data = await response.json();
            showAddressMessage(data.message || data.error || 'Could not save address.', true);
        }
    } catch (err) {
        showAddressMessage('Network error. Please try again.', true);
    }
}

// Display a message below the address form.
function showAddressMessage(message, isError) {
    const msgEl = document.getElementById('address-message');
    if (msgEl) {
        msgEl.textContent = message;
        msgEl.style.color = isError ? '#c0392b' : '#27ae60';
    }
}

// Expose selectAvatar globally so avatar grid click handlers work.
window.selectAvatar = selectAvatar;

document.addEventListener('DOMContentLoaded', loadProfile);
