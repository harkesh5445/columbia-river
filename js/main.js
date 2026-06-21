/**
 * Mid Columbia River Guide Service
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderFish();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initHeaderScroll();
});

/** Restore full animated fish logo on inner pages (truncated SVG copies). */
function initHeaderFish() {
  const fish = document.querySelector('.site-header .brand-logo__fish');
  if (!fish || fish.querySelector('[d*="Q62 36"]')) return;

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('class', 'fish-icon brand-logo__fish');
  el.setAttribute('viewBox', '0 0 144 72');
  el.setAttribute('fill', 'none');
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <g class="fish-icon__swim">
      <g class="fish-icon__tail">
        <path d="M98 36 L134 12 L118 36 L134 60 L98 36Z" fill="var(--fish-tail)"/>
        <path d="M98 36 L128 36" stroke="var(--fish-outline)" stroke-width="0.75" opacity="0.35"/>
      </g>
      <path class="fish-icon__body" d="M6 36 C6 26 16 18 34 16 C52 14 78 16 92 24 C98 28 100 32 100 36 C100 40 98 44 92 48 C78 56 52 58 34 56 C16 54 6 46 6 36Z" fill="var(--fish-body)"/>
      <path d="M18 38 C34 46 68 46 88 38 C76 50 42 52 22 46 C16 44 14 40 18 38Z" fill="var(--fish-belly)" opacity="0.55"/>
      <path d="M36 22 L40 18 M48 20 L52 16 M58 21 L62 17 M68 23 L72 19 M78 25 L82 21" stroke="var(--fish-scute)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M60 18 C64 10 72 8 78 16 L74 21 Z" fill="var(--fish-fin)"/>
      <g class="fish-icon__pectoral"><path d="M44 42 L30 58 L50 46 Z" fill="var(--fish-fin)"/></g>
      <path d="M6 36 L2 33 L2 39 Z" fill="var(--fish-body)"/>
      <path d="M12 42 L8 52 M15 40 L11 50 M18 38 L14 48" stroke="var(--fish-accent)" stroke-width="1.1" stroke-linecap="round" opacity="0.85"/>
      <circle cx="30" cy="31" r="4" fill="var(--fish-eye-bg)"/>
      <circle cx="31" cy="30.5" r="2.2" fill="var(--fish-eye)"/>
      <circle cx="31.8" cy="29.8" r="0.75" fill="#fff" opacity="0.95"/>
      <ellipse cx="38" cy="39" rx="4.5" ry="2.8" fill="var(--fish-accent)" opacity="0.8"/>
      <path d="M52 30 Q62 36 52 42 M66 28 Q78 36 66 44 M80 30 Q92 36 80 42" stroke="var(--fish-scute)" stroke-width="0.65" fill="none" opacity="0.3"/>
    </g>`;
  fish.replaceWith(el);
}

function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (!toggle || !mobileMenu) return;

  function setOpen(open) {
    hamburger?.classList.toggle('is-active', open);
    mobileMenu.classList.toggle('is-open', open);
    mobileOverlay?.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
  mobileOverlay?.addEventListener('click', () => setOpen(false));
  mobileLinks.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener(
    'scroll',
    () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.25)' : '';
    },
    { passive: true }
  );
}
