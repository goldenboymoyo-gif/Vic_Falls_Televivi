(function() {
    // ============================================================
    // MOBILE MENU TOGGLE
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            const isOverlay = mobileOverlay.contains(e.target);
            const isHamburger = hamburger.contains(e.target);
            if (!isOverlay && !isHamburger && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ============================================================
    // BACK TO TOP BUTTON
    // ============================================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================
    function performSearch(searchTerm) {
        if (!searchTerm.trim()) return;
        const q = searchTerm.trim().toLowerCase();
        if (q.includes('news') || q.includes('latest') || q.includes('headline') || q.includes('story')) {
            window.location.href = 'news.html';
        } else if (q.includes('event') || q.includes('upcoming') || q.includes('calendar')) {
            window.location.href = 'events.html';
        } else if (q.includes('live') || q.includes('broadcast') || q.includes('stream')) {
            window.location.href = 'live.html';
        } else if (q.includes('video') || q.includes('tv') || q.includes('watch') || q.includes('gallery')) {
            window.location.href = 'tv.html';
        } else if (q.includes('about') || q.includes('who') || q.includes('team') || q.includes('mission')) {
            window.location.href = 'about.html';
        } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address')) {
            window.location.href = 'contact.html';
        } else if (q.includes('sport') || q.includes('boxing') || q.includes('marathon') || q.includes('football')) {
            window.location.href = 'events.html';
        } else if (q.includes('tour') || q.includes('visit') || q.includes('falls') || q.includes('travel')) {
            window.location.href = 'tv.html';
        } else {
            window.location.href = 'news.html';
        }
    }

    const searchBtns = document.querySelectorAll('.search-box button');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input) performSearch(input.value);
        });
    });

    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    });

    // ============================================================
    // CONTACT FORM HANDLER
    // ============================================================
    const contactForms = document.querySelectorAll('#contactForm');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Full Name"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            let valid = true;
            let errorMsg = '';

            if (name && !name.value.trim()) {
                errorMsg += 'Please enter your name.\n';
                valid = false;
            }
            if (email && !email.value.trim()) {
                errorMsg += 'Please enter your email.\n';
                valid = false;
            } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                errorMsg += 'Please enter a valid email address.\n';
                valid = false;
            }
            if (message && !message.value.trim()) {
                errorMsg += 'Please enter your message.\n';
                valid = false;
            }

            if (valid) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert(errorMsg);
            }
        });
    });

    // ============================================================
    // VIDEO MODAL – YouTube
    // ============================================================
    const modal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeModal = document.getElementById('closeModal');

    if (modal && modalIframe && closeModal) {
        const allCards = document.querySelectorAll('.video-card, .featured-card');

        allCards.forEach(card => {
            card.addEventListener('click', function() {
                const videoId = this.dataset.videoId;
                if (!videoId) return;
                modalIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeVideoModal() {
            modal.classList.remove('active');
            modalIframe.src = '';
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
    }

    // ============================================================
    // CATEGORY FILTERS (for events & tv pages)
    // ============================================================
    function setupFilters(containerSelector, cardSelector) {
        const filterBtns = document.querySelectorAll(containerSelector + ' .filter-btn');
        const allCards = document.querySelectorAll(cardSelector);
        if (!filterBtns.length || !allCards.length) return;

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

        setTimeout(function() {
            const activeBtn = document.querySelector(containerSelector + ' .filter-btn.active');
            if (activeBtn) {
                applyFilter(activeBtn.dataset.filter);
            } else {
                applyFilter('all');
            }
        }, 100);
    }

    setupFilters('.event-filters', '.all-events .card');
    setupFilters('.category-filters', '.video-card');

    // ============================================================
    // NEWSLETTER FORM HANDLER
    // ============================================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing! Stay tuned for updates.');
                this.reset();
            }
        });
    });

    // ============================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    if (revealElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

})();