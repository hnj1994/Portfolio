/**
 * Scroll-Driven Canvas Image Sequence
 * Dell PowerEdge R760 → VMware → Azure Cloud
 *
 * Frames live in /public/frames as AVIF with a WebP fallback (see
 * scripts/build-frames.mjs). Loading is progressive:
 *   1. the first frame is fetched immediately and painted as soon as it lands;
 *   2. a small "hero" window of frames follows so the first scroll is smooth;
 *   3. the rest are fetched only once the sequence is near the viewport, in
 *      order of distance from the frame currently on screen, a few at a time.
 * On a data-saver connection or with reduced motion the sequence is limited
 * to one keyframe per phase, so the story still reads at a fraction of the bytes.
 * While a frame is still downloading the nearest loaded frame is drawn, so
 * scrubbing never leaves the canvas blank.
 */
import manifest from '../frames.json';

const TOTAL_FRAMES = manifest.count;
const PHASES = manifest.phases;

const HERO_WINDOW = 24;        // frames fetched right after the first frame
const IDLE_PREFETCH_MS = 6000; // on a fast connection, prefetch the rest after this idle time
const CONCURRENCY = 6;         // parallel image fetches

function detectFormat() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width > 0 ? 'avif' : 'webp');
    img.onerror = () => resolve('webp');
    // 1x1 AVIF
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEAwgMgwf8AAAWAAAAACvcA==';
  });
}

export function initScrollSequence() {
  const canvas = document.getElementById('sequence-canvas');
  const wrapper = document.getElementById('scroll-sequence-wrapper');
  const progressFill = document.getElementById('progress-fill');
  const frameNum = document.getElementById('frame-num');
  const frameTotal = document.getElementById('frame-total');
  const progLabel = document.getElementById('prog-label');

  if (!canvas || !wrapper) return;
  if (frameTotal) frameTotal.textContent = String(TOTAL_FRAMES);

  const ctx = canvas.getContext('2d');

  // ─── Lite mode: data saver or reduced motion → phase keyframes only ──
  const conn = navigator.connection || {};
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const lite = !!conn.saveData || reducedMotion || /(^|-)2g$/.test(conn.effectiveType || '');
  const keyframes = PHASES.map(p => p.start).concat(TOTAL_FRAMES);

  // ─── Canvas sizing ────────────────────────────────────────
  let dpr = 1;
  function setCanvasSize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  setCanvasSize();
  window.addEventListener('resize', () => { setCanvasSize(); drawFrame(currentFrame); });

  // ─── Image cache ──────────────────────────────────────────
  let format = 'webp';
  const images = new Array(TOTAL_FRAMES + 1);   // HTMLImageElement once loaded
  const pending = new Set();                     // frames currently fetching
  const loaded = [];                             // sorted list of loaded frame numbers
  let currentFrame = 1;
  let drawnFrame = 0;
  let fullLoadStarted = false;

  const framePath = n => `/frames/${String(n).padStart(3, '0')}.${format}`;

  function insertLoaded(n) {
    let lo = 0, hi = loaded.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; loaded[mid] < n ? lo = mid + 1 : hi = mid; }
    loaded.splice(lo, 0, n);
  }

  function nearestLoaded(n) {
    if (!loaded.length) return 0;
    let lo = 0, hi = loaded.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; loaded[mid] < n ? lo = mid + 1 : hi = mid; }
    const hiVal = loaded[lo];
    const loVal = loaded[lo - 1] ?? hiVal;
    return (hiVal - n) <= (n - loVal) ? hiVal : loVal;
  }

  function loadImage(n) {
    return new Promise(resolve => {
      if (images[n] || pending.has(n) || n < 1 || n > TOTAL_FRAMES) return resolve();
      pending.add(n);
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        pending.delete(n);
        images[n] = img;
        insertLoaded(n);
        // Paint if this frame is the one we want, or better than what is showing.
        const want = Math.round(currentFrame);
        if (n === want || Math.abs(n - want) < Math.abs(drawnFrame - want)) drawFrame(currentFrame);
        resolve();
      };
      img.onerror = () => { pending.delete(n); resolve(); };
      img.src = framePath(n);
    });
  }

  // Queue-driven loader: always fetch the not-yet-loaded frame closest to the
  // frame currently on screen, CONCURRENCY at a time.
  let queue = [];
  let active = 0;
  function pump() {
    while (active < CONCURRENCY && queue.length) {
      const want = Math.round(currentFrame);
      queue.sort((a, b) => Math.abs(a - want) - Math.abs(b - want));
      const n = queue.shift();
      if (images[n] || pending.has(n)) continue;
      active++;
      loadImage(n).then(() => { active--; pump(); });
    }
  }
  function enqueue(frames) {
    for (const n of frames) if (!images[n] && !pending.has(n) && !queue.includes(n)) queue.push(n);
    pump();
  }

  function startFullLoad() {
    if (fullLoadStarted) return;
    fullLoadStarted = true;
    const all = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) all.push(i);
    enqueue(all);
  }

  // ─── Drawing ──────────────────────────────────────────────
  function drawFrame(frame) {
    const want = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frame)));
    const n = images[want] ? want : nearestLoaded(want);
    if (!n) return;
    const img = images[n];
    if (n === drawnFrame) return;
    drawnFrame = n;

    const iw = img.naturalWidth, ih = img.naturalHeight;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale, sh = ih * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }

  // ─── Smooth scroll interpolation ──────────────────────────
  let targetFrame = 1;
  let animFrame = null;
  const lerp = (a, b, t) => a + (b - a) * t;

  function tick() {
    if (Math.abs(currentFrame - targetFrame) > 0.4) {
      currentFrame = lerp(currentFrame, targetFrame, 0.12);
      animFrame = requestAnimationFrame(tick);
    } else {
      currentFrame = targetFrame;
      animFrame = null;
    }
    const idx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrame)));
    drawFrame(idx);
    if (frameNum) frameNum.textContent = String(idx).padStart(3, '0');
  }

  // ─── Scroll handler ───────────────────────────────────────
  function onScroll() {
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    const scrollable = wrapperHeight - viewportH;
    const progress = Math.max(0, Math.min(1, (scrollY - wrapperTop) / scrollable));
    targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));

    // Re-prioritise in-flight queue toward the current position.
    if (queue.length) pump();

    if (progressFill) progressFill.style.width = (progress * 100) + '%';
    if (progLabel) {
      const phase = PHASES.find(p => targetFrame >= p.start && targetFrame <= p.end);
      progLabel.textContent = phase ? phase.label : PHASES[0].label;
    }

    window.dispatchEvent(new CustomEvent('sequenceProgress', { detail: { progress, frame: targetFrame } }));
    if (!animFrame) animFrame = requestAnimationFrame(tick);
  }

  // The full set is fetched only once the visitor shows intent to scroll
  // (the sequence starts right under the hero, so any scroll reaches it), or
  // after a quiet period on a fast connection so it is ready when they do.
  function armFullLoad() {
    if (lite) return;
    const start = () => {
      startFullLoad();
      ['scroll', 'wheel', 'touchstart', 'keydown'].forEach(ev => window.removeEventListener(ev, start));
    };
    ['scroll', 'wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, start, { passive: true, once: true }));
    const fast = !conn.effectiveType || conn.effectiveType === '4g';
    if (fast) setTimeout(() => { if (!fullLoadStarted && !document.hidden) start(); }, IDLE_PREFETCH_MS);
  }

  // ─── Boot ─────────────────────────────────────────────────
  detectFormat().then(fmt => {
    format = fmt;
    loadImage(1).then(() => {
      if (lite) {
        enqueue(keyframes);
      } else {
        const hero = [];
        for (let i = 2; i <= Math.min(HERO_WINDOW, TOTAL_FRAMES); i++) hero.push(i);
        enqueue(hero);
        armFullLoad();
      }
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
}
