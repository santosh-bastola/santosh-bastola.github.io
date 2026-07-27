document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. MOUSE FOLLOW GLOW EFFECT
     ========================================== */
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ==========================================
     2. THEME TOGGLE (COMMAND / EXECUTIVE MODE)
     ========================================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeText = themeToggle ? themeToggle.querySelector('.theme-text') : null;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      
      if (newTheme === 'light') {
        if (themeText) themeText.textContent = 'EXECUTIVE MODE';
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      } else {
        if (themeText) themeText.textContent = 'COMMAND MODE';
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      }
    });
  }

  /* ==========================================
     3. MOBILE MENU TOGGLE
     ========================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu on click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  /* ==========================================
     4. SCROLL REVEAL ANIMATIONS
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-slide-in');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('reveal-active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  /* ==========================================
     5. ACTIVE NAVIGATION TRACKING
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ==========================================
     6. METRIC COUNT-UP ANIMATION
     ========================================== */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    const impactSection = document.getElementById('impact');
    if (!impactSection) return;

    const sectionPos = impactSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500; // ms
        const increment = target / (duration / 16);

        let currentCount = 0;

        const updateCount = () => {
          currentCount += increment;
          if (currentCount < target) {
            counter.innerText = Math.ceil(currentCount);
            setTimeout(updateCount, 16);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
      animated = true;
    }
  };

  window.addEventListener('scroll', startCounters);
  startCounters(); // Check on initial view
});
