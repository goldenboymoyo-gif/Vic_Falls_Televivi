(function() {
    'use strict';

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
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            const isOverlay = mobileOverlay.contains(e.target);
            const isHamburger = hamburger.contains(e.target);
            if (!isOverlay && !isHamburger && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================================
    // AUTO-HIDE NAVBAR ON SCROLL
    // ============================================================
    const nav = document.querySelector('nav');
    if (nav) {
        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScroll = window.pageYOffset;
                    if (currentScroll > 80 && currentScroll > lastScroll) {
                        nav.style.transform = 'translateY(-100%)';
                    } else {
                        nav.style.transform = 'translateY(0)';
                    }
                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
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
        }, { passive: true });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#d00000,#ff4d4d);z-index:10001;transition:width 0.1s;width:0;';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================
    function performSearch(searchTerm) {
        if (!searchTerm.trim()) return;
        const q = searchTerm.trim().toLowerCase();
        const routes = {
            'news': ['news', 'latest', 'headline', 'story'],
            'events': ['event', 'upcoming', 'calendar', 'boxing', 'marathon', 'football', 'sport'],
            'live': ['live', 'broadcast', 'stream'],
            'tv.html': ['video', 'tv', 'watch', 'gallery', 'tour', 'visit', 'falls', 'travel'],
            'about': ['about', 'who', 'team', 'mission'],
            'contact': ['contact', 'email', 'phone', 'address']
        };
        for (const [page, keywords] of Object.entries(routes)) {
            if (keywords.some(k => q.includes(k))) {
                window.location.href = page + '.html';
                return;
            }
        }
        window.location.href = 'news.html';
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
            if (e.key === 'Enter') performSearch(this.value);
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
            const select = this.querySelector('select');
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
            if (select && !select.value) {
                errorMsg += 'Please select a request type.\n';
                valid = false;
            }

            if (valid) {
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                setTimeout(function() {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1200);
            } else {
                alert(errorMsg);
            }
        });
    });

    // ============================================================
    // VIDEO MODAL
    // ============================================================
    const modal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeModal = document.getElementById('closeModal');

    if (modal && modalIframe && closeModal) {
        const allCards = document.querySelectorAll('.video-card');

        allCards.forEach(card => {
            card.addEventListener('click', function() {
                const videoId = this.dataset.videoId;
                if (!videoId) return;
                modalIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
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
    // HERO VIDEO - play overlay fallback for autoplay reliability
    // ============================================================
    const heroPlaceholder = document.querySelector('.hero-video-placeholder');
    if (heroPlaceholder) {
        function createHeroIframe(videoId) {
            const iframe = document.createElement('iframe');
            iframe.className = 'hero-video';
            iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1';
            iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
            iframe.setAttribute('allowfullscreen', '');
            iframe.loading = 'eager';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = '0';
            return iframe;
        }

        function playHeroVideo() {
            const videoId = heroPlaceholder.dataset.videoId;
            if (!videoId) return;
            const container = heroPlaceholder.parentElement;
            const iframe = createHeroIframe(videoId);
            // Remove placeholder and insert iframe
            container.insertBefore(iframe, container.firstChild);
            heroPlaceholder.style.display = 'none';
        }

        heroPlaceholder.addEventListener('click', playHeroVideo);
        heroPlaceholder.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') playHeroVideo();
        });
    }

    // ============================================================
    // CATEGORY FILTERS
    // ============================================================
    function setupFilters(containerSelector, cardSelector) {
        const filterBtns = document.querySelectorAll(containerSelector + ' .filter-btn');
        const allCards = document.querySelectorAll(cardSelector);
        if (!filterBtns.length || !allCards.length) return;

        function applyFilter(filterValue) {
            allCards.forEach((card, index) => {
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
    // NEWSLETTER FORM
    // ============================================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                    alert('Please enter a valid email address.');
                    return;
                }
                const btn = this.querySelector('button');
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                setTimeout(function() {
                    alert('Thank you for subscribing! Stay tuned for our latest stories.');
                    form.reset();
                    btn.innerHTML = originalHtml;
                    btn.disabled = false;
                }, 1000);
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

    // ============================================================
    // COUNTER ANIMATION FOR STATS
    // ============================================================
    const statNumbers = document.querySelectorAll('.about-stats .stat-box h4, .hero-stats strong');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!isNaN(num) && num > 0) {
                        const suffix = text.replace(/[0-9]/g, '');
                        let current = 0;
                        const step = Math.max(1, Math.floor(num / 40));
                        const timer = setInterval(function() {
                            current += step;
                            if (current >= num) {
                                current = num;
                                clearInterval(timer);
                            }
                            el.textContent = current.toLocaleString() + suffix;
                        }, 30);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function(el) {
            counterObserver.observe(el);
        });
    }

})();
