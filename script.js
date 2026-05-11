/* ═══════════════════════════════════════════════
   WAKE UP, AMERICA — script.js
   ═══════════════════════════════════════════════ */

// ─── PROGRESS BAR ──────────────────────────────

function initProgress() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

// ─── CHAPTER TRACKING ──────────────────────────

const CHAPTER_COLORS = {
  ch1: '#c41e3a',
  ch2: '#1a7bc4',
  ch3: '#2d9e4f',
  ch4: '#c49a1a',
};

function initChapterTracking() {
  const chapters = document.querySelectorAll('.chapter');
  const navItems = document.querySelectorAll('.sb-item');
  const bar = document.getElementById('progress-bar');
  const CHAPTER_ORDER = ['ch1', 'ch2', 'ch3', 'ch4'];
  const visible = new Set();

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.add(entry.target.id);
      } else {
        visible.delete(entry.target.id);
      }
    });

    // Always activate the earliest visible chapter in document order
    const activeId = CHAPTER_ORDER.find(id => visible.has(id));
    if (!activeId) return;

    const color = CHAPTER_COLORS[activeId] || '#888';
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.target === activeId);
    });
    bar.style.background = color;
    bar.style.boxShadow = `0 0 8px ${color}`;
  }, { threshold: 0, rootMargin: '-10% 0px -60% 0px' });

  chapters.forEach(ch => obs.observe(ch));

  // Nav click → smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
}

// ─── SCROLL REVEAL ─────────────────────────────

function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── MOBILE SIDEBAR ────────────────────────────

function initMobile() {
  const btn = document.getElementById('menu-btn');
  const sb  = document.getElementById('sidebar');

  btn.addEventListener('click', () => sb.classList.toggle('open'));

  document.addEventListener('click', (e) => {
    if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn) {
      sb.classList.remove('open');
    }
  });
}

// ─── KEYBOARD SHORTCUTS ────────────────────────

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    const chapters = ['ch1', 'ch2', 'ch3', 'ch4'];
    const active = document.querySelector('.sb-item.active');
    if (!active) return;
    const idx = chapters.indexOf(active.dataset.target);
    if (e.key === 'ArrowDown' && idx < chapters.length - 1) {
      document.getElementById(chapters[idx + 1]).scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp' && idx > 0) {
      document.getElementById(chapters[idx - 1]).scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ─── INIT ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initChapterTracking();
  initReveal();
  initMobile();
  initKeyboard();
});
