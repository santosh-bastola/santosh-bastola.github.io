document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. THEME TOGGLE + SAVE THEME
    // ==========================================================================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const themeIcon = themeToggle.querySelector("i");
        const themeText = themeToggle.querySelector(".theme-text");

        // Load saved theme
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {

            document.documentElement.setAttribute("data-theme", savedTheme);

            if (savedTheme === "light") {

                if (themeIcon) themeIcon.className = "fa-solid fa-sun";
                if (themeText) themeText.textContent = "STANDARD MODE";

            } else {

                if (themeIcon) themeIcon.className = "fa-solid fa-moon";
                if (themeText) themeText.textContent = "COMMAND MODE";

            }

        }

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute("data-theme") || "dark";

            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);

            localStorage.setItem("theme", newTheme);

            if (newTheme === "light") {

                if (themeIcon) themeIcon.className = "fa-solid fa-sun";
                if (themeText) themeText.textContent = "STANDARD MODE";

            } else {

                if (themeIcon) themeIcon.className = "fa-solid fa-moon";
                if (themeText) themeText.textContent = "COMMAND MODE";

            }

        });

    }

    // ==========================================================================
    // 2. MOBILE MENU
    // ==========================================================================

    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = mobileToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");

            }

        });

        // Close menu after clicking link

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = mobileToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }

    // ==========================================================================
    // 3. SMOOTH MOUSE GLOW
    // ==========================================================================

    const mouseGlow = document.getElementById("mouseGlow");

    if (mouseGlow) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        window.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

        });

        function animateGlow() {

            mouseGlow.style.transform =
                `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateGlow);

        }

        animateGlow();

    }

    // ==========================================================================
    // 4. COUNTER ANIMATION
    // ==========================================================================

    const counters = document.querySelectorAll(".counter");

    let animated = false;

    function animateCounters() {

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;

            const start = performance.now();

            function update(now) {

                const progress = Math.min((now - start) / duration, 1);

                current = Math.ceil(progress * target);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(update);

        });

    }

    const impactSection = document.getElementById("impact");

    if (impactSection) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting && !animated) {

                    animateCounters();

                    animated = true;

                    observer.disconnect();

                }

            });

        }, {

            threshold: 0.3

        });

        observer.observe(impactSection);

    }

    // ==========================================================================
    // 5. SCROLL REVEAL ANIMATION
    // ==========================================================================

    const reveals = document.querySelectorAll(

        ".reveal-up, .reveal-slide-in"

    );

    if (reveals.length) {

        const revealObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: 0.15

        });

        reveals.forEach(item => revealObserver.observe(item));

    }

    // ==========================================================================
    // 6. ACTIVE NAVIGATION
    // ==========================================================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();

    // ==========================================================================
    // 7. NAVBAR SCROLL EFFECT
    // ==========================================================================

    const navbar = document.getElementById("navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            navbar.classList.toggle(

                "scrolled",

                window.scrollY > 40

            );

        });

    }

});
