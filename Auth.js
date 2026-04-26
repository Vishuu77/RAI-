// ============================================================
//  ROUTER — Hash-based SPA navigation
// ============================================================

const Router = {
  routes: {
    auth:      () => AuthComponent.render(),
    syllabus:  () => SyllabusComponent.render(),
    textbooks: () => TextbooksComponent.render(),
    notes:     () => NotesComponent.render(),
    tutor:     () => TutorComponent.render(),
    skillup:   () => SkillUpComponent.render(),
  },

  currentRoute: 'syllabus',

  go(route) {
    this.currentRoute = route;
    window.location.hash = route;
    this.render();
  },

  render() {
    const route = this.currentRoute;
    const content = document.getElementById('main-content');
    const tabNav = document.getElementById('tab-nav');
    const isAuth = route === 'auth';

    tabNav.style.display = isAuth ? 'none' : 'flex';
    content.innerHTML = this.routes[route] ? this.routes[route]() : this.routes['syllabus']();

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === route);
    });
  },

  init() {
    const hash = window.location.hash.replace('#', '');
    this.currentRoute = this.routes[hash] ? hash : 'syllabus';

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (this.routes[h]) { this.currentRoute = h; this.render(); }
    });
  }
};
