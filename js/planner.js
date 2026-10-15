/**
 * TRAVEL BUDDY - Trip Planner & Dynamic Budget Calculator Module
 * Calculates realistic dynamic budgets, manages multi-step preferences, and saves trips
 */

const TravelBuddyPlanner = {
  // State
  formData: {
    destination: 'Manali',
    origin: 'Delhi',
    startDate: '',
    endDate: '',
    durationDays: 5,
    travellers: 2,
    travelType: 'Couple',
    transport: 'Flight',
    accommodation: 'Standard',
    food: 'Standard',
    activities: ['Sightseeing & Heritage', 'Local Culinary Tour'],
    userBudget: 50000
  },

  // Initialize planner
  init() {
    // 1. Pre-fill destination from query param if available
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('destination');
    if (destParam) {
      this.formData.destination = decodeURIComponent(destParam);
    }

    // 2. Setup default travel dates (starts tomorrow, 5 days duration)
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 14);
    const end = new Date(start);
    end.setDate(start.getDate() + 5);

    this.formData.startDate = start.toISOString().split('T')[0];
    this.formData.endDate = end.toISOString().split('T')[0];

    // 3. Populate form fields
    this.populateDestinationsDropdown();
    this.bindInputs();
    this.recalculateBudget();
  },

  // Populate destination select dropdown
  populateDestinationsDropdown() {
    const select = document.getElementById('planner-destination');
    if (!select) return;

    const destinations = TravelBuddyDestinations.getAll();
    select.innerHTML = destinations.map(d => `
      <option value="${d.name}" ${d.name.toLowerCase() === this.formData.destination.toLowerCase() ? 'selected' : ''}>
        ${d.name} (${d.country})
      </option>
    `).join('');
  },

  // Bind input listeners
  bindInputs() {
    const destSelect = document.getElementById('planner-destination');
    const originInput = document.getElementById('planner-origin');
    const startInput = document.getElementById('planner-start-date');
    const endInput = document.getElementById('planner-end-date');
    const travellersInput = document.getElementById('planner-travellers');
    const userBudgetInput = document.getElementById('planner-user-budget');

    if (destSelect) {
      destSelect.value = this.formData.destination;
      destSelect.addEventListener('change', (e) => {
        this.formData.destination = e.target.value;
        this.recalculateBudget();
      });
    }

    if (originInput) {
      originInput.value = this.formData.origin;
      originInput.addEventListener('input', (e) => {
        this.formData.origin = e.target.value;
      });
    }

    if (startInput && endInput) {
      startInput.value = this.formData.startDate;
      endInput.value = this.formData.endDate;

      startInput.addEventListener('change', (e) => {
        this.formData.startDate = e.target.value;
        this.updateDuration();
      });

      endInput.addEventListener('change', (e) => {
        this.formData.endDate = e.target.value;
        this.updateDuration();
      });
    }

    if (travellersInput) {
      travellersInput.value = this.formData.travellers;
      travellersInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value) || 1;
        this.formData.travellers = Math.max(1, Math.min(20, val));
        this.autoSelectTravelType(this.formData.travellers);
        this.recalculateBudget();
      });
    }

    if (userBudgetInput) {
      userBudgetInput.value = this.formData.userBudget;
      userBudgetInput.addEventListener('input', (e) => {
        this.formData.userBudget = parseInt(e.target.value) || 0;
        this.updateBudgetStatus();
      });
    }

    // Bind Option Selection Cards (Transport, Accommodation, Food)
    this.bindOptionCards('transport', '.transport-option');
    this.bindOptionCards('accommodation', '.accommodation-option');
    this.bindOptionCards('food', '.food-option');

    // Travel type cards: only Friends & Family are manually selectable when count > 2
    document.querySelectorAll('.travel-type-option').forEach(card => {
      card.addEventListener('click', () => {
        const count = this.formData.travellers;
        const val = card.dataset.value;
        // Solo locked to 1, Couple locked to 2
        if (count === 1 && val !== 'Solo') return;
        if (count === 2 && val !== 'Couple') return;
        if (count <= 2) return; // only Friends/Family allowed to be clicked for 3+
        document.querySelectorAll('.travel-type-option').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.formData.travelType = val;
        this.recalculateBudget();
      });
    });

    // Run auto-select on init
    this.autoSelectTravelType(this.formData.travellers);

    // Bind Activities Checkboxes
    document.querySelectorAll('.activity-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const selected = [];
        document.querySelectorAll('.activity-checkbox:checked').forEach(c => selected.push(c.value));
        this.formData.activities = selected;
        this.recalculateBudget();
      });
    });

    // Form Submit
    const form = document.getElementById('plan-trip-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitTrip();
      });
    }
  },

  // Helper for option cards click
  bindOptionCards(key, selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll(selector).forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.formData[key] = card.dataset.value;
        this.recalculateBudget();
      });
    });
  },

  // Auto-select travel type based on number of travelers
  autoSelectTravelType(count) {
    const cards = document.querySelectorAll('.travel-type-option');

    if (count === 1) {
      // Solo: force-select Solo, hide Couple, show Friends & Family as disabled
      cards.forEach(card => {
        const val = card.dataset.value;
        card.classList.remove('selected', 'disabled-option');
        if (val === 'Solo') {
          card.classList.add('selected');
          card.style.opacity = '1';
          card.style.pointerEvents = 'none'; // locked
          card.title = 'Auto-selected: Solo (1 person)';
        } else {
          card.style.opacity = '0.35';
          card.style.pointerEvents = 'none';
          card.title = 'Not available for 1 traveler';
        }
      });
      this.formData.travelType = 'Solo';
      this._setTravelTypeHint('1 traveler → Solo auto-selected 🧍 (locked)');

    } else if (count === 2) {
      // Couple: force-select Couple, disable rest
      cards.forEach(card => {
        const val = card.dataset.value;
        card.classList.remove('selected', 'disabled-option');
        if (val === 'Couple') {
          card.classList.add('selected');
          card.style.opacity = '1';
          card.style.pointerEvents = 'none';
          card.title = 'Auto-selected: Couple/Duo (2 people)';
        } else {
          card.style.opacity = '0.35';
          card.style.pointerEvents = 'none';
          card.title = 'Not available for 2 travelers';
        }
      });
      this.formData.travelType = 'Couple';
      this._setTravelTypeHint('2 travelers → Couple/Duo auto-selected 👫 (locked)');

    } else {
      // 3+ people: Solo & Couple disabled, Friends & Family selectable
      cards.forEach(card => {
        const val = card.dataset.value;
        card.classList.remove('selected');
        if (val === 'Solo' || val === 'Couple') {
          card.style.opacity = '0.35';
          card.style.pointerEvents = 'none';
          card.title = `Not available for ${count} travelers`;
        } else {
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
          card.title = '';
        }
      });
      // If current selection is not valid for 3+, default to Friends
      if (this.formData.travelType === 'Solo' || this.formData.travelType === 'Couple') {
        this.formData.travelType = 'Friends';
      }
      // Highlight the currently selected card
      const activeCard = [...cards].find(c => c.dataset.value === this.formData.travelType);
      if (activeCard) activeCard.classList.add('selected');
      this._setTravelTypeHint(`${count} travelers → Choose: Friends 👥 or Family 👨‍👩‍👧‍👦`);
    }
  },

  _setTravelTypeHint(msg) {
    const hint = document.getElementById('travel-type-hint-text');
    if (hint) hint.textContent = msg;
  },

  // Update trip duration in days
  updateDuration() {
    if (this.formData.startDate && this.formData.endDate) {
      const d1 = new Date(this.formData.startDate);
      const d2 = new Date(this.formData.endDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.formData.durationDays = diffDays > 0 ? diffDays : 1;

      const durationBadge = document.getElementById('planner-duration-badge');
      if (durationBadge) {
        durationBadge.innerText = `${this.formData.durationDays} Days / ${Math.max(1, this.formData.durationDays - 1)} Nights`;
      }
      this.recalculateBudget();
    }
  },

  // Calculate dynamic budget estimation
  recalculateBudget() {
    const dest = TravelBuddyDestinations.getAll().find(
      d => d.name.toLowerCase() === this.formData.destination.toLowerCase()
    ) || TravelBuddyDestinations.getAll()[0];

    const days = this.formData.durationDays;
    const pax = this.formData.travellers;

    // 1. Transport Multipliers
    let transportBase = 3500;
    if (dest.country !== 'India') transportBase = 28000; // International
    if (this.formData.transport === 'Flight') transportBase *= 2.2;
    if (this.formData.transport === 'Train') transportBase *= 0.8;
    if (this.formData.transport === 'Bus') transportBase *= 0.5;
    if (this.formData.transport === 'Car') transportBase *= 1.4;
    const totalTransport = Math.round(transportBase * pax);

    // 2. Accommodation Multipliers
    let hotelDaily = dest.dailyExpenses ? dest.dailyExpenses.hotel : 2500;
    if (this.formData.accommodation === 'Budget') hotelDaily *= 0.6;
    if (this.formData.accommodation === 'Premium') hotelDaily *= 2.8;
    // Room count: roughly 1 room per 2 travelers
    const roomsNeeded = Math.ceil(pax / 2);
    const totalAccommodation = Math.round(hotelDaily * days * roomsNeeded);

    // 3. Food Multipliers
    let foodDaily = dest.dailyExpenses ? dest.dailyExpenses.food : 900;
    if (this.formData.food === 'Budget') foodDaily *= 0.65;
    if (this.formData.food === 'Premium') foodDaily *= 2.2;
    const totalFood = Math.round(foodDaily * days * pax);

    // 4. Activities Multipliers
    let activitiesCost = this.formData.activities.length * 1200 * pax;
    if (dest.country !== 'India') activitiesCost *= 2.5;

    // 5. Miscellaneous
    const totalMisc = Math.round((totalTransport + totalAccommodation + totalFood + activitiesCost) * 0.08);

    // Grand Total
    const totalEstimated = totalTransport + totalAccommodation + totalFood + activitiesCost + totalMisc;

    // Update UI Cards
    this.updateBudgetElement('calc-transport', totalTransport);
    this.updateBudgetElement('calc-accommodation', totalAccommodation);
    this.updateBudgetElement('calc-food', totalFood);
    this.updateBudgetElement('calc-activities', activitiesCost);
    this.updateBudgetElement('calc-misc', totalMisc);
    this.updateBudgetElement('calc-total', totalEstimated);

    this.calculatedTotal = totalEstimated;
    this.updateBudgetStatus();
  },

  updateBudgetElement(id, amount) {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = TravelBuddy.formatCurrency(amount);
    }
  },

  // Update progress bar & status indicator
  updateBudgetStatus() {
    const userBudget = this.formData.userBudget || this.calculatedTotal;
    const estimated = this.calculatedTotal || 1;
    const ratio = (estimated / userBudget) * 100;

    const progressFill = document.getElementById('budget-progress-fill');
    const statusPill = document.getElementById('budget-status-pill');
    const statusDesc = document.getElementById('budget-status-desc');

    if (progressFill) {
      progressFill.style.width = `${Math.min(100, ratio)}%`;
    }

    if (statusPill && statusDesc) {
      if (ratio <= 95) {
        statusPill.className = 'badge badge-success';
        statusPill.innerText = 'Within Budget';
        statusDesc.innerText = `Great! You are ₹${Number(userBudget - estimated).toLocaleString('en-IN')} below your target limit.`;
        if (progressFill) progressFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
      } else if (ratio <= 115) {
        statusPill.className = 'badge badge-warning';
        statusPill.innerText = 'Slightly Above Budget';
        statusDesc.innerText = `Moderate: Estimated cost is roughly ₹${Number(estimated - userBudget).toLocaleString('en-IN')} over target.`;
        if (progressFill) progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
      } else {
        statusPill.className = 'badge badge-danger';
        statusPill.innerText = 'High Budget';
        statusDesc.innerText = `Consider adjusting accommodation tier or transportation to align with budget.`;
        if (progressFill) progressFill.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
      }
    }
  },

  // Submit trip form & generate itinerary (saves to backend API + localStorage cache)
  async submitTrip() {
    const dest = TravelBuddyDestinations.getAll().find(
      d => d.name.toLowerCase() === this.formData.destination.toLowerCase()
    ) || TravelBuddyDestinations.getAll()[0];

    const tripData = {
      destinationId: null, // Let the server look up by name (local catalog IDs are not MongoDB ObjectIds)
      destinationName: dest.name,
      country: dest.country,
      image: dest.image,
      startDate: this.formData.startDate,
      endDate: this.formData.endDate,
      durationDays: this.formData.durationDays,
      travellers: this.formData.travellers,
      travelType: this.formData.travelType,
      transport: this.formData.transport,
      accommodation: this.formData.accommodation,
      budget: this.calculatedTotal,
      breakdown: {
        transport: parseInt(document.getElementById('calc-transport').innerText.replace(/[^0-9]/g, '')) || 10000,
        accommodation: parseInt(document.getElementById('calc-accommodation').innerText.replace(/[^0-9]/g, '')) || 15000,
        food: parseInt(document.getElementById('calc-food').innerText.replace(/[^0-9]/g, '')) || 6000,
        activities: parseInt(document.getElementById('calc-activities').innerText.replace(/[^0-9]/g, '')) || 4000,
        misc: parseInt(document.getElementById('calc-misc').innerText.replace(/[^0-9]/g, '')) || 1500
      }
    };

    let savedTrip = null;
    let tripId = 'trip_' + Date.now();

    // 1. Try saving to backend API
    try {
      const token = localStorage.getItem('tb_jwt_token');
      if (token) {
        const res = await fetch('http://localhost:5000/api/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(tripData)
        });
        const data = await res.json();
        if (data.success && data.trip) {
          savedTrip = data.trip;
          tripId = savedTrip._id || savedTrip.id;
        }
      }
    } catch (err) {
      console.warn('Backend trip save failed, using localStorage fallback:', err);
    }

    // 2. Also save to localStorage as cache/fallback
    const localTrip = savedTrip || {
      id: tripId,
      ...tripData,
      status: 'Upcoming'
    };
    // Normalize _id to id for localStorage consistency
    if (localTrip._id && !localTrip.id) {
      localTrip.id = localTrip._id;
    }
    const trips = JSON.parse(localStorage.getItem(TravelBuddy.STORAGE_KEYS.TRIPS) || '[]');
    trips.unshift(localTrip);
    localStorage.setItem(TravelBuddy.STORAGE_KEYS.TRIPS, JSON.stringify(trips));

    // 3. Generate and save day-by-day Itinerary to localStorage for itinerary page
    const generatedItinerary = TravelBuddyItinerary.generateItineraryTemplate(dest, tripData.durationDays);
    localStorage.setItem(TravelBuddy.STORAGE_KEYS.ACTIVE_ITINERARY, JSON.stringify({
      tripId: tripId,
      destinationName: tripData.destinationName,
      days: generatedItinerary
    }));

    TravelBuddy.showToast('Trip planned successfully! 🎉 Generating your smart itinerary...', 'success', 2500);

    setTimeout(() => {
      window.location.href = `itinerary.html?tripId=${tripId}`;
    }, 1000);
  }
};
