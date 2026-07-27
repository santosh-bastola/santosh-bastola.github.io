document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const menuIcon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // Dark / Light Mode Switcher
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  });
});
