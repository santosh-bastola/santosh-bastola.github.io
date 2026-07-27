document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    htmlElement.setAttribute('data-theme', dark);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile Menu Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close Mobile Menu on Nav Item Click
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Scroll Active Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 80;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
