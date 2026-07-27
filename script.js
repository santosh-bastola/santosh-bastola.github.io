/* =========================================================
SANTOSH BASTOLA
PREMIUM PORTFOLIO — SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   PAGE READY
===================================================== */

document.body.classList.add("page-ready");


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.getElementById("navbar");

const handleNavbar = () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

};

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");


if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

        mobileMenuBtn.innerHTML = isOpen

            ? '<i class="fa-solid fa-xmark"></i>'

            : '<i class="fa-solid fa-bars"></i>';

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}


/* =====================================================
   THEME TOGGLE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme) {

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

}


const updateThemeIcon = () => {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-theme"
        );


    if (!themeToggle) return;


    themeToggle.innerHTML = currentTheme === "dark"

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

};


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );


        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        document.documentElement.setAttribute(
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


/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

const scrollProgress =
    document.getElementById("scrollProgress");


const updateScrollProgress = () => {

    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;


    const scrollPercentage =
        documentHeight > 0

            ? (scrollTop / documentHeight) * 100

            : 0;


    if (scrollProgress) {

        scrollProgress.style.width =
            `${scrollPercentage}%`;

    }

};


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


updateScrollProgress();


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"

        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION LINK
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const activeSectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute(
                            "id"
                        );


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (

                            link.getAttribute(
                                "href"
                            ) === `#${currentId}`

                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },

        {

            rootMargin:
                "-35% 0px -55% 0px"

        }

    );


sections.forEach(section => {

    activeSectionObserver.observe(
        section
    );

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(
        "[data-counter]"
    );


const animateCounter = counter => {

    const target =
        Number(
            counter.getAttribute(
                "data-counter"
            )
        );


    const duration =
        1600;


    const startTime =
        performance.now();


    const updateCounter = currentTime => {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easedProgress =
            1 - Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        counter.textContent =
            `${currentValue}+`;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                `${target}+`;

        }

    };


    requestAnimationFrame(
        updateCounter
    );

};


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (

                    entry.isIntersecting
                    &&
                    !entry.target.dataset.animated

                ) {

                    entry.target.dataset.animated =
                        "true";


                    animateCounter(
                        entry.target
                    );


                    counterObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: 0.5

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   CV DOWNLOAD TRACKING
===================================================== */

const cvButtons =
    document.querySelectorAll(
        ".cv-download"
    );


cvButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            console.log(
                "Executive CV download initiated."
            );

        }

    );

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetId =
                anchor.getAttribute(
                    "href"
                );


            if (

                !targetId
                ||
                targetId === "#"

            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }

    );

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

}


/* =====================================================
   EXTERNAL LINK SAFETY
===================================================== */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =====================================================
   KEYBOARD ESCAPE
   CLOSE MOBILE MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (

            event.key === "Escape"
            &&
            navMenu
            &&
            navMenu.classList.contains(
                "open"
            )

        ) {

            navMenu.classList.remove(
                "open"
            );


            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                mobileMenuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    }

);


/* =====================================================
   CONSOLE BRAND MESSAGE
===================================================== */

console.log(
    "%cSantosh Bastola | Procurement & Inventory Management Professional",
    "font-size: 14px; font-weight: bold;"
);
```

});
