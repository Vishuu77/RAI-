// ============================================================
//  SYLLABUS COMPONENT
// ============================================================

const SyllabusComponent = {
  render() {
    const stats = [
      { ico: '📅', num: '8', lbl: 'Semesters' },
      { ico: '📚', num: '160', lbl: 'Total Credits' },
      { ico: '🧪', num: '48+', lbl: 'Subjects' },
      { ico: '🎓', num: '2022', lbl: 'VTU Scheme' }
    ];

    return `
      <div class="section-header">
        <h2>VTU 2022 Scheme — B.E. Robotics & Automation</h2>
        <p>Complete 8-semester syllabus as per JBOS 10.02.2023/V5 circular · OBE & CBCS · Effective 2023-24</p>
      </div>

      <div class="grid-4" style="margin-bottom:2rem">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="ico">${s.ico}</div>
            <div class="num">${s.num}</div>
            <div class="lbl">${s.lbl}</div>
          </div>`).join('')}
      </div>

      <div class="grid-2" id="sem-grid">
        ${SEMESTERS.map((s, i) => this.renderSemCard(s, i)).join('')}
      </div>`;
  },

  renderSemCard(s, i) {
    return `
      <div class="sem-card">
        <div class="sem-header">
          <div class="sem-badge" style="background:${s.bg};color:${s.color}">${s.num}</div>
          <div class="sem-info">
            <h3>${s.label}</h3>
            <span>${s.note}</span>
          </div>
        </div>
        <ul class="subject-list">
          ${s.subjects.map(sub => `
            <li class="subject-item">
              <span class="sub-code">${sub.code}</span>
              <span class="sub-name">${sub.name}
                <span class="pill ${TYPE_COLORS[sub.type] || 'pill-gray'}" style="margin-left:5px;font-size:9px">${sub.type}</span>
              </span>
            </li>`).join('')}
        </ul>
        ${s.electives.length ? `
          <button class="elective-toggle" onclick="SyllabusComponent.toggleElectives(${i})">
            <span>+</span> <span>${s.electives.length} Elective Options</span>
          </button>
          <ul class="subject-list elective-list" id="el-${i}">
            ${s.electives.map(e => `
              <li class="subject-item">
                <span class="sub-code" style="min-width:14px">▸</span>
                <span class="sub-name" style="color:var(--gray-3);font-style:italic">${e}</span>
              </li>`).join('')}
          </ul>` : ''}
      </div>`;
  },

  toggleElectives(i) {
    const el = document.getElementById('el-' + i);
    const btn = el.previousElementSibling;
    el.classList.toggle('open');
    btn.innerHTML = el.classList.contains('open')
      ? '<span>−</span> <span>Hide Electives</span>'
      : `<span>+</span> <span>${SEMESTERS[i].electives.length} Elective Options</span>`;
  }
};
