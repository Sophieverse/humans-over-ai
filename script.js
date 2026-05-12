/* ═══════════════════════════════════════════════
   WAKE UP, AMERICA — script.js
   ═══════════════════════════════════════════════ */

// ─── TERMINAL INTRO ────────────────────────────

const LINES = [
  { t: "WAKE UP, AMERICA — AI CRISIS REPORT", c: "" },
  { t: "────────────────────────────────────────────", c: "dim" },
  { t: "", c: "" },
  { t: "[01] CRIMES AGAINST HUMANITY", c: "hi" },
  { t: "     > 175 schoolchildren killed by AI-generated strike coordinates.", c: "dim" },
  { t: "     > Human oversight failed to keep up.", c: "dim" },
  { t: "", c: "" },
  { t: "[02] PRIVACY & DEMOCRACY", c: "hi" },
  { t: "     > 80,000 cameras feeding data to federal immigration enforcement.", c: "dim" },
  { t: "     > AI deepfakes influencing elections in Slovakia and New Hampshire.", c: "dim" },
  { t: "", c: "" },
  { t: "[03] CLEAN AIR & CLIMATE", c: "hi" },
  { t: "     > 25 illegal turbines powering the world's largest AI supercomputer.", c: "dim" },
  { t: "     > Data centers on track to consume 12% of national electricity by 2028.", c: "dim" },
  { t: "", c: "" },
  { t: "[04] CHILD SAFETY & MENTAL HEALTH", c: "hi" },
  { t: "     > A 13-year-old told an AI she was suicidal 55 times.", c: "dim" },
  { t: "     > Each time, it told her it cared.", c: "dim" },
  { t: "", c: "" },
  { t: "LOADING FULL REPORT...", c: "warn" },
];

const SPEED = { default: 22, dim: 12, hi: 26, warn: 32 };
const PAUSE = { end: 5000, warn: 260, hi: 70, default: 38, blank: 50 };

let lIdx = 0, cIdx = 0, lEl = null, skip = false;
let tOut;

function typeChar() {
  if (skip) { reveal(); return; }
  if (lIdx >= LINES.length) { setTimeout(reveal, PAUSE.end); return; }

  const line = LINES[lIdx];

  if (cIdx === 0) {
    lEl = document.createElement('span');
    lEl.className = `tl ${line.c}`;
    tOut.appendChild(lEl);
  }

  if (cIdx < line.t.length) {
    lEl.textContent += line.t[cIdx++];
    const speed = SPEED[line.c] || SPEED.default;
    setTimeout(typeChar, speed + Math.random() * 5);
  } else {
    lIdx++; cIdx = 0;
    const pause = !line.t ? PAUSE.blank
      : line.c === 'warn' ? PAUSE.warn
      : line.c === 'hi'   ? PAUSE.hi
      : PAUSE.default;
    tOut.scrollTop = tOut.scrollHeight;
    setTimeout(typeChar, pause);
  }
}

function reveal() {
  document.getElementById('terminal-overlay').classList.add('fade-out');
  document.getElementById('main').classList.add('visible');
  setTimeout(() => {
    document.getElementById('terminal-overlay').style.display = 'none';
  }, 1100);
}

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
  ch5: '#c42d8c',
  ch6: '#4878a0',
  ch7: '#7c5cbf',
  ch8: '#c44e1a',
};

function initChapterTracking() {
  const chapters = document.querySelectorAll('.chapter');
  const navItems = document.querySelectorAll('.sb-item');
  const bar = document.getElementById('progress-bar');
  const CHAPTER_ORDER = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'];
  const visible = new Set();
  let dwellTimer = null;
  let navLockTimer = null;
  let navLocked = false;

  function setActive(id) {
    const color = CHAPTER_COLORS[id] || '#888';
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.target === id);
    });
    bar.style.background = color;
    bar.style.boxShadow = `0 0 8px ${color}`;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.add(entry.target.id);
      } else {
        visible.delete(entry.target.id);
      }
    });

    if (navLocked) return;

    clearTimeout(dwellTimer);
    dwellTimer = setTimeout(() => {
      const activeId = CHAPTER_ORDER.find(id => visible.has(id));
      if (activeId) setActive(activeId);
    }, 450);
  }, { threshold: 0, rootMargin: '-10% 0px -60% 0px' });

  chapters.forEach(ch => obs.observe(ch));

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        // Immediately highlight the clicked chapter and lock out the observer
        // for 1.5s so the smooth-scroll animation can't trigger intermediate chapters
        clearTimeout(dwellTimer);
        clearTimeout(navLockTimer);
        navLocked = true;
        setActive(item.dataset.target);
        navLockTimer = setTimeout(() => { navLocked = false; }, 1500);

        target.scrollIntoView({ behavior: 'instant' });
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
}

// ─── TITLE UNDERLINES ──────────────────────────

function initTitleUnderlines() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('underline-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.ch-title-big').forEach(el => obs.observe(el));
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

// ─── SUB-SECTION NAV ───────────────────────────

function initSubNav() {
  document.querySelectorAll('.sb-sub-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
}

// ─── KEYBOARD SHORTCUTS ────────────────────────

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (!skip && (e.key === 'Escape' || e.key === ' ')) {
      e.preventDefault();
      skip = true;
      reveal();
      return;
    }
    const chapters = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'];
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

// ─── THEME ─────────────────────────────────────

function initTheme() {
  const btn  = document.getElementById('theme-btn');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);
  btn.textContent = html.getAttribute('data-theme') === 'light' ? '☾' : '☀';

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'light' ? '☾' : '☀';
  });
}

// ─── INIT ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  tOut = document.getElementById('t-out');

  document.getElementById('skip-btn').addEventListener('click', () => {
    skip = true;
    reveal();
  });

  setTimeout(typeChar, 700);

  initProgress();
  initChapterTracking();
  initReveal();
  initTitleUnderlines();
  initMobile();
  initSubNav();
  initKeyboard();
  initTheme();
});
