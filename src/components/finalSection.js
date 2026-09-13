/**
 * Final Section — Intersection Observer reveal
 */

export function initFinalSection() {
  // Reveal elements with .reveal class on scroll
  const reveals = document.querySelectorAll('.stat-card, .service-card, .feature-item, .arch-layer, .project-card, .timeline-item, .cred-item');
  reveals.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 400));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // Final section cinematic reveal
  const finalEl = document.getElementById('contact');
  if (!finalEl) return;

  const finalEyebrow = finalEl.querySelector('.final-eyebrow');
  const finalWords = finalEl.querySelectorAll('.final-word');
  const finalSub = finalEl.querySelector('.final-sub');
  const finalCtas = finalEl.querySelector('.final-ctas');
  const finalBadges = finalEl.querySelector('.final-badges');
  const finalLinks = finalEl.querySelector('.contact-links');

  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggered reveal
        if (finalEyebrow) {
          setTimeout(() => finalEyebrow.classList.add('animate-in'), 100);
        }
        finalWords.forEach((word, i) => {
          setTimeout(() => word.classList.add('animate-in'), 200 + i * 120);
        });
        if (finalSub) {
          setTimeout(() => finalSub.classList.add('animate-in'), 200 + finalWords.length * 120);
        }
        if (finalCtas) {
          setTimeout(() => finalCtas.classList.add('animate-in'), 350 + finalWords.length * 120);
        }
        if (finalLinks) {
          setTimeout(() => finalLinks.classList.add('animate-in'), 450 + finalWords.length * 120);
        }
        if (finalBadges) {
          setTimeout(() => finalBadges.classList.add('animate-in'), 550 + finalWords.length * 120);
        }
        finalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  finalObserver.observe(finalEl);
}
