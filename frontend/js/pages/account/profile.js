(function () {
  // Maps the three avatar options in the modal (index 0-2) to backend keys and image paths
  var AVATAR_KEYS = ['default', 'avatar1', 'avatar2'];
  var AVATAR_SRCS = [
    '../assets/images/profile-pic.png',
    '../assets/images/profile-pic2.png',
    '../assets/images/profile-pic3.png'
  ];

  var els = {};
  var originalDisplayName = '';

  // --- Setup ---

  function cacheElements() {
    els.displayName      = document.getElementById('displayName');
    els.displayNameError = document.getElementById('displayNameError');
    els.email            = document.getElementById('email');
    els.sidebarAvatar    = document.getElementById('sidebarAvatar');
    els.profileName      = document.querySelector('.profile-name');
    els.modalCurrentAvatar = document.getElementById('modalCurrentAvatar');
    els.apiError         = document.getElementById('profileApiError');
  }

  function avatarKeyToIndex(key) {
    var idx = AVATAR_KEYS.indexOf(key);
    return idx >= 0 ? idx : 0;
  }

  function getSelectedAvatarIndex() {
    var selected = document.querySelector('.avatar-option.selected');
    return selected ? parseInt(selected.getAttribute('data-avatar'), 10) : 0;
  }

  // --- Render ---

  function renderLoading() {
    if (els.displayName) els.displayName.disabled = true;
    if (els.email) els.email.disabled = true;
  }

  function renderData(profile) {
    var name      = profile.username || '';
    var email     = profile.email    || '';
    var avatarIdx = avatarKeyToIndex(profile.avatar || 'default');
    var src       = AVATAR_SRCS[avatarIdx];

    originalDisplayName = name;

    if (els.displayName) {
      els.displayName.value    = name;
      els.displayName.disabled = false;
    }
    if (els.email) {
      els.email.value    = email;
      els.email.disabled = false;
    }
    if (els.profileName)      els.profileName.textContent = name;
    if (els.sidebarAvatar) {
      els.sidebarAvatar.src = src;
      els.sidebarAvatar.alt = name + ' profile avatar';
    }
    if (els.modalCurrentAvatar) els.modalCurrentAvatar.src = src;

    // Sync the selected state of avatar options in the modal
    document.querySelectorAll('.avatar-option').forEach(function (opt) {
      var idx = parseInt(opt.getAttribute('data-avatar'), 10);
      opt.classList.toggle('selected', idx === avatarIdx);
    });
  }

  function renderError(err) {
    if (AppApi.handleAuthError(err)) return;
    if (els.apiError) {
      els.apiError.textContent = 'Failed to load profile. Please refresh to try again.';
      els.apiError.style.display = 'block';
    }
    if (els.displayName) els.displayName.disabled = false;
    if (els.email)       els.email.disabled       = false;
  }

  // --- Data ---

  function loadInitialData() {
    renderLoading();
    AppApi.getProfile()
      .then(renderData)
      .catch(renderError);
  }

  // --- Events ---

  function bindEvents() {
    if (els.displayName) {
      els.displayName.addEventListener('blur', function () {
        if (!this.value.trim()) {
          // Empty — revert to the original name loaded from backend
          this.value = originalDisplayName;
          this.classList.remove('error');
          if (els.displayNameError) els.displayNameError.classList.remove('show');
        } else {
          // Valid entry — keep sidebar name in sync
          var trimmed = this.value.trim();
          originalDisplayName = trimmed;
          if (els.profileName) els.profileName.textContent = trimmed;
        }
      });
    }
  }

  // --- Avatar save (overrides the inline saveAvatar defined in profile.html) ---

  window.saveAvatar = function () {
    var idx = getSelectedAvatarIndex();
    var key = AVATAR_KEYS[idx] || 'default';
    var src = AVATAR_SRCS[idx];

    AppApi.updateAvatar(key)
      .then(function () {
        if (els.sidebarAvatar)      els.sidebarAvatar.src      = src;
        if (els.modalCurrentAvatar) els.modalCurrentAvatar.src = src;
        closeEditAvatarModal();
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          alert('Failed to update avatar. Please try again.');
        }
      });
  };

  // --- Init ---

  function initPage() {
    cacheElements();
    bindEvents();
    loadInitialData();
  }

  document.addEventListener('DOMContentLoaded', initPage);
})();
