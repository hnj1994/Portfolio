/**
 * Custom Cursor
 * Magnetic, reactive cursor with hover detection
 */

export function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = cursor?.querySelector('.cursor-dot');
  const ring = cursor?.querySelector('.cursor-ring');

  if (!cursor || !dot || !ring) return;

  // Hide on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let dotX = -100, dotY = -100;
  let ringX = -100, ringY = -100;
  let raf;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  window.addEventListener('mousemove', onMouseMove);

  function tick() {
    // Dot follows instantly
    dotX = mouseX;
    dotY = mouseY;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

    // Ring lags behind
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    raf = requestAnimationFrame(tick);
  }

  tick();

  // Hover detection on interactive elements
  const interactiveSelectors = 'a, button, .service-card, .stat-card, .security-node, .arch-badge, .nav-link, .nav-cta';

  function onMouseEnter() {
    cursor.classList.add('hover');
  }
  function onMouseLeave() {
    cursor.classList.remove('hover');
  }

  function bindInteractive() {
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
  }

  bindInteractive();

  // Re-bind when DOM might change
  const observer = new MutationObserver(bindInteractive);
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}
