/**
 * Phase Overlay Controller
 * Shows/hides overlay panels based on scroll progress
 */

import manifest from '../frames.json';

// Phase triggers (0–1 progress), derived from the frame manifest so the
// panels switch on the same frames as the animation and progress label.
// The hardware panel stays up through the deconstruction frames.
const toProgress = frame => (frame - 1) / (manifest.count - 1);
const startOf = key => toProgress(manifest.phases.find(p => p.key === key).start);
const PHASE_MAP = [
  { id: 'phase-1', from: 0,                   to: startOf('vmware')   },
  { id: 'phase-2', from: startOf('vmware'),   to: startOf('azure')    },
  { id: 'phase-3', from: startOf('azure'),    to: startOf('security') },
  { id: 'phase-4', from: startOf('security'), to: 1.01                },
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
