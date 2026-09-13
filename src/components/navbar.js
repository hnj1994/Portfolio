/**
 * Navbar — glassmorphism with scroll-triggered visibility
 */

import { profile } from '../content.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;
  let menuOpen = false;

  // Inject mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-mobile-overlay';
  overlay.id = 'nav-mobile-overlay';
  overlay.innerHTML = `
    <a href="#about" class="nav-mobile-link" id="mob-about" data-nav-target="about">About</a>
    <a href="#experience" class="nav-mobile-link" id="mob-experience" data-nav-target="experience">Experience</a>
    <a href="#skills" class="nav-mobile-link" id="mob-skills" data-nav-target="skills">Skills</a>
    <a href="#projects" class="nav-mobile-link" id="mob-projects" data-nav-target="projects">Projects</a>
    <a href="#contact" class="nav-mobile-link" id="mob-contact" data-nav-target="contact">Contact</a>
    ${profile.links.resume ? `<a href="${profile.links.resume}" class="nav-mobile-link nav-mobile-resume" id="mob-resume" download>Download Resume</a>` : ''}
  `;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-nav-target]').forEach(link => {
    if (!document.getElementById(link.dataset.navTarget)) link.remove();
  });

  // Close menu on mobile link click
  overlay.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  const hamburger = document.getElementById('nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      menuOpen ? closeMenu() : openMenu();
    });
  }

  function openMenu() {
    menuOpen = true;
    overlay.classList.add('open');
    hamburger?.querySelector('span:nth-child(1)') && styleHamburger(true);
  }

  function closeMenu() {
    menuOpen = false;
    overlay.classList.remove('open');
    styleHamburger(false);
  }

  function styleHamburger(open) {
    const spans = hamburger?.querySelectorAll('span');
    if (!spans) return;
    if (open) {
      spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
      spans[1].style.cssText = 'opacity: 0';
      spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  }

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Show navbar after a tiny scroll or immediately on load
    if (scrollY > 20) {
      navbar.classList.add('visible', 'scrolled');
    } else if (scrollY > 0) {
      navbar.classList.add('visible');
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.add('visible');
      navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Show navbar after 800ms on initial load
  setTimeout(() => {
    navbar.classList.add('visible');
  }, 800);
}
