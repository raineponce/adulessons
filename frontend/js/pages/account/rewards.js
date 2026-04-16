(function () {
  var COLLECTABLE_STORAGE_KEY = "adulessons.rewards.collectableClaimed";
  var RECENT_POINT_EVENTS_STORAGE_KEY = "adulessons.rewards.recentPointEvents";
  var LAST_COMPLETED_LESSONS_STORAGE_KEY = "adulessons.rewards.lastCompletedLessons";
  var MAX_RECENT_POINT_EVENTS = 8;
  var state = {
    profile: null,
    progress: null,
    prizes: [],
    redeemedPrizes: [],
    points: 0,
    loadErrors: {
      profile: null,
      progress: null,
      prizes: null,
      redeemed: null,
    },
    collectableClaimed: false,
    redeemingPrizeId: null,
    redeemingCode: false,
    recentPointEvents: [],
  };

  var elements = {};

  document.addEventListener("DOMContentLoaded", initPage);

  function initPage() {
    cacheElements();
    bindEvents();
    loadPageData();
  }

  function cacheElements() {
    elements.pageStatus = document.getElementById("pageStatus");
    elements.pointsValue = document.getElementById("pointsValue");
    elements.pointsMessage = document.getElementById("pointsMessage");
    elements.recentActivityList = document.getElementById("recentActivityList");
    elements.rewardsList = document.getElementById("rewardsList");
    elements.rewardsMessage = document.getElementById("rewardsMessage");
    elements.collectableStatus = document.getElementById("collectableStatus");
    elements.collectableProgressFill = document.getElementById(
      "collectableProgressFill",
    );
    elements.collectableProgressText = document.getElementById(
      "collectableProgressText",
    );
    elements.collectableActionButton = document.getElementById(
      "collectableActionButton",
    );
    elements.collectableMessage = document.getElementById("collectableMessage");
    elements.printablesGrid = document.getElementById("printablesGrid");
    elements.printablesMessage = document.getElementById("printablesMessage");
    elements.secretCodeInput = document.getElementById("secretCodeInput");
    elements.redeemCodeButton = document.getElementById("redeemCodeButton");
    elements.secretCodeMessage = document.getElementById("secretCodeMessage");
    elements.prizeOverlay = document.getElementById("prizeOverlay");
    elements.prizeModalTitle = document.getElementById("prizeModalTitle");
    elements.prizeModalBody = document.getElementById("prizeModalBody");
    elements.prizeModalClose = document.getElementById("prizeModalClose");
  }

  function bindEvents() {
    if (elements.collectableActionButton) {
      elements.collectableActionButton.addEventListener(
        "click",
        handleCollectableAction,
      );
    }

    if (elements.redeemCodeButton) {
      elements.redeemCodeButton.addEventListener(
        "click",
        handleSecretCodeRedeem,
      );
    }

    if (elements.secretCodeInput) {
      elements.secretCodeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          handleSecretCodeRedeem();
        }
      });
    }

    if (elements.rewardsList) {
      elements.rewardsList.addEventListener("click", handleRewardsActionClick);
    }

    if (elements.printablesGrid) {
      elements.printablesGrid.addEventListener(
        "click",
        handlePrintablesActionClick,
      );
    }

    if (elements.prizeOverlay) {
      elements.prizeOverlay.addEventListener("click", function (event) {
        if (event.target === elements.prizeOverlay) {
          closePrizeModal();
        }
      });
    }

    if (elements.prizeModalClose) {
      elements.prizeModalClose.addEventListener("click", closePrizeModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePrizeModal();
      }
    });
  }

  async function loadPageData() {
    setLoadingState(true);
    setPageStatus("");
    clearSectionMessages();

    try {
      var results = await Promise.allSettled([
        AppApi.getProfile(),
        AppApi.getProgress(),
        AppApi.getPrizes(),
        AppApi.getRedeemedPrizes(),
      ]);

      var profileResult = results[0];
      var progressResult = results[1];
      var prizesResult = results[2];
      var redeemedResult = results[3];

      if (
        profileResult.status === "rejected" &&
        AppApi.handleAuthError(profileResult.reason)
      ) {
        return;
      }

      if (
        progressResult.status === "rejected" &&
        AppApi.handleAuthError(progressResult.reason)
      ) {
        return;
      }
      if (
        prizesResult.status === "rejected" &&
        AppApi.handleAuthError(prizesResult.reason)
      ) {
        return;
      }
      if (
        redeemedResult.status === "rejected" &&
        AppApi.handleAuthError(redeemedResult.reason)
      ) {
        return;
      }

      state.loadErrors.profile =
        profileResult.status === "rejected" ? profileResult.reason : null;
      state.loadErrors.progress =
        progressResult.status === "rejected" ? progressResult.reason : null;
      state.loadErrors.prizes =
        prizesResult.status === "rejected" ? prizesResult.reason : null;
      state.loadErrors.redeemed =
        redeemedResult.status === "rejected" ? redeemedResult.reason : null;

      state.profile =
        profileResult.status === "fulfilled" ? profileResult.value : null;
      state.progress =
        progressResult.status === "fulfilled" ? progressResult.value : null;
      state.prizes =
        prizesResult.status === "fulfilled" && Array.isArray(prizesResult.value)
          ? prizesResult.value
          : [];
      state.redeemedPrizes =
        redeemedResult.status === "fulfilled" &&
        Array.isArray(redeemedResult.value)
          ? redeemedResult.value
          : [];
      state.points = getPoints(state.profile, state.progress);
      state.collectableClaimed = loadCollectableClaimed();
      state.recentPointEvents = loadRecentPointEvents();
      reconcileRecentLessonEvents();

      if (!isCollectableAvailable()) {
        clearCollectableClaimed();
        state.collectableClaimed = false;
      }

      renderAll();
    } finally {
      setLoadingState(false);
    }
  }

  function setLoadingState(isLoading) {
    if (elements.pointsValue) {
      elements.pointsValue.textContent = isLoading
        ? "Loading..."
        : formatPoints(state.points);
    }

    if (elements.pointsMessage) {
      setSectionMessage(
        elements.pointsMessage,
        isLoading ? "Loading your points..." : "",
        "muted",
      );
    }

    if (elements.collectableStatus) {
      setStatusPill(
        elements.collectableStatus,
        isLoading ? "locked" : getCollectableStatus(),
      );
      if (isLoading) {
        elements.collectableStatus.textContent = "Loading";
      }
    }

    if (elements.collectableProgressFill) {
      elements.collectableProgressFill.style.width = isLoading
        ? "0%"
        : getProgressPercent() + "%";
    }

    if (elements.collectableProgressText) {
      elements.collectableProgressText.textContent = isLoading
        ? "Loading your progress..."
        : getCollectableProgressText();
    }

    if (elements.collectableActionButton) {
      elements.collectableActionButton.disabled = isLoading;
      if (isLoading) {
        elements.collectableActionButton.classList.remove("is-claimed");
      }
    }

    if (elements.redeemCodeButton) {
      elements.redeemCodeButton.disabled = isLoading || state.redeemingCode;
    }
  }

  function renderAll() {
    renderPointsSection();
    renderRecentActivitySection();
    renderCollectableSection();
    renderRewardSections();
    renderPageStatus();
    syncNavProfileAndPoints();
  }

  function renderRecentActivitySection() {
    if (!elements.recentActivityList) {
      return;
    }

    var items = getRecentActivityItems();

    if (items.length === 0) {
      elements.recentActivityList.innerHTML =
        '<div class="empty-state">No recent activity yet.</div>';
      return;
    }

    elements.recentActivityList.innerHTML = items
      .map(function (item) {
        return [
          '<div class="activity-item">',
          '  <div class="activity-left">',
          '    <div class="activity-icon">',
          '      <img src="../assets/images/profile-pic.png" alt="Activity">',
          "    </div>",
          '    <span class="activity-text">' +
            escapeHtml(item.label) +
            "</span>",
          "  </div>",
          '  <div class="activity-points">',
          '    <div class="small-coin">',
          '      <img src="../assets/images/coin-icon.png" alt="Coin">',
          "    </div>",
          "    <span>+" + escapeHtml(String(item.points)) + " pts</span>",
          "  </div>",
          "</div>",
        ].join("");
      })
      .join("");
  }

  function renderPageStatus() {
    var errors = [];

    if (state.loadErrors.profile || state.loadErrors.progress) {
      errors.push("Points and progress could not be loaded.");
    }
    if (state.loadErrors.prizes || state.loadErrors.redeemed) {
      errors.push("Rewards and printables could not be loaded.");
    }

    if (errors.length === 0) {
      setPageStatus("");
      return;
    }

    setPageStatus(
      "Some sections could not be loaded yet. The rest of the page is still available.",
      "error",
    );
  }

  function renderPointsSection() {
    if (!elements.pointsValue || !elements.pointsMessage) {
      return;
    }

    if (state.loadErrors.profile && state.loadErrors.progress) {
      elements.pointsValue.textContent = "--";
      setSectionMessage(
        elements.pointsMessage,
        "We couldn't load your points right now.",
        "error",
      );
      return;
    }

    elements.pointsValue.textContent = formatPoints(state.points);
    setSectionMessage(elements.pointsMessage, "", "muted");
  }

  function renderCollectableSection() {
    if (
      !elements.collectableStatus ||
      !elements.collectableProgressFill ||
      !elements.collectableProgressText ||
      !elements.collectableActionButton ||
      !elements.collectableMessage
    ) {
      return;
    }

    if (state.loadErrors.progress) {
      setStatusPill(elements.collectableStatus, "locked");
      elements.collectableStatus.textContent = "Error";
      elements.collectableProgressFill.style.width = "0%";
      elements.collectableActionButton.disabled = true;
      elements.collectableActionButton.classList.remove("is-claimed");
      setSectionMessage(
        elements.collectableMessage,
        "Your progress couldn't be loaded.",
        "error",
      );
      return;
    }

    var status = getCollectableStatus();
    setStatusPill(elements.collectableStatus, status);
    elements.collectableProgressFill.style.width = getProgressPercent() + "%";
    elements.collectableProgressText.textContent = getCollectableProgressText();
    elements.collectableActionButton.disabled = status !== "available";
    elements.collectableActionButton.classList.toggle(
      "is-claimed",
      status === "claimed",
    );
    elements.collectableActionButton.textContent =
      status === "claimed" ? "Collected" : "Collect Now";
    setSectionMessage(
      elements.collectableMessage,
      getCollectableMessage(),
      status === "claimed" ? "success" : "muted",
    );
  }

  function renderRewardSections() {
    if (
      !elements.rewardsList ||
      !elements.printablesGrid ||
      !elements.rewardsMessage ||
      !elements.printablesMessage
    ) {
      return;
    }

    if (state.loadErrors.prizes || state.loadErrors.redeemed) {
      elements.rewardsList.innerHTML = "";
      elements.printablesGrid.innerHTML = "";
      setSectionMessage(
        elements.rewardsMessage,
        "We couldn't load rewards right now.",
        "error",
      );
      setSectionMessage(
        elements.printablesMessage,
        "We couldn't load printables right now.",
        "error",
      );
      return;
    }

    var redeemedSet = getRedeemedPrizeIdSet();
    var rewards = state.prizes.filter(function (prize) {
      return prize && prize.type === "coupon";
    });
    var printables = state.prizes.filter(function (prize) {
      return prize && prize.type === "printable";
    });

    if (rewards.length === 0) {
      rewards = getFallbackCouponPrizes();
    }

    if (printables.length === 0) {
      printables = getFallbackPrintablePrizes();
    }

    elements.rewardsList.innerHTML =
      rewards.length > 0
        ? rewards
            .map(function (prize) {
              return buildPrizeCardMarkup(prize, redeemedSet, "reward");
            })
            .join("")
        : "";

    elements.printablesGrid.innerHTML =
      printables.length > 0
        ? printables
            .map(function (prize) {
              return buildPrizeCardMarkup(prize, redeemedSet, "printable");
            })
            .join("")
        : "";

    setSectionMessage(elements.rewardsMessage, "", "muted");
    setSectionMessage(
      elements.printablesMessage,
      printables.length > 0
        ? getPrintablesMessage()
        : "No printables are available right now.",
      "muted",
    );
  }

  function buildPrizeCardMarkup(prize, redeemedSet, cardType) {
    var prizeId = getPrizeId(prize);
    var redeemed = redeemedSet.has(prizeId);
    var enoughPoints = hasEnoughPoints(prize);
    var isPrintable = prize.type === "printable";
    var printableName = isPrintable
      ? getPrintableDisplayName(prize)
      : prize.name || "Printable";
    var action = getPrizeAction(prize, redeemed, enoughPoints);
    var buttonLabel = getPrizeButtonLabel(prize, redeemed, enoughPoints);
    var buttonDisabled = action === "locked";
    var cardClasses = ["coupon-item"];

    if (cardType === "printable") {
      cardClasses = ["printable-card"];
      cardClasses.push(
        redeemed ? "available" : enoughPoints ? "available" : "locked",
      );
    } else {
      cardClasses.push(
        redeemed ? "available" : enoughPoints ? "available" : "locked",
      );
    }

    return cardType === "printable"
      ? [
          '<div class="' +
            cardClasses.join(" ") +
            '" data-prize-id="' +
            escapeHtml(prizeId) +
            '">',
          '  <div class="printable-icon">',
          '    <img src="' +
            escapeHtml(getPrizeIcon(prize)) +
            '" alt="' +
            escapeHtml(printableName) +
            '">',
          "  </div>",
          '  <div class="printable-name">' +
            escapeHtml(printableName) +
            "</div>",
          '  <div class="printable-cost">' +
            escapeHtml(formatPoints(prize.cost)) +
            "</div>",
          '  <button class="coupon-button printable-action" type="button" data-prize-id="' +
            escapeHtml(prizeId) +
            '" data-prize-action="' +
            escapeHtml(action) +
            '"' +
            (buttonDisabled ? " disabled" : "") +
            ">" +
            escapeHtml(buttonLabel) +
            "</button>",
          "</div>",
        ].join("")
      : [
          '<div class="coupon-item ' +
            (redeemed ? "available" : enoughPoints ? "available" : "locked") +
            '" data-prize-id="' +
            escapeHtml(prizeId) +
            '">',
          '  <div class="coupon-left">',
          '    <div class="coupon-icon">',
          '      <img src="' +
            escapeHtml(getPrizeIcon(prize)) +
            '" alt="' +
            escapeHtml(prize.name || "Reward") +
            '">',
          "    </div>",
          "    <div>",
          '      <div class="coupon-text">' +
            escapeHtml(prize.name || "Reward") +
            "</div>",
          '      <div class="reward-meta">' +
            escapeHtml(formatPoints(prize.cost)) +
            "</div>",
          "    </div>",
          "  </div>",
          '  <button class="coupon-button" type="button" data-prize-id="' +
            escapeHtml(prizeId) +
            '" data-prize-action="' +
            escapeHtml(action) +
            '"' +
            (buttonDisabled ? " disabled" : "") +
            ">" +
            escapeHtml(buttonLabel) +
            "</button>",
          "</div>",
        ].join("");
  }

  function handleRewardsActionClick(event) {
    var button = event.target.closest("[data-prize-action]");
    if (!button || !elements.rewardsList.contains(button)) {
      return;
    }

    handlePrizeAction(button);
  }

  function handlePrintablesActionClick(event) {
    var button = event.target.closest("[data-prize-action]");
    if (!button || !elements.printablesGrid.contains(button)) {
      return;
    }

    handlePrizeAction(button);
  }

  async function handlePrizeAction(button) {
    var prizeId = button.getAttribute("data-prize-id");
    var action = button.getAttribute("data-prize-action");
    var prize = getPrizeById(prizeId);

    if (!prize || action === "locked") {
      return;
    }

    if (action === "details") {
      openPrizeModal(prize, true);
      return;
    }

    if (action === "download") {
      var printableDownloadUrl = getPrintableDownloadFile(prize);
      if (!printableDownloadUrl) {
        openPrizeModal(prize, true);
        return;
      }

      // First download redeems the printable (deduct points); later downloads are free.
      if (prize.type === "printable" && !isPrizeRedeemed(prizeId)) {
        setPrizeButtonBusy(prizeId, true);
        try {
          var printableResult = await AppApi.redeemPrize(prizeId);
          if (typeof printableResult.points === "number") {
            state.points = printableResult.points;
          }
          await refreshRedeemedPrizes();
          setSectionMessage(
            elements.printablesMessage,
            "Printable unlocked. Your points total has been updated.",
            "success",
          );
          renderAll();
        } catch (error) {
          if (AppApi.handleAuthError(error)) {
            return;
          }

          setSectionMessage(
            elements.printablesMessage,
            getPrizeRedeemErrorMessage(error, prize),
            "error",
          );
          return;
        } finally {
          setPrizeButtonBusy(prizeId, false);
        }
      }

      triggerFileDownload(printableDownloadUrl, getPrintableDownloadFilename(prize));
      return;
    }

    if (action !== "redeem") {
      return;
    }

    setPrizeButtonBusy(prizeId, true);

    try {
      var result = await AppApi.redeemPrize(prizeId);
      if (typeof result.points === "number") {
        state.points = result.points;
      }
      await refreshRedeemedPrizes();
      setSectionMessage(
        elements.rewardsMessage,
        prize.type === "printable" ? "Printable unlocked." : "Reward unlocked.",
        "success",
      );
      setSectionMessage(
        elements.printablesMessage,
        prize.type === "printable"
          ? "Printable unlocked. Your points total has been updated."
          : getPrintablesMessage(),
        prize.type === "printable" ? "success" : "muted",
      );
      renderAll();
      if (prize.type === "coupon") {
        openPrizeModal(prize, true, result);
      }
    } catch (error) {
      if (AppApi.handleAuthError(error)) {
        return;
      }

      var message = getPrizeRedeemErrorMessage(error, prize);
      if (prize.type === "printable") {
        setSectionMessage(elements.printablesMessage, message, "error");
      } else {
        setSectionMessage(elements.rewardsMessage, message, "error");
      }
    } finally {
      setPrizeButtonBusy(prizeId, false);
    }
  }

  function setPrizeButtonBusy(prizeId, isBusy) {
    var buttons = document.querySelectorAll(
      '[data-prize-id="' + cssEscape(prizeId) + '"] [data-prize-action]',
    );
    Array.prototype.forEach.call(buttons, function (button) {
      button.disabled =
        isBusy || button.getAttribute("data-prize-action") === "locked";
      if (isBusy) {
        button.textContent = "Working...";
      } else {
        renderAll();
      }
    });
  }

  function getPrizeById(prizeId) {
    var normalizedId = String(prizeId);
    for (var i = 0; i < state.prizes.length; i += 1) {
      if (getPrizeId(state.prizes[i]) === normalizedId) {
        return state.prizes[i];
      }
    }
    return null;
  }

  function getRedeemedPrizeIdSet() {
    var set = new Set();
    state.redeemedPrizes.forEach(function (item) {
      var prizeId =
        item && item.prizeId ? item.prizeId._id || item.prizeId : null;
      if (prizeId) {
        set.add(String(prizeId));
      }
    });
    return set;
  }

  function getPrizeId(prize) {
    return String(prize && (prize._id || prize.id || ""));
  }

  function hasEnoughPoints(prize) {
    return (
      !state.loadErrors.progress && state.points >= Number(prize.cost || 0)
    );
  }

  function getPrizeAction(prize, redeemed, enoughPoints) {
    if (prize && prize.isPlaceholder) {
      return "locked";
    }

    if (redeemed) {
      if (prize.type === "printable" && getPrintableDownloadFile(prize)) {
        return "download";
      }
      if (prize.type === "coupon") {
        return "details";
      }
      return "details";
    }

    if (enoughPoints) {
      if (prize.type === "printable" && getPrintableDownloadFile(prize)) {
        return "download";
      }
      return "redeem";
    }

    return "locked";
  }

  function getPrizeButtonLabel(prize, redeemed, enoughPoints) {
    if (prize && prize.isPlaceholder) {
      return "Locked";
    }

    if (redeemed) {
      if (prize.type === "printable" && getPrintableDownloadFile(prize)) {
        return getPrintableDownloadButtonLabel(prize);
      }
      if (prize.type === "coupon") {
        return "Claimed";
      }
      return prize.type === "printable" ? "Unlocked" : "See details";
    }

    if (enoughPoints) {
      if (prize.type === "printable" && getPrintableDownloadFile(prize)) {
        return getPrintableDownloadButtonLabel(prize);
      }
      return "Unlock";
    }

    return "Locked";
  }

  function getPrizeIcon(prize) {
    if (prize.type === "printable") {
      return "../assets/images/printer-icon.png";
    }

    if (String(prize.name || "").indexOf("%") !== -1) {
      return "../assets/images/percent-coupon.png";
    }

    return "../assets/images/money-coupon.png";
  }

  function getPrintableMeta(prize) {
    var prizeName = String((prize && prize.name) || "").toLowerCase();
    var fileUrl = String((prize && prize.fileUrl) || "").toLowerCase();

    if (
      prizeName.indexOf("budget") !== -1 ||
      fileUrl.indexOf("budget") !== -1
    ) {
      return {
        name: "Budget Tracker Printable",
        buttonLabel: "Download Budget Tracker PDF",
        fileUrl: "/assets/images/printables/budget-tracker-printable.pdf",
        fileName: "budget-tracker-printable.pdf",
      };
    }

    if (
      prizeName.indexOf("calendar") !== -1 ||
      prizeName.indexOf("meal") !== -1 ||
      fileUrl.indexOf("calendar") !== -1 ||
      fileUrl.indexOf("meal") !== -1
    ) {
      return {
        name: "Calendar Printable",
        buttonLabel: "Download Calendar PDF",
        fileUrl: "/assets/images/printables/calendar-printable.pdf",
        fileName: "calendar-printable.pdf",
      };
    }

    if (
      prizeName.indexOf("to-do") !== -1 ||
      prizeName.indexOf("todo") !== -1 ||
      fileUrl.indexOf("to-do") !== -1 ||
      fileUrl.indexOf("todo") !== -1
    ) {
      return {
        name: "To-Do Printable",
        buttonLabel: "Download To-Do PDF",
        fileUrl: "/assets/images/printables/to-do-printable.pdf",
        fileName: "to-do-printable.pdf",
      };
    }

    return {
      name: (prize && prize.name) || "Printable",
      buttonLabel: "Download PDF",
      fileUrl: (prize && prize.fileUrl) || "",
      fileName: "printable.pdf",
    };
  }

  function getPrintableDisplayName(prize) {
    return getPrintableMeta(prize).name;
  }

  function getPrintableDownloadButtonLabel(prize) {
    return getPrintableMeta(prize).buttonLabel;
  }

  function getPrintableDownloadFile(prize) {
    return getPrintableMeta(prize).fileUrl;
  }

  function getPrintableDownloadFilename(prize) {
    return getPrintableMeta(prize).fileName;
  }

  function isPrizeRedeemed(prizeId) {
    var normalizedId = String(prizeId || "");
    if (!normalizedId || !Array.isArray(state.redeemedPrizes)) {
      return false;
    }

    return state.redeemedPrizes.some(function (item) {
      var id = item && item.prizeId ? item.prizeId._id || item.prizeId : null;
      return id && String(id) === normalizedId;
    });
  }

  function triggerFileDownload(url, fileName) {
    var anchor = document.createElement("a");
    anchor.href = String(url);
    anchor.download = String(fileName || "download.pdf");
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  async function refreshRedeemedPrizes() {
    try {
      var redeemed = await AppApi.getRedeemedPrizes();
      state.redeemedPrizes = Array.isArray(redeemed) ? redeemed : [];
    } catch (error) {
      AppApi.handleAuthError(error);
    }
  }

  async function handleCollectableAction() {
    if (!isCollectableAvailable()) {
      return;
    }

    state.collectableClaimed = true;
    saveCollectableClaimed();
    renderCollectableSection();
    setSectionMessage(
      elements.collectableMessage,
      "Your collectable has been claimed on this device.",
      "success",
    );
  }

  function isCollectableAvailable() {
    return Boolean(
      state.progress &&
      state.progress.allLessonsComplete &&
      getProgressPercent() === 100,
    );
  }

  function getCollectableStatus() {
    if (!state.progress) {
      return "locked";
    }

    if (state.collectableClaimed) {
      return "claimed";
    }

    if (state.progress.allLessonsComplete && getProgressPercent() === 100) {
      return "available";
    }

    return "locked";
  }

  function getCollectableMessage() {
    if (!state.progress) {
      return "Complete all lessons to unlock this collectable.";
    }

    if (state.collectableClaimed) {
      return "You already claimed this collectable.";
    }

    if (state.progress.allLessonsComplete && getProgressPercent() === 100) {
      return "Your collectable is ready to claim.";
    }

    return "Complete all lessons and finish the progress bar to unlock this collectable.";
  }

  function getCollectableProgressText() {
    if (!state.progress) {
      return "Your progress is unavailable right now.";
    }

    var totals = getProgressTotals();
    return totals.completed + " of " + totals.total + " lessons complete";
  }

  function getPrintablesMessage() {
    if (!state.progress) {
      return "Complete more lessons to unlock more printables.";
    }

    if (state.points === 0) {
      return "Complete more lessons to unlock more printables.";
    }

    return "Unlock printables using your available points.";
  }

  function getProgressTotals() {
    var moduleProgress =
      state.progress && Array.isArray(state.progress.moduleProgress)
        ? state.progress.moduleProgress
        : [];
    var totals = {
      total: 0,
      completed: 0,
    };

    moduleProgress.forEach(function (module) {
      totals.total += Number(module.totalLessons || 0);
      totals.completed += Number(module.completedLessons || 0);
    });

    return totals;
  }

  function getRecentActivityItems() {
    var MAX_VISIBLE_ACTIVITY_ITEMS = 3;
    var items = [];

    if (
      Array.isArray(state.recentPointEvents) &&
      state.recentPointEvents.length
    ) {
      items = state.recentPointEvents.slice(0, MAX_VISIBLE_ACTIVITY_ITEMS);
    }

    var totals = getProgressTotals();
    var usedCodes =
      state.profile && Array.isArray(state.profile.usedCodes)
        ? state.profile.usedCodes.length
        : 0;

    // Fill remaining visible slots with lesson-completion entries.
    var lessonEvents = Number(totals.completed || 0);
    while (lessonEvents > 0 && items.length < MAX_VISIBLE_ACTIVITY_ITEMS) {
      items.push({
        label: "Completed a lesson",
        points: 10,
      });
      lessonEvents -= 1;
    }

    if (usedCodes > 0 && items.length < MAX_VISIBLE_ACTIVITY_ITEMS) {
      items.push({
        label: "Code redeemed",
        points: 15,
      });
    }

    var lastActive =
      state.profile && state.profile.streak && state.profile.streak.lastActive
        ? new Date(state.profile.streak.lastActive)
        : null;
    var now = new Date();
    var isLoggedInToday =
      lastActive &&
      now.getFullYear() === lastActive.getFullYear() &&
      now.getMonth() === lastActive.getMonth() &&
      now.getDate() === lastActive.getDate();

    var streak =
      state.profile && state.profile.streak ? state.profile.streak.current : 0;
    if (streak > 0 && isLoggedInToday && items.length < MAX_VISIBLE_ACTIVITY_ITEMS) {
      items.push({
        label: "Streak reward",
        points: 5,
      });
    }

    if (items.length === 0 && Number(state.points || 0) > 0) {
      items.push({
        label: "Points earned",
        points: Number(state.points || 0),
      });
    }

    return items.slice(0, MAX_VISIBLE_ACTIVITY_ITEMS);
  }

  function reconcileRecentLessonEvents() {
    var totals = getProgressTotals();
    var completedNow = Number(totals.completed || 0);
    var completedBefore = loadLastCompletedLessons();

    if (completedBefore === null) {
      saveLastCompletedLessons(completedNow);
      return;
    }

    if (completedNow > completedBefore) {
      var delta = completedNow - completedBefore;
      while (delta > 0) {
        addRecentPointEvent("Completed a lesson", 10);
        delta -= 1;
      }
    }

    saveLastCompletedLessons(completedNow);
  }

  function addRecentPointEvent(label, points) {
    var normalizedPoints = Number(points || 0);
    if (!label || normalizedPoints <= 0) {
      return;
    }

    if (!Array.isArray(state.recentPointEvents)) {
      state.recentPointEvents = [];
    }

    state.recentPointEvents.unshift({
      label: String(label),
      points: normalizedPoints,
    });

    if (state.recentPointEvents.length > MAX_RECENT_POINT_EVENTS) {
      state.recentPointEvents = state.recentPointEvents.slice(
        0,
        MAX_RECENT_POINT_EVENTS,
      );
    }

    saveRecentPointEvents();
  }

  function loadRecentPointEvents() {
    try {
      var raw = window.sessionStorage.getItem(RECENT_POINT_EVENTS_STORAGE_KEY);
      if (!raw) {
        return [];
      }

      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(function (item) {
          return (
            item &&
            typeof item.label === "string" &&
            item.label.trim() &&
            Number(item.points || 0) > 0
          );
        })
        .map(function (item) {
          return {
            label: String(item.label),
            points: Number(item.points),
          };
        })
        .slice(0, MAX_RECENT_POINT_EVENTS);
    } catch (error) {
      return [];
    }
  }

  function saveRecentPointEvents() {
    try {
      window.sessionStorage.setItem(
        RECENT_POINT_EVENTS_STORAGE_KEY,
        JSON.stringify(state.recentPointEvents || []),
      );
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function loadLastCompletedLessons() {
    try {
      var raw = window.sessionStorage.getItem(LAST_COMPLETED_LESSONS_STORAGE_KEY);
      if (raw === null || raw === "") {
        return null;
      }

      var parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed < 0) {
        return null;
      }

      return Math.floor(parsed);
    } catch (error) {
      return null;
    }
  }

  function saveLastCompletedLessons(count) {
    try {
      var normalized = Number(count || 0);
      if (!Number.isFinite(normalized) || normalized < 0) {
        normalized = 0;
      }

      window.sessionStorage.setItem(
        LAST_COMPLETED_LESSONS_STORAGE_KEY,
        String(Math.floor(normalized)),
      );
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function getProgressPercent() {
    if (!state.progress) {
      return 0;
    }

    var percent = Number(state.progress.overallPercent || 0);
    if (percent < 0) {
      return 0;
    }
    if (percent > 100) {
      return 100;
    }
    return percent;
  }

  function getPointsFromProgress(progress) {
    return progress && typeof progress.points === "number"
      ? progress.points
      : 0;
  }

  function getPointsFromProfile(profile) {
    return profile && typeof profile.points === "number" ? profile.points : 0;
  }

  function getPoints(profile, progress) {
    if (profile && typeof profile.points === "number") {
      return profile.points;
    }
    return getPointsFromProgress(progress);
  }

  function syncNavProfileAndPoints() {
    updateNavPointsLabels(formatPoints(state.points));

    var username =
      state.profile && state.profile.username
        ? String(state.profile.username)
        : "";

    if (username) {
      updateNavUsernameLabels(username);
    }

    window.setTimeout(function () {
      updateNavPointsLabels(formatPoints(state.points));
      if (username) {
        updateNavUsernameLabels(username);
      }
    }, 120);
  }

  function updateNavPointsLabels(text) {
    var labels = document.querySelectorAll("[data-nav-points-label]");
    Array.prototype.forEach.call(labels, function (label) {
      label.textContent = text;
    });
  }

  function updateNavUsernameLabels(text) {
    var labels = document.querySelectorAll("[data-nav-username-label]");
    Array.prototype.forEach.call(labels, function (label) {
      label.textContent = text;
    });
  }

  function getFallbackCouponPrizes() {
    return [
      {
        _id: "fallback-coupon-1",
        name: "$10 Grocery Coupon",
        type: "coupon",
        cost: 25,
        available: true,
        isPlaceholder: true,
      },
      {
        _id: "fallback-coupon-2",
        name: "Home Savings Coupon",
        type: "coupon",
        cost: 25,
        available: true,
        isPlaceholder: true,
      },
    ];
  }

  function getFallbackPrintablePrizes() {
    return [
      {
        _id: "fallback-printable-1",
        name: "Budget Tracker Printable",
        type: "printable",
        cost: 50,
        fileUrl: "/assets/images/printables/budget-tracker-printable.pdf",
        available: true,
      },
      {
        _id: "fallback-printable-2",
        name: "Calendar Printable",
        type: "printable",
        cost: 50,
        fileUrl: "/assets/images/printables/calendar-printable.pdf",
        available: true,
      },
      {
        _id: "fallback-printable-3",
        name: "To-Do Printable",
        type: "printable",
        cost: 50,
        fileUrl: "/assets/images/printables/to-do-printable.pdf",
        available: true,
      },
    ];
  }

  async function handleSecretCodeRedeem() {
    if (state.redeemingCode) {
      return;
    }

    var code = elements.secretCodeInput.value.trim();
    if (!code) {
      setSectionMessage(
        elements.secretCodeMessage,
        "Enter a code first.",
        "error",
      );
      return;
    }

    if (
      state.profile &&
      Array.isArray(state.profile.usedCodes) &&
      state.profile.usedCodes.includes(code.toUpperCase())
    ) {
      setSectionMessage(
        elements.secretCodeMessage,
        "You've already used this code.",
        "error",
      );
      return;
    }

    state.redeemingCode = true;
    elements.redeemCodeButton.disabled = true;
    setSectionMessage(
      elements.secretCodeMessage,
      "Redeeming your code...",
      "muted",
    );

    try {
      var previousPoints = Number(state.points || 0);
      var result = await AppApi.redeemCode(code);
      elements.secretCodeInput.value = "";

      var earnedPoints =
        result && typeof result.pointsValue === "number"
          ? result.pointsValue
          : Math.max(0, Number(result && result.points) - previousPoints);

      if (earnedPoints > 0) {
        addRecentPointEvent("Code redeemed", earnedPoints);
      }

      if (typeof result.points === "number") {
        state.points = result.points;
      }
      await refreshRedeemedPrizes();
      setSectionMessage(
        elements.secretCodeMessage,
        getSecretCodeSuccessMessage(result),
        "success",
      );
      renderAll();
    } catch (error) {
      if (AppApi.handleAuthError(error)) {
        return;
      }

      setSectionMessage(
        elements.secretCodeMessage,
        getSecretCodeErrorMessage(error),
        "error",
      );
    } finally {
      state.redeemingCode = false;
      elements.redeemCodeButton.disabled = false;
    }
  }

  function getSecretCodeSuccessMessage(result) {
    if (
      result &&
      typeof result.pointsValue === "number" &&
      result.pointsValue > 0
    ) {
      return "You earned " + formatPoints(result.pointsValue) + ".";
    }

    if (result && result.rewardType === "prize") {
      return "Your secret code unlocked a prize.";
    }

    return "Code redeemed successfully.";
  }

  function getSecretCodeErrorMessage(error) {
    var message = getErrorMessage(error);

    if (/expired/i.test(message)) {
      return "This code has expired.";
    }

    if (/already redeemed|already used/i.test(message)) {
      return "You've already used this code.";
    }

    if (/invalid|inactive/i.test(message)) {
      return "That code isn't valid. Try again.";
    }

    return "Something went wrong. Please try again later.";
  }

  function getPrizeRedeemErrorMessage(error, prize) {
    var message = getErrorMessage(error);
    var isPrintable = prize && prize.type === "printable";

    if (/not enough points/i.test(message)) {
      return isPrintable
        ? "You need more points to unlock this printable."
        : "You need more points to unlock this item.";
    }

    if (
      /not found|unavailable/i.test(message) ||
      /server error/i.test(message)
    ) {
      return isPrintable
        ? "Download failed. Please try again."
        : "Couldn\'t unlock this item.";
    }

    return isPrintable
      ? "Download failed. Please try again."
      : "Couldn\'t unlock this item.";
  }

  function getErrorMessage(error) {
    if (!error) {
      return "";
    }

    if (
      error.payload &&
      typeof error.payload === "object" &&
      error.payload.error
    ) {
      return String(error.payload.error);
    }

    return String(error.message || "");
  }

  function formatPoints(points) {
    var value = Number(points || 0);
    return value + " pts";
  }

  function setPrizeButtonBusy(prizeId, isBusy) {
    var selector =
      '[data-prize-id="' + cssEscape(prizeId) + '"] [data-prize-action]';
    var buttons = document.querySelectorAll(selector);
    Array.prototype.forEach.call(buttons, function (button) {
      var action = button.getAttribute("data-prize-action");
      button.disabled = isBusy || action === "locked";
      if (isBusy) {
        button.textContent = "Working...";
      }
    });

    if (!isBusy) {
      renderAll();
    }
  }

  function openPrizeModal(prize, isRedeemed, redeemResult) {
    if (
      !elements.prizeOverlay ||
      !elements.prizeModalTitle ||
      !elements.prizeModalBody
    ) {
      return;
    }

    var details = [];
    var isQrOnlyCouponModal = prize.type === "coupon" && isRedeemed;

    if (!isQrOnlyCouponModal) {
      details.push(
        "<div><strong>Name:</strong> " +
          escapeHtml(prize.name || "Prize") +
          "</div>",
      );
      if (prize.description) {
        details.push(
          "<div><strong>Description:</strong> " +
            escapeHtml(prize.description) +
            "</div>",
        );
      }
      details.push(
        "<div><strong>Cost:</strong> " +
          escapeHtml(formatPoints(prize.cost)) +
          "</div>",
      );
      details.push(
        "<div><strong>Status:</strong> " +
          escapeHtml(isRedeemed ? "Unlocked" : "Available") +
          "</div>",
      );
    }

    if (isQrOnlyCouponModal) {
      var couponQrImage = getCouponQrImage(prize, redeemResult);
      if (couponQrImage) {
        details.push(
          '<div class="coupon-qr-shell">' +
            '<div class="coupon-qr-inner">' +
            '<img class="coupon-qr-image" src="' +
            escapeHtml(couponQrImage) +
            '" alt="' +
            escapeHtml(prize.name || "Coupon QR") +
            '">' +
            "</div>" +
            "</div>",
        );
      } else {
        details.push(
          '<div class="coupon-qr-shell">' +
            '<div class="coupon-qr-inner">' +
            '<span class="coupon-qr-fallback" aria-hidden="true"></span>' +
            "</div>" +
            "</div>",
        );
      }
    } else if (
      prize.type === "coupon" &&
      redeemResult &&
      redeemResult.prize &&
      redeemResult.prize.couponCode
    ) {
      details.push(
        "<div><strong>Code:</strong> " +
          escapeHtml(redeemResult.prize.couponCode) +
          "</div>",
      );
    } else if (prize.type === "coupon" && prize.couponCode && isRedeemed) {
      details.push(
        "<div><strong>Code:</strong> " +
          escapeHtml(prize.couponCode) +
          "</div>",
      );
    }

    if (prize.type === "printable" && prize.fileUrl) {
      details.push(
        "<div><a href='" +
          escapeHtml(getPrintableDownloadFile(prize)) +
          "' download='" +
          escapeHtml(getPrintableDownloadFilename(prize)) +
          "' rel='noopener'>Download printable PDF</a></div>",
      );
    }

    elements.prizeModalTitle.textContent = prize.name || "Prize Details";
    elements.prizeModalBody.innerHTML = details.join("");
    elements.prizeOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function getCouponQrImage(prize, redeemResult) {
    var couponCode = "";
    if (redeemResult && redeemResult.prize && redeemResult.prize.couponCode) {
      couponCode = String(redeemResult.prize.couponCode).toUpperCase();
    } else if (prize && prize.couponCode) {
      couponCode = String(prize.couponCode).toUpperCase();
    }

    var prizeName = String((prize && prize.name) || "").toLowerCase();

    if (
      couponCode.indexOf("WALMART") !== -1 ||
      prizeName.indexOf("walmart") !== -1
    ) {
      return "../assets/images/rewards/walmart-coupon.png";
    }

    if (
      couponCode.indexOf("AUTO") !== -1 ||
      prizeName.indexOf("autozone") !== -1
    ) {
      return "../assets/images/rewards/autozone-coupon.png";
    }

    if (
      couponCode.indexOf("PUBLIX") !== -1 ||
      prizeName.indexOf("publix") !== -1
    ) {
      return "../assets/images/rewards/publix-coupon.png";
    }

    return null;
  }

  function closePrizeModal() {
    if (!elements.prizeOverlay) {
      return;
    }

    elements.prizeOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function setPageStatus(message, tone) {
    if (!elements.pageStatus) {
      return;
    }

    if (!message) {
      elements.pageStatus.hidden = true;
      elements.pageStatus.textContent = "";
      elements.pageStatus.className = "section-message is-muted";
      return;
    }

    elements.pageStatus.hidden = false;
    elements.pageStatus.textContent = message;
    elements.pageStatus.className =
      "section-message " +
      (tone === "error"
        ? "is-error"
        : tone === "success"
          ? "is-success"
          : "is-muted");
  }

  function setSectionMessage(element, message, tone) {
    if (!element) {
      return;
    }

    if (!message) {
      element.hidden = true;
      element.textContent = "";
      element.className =
        element.className.replace(/\bis-(error|success|muted)\b/g, "").trim() ||
        "section-message";
      if (element.className.indexOf("section-message") === -1) {
        element.className = "section-message is-muted";
      }
      return;
    }

    element.hidden = false;
    element.textContent = message;
    element.className =
      "section-message " +
      (tone === "error"
        ? "is-error"
        : tone === "success"
          ? "is-success"
          : "is-muted");
  }

  function clearSectionMessages() {
    setSectionMessage(elements.pointsMessage, "", "muted");
    setSectionMessage(elements.rewardsMessage, "", "muted");
    setSectionMessage(elements.collectableMessage, "", "muted");
    setSectionMessage(elements.printablesMessage, "", "muted");
    setSectionMessage(elements.secretCodeMessage, "", "muted");
  }

  function setStatusPill(element, status) {
    if (!element) {
      return;
    }

    var normalized = status || "locked";
    element.className = "state-pill " + normalized;
    element.textContent =
      normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }

  function loadCollectableClaimed() {
    try {
      return window.sessionStorage.getItem(COLLECTABLE_STORAGE_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function saveCollectableClaimed() {
    try {
      window.sessionStorage.setItem(COLLECTABLE_STORAGE_KEY, "true");
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function clearCollectableClaimed() {
    try {
      window.sessionStorage.removeItem(COLLECTABLE_STORAGE_KEY);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(String(value));
    }

    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }
})();
