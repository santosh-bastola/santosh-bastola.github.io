(() => {
  const menu = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menu) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
  }
  document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded","false");
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Small welcome notification, shown once per browser session.
  const toast = document.querySelector(".toast");
  if (toast && !sessionStorage.getItem("sb-welcome")) {
    setTimeout(() => toast.classList.add("show"), 900);
    setTimeout(() => toast.classList.remove("show"), 3800);
    sessionStorage.setItem("sb-welcome","1");
  }
})();