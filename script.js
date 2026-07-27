document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Command Mode Switcher)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const themeText = themeToggle ? themeToggle.querySelector('.theme-text') : null;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Update Button Icon & Text
      if (newTheme === 'light') {
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        if (themeText) themeText.textContent = 'STANDARD MODE';
      } else {
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        if (themeText) themeText.textContent = 'COMMAND MODE';
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // 3. Subtly Glowing Mouse Follower
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow) {
    window.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });
  }

  // 4. Number Counters Animation (for Impact Section)
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200; 
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  // Trigger counters on Scroll
  const impactSection = document.getElementById('impact');
  if (impactSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = impactSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }
});
