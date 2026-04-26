// ============================================================
//  RAI PORTAL — APP BOOTSTRAP
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── BUILD SHELL ──────────────────────────────────────────
  document.getElementById('app').innerHTML = `

    <!-- TOPBAR -->
    <header id="topbar">
      <div class="topbar-brand">
        <div class="dot">🤖</div>
        <span>RAI Dept Portal</span>
      </div>
      <div class="topbar-right" id="topbar-right">
        <!-- filled by renderTopbar() -->
      </div>
    </header>

    <!-- HERO -->
    <div id="hero">
      <div class="hero-inner">
        <div class="hero-tag">🎓 VTU 2022 Scheme · B.E. Robotics & Automation</div>
        <h1>Department of Robotics & Artificial Intelligence</h1>
        <p>Your complete academic hub — syllabus, textbooks, notes, AI tutor, and skill certifications.</p>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">8</div><div class="lbl">Semesters</div></div>
          <div class="hero-stat"><div class="num">48+</div><div class="lbl">Subjects</div></div>
          <div class="hero-stat"><div class="num">22</div><div class="lbl">Textbooks</div></div>
          <div class="hero-stat"><div class="num">6</div><div class="lbl">SkillUp Courses</div></div>
        </div>
      </div>
    </div>

    <!-- TAB NAV -->
    <nav id="tab-nav">
      <button class="tab-btn active" data-tab="syllabus" onclick="Router.go('syllabus')">
        <span class="tab-icon">📚</span> Syllabus
      </button>
      <button class="tab-btn" data-tab="textbooks" onclick="Router.go('textbooks')">
        <span class="tab-icon">📖</span> Textbooks
      </button>
      <button class="tab-btn" data-tab="notes" onclick="Router.go('notes')">
        <span class="tab-icon">📝</span> Notes
      </button>
      <button class="tab-btn" data-tab="tutor" onclick="Router.go('tutor')">
        <span class="tab-icon">🤖</span> RAI Tutor
      </button>
      <button class="tab-btn" data-tab="skillup" onclick="Router.go('skillup')">
        <span class="tab-icon">🎓</span> SkillUp
      </button>
    </nav>

    <!-- MAIN CONTENT -->
    <main id="main-content"></main>

    <!-- MODAL -->
    <div class="modal-overlay" id="modal-overlay" onclick="handleOverlayClick(event)">
      <div class="modal-box" id="modal-content"></div>
    </div>

    <!-- TOAST -->
    <div id="toast"></div>

    <!-- FOOTER -->
    <footer id="footer">
      <span>RAI Dept Portal</span> · VTU 2022 Scheme · Built with ❤️ for Robotics & AI students
    </footer>`;

  // ── TOPBAR ───────────────────────────────────────────────
  renderTopbar();

  // ── ROUTER INIT ──────────────────────────────────────────
  Router.init();
  Router.render();
});

// ── TOPBAR RENDER ─────────────────────────────────────────
function renderTopbar() {
  const user = Auth.getUser();
  const el = document.getElementById('topbar-right');
  if (!el) return;

  if (user) {
    const name = user.user_metadata?.name || user.email?.split('@')[0] || 'Student';
    const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    el.innerHTML = `
      <div id="user-badge">
        <div id="user-avatar">${initials}</div>
        <span>${name}</span>
      </div>
      <button onclick="signOut()">Sign Out</button>`;
  } else {
    el.innerHTML = `
      <button onclick="Router.go('auth')">Sign In</button>
      <button class="primary" onclick="Router.go('auth')">Sign Up Free</button>`;
  }
}

// ── SIGN OUT ─────────────────────────────────────────────
async function signOut() {
  await sb.signOut();
  Auth.clear();
  showToast('Signed out successfully');
  setTimeout(() => window.location.reload(), 800);
}

// ── MODAL HELPERS ─────────────────────────────────────────
function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

// ── TOAST ────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `show ${type}`;
  setTimeout(() => { t.className = ''; }, 3200);
}

// ── KEYBOARD SHORTCUTS ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
