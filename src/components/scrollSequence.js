/**
 * Scroll-Driven Canvas Image Sequence
 * 300 frames — Dell PowerEdge R760 → VMware → Azure Cloud
 */

const TOTAL_FRAMES = 300;
const FRAME_START = 1;

// Phase boundaries (frame numbers)
const PHASES = {
  hardware:        { start: 1,   end: 80,  label: 'Hardware' },
  explosion:       { start: 81,  end: 150, label: 'Deconstruction' },
  vmware:          { start: 151, end: 210, label: 'Virtualization' },
  azure:           { start: 211, end: 270, label: 'Cloud' },
  security:        { start: 271, end: 300, label: 'Security' },
};

export function initScrollSequence() {
  const canvas = document.getElementById('sequence-canvas');
  const wrapper = document.getElementById('scroll-sequence-wrapper');
  const progressFill = document.getElementById('progress-fill');
  const frameNum = document.getElementById('frame-num');
  const progLabel = document.getElementById('prog-label');

  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext('2d');

  // ─── Resize canvas ────────────────────────────────────────
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', () => {
    setCanvasSize();
    drawFrame(currentFrame);
  });

  // ─── Image cache ──────────────────────────────────────────
  const images = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let currentFrame = 1;

  function getFramePath(n) {
    const padded = String(n).padStart(3, '0');
    return `/ezgif-frame-${padded}.jpg`;
  }

  function drawFrame(frameIndex) {
    const img = images[frameIndex];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw with cover-fit
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const cw = canvas.width;
    const ch = canvas.height;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }

  // Preload frames in priority order (current visible first, then rest)
  function preloadAll() {
    // First load frames 1-30 immediately (hero visible on load)
    const priorityEnd = 30;
    for (let i = FRAME_START; i <= priorityEnd; i++) {
      loadImage(i);
    }
    // Then load the rest
    setTimeout(() => {
      for (let i = priorityEnd + 1; i <= TOTAL_FRAMES; i++) {
        loadImage(i);
      }
    }, 100);
  }

  function loadImage(i) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      loadedCount++;
      images[i] = img;
      if (i === 1) {
        drawFrame(1); // Draw first frame as soon as it's ready
      }
    };
    images[i] = img;
  }

  preloadAll();

  // ─── Smooth scroll interpolation ──────────────────────────
  let targetFrame = 1;
  let animFrame = null;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    if (Math.abs(currentFrame - targetFrame) > 0.4) {
      currentFrame = lerp(currentFrame, targetFrame, 0.12);
      const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrame)));
      drawFrame(frameIdx);
      frameNum.textContent = String(frameIdx).padStart(3, '0');
      animFrame = requestAnimationFrame(tick);
    } else {
      currentFrame = targetFrame;
      const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrame)));
      drawFrame(frameIdx);
      frameNum.textContent = String(frameIdx).padStart(3, '0');
      animFrame = null;
    }
  }

  // ─── Scroll handler ───────────────────────────────────────
  function onScroll() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    // Progress 0 → 1 through the sticky section
    const scrollable = wrapperHeight - viewportH;
    const progress = Math.max(0, Math.min(1, (scrollY - wrapperTop) / scrollable));

    targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));

    // Update progress bar
    if (progressFill) {
      progressFill.style.width = (progress * 100) + '%';
    }

    // Update phase label
    if (progLabel) {
      const frameIdx = targetFrame;
      let label = 'Hardware';
      for (const [key, phase] of Object.entries(PHASES)) {
        if (frameIdx >= phase.start && frameIdx <= phase.end) {
          label = phase.label;
          break;
        }
      }
      progLabel.textContent = label;
    }

    // Trigger phase overlay updates
    const event = new CustomEvent('sequenceProgress', { detail: { progress, frame: targetFrame } });
    window.dispatchEvent(event);

    if (!animFrame) {
      animFrame = requestAnimationFrame(tick);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial call
}
