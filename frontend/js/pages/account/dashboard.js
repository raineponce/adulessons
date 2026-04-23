(function () {
  var dom = {};
  var state = {
    isLoading: false,
    currentIndex: 0,
    carouselBound: false,
    allCards: []
  };

  var CARD_THEMES = ["insurance", "taxes", "managing-money"];

  function cacheDom() {
    dom.welcomeTitle = document.getElementById("welcomeTitle");
    dom.pointsTotal = document.getElementById("pointsTotal");
    dom.streakText = document.getElementById("streakText");
    dom.streakDays = document.querySelectorAll(".streak-days .day-item");
    dom.progressBar = document.getElementById("progressBar");
    dom.dashboardError = document.getElementById("dashboardError");
    dom.main = document.querySelector("main");
    dom.streakRewardText = document.getElementById("streakRewardText");

    dom.carousel = document.getElementById("modulesCarousel") || document.querySelector(".carousel");
    dom.prevBtn = document.querySelector(".carousel-btn.prev");
    dom.nextBtn = document.querySelector(".carousel-btn.next");
    dom.dotsContainer = document.getElementById("modulesDots") || document.querySelector(".carousel-dots");
    dom.prizeButtons = document.querySelectorAll(".see-details-btn[data-prize-key]");
  }

  function initPage() {
    bindCarouselEvents();
    loadData();
  }

  async function loadData() {
    renderLoading(true);
    clearError();

    try {
      var results = await Promise.all([
        window.AppApi.getProfile(),
        window.AppApi.getProgress()
      ]);

      var profile = results[0] || {};
      var progress = results[1] || {};

      renderProfile(profile);
      renderProgress(progress);
      renderModuleCards(profile, progress);
      await renderPrizeStore(profile);
    } catch (err) {
      if (window.AppApi.handleAuthError(err)) return;
      renderError(err && err.message ? err.message : "Failed to load dashboard.");
    } finally {
      renderLoading(false);
    }
  }

  function renderProfile(profile) {
    if (!profile) return;

    if (dom.welcomeTitle) {
      dom.welcomeTitle.textContent = "Welcome, " + (profile.username || "User") + "!";
    }

    if (dom.pointsTotal) {
      dom.pointsTotal.textContent = String(profile.points || 0) + " pts";
    }

    renderStreak(profile.streak);
  }

  function renderStreak(streak) {
    var streakCount = streak && typeof streak.current === "number"
      ? streak.current
      : 0;
    var lastActive = streak && streak.lastActive ? new Date(streak.lastActive) : null;

    if (dom.streakText) {
      dom.streakText.textContent = streakCount + " day Streak! Keep the Wheel Spinning.";
    }

    if (dom.streakRewardText) {
      dom.streakRewardText.textContent = streakCount > 0
        ? "+5 points"
        : "See you tomorrow for your reward.";
    }

    if (!dom.streakDays || !dom.streakDays.length) {
      return;
    }

    var activeDays = getActiveStreakDays(streakCount, lastActive);

    for (var i = 0; i < dom.streakDays.length; i++) {
      var dayItem = dom.streakDays[i];
      var icon = dayItem.querySelector(".day-icon");
      var isActive = activeDays.indexOf(i) !== -1;

      if (!icon) continue;

      icon.classList.toggle("active", isActive);
      icon.classList.toggle("inactive", !isActive);
      icon.alt = isActive ? "Active streak day" : "Inactive streak day";
    }
  }

  function getActiveStreakDays(streakCount, lastActive) {
    var activeDays = [];

    if (!streakCount || !lastActive || isNaN(lastActive.getTime())) {
      return activeDays;
    }

    var today = new Date();
    var dayOfWeek = today.getDay();
    var daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    var mondayOfThisWeek = new Date(today);
    mondayOfThisWeek.setDate(today.getDate() - daysSinceMonday);
    mondayOfThisWeek.setHours(0, 0, 0, 0);

    if (lastActive < mondayOfThisWeek) {
      return activeDays;
    }

    var daysActiveThisWeek = 0;
    var currentCheckDate = new Date(lastActive);

    for (var i = 0; i < streakCount && i < 7; i++) {
      if (currentCheckDate >= mondayOfThisWeek) {
        var dayIndex = (currentCheckDate.getDay() + 6) % 7;
        activeDays.push(dayIndex);
        daysActiveThisWeek++;
      }
      currentCheckDate.setDate(currentCheckDate.getDate() - 1);
    }

    return activeDays;
  }

  function renderProgress(progress) {
    var overallPercent = progress && typeof progress.overallPercent === "number"
      ? progress.overallPercent
      : 0;

    if (dom.progressBar) {
      dom.progressBar.style.width = String(overallPercent) + "%";
    }
  }

  function renderModuleCards(profile, progress) {
    if (!dom.carousel) return;

    state.allCards = buildCards(profile, progress);

    state.currentIndex = 0;
    renderDots();
    updateCarousel();
  }

  function buildCards(profile, progress) {
    var moduleProgress = progress && Array.isArray(progress.moduleProgress)
      ? progress.moduleProgress.slice()
      : [];

    var started = moduleProgress.filter(function (mod) {
      return (mod.percentComplete || 0) > 0;
    });

    var cards = [];
    var resumeModuleId = getModuleIdFromLessonId(profile && profile.currentLesson);

    if (started.length === 0) {
      var firstModule = moduleProgress[0];
      cards.push({
        title: firstModule && firstModule.title ? firstModule.title : "Finance 101",
        badge: "Start here",
        percent: 0,
        cta: "Start now",
        href: "../modules/module-list.html",
        disabled: false,
        note: "Begin your first module to track progress."
      });

      cards.push({
        title: "Module Locked",
        badge: "Coming up",
        percent: 0,
        cta: "Start a module",
        href: "",
        disabled: true,
        note: "Start a module to show progress here."
      });

      cards.push({
        title: "Module Locked",
        badge: "Coming up",
        percent: 0,
        cta: "Start a module",
        href: "",
        disabled: true,
        note: "Start a module to show progress here."
      });

      return cards;
    }

    for (var i = 0; i < started.length; i++) {
      var mod = started[i];
      var isResume = resumeModuleId && resumeModuleId === mod.moduleId;
      var percent = typeof mod.percentComplete === "number" ? mod.percentComplete : 0;

      cards.push({
        title: mod.title || "Module",
        badge: "In progress",
        percent: percent,
        cta: isResume ? "Continue" : (percent >= 100 ? "Review" : "Continue"),
        href: "../modules/module-list.html",
        disabled: false,
        note: percent + "% complete"
      });
    }

    while (cards.length < 3) {
      cards.push({
        title: "Module Locked",
        badge: "Coming up",
        percent: 0,
        cta: "Start a module",
        href: "",
        disabled: true,
        note: "Start another module to show progress here."
      });
    }

    return cards;
  }

  function getModuleIdFromLessonId(lessonId) {
    if (!lessonId || typeof lessonId !== "string") return "";
    var marker = "-lesson";
    var idx = lessonId.indexOf(marker);
    if (idx === -1) return "";
    return lessonId.slice(0, idx);
  }

  function createCardElement(card, index) {
    var themeClass = CARD_THEMES[index % CARD_THEMES.length];

    var article = document.createElement("article");
    article.className = "module-card " + themeClass + (card.disabled ? " placeholder is-disabled" : "");
    article.setAttribute("aria-label", card.title);

    var badge = document.createElement("span");
    badge.className = "module-progress";
    badge.textContent = card.badge;
    article.appendChild(badge);

    var content = document.createElement("div");
    content.className = "module-content";

    var title = document.createElement("h3");
    var icon = document.createElement("img");
    icon.className = "module-icon";
    icon.src = "../assets/images/finance-icon.png";
    icon.alt = card.title + " icon";
    title.appendChild(icon);
    title.appendChild(document.createTextNode(card.title));
    content.appendChild(title);

    var note = document.createElement("p");
    note.className = "module-note";
    note.textContent = card.note || "";
    content.appendChild(note);

    var bar = document.createElement("div");
    bar.className = "progress-bar";

    var fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = String(card.percent || 0) + "%";

    bar.appendChild(fill);
    content.appendChild(bar);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "continue-btn";
    btn.textContent = card.cta || "Continue";

    if (card.disabled) {
      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
    } else if (card.href) {
      btn.addEventListener("click", function () {
        window.location.href = card.href;
      });
      article.addEventListener("click", function (event) {
        if (event.target && event.target.tagName === "BUTTON") return;
        window.location.href = card.href;
      });
    }

    content.appendChild(btn);
    article.appendChild(content);

    return article;
  }

  function bindCarouselEvents() {
    if (state.carouselBound) return;
    state.carouselBound = true;

    if (dom.prevBtn) {
      dom.prevBtn.addEventListener("click", function () {
        if (state.currentIndex > 0) {
          state.currentIndex--;
          updateCarousel();
        }
      });
    }

    if (dom.nextBtn) {
      dom.nextBtn.addEventListener("click", function () {
        var pageCount = getPageCount();
        if (state.currentIndex < pageCount - 1) {
          state.currentIndex++;
          updateCarousel();
        }
      });
    }
  }

  window.addEventListener("resize", function () {
    renderDots();
    updateCarousel();
  });


  function getCardsPerPage() {
    if (window.innerWidth <= 768) {
      return 1;
    }

    if (window.innerWidth <= 1024) {
      return 2;
    }

    return 3;
  }

  function getPageCount() {
    var totalCards = state.allCards.length;
    var perPage = getCardsPerPage();
    return Math.max(1, Math.ceil(totalCards / perPage));
  }

  function renderDots() {
    if (!dom.dotsContainer) return;

    var pageCount = getPageCount();
    dom.dotsContainer.innerHTML = "";

    for (var i = 0; i < pageCount; i++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === state.currentIndex ? " active" : "");
      dot.setAttribute("aria-label", "Go to module page " + (i + 1));
      (function (index) {
        dot.addEventListener("click", function () {
          state.currentIndex = index;
          updateCarousel();
        });
      })(i);
      dom.dotsContainer.appendChild(dot);
    }

    var hideControls = pageCount <= 1;
    if (dom.prevBtn) dom.prevBtn.classList.toggle("is-hidden", hideControls);
    if (dom.nextBtn) dom.nextBtn.classList.toggle("is-hidden", hideControls);
  }

  function renderCurrentPage() {
    if (!dom.carousel) return;

    var perPage = getCardsPerPage();
    var start = state.currentIndex * perPage;
    var end = Math.min(start + perPage, state.allCards.length);

    dom.carousel.innerHTML = "";

    for (var i = start; i < end; i++) {
      dom.carousel.appendChild(createCardElement(state.allCards[i], i));
    }
  }

  function updateCarousel() {
    if (!dom.carousel) return;

    var pageCount = getPageCount();
    if (state.currentIndex > pageCount - 1) {
      state.currentIndex = Math.max(0, pageCount - 1);
    }

    renderCurrentPage();

    if (dom.prevBtn) {
      dom.prevBtn.disabled = state.currentIndex === 0;
    }

    if (dom.nextBtn) {
      dom.nextBtn.disabled = state.currentIndex >= pageCount - 1;
    }

    if (dom.dotsContainer) {
      var dots = dom.dotsContainer.querySelectorAll(".dot");
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === state.currentIndex);
      }
    }
  }

  function renderLoading(isLoading) {
    state.isLoading = isLoading;

    if (dom.main) {
      dom.main.classList.toggle("loading-state", isLoading);
    }

    if (!dom.prizeButtons || !dom.prizeButtons.length) {
      return;
    }

    if (isLoading) {
      for (var i = 0; i < dom.prizeButtons.length; i++) {
        var btn = dom.prizeButtons[i];
        btn.disabled = true;
        btn.textContent = "Loading...";
      }
    }
  }

  async function renderPrizeStore(profile) {
    if (!dom.prizeButtons || !dom.prizeButtons.length) return;

    try {
      var results = await Promise.allSettled([
        window.AppApi.getPrizes(),
        window.AppApi.getRedeemedPrizes()
      ]);

      var prizes = results[0].status === "fulfilled" && Array.isArray(results[0].value)
        ? results[0].value
        : [];
      var redeemedPrizes = results[1].status === "fulfilled" && Array.isArray(results[1].value)
        ? results[1].value
        : [];

      var points = Number((profile && profile.points) || 0);
      var redeemedSet = getRedeemedPrizeIdSet(redeemedPrizes);

      for (var i = 0; i < dom.prizeButtons.length; i++) {
        var button = dom.prizeButtons[i];
        var prizeKey = button.getAttribute("data-prize-key") || "";
        var prize = findCouponPrizeByKey(prizes, prizeKey);

        if (!prize) {
          button.disabled = true;
          button.textContent = "Locked";
          button.setAttribute("data-coupon-state", "locked");
          button.onclick = null;
          continue;
        }

        var prizeId = String(prize._id || prize.id || "");
        var isRedeemed = redeemedSet.has(prizeId);
        var enoughPoints = points >= Number(prize.cost || 0);

        var canViewDetails = isRedeemed || enoughPoints;
        button.disabled = !canViewDetails;
        button.textContent = canViewDetails ? "See Details" : "Locked";
        button.setAttribute("data-coupon-state", canViewDetails ? "details" : "locked");
        button.onclick = canViewDetails ? createPrizeModalHandler(prize.name || "Coupon Details") : null;
      }
    } catch (err) {
      for (var j = 0; j < dom.prizeButtons.length; j++) {
        dom.prizeButtons[j].disabled = true;
        dom.prizeButtons[j].textContent = "Locked";
        dom.prizeButtons[j].setAttribute("data-coupon-state", "locked");
        dom.prizeButtons[j].onclick = null;
      }
    }
  }

  function findCouponPrizeByKey(prizes, prizeKey) {
    if (!Array.isArray(prizes) || !prizeKey) return null;

    var key = String(prizeKey).toLowerCase();

    for (var i = 0; i < prizes.length; i++) {
      var prize = prizes[i];
      if (!prize || prize.type !== "coupon") continue;

      var name = String(prize.name || "").toLowerCase();

      if (key === "walmart" && name.indexOf("walmart") !== -1) return prize;
      if (key === "autozone" && name.indexOf("autozone") !== -1) return prize;
    }

    return null;
  }

  function getRedeemedPrizeIdSet(redeemedPrizes) {
    var set = new Set();

    if (!Array.isArray(redeemedPrizes)) return set;

    for (var i = 0; i < redeemedPrizes.length; i++) {
      var item = redeemedPrizes[i];
      var prizeId = item && item.prizeId ? (item.prizeId._id || item.prizeId) : null;
      if (prizeId) set.add(String(prizeId));
    }

    return set;
  }

  function createPrizeModalHandler(prizeName) {
    return function () {
      if (typeof window.openCouponModal === "function") {
        window.openCouponModal(prizeName);
      }
    };
  }

  function renderError(message) {
    if (!dom.dashboardError) return;
    dom.dashboardError.textContent = message || "Something went wrong.";
    dom.dashboardError.classList.add("is-visible");
  }

  function clearError() {
    if (!dom.dashboardError) return;
    dom.dashboardError.textContent = "";
    dom.dashboardError.classList.remove("is-visible");
  }

  document.addEventListener("DOMContentLoaded", function () {
    cacheDom();
    initPage();
  });
})();