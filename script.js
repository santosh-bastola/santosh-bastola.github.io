/* =========================================
SANTOSH BASTOLA
EXECUTIVE COMMAND CENTER
MAIN JAVASCRIPT
========================================= */

/* =========================================
ELEMENTS
========================================= */

const html = document.documentElement;

const themeToggle =
document.getElementById("themeToggle");

const mobileToggle =
document.getElementById("mobileToggle");

const navLinks =
document.getElementById("navLinks");

const navItems =
document.querySelectorAll(".nav-links a");

const header =
document.querySelector(".site-header");

const sections =
document.querySelectorAll("main section[id]");

const currentYear =
document.getElementById("currentYear");

/* =========================================
THEME
========================================= */

const savedTheme =
localStorage.getItem("portfolio-theme");

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


themeToggle.innerHTML =
    currentTheme === "dark"

        ? `<i class="fa-solid fa-sun"></i>`

        : `<i class="fa-solid fa-moon"></i>`;
```

}

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
            "portfolio-theme",
            newTheme
        );


        updateThemeIcon();

    }

);
```

}

updateThemeIcon();

/* =========================================
MOBILE MENU
========================================= */

function closeMobileMenu() {

```
if (!navLinks) return;


navLinks.classList.remove(
    "active"
);


if (mobileToggle) {

    mobileToggle.innerHTML =
        `<i class="fa-solid fa-bars"></i>`;

}
```

}

if (mobileToggle) {

```
mobileToggle.addEventListener(
    "click",
    () => {


        const isOpen =
            navLinks.classList.toggle(
                "active"
            );


        mobileToggle.innerHTML =
            isOpen

                ? `<i class="fa-solid fa-xmark"></i>`

                : `<i class="fa-solid fa-bars"></i>`;

    }

);
```

}

navItems.forEach(
link => {

```
    link.addEventListener(
        "click",
        closeMobileMenu
    );

}
```

);

/* =========================================
ACTIVE NAVIGATION
========================================= */

const sectionObserver =
new IntersectionObserver(

```
    entries => {


        entries.forEach(
            entry => {


                if (
                    !entry.isIntersecting
                ) return;


                const currentSection =
                    entry.target.id;


                navItems.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );

                    }

                );


                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${currentSection}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            }

        );

    },

    {

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0

    }

);
```

sections.forEach(
section => {

```
    sectionObserver.observe(
        section
    );

}
```

);

/* =========================================
SCROLL REVEAL
========================================= */

const revealElements =
document.querySelectorAll(
".reveal"
);

const revealObserver =
new IntersectionObserver(

```
    entries => {


        entries.forEach(
            entry => {


                if (
                    !entry.isIntersecting
                ) return;


                entry.target.classList.add(
                    "visible"
                );


                revealObserver.unobserve(
                    entry.target
                );

            }

        );

    },

    {

        threshold: 0.12,

        rootMargin:
            "0px 0px -40px 0px"

    }

);
```

revealElements.forEach(
element => {

```
    revealObserver.observe(
        element
    );

}
```

);

/* =========================================
HEADER SCROLL EFFECT
========================================= */

window.addEventListener(

```
"scroll",

() => {


    if (!header) return;


    if (
        window.scrollY > 40
    ) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

},

{
    passive: true
}
```

);

/* =========================================
SMOOTH SCROLL
========================================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach(

```
anchor => {


    anchor.addEventListener(
        "click",
        event => {


            const targetId =
                anchor.getAttribute(
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

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }

    );

}
```

);

/* =========================================
CARD MOUSE GLOW
========================================= */

const cards =
document.querySelectorAll(

```
    ".value-card, " +

    ".expertise-card, " +

    ".system-card, " +

    ".education-card, " +

    ".contact-btn"

);
```

cards.forEach(

```
card => {


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

}
```

);

/* =========================================
ESCAPE KEY
========================================= */

document.addEventListener(

```
"keydown",

event => {


    if (
        event.key === "Escape"
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================
RESIZE
========================================= */

window.addEventListener(

```
"resize",

() => {


    if (
        window.innerWidth > 800
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================
CURRENT YEAR
========================================= */

if (currentYear) {

```
currentYear.textContent =
    new Date()
        .getFullYear();
```

}

