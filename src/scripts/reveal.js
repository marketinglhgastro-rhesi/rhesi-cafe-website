const revealElements = document.querySelectorAll("[data-reveal]");

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}
