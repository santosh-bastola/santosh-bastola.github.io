/* ==========================================================================
   EXECUTIVE COMMAND CENTER INTERACTION CONTROLLER
   Santosh Bastola — Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons if loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ----------------------------------------------------------------------
       1. Theme Toggle System (Command Mode vs. Executive Mode)
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to 'dark' (Command Mode)
    const savedTheme = localStorage.getItem('exec_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('exec_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.setAttribute('data-lucide', 'moon');
        } else {
            themeIcon.setAttribute('data-lucide', 'sun');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /* ----------------------------------------------------------------------
       2. Sticky Navigation & Active Link Highlighting
       ---------------------------------------------------------------------- */
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Add shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        highlightActiveNav();
    });

    function highlightActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. Mobile Navigation Menu Toggle
       ---------------------------------------------------------------------- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--nav-bg)';
                navMenu.style.padding = '1.5rem';
                navMenu.style.borderBottom = '1px solid var(--bg-card-border)';
            }
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. Scroll Reveal Animations (Intersection Observer)
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll(
        '.value-card, .timeline-item, .expertise-card, .impact-card, .erp-card, .edu-card'
    );

    // Initial styling for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ----------------------------------------------------------------------
       5. Executive Metric Counter Animation
       ---------------------------------------------------------------------- */
    const impactNumbers = document.querySelectorAll('.impact-number');
    let animated = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                impactNumbers.forEach(num => {
                    const textContent = num.textContent.trim();
                    const value = parseInt(textContent.replace(/\D/g, ''));
                    const prefix = textContent.match(/^\D+/) ? textContent.match(/^\D+/)[0] : '';
                    const suffix = textContent.match(/\D+$/) ? textContent.match(/\D+$/)[0] : '';

                    if (!isNaN(value)) {
                        animateCounter(num, 0, value, 1500, prefix, suffix);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.getElementById('impact');
    if (impactSection) {
        countObserver.observe(impactSection);
    }

    function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            element.textContent = `${prefix}${currentVal}${suffix}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
