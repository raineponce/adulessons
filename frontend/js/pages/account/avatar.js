(function () {
  var AVATAR_IMAGE_MAP = {
    default: "../assets/images/mascot-still.png",
    avatar1: "../assets/images/mascot-still.png",
    avatar2: "../assets/images/mascot-wave.png",
    avatar3: "../assets/images/mascot-pointer.png"
  };

  var dom = {
    currentAvatarImage: null,
    avatarOptions: null,
    avatarButtons: [],
    saveAvatarBtn: null,
    status: null
  };

  var state = {
    selectedAvatar: "avatar1",
    isLoading: false
  };

  function cacheDom() {
    dom.currentAvatarImage = document.getElementById("currentAvatarImage");
    dom.avatarOptions = document.getElementById("avatarOptions");
    dom.avatarButtons = Array.prototype.slice.call(document.querySelectorAll(".avatar-option-btn"));
    dom.saveAvatarBtn = document.getElementById("saveAvatarBtn");
    dom.status = document.getElementById("avatarStatus");
  }

  async function initPage() {
    attachEventListeners();
    await loadProfile();
  }

  async function loadProfile() {
    renderLoading(true, "Loading profile...");
    clearStatus();

    try {
      var profile = await window.AppApi.getProfile();

      if (!profile || typeof profile !== "object") {
        renderError("No profile data found.");
        renderAvatar("avatar1");
        return;
      }

      if (!profile.avatar) {
        renderAvatar("avatar1");
        renderStatus("No avatar set yet. Choose one and save.", "success");
        return;
      }

      renderAvatar(profile.avatar);
    } catch (err) {
      if (window.AppApi.handleAuthError(err)) return;
      renderError(err && err.message ? err.message : "Failed to load profile.");
    } finally {
      renderLoading(false);
    }
  }

  function renderAvatar(avatarKey) {
    var normalized = AVATAR_IMAGE_MAP[avatarKey] ? avatarKey : "avatar1";
    state.selectedAvatar = normalized;

    if (dom.currentAvatarImage) {
      dom.currentAvatarImage.src = AVATAR_IMAGE_MAP[normalized];
    }

    dom.avatarButtons.forEach(function (button) {
      var img = button.querySelector("img");
      var isSelected = button.getAttribute("data-avatar") === normalized;
      if (img) {
        img.classList.toggle("selected", isSelected);
      }
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function handleSelectAvatar(event) {
    if (state.isLoading) return;

    var btn = event.target.closest(".avatar-option-btn");
    if (!btn) return;

    var avatarKey = btn.getAttribute("data-avatar");
    renderAvatar(avatarKey);
    clearStatus();
  }

  async function handleSaveAvatar() {
    if (state.isLoading) return;

    renderLoading(true, "Saving avatar...");
    clearStatus();

    try {
      var result = await window.AppApi.updateAvatar(state.selectedAvatar);
      var savedAvatar = result && result.avatar ? result.avatar : state.selectedAvatar;

      renderAvatar(savedAvatar);
      renderStatus("Avatar updated successfully.", "success");
    } catch (err) {
      if (window.AppApi.handleAuthError(err)) return;
      renderError(err && err.message ? err.message : "Unable to update avatar.");
    } finally {
      renderLoading(false);
    }
  }

  function renderLoading(isLoading, message) {
    state.isLoading = isLoading;

    dom.avatarButtons.forEach(function (button) {
      button.disabled = isLoading;
    });

    if (dom.saveAvatarBtn) {
      dom.saveAvatarBtn.disabled = isLoading;
      dom.saveAvatarBtn.textContent = isLoading ? "Saving..." : "Save Avatar";
    }

    if (isLoading && message) {
      renderStatus(message, "success");
    }
  }

  function renderError(message) {
    renderStatus(message || "Something went wrong.", "error");
  }

  function renderStatus(message, type) {
    if (!dom.status) return;
    dom.status.textContent = message || "";
    dom.status.classList.remove("error", "success");
    if (type === "error" || type === "success") {
      dom.status.classList.add(type);
    }
  }

  function clearStatus() {
    renderStatus("", "");
  }

  function attachEventListeners() {
    if (dom.avatarOptions) {
      dom.avatarOptions.addEventListener("click", handleSelectAvatar);
    }

    if (dom.saveAvatarBtn) {
      dom.saveAvatarBtn.addEventListener("click", handleSaveAvatar);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    cacheDom();
    initPage();
  });
})();