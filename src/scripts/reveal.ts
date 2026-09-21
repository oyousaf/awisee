const STAGGER_STEP_MS = 80;
const MAX_STAGGER_STEPS = 6;

function initReveal() {
  const groups = document.querySelectorAll<HTMLElement>(
    '[data-reveal-group]:not([data-reveal-initialized])'
  );

  groups.forEach((group) => {
    group.dataset.revealInitialized = 'true';
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_STEP_MS}ms`);
    });
  });

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

initReveal();
document.addEventListener('astro:page-load', initReveal);
