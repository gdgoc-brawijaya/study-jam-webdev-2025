const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a, .footer-inner a, .hero-actions a, .cta-card a");
const revealElements = document.querySelectorAll(".reveal");

// Mobile navigation toggle for small screens.
navToggle?.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.classList.toggle("is-open", isOpen);
});

// Close the mobile menu after selecting a link.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navPanel.classList.contains("is-open")) {
      navPanel.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Fade-in animation when sections enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => observer.observe(element));
