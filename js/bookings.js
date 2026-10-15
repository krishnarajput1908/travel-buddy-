/**
 * TRAVEL BUDDY - Bookings Management Module
 * Handles categorized bookings (Hotels, Transport, Activities), cancellations, and status tracking
 */

const TravelBuddyBookings = {
  currentTab: 'all',
  pendingCancellationId: null,

  // Initialize bookings
  init() {
    this.renderTabs();
    this.renderBookings();
    this.bindCancelModal();
  },

  // Get bookings from LocalStorage
  getBookings() {
    return JSON.parse(localStorage.getItem(TravelBuddy.STORAGE_KEYS.BOOKINGS) || '[]');
  },

  // Set bookings to LocalStorage
  saveBookings(bookings) {
    localStorage.setItem(TravelBuddy.STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  // Render tab event listeners
  renderTabs() {
    document.querySelectorAll('.booking-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.currentTab = e.target.dataset.type;
        this.renderBookings();
      });
    });
  },

  // Render bookings into container
  renderBookings() {
    const container = document.getElementById('bookings-list-container');
    if (!container) return;

    let bookings = this.getBookings();

    if (this.currentTab !== 'all') {
      bookings = bookings.filter(b => b.type === this.currentTab);
    }

    if (bookings.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-xl); border: 1px dashed var(--border-strong);">
          <i class="fas fa-ticket" style="font-size: 3rem; color: var(--text-subtle); margin-bottom: 1rem;"></i>
          <h3>No bookings found</h3>
          <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem;">You don't have any ${this.currentTab === 'all' ? '' : this.currentTab} bookings in this category.</p>
          <a href="plan-trip.html" class="btn btn-primary btn-sm">Plan a Trip & Book Now</a>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings.map(b => {
      const isCancelled = b.status === 'Cancelled';
      let typeIcon = 'fa-hotel';
      let typeBadge = 'badge-blue';
      if (b.type === 'transport') {
        typeIcon = 'fa-plane-departure';
        typeBadge = 'badge-coral';
      } else if (b.type === 'activity') {
        typeIcon = 'fa-person-hiking';
        typeBadge = 'badge-purple';
      }

      return `
        <div class="booking-card" style="${isCancelled ? 'opacity: 0.65; background: var(--bg-subtle);' : ''}">
          <div class="booking-icon-large">
            <i class="fas ${typeIcon}"></i>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <span class="badge ${typeBadge}">${b.type.toUpperCase()}</span>
              <span class="badge ${isCancelled ? 'badge-danger' : 'badge-success'}">
                <i class="fas ${isCancelled ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> ${b.status}
              </span>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">Ref: ${b.confirmationCode}</span>
            </div>

            <h3 style="font-size: 1.3rem;">${b.title}</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);"><i class="fas fa-map-marker-alt" style="color: var(--primary-blue);"></i> ${b.destination}</p>

            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem; font-size: 0.88rem;">
              ${b.checkIn ? `<div><strong style="color: var(--text-main);">Dates:</strong> ${b.checkIn} to ${b.checkOut}</div>` : ''}
              ${b.date ? `<div><strong style="color: var(--text-main);">Date:</strong> ${b.date} ${b.time ? 'at ' + b.time : ''}</div>` : ''}
              ${b.guests ? `<div><strong style="color: var(--text-main);">Party:</strong> ${b.guests}</div>` : ''}
              ${b.passengers ? `<div><strong style="color: var(--text-main);">Party:</strong> ${b.passengers}</div>` : ''}
              ${b.participants ? `<div><strong style="color: var(--text-main);">Party:</strong> ${b.participants}</div>` : ''}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 1rem;">
            <div style="text-align: right;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Total Amount</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-blue);">${TravelBuddy.formatCurrency(b.price)}</div>
            </div>

            ${!isCancelled ? `
              <button class="btn btn-outline btn-sm" style="color: var(--danger); border-color: var(--danger-bg);" 
                      onclick="TravelBuddyBookings.promptCancel('${b.id}')">
                <i class="fas fa-ban"></i> Cancel Booking
              </button>
            ` : `
              <span style="font-size: 0.85rem; color: var(--danger); font-weight: 600;">Cancelled</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  // Open confirmation modal for cancelling a booking
  promptCancel(id) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    this.pendingCancellationId = id;
    const descEl = document.getElementById('cancel-modal-description');
    if (descEl) {
      descEl.innerHTML = `Are you sure you want to cancel your reservation for <strong>${booking.title}</strong> (${booking.confirmationCode})? This action cannot be reversed.`;
    }
    TravelBuddy.openModal('cancel-booking-modal');
  },

  // Confirm cancellation
  confirmCancellation() {
    if (!this.pendingCancellationId) return;

    const bookings = this.getBookings();
    const target = bookings.find(b => b.id === this.pendingCancellationId);

    if (target) {
      target.status = 'Cancelled';
      this.saveBookings(bookings);
      TravelBuddy.showToast('Booking cancelled.', 'info');
      this.renderBookings();
    }

    TravelBuddy.closeModal('cancel-booking-modal');
    this.pendingCancellationId = null;
  },

  // Bind cancel modal buttons
  bindCancelModal() {
    const confirmBtn = document.getElementById('confirm-cancel-booking-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.confirmCancellation());
    }
  }
};
