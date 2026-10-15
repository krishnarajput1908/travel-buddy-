/**
 * TRAVEL BUDDY - Authentication Module
 * Connects to Express/MongoDB backend via REST API
 * Each user gets their own JWT token stored in localStorage
 */

const API_BASE = 'http://localhost:5000/api';

const TravelBuddyAuth = {

  // ─── Token & User Storage ─────────────────────────────────────────────────

  getToken() {
    return localStorage.getItem('tb_jwt_token');
  },

  setSession(user, token) {
    localStorage.setItem('tb_jwt_token', token);
    localStorage.setItem(TravelBuddy.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem('tb_jwt_token');
    localStorage.removeItem(TravelBuddy.STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser() {
    const userJson = localStorage.getItem(TravelBuddy.STORAGE_KEYS.CURRENT_USER);
    try {
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return !!(this.getToken() && this.getCurrentUser());
  },

  // ─── Redirect Guard ────────────────────────────────────────────────────────

  requireAuth() {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('tb_redirect_after_login', window.location.href);
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // ─── Redirect logged-in users away from login/register pages ──────────────

  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = 'dashboard.html';
    }
  },

  // ─── API Helper ───────────────────────────────────────────────────────────

  async apiPost(endpoint, body) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      return { ok: res.ok, status: res.status, ...data };
    } catch (err) {
      return { ok: false, message: 'Cannot connect to server. Please make sure the backend is running.' };
    }
  },

  async apiGet(endpoint) {
    try {
      const token = this.getToken();
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.status === 401) {
        // Token expired — clear session
        this.clearSession();
        window.location.href = 'login.html';
        return null;
      }
      return { ok: res.ok, ...data };
    } catch (err) {
      return { ok: false, message: 'Cannot connect to server.' };
    }
  },

  // ─── Login ────────────────────────────────────────────────────────────────

  async login(email, password, remember = false) {
    const submitBtn = document.getElementById('login-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    }

    const result = await this.apiPost('/auth/login', { email, password });

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-right-to-bracket"></i> Log In to Travel Buddy';
    }

    if (result.ok && result.success && result.token) {
      this.setSession(result.user, result.token);
      if (remember) {
        localStorage.setItem('tb_remember_email', email);
      } else {
        localStorage.removeItem('tb_remember_email');
      }
      return { success: true, user: result.user };
    }

    return { success: false, message: result.message || 'Login failed. Please try again.' };
  },

  // ─── Register ─────────────────────────────────────────────────────────────

  async register(name, email, password, confirmPassword) {
    // Client-side validation
    if (!name || name.trim().length < 2) {
      return { success: false, message: 'Please enter your full name (minimum 2 characters).' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }

    const submitBtn = document.getElementById('reg-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    }

    const result = await this.apiPost('/auth/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    });

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create My Account';
    }

    if (result.ok && result.success && result.token) {
      this.setSession(result.user, result.token);
      return { success: true, user: result.user };
    }

    return { success: false, message: result.message || 'Registration failed. Please try again.' };
  },

  // ─── Logout ───────────────────────────────────────────────────────────────

  logout() {
    if (confirm('Are you sure you want to log out of Travel Buddy?')) {
      this.clearSession();
      TravelBuddy.showToast('Logged out successfully. See you soon! ✈️', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    }
  },

  // ─── Refresh current user from server ────────────────────────────────────

  async refreshUser() {
    if (!this.isLoggedIn()) return null;
    const result = await this.apiGet('/auth/me');
    if (result && result.ok && result.user) {
      const token = this.getToken();
      this.setSession(result.user, token);
      return result.user;
    }
    return null;
  },

  // ─── Demo credential autofill ─────────────────────────────────────────────

  fillDemoCredentials() {
    const emailField = document.getElementById('login-email');
    const passwordField = document.getElementById('login-password');
    if (emailField && passwordField) {
      emailField.value = 'alex@travelbuddy.com';
      passwordField.value = 'password123';
      TravelBuddy.showToast('Demo credentials filled! Click Login.', 'success', 2500);
    }
  }
};
