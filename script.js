/* ============================================
   FAITH MORGAN - MASTER JAVASCRIPT
   Complete JS for all pages
   Filename: script.js
   Version: 2.0
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    function toggleMobileNav() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('open');
            
            // Toggle icon
            const toggleBtn = document.querySelector('.mobile-toggle');
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            }
        }
    }

    // Make toggleMobileNav globally accessible
    window.toggleMobileNav = toggleMobileNav;

    // Mobile toggle click handler
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.getElementById('navLinks');
        const toggleBtn = document.querySelector('.mobile-toggle');
        if (navLinks && navLinks.classList.contains('open')) {
            const isNavClick = navLinks.contains(e.target);
            const isToggleClick = toggleBtn ? toggleBtn.contains(e.target) : false;
            if (!isNavClick && !isToggleClick) {
                navLinks.classList.remove('open');
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        }
    });

    // Close mobile nav on link click
    document.querySelectorAll('#navLinks a').forEach(function(link) {
        link.addEventListener('click', function() {
            const navLinks = document.getElementById('navLinks');
            const toggleBtn = document.querySelector('.mobile-toggle');
            if (navLinks) {
                navLinks.classList.remove('open');
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');

    if (header) {
        let lastScrollY = 0;

        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;

            // Add/remove scrolled class
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll down/up (optional)
            if (scrollY > lastScrollY && scrollY > 200) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = scrollY;
        });

        // Reset header position on scroll to top
        window.addEventListener('scroll', function() {
            if (window.scrollY === 0) {
                header.style.transform = 'translateY(0)';
            }
        });
    }

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });

    // ============================================
    // ABOUT PAGE CAROUSEL FUNCTIONALITY
    // ============================================
    const carousel = document.getElementById('aboutCarousel');
    if (carousel) {
        // ===== DOM ELEMENTS =====
        const slides = carousel.querySelectorAll('.slide');
        const dots = carousel.querySelectorAll('.carousel-dots button');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const counter = carousel.querySelector('.slide-counter');

        const CONFIG = {
            interval: 30000, // 30 seconds
            pauseOnHover: true
        };

        let currentIndex = 0;
        let slideInterval = null;
        let isPaused = false;

        // ===== FUNCTIONS =====
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            slides.forEach(function(slide, i) {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === index);
            });

            if (counter) {
                counter.textContent = (index + 1) + ' / ' + slides.length;
            }

            currentIndex = index;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            if (slideInterval) clearInterval(slideInterval);
            if (!isPaused) {
                slideInterval = setInterval(nextSlide, CONFIG.interval);
            }
        }

        function stopAutoPlay() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        function resetTimer() {
            stopAutoPlay();
            startAutoPlay();
        }

        function pauseAutoPlay() {
            isPaused = true;
            stopAutoPlay();
        }

        function resumeAutoPlay() {
            isPaused = false;
            startAutoPlay();
        }

        // ===== EVENT LISTENERS =====
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nextSlide();
                resetTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                prevSlide();
                resetTimer();
            });
        }

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var index = parseInt(this.dataset.index, 10);
                if (!isNaN(index) && index !== currentIndex) {
                    goToSlide(index);
                    resetTimer();
                }
            });
        });

        // Pause on hover
        if (CONFIG.pauseOnHover) {
            carousel.addEventListener('mouseenter', pauseAutoPlay);
            carousel.addEventListener('mouseleave', resumeAutoPlay);
            carousel.addEventListener('touchstart', pauseAutoPlay);
            carousel.addEventListener('touchend', function() {
                setTimeout(resumeAutoPlay, 3000);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!carousel.closest('body')) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                resetTimer();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                resetTimer();
            }
        });

        // Image error handling
        slides.forEach(function(slide) {
            var img = slide.querySelector('img');
            if (img) {
                img.addEventListener('error', function() {
                    var figure = this.closest('figure');
                    if (figure) {
                        figure.innerHTML = `
                            <div class="fallback">
                                <i class="fas fa-image"></i>
                                <span>Image not found</span>
                                <small>${this.src.split('/').pop()}</small>
                            </div>
                        `;
                    }
                });
            }
        });

        // ===== INITIALIZE =====
        goToSlide(0);
        startAutoPlay();

        // Pause when tab is hidden
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseAutoPlay();
            } else {
                resumeAutoPlay();
            }
        });

        // Cleanup
        window.addEventListener('beforeunload', function() {
            stopAutoPlay();
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS (if any)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PAGE TRANSITION EFFECTS
    // ============================================
    // Add fade-in class to sections when they come into view
    if ('IntersectionObserver' in window) {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .pricing-card, .about-values .value').forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================
    // FORM HANDLING (Contact Page)
    // ============================================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[placeholder="Your Name"]')?.value || '';
            const email = this.querySelector('input[placeholder="Email Address"]')?.value || '';
            const subject = this.querySelector('input[placeholder="Subject"]')?.value || '';
            const message = this.querySelector('textarea')?.value || '';
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Success message
            showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification-toast');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 1rem 2rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            max-width: 400px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            animation: slideUp 0.5s ease;
            background: ${type === 'success' ? 'var(--gold)' : '#e74c3c'};
            color: ${type === 'success' ? 'var(--navy)' : 'white'};
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'all 0.5s ease';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // Add notification animation
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================
    const subscribeBtns = document.querySelectorAll('.faq-item .btn-gold, .cta-section .btn, .contact-info .btn-gold');
    subscribeBtns.forEach(function(btn) {
        if (btn.textContent.includes('Subscribe') || btn.textContent.includes('Book a Consultation')) {
            btn.addEventListener('click', function(e) {
                if (this.closest('.faq-item')) {
                    e.preventDefault();
                    const email = prompt('Please enter your email address to subscribe:');
                    if (email && isValidEmail(email)) {
                        showNotification('Thank you for subscribing! Check your email for the free ebook.', 'success');
                    } else if (email) {
                        showNotification('Please enter a valid email address.', 'error');
                    }
                }
            });
        }
    });

    // ============================================
    // CONSOLE LOG (branding)
    // ============================================
    console.log('%c Faith Morgan Agency ', 'background: #c9a84c; color: #0a1628; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Social Media Management for Authors', 'color: #8a9bb5; font-size: 14px;');
    console.log('%c Built with ♥ for authors', 'color: #8a9bb5; font-size: 12px;');

})();