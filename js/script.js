/**
 * TRAVEL BUDDY - Core Script
 * Shared utilities, theme management, toast notifications, modals, navbar & demo data init
 */

// Global App Namespace
const TravelBuddy = {
  // Storage Keys
  STORAGE_KEYS: {
    USERS: 'tb_users',
    CURRENT_USER: 'tb_currentUser',
    DESTINATIONS: 'tb_destinations',
    FAVOURITES: 'tb_favourites',
    TRIPS: 'tb_trips',
    BOOKINGS: 'tb_bookings',
    THEME: 'tb_theme',
    ACTIVE_ITINERARY: 'tb_active_itinerary'
  },

  // Initialize theme only — auth & data now come from backend API
  initDemoData() {
    // Only set default theme if not already saved
    if (!localStorage.getItem(this.STORAGE_KEYS.THEME)) {
      localStorage.setItem(this.STORAGE_KEYS.THEME, 'light');
    }
  },

  // Toast Notification System
  showToast(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-circle-xmark' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}" 
         style="color: var(--${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'primary-blue'}); font-size: 1.25rem;"></i>
      <div style="flex-grow: 1; font-size: 0.9rem; font-weight: 500;">${message}</div>
      <button style="color: var(--text-muted); padding: 2px;" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 300ms ease, transform 300ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(this.STORAGE_KEYS.THEME, newTheme);
    this.updateThemeIcons(newTheme);
    this.showToast(`Switched to ${newTheme} mode`, 'info', 2000);
  },

  updateThemeIcons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun" title="Switch to Light Mode"></i>' 
        : '<i class="fas fa-moon" title="Switch to Dark Mode"></i>';
    });
  },

  // Modal Open/Close Utilities
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Setup Common Navbar on every page (CONSISTENT across all pages)
  setupNavbar() {
    // Use TravelBuddyAuth if available (loaded after script.js)
    const getCurrentUser = () => {
      try {
        const userJson = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
        const token = localStorage.getItem('tb_jwt_token');
        if (!userJson || !token) return null;
        return JSON.parse(userJson);
      } catch (e) { return null; }
    };

    const currentUser = getCurrentUser();
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // ─── Dynamic Nav Links (CONSISTENT everywhere) ──────────────────────
    const navbarNav = document.querySelector('.navbar-nav');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    const loggedInLinks = [
      { href: 'dashboard.html', label: 'Dashboard' },
      { href: 'destinations.html', label: 'Destinations' },
      { href: 'plan-trip.html', label: 'Plan Trip' },
      { href: 'trips.html', label: 'My Trips' },
      { href: 'bookings.html', label: 'Bookings' },
      { href: 'favourites.html', label: 'Favourites' }
    ];

    const guestLinks = [
      { href: 'index.html', label: 'Home' },
      { href: 'destinations.html', label: 'Destinations' },
      { href: 'plan-trip.html', label: 'Plan Trip' },
      { href: 'dashboard.html', label: 'Dashboard' }
    ];

    const links = currentUser ? loggedInLinks : guestLinks;

    if (navbarNav) {
      navbarNav.innerHTML = links.map(l => {
        const isActive = l.href === currentPath || (currentPath === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">${l.label}</a>`;
      }).join('');
    }

    if (mobileDrawer) {
      const mobileLinks = links.map(l => {
        const isActive = l.href === currentPath || (currentPath === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">${l.label}</a>`;
      }).join('');
      // Keep the mobile-auth-actions div
      const authDiv = mobileDrawer.querySelector('#mobile-auth-actions');
      mobileDrawer.innerHTML = mobileLinks + '<div id="mobile-auth-actions"></div>';
    }

    // ─── Auth Actions (user menu or login/signup buttons) ────────────────
    const navActions = document.getElementById('navbar-auth-actions');
    const mobileAuth = document.getElementById('mobile-auth-actions');

    if (currentUser) {
      const avatarUrl = currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
      const firstName = (currentUser.name || 'User').split(' ')[0];

      const userHtml = `
        <button class="theme-toggle-btn" onclick="TravelBuddy.toggleTheme()" aria-label="Toggle Theme">
          <i class="fas fa-moon"></i>
        </button>
        <a href="dashboard.html" class="user-menu-btn" id="nav-profile-btn" title="My Dashboard">
          <img src="${avatarUrl}" alt="${currentUser.name}" class="user-avatar-sm">
          <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${firstName}</span>
          <i class="fas fa-chevron-down" style="font-size: 0.65rem; color: var(--text-muted);"></i>
        </a>
        <button class="btn btn-outline btn-sm" onclick="TravelBuddyAuth.logout()" title="Logout">
          <i class="fas fa-arrow-right-from-bracket"></i> Logout
        </button>
      `;
      if (navActions) navActions.innerHTML = userHtml;

      const mobileUserHtml = `
        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-top: 1px solid var(--border-light); margin-top: 0.5rem;">
          <a href="dashboard.html" style="display:flex;align-items:center;gap:0.6rem;text-decoration:none;flex-grow:1;">
            <img src="${avatarUrl}" class="user-avatar-sm" style="width:38px;height:38px;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${currentUser.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${currentUser.email}</div>
            </div>
          </a>
          <button class="btn btn-outline btn-sm" onclick="TravelBuddyAuth.logout()"><i class="fas fa-arrow-right-from-bracket"></i></button>
        </div>
      `;
      if (mobileAuth) mobileAuth.innerHTML = mobileUserHtml;
    } else {
      const guestHtml = `
        <button class="theme-toggle-btn" onclick="TravelBuddy.toggleTheme()" aria-label="Toggle Theme">
          <i class="fas fa-moon"></i>
        </button>
        <a href="login.html" class="btn btn-outline btn-sm"><i class="fas fa-right-to-bracket"></i> Login</a>
        <a href="register.html" class="btn btn-primary btn-sm"><i class="fas fa-user-plus"></i> Sign Up</a>
      `;
      if (navActions) navActions.innerHTML = guestHtml;

      const mobileGuestHtml = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
          <a href="login.html" class="btn btn-outline btn-sm">Login</a>
          <a href="register.html" class="btn btn-primary btn-sm">Sign Up</a>
        </div>
      `;
      if (mobileAuth) mobileAuth.innerHTML = mobileGuestHtml;
    }

    // Toggle hamburger drawer
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const mobileDrawerEl = document.getElementById('mobile-nav-drawer');
    if (hamburgerBtn && mobileDrawerEl) {
      hamburgerBtn.addEventListener('click', () => {
        mobileDrawerEl.classList.toggle('open');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-xmark');
        }
      });
    }

    this.updateThemeIcons(localStorage.getItem(this.STORAGE_KEYS.THEME) || 'light');
  },

  // ─── First Login Interest Modal System ──────────────────────────────────
  INTEREST_OPTIONS: [
    { id: 'adventure', label: 'Adventure', icon: 'fa-person-hiking', color: '#f97316' },
    { id: 'beach', label: 'Beach & Water', icon: 'fa-umbrella-beach', color: '#06b6d4' },
    { id: 'heritage', label: 'Heritage & Culture', icon: 'fa-landmark', color: '#8b5cf6' },
    { id: 'nature', label: 'Nature & Wildlife', icon: 'fa-tree', color: '#22c55e' },
    { id: 'food', label: 'Food & Culinary', icon: 'fa-utensils', color: '#ef4444' },
    { id: 'spiritual', label: 'Spiritual', icon: 'fa-om', color: '#f59e0b' },
    { id: 'photography', label: 'Photography', icon: 'fa-camera', color: '#ec4899' },
    { id: 'shopping', label: 'Shopping', icon: 'fa-bag-shopping', color: '#14b8a6' },
    { id: 'nightlife', label: 'Nightlife', icon: 'fa-champagne-glasses', color: '#a855f7' },
    { id: 'wellness', label: 'Wellness & Spa', icon: 'fa-spa', color: '#10b981' },
    { id: 'roadtrip', label: 'Road Trips', icon: 'fa-car-side', color: '#3b82f6' },
    { id: 'winter', label: 'Snow & Winter', icon: 'fa-snowflake', color: '#60a5fa' }
  ],

  checkFirstLoginInterests() {
    try {
      const userJson = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
      if (!userJson) return;
      const user = JSON.parse(userJson);
      if (user.isFirstLogin && (!user.interests || user.interests.length === 0)) {
        this.showInterestModal();
      }
    } catch (e) { /* ignore */ }
  },

  showInterestModal() {
    // Remove old modal if exists
    const old = document.getElementById('interest-modal-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'interest-modal-overlay';
    overlay.className = 'interest-modal-overlay';
    overlay.innerHTML = `
      <div class="interest-modal">
        <div class="interest-modal-header">
          <div class="interest-modal-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h2>Welcome to Travel Buddy! 🎉</h2>
          <p>Tell us what excites you — we'll personalize your destinations & itineraries</p>
        </div>
        <div class="interest-modal-grid" id="interest-options-grid">
          ${this.INTEREST_OPTIONS.map(opt => `
            <div class="interest-option" data-id="${opt.id}" onclick="TravelBuddy.toggleInterest(this)">
              <i class="fas ${opt.icon}" style="color: ${opt.color};"></i>
              <span>${opt.label}</span>
              <div class="interest-check"><i class="fas fa-check"></i></div>
            </div>
          `).join('')}
        </div>
        <div class="interest-modal-footer">
          <span class="interest-count-badge" id="interest-count-badge">Select at least 3 interests</span>
          <button class="btn btn-accent btn-lg" id="save-interests-btn" onclick="TravelBuddy.saveInterests()" disabled>
            <i class="fas fa-wand-magic-sparkles"></i> Personalize My Experience
          </button>
          <button class="btn btn-outline btn-sm" onclick="TravelBuddy.skipInterests()" style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.7;">
            Skip for now
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('active'));
  },

  toggleInterest(el) {
    el.classList.toggle('selected');
    const selected = document.querySelectorAll('.interest-option.selected').length;
    const badge = document.getElementById('interest-count-badge');
    const btn = document.getElementById('save-interests-btn');

    if (selected >= 3) {
      badge.textContent = `${selected} interests selected ✓`;
      badge.style.color = 'var(--success)';
      btn.disabled = false;
    } else {
      badge.textContent = `Select at least 3 interests (${selected} selected)`;
      badge.style.color = 'var(--text-muted)';
      btn.disabled = true;
    }
  },

  async saveInterests() {
    const selectedEls = document.querySelectorAll('.interest-option.selected');
    const interests = Array.from(selectedEls).map(el => {
      const opt = this.INTEREST_OPTIONS.find(o => o.id === el.dataset.id);
      return opt ? opt.label : el.dataset.id;
    });

    const btn = document.getElementById('save-interests-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    try {
      const token = localStorage.getItem('tb_jwt_token');
      const res = await fetch('http://localhost:5000/api/auth/interests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ interests })
      });
      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
      }
    } catch (err) {
      // Save locally even if server fails
      const userJson = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
      if (userJson) {
        const user = JSON.parse(userJson);
        user.interests = interests;
        user.isFirstLogin = false;
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      }
    }

    this.closeInterestModal();
    this.showToast('Great picks! 🎯 Your experience is now personalized.', 'success', 3000);
  },

  skipInterests() {
    // Mark first login done locally
    try {
      const userJson = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
      if (userJson) {
        const user = JSON.parse(userJson);
        user.isFirstLogin = false;
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      }

      const token = localStorage.getItem('tb_jwt_token');
      fetch('http://localhost:5000/api/auth/interests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ interests: [] })
      }).catch(() => {});
    } catch (e) {}

    this.closeInterestModal();
  },

  closeInterestModal() {
    const overlay = document.getElementById('interest-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
    document.body.style.overflow = '';
  },

  // Currency formatter (supports INR / USD)
  formatCurrency(amount, currency = 'INR') {
    if (currency === 'INR') {
      return '₹' + Number(amount).toLocaleString('en-IN');
    }
    return '$' + Number(amount).toLocaleString('en-US');
  },

  // ─── Trip Completion Celebration Popup ──────────────────────────────────────
  showCelebration(destinationName) {
    // Remove any old overlay
    const old = document.getElementById('celebration-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'celebration-overlay';
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
      <div class="celebration-box" id="celebration-box">
        <span class="celebration-emoji">🎉</span>
        <div class="celebration-title">Trip Completed!</div>
        <div class="celebration-subtitle">
          You've conquered every stop on your <strong>${destinationName || 'trip'}</strong> itinerary!<br>
          Your memories are priceless — time to plan the next adventure 🌍
        </div>
        <div class="celebration-actions">
          <a href="plan-trip.html" class="btn btn-accent">
            <i class="fas fa-plus"></i> Plan Next Trip
          </a>
          <a href="trips.html" class="btn btn-outline">
            <i class="fas fa-suitcase"></i> My Trips
          </a>
          <button class="btn btn-ghost btn-sm" onclick="TravelBuddy.closeCelebration()">
            <i class="fas fa-times"></i> Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Launch confetti
    this._launchConfetti(overlay.querySelector('#celebration-box'));

    // Auto-close after 12s
    setTimeout(() => this.closeCelebration(), 12000);
  },

  closeCelebration() {
    const overlay = document.getElementById('celebration-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 400);
    }
  },

  _launchConfetti(container) {
    const colors = ['#f97316','#8b5cf6','#0284c7','#10b981','#f59e0b','#ec4899','#06b6d4'];
    for (let i = 0; i < 55; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * -10}%;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-duration: ${1.5 + Math.random() * 1.5}s;
          animation-delay: ${Math.random() * 0.5}s;
          transform: rotate(${Math.random() * 360}deg);
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          width: ${6 + Math.random() * 7}px;
          height: ${6 + Math.random() * 7}px;
        `;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
      }, i * 30);
    }
  }
};

// Auto initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // One-time cleanup: remove old stale localStorage keys from pre-API demo mode
  if (localStorage.getItem('tb_users')) {
    localStorage.removeItem('tb_users');
  }
  // Only clear currentUser if there's no JWT token (old format with no token = stale)
  if (localStorage.getItem('tb_currentUser') && !localStorage.getItem('tb_jwt_token')) {
    localStorage.removeItem('tb_currentUser');
  }
  // Note: tb_trips, tb_bookings, tb_favourites are now managed via backend API.
  // Do NOT clear them here — they may be used as fallback cache.

  TravelBuddy.initDemoData();
  TravelBuddy.initTheme();
  TravelBuddy.setupNavbar();

  // Check for first-login interest modal (only on dashboard or after login redirect)
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (['dashboard.html', 'index.html'].includes(page)) {
    setTimeout(() => TravelBuddy.checkFirstLoginInterests(), 500);
  }
});

