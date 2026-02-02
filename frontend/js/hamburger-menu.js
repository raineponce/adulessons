
    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('active');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const menu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');

        if (menu && hamburger && !menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
