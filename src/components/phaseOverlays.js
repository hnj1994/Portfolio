/**
 * Phase Overlay Controller
 * Shows/hides overlay panels based on scroll progress
 */

// Phase triggers (0–1 progress)
const PHASE_MAP = [
  { id: 'phase-1', from: 0,    to: 0.35 },
  { id: 'phase-2', from: 0.35, to: 0.58 },
  { id: 'phase-3', from: 0.58, to: 0.78 },
  { id: 'phase-4', from: 0.78, to: 1.0  },
];

export function initPhaseOverlays() {
  const panels = PHASE_MAP.map(p => ({
    ...p,
    el: document.getElementById(p.id),
  })).filter(p => p.el);

  function updatePhases(progress) {
    panels.forEach(panel => {
      const active = progress >= panel.from && progress < panel.to;
      panel.el.classList.toggle('active', active);
    });
  }

  window.addEventListener('sequenceProgress', (e) => {
    updatePhases(e.detail.progress);
  });

  // Initialize
  updatePhases(0);
}
