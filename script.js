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
  { t: "     > AI deepfakes swinging elections in Slovakia and New Hampshire.", c: "dim" },
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

const SPEED = { default: 22, dim: 12, hi: 30, warn: 40 };
const PAUSE = { end: 1600, warn: 500, hi: 120, default: 60, blank: 80 };

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
    setTimeout(typeChar, speed + Math.random() * 10);
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
  const main = document.getElementById('main');
  main.classList.add('visible');
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
};

function initChapterTracking() {
  const chapters = document.querySelectorAll('.chapter');
  const navItems = document.querySelectorAll('.sb-item');
  const bar = document.getElementById('progress-bar');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const color = CHAPTER_COLORS[id] || '#888';

        // Update nav active state
        navItems.forEach(item => {
          const isActive = item.dataset.target === id;
          item.classList.toggle('active', isActive);
        });

        // Update sidebar active color and progress bar
        document.getElementById('sidebar').style.setProperty('--sb-active-ch', color);
        bar.style.setProperty('--pb-col', color);
        bar.style.background = color;
        bar.style.boxShadow = `0 0 8px ${color}`;
      }
    });
  }, { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' });

  chapters.forEach(ch => obs.observe(ch));

  // Nav click → smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile sidebar
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

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn) {
      sb.classList.remove('open');
    }
  });
}

// ─── KEYBOARD SHORTCUTS ────────────────────────

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Skip terminal
    if (!skip && (e.key === 'Escape' || e.key === ' ')) {
      e.preventDefault();
      skip = true;
      reveal();
      return;
    }
    // Chapter navigation with arrow keys
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
  tOut = document.getElementById('t-out');

  document.getElementById('skip-btn').addEventListener('click', () => {
    skip = true;
    reveal();
  });

  setTimeout(typeChar, 700);

  initProgress();
  initChapterTracking();
  initReveal();
  initMobile();
  initKeyboard();

  // Set initial sidebar color
  document.getElementById('sidebar').style.setProperty('--sb-active-ch', '#c41e3a');
});
