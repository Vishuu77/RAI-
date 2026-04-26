// ============================================================
//  SUPABASE CONFIG
//  Replace SUPABASE_URL and SUPABASE_ANON_KEY with your values
//  from: https://app.supabase.com → Project Settings → API
// ============================================================

const SUPABASE_URL  = 'sb_publishable_MZ6tkZcjKdR1mPAun9BTLA_2_Vs4cK_';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnb3JjeXZjeWJ6ZHNhc21vamhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTk5NjIsImV4cCI6MjA5Mjc5NTk2Mn0.t8XAC7VN9hwmPVi7b7wrP2QBVXYJDKMIVyQJ104y9gw';
const CLAUDE_KEY    = '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';

// Simple Supabase REST client (no npm needed)
const sb = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON,

  async query(table, options = {}) {
    try {
      let url = `${this.url}/rest/v1/${table}`;
      const params = new URLSearchParams();
      if (options.select)  params.set('select', options.select);
      if (options.filter)  Object.entries(options.filter).forEach(([k,v]) => params.set(k, `eq.${v}`));
      if (options.order)   params.set('order', options.order);
      if (params.toString()) url += '?' + params;

      const res = await fetch(url, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
        }
      });
      if (!res.ok) return { data: null, error: await res.text() };
      return { data: await res.json(), error: null };
    } catch (e) {
      return { data: null, error: e.message };
    }
  },

  async insert(table, row) {
    try {
      const res = await fetch(`${this.url}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(row)
      });
      if (!res.ok) return { data: null, error: await res.text() };
      return { data: await res.json(), error: null };
    } catch (e) {
      return { data: null, error: e.message };
    }
  },

  async upsert(table, row, onConflict) {
    try {
      let url = `${this.url}/rest/v1/${table}`;
      if (onConflict) url += `?on_conflict=${onConflict}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation,resolution=merge-duplicates'
        },
        body: JSON.stringify(row)
      });
      if (!res.ok) return { data: null, error: await res.text() };
      return { data: await res.json(), error: null };
    } catch (e) {
      return { data: null, error: e.message };
    }
  },

  // Auth
  async signUp(email, password, name) {
    try {
      const res = await fetch(`${this.url}/auth/v1/signup`, {
        method: 'POST',
        headers: { 'apikey': this.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, data: { name } })
      });
      const d = await res.json();
      if (d.error) return { user: null, error: d.error.message || d.error };
      return { user: d.user, error: null };
    } catch (e) { return { user: null, error: e.message }; }
  },

  async signIn(email, password) {
    try {
      const res = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'apikey': this.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const d = await res.json();
      if (d.error) return { user: null, token: null, error: d.error_description || d.error };
      return { user: d.user, token: d.access_token, error: null };
    } catch (e) { return { user: null, token: null, error: e.message }; }
  },

  async signOut() {
    const token = localStorage.getItem('rai_token');
    if (!token) return;
    await fetch(`${this.url}/auth/v1/logout`, {
      method: 'POST',
      headers: { 'apikey': this.key, 'Authorization': `Bearer ${token}` }
    });
  }
};

// Session helpers
const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('rai_user') || 'null'); } catch { return null; }
  },
  getToken() { return localStorage.getItem('rai_token'); },
  setSession(user, token) {
    localStorage.setItem('rai_user', JSON.stringify(user));
    localStorage.setItem('rai_token', token);
  },
  clear() {
    localStorage.removeItem('rai_user');
    localStorage.removeItem('rai_token');
  },
  isLoggedIn() { return !!this.getToken(); }
};
