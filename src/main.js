import './style.css';
import { initNavbar } from './components/navbar.js';
import { initScrollSequence } from './components/scrollSequence.js';
import { initPhaseOverlays } from './components/phaseOverlays.js';
import { initFinalSection } from './components/finalSection.js';
import { initParticles } from './components/particles.js';
import { initCursor } from './components/cursor.js';
import { renderProfileSections, contactLinks } from './components/profileSections.js';
import { profile } from './content.js';

document.getElementById('root').innerHTML = `
  <div class="app">
    <!-- Custom Cursor -->
    <div class="cursor" id="cursor">
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    </div>

    <!-- Navbar -->
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-inner">
        <a href="#hero" class="nav-logo" id="nav-logo">HRISHIKESH JOSHI</a>
        <ul class="nav-links" role="list">
          <li><a href="#about" class="nav-link" id="nav-about" data-nav-target="about">About</a></li>
          <li><a href="#experience" class="nav-link" id="nav-experience" data-nav-target="experience">Experience</a></li>
          <li><a href="#skills" class="nav-link" id="nav-skills" data-nav-target="skills">Skills</a></li>
          <li><a href="#projects" class="nav-link" id="nav-projects" data-nav-target="projects">Projects</a></li>
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
        <div class="hero-eyebrow" id="hero-eyebrow">Dell PowerEdge R760 → Azure Cloud</div>
        <h1 class="hero-headline" id="hero-headline">
          <span class="headline-line">Infrastructure.</span>
          <span class="headline-line gradient-text">Engineered</span>
          <span class="headline-line">for Scale.</span>
        </h1>
        <p class="hero-sub" id="hero-sub">From enterprise hardware to cloud-native security.</p>
        <p class="hero-body" id="hero-body">${profile.shortTitle} · ${profile.location}. 11+ years running hybrid cloud, on-premises and Microsoft 365 environments for multi-client enterprises.</p>
        <div class="hero-ctas" id="hero-ctas">
          <a href="#about" class="btn-primary" id="btn-begin-journey">Begin the Journey</a>
          <a href="#projects" class="btn-ghost" id="btn-see-architecture">See My Work →</a>
        </div>
      </div>
      <div class="scroll-indicator" id="scroll-indicator">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    <!-- Particle canvas layer -->
    <canvas class="particle-canvas" id="particle-canvas" aria-hidden="true"></canvas>

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
          <span id="frame-num">001</span><span class="frame-slash"> / </span><span>300</span>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section" id="infrastructure" aria-labelledby="stats-heading">
      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-card" id="stat-1">
            <div class="stat-value gradient-text">2×</div>
            <div class="stat-label">Intel Xeon Scalable CPUs</div>
            <div class="stat-sub">60 cores per socket · Gen 5</div>
          </div>
          <div class="stat-card" id="stat-2">
            <div class="stat-value gradient-text">8TB</div>
            <div class="stat-label">NVMe Storage Capacity</div>
            <div class="stat-sub">U.2 drives · RAID protected</div>
          </div>
          <div class="stat-card" id="stat-3">
            <div class="stat-value gradient-text">512GB</div>
            <div class="stat-label">DDR5 ECC Memory</div>
            <div class="stat-sub">32 DIMM slots · 4800 MT/s</div>
          </div>
          <div class="stat-card" id="stat-4">
            <div class="stat-value gradient-text">100GbE</div>
            <div class="stat-label">Network Throughput</div>
            <div class="stat-sub">Dual-port · OCP 3.0</div>
          </div>
        </div>
      </div>
    </section>

    <!-- VMware Section -->
    <section class="vmware-section" id="virtualization" aria-labelledby="vmware-heading">
      <div class="section-content-split">
        <div class="split-left">
          <div class="section-eyebrow">VMware vSphere</div>
          <h2 class="section-headline" id="vmware-heading">Transform physical<br>into <em>virtual</em>.</h2>
          <p class="section-body">Consolidate workloads, optimize resource utilization, and build a foundation for cloud-native operations with VMware's industry-leading virtualization platform.</p>
          <div class="feature-list">
            <div class="feature-item" id="feat-esxi">
              <div class="feature-icon azure-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <div>
                <div class="feature-title">VMware ESXi</div>
                <div class="feature-desc">Bare-metal hypervisor with near-zero overhead</div>
              </div>
            </div>
            <div class="feature-item" id="feat-vcenter">
              <div class="feature-icon cyan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>
              <div>
                <div class="feature-title">vCenter Server</div>
                <div class="feature-desc">Centralized management for all virtual infrastructure</div>
              </div>
            </div>
            <div class="feature-item" id="feat-vsan">
              <div class="feature-icon green-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              </div>
              <div>
                <div class="feature-title">vSAN Storage</div>
                <div class="feature-desc">Software-defined storage with deduplication & compression</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split-right">
          <div class="architecture-diagram" id="vmware-diagram" aria-label="VMware architecture diagram">
            <div class="arch-layer" id="arch-esxi">
              <div class="arch-badge vmware">VMware ESXi</div>
            </div>
            <div class="arch-layer" id="arch-vm">
              <div class="arch-badge vm">VM 01</div>
              <div class="arch-badge vm">VM 02</div>
              <div class="arch-badge vm">VM 03</div>
            </div>
            <div class="arch-layer" id="arch-vsan">
              <div class="arch-badge storage">vSAN</div>
              <div class="arch-badge storage">NSX-T</div>
            </div>
            <div class="arch-connector"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Azure Section -->
    <section class="azure-section" id="cloud" aria-labelledby="azure-heading">
      <div class="azure-header">
        <div class="section-eyebrow azure-eyebrow">Microsoft Azure</div>
        <h2 class="section-headline centered" id="azure-heading">Cloud Architecture.<br><em>Reimagined.</em></h2>
        <p class="section-body centered">Secure connectivity. Intelligent scaling. Global availability.<br>Built for modern applications and enterprise workloads.</p>
      </div>
      <div class="azure-services-grid" id="azure-services-grid">
        <div class="service-card" id="svc-vnet">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#0078D4" stroke-width="1.5"/><path d="M16 8v16M8 16h16" stroke="#0078D4" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="8" r="2" fill="#00D6FF"/><circle cx="16" cy="24" r="2" fill="#00D6FF"/><circle cx="8" cy="16" r="2" fill="#00D6FF"/><circle cx="24" cy="16" r="2" fill="#00D6FF"/></svg>
          </div>
          <div class="service-name">Azure Virtual Network</div>
          <div class="service-desc">Isolated, segmented network environments</div>
        </div>
        <div class="service-card" id="svc-frontdoor">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><path d="M16 4L28 12v16H4V12L16 4z" stroke="#0078D4" stroke-width="1.5" stroke-linejoin="round"/><rect x="11" y="16" width="10" height="12" rx="1" stroke="#00D6FF" stroke-width="1.5"/></svg>
          </div>
          <div class="service-name">Azure Front Door</div>
          <div class="service-desc">Global CDN and load balancing</div>
        </div>
        <div class="service-card" id="svc-gateway">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="12" rx="2" stroke="#0078D4" stroke-width="1.5"/><path d="M10 16h12M16 13v6" stroke="#00D6FF" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div class="service-name">Application Gateway</div>
          <div class="service-desc">WAF-enabled Layer 7 load balancer</div>
        </div>
        <div class="service-card" id="svc-firewall">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><path d="M16 4C16 4 6 8 6 16c0 5.52 4.48 10 10 10s10-4.48 10-10c0-8-10-12-10-12z" stroke="#0078D4" stroke-width="1.5"/><path d="M16 12v4l2 2" stroke="#00FF88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="service-name">Azure Firewall</div>
          <div class="service-desc">Cloud-native stateful firewall</div>
        </div>
        <div class="service-card" id="svc-vmss">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="10" height="10" rx="1.5" stroke="#0078D4" stroke-width="1.5"/><rect x="18" y="4" width="10" height="10" rx="1.5" stroke="#0078D4" stroke-width="1.5"/><rect x="4" y="18" width="10" height="10" rx="1.5" stroke="#00D6FF" stroke-width="1.5"/><rect x="18" y="18" width="10" height="10" rx="1.5" stroke="#00D6FF" stroke-width="1.5"/></svg>
          </div>
          <div class="service-name">VM Scale Sets</div>
          <div class="service-desc">Auto-scaling compute resources</div>
        </div>
        <div class="service-card" id="svc-monitor">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><polyline points="4,22 10,14 15,18 21,10 28,16" stroke="#0078D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="16" r="2" fill="#00D6FF"/></svg>
          </div>
          <div class="service-name">Azure Monitor</div>
          <div class="service-desc">Full-stack observability platform</div>
        </div>
        <div class="service-card" id="svc-backup">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><path d="M20 16a8 8 0 11-8-8" stroke="#0078D4" stroke-width="1.5" stroke-linecap="round"/><polyline points="20,8 20,16 28,16" stroke="#00FF88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="service-name">Azure Backup</div>
          <div class="service-desc">Reliable data protection at scale</div>
        </div>
        <div class="service-card" id="svc-keyvault">
          <div class="service-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect x="8" y="14" width="16" height="13" rx="2" stroke="#0078D4" stroke-width="1.5"/><path d="M12 14v-4a4 4 0 018 0v4" stroke="#00D6FF" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="21" r="2" fill="#00FF88"/></svg>
          </div>
          <div class="service-name">Azure Key Vault</div>
          <div class="service-desc">Secrets and certificate management</div>
        </div>
      </div>
    </section>

    <!-- Security Section -->
    <section class="security-section" id="security" aria-labelledby="security-heading">
      <div class="security-glow"></div>
      <div class="section-content-centered">
        <div class="section-eyebrow security-eyebrow">Security Operations</div>
        <h2 class="section-headline centered" id="security-heading">Security at<br><em>Every Layer.</em></h2>
        <p class="section-body centered">Threat detection. Continuous monitoring. Automated response.<br>Enterprise-grade protection across your entire environment.</p>
        <div class="security-stack" id="security-stack">
          <div class="security-ring ring-outer" aria-hidden="true"></div>
          <div class="security-ring ring-mid" aria-hidden="true"></div>
          <div class="security-ring ring-inner" aria-hidden="true"></div>
          <div class="security-core" id="security-core">
            <svg viewBox="0 0 48 48" fill="none"><path d="M24 6C24 6 10 12 10 24c0 8.84 6.27 16.19 14 18.19C31.73 40.19 38 32.84 38 24c0-12-14-18-14-18z" stroke="#00FF88" stroke-width="1.5"/><path d="M24 22v4l2 2" stroke="#00FF88" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <div class="security-node" style="--angle:0deg" id="sec-defender">
            <div class="security-node-inner">Defender</div>
          </div>
          <div class="security-node" style="--angle:60deg" id="sec-sentinel">
            <div class="security-node-inner">Sentinel</div>
          </div>
          <div class="security-node" style="--angle:120deg" id="sec-logs">
            <div class="security-node-inner">Log Analytics</div>
          </div>
          <div class="security-node" style="--angle:180deg" id="sec-backup">
            <div class="security-node-inner">Backup Vault</div>
          </div>
          <div class="security-node" style="--angle:240deg" id="sec-threat">
            <div class="security-node-inner">Threat Intel</div>
          </div>
          <div class="security-node" style="--angle:300deg" id="sec-soc">
            <div class="security-node-inner">SOC</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recruiter-facing sections (rendered from src/content.js) -->
    <div id="profile-sections"></div>

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
          <div class="badge" id="badge-dell">
            <svg viewBox="0 0 20 20" fill="rgba(255,255,255,0.6)"><rect x="2" y="6" width="16" height="8" rx="1.5"/><circle cx="5" cy="10" r="1.5" fill="#00FF88"/></svg>
            Dell PowerEdge R760
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
initCursor();
initNavbar();
initScrollSequence();
initPhaseOverlays();
initFinalSection();
initParticles();
