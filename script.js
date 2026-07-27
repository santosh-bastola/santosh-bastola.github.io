/* =========================================
   SANTOSH BASTOLA
   EXECUTIVE COMMAND CENTER
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const mobileToggle = document.getElementById("mobileToggle");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("main section[id]");


/* =========================================
   THEME MANAGEMENT
========================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {

    html.setAttribute("data-theme", savedTheme);

}


function updateThemeIcon() {

    if (!themeToggle) return;

    const currentTheme = html.getAttribute("data-theme");

    themeToggle.innerHTML = currentTheme === "dark"

        ? `<i data-lucide="sun"></i>`

        : `<i data-lucide="moon"></i>`;

    if (window.lucide) {

        lucide.createIcons();

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme = html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        html.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );


        updateThemeIcon();

    });

}


updateThemeIcon();


/* =========================================
   MOBILE MENU
========================================= */

if (mobileToggle && navLinks) {

    mobileToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");


        const isOpen =
            navLinks.classList.contains("active");


        mobileToggle.innerHTML = isOpen

            ? `<i data-lucide="x"></i>`

            : `<i data-lucide="menu"></i>`;


        if (window.lucide) {

            lucide.createIcons();

        }

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        if (!navLinks) return;


        navLinks.classList.remove("active");


        if (mobileToggle) {

            mobileToggle.innerHTML =
                `<i data-lucide="menu"></i>`;

        }


        if (window.lucide) {

            lucide.createIcons();

        }

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const observerOptions = {

    root: null,

    rootMargin: "-35% 0px -55% 0px",

    threshold: 0

};


const sectionObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;


            const currentSection =
                entry.target.getAttribute("id");


            navItems.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-links a[href="#${currentSection}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        });

    },

    observerOptions

);


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(

    ".value-card, " +

    ".career-item, " +

    ".expertise-card, " +

    ".system-card, " +

    ".education-card, " +

    ".impact-item"

);


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },

    {

        threshold: 0.12,

        rootMargin: "0px 0px -40px 0px"

    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(".site-header");


let lastScroll = 0;


window.addEventListener(

    "scroll",

    () => {

        const currentScroll =
            window.scrollY;


        if (!header) return;


        if (currentScroll > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }


        lastScroll =
            currentScroll;

    },

    { passive: true }

);


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.querySelector(
        "#currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) return;


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +

                window.scrollY -

                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }

    );

});


/* =========================================
   CARD MOUSE INTERACTION
========================================= */

const interactiveCards =
    document.querySelectorAll(

        ".value-card, " +

        ".expertise-card, " +

        ".system-card, " +

        ".education-card"

    );


interactiveCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }

    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.removeProperty(
                "--mouse-x"
            );


            card.style.removeProperty(
                "--mouse-y"
            );

        }

    );

});


/* =========================================
   KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains(
                "active"
            )
        ) {

            navLinks.classList.remove(
                "active"
            );


            if (mobileToggle) {

                mobileToggle.innerHTML =
                    `<i data-lucide="menu"></i>`;

            }


            if (window.lucide) {

                lucide.createIcons();

            }

        }

    }

);


/* =========================================
   RESIZE HANDLING
========================================= */

window.addEventListener(

    "resize",

    () => {

        if (

            window.innerWidth > 800 &&

            navLinks

        ) {

            navLinks.classList.remove(
                "active"
            );


            if (mobileToggle) {

                mobileToggle.innerHTML =
                    `<i data-lucide="menu"></i>`;

            }


            if (window.lucide) {

                lucide.createIcons();

            }

        }

    }

);


/* =========================================
   INITIALIZE ICONS
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (window.lucide) {

            lucide.createIcons();

        }

    }

);
