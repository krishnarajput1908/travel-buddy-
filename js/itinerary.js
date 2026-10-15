/**
 * TRAVEL BUDDY - Day-by-Day Smart Itinerary Module
 * Manages daily timelines, activity CRUD, completion toggles, and persistence
 */

const TravelBuddyItinerary = {
  activeDayIndex: 0,
  currentItinerary: null,

  // Generate an itinerary template based on destination and duration
  generateItineraryTemplate(destination, durationDays = 4) {
    const days = [];
    const attList = destination.attractions || [
      { name: 'City Center', desc: 'Central square exploration' },
      { name: 'Heritage Museum', desc: 'Historic preservation galleries' },
      { name: 'Scenic Overlook', desc: 'Panoramic landscape views' }
    ];

    for (let i = 1; i <= durationDays; i++) {
      let activities = [];

      if (i === 1) {
        // Day 1: Arrival & Unwinding
        activities = [
          {
            id: 'act_' + i + '_1',
            time: '10:00 AM',
            title: `Arrival at ${destination.name} & Airport / Station Pickup`,
            location: `${destination.name} Transit Terminal`,
            cost: 800,
            completed: false
          },
          {
            id: 'act_' + i + '_2',
            time: '12:30 PM',
            title: 'Hotel Check-in & Relaxing Refreshment',
            location: 'Selected Hotel / Resort',
            cost: 0,
            completed: false
          },
          {
            id: 'act_' + i + '_3',
            time: '03:30 PM',
            title: `Walking Tour of Old Town & Local Market`,
            location: `${destination.name} Main Bazaar`,
            cost: 400,
            completed: false
          },
          {
            id: 'act_' + i + '_4',
            time: '07:30 PM',
            title: 'Welcome Dinner featuring Authentic Regional Cuisine',
            location: 'Riverside / Rooftop Restaurant',
            cost: 1200,
            completed: false
          }
        ];
      } else if (i === durationDays) {
        // Final Day: Checkout & Departure
        activities = [
          {
            id: 'act_' + i + '_1',
            time: '08:30 AM',
            title: 'Leisurely Breakfast & Souvenir Shopping',
            location: 'Artisan Crafts Quarter',
            cost: 1500,
            completed: false
          },
          {
            id: 'act_' + i + '_2',
            time: '11:30 AM',
            title: 'Hotel Checkout & Luggage Assistance',
            location: 'Hotel Lobby',
            cost: 0,
            completed: false
          },
          {
            id: 'act_' + i + '_3',
            time: '02:00 PM',
            title: 'Final Scenic Photo-Stop & Light Snacks',
            location: 'Panoramic Viewpoint',
            cost: 350,
            completed: false
          },
          {
            id: 'act_' + i + '_4',
            time: '05:00 PM',
            title: 'Departure & Return Journey Home',
            location: `${destination.name} Departure Gate`,
            cost: 600,
            completed: false
          }
        ];
      } else {
        // Intermediate exploration days
        const att = attList[(i - 2) % attList.length];
        activities = [
          {
            id: 'act_' + i + '_1',
            time: '08:00 AM',
            title: 'Nutritious Breakfast & Day Briefing',
            location: 'Hotel Cafe',
            cost: 350,
            completed: false
          },
          {
            id: 'act_' + i + '_2',
            time: '09:45 AM',
            title: `Guided Exploration: ${att ? att.name : 'Key Landmark'}`,
            location: att ? att.name : `${destination.name} Landmark`,
            cost: 800,
            completed: false
          },
          {
            id: 'act_' + i + '_3',
            time: '01:15 PM',
            title: 'Scenic Lunch Break & Local Tasting',
            location: 'Valley / Garden Terrace',
            cost: 900,
            completed: false
          },
          {
            id: 'act_' + i + '_4',
            time: '03:30 PM',
            title: 'Adventure Excursion & Outdoor Activities',
            location: 'Adventure Recreation Valley',
            cost: 2200,
            completed: false
          },
          {
            id: 'act_' + i + '_5',
            time: '07:30 PM',
            title: 'Sunset Relaxation & Evening Stroll',
            location: 'Promenade / Scenic Lake',
            cost: 450,
            completed: false
          }
        ];
      }

      days.push({
        dayNumber: i,
        title: `Day ${i}: ${i === 1 ? 'Arrival & Orientation' : i === durationDays ? 'Farewell & Departure' : 'Full Discovery & Adventure'}`,
        activities: activities
      });
    }

    return days;
  },

  // Initialize Itinerary Page
  init() {
    // Check if there is an active itinerary saved
    const saved = localStorage.getItem(TravelBuddy.STORAGE_KEYS.ACTIVE_ITINERARY);
    if (saved) {
      try {
        this.currentItinerary = JSON.parse(saved);
      } catch (e) {
        this.currentItinerary = null;
      }
    }

    // If still null, create default Manali 5-day itinerary
    if (!this.currentItinerary) {
      const dest = TravelBuddyDestinations.getAll()[0];
      this.currentItinerary = {
        tripId: 'trip_demo_101',
        destinationName: 'Manali, Himachal Pradesh',
        days: this.generateItineraryTemplate(dest, 5)
      };
      this.saveToStorage();
    }

    this.renderHeader();
    this.renderDayTabs();
    this.renderActivities();
    this.bindModalForms();
  },

  // Save current itinerary state to LocalStorage
  saveToStorage() {
    localStorage.setItem(TravelBuddy.STORAGE_KEYS.ACTIVE_ITINERARY, JSON.stringify(this.currentItinerary));
  },

  // Render header info
  renderHeader() {
    const titleEl = document.getElementById('itinerary-destination-name');
    const totalDaysEl = document.getElementById('itinerary-total-days');
    const totalActsEl = document.getElementById('itinerary-total-acts');

    if (titleEl) titleEl.innerText = this.currentItinerary.destinationName;
    if (totalDaysEl) totalDaysEl.innerText = `${this.currentItinerary.days.length} Days Planned`;

    if (totalActsEl) {
      const totalActs = this.currentItinerary.days.reduce((acc, d) => acc + d.activities.length, 0);
      const completedActs = this.currentItinerary.days.reduce(
        (acc, d) => acc + d.activities.filter(a => a.completed).length, 0
      );
      totalActsEl.innerText = `${completedActs} / ${totalActs} Completed`;
    }
  },

  // Render day tabs
  renderDayTabs() {
    const container = document.getElementById('itinerary-days-container');
    if (!container) return;

    container.innerHTML = this.currentItinerary.days.map((day, idx) => `
      <button class="day-tab-btn ${idx === this.activeDayIndex ? 'active' : ''}" 
              onclick="TravelBuddyItinerary.switchDay(${idx})">
        <i class="fas fa-calendar-day"></i> Day ${day.dayNumber}
      </button>
    `).join('');
  },

  // Switch active day
  switchDay(index) {
    this.activeDayIndex = index;
    this.renderDayTabs();
    this.renderActivities();
  },

  // Render activities for current active day
  renderActivities() {
    const container = document.getElementById('itinerary-activities-timeline');
    const dayTitleEl = document.getElementById('active-day-heading');
    if (!container) return;

    const currentDay = this.currentItinerary.days[this.activeDayIndex];
    if (!currentDay) return;

    if (dayTitleEl) dayTitleEl.innerText = currentDay.title;

    if (currentDay.activities.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; background: var(--bg-surface); border-radius: var(--radius-xl); border: 1px dashed var(--border-strong);">
          <i class="fas fa-calendar-plus" style="font-size: 2.5rem; color: var(--text-subtle); margin-bottom: 0.75rem;"></i>
          <h4>No activities scheduled for this day yet</h4>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">Click "Add Activity" to plan something memorable!</p>
          <button class="btn btn-primary btn-sm" onclick="TravelBuddyItinerary.openAddModal()">Add First Activity</button>
        </div>
      `;
      return;
    }

    container.innerHTML = currentDay.activities.map((act, actIdx) => {
      const mapsQuery = encodeURIComponent(act.location + ' ' + (this.currentItinerary.destinationName || ''));
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
      return `
      <div class="activity-card ${act.completed ? 'completed' : ''}" id="card-${act.id}">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <input type="checkbox" ${act.completed ? 'checked' : ''} 
                 style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary-blue);"
                 title="Mark activity as completed"
                 onchange="TravelBuddyItinerary.toggleActivityComplete(${actIdx})">
          <div class="activity-time-badge">
            <i class="far fa-clock"></i> ${act.time}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <h4 class="activity-title" style="font-size: 1.1rem;">${act.title}</h4>
          <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap;">
            <span><i class="fas fa-location-dot" style="color: var(--primary-blue);"></i> ${act.location}</span>
            <a href="${mapsUrl}" target="_blank" class="maps-btn" title="Open in Google Maps">
              <i class="fas fa-map-location-dot"></i> Maps
            </a>
            <span><i class="fas fa-receipt" style="color: var(--accent-coral);"></i> ${act.cost > 0 ? TravelBuddy.formatCurrency(act.cost) : 'Free Entry'}</span>
            <span class="badge ${act.completed ? 'badge-success' : 'badge-blue'}">
              ${act.completed ? 'Completed' : 'Scheduled'}
            </span>
          </div>
        </div>

        <div class="activity-actions">
          <button class="btn btn-outline btn-sm" title="Edit Activity" 
                  onclick="TravelBuddyItinerary.openEditModal(${actIdx})">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn btn-outline btn-sm" title="Delete Activity" 
                  style="color: var(--danger); border-color: var(--border-light);"
                  onclick="TravelBuddyItinerary.deleteActivity(${actIdx})">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      </div>
    `}).join('');

    this.renderHeader();
  },

  // Toggle activity completion
  toggleActivityComplete(actIdx) {
    const act = this.currentItinerary.days[this.activeDayIndex].activities[actIdx];
    if (act) {
      act.completed = !act.completed;
      this.saveToStorage();
      this.renderActivities();
      TravelBuddy.showToast(
        act.completed ? `Marked "${act.title}" as completed! ✨` : `Unmarked "${act.title}"`,
        act.completed ? 'success' : 'info',
        2000
      );
      // Check if ALL activities across all days are completed
      if (act.completed) this.checkTripCompletion();
    }
  },

  // Check if entire trip is done → fire celebration + sync trip status
  checkTripCompletion() {
    const allActs = this.currentItinerary.days.flatMap(d => d.activities);
    if (allActs.length === 0) return;
    const allDone = allActs.every(a => a.completed);
    if (!allDone) return;

    // Mark trip as Completed in localStorage
    const tripId = this.currentItinerary.tripId;
    if (tripId) {
      try {
        const trips = JSON.parse(localStorage.getItem(TravelBuddy.STORAGE_KEYS.TRIPS) || '[]');
        const trip = trips.find(t => t.id === tripId);
        if (trip && trip.status !== 'Completed') {
          trip.status = 'Completed';
          localStorage.setItem(TravelBuddy.STORAGE_KEYS.TRIPS, JSON.stringify(trips));
        }
      } catch(e) {}
    }

    // Show celebration popup (delay slightly so last checkbox animation finishes)
    setTimeout(() => TravelBuddy.showCelebration(this.currentItinerary.destinationName), 500);
  },

  // Open modal to add activity
  openAddModal() {
    const form = document.getElementById('activity-modal-form');
    if (form) form.reset();
    document.getElementById('modal-act-edit-index').value = '-1';
    document.getElementById('activity-modal-title').innerText = `Add Activity for Day ${this.activeDayIndex + 1}`;
    TravelBuddy.openModal('activity-modal');
  },

  // Open modal to edit activity
  openEditModal(actIdx) {
    const act = this.currentItinerary.days[this.activeDayIndex].activities[actIdx];
    if (!act) return;

    document.getElementById('modal-act-edit-index').value = actIdx;
    document.getElementById('modal-act-title').value = act.title;
    document.getElementById('modal-act-time').value = act.time;
    document.getElementById('modal-act-location').value = act.location;
    document.getElementById('modal-act-cost').value = act.cost;

    document.getElementById('activity-modal-title').innerText = `Edit Activity`;
    TravelBuddy.openModal('activity-modal');
  },

  // Delete activity
  deleteActivity(actIdx) {
    const act = this.currentItinerary.days[this.activeDayIndex].activities[actIdx];
    if (confirm(`Remove "${act.title}" from Day ${this.activeDayIndex + 1}?`)) {
      this.currentItinerary.days[this.activeDayIndex].activities.splice(actIdx, 1);
      this.saveToStorage();
      this.renderActivities();
      TravelBuddy.showToast('Activity removed from itinerary', 'info');
    }
  },

  // Bind modal form submit
  bindModalForms() {
    const form = document.getElementById('activity-modal-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const editIdx = parseInt(document.getElementById('modal-act-edit-index').value);
      const title = document.getElementById('modal-act-title').value.trim();
      const time = document.getElementById('modal-act-time').value.trim();
      const location = document.getElementById('modal-act-location').value.trim();
      const cost = parseInt(document.getElementById('modal-act-cost').value) || 0;

      if (!title || !time || !location) {
        TravelBuddy.showToast('Please fill in title, time and location', 'warning');
        return;
      }

      if (editIdx >= 0) {
        // Edit existing
        const act = this.currentItinerary.days[this.activeDayIndex].activities[editIdx];
        act.title = title;
        act.time = time;
        act.location = location;
        act.cost = cost;
        TravelBuddy.showToast('Activity updated successfully!', 'success');
      } else {
        // Add new
        const newAct = {
          id: 'act_' + Date.now(),
          time: time,
          title: title,
          location: location,
          cost: cost,
          completed: false
        };
        this.currentItinerary.days[this.activeDayIndex].activities.push(newAct);
        TravelBuddy.showToast('New activity added to Day ' + (this.activeDayIndex + 1), 'success');
      }

      this.saveToStorage();
      TravelBuddy.closeModal('activity-modal');
      this.renderActivities();
    });
  },

  // Print / export itinerary
  printItinerary() {
    window.print();
  }
};
