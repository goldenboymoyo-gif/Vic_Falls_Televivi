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



(function() {
    // ============================================================
    // VIDEO MODAL (Placeholder)
    // ============================================================
    const modal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const allCards = document.querySelectorAll('.video-card');

    allCards.forEach(card => {
        card.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeVideoModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeVideoModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // ============================================================
    // CATEGORY FILTERS – FIXED
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Helper: apply filter to all cards
    function applyFilter(filterValue) {
        allCards.forEach(card => {
            const category = card.dataset.category;
            // Show if "all" or category matches
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'scale(0.95)';
            }
        });
    }

    // Add click listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            const filter = this.dataset.filter;
            applyFilter(filter);
        });
    });

    // ============================================================
    // OPTIONAL: "View All" buttons – reset to "ALL VIDEOS"
    // ============================================================
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Find the "ALL VIDEOS" button and click it
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) {
                allBtn.click();
                // Scroll to top of videos section
                document.querySelector('.videos-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // ENSURE FILTER WORKS AFTER PAGE LOAD (safety)
    // ============================================================
    // Initially show all videos (if any filter was previously applied)
    setTimeout(() => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            applyFilter(activeBtn.dataset.filter);
        } else {
            applyFilter('all');
        }
    }, 100);

})();



(function() {
    // ============================================================
    // VIDEO MODAL – YouTube
    // ============================================================
    const modal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeModal = document.getElementById('closeModal');

    // All video cards (featured + small)
    const allCards = document.querySelectorAll('.video-card, .featured-card');

    // Open modal with YouTube video
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            if (!videoId) return;
            modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeVideoModal() {
        modal.classList.remove('active');
        modalIframe.src = ''; // stop video
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeVideoModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // ============================================================
    // CATEGORY FILTERS
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    function applyFilter(filterValue) {
        allCards.forEach(card => {
            const category = card.dataset.category;
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = '';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'scale(0.95)';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFilter(this.dataset.filter);
        });
    });

    // Ensure initial state shows all
    setTimeout(() => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            applyFilter(activeBtn.dataset.filter);
        } else {
            applyFilter('all');
        }
    }, 100);

})();




