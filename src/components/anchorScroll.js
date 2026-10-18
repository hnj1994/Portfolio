/**
 * In-page anchor navigation
 * Short jumps glide; long jumps (anything that would scrub through the
 * 600vh scroll sequence) land instantly instead of animating across
 * several screens. Reduced motion always lands instantly.
 */

const SMOOTH_MAX_SCREENS = 2; // farther than this many viewports → jump

export function initAnchorScroll() {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY;
    const far = Math.abs(top - window.scrollY) > window.innerHeight * SMOOTH_MAX_SCREENS;
    window.scrollTo({ top, behavior: far || reducedMotion?.matches ? 'auto' : 'smooth' });

    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    // Keep keyboard focus where the reader landed, as native anchors do
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
