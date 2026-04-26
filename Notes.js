// ============================================================
//  NOTES COMPONENT
// ============================================================

const NotesComponent = {
  activeFilter: 'All',

  render() {
    return `
      <div class="section-header">
        <h2>Study Notes & Resources</h2>
        <p>Module-wise notes for all core subjects · Use "AI Notes" to generate custom notes via RAI Tutor</p>
      </div>
      <div class="filter-row">
        ${['All','3','4','5','6','7'].map(s => `
          <button class="filter-btn ${s === this.activeFilter ? 'active' : ''}"
            onclick="NotesComponent.setFilter('${s}')">${s === 'All' ? 'All Semesters' : 'Sem ' + s}</button>`).join('')}
      </div>
      <div class="grid-3" id="notes-grid">
        ${this.renderNotes()}
      </div>`;
  },

  renderNotes() {
    const list = this.activeFilter === 'All'
      ? NOTES
      : NOTES.filter(n => n.sem === this.activeFilter);
    return list.map(n => `
      <div class="note-card">
        <div class="note-icon-wrap" style="background:var(--ivory-2)">${n.icon}</div>
        <div class="note-title">${n.title}</div>
        <div class="note-sub">${n.subject} · Sem ${n.sem} · ~${n.pages} pages</div>
        <div class="note-actions">
          <button class="btn-sm" onclick="NotesComponent.view(${n.id})">View</button>
          <button class="btn-sm" onclick="NotesComponent.download(${n.id})">⬇ PDF</button>
          <button class="btn-sm primary" onclick="NotesComponent.aiNotes(${n.id})">✨ AI Notes</button>
        </div>
      </div>`).join('');
  },

  setFilter(f) {
    this.activeFilter = f;
    document.getElementById('notes-grid').innerHTML = this.renderNotes();
    document.querySelectorAll('#tab-notes .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(f === 'All' ? 'All' : f));
    });
  },

  view(id) {
    const n = NOTES.find(x => x.id === id);
    if (n.driveUrl && n.driveUrl !== '#') window.open(n.driveUrl, '_blank');
    else showToast('Drive link not set yet — add driveUrl in data.js', 'error');
  },

  download(id) {
    const n = NOTES.find(x => x.id === id);
    if (n.driveUrl && n.driveUrl !== '#') window.open(n.driveUrl, '_blank');
    else showToast('Add your Google Drive PDF link in src/lib/data.js', 'error');
  },

  aiNotes(id) {
    const n = NOTES.find(x => x.id === id);
    Router.go('tutor');
    setTimeout(() => {
      TutorComponent.injectPrompt(
        `Generate comprehensive study notes for "${n.title}" (${n.subject}) as per VTU 2022 scheme. ` +
        `Include: key definitions, important theorems/formulas, module-wise breakdown, diagrams described in text, ` +
        `VTU exam-oriented important questions, and a quick-revision summary.`
      );
    }, 300);
  }
};
