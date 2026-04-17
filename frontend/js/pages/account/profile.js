(function () {
  // Maps the three avatar options in the modal (index 0-2) to backend keys and image paths
  var AVATAR_KEYS = ['default', 'avatar1', 'avatar2'];
  var AVATAR_SRCS = [
    '../assets/images/profile-pic.png',
    '../assets/images/profile-pic2.png',
    '../assets/images/profile-pic3.png'
  ];

  var MASKED_PASSWORD = '••••••••';
  var MIN_PASSWORD_LENGTH = 8;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var els = {};
  var originalDisplayName = '';
  var originalEmail = '';
  var userInfoEditMode = false;
  var passwordEditMode = false;

  // --- Setup ---

  function cacheElements() {
    els.displayName      = document.getElementById('displayName');
    els.displayNameError = document.getElementById('displayNameError');
    els.email            = document.getElementById('email');
    els.emailError       = document.getElementById('emailError');
    els.userInfoActions  = document.getElementById('userInfoActions');
    els.sidebarAvatar    = document.getElementById('sidebarAvatar');
    els.profileName      = document.querySelector('.profile-name');
    els.modalCurrentAvatar = document.getElementById('modalCurrentAvatar');
    els.apiError         = document.getElementById('profileApiError');

    // Password fields
    els.currentPassword      = document.getElementById('currentPassword');
    els.newPassword          = document.getElementById('newPassword');
    els.confirmPassword      = document.getElementById('confirmPassword');
    els.currentPasswordError = document.getElementById('currentPasswordError');
    els.newPasswordError     = document.getElementById('newPasswordError');
    els.confirmPasswordError = document.getElementById('confirmPasswordError');
    els.passwordEditIcon     = document.querySelector('#security .edit-icon');
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
    originalEmail = email;

    if (els.displayName) {
      els.displayName.value    = name;
      els.displayName.disabled = false;
      els.displayName.readOnly = true;
    }
    if (els.email) {
      els.email.value    = email;
      els.email.disabled = false;
      els.email.readOnly = true;
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

    // Populate password section with masked placeholder; lock all fields
    lockPasswordFields();
  }

  function renderError(err) {
    if (AppApi.handleAuthError(err)) return;
    if (els.apiError) {
      els.apiError.textContent = 'Failed to load profile. Please refresh to try again.';
      els.apiError.style.display = 'block';
    }
    if (els.displayName) { els.displayName.disabled = false; els.displayName.readOnly = true; }
    if (els.email)       { els.email.disabled       = false; els.email.readOnly       = true; }
  }

  // --- User Info helpers ---

  function enableUserInfoEdit(focusInputId) {
    userInfoEditMode = true;
    if (els.displayName) {
      els.displayName.readOnly = false;
    }
    if (els.email) {
      els.email.readOnly = false;
    }
    if (els.userInfoActions) {
      els.userInfoActions.style.display = '';
    }
    var target = focusInputId ? document.getElementById(focusInputId) : els.displayName;
    if (target) target.focus();
  }

  function lockUserInfoFields() {
    userInfoEditMode = false;
    if (els.displayName) {
      els.displayName.readOnly = true;
      els.displayName.classList.remove('error');
    }
    if (els.email) {
      els.email.readOnly = true;
      els.email.classList.remove('error');
    }
    if (els.displayNameError) els.displayNameError.classList.remove('show');
    if (els.emailError)       els.emailError.classList.remove('show');
    if (els.userInfoActions) {
      els.userInfoActions.style.display = 'none';
    }
  }

  // --- Password helpers ---

  function lockPasswordFields() {
    passwordEditMode = false;
    if (els.currentPassword) {
      els.currentPassword.value    = MASKED_PASSWORD;
      els.currentPassword.disabled = true;
      els.currentPassword.classList.remove('error');
    }
    if (els.newPassword) {
      els.newPassword.value    = '';
      els.newPassword.disabled = true;
      els.newPassword.classList.remove('error');
    }
    if (els.confirmPassword) {
      els.confirmPassword.value    = '';
      els.confirmPassword.disabled = true;
      els.confirmPassword.classList.remove('error');
    }
    if (els.currentPasswordError) els.currentPasswordError.classList.remove('show');
    if (els.newPasswordError)     els.newPasswordError.classList.remove('show');
    if (els.confirmPasswordError) els.confirmPasswordError.classList.remove('show');
  }

  function enablePasswordEdit() {
    passwordEditMode = true;
    if (els.currentPassword) {
      els.currentPassword.value    = '';
      els.currentPassword.disabled = false;
      els.currentPassword.focus();
    }
    if (els.newPassword)     els.newPassword.disabled     = false;
    if (els.confirmPassword) els.confirmPassword.disabled = false;
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
        if (userInfoEditMode) return;
        if (!this.value.trim()) {
          // Empty — revert to the original name loaded from backend
          this.value = originalDisplayName;
          this.classList.remove('error');
          if (els.displayNameError) els.displayNameError.classList.remove('show');
        } else {
          // Valid entry — keep sidebar name in sync visually
          if (els.profileName) els.profileName.textContent = this.value.trim();
        }
      });
    }

    // Edit icon enables password editing
    if (els.passwordEditIcon) {
      els.passwordEditIcon.onclick = function () {
        enablePasswordEdit();
      };
    }

    // Empty-state validation on blur for password fields
    if (els.newPassword) {
      els.newPassword.addEventListener('blur', function () {
        if (!passwordEditMode) return;
        if (!this.value) {
          this.classList.add('error');
          if (els.newPasswordError) {
            els.newPasswordError.textContent = 'New password is required';
            els.newPasswordError.classList.add('show');
          }
        } else if (this.value.length < MIN_PASSWORD_LENGTH) {
          this.classList.add('error');
          if (els.newPasswordError) {
            els.newPasswordError.textContent = 'Password must be at least 8 characters';
            els.newPasswordError.classList.add('show');
          }
        } else {
          this.classList.remove('error');
          if (els.newPasswordError) els.newPasswordError.classList.remove('show');
        }
      });
    }

    if (els.confirmPassword) {
      els.confirmPassword.addEventListener('blur', function () {
        if (!passwordEditMode) return;
        if (!this.value) {
          this.classList.add('error');
          if (els.confirmPasswordError) {
            els.confirmPasswordError.textContent = 'Please confirm your new password';
            els.confirmPasswordError.classList.add('show');
          }
        } else if (this.value !== (els.newPassword ? els.newPassword.value : '')) {
          this.classList.add('error');
          if (els.confirmPasswordError) {
            els.confirmPasswordError.textContent = 'Passwords do not match';
            els.confirmPasswordError.classList.add('show');
          }
        } else {
          this.classList.remove('error');
          if (els.confirmPasswordError) els.confirmPasswordError.classList.remove('show');
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

  // --- User info save/cancel (exposed globally for HTML onclick) ---

  window.saveUserInfo = function () {
    if (!userInfoEditMode) return;

    var name  = els.displayName ? els.displayName.value.trim() : '';
    var email = els.email       ? els.email.value.trim()       : '';
    var hasError = false;

    if (!name) {
      if (els.displayName)      els.displayName.classList.add('error');
      if (els.displayNameError) {
        els.displayNameError.textContent = 'Display name is required';
        els.displayNameError.classList.add('show');
      }
      hasError = true;
    } else {
      if (els.displayName)      els.displayName.classList.remove('error');
      if (els.displayNameError) els.displayNameError.classList.remove('show');
    }

    if (!email || !EMAIL_RE.test(email)) {
      if (els.email)      els.email.classList.add('error');
      if (els.emailError) {
        els.emailError.textContent = 'Please enter a valid email address';
        els.emailError.classList.add('show');
      }
      hasError = true;
    } else {
      if (els.email)      els.email.classList.remove('error');
      if (els.emailError) els.emailError.classList.remove('show');
    }

    if (hasError) return;

    AppApi.updateProfile(name, email)
      .then(function () {
        originalDisplayName = name;
        originalEmail = email;
        if (els.profileName) els.profileName.textContent = name;
        lockUserInfoFields();
      })
      .catch(function (err) {
        if (AppApi.handleAuthError(err)) return;
        if (els.apiError) {
          els.apiError.textContent = err.message || 'Failed to update profile. Please try again.';
          els.apiError.style.display = 'block';
        }
      });
  };

  window.cancelUserInfo = function () {
    if (els.displayName) els.displayName.value = originalDisplayName;
    if (els.email)       els.email.value       = originalEmail;
    lockUserInfoFields();
  };

  // --- Override focusInput to enable edit mode for user info fields ---

  window.focusInput = function (inputId) {
    if (inputId === 'displayName' || inputId === 'email') {
      enableUserInfoEdit(inputId);
    } else {
      var el = document.getElementById(inputId);
      if (el) el.focus();
    }
  };

  // --- Password save (overrides inline savePassword in profile.html) ---

  window.savePassword = function () {
    if (!passwordEditMode) return;

    var currentPwd = els.currentPassword ? els.currentPassword.value : '';
    var newPwd     = els.newPassword     ? els.newPassword.value     : '';
    var confirmPwd = els.confirmPassword ? els.confirmPassword.value : '';
    var hasError   = false;

    if (!currentPwd) {
      if (els.currentPassword)      els.currentPassword.classList.add('error');
      if (els.currentPasswordError) {
        els.currentPasswordError.textContent = 'Current password is required';
        els.currentPasswordError.classList.add('show');
      }
      hasError = true;
    }

    if (!newPwd) {
      if (els.newPassword)      els.newPassword.classList.add('error');
      if (els.newPasswordError) {
        els.newPasswordError.textContent = 'New password is required';
        els.newPasswordError.classList.add('show');
      }
      hasError = true;
    } else if (newPwd.length < MIN_PASSWORD_LENGTH) {
      if (els.newPassword)      els.newPassword.classList.add('error');
      if (els.newPasswordError) {
        els.newPasswordError.textContent = 'Password must be at least 8 characters';
        els.newPasswordError.classList.add('show');
      }
      hasError = true;
    }

    if (!confirmPwd) {
      if (els.confirmPassword)      els.confirmPassword.classList.add('error');
      if (els.confirmPasswordError) {
        els.confirmPasswordError.textContent = 'Please confirm your new password';
        els.confirmPasswordError.classList.add('show');
      }
      hasError = true;
    } else if (confirmPwd !== newPwd) {
      if (els.confirmPassword)      els.confirmPassword.classList.add('error');
      if (els.confirmPasswordError) {
        els.confirmPasswordError.textContent = 'Passwords do not match';
        els.confirmPasswordError.classList.add('show');
      }
      hasError = true;
    }

    if (hasError) return;

    AppApi.updatePassword(currentPwd, newPwd)
      .then(function () {
        lockPasswordFields();
        if (typeof showPasswordSuccess === 'function') showPasswordSuccess();
      })
      .catch(function (err) {
        if (AppApi.handleAuthError(err)) return;
        // Show backend error on the currentPassword field
        if (els.currentPassword)      els.currentPassword.classList.add('error');
        if (els.currentPasswordError) {
          els.currentPasswordError.textContent = err.message || 'Failed to update password';
          els.currentPasswordError.classList.add('show');
        }
      });
  };

  // --- Cancel password edit (overrides inline resetPasswordForm in profile.html) ---

  window.resetPasswordForm = function () {
    lockPasswordFields();
  };

  // --- Init ---

  function initPage() {
    cacheElements();
    bindEvents();
    loadInitialData();
  }

  document.addEventListener('DOMContentLoaded', initPage);
})();

