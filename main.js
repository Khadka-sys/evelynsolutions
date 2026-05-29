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
