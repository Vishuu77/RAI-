// ============================================================
//  TEXTBOOKS COMPONENT
// ============================================================

const TextbooksComponent = {
  activeFilter: 'All',

  render() {
    const fields = ['All', ...new Set(TEXTBOOKS.map(b => b.field))];
    return `
      <div class="section-header">
        <h2>Prescribed Textbooks</h2>
        <p>Standard references for all VTU 2022 Scheme R&A subjects — click Download to open from Google Drive</p>
      </div>
      <div class="filter-row">
        ${fields.map(f => `
          <button class="filter-btn ${f === this.activeFilter ? 'active' : ''}"
            onclick="TextbooksComponent.setFilter('${f}')">${f}</button>`).join('')}
      </div>
      <div class="grid-3" id="book-grid">
        ${this.renderBooks()}
      </div>`;
  },

  renderBooks() {
    const list = this.activeFilter === 'All'
      ? TEXTBOOKS
      : TEXTBOOKS.filter(b => b.field === this.activeFilter);
    return list.map(b => `
      <div class="book-card">
        <div class="book-cover" style="background:${b.color}">${b.icon}</div>
        <div class="book-body">
          <div class="book-title">${b.title}</div>
          <div class="book-author">${b.author}</div>
          <div class="book-meta">
            <span class="pill pill-gray">${b.edition}</span>
            <span class="pill pill-teal">Sem ${b.sem}</span>
            <span class="pill pill-navy">${b.field}</span>
          </div>
          <div class="book-actions">
            <button class="btn-sm" onclick="TextbooksComponent.preview(${b.id})">Preview</button>
            <button class="btn-sm primary" onclick="TextbooksComponent.download(${b.id})">⬇ Download</button>
          </div>
        </div>
      </div>`).join('');
  },

  setFilter(f) {
    this.activeFilter = f;
    document.getElementById('book-grid').innerHTML = this.renderBooks();
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === f);
    });
  },

  preview(id) {
    const b = TEXTBOOKS.find(x => x.id === id);
    showToast(`Opening preview for "${b.title}"…`);
    if (b.driveUrl && b.driveUrl !== '#') window.open(b.driveUrl, '_blank');
    else showToast('Drive link not configured yet — add driveUrl in data.js', 'error');
  },

  download(id) {
    const b = TEXTBOOKS.find(x => x.id === id);
    if (b.driveUrl && b.driveUrl !== '#') {
      window.open(b.driveUrl, '_blank');
    } else {
      showToast('Add your Google Drive PDF link in src/lib/data.js → driveUrl', 'error');
    }
  }
};
