const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#more-button').addEventListener('click', event => {
  document.querySelector('#gallery-grid').classList.toggle('expanded');
  event.currentTarget.querySelector('span').textContent = document.querySelector('#gallery-grid').classList.contains('expanded') ? '−' : '＋';
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const revealElements = document.querySelectorAll(
    '.section-heading, .owners-heading, .produce-card, .gallery-grid figure, .owner-card, .quote-band p, .visit-card > *, .footer-main > *'
  );

  revealElements.forEach(element => element.classList.add('reveal-item'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  revealElements.forEach(element => revealObserver.observe(element));
}
