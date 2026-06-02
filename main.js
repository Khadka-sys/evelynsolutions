/* ═══════════════════════════════════════════════
   EVELYNX SOLUTIONS — SHARED SCRIPTS
═══════════════════════════════════════════════ */

// ── Progress bar & sticky nav ──
window.addEventListener('scroll', () => {
  const el = document.documentElement;
  const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  const prog = document.getElementById('prog');
  if (prog) prog.style.width = pct + '%';
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('bg', window.scrollY > 40);
  const bt = document.getElementById('backTop');
  if (bt) bt.classList.toggle('vis', window.scrollY > 500);
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
}, { threshold: 0.07 });
reveals.forEach(r => revObs.observe(r));

// ── Animated counters ──
const counters = document.querySelectorAll('.count');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.getAttribute('data-t');
    let n = 0; const step = target / 80;
    const tick = () => {
      n = Math.min(n + step, target);
      el.textContent = Math.ceil(n);
      if (n < target) requestAnimationFrame(tick);
    };
    tick(); countObs.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => countObs.observe(c));

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
const hamBtn = document.getElementById('hamBtn');
const mobMenu = document.getElementById('mobMenu');
if (hamBtn && mobMenu) {
  hamBtn.addEventListener('click', () => {
    mobMenu.classList.toggle('vis');
    hamBtn.classList.toggle('open');
  });
  document.querySelectorAll('.mob-menu a').forEach(l => {
    l.addEventListener('click', () => {
      mobMenu.classList.remove('vis');
      hamBtn.classList.remove('open');
    });
  });
}

// ── Chat widget ──
const chatBtn = document.getElementById('chatBtn');
const chatPop = document.getElementById('chatPop');
const chatClose = document.getElementById('chatClose');
const chatFloat = document.getElementById('chatFloat');
if (chatBtn) {
  chatBtn.addEventListener('click', e => { e.stopPropagation(); chatPop.classList.toggle('vis'); });
  if (chatClose) chatClose.addEventListener('click', () => chatPop.classList.remove('vis'));
  window.addEventListener('click', e => { if (chatFloat && !chatFloat.contains(e.target)) chatPop.classList.remove('vis'); });
}

// ── Cookie bar ──
const cookieBar = document.getElementById('cookieBar');
const cookieAccept = document.getElementById('cookieAccept');
if (cookieBar && !localStorage.getItem('ck')) setTimeout(() => cookieBar.classList.add('vis'), 1800);
if (cookieAccept) cookieAccept.addEventListener('click', () => { localStorage.setItem('ck', '1'); cookieBar.classList.remove('vis'); });

// ── Language toggle ──
const langBtn = document.getElementById('langBtn');
if (langBtn) {
  langBtn.addEventListener('click', function () {
    const isNe = this.textContent.includes('नेपाली');
    this.textContent = isNe ? '🇬🇧 English' : '🇳🇵 नेपाली';
  });
}

// ── Contact form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    const btn = contactForm.querySelector('.form-submit');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending…'; btn.disabled = true;
    // Actual submission handled by Formspree via action attribute
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

// ============================================
// MODERN INTERACTIVE FEATURES – No External Dependencies
// 3D Tilt | Gradient Mouse | Glow Cursor | Particles
// ============================================
(function() {
  'use strict';

  // 1. 3D Tilt Effect on Cards
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
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // 2. Animated Gradient Background (Mouse-follow)
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      hero.style.setProperty('--x', `${x}%`);
      hero.style.setProperty('--y', `${y}%`);
    });
  }

  // 3. Custom Glowing Cursor
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
  const interactive = document.querySelectorAll('a, button, .btn-dark, .btn-text, .nav-cta, .form-submit, .bento-cell, .svc-col');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('active'));
    el.addEventListener('mouseleave', () => glow.classList.remove('active'));
  });

  // 4. Floating Particles Canvas
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    let ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let resizeTimeout;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(Math.min(80, Math.floor(window.innerWidth / 20)));
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles(count = 80) {
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animateParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) { p.update(); p.draw(); }
      animationId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => { resizeCanvas(); }, 150);
    });
    resizeCanvas();
    animateParticles();
    window.addEventListener('beforeunload', () => { if (animationId) cancelAnimationFrame(animationId); });
  }
})();

