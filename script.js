(function() {
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link inside the overlay is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside the overlay (on the background)
    document.addEventListener('click', function(e) {
        const isOverlay = mobileOverlay.contains(e.target);
        const isHamburger = hamburger.contains(e.target);
        if (!isOverlay && !isHamburger && mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
})();


