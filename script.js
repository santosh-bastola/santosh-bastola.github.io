document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

  if (menuToggle && navMenu) {
    // Open/Close menu on hamburger click
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      if (menuIcon) {
        if (navMenu.classList.contains('active')) {
          menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });

    // Close menu automatically when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      });
    });
  }

  // ==========================================
  // 2. Dark / Light Theme Switcher
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Check saved theme in LocalStorage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply dark mode on initial load if saved or preferred
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  }

  // Handle theme button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
      }
    });
  }
});
