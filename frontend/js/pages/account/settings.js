(function () {
  var AVATAR_KEYS = ['default', 'avatar1', 'avatar2'];
  var AVATAR_SRCS = [
    '../assets/images/profile-pic.png',
    '../assets/images/profile-pic2.png',
    '../assets/images/profile-pic3.png'
  ];

  function avatarKeyToSrc(key) {
    var idx = AVATAR_KEYS.indexOf(key);
    return AVATAR_SRCS[idx >= 0 ? idx : 0];
  }

  function loadUserInfo() {
    var avatarImg = document.getElementById('sidebarAvatar');
    var nameEl    = document.getElementById('sidebarName');

    // Apply avatar from localStorage immediately (reflects changes from profile page)
    var cachedAvatar = localStorage.getItem('userAvatarSrc');
    if (cachedAvatar && avatarImg) {
      avatarImg.src = cachedAvatar;
    }

    AppApi.getProfile()
      .then(function (profile) {
        if (nameEl)    nameEl.textContent = profile.username || '';
        if (avatarImg) {
          var src = avatarKeyToSrc(profile.avatar || 'default');
          avatarImg.src = src;
          avatarImg.alt = (profile.username || '') + ' profile avatar';
          // Keep localStorage in sync with latest backend data
          localStorage.setItem('userAvatarSrc', src);
        }
      })
      .catch(function (err) {
        if (AppApi.handleAuthError(err)) return;
        console.error('Failed to load user profile for settings page:', err);
      });
  }

  // Sign Out button
  function bindSignOut() {
    var signOutBtn = document.querySelector('.nav-item.sign-out');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        AppApi.signOut()
          .then(function () {
            window.location.href = '../welcome.html';
          })
          .catch(function (err) {
            if (!AppApi.handleAuthError(err)) {
              window.location.href = '../welcome.html';
            }
          });
      });
    }
  }

  // Override confirmReset to call the backend reset-progress endpoint
  window.confirmReset = function () {
    AppApi.resetProgress()
      .then(function () {
        closeResetModal();
        alert('Your progress has been reset successfully.');
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          alert('Failed to reset progress. Please try again.');
        }
        closeResetModal();
      });
  };

  // Override confirmDeactivate to permanently delete the account
  window.confirmDeactivate = function () {
    AppApi.deleteAccount()
      .then(function () {
        closeDeactivateModal();
        window.location.href = '../welcome.html';
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          alert('Failed to delete account. Please try again.');
        }
        closeDeactivateModal();
      });
  };

  document.addEventListener('DOMContentLoaded', function () {
    loadUserInfo();
    bindSignOut();
  });
})();