// ============================================================
//  SKILLUP COMPONENT — Enroll → Learn → Exam → Certificate
// ============================================================

const SkillUpComponent = {
  // Per-course state stored in localStorage
  getState(courseId) {
    try {
      return JSON.parse(localStorage.getItem(`rai_course_${courseId}`) || 'null');
    } catch { return null; }
  },

  setState(courseId, state) {
    localStorage.setItem(`rai_course_${courseId}`, JSON.stringify(state));
  },

  render() {
    return `
      <div class="section-header">
        <h2>SkillUp — Learn, Assess & Get Certified</h2>
        <p>Structured courses aligned with VTU 2022 RAI syllabus · Enroll → Watch Lessons → Take Exam → Earn Certificate</p>
      </div>
      <div class="grid-2" id="skillup-grid">
        ${COURSES.map(c => this.renderCourseCard(c)).join('')}
      </div>`;
  },

  renderCourseCard(c) {
    const state = this.getState(c.id) || { enrolled: false, progress: 0, passed: false };
    const progressPct = state.enrolled ? Math.round((state.progress / c.lessons.length) * 100) : 0;

    return `
      <div class="course-card" id="course-card-${c.id}">
        <div class="course-banner" style="background:${c.color}">${c.icon}</div>
        <div class="course-body">
          <div class="course-title">${c.title}</div>
          <div class="course-meta">${c.meta}</div>
          <div class="course-tags">
            ${c.tags.map(t => `<span class="pill pill-teal">${t}</span>`).join('')}
          </div>
          <div style="font-size:12.5px;color:var(--gray-4);margin-bottom:12px;line-height:1.5">${c.description}</div>

          ${state.enrolled ? `
            <div class="progress-wrap">
              <div class="progress-bar">
                <div class="progress-fill" style="width:${progressPct}%"></div>
              </div>
              <div class="progress-label">${state.progress}/${c.lessons.length} lessons · ${progressPct}% complete</div>
            </div>` : `
            <div style="font-size:12px;color:var(--gray-3);margin-bottom:12px">
              📖 ${c.lessons.length} lessons · 📝 ${c.quiz.length}-question final exam · 🏆 VTU Certificate
            </div>`}

          <div class="course-footer">
            ${state.passed
              ? `<button class="enroll-btn enroll-active" onclick="SkillUpComponent.showCertificate(${c.id})">🏆 View Certificate</button>`
              : state.enrolled
                ? `<button class="enroll-btn enroll-active" onclick="SkillUpComponent.openCourse(${c.id})">
                    ${progressPct === 100 ? '📝 Take Final Exam' : '▶ Continue Learning'}
                   </button>`
                : `<button class="enroll-btn enroll-open" onclick="SkillUpComponent.enroll(${c.id})">Enroll Free</button>`
            }
            ${state.passed
              ? `<button class="cert-btn" onclick="SkillUpComponent.downloadCert(${c.id})">⬇ PDF</button>`
              : state.enrolled
                ? `<button class="cert-btn" style="border-color:var(--gray-2);color:var(--gray-3)" onclick="SkillUpComponent.openCourse(${c.id})">
                     ${c.lessons.length - state.progress} left
                   </button>`
                : ''
            }
          </div>
        </div>
      </div>`;
  },

  enroll(courseId) {
    const user = Auth.getUser();
    if (!user) { showToast('Please sign in to enroll', 'error'); Router.go('auth'); return; }

    this.setState(courseId, { enrolled: true, progress: 0, passed: false, answers: {} });

    // Save to Supabase
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
      sb.upsert('enrollments', {
        user_id: user.id,
        course_id: courseId,
        progress: 0,
        enrolled_at: new Date().toISOString()
      }, 'user_id,course_id');
    }

    showToast('Enrolled successfully! 🎉', 'success');
    this.refreshCard(courseId);
    setTimeout(() => this.openCourse(courseId), 600);
  },

  openCourse(courseId) {
    const c = COURSES.find(x => x.id === courseId);
    const state = this.getState(courseId);

    if (state.progress >= c.lessons.length) {
      this.showExam(courseId);
      return;
    }

    const lessonIdx = state.progress;
    const lesson = c.lessons[lessonIdx];

    document.getElementById('modal-content').innerHTML = `
      <button class="modal-close-btn" onclick="closeModal()">×</button>
      <div style="font-size:11px;color:var(--gray-3);margin-bottom:6px">${c.title} · Lesson ${lessonIdx + 1} of ${c.lessons.length}</div>
      <div class="modal-title">${lesson}</div>

      <div style="background:var(--ivory-2);border-radius:10px;padding:1.25rem;margin-bottom:1.25rem;font-size:13.5px;line-height:1.8;color:var(--navy)">
        ${this.getLessonContent(c, lessonIdx)}
      </div>

      <div class="progress-bar" style="margin-bottom:8px">
        <div class="progress-fill" style="width:${Math.round((lessonIdx / c.lessons.length) * 100)}%"></div>
      </div>
      <div style="font-size:12px;color:var(--gray-3);margin-bottom:1.25rem">${lessonIdx} of ${c.lessons.length} completed</div>

      <div style="display:flex;gap:10px">
        ${lessonIdx > 0 ? `<button class="btn-secondary" onclick="SkillUpComponent.goLesson(${courseId}, ${lessonIdx - 1})">← Previous</button>` : ''}
        <button class="btn-primary" style="flex:1" onclick="SkillUpComponent.completeLesson(${courseId}, ${lessonIdx})">
          ${lessonIdx === c.lessons.length - 1 ? '✅ Complete & Take Exam' : 'Mark Complete & Next →'}
        </button>
      </div>`;
    openModal();
  },

  getLessonContent(c, idx) {
    const lesson = c.lessons[idx];
    // Generate contextual lesson content
    const contents = {
      'Introduction to Robot Mechanisms': 'Robots are programmable mechanical systems designed to manipulate objects or perform tasks autonomously. Key types: Cartesian, Cylindrical, Spherical, SCARA, Articulated, Parallel/Delta. <br><br><strong>Key terms:</strong> DOF (Degrees of Freedom), workspace, payload, repeatability, accuracy.',
      'Denavit-Hartenberg Parameters': 'The D-H convention uses 4 parameters to describe each link-joint relationship: <br>• <strong>a</strong> — link length (along x-axis)<br>• <strong>α</strong> — link twist (about x-axis)<br>• <strong>d</strong> — link offset (along z-axis)<br>• <strong>θ</strong> — joint angle (about z-axis)<br><br>Transformation: ⁱ⁻¹Tᵢ = Rot(z,θ)·Trans(0,0,d)·Trans(a,0,0)·Rot(x,α)',
      'Introduction to PLCs & Industrial Automation': 'PLCs replaced relay logic panels in the 1960s. A PLC scan cycle: <br>1. Read inputs → 2. Execute program → 3. Update outputs → 4. Housekeeping.<br><br>Advantages over relays: programmable, compact, reliable, diagnostic capability.',
      'Ladder Logic Programming Basics': 'Ladder Logic mimics relay schematic diagrams.<br>• <strong>XIC</strong> (Examine if Closed) — NO contact, true when bit=1<br>• <strong>XIO</strong> (Examine if Open) — NC contact, true when bit=0<br>• <strong>OTE</strong> (Output Energize) — standard coil<br>• <strong>OTL/OTU</strong> — latch/unlatch coils',
    };
    return contents[lesson] ||
      `<strong>${lesson}</strong><br><br>
      This lesson covers the theoretical foundations and practical applications of ${lesson.toLowerCase()} as per VTU 2022 RAI curriculum.<br><br>
      <strong>Learning Objectives:</strong><br>
      • Understand core concepts of ${lesson}<br>
      • Apply principles to robotic system design<br>
      • Solve VTU exam-level problems<br>
      • Connect theory to industrial practice<br><br>
      <em>Tip: Use the RAI Tutor tab to get detailed notes, explanations, and solved examples for this topic!</em>`;
  },

  goLesson(courseId, idx) {
    const c = COURSES.find(x => x.id === courseId);
    const lesson = c.lessons[idx];
    document.getElementById('modal-content').innerHTML = `
      <button class="modal-close-btn" onclick="closeModal()">×</button>
      <div style="font-size:11px;color:var(--gray-3);margin-bottom:6px">${c.title} · Lesson ${idx + 1} of ${c.lessons.length}</div>
      <div class="modal-title">${lesson}</div>
      <div style="background:var(--ivory-2);border-radius:10px;padding:1.25rem;margin-bottom:1.25rem;font-size:13.5px;line-height:1.8">
        ${this.getLessonContent(c, idx)}
      </div>
      <div style="display:flex;gap:10px">
        ${idx > 0 ? `<button class="btn-secondary" onclick="SkillUpComponent.goLesson(${courseId},${idx-1})">← Previous</button>` : ''}
        <button class="btn-primary" style="flex:1" onclick="SkillUpComponent.completeLesson(${courseId},${idx})">
          ${idx === c.lessons.length - 1 ? '✅ Complete & Take Exam' : 'Mark Complete & Next →'}
        </button>
      </div>`;
  },

  completeLesson(courseId, lessonIdx) {
    const c = COURSES.find(x => x.id === courseId);
    const state = this.getState(courseId);
    const newProgress = Math.max(state.progress, lessonIdx + 1);
    this.setState(courseId, { ...state, progress: newProgress });

    // Sync to Supabase
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
      const user = Auth.getUser();
      if (user) sb.upsert('enrollments', { user_id: user.id, course_id: courseId, progress: newProgress }, 'user_id,course_id');
    }

    this.refreshCard(courseId);

    if (newProgress >= c.lessons.length) {
      this.showExam(courseId);
    } else {
      this.openCourse(courseId);
    }
  },

  showExam(courseId) {
    const c = COURSES.find(x => x.id === courseId);
    let currentQ = 0;
    const answers = {};

    const renderQ = () => {
      const q = c.quiz[currentQ];
      document.getElementById('modal-content').innerHTML = `
        <button class="modal-close-btn" onclick="closeModal()">×</button>
        <div style="font-size:11px;color:var(--gray-3);margin-bottom:6px">Final Exam · Question ${currentQ + 1} of ${c.quiz.length}</div>
        <div class="modal-title">${c.title}</div>
        <div class="progress-bar" style="margin-bottom:1.25rem">
          <div class="progress-fill" style="width:${Math.round((currentQ / c.quiz.length) * 100)}%"></div>
        </div>
        <div class="quiz-question">Q${currentQ + 1}. ${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map((opt, oi) => `
            <label>
              <input type="radio" name="exam-q" value="${oi}"
                ${answers[currentQ] === oi ? 'checked' : ''}
                onchange="window._examAns = ${oi}">
              ${opt}
            </label>`).join('')}
        </div>
        <div class="quiz-nav">
          ${currentQ > 0
            ? `<button class="btn-secondary" onclick="(function(){answers[${currentQ - 1}] = window._examAns ?? answers[${currentQ - 1}]; currentQ = ${currentQ - 1}; renderQ();})()">← Back</button>`
            : '<span></span>'}
          ${currentQ < c.quiz.length - 1
            ? `<button class="btn-primary" onclick="(function(){if(window._examAns === undefined && answers[${currentQ}] === undefined){alert('Please select an answer');return;} answers[${currentQ}] = window._examAns ?? answers[${currentQ}]; window._examAns = answers[${currentQ + 1}]; currentQ = ${currentQ + 1}; renderQ();})()">Next →</button>`
            : `<button class="btn-primary" onclick="(function(){answers[${currentQ}] = window._examAns ?? answers[${currentQ}]; if(Object.keys(answers).length < ${c.quiz.length}){alert('Please answer all questions');return;} SkillUpComponent.submitExam(${courseId}, answers);})()">Submit Exam ✓</button>`
          }
        </div>`;
    };

    // Make renderQ accessible inside closures
    window._skillupRenderQ = renderQ;
    renderQ();
    openModal();
  },

  submitExam(courseId, answers) {
    const c = COURSES.find(x => x.id === courseId);
    let score = 0;
    c.quiz.forEach((q, i) => { if (parseInt(answers[i]) === q.ans) score++; });
    const pct = Math.round((score / c.quiz.length) * 100);
    const passed = pct >= 60;

    const state = this.getState(courseId);
    this.setState(courseId, { ...state, passed, score: pct });

    // Save result to Supabase
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
      const user = Auth.getUser();
      if (user) {
        sb.upsert('exam_results', {
          user_id: user.id,
          course_id: courseId,
          score: pct,
          passed,
          taken_at: new Date().toISOString()
        }, 'user_id,course_id');
      }
    }

    document.getElementById('modal-content').innerHTML = `
      <button class="modal-close-btn" onclick="closeModal();SkillUpComponent.renderAll()">×</button>
      <div class="modal-title">Exam Result — ${c.title}</div>

      <div style="text-align:center;padding:1.5rem 0">
        <div style="font-size:48px;margin-bottom:12px">${passed ? '🏆' : '📚'}</div>
        <div style="font-size:32px;font-weight:600;color:${passed ? 'var(--teal)' : 'var(--danger)'}">${pct}%</div>
        <div style="font-size:14px;color:var(--gray-4);margin-top:4px">${score} / ${c.quiz.length} correct</div>
        <div style="margin-top:12px;font-size:15px;font-weight:500;color:${passed ? 'var(--teal)' : 'var(--danger)'}">
          ${passed ? '✅ Passed! Certificate earned.' : '❌ Below 60% — please revise and retry.'}
        </div>
      </div>

      ${passed ? `
        <div class="cert-card" style="margin-bottom:1.25rem">
          <div class="cert-icon">🎓</div>
          <div style="font-size:11px;opacity:0.6;text-transform:uppercase;letter-spacing:1px">Certificate of Completion</div>
          <div class="cert-name">${c.title}</div>
          <div style="font-size:12px;opacity:0.7">VTU Dept. of Robotics & AI · 2022 Scheme</div>
          <div style="font-size:11px;opacity:0.55;margin-top:8px">Issued: ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn-secondary" style="flex:1" onclick="closeModal();SkillUpComponent.renderAll()">Done</button>
          <button class="btn-primary" style="flex:1" onclick="SkillUpComponent.downloadCert(${courseId})">⬇ Download Certificate</button>
        </div>` :
      `<div style="display:flex;gap:10px">
          <button class="btn-secondary" style="flex:1" onclick="closeModal();SkillUpComponent.renderAll()">Back to Courses</button>
          <button class="btn-primary" style="flex:1" onclick="SkillUpComponent.showExam(${courseId})">Retry Exam</button>
        </div>`}`;

    this.refreshCard(courseId);
  },

  showCertificate(courseId) {
    const c = COURSES.find(x => x.id === courseId);
    const user = Auth.getUser();
    const name = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

    document.getElementById('modal-content').innerHTML = `
      <button class="modal-close-btn" onclick="closeModal()">×</button>
      <div class="modal-title">Your Certificate</div>
      <div class="cert-card" id="cert-display">
        <div style="font-size:32px;margin-bottom:8px">🎓</div>
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;opacity:0.6">Certificate of Completion</div>
        <div style="font-size:14px;opacity:0.7;margin-top:6px">This certifies that</div>
        <div class="cert-name">${name}</div>
        <div style="font-size:14px;opacity:0.7">has successfully completed</div>
        <div style="font-size:16px;font-weight:600;margin:8px 0">${c.title}</div>
        <div style="font-size:12px;opacity:0.65">${c.meta}</div>
        <div style="font-size:11px;opacity:0.55;margin-top:12px">
          VTU Dept. of Robotics & AI · 2022 Scheme<br>
          Issued: ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:1rem">
        <button class="btn-secondary" style="flex:1" onclick="closeModal()">Close</button>
        <button class="btn-primary" style="flex:1" onclick="SkillUpComponent.downloadCert(${courseId})">⬇ Download PDF</button>
      </div>`;
    openModal();
  },

  downloadCert(courseId) {
    const c = COURSES.find(x => x.id === courseId);
    const user = Auth.getUser();
    const name = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';
    const date = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });

    // Generate certificate as a printable page
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html>
<html><head><title>Certificate — ${c.title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
  body { font-family: 'DM Sans', sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#F8F6F0; margin:0; }
  .cert { width:800px; padding:60px; background:linear-gradient(135deg,#0A1628 0%,#1E3055 50%,#0D7A5F 100%);
    color:white; border-radius:20px; text-align:center; position:relative; }
  .cert::before { content:''; position:absolute; inset:10px; border:1.5px solid rgba(255,255,255,0.2); border-radius:14px; }
  .cert-logo { font-size:52px; margin-bottom:16px; }
  .cert-heading { font-size:11px; text-transform:uppercase; letter-spacing:3px; opacity:0.6; margin-bottom:20px; }
  .cert-presented { font-size:15px; opacity:0.7; margin-bottom:8px; }
  .cert-name { font-size:34px; font-weight:300; color:#F5C060; margin:16px 0; }
  .cert-for { font-size:15px; opacity:0.7; margin-bottom:8px; }
  .cert-course { font-size:22px; font-weight:600; margin-bottom:24px; }
  .cert-meta { font-size:13px; opacity:0.6; line-height:1.8; }
  .cert-footer { display:flex; justify-content:space-between; margin-top:40px; padding-top:20px;
    border-top:1px solid rgba(255,255,255,0.2); font-size:12px; opacity:0.6; }
  @media print { body { background: white; } .cert { box-shadow: none; } }
</style></head><body>
  <div class="cert">
    <div class="cert-logo">🎓</div>
    <div class="cert-heading">Certificate of Completion</div>
    <div class="cert-presented">This certifies that</div>
    <div class="cert-name">${name}</div>
    <div class="cert-for">has successfully completed</div>
    <div class="cert-course">${c.title}</div>
    <div class="cert-meta">
      ${c.meta}<br>
      VTU Dept. of Robotics & Automation · 2022 Scheme<br>
      Issued on ${date}
    </div>
    <div class="cert-footer">
      <span>VTU 2022 Scheme</span>
      <span>Robotics & AI Department</span>
      <span>${date}</span>
    </div>
  </div>
  <script>window.onload = function(){ window.print(); }</script>
</body></html>`);
    win.document.close();
  },

  refreshCard(courseId) {
    const c = COURSES.find(x => x.id === courseId);
    const card = document.getElementById(`course-card-${courseId}`);
    if (card) card.outerHTML = this.renderCourseCard(c);
  },

  renderAll() {
    closeModal();
    document.getElementById('skillup-grid').innerHTML = COURSES.map(c => this.renderCourseCard(c)).join('');
  }
};
