// ============================================================
// dashboard.js — Dashboard page logic for AduLessons
// ============================================================

// Module card color classes based on order
const MODULE_COLORS = [
  "insurance",
  "taxes",
  "managing-money",
  "insurance",
  "taxes",
  "managing-money",
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  loadActivity();
  loadCollectable();
});

// --- DATA LOADING ---

/**
 * Fetch progress data and populate the dashboard:
 * - Overall progress bar
 * - Continue lesson link
 * - Per-module cards in #modules-list
 * - Streak count
 * - Points display
 */
async function loadDashboard() {
  try {
    const data = await apiFetch("/profile/progress");
    if (!data) return; // 401 handled by apiFetch

    if (data.error) {
      console.error("Dashboard load error:", data.error);
      return;
    }

    // --- Overall progress bar ---
    updateProgressBar("overall-progress-bar", data.progressPercent);

    // --- Continue lesson link ---
    const continueEl = document.getElementById("continue-lesson");
    if (continueEl && data.currentLesson) {
      continueEl.style.display = "block";
      const link = continueEl.querySelector("a");
      if (link) {
        link.href = "/modules/lesson.html?id=" + data.currentLesson;
      }
    }

    // --- Per-module cards ---
    const modulesList = document.getElementById("modules-list");
    if (modulesList && data.modules) {
      modulesList.innerHTML = "";

      data.modules.forEach((mod, index) => {
        const completedInModule = (data.completedLessons || []).filter((id) =>
          mod.lessonIds.includes(id),
        ).length;
        const totalInModule = mod.lessonIds.length;
        const modPercent =
          totalInModule > 0
            ? Math.round((completedInModule / totalInModule) * 100)
            : 0;

        const colorClass = MODULE_COLORS[index % MODULE_COLORS.length];

        const card = document.createElement("div");
        card.className = "module-card " + colorClass;
        card.innerHTML =
          '<span class="module-progress">' +
          completedInModule +
          "/" +
          totalInModule +
          "</span>" +
          '<div class="module-content">' +
          "<h3>" +
          '<img src="/assets/images/finance-icon.png" alt="' +
          mod.title +
          ' icon" class="module-icon"> ' +
          mod.title +
          "</h3>" +
          '<div class="progress-bar">' +
          '<div class="progress-fill" style="width: ' +
          modPercent +
          '%;"></div>' +
          "</div>" +
          '<a href="/modules/module-intro.html?id=' +
          mod.moduleId +
          '" class="continue-btn">Continue &rarr;</a>' +
          "</div>";

        modulesList.appendChild(card);
      });

      // Reinitialize carousel after rendering module cards
      initCarousel();
    }

    // --- Streak count ---
    const streakEl = document.getElementById("streak-count");
    if (streakEl) {
      streakEl.textContent = data.streak.current;
    }

    // Update the streak header text
    const streakHeader = document.querySelector(".streak-header h2");
    if (streakHeader) {
      streakHeader.textContent =
        data.streak.current + " day Streak! Keep the Wheel Spinning";
    }

    // Update streak day icons based on current streak
    updateStreakDays(data.streak.current);

    // --- Points display ---
    const pointsEl = document.getElementById("points-display");
    if (pointsEl) {
      pointsEl.textContent = formatPoints(data.points) + " pts";
    }

    // Update welcome message with username
    if (window.currentUser) {
      const welcomeH1 = document.querySelector(".welcome-header h1");
      if (welcomeH1) {
        welcomeH1.textContent =
          "Welcome back, " + window.currentUser.username + "!";
      }
    }
  } catch (err) {
    console.error("Failed to load dashboard:", err);
  }
}

/**
 * Fetch recent activity and render into the activity list.
 */
async function loadActivity() {
  try {
    const data = await apiFetch("/profile/activity");
    if (!data) return;

    if (data.error) {
      console.error("Activity load error:", data.error);
      return;
    }

    const activityList = document.getElementById("activity-list");
    if (!activityList || !data.activities) return;

    // Keep a fallback if there are no activities
    if (data.activities.length === 0) {
      activityList.innerHTML =
        '<div class="activity-item">' +
        "<span>No recent activity yet. Start a lesson!</span>" +
        "</div>";
      return;
    }

    activityList.innerHTML = "";
    const avatarSrc = data.avatar
      ? "/assets/images/" + data.avatar + ".png"
      : "/assets/images/default.png";

    data.activities.forEach((activity) => {
      const item = document.createElement("div");
      item.className = "activity-item";
      item.innerHTML =
        '<div class="activity-left">' +
        '<img src="' +
        avatarSrc +
        '" alt="' +
        (data.username || "User") +
        ' avatar" class="activity-avatar">' +
        "<span>" +
        activity.detail +
        "</span>" +
        "</div>" +
        '<div class="activity-points">' +
        '<img src="/assets/images/coin-icon.png" alt="Coin" class="coin-icon">' +
        "<span>+" +
        activity.pointsEarned +
        " pts</span>" +
        "</div>";

      activityList.appendChild(item);
    });
  } catch (err) {
    console.error("Failed to load activity:", err);
  }
}

/**
 * Fetch collectable progress and update the collectable section.
 */
async function loadCollectable() {
  try {
    const data = await apiFetch("/profile/collectable");
    if (!data) return;

    if (data.error) {
      console.error("Collectable load error:", data.error);
      return;
    }

    // Update collectable progress bar
    const collectableFill = document.getElementById(
      "collectable-progress-fill",
    );
    if (collectableFill) {
      collectableFill.style.width = data.collectablePercent + "%";
    }

    // Update collectable description
    const collectableDesc = document.querySelector(".collectable-description");
    if (collectableDesc && data.allLessonsComplete) {
      collectableDesc.textContent =
        "Congratulations! You've completed all modules. Claim your Mr. Wise figurine!";
    } else if (collectableDesc) {
      collectableDesc.textContent =
        "After you complete all of the modules, you'll earn your very own Mr. Wise figurine! " +
        "You have " +
        data.lessonsRemaining +
        " lessons remaining. Keep going!";
    }

    // Update collect button state
    const collectBtn = document.getElementById("collect-btn");
    if (collectBtn) {
      if (data.finalPrizeClaimed) {
        collectBtn.textContent = "Claimed!";
        collectBtn.disabled = true;
        collectBtn.classList.add("claimed");
      } else if (data.allLessonsComplete) {
        collectBtn.innerHTML = "Collect Now";
        collectBtn.disabled = false;
        collectBtn.onclick = claimCollectable;
      }
      // Default locked state is in the HTML
    }
  } catch (err) {
    console.error("Failed to load collectable:", err);
  }
}

// --- USER ACTIONS ---

/**
 * Claim the final collectable prize.
 */
async function claimCollectable() {
  try {
    const data = await apiFetch("/profile/collectable/claim", {
      method: "POST",
    });
    if (!data) return;

    if (data.error) {
      showError("collectable-message", data.error);
      return;
    }

    showSuccess(
      "collectable-message",
      "Mr. Wise figurine claimed! Check your shipping address.",
    );
    await window.initAuthState();
    loadCollectable();
  } catch (err) {
    console.error("Claim collectable failed:", err);
    showError("collectable-message", "Something went wrong. Please try again.");
  }
}

// --- HELPERS ---

/**
 * Update streak day icons to reflect the current streak within the week.
 * @param {number} streakCount — current streak number
 */
function updateStreakDays(streakCount) {
  const dayIcons = document.querySelectorAll(".day-item .day-icon");
  const today = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
  // Map to our display order: M T W Th F S Su → indices [1,2,3,4,5,6,0]
  const dayOrder = [1, 2, 3, 4, 5, 6, 0];
  const todayIndex = dayOrder.indexOf(today);

  dayIcons.forEach((icon, i) => {
    if (i <= todayIndex && streakCount > 0) {
      // Active day within streak window
      icon.classList.remove("inactive");
      icon.classList.add("active");
      if (icon.tagName !== "IMG") {
        icon.innerHTML =
          '<img src="/assets/images/streak-icon.png" alt="Active">';
      }
    } else {
      icon.classList.remove("active");
      icon.classList.add("inactive");
      if (icon.tagName !== "IMG") {
        icon.textContent = "\u26AA"; // ⚪
      }
    }
  });
}

/**
 * Initialize or reinitialize the module carousel after dynamic rendering.
 */
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!carousel || !prevBtn || !nextBtn) return;

  const cards = carousel.querySelectorAll(".module-card");
  if (cards.length === 0) return;

  let currentIndex = 0;
  const totalDots = Math.max(1, Math.ceil(cards.length / 2));

  // Rebuild dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    carousel.style.transform =
      "translateX(-" + currentIndex * (cardWidth + gap) + "px)";

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  };

  nextBtn.onclick = () => {
    const maxIndex = totalDots - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  };

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}

// --- EXPOSE GLOBALLY ---
window.loadDashboard = loadDashboard;
window.loadActivity = loadActivity;
window.loadCollectable = loadCollectable;
window.claimCollectable = claimCollectable;
