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
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            var isOverlay = mobileOverlay.contains(e.target);
            var isHamburger = hamburger.contains(e.target);
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
    // MOBILE SEARCH ICON TOGGLE (separate from hamburger menu)
    // ============================================================
    var navSearchToggle = document.getElementById('navSearchToggle');
    var mobileSearchBar = document.getElementById('mobileSearchBar');

    if (navSearchToggle && mobileSearchBar) {
        navSearchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var isActive = mobileSearchBar.classList.toggle('active');
            navSearchToggle.classList.toggle('active', isActive);
            if (isActive) {
                // Close the hamburger menu if it happens to be open
                if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                    mobileOverlay.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
                var input = mobileSearchBar.querySelector('input');
                if (input) setTimeout(function() { input.focus(); }, 50);
            }
        });

        document.addEventListener('click', function(e) {
            var isBar = mobileSearchBar.contains(e.target);
            var isToggle = navSearchToggle.contains(e.target);
            if (!isBar && !isToggle && mobileSearchBar.classList.contains('active')) {
                mobileSearchBar.classList.remove('active');
                navSearchToggle.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileSearchBar.classList.contains('active')) {
                mobileSearchBar.classList.remove('active');
                navSearchToggle.classList.remove('active');
            }
        });
    }

    // ============================================================
    // AUTO-HIDE NAVBAR ON SCROLL
    // ============================================================
    var nav = document.querySelector('nav');
    if (nav) {
        var lastScroll = 0;
        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var currentScroll = window.pageYOffset;
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
    var backToTop = document.getElementById('backToTop');
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
    // SCROLL PROGRESS BAR (uses transform for performance)
    // ============================================================
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#d00000,#ff4d4d);z-index:10001;width:100%;transform:scaleX(0);transform-origin:left;will-change:transform;';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        progressBar.style.transform = 'scaleX(' + scrollPercent + ')';
    }, { passive: true });

    // ============================================================
    // SEARCH FUNCTIONALITY — Dropdown overlay
    // ============================================================
    var searchIndex = [
        { title: 'Home', page: 'index.html', section: '', keywords: 'home main vicfalls televivi voice victoria falls newsroom', desc: 'Victoria Falls leading video newsroom. News, sports, tourism and festival stories.' },
        { title: 'Latest News', page: 'news.html', section: '', keywords: 'news latest headline story education sports entertainment culture community', desc: 'Stay informed with the latest stories from Victoria Falls.' },
        { title: 'Events', page: 'events.html', section: '', keywords: 'events upcoming calendar festival boxing marathon football sport music community tourism', desc: 'Discover exciting events happening in Victoria Falls.' },
        { title: 'TV & Videos', page: 'tv.html', section: '', keywords: 'tv videos watch gallery interview documentary podcast faith news sports music', desc: 'Watch videos and coverage from Victoria Falls.' },
        { title: 'Live Broadcasts', page: 'live.html', section: '', keywords: 'live broadcast stream ongoing', desc: 'Watch ongoing events and live coverage from Victoria Falls.' },
        { title: 'About Us', page: 'about.html', section: '', keywords: 'about team mission vision values who we are', desc: 'Vic Falls Televivi is Victoria Falls premier independent media company.' },
        { title: 'Contact Us', page: 'contact.html', section: '', keywords: 'contact email phone address location partnership advertising', desc: 'Get in touch with the VicFalls Televivi team.' },
        { title: 'Business', page: 'business.html', section: '', keywords: 'business conference economy marathon', desc: 'Business news and economic coverage from Victoria Falls.' },
        { title: 'Sports', page: 'sports.html', section: '', keywords: 'sports athletics boxing marathon football school nash zambezi zone', desc: 'Sports coverage — athletics, boxing, marathons and school sports.' },
        { title: 'Tourism', page: 'tourism.html', section: '', keywords: 'tourism travel visit waterfall cruise wildlife adventure bungee', desc: 'Victoria Falls tourism coverage.' },
        { title: 'Culture', page: 'culture.html', section: '', keywords: 'culture lifestyle music festival arts traditions', desc: 'Culture and lifestyle stories from Victoria Falls.' },
        { title: 'Entertainment', page: 'enterainment.html', section: '', keywords: 'entertainment music festival performance nightlife', desc: 'Entertainment coverage — music, festivals and performances.' },
        { title: 'Community', page: 'community.html', section: '', keywords: 'community youth initiative clean up development charity', desc: 'Community stories — youth initiatives and local development.' },
        { title: 'Major Events', page: 'major-events.html', section: '', keywords: 'major events festivals tournaments gatherings', desc: 'Major events in Victoria Falls.' },
        { title: 'R. Sibanda: The Game Changer', page: 'news.html', section: '', keywords: 'r sibanda game changer mosi oa tunya high school athletics student', desc: 'Our video profiles R. Sibanda, transforming school sports in Matabeleland North.' },
        { title: 'Zambezi Zone Athletics Day 2', page: 'news.html', section: '', keywords: 'zambezi zone athletics day 2 nash 2024 medals student athletes track field', desc: 'Local schools won more than 50 medals at NASH 2024.' },
        { title: 'DT BIO Mudimba Mapopoma Festival', page: 'news.html', section: '', keywords: 'dt bio mudimba mapopoma festival music performance live', desc: 'Electric performance by DT BIO Mudimba at Mapopoma Festival.' },
        { title: 'MajorXX Vlog Victoria Falls', page: 'news.html', section: '', keywords: 'majorxx vlog lifestyle local life creators performers', desc: 'Lifestyle coverage following young creators across Victoria Falls.' },
        { title: 'Tourism Recovery Victoria Falls', page: 'news.html', section: '', keywords: 'tourism recovery visitor experiences lodges bookings zambezi guided tours', desc: 'Tour operators report strong bookings as travellers return.' },
        { title: 'Community Clean-Up Youth Sport', page: 'news.html', section: '', keywords: 'community clean up youth sport programs unite residents school teams', desc: 'Clean-up initiative supporting youth sports fields and tourism trails.' },
        { title: 'Mapopoma Festival Event', page: 'events.html', section: 'music', keywords: 'mapopoma festival live music dance cultural performances victoria falls', desc: 'Live coverage of music, dance and cultural performances.', category: 'music' },
        { title: 'Zambezi Zone Athletics', page: 'events.html', section: 'sports', keywords: 'zambezi zone athletics nash 2024 victoria falls teams championships', desc: 'Victoria Falls teams compete in Zambezi Zone Athletics.', category: 'sports' },
        { title: 'Community Clean-Up Day', page: 'events.html', section: 'community', keywords: 'community clean up day residents youth groups tourism routes', desc: 'Residents and youth groups join forces to keep tourism routes clean.', category: 'community' },
        { title: 'Tourism Partner Forum', page: 'events.html', section: 'tourism', keywords: 'tourism partner forum elephant hills hotel investment training', desc: 'Discuss new tourism products and investment opportunities.', category: 'tourism' },
        { title: 'Health Awareness Campaign', page: 'events.html', section: 'community', keywords: 'health awareness campaign malaria screenings family health clinics', desc: 'Free malaria screenings and family health education.', category: 'community' },
        { title: 'Victoria Falls Boxing Night', page: 'events.html', section: 'sports', keywords: 'boxing night tournament victoria falls gymnasium contenders ring', desc: 'Local boxing contenders take the ring.', category: 'sports' },
        { title: 'Philani Moyo Interview', page: 'tv.html', section: 'interview', keywords: 'philani moyo exclusive interview vision hwange west', desc: 'Philani Moyo opens up on his vision for Hwange West.', category: 'interview' },
        { title: 'Hon Philani Moyo CAB3', page: 'tv.html', section: 'interview', keywords: 'hon philani moyo cab3 hwange west victoria falls', desc: 'Hon. Philani Moyo CAB3 Hwange West.', category: 'interview' },
        { title: 'Emmanuel Hove Book Launch', page: 'tv.html', section: 'news', keywords: 'author emmanuel hove book launch poverty must go', desc: 'Author Emmanuel Hove book launch.', category: 'news' },
        { title: 'Pastor Dillon Connecting with God', page: 'tv.html', section: 'faith', keywords: 'connecting god pastor dillon faith spiritual', desc: 'Connecting with God by Pastor Dillon.', category: 'faith' },
        { title: 'Donga Partridge Man of the Match', page: 'tv.html', section: 'sports', keywords: 'donga partridge man match vic falls herentals football', desc: 'Donga Partridge Man of the Match.', category: 'sports' },
        { title: 'Aqua Stars FC Post Match', page: 'tv.html', section: 'sports', keywords: 'aqua stars fc post match reaction coach rodgers ndlovu', desc: 'Post match reaction Aqua Stars FC.', category: 'sports' },
        { title: 'Vic Falls Herentals Impressive Run', page: 'tv.html', section: 'sports', keywords: 'victoria falls city herentals impressive run football', desc: 'Victoria Falls City Herentals continue impressive run.', category: 'sports' },
        { title: 'Wild Horizons Rangers Graduation', page: 'tv.html', section: 'news', keywords: 'wild horizons rangers graduation program 2026 mosi grill', desc: 'Wild Horizons Rangers graduation program.', category: 'news' },
        { title: 'BigBoi Huncho Journey', page: 'tv.html', section: 'interview', keywords: 'bigboi huncho journey struggles passion music vision', desc: 'BigBoi Huncho shares his journey and music vision.', category: 'interview' },
        { title: 'One Love Skateboarding Dreams', page: 'tv.html', section: 'news', keywords: 'one love skateboarding dreams victoria falls', desc: 'One Love brings skateboarding dreams to Victoria Falls.', category: 'news' },
        { title: 'Adullam Cave Rehabilitation', page: 'tv.html', section: 'documentary', keywords: 'adullam cave rehabilitation centre hope restoration', desc: 'Inside Adullam Cave Rehabilitation Centre.', category: 'documentary' },
        { title: 'Africa Day Expo 2026', page: 'tv.html', section: 'documentary', keywords: 'road africa day expo 2026 documentary', desc: 'Road to the Africa Day Expo 2026.', category: 'documentary' },
        { title: 'Pastor Dillon Day of Salvation', page: 'tv.html', section: 'faith', keywords: 'pastor dillon day salvation faith', desc: 'Pastor Dillon Day of Salvation.', category: 'faith' },
        { title: 'Vic Falls Herentals vs Nkayi', page: 'tv.html', section: 'sports', keywords: 'rome vic falls herentals nkayi utd football 3-0', desc: 'Vic Falls Herentals 3-0 Nkayi Utd.', category: 'sports' },
        { title: 'Pmaxy Impilo Music Video', page: 'tv.html', section: 'music', keywords: 'pmaxy jaden drip impilo official music video', desc: 'Pmaxy ft Jaden Drip Impilo official music video.', category: 'music' },
        { title: 'Coach Alex Garikayi Muringa', page: 'tv.html', section: 'interview', keywords: 'coach alex garikayi muringa profile', desc: 'Coach Alex Garikayi Muringa profile.', category: 'interview' },
        { title: 'The Majestic Podcast Episode 1', page: 'tv.html', section: 'podcast', keywords: 'majestic podcast episode 1 live', desc: 'Episode 1 of The Majestic Podcast.', category: 'podcast' },
        { title: 'Connection with God Pastor Jonathan', page: 'tv.html', section: 'faith', keywords: 'connection god pastor jonathan madison wenger', desc: 'Connection with God by Pastor Jonathan and Madison Wenger.', category: 'faith' },
        { title: 'Choose Purpose Over Pressure', page: 'tv.html', section: 'news', keywords: 'choose purpose over pressure chief mvuthu youth substance abuse', desc: 'Chief Mvuthu urges youth to rise above peer pressure.', category: 'news' },
        { title: 'Mapopoma Festival Recap', page: 'live.html', section: '', keywords: 'mapopoma festival recap live highlights performances audience', desc: 'Live highlights from the Mapopoma Festival stage.' },
        { title: 'Community News Bulletin', page: 'live.html', section: '', keywords: 'community news bulletin local leadership youth initiatives development', desc: 'Updates from local leadership and community development.' },
        { title: 'School Athletics Highlights', page: 'live.html', section: '', keywords: 'school athletics highlights zambezi zone mosi oa tunya sports competitions', desc: 'Latest from Zambezi Zone Athletics and school sports.' },
        { title: 'Victoria Falls Marathon', page: 'sports.html', section: '', keywords: 'marathon victoria falls athletes world race scenery endurance adventure', desc: 'Annual marathon event attracting athletes from around the world.' },
        { title: 'Music Live Show', page: 'business.html', section: '', keywords: 'music live show night performances entertainment', desc: 'Unforgettable night of live music and performances.' },
        { title: 'Bungee Jumping', page: 'tourism.html', section: '', keywords: 'bungee jumping leap faith exhilarating adventure', desc: 'Ultimate leap of faith with bungee jumping experience.' },
        { title: 'Wildlife Sightings', page: 'tourism.html', section: '', keywords: 'wildlife sighting nature beauty animals', desc: 'Discover the beauty of nature through wildlife sightings.' },
        { title: 'Community Gathering', page: 'community.html', section: '', keywords: 'community gathering connection culture celebration', desc: 'Community day of connection, culture and celebration.' },
        { title: 'Waterfall Experience', page: 'tourism.html', section: '', keywords: 'waterfall breathtaking beauty majestic cascading waters natural wonder', desc: 'Breathtaking beauty of the majestic waterfall.' },
        { title: 'Boat Cruise', page: 'tourism.html', section: '', keywords: 'boat cruise relaxing riverside views peaceful journey water', desc: 'Relaxing boat cruise with stunning riverside views.' },
        { title: 'Explored Pipeline', page: 'business.html', section: '', keywords: 'pipeline explored developments milestones progress', desc: 'Latest updates on the explored pipeline developments.' }
    ];

    function buildSearchDropdown(container) {
        var existing = container.querySelector('.search-dropdown');
        if (existing) return existing;

        var dd = document.createElement('div');
        dd.className = 'search-dropdown';
        dd.style.display = 'none';
        container.style.position = 'relative';
        container.appendChild(dd);
        return dd;
    }

    function performSearch(searchTerm, inputEl) {
        var q = searchTerm.trim().toLowerCase();
        if (!q) return;

        var container = inputEl.closest('.search-box');
        if (!container) return;
        var dropdown = buildSearchDropdown(container);

        var terms = q.split(/\s+/).filter(Boolean);
        var matches = [];
        var seen = {};

        for (var i = 0; i < searchIndex.length; i++) {
            var item = searchIndex[i];
            var haystack = (item.title + ' ' + item.keywords + ' ' + item.desc).toLowerCase();
            var allTermsMatch = true;
            for (var t = 0; t < terms.length; t++) {
                if (haystack.indexOf(terms[t]) === -1) {
                    allTermsMatch = false;
                    break;
                }
            }
            if (allTermsMatch) {
                var key = item.page + '|' + item.title;
                if (!seen[key]) {
                    seen[key] = true;
                    matches.push(item);
                }
            }
        }

        if (matches.length === 0) {
            dropdown.innerHTML = '<div class="search-dropdown-empty"><i class="fas fa-search"></i><p>No results found for <strong>"' + escapeHtml(searchTerm.trim()) + '"</strong></p><span>Try different keywords or check your spelling</span></div>';
        } else {
            var html = '<div class="search-dropdown-header">Results for "' + escapeHtml(searchTerm.trim()) + '"</div>';
            html += '<div class="search-dropdown-list">';
            for (var j = 0; j < matches.length; j++) {
                var m = matches[j];
                var snippet = getSnippet(m.desc, q);
                var pageLabel = m.page.replace('.html', '').replace('index', 'Home');
                html += '<a href="' + m.page + '" class="search-dropdown-item">';
                html += '<div class="search-dropdown-item-page">' + escapeHtml(pageLabel) + '</div>';
                html += '<div class="search-dropdown-item-title">' + highlightText(m.title, q) + '</div>';
                html += '<div class="search-dropdown-item-desc">' + highlightText(snippet, q) + '</div>';
                html += '</a>';
            }
            html += '</div>';
            if (matches.length > 8) {
                html += '<div class="search-dropdown-footer">Showing 8 of ' + matches.length + ' results</div>';
            }
            dropdown.innerHTML = html;
        }

        dropdown.style.display = 'block';
        container.classList.add('search-open');
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function highlightText(text, query) {
        var escaped = escapeHtml(text);
        var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return escaped.replace(regex, '<mark>$1</mark>');
    }

    function getSnippet(text, query) {
        var lower = text.toLowerCase();
        var idx = lower.indexOf(query);
        if (idx === -1) return text;
        var start = Math.max(0, idx - 40);
        var end = Math.min(text.length, idx + query.length + 60);
        var snippet = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
        return snippet;
    }

    function closeAllSearchDropdowns() {
        var open = document.querySelectorAll('.search-dropdown');
        open.forEach(function(dd) {
            dd.style.display = 'none';
            var box = dd.closest('.search-box');
            if (box) box.classList.remove('search-open');
        });
    }

    var searchBtns = document.querySelectorAll('.search-box button');
    searchBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var input = this.parentElement.querySelector('input');
            if (input && input.value.trim()) {
                performSearch(input.value, input);
            }
        });
    });

    var searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(function(input) {
        var debounceTimer = null;
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(debounceTimer);
                performSearch(this.value, this);
            } else if (e.key === 'Escape') {
                closeAllSearchDropdowns();
                this.blur();
            }
        });
        input.addEventListener('input', function() {
            var self = this;
            clearTimeout(debounceTimer);
            if (!this.value.trim()) {
                closeAllSearchDropdowns();
                return;
            }
            debounceTimer = setTimeout(function() {
                performSearch(self.value, self);
            }, 200);
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            closeAllSearchDropdowns();
        }
    });

    // ============================================================
    // CONTACT FORM HANDLER (inline validation, no alert)
    // ============================================================
    var contactForms = document.querySelectorAll('#contactForm');
    contactForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = this.querySelector('input[placeholder="Full Name"]');
            var email = this.querySelector('input[type="email"]');
            var message = this.querySelector('textarea');
            var select = this.querySelector('select');
            var valid = true;
            var errors = [];

            clearFormErrors(this);

            if (name && !name.value.trim()) {
                errors.push({ field: name, msg: 'Please enter your name.' });
                valid = false;
            }
            if (email && !email.value.trim()) {
                errors.push({ field: email, msg: 'Please enter your email.' });
                valid = false;
            } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                errors.push({ field: email, msg: 'Please enter a valid email.' });
                valid = false;
            }
            if (message && !message.value.trim()) {
                errors.push({ field: message, msg: 'Please enter your message.' });
                valid = false;
            }
            if (select && !select.value) {
                errors.push({ field: select, msg: 'Please select a request type.' });
                valid = false;
            }

            if (!valid) {
                for (var i = 0; i < errors.length; i++) {
                    showFieldError(errors[i].field, errors[i].msg);
                }
                return;
            }

            var btn = this.querySelector('button[type="submit"]');
            var originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            var self = this;
            setTimeout(function() {
                showToast('Thank you for your message! We will get back to you within 24 hours.', 'success');
                self.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1200);
        });
    });

    function clearFormErrors(form) {
        var existing = form.querySelectorAll('.field-error');
        existing.forEach(function(el) { el.remove(); });
        var fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(function(f) { f.style.borderColor = ''; });
    }

    function showFieldError(field, msg) {
        field.style.borderColor = '#d00000';
        var err = document.createElement('div');
        err.className = 'field-error';
        err.textContent = msg;
        field.parentNode.insertBefore(err, field.nextSibling);
    }

    // ============================================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================================
    function showToast(message, type) {
        var toast = document.createElement('div');
        toast.className = 'toast-notification toast-' + (type || 'info');
        var icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
        document.body.appendChild(toast);
        requestAnimationFrame(function() {
            toast.classList.add('toast-show');
        });
        setTimeout(function() {
            toast.classList.remove('toast-show');
            setTimeout(function() { toast.remove(); }, 400);
        }, 4000);
    }

    // ============================================================
    // VIDEO MODAL
    // ============================================================
    var modal = document.getElementById('videoModal');
    var modalIframe = document.getElementById('modalIframe');
    var closeModal = document.getElementById('closeModal');

    if (modal && modalIframe && closeModal) {
        var allCards = document.querySelectorAll('.video-card, .featured-card');

        allCards.forEach(function(card) {
            card.addEventListener('click', function() {
                var videoId = this.dataset.videoId;
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
    // CATEGORY FILTERS
    // ============================================================
    function setupFilters(containerSelector, cardSelector) {
        var filterBtns = document.querySelectorAll(containerSelector + ' .filter-btn');
        var allCards = document.querySelectorAll(cardSelector);
        if (!filterBtns.length || !allCards.length) return;

        function applyFilter(filterValue) {
            allCards.forEach(function(card) {
                var category = card.dataset.category;
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

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                applyFilter(this.dataset.filter);
            });
        });

        var activeBtn = document.querySelector(containerSelector + ' .filter-btn.active');
        if (activeBtn) {
            applyFilter(activeBtn.dataset.filter);
        } else {
            applyFilter('all');
        }
    }

    setupFilters('.event-filters', '.all-events .card');
    setupFilters('.category-filters', '.video-card');

    // ============================================================
    // NEWSLETTER FORM (inline toast, no alert)
    // ============================================================
    var newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                    showToast('Please enter a valid email address.', 'error');
                    return;
                }
                var btn = this.querySelector('button');
                var originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                var self = this;
                setTimeout(function() {
                    showToast('Thank you for subscribing! Stay tuned for our latest stories.', 'success');
                    self.reset();
                    btn.innerHTML = originalHtml;
                    btn.disabled = false;
                }, 1000);
            }
        });
    });

    // ============================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ============================================================
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    if (revealElements.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
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
    var statNumbers = document.querySelectorAll('.stats .stat-box h2, .about-stats .stat-box h4, .hero-stats strong');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var text = el.textContent.trim();
                    var multiplier = 1;
                    if (/k/i.test(text)) multiplier = 1000;
                    var num = parseInt(text.replace(/[^0-9]/g, '')) * multiplier;
                    if (!isNaN(num) && num > 0) {
                        var suffix = text.replace(/[0-9]/g, '');
                        var current = 0;
                        var step = Math.max(1, Math.floor(num / 40));
                        var timer = setInterval(function() {
                            current += step;
                            if (current >= num) {
                                current = num;
                                clearInterval(timer);
                            }
                            var display = multiplier === 1000 ? Math.round(current / 1000) + 'K' : current;
                            el.textContent = display + suffix.replace(/k/i, '');
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
