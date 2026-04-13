(function () {
  // ---- DOM element cache ----
  var els = {};

  function cacheElements() {
    els.sidebarAvatar      = document.getElementById('sidebarAvatar');
    els.sidebarProfileName = document.getElementById('sidebarProfileName');
    els.errorBanner        = document.getElementById('settingsErrorBanner');
    els.hamburgerMenu      = document.getElementById('hamburgerMenu');
    els.sidebar            = document.querySelector('.sidebar');
    els.sidebarOverlay     = document.getElementById('sidebarOverlay');
    els.resetModal         = document.getElementById('resetProgressModal');
    els.deactivateModal    = document.getElementById('deactivateAccountModal');
    els.deleteModal        = document.getElementById('deleteAccountModal');
    els.signOutLink        = document.querySelector('.nav-item.sign-out');
  }

  // ---- Avatar configuration (matches profile.js) ----
  var AVATAR_INDEX = {
    'default': 0,
    'avatar1': 0,
    'avatar2': 1,
    'avatar3': 2
  };

  var avatarPaths = [
    '../assets/images/profile-pic.png',
    '../assets/images/profile-pic2.png',
    '../assets/images/profile-pic3.png'
  ];

  // ---- Error banner ----
  function showError(message) {
    if (els.errorBanner) {
      els.errorBanner.textContent = message || 'Something went wrong. Please try again.';
      els.errorBanner.style.display = 'block';
    }
  }

  function hideError() {
    if (els.errorBanner) {
      els.errorBanner.style.display = 'none';
    }
  }

  // ---- Load profile data (sidebar) ----
  function loadProfileData() {
    AppApi.getProfile()
      .then(function (data) {
        hideError();
        if (els.sidebarProfileName) {
          els.sidebarProfileName.textContent = data.username || '';
        }
        var idx = (data.avatar && AVATAR_INDEX[data.avatar] !== undefined)
          ? AVATAR_INDEX[data.avatar]
          : 0;
        if (els.sidebarAvatar) {
          els.sidebarAvatar.src = avatarPaths[idx];
        }
      })
      .catch(function (err) {
        if (!AppApi.handleAuthError(err)) {
          showError(err.message || 'Failed to load profile. Please try again.');
        }
      });
  }

  // ---- Toggle switch ----
  function toggleSwitch(element) {
    element.classList.toggle('active');
    var knob = element.querySelector('.toggle-knob');
    if (element.classList.contains('active')) {
      knob.textContent = 'On';
    } else {
      knob.textContent = 'Off';
    }
  }

  // ---- Reset Progress Modal ----
  function openResetModal() {
    els.resetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResetModal() {
    els.resetModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function confirmReset() {
    alert('Progress has been reset successfully!');
    closeResetModal();
  }

  // ---- Deactivate Account Modal ----
  function openDeactivateModal() {
    els.deactivateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeactivateModal() {
    els.deactivateModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function confirmDeactivate() {
    alert('Your account has been deactivated.');
    closeDeactivateModal();
  }

  // ---- Delete Account Modal ----
  function openDeleteModal() {
    els.deleteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    els.deleteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function confirmDelete() {
    alert('Your account has been permanently deleted.');
    closeDeleteModal();
  }

  // ---- Sign Out ----
  function signOut() {
    AppApi.request('/auth/logout', { method: 'POST' })
      .then(function () {
        window.location.href = '/login.html';
      })
      .catch(function () {
        window.location.href = '/login.html';
      });
  }

  // ---- Hamburger menu ----
  function toggleSidebar() {
    els.hamburgerMenu.classList.toggle('active');
    els.sidebar.classList.toggle('active');
    els.sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = els.sidebar.classList.contains('active') ? 'hidden' : '';
  }

  // ---- Event binding ----
  function bindEvents() {
    els.hamburgerMenu.addEventListener('click', toggleSidebar);
    els.sidebarOverlay.addEventListener('click', toggleSidebar);

    if (els.signOutLink) {
      els.signOutLink.addEventListener('click', function (e) {
        e.preventDefault();
        signOut();
      });
    }

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
        } else if (window.innerWidth <= 768 && href && !href.startsWith('#')) {
          toggleSidebar();
        }
      });
    });

    els.resetModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeResetModal();
      }
    });

    els.deactivateModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeDeactivateModal();
      }
    });

    els.deleteModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeDeleteModal();
      }
    });

    var sections = document.querySelectorAll('.settings-section');
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
  window.toggleSwitch = toggleSwitch;
  window.openResetModal = openResetModal;
  window.closeResetModal = closeResetModal;
  window.confirmReset = confirmReset;
  window.openDeactivateModal = openDeactivateModal;
  window.closeDeactivateModal = closeDeactivateModal;
  window.confirmDeactivate = confirmDeactivate;
  window.openDeleteModal = openDeleteModal;
  window.closeDeleteModal = closeDeleteModal;
  window.confirmDelete = confirmDelete;

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    bindEvents();
    loadProfileData();
  });
})();
