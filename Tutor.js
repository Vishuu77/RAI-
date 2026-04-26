// ============================================================
//  RAI TUTOR COMPONENT — Claude AI powered
// ============================================================

const TutorComponent = {
  history: [],
  isLoading: false,

  SYSTEM_PROMPT: `You are RAI Tutor, an expert academic assistant for VTU 2022 Scheme B.E. Robotics & Automation students at a VTU-affiliated engineering college in Karnataka, India.

You have deep knowledge of all subjects in the curriculum:
SEMESTER 3: Fundamentals of Robotics & Applications, Strength of Materials for Robotic Systems, Analog & Digital Electronic Circuits, Manufacturing Methods for Robotic Components.
SEMESTER 4: Virtual Instrumentation (LabVIEW), Microcontrollers for Robotics (8051 & ARM Cortex-M), Introduction to Robot Kinematics & Dynamics (D-H parameters, Forward/Inverse Kinematics, Jacobians), Robot Simulation & Programming.
SEMESTER 5: Design of Machine Elements, Measurement Systems & Transducers, Electrical Machines & Power Systems, Hydraulics & Pneumatics for Robotics.
SEMESTER 6: Design Automation with IoT, PLC & SCADA Programming (Ladder Logic, FBD, Structured Text).
SEMESTER 7: Data Science (Python, ML, Neural Networks, Time-Series), Industrial Data Networks (Fieldbus, Ethernet/IP, PROFINET, OPC-UA), Robots for Agricultural Applications.
SEMESTER 8: Online NPTEL courses, Industry/Research Internship.

Your capabilities:
1. EXPLAIN CONCEPTS — Clear, structured explanations with examples, derivations, diagrams described in text.
2. GENERATE STUDY NOTES — Well-organized notes with definitions, formulas, important points, module-wise breakdown.
3. CREATE PPT OUTLINES — Slide-by-slide outline with titles, bullet points, suggested visuals.
4. WRITE REPORTS — Academic reports with abstract, introduction, methodology, conclusion, references.
5. SOLVE NUMERICALS — Step-by-step solutions with formulas and units.
6. LAB HELP — Procedure, aim, circuit/setup description, observations, result format.
7. EXAM PREP — Important questions, previous year patterns, quick revision notes.
8. IMAGE/DIAGRAM DESCRIPTIONS — Detailed textual descriptions of diagrams, block diagrams, flowcharts.

RESPONSE STYLE:
- Use clear headings (## for main, ### for sub)
- Use bullet points and numbered lists where appropriate
- Show formulas in readable format: e.g., F = ma, τ = J × α
- For numericals: show Given → Find → Formula → Solution → Result
- For PPT outlines: "Slide 1: [Title] — bullet1, bullet2"
- Always relate content to VTU 2022 exam pattern
- If asked about something outside RAI syllabus, use your general engineering knowledge and clearly note it
- Be thorough, accurate, and academically precise`,

  render() {
    const user = Auth.getUser();
    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

    return `
      <div id="tutor-wrap">
        <div class="section-header">
          <h2>RAI Tutor — AI Academic Assistant</h2>
          <p>Powered by Claude AI · VTU 2022 Scheme · Ask anything, generate notes, PPTs, reports & more</p>
        </div>

        <div class="capabilities">
          ${['Explain concepts','Generate notes','PPT outlines','Write reports',
             'Solve numericals','Lab help','Exam prep','Diagram descriptions'].map(c =>
            `<span class="cap-tag">${c}</span>`).join('')}
        </div>

        <div class="chat-box" id="chat-box">
          <div class="msg-row">
            <div class="msg-avatar av-ai">AI</div>
            <div class="msg-bubble ai">
              <strong>Hello, ${userName}!</strong> I'm your RAI Tutor, trained on the complete VTU 2022 Robotics & AI syllabus.<br><br>
              I can explain concepts, generate detailed study notes, create PPT outlines, write reports, solve numericals, and help with lab work.<br><br>
              What would you like to study today?
            </div>
          </div>
        </div>

        <div class="quick-prompts">
          ${[
            ['🦾', 'Explain D-H parameters with a 3-DOF example'],
            ['🖥️', 'Write Ladder Logic for a motor start-stop circuit'],
            ['📊', 'Generate notes for Data Science Module 1 — VTU'],
            ['💧', 'Solve: Find flow rate in a hydraulic cylinder (bore 50mm, stroke 200mm, time 5s)'],
            ['📡', 'Create a PPT outline for IoT Architecture (6 slides)'],
            ['🔬', 'Write a lab report format for Robot Kinematics experiment'],
          ].map(([ico, q]) =>
            `<button class="qp-btn" onclick="TutorComponent.injectPrompt(\`${q.replace(/`/g,'\\`')}\`)">${ico} ${q.substring(0,40)}…</button>`
          ).join('')}
        </div>

        <div class="chat-input-area">
          <textarea id="tutor-input"
            placeholder="Ask anything about VTU RAI subjects, request notes, PPT, report, numericals, lab help…"
            onkeydown="TutorComponent.handleKey(event)"></textarea>
          <button class="chat-send" id="tutor-send" onclick="TutorComponent.send()">Send ↑</button>
        </div>

        <div style="font-size:11.5px;color:var(--gray-3);margin-top:6px">
          Press <strong>Enter</strong> to send · <strong>Shift+Enter</strong> for new line ·
          Tip: Ask to "generate notes", "create PPT outline", "write a report", or "solve numerically"
        </div>
      </div>`;
  },

  injectPrompt(text) {
    const input = document.getElementById('tutor-input');
    if (input) { input.value = text; input.focus(); this.send(); }
  },

  handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  },

  async send() {
    if (this.isLoading) return;
    const input = document.getElementById('tutor-input');
    const msg = input?.value?.trim();
    if (!msg) return;

    input.value = '';
    this.isLoading = true;
    document.getElementById('tutor-send').disabled = true;

    this.appendMessage(msg, 'user');
    this.history.push({ role: 'user', content: msg });
    this.showTyping();

    try {
      let reply = '';

      if (CLAUDE_KEY && CLAUDE_KEY !== 'YOUR_ANTHROPIC_API_KEY_HERE') {
        // Real Claude API call
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            system: this.SYSTEM_PROMPT,
            messages: this.history
          })
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error.message || 'API error');
        }

        reply = data.content?.map(b => b.text || '').join('') || 'No response received.';
      } else {
        // Fallback: built-in smart responses
        reply = this.fallbackResponse(msg);
      }

      this.removeTyping();
      this.history.push({ role: 'assistant', content: reply });
      this.appendMessage(reply, 'ai');

      // Save chat to Supabase if configured
      if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
        const user = Auth.getUser();
        if (user) {
          sb.insert('chat_logs', {
            user_id: user.id,
            question: msg,
            answer: reply.substring(0, 500),
            created_at: new Date().toISOString()
          });
        }
      }

    } catch (err) {
      this.removeTyping();
      this.appendMessage(
        `**Connection Error:** ${err.message}\n\n` +
        `Please check your Claude API key in \`src/lib/supabase.js\`.\n\n` +
        this.fallbackResponse(msg),
        'ai'
      );
    }

    this.isLoading = false;
    document.getElementById('tutor-send').disabled = false;
  },

  fallbackResponse(msg) {
    const lower = msg.toLowerCase();

    if (lower.includes('kinematics') || lower.includes('d-h') || lower.includes('denavit')) {
      return `## Robot Kinematics — VTU RAI (BRA403)

### Forward Kinematics
Given joint angles θ₁, θ₂, …, θn → find end-effector position & orientation.
Uses homogeneous transformation matrices: ⁰T_n = ⁰T₁ · ¹T₂ · … · ⁿ⁻¹Tₙ

### Denavit-Hartenberg (D-H) Parameters
Each joint is described by 4 parameters:
- **a** (link length) — distance along xᵢ from zᵢ to zᵢ₊₁
- **α** (link twist) — angle about xᵢ from zᵢ to zᵢ₊₁
- **d** (link offset) — distance along zᵢ from xᵢ₋₁ to xᵢ
- **θ** (joint angle) — angle about zᵢ from xᵢ₋₁ to xᵢ

### D-H Transformation Matrix
Each joint contributes: ⁱ⁻¹Tᵢ = Rot(z,θ) · Trans(0,0,d) · Trans(a,0,0) · Rot(x,α)

### Example: 2-DOF Planar Robot
Link 1: a₁=1m, α₁=0, d₁=0, θ₁=variable
Link 2: a₂=0.5m, α₂=0, d₂=0, θ₂=variable

End-effector position:
- x = a₁cosθ₁ + a₂cos(θ₁+θ₂)
- y = a₁sinθ₁ + a₂sin(θ₁+θ₂)

### VTU Important Questions
1. Derive the D-H transformation matrix (10M)
2. For a 3-DOF PUMA robot, set up D-H parameters (10M)
3. Explain workspace of a robot with diagram (6M)`;
    }

    if (lower.includes('plc') || lower.includes('ladder') || lower.includes('scada')) {
      return `## PLC & SCADA — VTU RAI (BRA602)

### PLC Architecture
- **CPU** — executes the control program
- **Input Module** — reads sensors (digital/analog)
- **Output Module** — drives actuators (motors, solenoids)
- **Power Supply** — typically 24V DC
- **Programming Device** — laptop with IEC 61131-3 software

### Ladder Logic Basics
\`\`\`
||---[NO Start]---[NC Stop]---( Motor )---||
||---[NO Motor]--------------------------|
\`\`\`
- **NO (Normally Open)** — passes current when bit = 1
- **NC (Normally Closed)** — passes current when bit = 0
- **Coil ( )** — sets output bit

### Motor Start-Stop Circuit
Rung 1: [START NO] [STOP NC] → (MOTOR)
Rung 2: [MOTOR NO] — seal-in contact (parallel with START)

### Timers
- **TON** — On-delay timer (activates after preset time)
- **TOF** — Off-delay timer (deactivates after preset time)
- **RTO** — Retentive timer (retains accumulated time)

### SCADA Components
1. Field devices (PLCs, RTUs, sensors)
2. Communication network (Modbus, PROFIBUS, Ethernet)
3. SCADA server (data historian)
4. HMI (operator interface)
5. OPC server (data exchange standard)

### VTU Important Questions
1. Draw ladder logic for a traffic signal system (10M)
2. Explain SCADA architecture with block diagram (8M)
3. Difference between PLC and microcontroller (6M)`;
    }

    if (lower.includes('note') || lower.includes('generate') || lower.includes('study')) {
      return `## Study Notes — VTU 2022 RAI

I can generate detailed notes for any subject. Please specify:

**Available subjects:**
- Fundamentals of Robotics (BRA301) — Sem 3
- Analog & Digital Circuits (BRA303) — Sem 3
- Robot Kinematics & Dynamics (BRA403) — Sem 4
- Microcontrollers (BRA402) — Sem 4
- Design of Machine Elements (BRA501) — Sem 5
- Measurement Systems (BRA502) — Sem 5
- PLC & SCADA (BRA602) — Sem 6
- Design Automation with IoT (BRA601) — Sem 6
- Data Science (BRA701) — Sem 7
- Industrial Data Networks (BRA702) — Sem 7

**To get notes, type:** "Generate notes for [subject name]"
**To get PPT outline:** "Create PPT outline for [topic]"
**To get a report:** "Write a report on [topic]"

> **Note:** Configure your Claude API key in \`src/lib/supabase.js\` to unlock full AI-generated responses!`;
    }

    if (lower.includes('ppt') || lower.includes('presentation') || lower.includes('slides')) {
      return `## PPT Outline Template

Here's a standard PPT outline format for VTU presentations:

**Slide 1 — Title Slide**
- Subject name & code
- Topic title
- Student name, USN, Semester

**Slide 2 — Introduction**
- Brief overview (3-4 bullets)
- Why this topic matters

**Slide 3-7 — Core Content**
- One concept per slide
- Max 5 bullets per slide
- Include diagram/image on each slide

**Slide 8 — Applications**
- Real-world use cases
- Industry examples

**Slide 9 — Advantages & Limitations**
- 3-4 pros, 3-4 cons

**Slide 10 — Conclusion & References**
- Key takeaways
- Textbook & IEEE references

> Tell me the specific topic and I'll generate a complete slide-by-slide outline!`;
    }

    return `## RAI Tutor Response

Thank you for your question about: **"${msg}"**

I'm your VTU 2022 RAI subject expert. I can help with:

- **All 8 semesters** of Robotics & Automation subjects
- **Concept explanations** with diagrams and examples
- **Study notes** — module-wise, exam-oriented
- **PPT outlines** — ready-to-fill slide structures
- **Numerical solutions** — step-by-step with units
- **Lab reports** — aim, procedure, observations format
- **Exam preparation** — important questions, previous year patterns

**To get the best answers, be specific:**
- "Explain inverse kinematics for a 6R robot"
- "Generate notes for PLC Module 3 — VTU"
- "Solve: A robot arm with link lengths 0.5m and 0.3m, find workspace radius"
- "Create PPT outline for Hydraulics & Pneumatics (10 slides)"

> For full AI responses, add your **Claude API key** in \`src/lib/supabase.js\` (CLAUDE_KEY variable).`;
  },

  appendMessage(text, role) {
    const box = document.getElementById('chat-box');
    if (!box) return;
    const div = document.createElement('div');
    div.className = `msg-row ${role}`;
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="background:var(--ivory-2);border:1px solid var(--gray-1);border-radius:6px;padding:10px;font-family:var(--mono);font-size:12px;overflow-x:auto;margin:8px 0">$1</pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^## (.*)/gm, '<h3 style="font-size:15px;font-weight:600;margin:12px 0 6px;color:var(--navy)">$1</h3>')
      .replace(/^### (.*)/gm, '<h4 style="font-size:13.5px;font-weight:600;margin:10px 0 4px;color:var(--teal)">$1</h4>')
      .replace(/^- (.*)/gm, '<li style="margin:3px 0;padding-left:4px">$1</li>')
      .replace(/^(\d+)\. (.*)/gm, '<li style="margin:3px 0">$1. $2</li>')
      .replace(/\n/g, '<br>');

    div.innerHTML = `
      <div class="msg-avatar av-${role}">${role === 'ai' ? 'AI' : 'You'}</div>
      <div class="msg-bubble ${role}">${formatted}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  showTyping() {
    const box = document.getElementById('chat-box');
    if (!box) return;
    const div = document.createElement('div');
    div.id = 'typing-row';
    div.className = 'msg-row';
    div.innerHTML = `
      <div class="msg-avatar av-ai">AI</div>
      <div class="msg-bubble ai">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  removeTyping() {
    document.getElementById('typing-row')?.remove();
  }
};
