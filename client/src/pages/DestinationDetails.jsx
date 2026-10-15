import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { favouriteService } from '../services/favouriteService';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const DestinationDetails = () => {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await destinationService.getById(id);
        if (res.success) {
          setDest(res.destination);
        }

        if (isAuthenticated) {
          const favRes = await favouriteService.getAll();
          if (favRes.success) {
            const hasFav = favRes.favourites.some((f) => f._id === id);
            setIsFav(hasFav);
          }
        }
      } catch (err) {
        console.error('Error fetching destination details:', err);
        showToast('Destination details could not be loaded', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isAuthenticated]);

  const handleToggleFavourite = async () => {
    if (!isAuthenticated) {
      showToast('Please log in to save favourites ❤️', 'info');
      navigate('/login');
      return;
    }

    try {
      const res = await favouriteService.toggle(dest._id);
      if (res.success) {
        setIsFav(res.isFavourite);
        showToast(res.isFavourite ? 'Saved to favourites ❤️' : 'Removed from favourites', res.isFavourite ? 'success' : 'info');
      }
    } catch (err) {
      showToast('Failed to update favourite status', 'error');
    }
  };

  const formatCurrency = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}></i>
          <p style={{ color: 'var(--text-muted)' }}>Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Destination Not Found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>The destination you are looking for does not exist.</p>
        <Link to="/destinations" className="btn btn-primary">Browse Destinations</Link>
      </div>
    );
  }

  const dailyTotal = (dest.dailyExpenses?.hotel || 0) + (dest.dailyExpenses?.food || 0) + (dest.dailyExpenses?.transport || 0) + (dest.dailyExpenses?.activities || 0);

  return (
    <div>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden', background: '#000' }}>
        <img
          src={dest.image}
          alt={dest.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.6) 100%)' }}></div>
        
        <div className="container" style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, color: '#ffffff' }}>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
            <span className="badge badge-blue"><i className="fas fa-location-dot"></i> {dest.country}</span>
            <span className="badge badge-purple">{dest.budgetCategory} Tier</span>
            <span className="badge badge-coral"><i className="fas fa-compass"></i> {dest.travelType}</span>
          </div>
          <h1 style={{ fontSize: '3.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>{dest.name}</h1>
          <p style={{ color: '#e2e8f0', fontSize: '1.15rem', maxWidth: '650px' }}>{dest.shortDesc}</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to={`/plan-trip?destination=${encodeURIComponent(dest.name)}`} className="btn btn-accent btn-lg">
              <i className="fas fa-paper-plane"></i> Plan Trip to {dest.name}
            </Link>
            <button
              className="btn btn-outline btn-lg"
              style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              onClick={handleToggleFavourite}
            >
              <i className={`${isFav ? 'fas' : 'far'} fa-heart`} style={{ color: isFav ? '#ef4444' : '#fff' }}></i>
              {isFav ? 'Saved in Favourites' : 'Add to Favourites'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '3rem' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* About Card */}
            <div className="planner-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>About {dest.name}</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-main)' }}>{dest.fullDesc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Best Time</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{dest.bestTime}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ideal Duration</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{dest.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rating</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-amber)' }}>
                    <i className="fas fa-star"></i> {dest.rating} / 5.0
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Budget</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary-blue)' }}>{formatCurrency(dest.estimatedBudget)}</div>
                </div>
              </div>
            </div>

            {/* Attractions */}
            <div className="planner-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                <i className="fas fa-landmark text-gradient"></i> Top Attractions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {dest.attractions?.map((att, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{att.name}</h4>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{att.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Activities */}
            <div className="planner-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>
                <i className="fas fa-person-hiking text-coral-gradient"></i> Recommended Activities
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {dest.activities?.map((act, i) => (
                  <div key={i} style={{ padding: '0.6rem 1.1rem', borderRadius: 'var(--radius-full)', background: 'var(--sky-blue-light)', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-check-circle"></i> {act}
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div className="planner-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                <i className="fas fa-route text-gradient"></i> How to Reach
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {dest.transport?.flight && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="action-icon"><i className="fas fa-plane"></i></div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>By Air</h4>
                      <p style={{ fontSize: '0.9rem' }}>{dest.transport.flight}</p>
                    </div>
                  </div>
                )}
                {dest.transport?.train && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="action-icon"><i className="fas fa-train"></i></div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>By Train</h4>
                      <p style={{ fontSize: '0.9rem' }}>{dest.transport.train}</p>
                    </div>
                  </div>
                )}
                {dest.transport?.road && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="action-icon"><i className="fas fa-car"></i></div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>By Road</h4>
                      <p style={{ fontSize: '0.9rem' }}>{dest.transport.road}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="planner-card" style={{ borderLeft: '4px solid var(--accent-coral)' }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <i className="fas fa-lightbulb" style={{ color: 'var(--accent-coral)' }}></i> Essential Travel Tips
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.25rem', listStyle: 'disc' }}>
                {dest.travelTips?.map((tip, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Live Weather Demo Card */}
            <div className="budget-calculator-card" style={{ position: 'static' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Live Weather Demo</h3>
                <span className="badge badge-blue">Real-time Feed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--primary-blue)' }}>
                  {dest.weather?.temp || '24°C'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{dest.weather?.condition || 'Clear & Sunny'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <i className="fas fa-droplet"></i> Humidity: {dest.weather?.humidity || '50%'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <i className="fas fa-leaf"></i> {dest.weather?.season || 'Spring / Autumn'}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Condition monitored via Travel Buddy micro-climate simulator.
              </p>
            </div>

            {/* Daily Expenses Breakdown */}
            <div className="planner-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Est. Daily Expenses</h3>
              <div className="budget-breakdown-list">
                <div className="budget-item">
                  <span><i className="fas fa-bed text-gradient"></i> Hotel / Lodging</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(dest.dailyExpenses?.hotel || 2500)}</span>
                </div>
                <div className="budget-item">
                  <span><i className="fas fa-utensils text-gradient"></i> Food & Dining</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(dest.dailyExpenses?.food || 900)}</span>
                </div>
                <div className="budget-item">
                  <span><i className="fas fa-taxi text-gradient"></i> Local Transit</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(dest.dailyExpenses?.transport || 600)}</span>
                </div>
                <div className="budget-item">
                  <span><i className="fas fa-ticket text-gradient"></i> Activities / Entry</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(dest.dailyExpenses?.activities || 1200)}</span>
                </div>
              </div>

              <div className="budget-total-box">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. Daily Total</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                    {formatCurrency(dailyTotal)}
                  </div>
                </div>
                <Link to={`/plan-trip?destination=${encodeURIComponent(dest.name)}`} className="btn btn-primary btn-sm">
                  Customize
                </Link>
              </div>
            </div>

            {/* Accommodation Tiers */}
            <div className="planner-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Accommodation Rates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}><i className="fas fa-tag"></i> Budget Tier</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{dest.accommodation?.budget || '₹800 - ₹1,500 / night'}</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-blue)' }}><i className="fas fa-hotel"></i> Standard Tier</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{dest.accommodation?.standard || '₹2,500 - ₹5,000 / night'}</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-coral)' }}><i className="fas fa-crown"></i> Premium Luxury</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{dest.accommodation?.premium || '₹8,000 - ₹25,000 / night'}</div>
                </div>
              </div>
            </div>

            {/* CTA Widget */}
            <div style={{ background: 'linear-gradient(135deg, var(--primary-navy), #1e293b)', color: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.75rem' }}>Ready to Visit {dest.name}?</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Create a personalized day-by-day itinerary and calculate your real-time budget.
              </p>
              <Link to={`/plan-trip?destination=${encodeURIComponent(dest.name)}`} className="btn btn-accent btn-block">
                Start Planning Now
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
