(function () {
  // ---- DOM element cache ----
  var els = {};

  function cacheElements() {
    els.sidebarAvatar        = document.getElementById('sidebarAvatar');
    els.sidebarProfileName   = document.getElementById('sidebarProfileName');
    els.displayNameInput     = document.getElementById('displayName');
    els.emailInput           = document.getElementById('email');
    els.displayNameError     = document.getElementById('displayNameError');
    els.emailError           = document.getElementById('emailError');
    els.currentPasswordInput = document.getElementById('currentPassword');
    els.newPasswordInput     = document.getElementById('newPassword');
    els.confirmPasswordInput = document.getElementById('confirmPassword');
    els.currentPasswordError = document.getElementById('currentPasswordError');
    els.newPasswordError     = document.getElementById('newPasswordError');
    els.confirmPasswordError = document.getElementById('confirmPasswordError');
    els.editAvatarModal      = document.getElementById('editAvatarModal');
    els.modalCurrentAvatar   = document.getElementById('modalCurrentAvatar');
    els.privacyModal         = document.getElementById('privacyModal');
    els.termsModal           = document.getElementById('termsModal');
    els.hamburgerMenu        = document.getElementById('hamburgerMenu');
    els.sidebar              = document.querySelector('.sidebar');
    els.sidebarOverlay       = document.getElementById('sidebarOverlay');
    els.profileErrorBanner   = document.getElementById('profileErrorBanner');
  }

  // ---- Avatar configuration ----
  // Maps backend avatar key -> avatar option index (0-based)
  var AVATAR_INDEX = {
    'default': 0,
    'avatar1': 0,
    'avatar2': 1,
    'avatar3': 2
  };

  // Maps avatar option index -> backend avatar key sent on save
  var AVATAR_KEYS = ['avatar1', 'avatar2', 'avatar3'];

  // Image paths relative to profile.html (frontend/account/)
  var avatarPaths = [
    '../assets/images/profile-pic.png',
    '../assets/images/profile-pic2.png',
    '../assets/images/profile-pic3.png'
  ];

  var selectedAvatarIndex = 0;

  // ---- Render helpers ----
  function renderLoading() {
    if (els.displayNameInput) {
      els.displayNameInput.value = '';
      els.displayNameInput.placeholder = 'Loading...';
    }
    if (els.emailInput) {
      els.emailInput.value = '';
      els.emailInput.placeholder = 'Loading...';
    }
  }

  function renderProfile(data) {
    if (els.displayNameInput) {
      els.displayNameInput.value = data.username || '';
      els.displayNameInput.placeholder = 'Enter display name';
    }
    if (els.emailInput) {
      els.emailInput.value = data.email || '';
      els.emailInput.placeholder = 'Enter email address';
    }
    if (els.sidebarProfileName) {
      els.sidebarProfileName.textContent = data.username || '';
    }

    var avatarIndex = (data.avatar && AVATAR_INDEX[data.avatar] !== undefined)
      ? AVATAR_INDEX[data.avatar]
      : 0;
    selectedAvatarIndex = avatarIndex;

    var avatarSrc = avatarPaths[avatarIndex];
    if (els.sidebarAvatar) {
      els.sidebarAvatar.src = avatarSrc;
    }
    if (els.modalCurrentAvatar) {
      els.modalCurrentAvatar.src = avatarSrc;
    }

    document.querySelectorAll('.avatar-option').forEach(function (opt) {
      var idx = parseInt(opt.getAttribute('data-avatar'), 10);
      opt.classList.toggle('selected', idx === avatarIndex);
    });
  }

  function renderError(message) {
    if (els.profileErrorBanner) {
      els.profileErrorBanner.textContent = message || 'Failed to load profile. Please try again.';
      els.profileErrorBanner.style.display = 'block';
    }
  }

  function hideError() {
    if (els.profileErrorBanner) {
      els.profileErrorBanner.style.display = 'none';
    }
  }

  // ---- Data loading ----
  function loadProfileData() {
    renderLoading();
    AppApi.getProfile()
      .then(function (data) {
        hideError();
        renderProfile(data);
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          renderError('Failed to load profile. Please try again.');
        }
      });
  }

  // ---- Avatar modal ----
  function openEditAvatarModal() {
    if (els.modalCurrentAvatar && els.sidebarAvatar) {
      els.modalCurrentAvatar.src = els.sidebarAvatar.src;
    }
    els.editAvatarModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEditAvatarModal() {
    els.editAvatarModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function selectAvatar(index) {
    selectedAvatarIndex = index;
    document.querySelectorAll('.avatar-option').forEach(function (opt) {
      opt.classList.remove('selected');
    });
    var target = document.querySelector('[data-avatar="' + index + '"]');
    if (target) {
      target.classList.add('selected');
    }
    if (els.modalCurrentAvatar) {
      els.modalCurrentAvatar.src = avatarPaths[index];
    }
  }

  function saveAvatar() {
    var avatarKey = AVATAR_KEYS[selectedAvatarIndex] || 'avatar1';
    AppApi.updateAvatar(avatarKey)
      .then(function () {
        if (els.sidebarAvatar) {
          els.sidebarAvatar.src = avatarPaths[selectedAvatarIndex];
        }
        closeEditAvatarModal();
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          alert('Failed to update avatar. Please try again.');
        }
      });
  }

  // ---- Policy modals ----
  function openPrivacyModal() {
    els.privacyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePrivacyModal() {
    els.privacyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openTermsModal() {
    els.termsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeTermsModal() {
    els.termsModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Hamburger menu ----
  function toggleSidebar() {
    els.hamburgerMenu.classList.toggle('active');
    els.sidebar.classList.toggle('active');
    els.sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = els.sidebar.classList.contains('active') ? 'hidden' : '';
  }

  // ---- Validation helpers ----
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateDisplayName(name) {
    return name.trim().length > 0;
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  // ---- Utility ----
  function focusInput(inputId) {
    var el = document.getElementById(inputId);
    if (el) {
      el.focus();
    }
  }

  // ---- Password form ----
  function savePassword() {
    var currentPassword = els.currentPasswordInput.value;
    var newPassword = els.newPasswordInput.value;
    var confirmPassword = els.confirmPasswordInput.value;
    var hasError = false;

    if (!currentPassword) {
      els.currentPasswordInput.classList.add('error');
      els.currentPasswordError.classList.add('show');
      hasError = true;
    } else {
      els.currentPasswordInput.classList.remove('error');
      els.currentPasswordError.classList.remove('show');
    }

    if (!validatePassword(newPassword)) {
      els.newPasswordInput.classList.add('error');
      els.newPasswordError.classList.add('show');
      hasError = true;
    } else {
      els.newPasswordInput.classList.remove('error');
      els.newPasswordError.classList.remove('show');
    }

    if (newPassword !== confirmPassword) {
      els.confirmPasswordInput.classList.add('error');
      els.confirmPasswordError.classList.add('show');
      hasError = true;
    } else {
      els.confirmPasswordInput.classList.remove('error');
      els.confirmPasswordError.classList.remove('show');
    }

    if (!hasError) {
      alert('Password changed successfully!');
      resetPasswordForm();
    }
  }

  function resetPasswordForm() {
    els.currentPasswordInput.value = '';
    els.newPasswordInput.value = '';
    els.confirmPasswordInput.value = '';
    document.querySelectorAll('.form-input').forEach(function (input) {
      input.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(function (error) {
      error.classList.remove('show');
    });
  }

  // ---- Event binding ----
  function bindEvents() {
    els.hamburgerMenu.addEventListener('click', toggleSidebar);
    els.sidebarOverlay.addEventListener('click', toggleSidebar);

    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          document.querySelectorAll('.nav-item').forEach(function (nav) {
            nav.classList.remove('active');
          });
          this.classList.add('active');

          if (window.innerWidth <= 768) {
            toggleSidebar();
          }
        }
      });
    });

    els.editAvatarModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeEditAvatarModal();
      }
    });

    els.privacyModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closePrivacyModal();
      }
    });

    els.termsModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeTermsModal();
      }
    });

    els.emailInput.addEventListener('blur', function () {
      if (!validateEmail(this.value)) {
        this.classList.add('error');
        els.emailError.classList.add('show');
      } else {
        this.classList.remove('error');
        els.emailError.classList.remove('show');
      }
    });

    els.displayNameInput.addEventListener('blur', function () {
      if (!validateDisplayName(this.value)) {
        this.classList.add('error');
        els.displayNameError.classList.add('show');
      } else {
        this.classList.remove('error');
        els.displayNameError.classList.remove('show');
      }
    });

    els.newPasswordInput.addEventListener('blur', function () {
      if (this.value && !validatePassword(this.value)) {
        this.classList.add('error');
        els.newPasswordError.classList.add('show');
      } else {
        this.classList.remove('error');
        els.newPasswordError.classList.remove('show');
      }
    });

    els.confirmPasswordInput.addEventListener('blur', function () {
      var newPwd = els.newPasswordInput.value;
      if (this.value && this.value !== newPwd) {
        this.classList.add('error');
        els.confirmPasswordError.classList.add('show');
      } else {
        this.classList.remove('error');
        els.confirmPasswordError.classList.remove('show');
      }
    });

    var sections = document.querySelectorAll('.account-section');
    var navItems = document.querySelectorAll('.nav-item');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sectionId = entry.target.getAttribute('id');
          navItems.forEach(function (item) {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + sectionId) {
              item.classList.add('active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        els.hamburgerMenu.classList.remove('active');
        els.sidebar.classList.remove('active');
        els.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Expose functions called via HTML onclick attributes ----
  window.openEditAvatarModal = openEditAvatarModal;
  window.closeEditAvatarModal = closeEditAvatarModal;
  window.selectAvatar = selectAvatar;
  window.saveAvatar = saveAvatar;
  window.openPrivacyModal = openPrivacyModal;
  window.closePrivacyModal = closePrivacyModal;
  window.openTermsModal = openTermsModal;
  window.closeTermsModal = closeTermsModal;
  window.focusInput = focusInput;
  window.savePassword = savePassword;
  window.resetPasswordForm = resetPasswordForm;

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    bindEvents();
    loadProfileData();
  });
})();
