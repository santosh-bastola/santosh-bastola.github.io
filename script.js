/* =========================================================
SANTOSH BASTOLA — EXECUTIVE COMMAND CENTER
PREMIUM JAVASCRIPT SYSTEM
========================================================= */

/* =========================================================
01. DOM ELEMENTS
========================================================= */

const html = document.documentElement;

const navbar = document.getElementById("navbar");

const themeToggle = document.getElementById("themeToggle");

const mobileMenuBtn =
document.getElementById("mobileMenuBtn");

const navMenu =
document.getElementById("navMenu");

const scrollProgress =
document.getElementById("scrollProgress");

const navLinks =
document.querySelectorAll(".nav-link");

const revealElements =
document.querySelectorAll(".reveal");

const counters =
document.querySelectorAll("[data-counter]");

const cvDownloads =
document.querySelectorAll(".cv-download");

const backToTop =
document.querySelector(".back-to-top");

/* =========================================================
02. THEME SYSTEM
========================================================= */

const savedTheme =
localStorage.getItem("santosh-theme");

if (savedTheme) {

```
html.setAttribute(
    "data-theme",
    savedTheme
);
```

}

function updateThemeIcon() {

```
if (!themeToggle) return;


const currentTheme =
    html.getAttribute("data-theme");


const icon =
    themeToggle.querySelector("i");


if (!icon) return;


if (currentTheme === "light") {

    icon.className =
        "fa-solid fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
    );

} else {

    icon.className =
        "fa-solid fa-sun";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );

}
```

}

updateThemeIcon();

if (themeToggle) {

```
themeToggle.addEventListener(
    "click",
    () => {


        const currentTheme =
            html.getAttribute("data-theme");


        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        html.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "santosh-theme",
            newTheme
        );


        updateThemeIcon();


    }
);
```

}

/* =========================================================
03. MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {

```
if (!navMenu || !mobileMenuBtn)
    return;


navMenu.classList.remove("open");


mobileMenuBtn.setAttribute(
    "aria-expanded",
    "false"
);


const icon =
    mobileMenuBtn.querySelector("i");


if (icon) {

    icon.className =
        "fa-solid fa-bars";

}
```

}

if (mobileMenuBtn) {

```
mobileMenuBtn.addEventListener(
    "click",
    () => {


        const isOpen =
            navMenu.classList.toggle(
                "open"
            );


        mobileMenuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );


        const icon =
            mobileMenuBtn.querySelector("i");


        if (icon) {

            icon.className =
                isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }


    }
);
```

}

navLinks.forEach(
(link) => {

```
    link.addEventListener(
        "click",
        () => {

            closeMobileMenu();

        }
    );

}
```

);

document.addEventListener(
"click",
(event) => {

```
    if (!navMenu ||
        !mobileMenuBtn)
        return;


    const clickedInsideMenu =
        navMenu.contains(
            event.target
        );


    const clickedButton =
        mobileMenuBtn.contains(
            event.target
        );


    if (
        !clickedInsideMenu &&
        !clickedButton
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================================
04. NAVBAR SCROLL EFFECT
========================================================= */

function handleNavbarScroll() {

```
if (!navbar) return;


if (window.scrollY > 40) {

    navbar.classList.add(
        "scrolled"
    );

} else {

    navbar.classList.remove(
        "scrolled"
    );

}
```

}

window.addEventListener(
"scroll",
handleNavbarScroll,
{ passive: true }
);

handleNavbarScroll();

/* =========================================================
05. SCROLL PROGRESS BAR
========================================================= */

function updateScrollProgress() {

```
if (!scrollProgress)
    return;


const scrollTop =
    window.scrollY;


const documentHeight =
    document.documentElement
        .scrollHeight;


const windowHeight =
    window.innerHeight;


const scrollableHeight =
    documentHeight -
    windowHeight;


if (scrollableHeight <= 0) {

    scrollProgress.style.width =
        "100%";

    return;

}


const progress =
    (scrollTop /
        scrollableHeight) *
    100;


scrollProgress.style.width =
    `${progress}%`;
```

}

window.addEventListener(
"scroll",
updateScrollProgress,
{ passive: true }
);

window.addEventListener(
"resize",
updateScrollProgress
);

updateScrollProgress();

/* =========================================================
06. REVEAL ON SCROLL
========================================================= */

const revealObserver =
new IntersectionObserver(
(entries) => {

```
        entries.forEach(
            (entry) => {


                if (
                    entry.isIntersecting
                ) {


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );


                }

            }
        );


    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);
```

revealElements.forEach(
(element) => {

```
    revealObserver.observe(
        element
    );

}
```

);

/* =========================================================
07. ANIMATED COUNTERS
========================================================= */

function animateCounter(
element
) {

```
const target =
    Number(
        element.dataset.counter
    );


const duration =
    1600;


const startTime =
    performance.now();


function updateCounter(
    currentTime
) {


    const elapsed =
        currentTime -
        startTime;


    const progress =
        Math.min(
            elapsed /
            duration,
            1
        );


    const easedProgress =
        1 -
        Math.pow(
            1 - progress,
            3
        );


    const currentValue =
        Math.floor(
            easedProgress *
            target
        );


    element.textContent =
        `${currentValue}+`;


    if (
        progress < 1
    ) {

        requestAnimationFrame(
            updateCounter
        );

    } else {

        element.textContent =
            `${target}+`;

    }

}


requestAnimationFrame(
    updateCounter
);
```

}

const counterObserver =
new IntersectionObserver(
(entries) => {

```
        entries.forEach(
            (entry) => {


                if (
                    entry.isIntersecting
                ) {


                    animateCounter(
                        entry.target
                    );


                    counterObserver.unobserve(
                        entry.target
                    );


                }

            }
        );


    },
    {
        threshold: 0.7
    }
);
```

counters.forEach(
(counter) => {

```
    counterObserver.observe(
        counter
    );

}
```

);

/* =========================================================
08. ACTIVE NAVIGATION
========================================================= */

const sections =
document.querySelectorAll(
"main section[id]"
);

const sectionObserver =
new IntersectionObserver(
(entries) => {

```
        entries.forEach(
            (entry) => {


                if (
                    entry.isIntersecting
                ) {


                    const sectionId =
                        entry.target.id;


                    navLinks.forEach(
                        (link) => {


                            link.classList.toggle(
                                "active",
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${sectionId}`
                            );


                        }
                    );


                }

            }
        );


    },
    {
        rootMargin:
            "-35% 0px -55% 0px"
    }
);
```

sections.forEach(
(section) => {

```
    sectionObserver.observe(
        section
    );

}
```

);

/* =========================================================
09. CV DOWNLOAD TRACKING
========================================================= */

cvDownloads.forEach(
(button) => {

```
    button.addEventListener(
        "click",
        () => {


            console.log(
                "CV Download Started"
            );


            if (
                typeof gtag ===
                "function"
            ) {


                gtag(
                    "event",
                    "cv_download",
                    {
                        event_category:
                            "engagement",
                        event_label:
                            "Santosh Bastola CV"
                    }
                );


            }

        }
    );

}
```

);

/* =========================================================
10. CONTACT INTERACTION TRACKING
========================================================= */

const contactLinks =
document.querySelectorAll(
".contact-link"
);

contactLinks.forEach(
(link) => {

```
    link.addEventListener(
        "click",
        () => {


            const label =
                link
                    .querySelector(
                        "small"
                    );


            console.log(
                `Contact interaction: ${
                    label
                        ? label.textContent
                        : "Unknown"
                }`
            );


        }
    );

}
```

);

/* =========================================================
11. BACK TO TOP
========================================================= */

if (backToTop) {

```
backToTop.addEventListener(
    "click",
    (event) => {


        event.preventDefault();


        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }
);
```

}

/* =========================================================
12. IMAGE ERROR HANDLING
========================================================= */

const profileImage =
document.querySelector(
".profile-img"
);

if (profileImage) {

```
profileImage.addEventListener(
    "error",
    () => {


        profileImage.style.display =
            "none";


        const wrapper =
            profileImage
                .parentElement;


        if (wrapper) {

            wrapper.classList.add(
                "image-fallback"
            );

            wrapper.innerHTML =
                `
                <div
                    style="
                    display:grid;
                    place-items:center;
                    height:100%;
                    font-size:64px;
                    font-weight:800;
                    color:var(--electric);
                    "
                >
                    SB
                </div>
                `;

        }

    }
);
```

}

/* =========================================================
13. RESIZE SAFETY
========================================================= */

window.addEventListener(
"resize",
() => {

```
    if (
        window.innerWidth >
        768
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================================
14. PAGE READY
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

```
    document.body.classList.add(
        "page-ready"
    );


    console.log(
        "Santosh Bastola Portfolio — Executive Command Center Loaded"
    );


}
```

);
