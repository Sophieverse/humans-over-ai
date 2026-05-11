/* ═══════════════════════════════════════════════
   MACHINE-GENERATED — script.js
   ═══════════════════════════════════════════════ */

// ─── TERMINAL INTRO ────────────────────────────

const TERMINAL_LINES = [
  { text: "MAVEN SMART SYSTEM — OPERATIONAL LOG", cls: "" },
  { text: "────────────────────────────────────────────", cls: "dim" },
  { text: "DATE:       28 FEB", cls: "" },
  { text: "OPERATION:  IRAN STRIKE", cls: "" },
  { text: "SOURCE:     DoD INTELLIGENCE PACKAGE", cls: "dim" },
  { text: "", cls: "blank" },
  { text: "[OK]  Claude AI — intelligence processing complete", cls: "" },
  { text: "[OK]  Coordinate generation... complete", cls: "" },
  { text: "[OK]  Strategic importance ranking... complete", cls: "" },
  { text: "[OK]  Auto-generating legal justifications... complete", cls: "" },
  { text: "", cls: "blank" },
  { text: "[??]  Civilian harm assessment.......... RUNNING", cls: "warn" },
  { text: "[!!]  Civilian harm assessment.......... TIMEOUT", cls: "warn" },
  { text: "      Human oversight failed to keep up.", cls: "warn" },
  { text: "", cls: "blank" },
  { text: "TARGET:     SHAJAREH TAYYEBEH ELEMENTARY SCHOOL", cls: "white" },
  { text: "LOCATION:   MINAB, IRAN", cls: "white" },
  { text: "CLASS:      STRATEGICALLY IMPORTANT", cls: "white" },
  { text: "CIVILIAN:   NOT FLAGGED", cls: "warn" },
  { text: "AUTH:       ██ APPROVED", cls: "err" },
  { text: "", cls: "blank" },
  { text: "> 1,000+ TARGETS STRUCK IN 24 HOURS.", cls: "dim" },
  { text: "> MAVEN SMART SYSTEM — JOB COMPLETE.", cls: "dim" },
];

const CHAR_SPEED   = { default: 28, fast: 14, slow: 48 };
const LINE_PAUSE   = { blank: 100, warn: 240, err: 500, white: 120, default: 60 };
const END_HOLD     = 2200;

let lineIdx   = 0;
let charIdx   = 0;
let lineEl    = null;
let skipFlag  = false;
let termOut;

function typeChar() {
  if (skipFlag) { revealArticle(); return; }
  if (lineIdx >= TERMINAL_LINES.length) { setTimeout(revealArticle, END_HOLD); return; }

  const line = TERMINAL_LINES[lineIdx];

  if (charIdx === 0) {
    lineEl = document.createElement('span');
    lineEl.className = `t-line ${line.cls}`;
    termOut.appendChild(lineEl);
  }

  if (charIdx < line.text.length) {
    lineEl.textContent += line.text[charIdx];
    charIdx++;
    const speed = line.cls === 'dim'
      ? CHAR_SPEED.fast
      : line.text.length > 44 ? CHAR_SPEED.fast : CHAR_SPEED.default;
    setTimeout(typeChar, speed + Math.random() * 12);
  } else {
    lineIdx++;
    charIdx = 0;
    const pause = line.cls === 'blank' ? LINE_PAUSE.blank
      : line.cls === 'err'  ? LINE_PAUSE.err
      : line.cls === 'warn' ? LINE_PAUSE.warn
      : line.cls === 'white'? LINE_PAUSE.white
      : LINE_PAUSE.default;
    termOut.scrollTop = termOut.scrollHeight;
    setTimeout(typeChar, pause);
  }
}

function revealArticle() {
  const overlay = document.getElementById('terminal-overlay');
  overlay.classList.add('fade-out');
  const article = document.getElementById('article');
  article.classList.remove('hidden');
  setTimeout(() => { overlay.style.display = 'none'; }, 1100);
}

// ─── SCROLL PROGRESS BAR ───────────────────────

function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

// ─── REVEAL ON SCROLL ──────────────────────────

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ─── NUMBER COUNTERS ───────────────────────────

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCount(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(easeOutCubic(progress) * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target, parseInt(entry.target.dataset.target, 10), 1600);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  els.forEach(el => observer.observe(el));
}

// ─── HERO PARALLAX (subtle) ────────────────────

function initParallax() {
  const headline = document.querySelector('.headline');
  if (!headline || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    headline.style.transform = `translateY(${y * 0.12}px)`;
  }, { passive: true });
}

// ─── INIT ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  termOut = document.getElementById('terminal-output');

  document.getElementById('skip-intro').addEventListener('click', () => {
    skipFlag = true;
    revealArticle();
  });

  // Keyboard skip (Escape or Space)
  document.addEventListener('keydown', (e) => {
    if (!skipFlag && (e.key === 'Escape' || e.key === ' ')) {
      e.preventDefault();
      skipFlag = true;
      revealArticle();
    }
  });

  setTimeout(typeChar, 800);

  initProgressBar();
  initReveal();
  initCounters();
  initParallax();
});
