// ============================================================
// auth.js — Authentication state management for AduLessons
// ============================================================

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initAuthState();
});

// --- DATA LOADING ---

/**
 * Check if the user is logged in by fetching their profile.
 * Updates the nav and global auth state accordingly.
 * Called on page load and after any action that changes user data.
 */
async function initAuthState() {
  try {
    const data = await apiFetch("/profile");

    if (!data) {
      // 401 — apiFetch handles redirect to login
      return;
    }

    if (data.error) {
      window.isLoggedIn = false;
      return;
    }

    // Store auth state globally
    window.isLoggedIn = true;
    window.currentUser = {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      points: data.points,
      streak: data.streak,
    };

    // Update any nav or header elements that show user info
    const usernameEls = document.querySelectorAll("[data-auth-username]");
    usernameEls.forEach((el) => {
      el.textContent = data.username;
    });

    const avatarEls = document.querySelectorAll("[data-auth-avatar]");
    avatarEls.forEach((el) => {
      el.src = "/assets/images/" + data.avatar + ".png";
    });

    const pointsEls = document.querySelectorAll("[data-auth-points]");
    pointsEls.forEach((el) => {
      el.textContent = formatPoints(data.points);
    });
  } catch (err) {
    console.error("Auth state check failed:", err);
    window.isLoggedIn = false;
  }
}

// --- USER ACTIONS ---

/**
 * Log the user out by posting to the logout endpoint.
 */
async function logout() {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed:", err);
    window.location.href = "/";
  }
}

// --- EXPOSE GLOBALLY ---
window.initAuthState = initAuthState;
window.logout = logout;
