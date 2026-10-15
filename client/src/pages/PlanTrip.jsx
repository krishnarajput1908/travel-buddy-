import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { tripService } from '../services/tripService';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const PlanTrip = () => {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [destinationName, setDestinationName] = useState(searchParams.get('destination') || 'Manali');
  const [origin, setOrigin] = useState('New Delhi');

  // Dates default: 2 weeks from now, 5 days duration
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 19);
    return d.toISOString().split('T')[0];
  });

  const [travellers, setTravellers] = useState(2);
  const [travelType, setTravelType] = useState('Couple');
  const [transport, setTransport] = useState('Flight');
  const [accommodation, setAccommodation] = useState('Standard');
  const [food, setFood] = useState('Standard');
  const [activities, setActivities] = useState(['Sightseeing & Heritage', 'Local Culinary Tasting']);
  const [userBudget, setUserBudget] = useState(50000);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load destinations
  useEffect(() => {
    const fetchDests = async () => {
      try {
        const res = await destinationService.getAll();
        if (res.success && res.destinations.length > 0) {
          setDestinations(res.destinations);
          if (searchParams.get('destination')) {
            setDestinationName(searchParams.get('destination'));
          } else {
            setDestinationName(res.destinations[0].name);
          }
        }
      } catch (err) {
        console.error('Failed to load destinations for planner:', err);
      } finally {
        setLoadingDestinations(false);
      }
    };
    fetchDests();
  }, [searchParams]);

  // Compute duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  // Selected destination document
  const currentDest = destinations.find(
    (d) => d.name.toLowerCase() === destinationName.toLowerCase()
  ) || destinations[0] || {};

  // Dynamic Budget Calculation
  const isInternational = currentDest.country && currentDest.country !== 'India';
  let transportBase = isInternational ? 28000 : 3500;
  if (transport === 'Flight') transportBase *= 2.2;
  if (transport === 'Train') transportBase *= 0.8;
  if (transport === 'Bus') transportBase *= 0.5;
  if (transport === 'Car') transportBase *= 1.4;
  const calcTransport = Math.round(transportBase * travellers);

  let hotelDaily = currentDest.dailyExpenses?.hotel || 2500;
  if (accommodation === 'Budget') hotelDaily *= 0.6;
  if (accommodation === 'Premium') hotelDaily *= 2.8;
  const roomsNeeded = Math.ceil(travellers / 2);
  const calcAccommodation = Math.round(hotelDaily * diffDays * roomsNeeded);

  let foodDaily = currentDest.dailyExpenses?.food || 900;
  if (food === 'Budget') foodDaily *= 0.65;
  if (food === 'Premium') foodDaily *= 2.2;
  const calcFood = Math.round(foodDaily * diffDays * travellers);

  let activitiesCost = activities.length * 1200 * travellers;
  if (isInternational) activitiesCost *= 2.5;

  const calcMisc = Math.round((calcTransport + calcAccommodation + calcFood + activitiesCost) * 0.08);
  const totalEstimated = calcTransport + calcAccommodation + calcFood + activitiesCost + calcMisc;

  // Budget status ratio
  const ratio = (totalEstimated / (userBudget || totalEstimated)) * 100;
  let statusBadge = { class: 'badge-success', text: 'Within Budget', color: 'linear-gradient(90deg, #10b981, #34d399)' };
  let statusDesc = `Estimated budget matches comfortably with your spending limit.`;

  if (ratio > 115) {
    statusBadge = { class: 'badge-danger', text: 'High Budget', color: 'linear-gradient(90deg, #ef4444, #f87171)' };
    statusDesc = `Estimated cost exceeds target budget. Consider adjusting accommodation or transport standard.`;
  } else if (ratio > 95) {
    statusBadge = { class: 'badge-warning', text: 'Slightly Above Budget', color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' };
    statusDesc = `Estimated cost is slightly above your target by roughly ₹${Number(totalEstimated - userBudget).toLocaleString('en-IN')}.`;
  }

  const handleActivityToggle = (act) => {
    setActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast('Please sign in to save and generate your trip itinerary', 'info');
      navigate('/login', { state: { from: { pathname: '/plan-trip' } } });
      return;
    }

    setSubmitting(true);
    try {
      const tripData = {
        destinationId: currentDest._id,
        destinationName: currentDest.name || destinationName,
        country: currentDest.country || 'India',
        image: currentDest.image,
        startDate,
        endDate,
        durationDays: diffDays,
        travellers,
        travelType,
        transport,
        accommodation,
        budget: totalEstimated,
        breakdown: {
          transport: calcTransport,
          accommodation: calcAccommodation,
          food: calcFood,
          activities: activitiesCost,
          misc: calcMisc
        }
      };

      const res = await tripService.create(tripData);
      if (res.success) {
        showToast('Trip planned and saved to MongoDB! 🎉', 'success');
        navigate(`/itinerary/${res.trip._id}`);
      }
    } catch (err) {
      console.error('Failed to create trip:', err);
      showToast(err.response?.data?.message || 'Failed to save trip', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN');
  };

  return (
    <>
      <header style={{ background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(2, 132, 199, 0.08))', padding: '3rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>
              <i className="fas fa-calculator"></i> Smart Trip Architect
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Plan Your Perfect Trip</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Configure your travel preferences and our dynamic engine will compute a realistic cost breakdown, check budget feasibility, and generate your day-by-day itinerary.
            </p>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingBottom: '5rem' }}>
        <div className="planner-layout">
          
          {/* Left Column: Form */}
          <div className="planner-card">
            <form onSubmit={handleSubmit}>
              
              {/* Step 1: Destination & Dates */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
                  Where & When Are You Traveling?
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Target Destination</label>
                    <select
                      className="form-control"
                      value={destinationName}
                      onChange={(e) => setDestinationName(e.target.value)}
                      disabled={loadingDestinations}
                    >
                      {destinations.map((d) => (
                        <option key={d._id} value={d.name}>
                          {d.name} ({d.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Starting City (Origin)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'flex-end' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ paddingBottom: '0.4rem' }}>
                    <span className="badge badge-blue" style={{ padding: '0.65rem 1rem' }}>
                      {diffDays} Days / {Math.max(1, diffDays - 1)} Nights
                    </span>
                  </div>
                </div>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid var(--border-light)', marginBottom: '2rem' }} />

              {/* Step 2: Party Composition */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                  Travelers & Group Composition
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'center' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Number of People</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="20"
                      value={travellers}
                      onChange={(e) => setTravellers(Math.max(1, parseInt(e.target.value) || 1))}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Travel Party Type</label>
                    <div className="options-grid">
                      {['Solo', 'Couple', 'Family', 'Friends'].map((type) => (
                        <div
                          key={type}
                          className={`option-card ${travelType === type ? 'selected' : ''}`}
                          onClick={() => setTravelType(type)}
                        >
                          <i className={type === 'Solo' ? 'fas fa-person' : type === 'Couple' ? 'fas fa-user-group' : type === 'Family' ? 'fas fa-people-roof' : 'fas fa-users-rays'}></i>
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid var(--border-light)', marginBottom: '2rem' }} />

              {/* Step 3: Transportation & Lodging */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>3</span>
                  Comfort & Logistics Preferences
                </h3>

                {/* Transport */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Preferred Transportation</label>
                  <div className="options-grid">
                    {[
                      { id: 'Flight', icon: 'fa-plane-departure', label: 'Flight' },
                      { id: 'Train', icon: 'fa-train', label: 'Train' },
                      { id: 'Bus', icon: 'fa-bus', label: 'Bus' },
                      { id: 'Car', icon: 'fa-car-side', label: 'Road / Car' }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`option-card ${transport === item.id ? 'selected' : ''}`}
                        onClick={() => setTransport(item.id)}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Accommodation Standard</label>
                  <div className="options-grid">
                    {[
                      { id: 'Budget', icon: 'fa-campground', label: 'Budget (Hostel)' },
                      { id: 'Standard', icon: 'fa-hotel', label: 'Standard (3-4 Star)' },
                      { id: 'Premium', icon: 'fa-crown', label: 'Premium (5-Star)' }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`option-card ${accommodation === item.id ? 'selected' : ''}`}
                        onClick={() => setAccommodation(item.id)}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dining */}
                <div>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Dining Preference</label>
                  <div className="options-grid">
                    {[
                      { id: 'Budget', icon: 'fa-bowl-food', label: 'Casual / Local' },
                      { id: 'Standard', icon: 'fa-utensils', label: 'Standard Cafes' },
                      { id: 'Premium', icon: 'fa-champagne-glasses', label: 'Fine Dining' }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`option-card ${food === item.id ? 'selected' : ''}`}
                        onClick={() => setFood(item.id)}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid var(--border-light)', marginBottom: '2rem' }} />

              {/* Step 4: Activities */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>4</span>
                  Planned Activities & Experiences
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    'Sightseeing & Heritage',
                    'Outdoor Adventure Sports',
                    'Local Culinary Tasting',
                    'Bazaars & Souvenir Shopping'
                  ].map((act) => (
                    <label key={act} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={activities.includes(act)}
                        onChange={() => handleActivityToggle(act)}
                        style={{ accentColor: 'var(--primary-blue)' }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>{act}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid var(--border-light)', marginBottom: '2rem' }} />

              {/* Step 5: User Budget */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>5</span>
                  Target Budget Comparison
                </h3>

                <div className="form-group">
                  <label className="form-label">Your Target Budget (in ₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    step="1000"
                    value={userBudget}
                    onChange={(e) => setUserBudget(parseInt(e.target.value) || 0)}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Adjust this number to evaluate against the real-time system cost estimation.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-block btn-lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i> Generating Itinerary...
                  </>
                ) : (
                  <>
                    <i className="fas fa-wand-magic-sparkles"></i> Generate Smart Itinerary & Save Trip
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Dynamic Budget Calculator */}
          <div>
            <div className="budget-calculator-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem' }}>Estimated Trip Budget</h3>
                <span className={`badge ${statusBadge.class}`}>{statusBadge.text}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{statusDesc}</p>

              {/* Progress Bar */}
              <div className="budget-progress-container">
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min(100, ratio)}%`,
                      background: statusBadge.color
                    }}
                  ></div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-breakdown-list">
                <div className="budget-item">
                  <span><i className="fas fa-plane text-gradient"></i> Transportation</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(calcTransport)}</span>
                </div>

                <div className="budget-item">
                  <span><i className="fas fa-hotel text-gradient"></i> Accommodation</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(calcAccommodation)}</span>
                </div>

                <div className="budget-item">
                  <span><i className="fas fa-utensils text-gradient"></i> Food & Dining</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(calcFood)}</span>
                </div>

                <div className="budget-item">
                  <span><i className="fas fa-person-hiking text-coral-gradient"></i> Activities & Entry</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(activitiesCost)}</span>
                </div>

                <div className="budget-item">
                  <span><i className="fas fa-shield-halved text-gradient"></i> Misc & Buffer (8%)</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(calcMisc)}</span>
                </div>
              </div>

              {/* Total Box */}
              <div className="budget-total-box">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Estimated Cost</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--primary-blue)' }}>
                    {formatCurrency(totalEstimated)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '0.9rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <i className="fas fa-circle-info" style={{ color: 'var(--primary-blue)' }}></i> Estimates are computed using live hotel standards, regional transit metrics, and ticket entry prices.
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default PlanTrip;
