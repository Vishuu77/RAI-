// ============================================================
//  AUTH COMPONENT — Sign in / Sign up
// ============================================================

const AuthComponent = {
  mode: 'signin', // 'signin' | 'signup'

  render() {
    return `
      <div class="auth-form">
        <div class="card">
          <div style="text-align:center;margin-bottom:1.75rem">
            <div style="font-size:40px;margin-bottom:12px">🤖</div>
            <h2>${this.mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
            <p>${this.mode === 'signin' ? 'Sign in to access your RAI Portal' : 'Join the VTU RAI Department Portal'}</p>
          </div>

          ${this.mode === 'signup' ? `
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="auth-name" placeholder="Your full name" />
          </div>` : ''}

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="auth-email" placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="auth-password" placeholder="Enter password" />
          </div>

          <div id="auth-error" style="display:none;color:#C0392B;font-size:13px;margin-bottom:12px;padding:10px;background:#FCEBEB;border-radius:6px"></div>

          <button class="btn-primary btn-full" id="auth-submit-btn" onclick="AuthComponent.submit()">
            ${this.mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <div class="auth-toggle">
            ${this.mode === 'signin'
              ? `Don't have an account? <span onclick="AuthComponent.toggleMode()">Sign up free</span>`
              : `Already have an account? <span onclick="AuthComponent.toggleMode()">Sign in</span>`
            }
          </div>

          <div style="margin-top:1.5rem;padding:12px;background:var(--ivory-2);border-radius:8px;font-size:12px;color:var(--gray-4);line-height:1.6">
            <strong style="color:var(--gray-5)">Demo mode:</strong> If Supabase is not configured yet, use any email + password (6+ chars) to explore the portal in guest mode.
          </div>
        </div>
      </div>`;
  },

  toggleMode() {
    this.mode = this.mode === 'signin' ? 'signup' : 'signin';
    document.getElementById('main-content').innerHTML = this.render();
    document.getElementById('tab-nav').style.display = 'none';
  },

  async submit() {
    const btn = document.getElementById('auth-submit-btn');
    const errEl = document.getElementById('auth-error');
    const email = document.getElementById('auth-email')?.value?.trim();
    const password = document.getElementById('auth-password')?.value;
    const name = document.getElementById('auth-name')?.value?.trim();

    if (!email || !password) { this.showError('Please fill in all fields.'); return; }
    if (password.length < 6) { this.showError('Password must be at least 6 characters.'); return; }

    btn.textContent = 'Please wait…';
    btn.disabled = true;
    errEl.style.display = 'none';

    // Try Supabase if configured
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
      const result = this.mode === 'signup'
        ? await sb.signUp(email, password, name || email.split('@')[0])
        : await sb.signIn(email, password);

      if (result.error) {
        this.showError(result.error);
        btn.textContent = this.mode === 'signin' ? 'Sign In' : 'Create Account';
        btn.disabled = false;
        return;
      }

      if (this.mode === 'signin') {
        Auth.setSession(result.user, result.token);
      } else {
        showToast('Account created! Check your email to confirm.', 'success');
        this.mode = 'signin';
        document.getElementById('main-content').innerHTML = this.render();
        return;
      }
    } else {
      // Demo / guest mode — skip real auth
      const fakeUser = { id: 'guest-' + Date.now(), email, user_metadata: { name: name || email.split('@')[0] } };
      Auth.setSession(fakeUser, 'demo-token');
    }

    showToast('Welcome back!', 'success');
    window.location.reload();
  },

  showError(msg) {
    const el = document.getElementById('auth-error');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }
};
