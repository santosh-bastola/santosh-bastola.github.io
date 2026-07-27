/* ================================
   SANTOSH BASTOLA PORTFOLIO JS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       SMOOTH SCROLL
    ================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            event.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ================================
       SCROLL REVEAL ANIMATION
    ================================= */

    const revealElements = document.querySelectorAll(
        ".section, .experience-card, .skill-card, .card"
    );

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* ================================
       ACTIVE NAVIGATION LINK
    ================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    });


    /* ================================
       DYNAMIC FOOTER YEAR
    ================================= */

    const footerText = document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.innerHTML =
            `© ${currentYear} Santosh Bastola | Inventory & Procurement Manager`;

    }


    /* ================================
       BUTTON CLICK FEEDBACK
    ================================= */

    const downloadButton = document.querySelector(".cv");

    if (downloadButton) {

        downloadButton.addEventListener("click", () => {

            console.log("CV download initiated.");

        });

    }

});
