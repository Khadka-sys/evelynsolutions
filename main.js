/* ═══════════════════════════════════════════════
   EVELYNX SOLUTIONS — SHARED SCRIPTS (REFINED)
═══════════════════════════════════════════════ */

// ── DOM Elements ──
const prog = document.getElementById('prog');
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');
const hamBtn = document.getElementById('hamBtn');
const mobMenu = document.getElementById('mobMenu');
const chatBtn = document.getElementById('chatBtn');
const chatPop = document.getElementById('chatPop');
const chatClose = document.getElementById('chatClose');
const chatFloat = document.getElementById('chatFloat');
const cookieBar = document.getElementById('cookieBar');
const cookieAccept = document.getElementById('cookieAccept');
const langBtn = document.getElementById('langBtn');
const contactForm = document.getElementById('contactForm');

// ==================== CORE FUNCTIONALITY ====================

// ── Progress bar & sticky nav ──
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrollPercent = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  if (prog) prog.style.width = scrollPercent + '%';
  if (nav) nav.classList.toggle('bg', window.scrollY > 40);
  if (backTop) backTop.classList.toggle('vis', window.scrollY > 500);
});

// ── Scroll reveal (existing .reveal classes) ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ── Animated counters ──
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.getAttribute('data-t');
    if (isNaN(target)) return;
    let current = 0;
    const step = target / 80;
    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.ceil(current);
      if (current < target) requestAnimationFrame(update);
    };
    update();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(c => counterObserver.observe(c));

// ── FAQ accordion ──
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── Mobile nav ──
if (hamBtn && mobMenu) {
  hamBtn.addEventListener('click', () => {
    mobMenu.classList.toggle('vis');
    hamBtn.classList.toggle('open');
  });
  document.querySelectorAll('.mob-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobMenu.classList.remove('vis');
      hamBtn.classList.remove('open');
    });
  });
}

// ── Chat widget ──
if (chatBtn && chatPop && chatFloat) {
  chatBtn.addEventListener('click', e => {
    e.stopPropagation();
    chatPop.classList.toggle('vis');
  });
  if (chatClose) chatClose.addEventListener('click', () => chatPop.classList.remove('vis'));
  window.addEventListener('click', e => {
    if (!chatFloat.contains(e.target)) chatPop.classList.remove('vis');
  });
}

// ── Cookie bar ──
if (cookieBar && !localStorage.getItem('ck')) {
  setTimeout(() => cookieBar.classList.add('vis'), 1800);
}
if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('ck', '1');
    cookieBar.classList.remove('vis');
  });
}

// ── Language toggle (button text only – actual translation is handled per‑page) ──
if (langBtn) {
  langBtn.addEventListener('click', function() {
    const isNepali = this.textContent.includes('नेपाली');
    this.textContent = isNepali ? '🇬🇧 English' : '🇳🇵 नेपाली';
  });
}

// ── Contact form (visual feedback only – actual submit via Formspree) ──
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('.form-submit');
    const msg = document.getElementById('formMsg');
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    setTimeout(() => { if (msg) msg.style.display = 'block'; }, 800);
  });
}

// ── Staggered reveal delays ──
document.querySelectorAll('[data-delay]').forEach(el => {
  el.style.transitionDelay = el.getAttribute('data-delay') + 'ms';
});

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ==================== MODERN INTERACTIVE FEATURES ====================

// 1. 3D Tilt Effect for Cards (no duplicates)
const tiltCards = document.querySelectorAll('.bento-cell, .svc-col, .testi-card, .step');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// 2. Custom Glowing Cursor (single instance)
const glowCursor = document.createElement('div');
glowCursor.className = 'cursor-glow';
document.body.appendChild(glowCursor);

document.addEventListener('mousemove', (e) => {
  glowCursor.style.left = e.clientX + 'px';
  glowCursor.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, .btn-dark, .btn-text, .nav-cta, .form-submit, .bento-cell, .svc-col');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => glowCursor.classList.add('active'));
  el.addEventListener('mouseleave', () => glowCursor.classList.remove('active'));
});

// 3. Animated Gradient Background (mouse‑follow) – only if .hero exists
const heroSection = document.querySelector('.hero');
if (heroSection) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    heroSection.style.setProperty('--x', `${x}%`);
    heroSection.style.setProperty('--y', `${y}%`);
  });
}

// 4. Floating Particles Canvas (only if the canvas element exists)
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
  let ctx = particleCanvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let resizeTimeout;

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    initParticles(Math.min(80, Math.floor(window.innerWidth / 20)));
  }

  class Particle {
    constructor() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = particleCanvas.width;
      if (this.x > particleCanvas.width) this.x = 0;
      if (this.y < 0) this.y = particleCanvas.height;
      if (this.y > particleCanvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(125, 211, 252, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    animationId = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => resizeParticleCanvas(), 150);
  });
  resizeParticleCanvas();
  animateParticles();
  window.addEventListener('beforeunload', () => {
    if (animationId) cancelAnimationFrame(animationId);
  });
}

// Dynamic gradient shift based on scroll and mouse position
(function() {
  const headings = document.querySelectorAll('.hero-h1, .sec-h');
  if (!headings.length) return;

  function updateGradientPosition() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const mouseX = (mouseXposition / window.innerWidth) || 0.5;
    // Combine scroll (vertical) and mouse (horizontal) for a dynamic shift
    const shiftX = 30 + (mouseX * 40); // 30% to 70%
    const shiftY = 30 + (scrollPercent * 40); // 30% to 70%
    headings.forEach(heading => {
      heading.style.backgroundPosition = `${shiftX}% ${shiftY}%`;
    });
  }

  let mouseXposition = 0.5;
  window.addEventListener('mousemove', (e) => {
    mouseXposition = e.clientX / window.innerWidth;
    updateGradientPosition();
  });
  window.addEventListener('scroll', updateGradientPosition);
  updateGradientPosition();
})();