import './style.css';
import { initNavbar } from './components/navbar.js';
import { initScrollSequence } from './components/scrollSequence.js';
import { initPhaseOverlays } from './components/phaseOverlays.js';
import { initFinalSection } from './components/finalSection.js';
import { initParticles } from './components/particles.js';
import { renderProfileSections, contactLinks } from './components/profileSections.js';
import { profile } from './content.js';

document.getElementById('root').innerHTML = `
  <div class="app">
    <!-- Navbar -->
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-inner">
        <a href="#hero" class="nav-logo" id="nav-logo">HRISHIKESH JOSHI</a>
        <ul class="nav-links" role="list">
          <li><a href="#about" class="nav-link" id="nav-about" data-nav-target="about">About</a></li>
          <li><a href="#experience" class="nav-link" id="nav-experience" data-nav-target="experience">Experience</a></li>
          <li><a href="#skills" class="nav-link" id="nav-skills" data-nav-target="skills">Skills</a></li>
          <li><a href="#projects" class="nav-link" id="nav-projects" data-nav-target="projects">Projects</a></li>
          <li><a href="#architecture" class="nav-link" id="nav-architecture" data-nav-target="architecture">Architecture</a></li>
          <li><a href="#contact" class="nav-link" id="nav-contact" data-nav-target="contact">Contact</a></li>
        </ul>
        ${profile.links.resume
          ? `<a href="${profile.links.resume}" class="nav-cta" id="nav-cta" download>Download Resume</a>`
          : `<a href="#contact" class="nav-cta" id="nav-cta">Get in Touch</a>`}
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" id="hero">
      <div class="hero-bg-glow"></div>
      <div class="hero-content" id="hero-content">
        <div class="hero-eyebrow" id="hero-eyebrow">Azure · Hybrid Identity · BCDR · Microsoft 365</div>
        <h1 class="hero-headline" id="hero-headline">
          <span class="headline-line">Infrastructure.</span>
          <span class="headline-line gradient-text">Engineered</span>
          <span class="headline-line">for Scale.</span>
        </h1>
        <p class="hero-sub" id="hero-sub">From enterprise hardware to cloud-native security.</p>
        <p class="hero-body" id="hero-body">${profile.shortTitle} · ${profile.location}. 11+ years running hybrid cloud, on-premises and Microsoft 365 environments for multi-client enterprises.</p>
        <div class="hero-ctas" id="hero-ctas">
          <a href="#about" class="btn-primary" id="btn-begin-journey">See my experience</a>
          <a href="#projects" class="btn-ghost" id="btn-see-architecture">See my work</a>
        </div>
      </div>
      <div class="scroll-indicator" id="scroll-indicator">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    <!-- Particle canvas layer -->
    <canvas class="particle-canvas" id="particle-canvas" aria-hidden="true"></canvas>

    <!-- Recruiter-facing sections (rendered from src/content.js) -->
    <div id="profile-sections"></div>

    <!-- Architecture showcase — context for the scroll-driven sequence -->
    <section class="profile-section architecture-intro" id="architecture" aria-labelledby="architecture-heading">
      <div class="profile-inner">
        <div class="section-eyebrow">Architecture</div>
        <h2 class="section-headline" id="architecture-heading">Hardware to <em>cloud</em>, in one scroll.</h2>
        <p class="section-body architecture-lede">A reference platform showing the full stack I work across: enterprise hardware, VMware virtualization, an Azure landing zone, and security operations layered over all of it. Keep scrolling to walk through it.</p>
      </div>
    </section>

    <!-- Sticky Scroll Sequence -->
    <section class="scroll-sequence-wrapper" id="scroll-sequence-wrapper" aria-label="Infrastructure to Cloud journey">
      <div class="sticky-scene" id="sticky-scene">
        <canvas class="sequence-canvas" id="sequence-canvas" aria-label="Animated infrastructure transformation"></canvas>
        
        <!-- Phase overlay panels -->
        <div class="phase-overlays" id="phase-overlays" aria-live="polite">

          <!-- Phase 1: Hero -->
          <div class="phase-panel active" id="phase-1" data-phase="1">
            <div class="phase-tag">Phase 01 / Hardware</div>
            <h2 class="phase-headline">Built on<br><em>Enterprise</em><br>Foundations.</h2>
            <div class="phase-specs" id="phase-1-specs">
              <div class="spec-item"><span class="spec-dot azure"></span>Dual Intel Xeon Scalable</div>
              <div class="spec-item"><span class="spec-dot cyan"></span>DDR5 ECC Memory</div>
              <div class="spec-item"><span class="spec-dot green"></span>NVMe U.2 Storage</div>
              <div class="spec-item"><span class="spec-dot azure"></span>Redundant Power</div>
            </div>
          </div>

          <!-- Phase 2: VMware -->
          <div class="phase-panel" id="phase-2" data-phase="2">
            <div class="phase-tag">Phase 02 / Virtualization</div>
            <h2 class="phase-headline">Virtualization<br><em>Without</em><br>Limits.</h2>
            <div class="phase-specs">
              <div class="spec-item"><span class="spec-dot azure"></span>VMware ESXi Hypervisor</div>
              <div class="spec-item"><span class="spec-dot cyan"></span>vCenter Server</div>
              <div class="spec-item"><span class="spec-dot green"></span>vSAN Storage</div>
              <div class="spec-item"><span class="spec-dot azure"></span>Network Virtualization</div>
            </div>
          </div>

          <!-- Phase 3: Azure -->
          <div class="phase-panel" id="phase-3" data-phase="3">
            <div class="phase-tag">Phase 03 / Cloud</div>
            <h2 class="phase-headline">Cloud<br><em>Architecture.</em><br>Reimagined.</h2>
            <div class="phase-specs">
              <div class="spec-item"><span class="spec-dot azure"></span>Azure Virtual Network</div>
              <div class="spec-item"><span class="spec-dot cyan"></span>Azure Front Door</div>
              <div class="spec-item"><span class="spec-dot green"></span>VM Scale Sets</div>
              <div class="spec-item"><span class="spec-dot azure"></span>Azure Monitor</div>
            </div>
          </div>

          <!-- Phase 4: Security -->
          <div class="phase-panel" id="phase-4" data-phase="4">
            <div class="phase-tag">Phase 04 / Security</div>
            <h2 class="phase-headline">Security at<br><em>Every</em><br>Layer.</h2>
            <div class="phase-specs">
              <div class="spec-item"><span class="spec-dot azure"></span>Microsoft Defender</div>
              <div class="spec-item"><span class="spec-dot cyan"></span>Azure Sentinel</div>
              <div class="spec-item"><span class="spec-dot green"></span>Log Analytics</div>
              <div class="spec-item"><span class="spec-dot azure"></span>Backup Vault</div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="scroll-progress-bar" id="scroll-progress-bar" aria-hidden="true">
          <div class="progress-track">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
          <div class="progress-phases">
            <span class="prog-label" id="prog-label">Hardware</span>
          </div>
        </div>

        <!-- Frame counter (editorial) -->
        <div class="frame-counter" id="frame-counter" aria-hidden="true">
          <span id="frame-num">001</span><span class="frame-slash"> / </span><span id="frame-total">300</span>
        </div>
      </div>
    </section>

    <!-- Contact / Final CTA Section -->
    <section class="final-section" id="contact" aria-labelledby="final-heading">
      <div class="final-bg-glow"></div>
      <div class="final-content">
        <div class="final-eyebrow">Let's Work Together</div>
        <h2 class="final-headline" id="final-heading">
          <span class="final-word" id="fw1">Create.</span>
          <span class="final-word gradient-text" id="fw2">Sustain.</span>
          <span class="final-word" id="fw3">Secure.</span>
        </h2>
        <p class="final-sub">Looking for someone who can take infrastructure from the rack to the cloud, securely?<br>I'd love to hear about the role.</p>
        <div class="final-ctas">
          ${profile.links.email ? `<a href="mailto:${profile.links.email}" class="btn-primary large" id="btn-email-me">Email Me</a>` : ''}
          ${profile.links.resume ? `<a href="${profile.links.resume}" class="btn-ghost large" id="btn-download-resume" download>Download Resume →</a>` : ''}
        </div>
        <ul class="contact-links" id="contact-links" role="list">
          ${contactLinks().map(c => `<li><a href="${c.href}" class="contact-link" id="contact-${c.label.toLowerCase()}"${c.external ? ' target="_blank" rel="noopener noreferrer"' : ''}><span class="contact-label">${c.label}</span><span class="contact-value">${c.value}</span></a></li>`).join('')}
        </ul>
        <div class="final-badges">
          <div class="badge" id="badge-azure">
            <svg viewBox="0 0 20 20" fill="#0078D4"><path d="M11.5 2L6 13h4l-1.5 5L18 8h-4.5L11.5 2z"/></svg>
            Microsoft Azure
          </div>
          <div class="badge" id="badge-vmware">
            <svg viewBox="0 0 20 20" fill="#00D6FF"><rect x="2" y="5" width="16" height="10" rx="2"/><path d="M6 9h8M6 12h5" stroke="#050505" stroke-width="1.5"/></svg>
            VMware vSphere
          </div>
          <div class="badge" id="badge-m365">
            <svg viewBox="0 0 20 20" fill="rgba(255,255,255,0.6)"><rect x="2" y="6" width="16" height="8" rx="1.5"/><circle cx="5" cy="10" r="1.5" fill="#00FF88"/></svg>
            Microsoft 365
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-left">
          <span class="footer-name">${profile.name}</span>
          <span class="footer-role">${profile.title}</span>
        </div>
        <div class="footer-center">
          <span>Infrastructure → Virtualization → Cloud → Security</span>
        </div>
        <div class="footer-right">
          <nav class="footer-links" aria-label="Footer links">
            ${contactLinks().map(c => `<a href="${c.href}"${c.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${c.label}</a>`).join('')}
          </nav>
          <span>© ${new Date().getFullYear()} ${profile.name}</span>
        </div>
      </div>
    </footer>
  </div>
`;

// Render data-driven sections first so the observers below can find them
renderProfileSections();

// Init all modules
initNavbar();
initScrollSequence();
initPhaseOverlays();
initFinalSection();
initParticles();
