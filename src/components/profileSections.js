/**
 * Recruiter-facing sections — About, Experience, Skills, Projects,
 * Certifications, Contact. All content comes from src/content.js.
 * Sections backed by an empty array are removed from the DOM and from
 * the navigation so the page never shows an unfinished block.
 */
import { profile, skills, experience, projects, certifications, education, strengths } from '../content.js';

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tags = (list = []) => list.length
  ? `<ul class="tag-list" role="list">${list.map(t => `<li class="tag">${esc(t)}</li>`).join('')}</ul>`
  : '';

const extAttrs = (l) => l.external ? ' target="_blank" rel="noopener noreferrer"' : '';

function aboutSection() {
  const paragraphs = profile.summary.map(p => `<p class="section-body">${esc(p)}</p>`).join('');
  const facts = profile.highlights.map((h, i) => `
    <div class="stat-card about-fact" id="about-fact-${i + 1}">
      <div class="stat-value gradient-text">${esc(h.value)}</div>
      <div class="stat-label">${esc(h.label)}</div>
      <div class="stat-sub">${esc(h.sub)}</div>
    </div>`).join('');
  const meta = [
    profile.location ? `<span class="about-meta-item">${esc(profile.location)}</span>` : '',
    profile.availability ? `<span class="about-meta-item about-available"><span class="pulse-dot"></span>${esc(profile.availability)}</span>` : '',
  ].filter(Boolean).join('');
  return `
    <section class="profile-section about-section" id="about" aria-labelledby="about-heading">
      <div class="profile-inner">
        <div class="section-content-split about-split">
          <div class="split-left">
            <div class="section-eyebrow">About</div>
            <h2 class="section-headline" id="about-heading">${esc(profile.name.split(' ')[0])}.<br>Building the <em>whole stack</em>.</h2>
            <div class="about-role">${esc(profile.title)}</div>
            ${meta ? `<div class="about-meta">${meta}</div>` : ''}
            ${paragraphs}
            <div class="hero-ctas about-ctas">
              ${profile.links.resume ? `<a href="${esc(profile.links.resume)}" class="btn-primary" id="btn-about-resume" download>Download Resume</a>` : ''}
              <a href="#contact" class="btn-ghost" id="btn-about-contact">Get in touch →</a>
            </div>
          </div>
          <div class="split-right">
            <div class="stats-grid about-grid">${facts}</div>
          </div>
        </div>
      </div>
    </section>`;
}

function experienceSection() {
  if (!experience.length) return '';
  const items = experience.map((job, i) => `
    <li class="timeline-item" id="job-${i + 1}">
      <div class="timeline-marker" aria-hidden="true"></div>
      <div class="timeline-card">
        <div class="timeline-dates">${esc(job.start)} — ${esc(job.end)}</div>
        <h3 class="timeline-role">${esc(job.role)}</h3>
        <div class="timeline-company">${esc(job.company)}${job.location ? ` · ${esc(job.location)}` : ''}</div>
        ${job.bullets?.length ? `<ul class="timeline-bullets">${job.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
        ${tags(job.tech)}
      </div>
    </li>`).join('');
  return `
    <section class="profile-section experience-section" id="experience" aria-labelledby="experience-heading">
      <div class="profile-inner">
        <div class="section-eyebrow">Experience</div>
        <h2 class="section-headline" id="experience-heading">Where I've <em>built</em>.</h2>
        <ol class="timeline" role="list">${items}</ol>
      </div>
    </section>`;
}

function skillsSection() {
  const groups = skills.map((g, i) => `
    <div class="service-card skill-card" id="skill-group-${i + 1}">
      <div class="service-name">${esc(g.group)}</div>
      ${tags(g.items)}
    </div>`).join('');
  return `
    <section class="profile-section skills-section" id="skills" aria-labelledby="skills-heading">
      <div class="profile-inner">
        <div class="section-eyebrow">Skills</div>
        <h2 class="section-headline" id="skills-heading">Tools I <em>work with</em>.</h2>
        <div class="azure-services-grid skills-grid">${groups}</div>
      </div>
    </section>`;
}

function projectsSection() {
  if (!projects.length) return '';
  const cards = projects.map((p, i) => `
    <article class="project-card" id="project-${i + 1}">
      <div class="project-index">0${i + 1}</div>
      <h3 class="project-name">${esc(p.name)}</h3>
      ${p.objective ? `<p class="project-objective">${esc(p.objective)}</p>` : ''}
      <p class="project-summary">${esc(p.summary)}</p>
      ${p.outcome ? `<p class="project-outcome"><span class="project-outcome-label">Outcome</span>${esc(p.outcome)}</p>` : ''}
      ${tags(p.tech)}
      ${p.links?.length ? `<div class="project-links">${p.links.map(l => `<a href="${esc(l.href)}" class="project-link"${extAttrs(l)}>${esc(l.label)} →</a>`).join('')}</div>` : ''}
    </article>`).join('');
  return `
    <section class="profile-section projects-section" id="projects" aria-labelledby="projects-heading">
      <div class="profile-inner">
        <div class="section-eyebrow">Projects</div>
        <h2 class="section-headline" id="projects-heading">Selected <em>work</em>.</h2>
        <div class="projects-grid">${cards}</div>
      </div>
    </section>`;
}

function credentialsSection() {
  if (!certifications.length && !education.length && !strengths.length) return '';
  const certs = certifications.map((c, i) => `
    <li class="cred-item" id="cert-${i + 1}">
      <div class="cred-name">${c.href ? `<a href="${esc(c.href)}" target="_blank" rel="noopener noreferrer">${esc(c.name)}</a>` : esc(c.name)}</div>
      <div class="cred-meta">${esc(c.issuer)}${c.code ? ` · ${esc(c.code)}` : ''}${c.year ? ` · ${esc(c.year)}` : ''}</div>
    </li>`).join('');
  const edu = education.map((e, i) => `
    <li class="cred-item" id="edu-${i + 1}">
      <div class="cred-name">${esc(e.degree)}</div>
      <div class="cred-meta">${esc(e.school)}${e.year ? ` · ${esc(e.year)}` : ''}</div>
    </li>`).join('');
  return `
    <section class="profile-section credentials-section" id="credentials" aria-labelledby="credentials-heading">
      <div class="profile-inner">
        <div class="section-eyebrow">Credentials</div>
        <h2 class="section-headline" id="credentials-heading">Certifications &amp; <em>education</em>.</h2>
        <div class="cred-columns">
          ${certs ? `<div><h3 class="cred-heading">Certifications</h3><ul class="cred-list" role="list">${certs}</ul></div>` : ''}
          <div>
            ${edu ? `<h3 class="cred-heading">Education</h3><ul class="cred-list" role="list">${edu}</ul>` : ''}
            ${strengths.length ? `<h3 class="cred-heading strengths-heading">How I work</h3><ul class="cred-list" role="list">${strengths.map((st, i) => `
              <li class="cred-item" id="strength-${i + 1}">
                <div class="cred-name">${esc(st.name)}</div>
                <div class="cred-meta strength-text">${esc(st.text)}</div>
              </li>`).join('')}</ul>` : ''}
          </div>
        </div>
      </div>
    </section>`;
}

export function contactLinks() {
  const l = profile.links;
  const items = [];
  if (l.email) items.push({ label: 'Email', value: l.email, href: `mailto:${l.email}` });
  if (l.linkedin) items.push({ label: 'LinkedIn', value: l.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: l.linkedin, external: true });
  if (l.github) items.push({ label: 'GitHub', value: l.github.replace(/^https?:\/\/(www\.)?/, ''), href: l.github, external: true });
  return items;
}

export function renderProfileSections() {
  const mount = document.getElementById('profile-sections');
  if (!mount) return;
  mount.outerHTML = [aboutSection(), experienceSection(), skillsSection(), projectsSection(), credentialsSection()].join('');

  // Drop nav links whose target section does not exist.
  document.querySelectorAll('[data-nav-target]').forEach(link => {
    if (!document.getElementById(link.dataset.navTarget)) link.closest('li')?.remove() ?? link.remove();
  });
}
