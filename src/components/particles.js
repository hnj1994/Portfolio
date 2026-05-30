/**
 * Ambient Particle System
 * Floating data-stream particles in the background
 */

export function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 60;
  const particles = [];

  const colors = [
    'rgba(0, 120, 212, 0.5)',
    'rgba(0, 214, 255, 0.4)',
    'rgba(0, 255, 136, 0.3)',
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.5 - 0.1;
      this.size = Math.random() * 1.5 + 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.6 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 150;
      // Randomly a line/streak
      this.isStreak = Math.random() > 0.7;
      this.streakLen = Math.random() * 20 + 8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;

      // Fade in/out
      const halfLife = this.maxLife / 2;
      if (this.life < halfLife) {
        this.currentAlpha = (this.life / halfLife) * this.alpha;
      } else {
        this.currentAlpha = ((this.maxLife - this.life) / halfLife) * this.alpha;
      }

      if (this.life >= this.maxLife || this.y < -20) {
        this.reset();
        this.y = canvas.height + 20;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.currentAlpha;

      if (this.isStreak) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx * this.streakLen, this.y + this.vy * this.streakLen);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * 0.5;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife; // Stagger start
    particles.push(p);
  }

  let raf;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    raf = requestAnimationFrame(animate);
  }

  animate();

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else animate();
  });
}
