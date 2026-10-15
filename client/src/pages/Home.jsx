import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { favouriteService } from '../services/favouriteService';
import { useAuth } from '../context/AuthContext';
import DestinationCard from '../components/DestinationCard';
import { showToast } from '../components/Toast';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await destinationService.getAll();
        if (res.success) {
          setDestinations(res.destinations.slice(0, 4));
        }
        if (isAuthenticated) {
          const favRes = await favouriteService.getAll();
          if (favRes.success) {
            setFavourites(favRes.favourites.map((f) => f._id));
          }
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };

    fetchHomeData();
  }, [isAuthenticated]);

  const handleToggleFavourite = async (destId) => {
    if (!isAuthenticated) {
      showToast('Please log in to save favourites ❤️', 'info');
      navigate('/login');
      return;
    }
    try {
      const res = await favouriteService.toggle(destId);
      if (res.success) {
        if (res.isFavourite) {
          setFavourites((prev) => [...prev, destId]);
          showToast('Added to favourites ❤️', 'success');
        } else {
          setFavourites((prev) => prev.filter((id) => id !== destId));
          showToast('Removed from favourites', 'info');
        }
      }
    } catch (err) {
      showToast('Failed to update favourite', 'error');
    }
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedBudget !== 'all') params.set('budget', selectedBudget);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <i className="fas fa-compass"></i> Next-Gen Smart Travel Planner
              </div>
              <h1 className="hero-title">
                Your Journey.<br />
                Your Plan.<br />
                <span className="text-gradient">Your Travel Buddy.</span>
              </h1>
              <p className="hero-subtitle">
                Discover destinations, build personalized day-by-day itineraries, estimate your complete trip budget, and manage all your travel bookings — all in one place.
              </p>
              <div className="hero-cta-group">
                <Link to="/plan-trip" className="btn btn-accent btn-lg">
                  <i className="fas fa-paper-plane"></i> Plan My Trip
                </Link>
                <Link to="/destinations" className="btn btn-outline btn-lg">
                  <i className="fas fa-magnifying-glass"></i> Explore Destinations
                </Link>
              </div>

              {/* Quick Search Widget */}
              <form className="search-widget-bar" onSubmit={handleHeroSearch}>
                <div className="search-field">
                  <i className="fas fa-location-dot"></i>
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="search-field">
                  <i className="fas fa-compass"></i>
                  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="all">Any Travel Type</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Beach">Beach & Sun</option>
                    <option value="Heritage">Heritage & Culture</option>
                    <option value="Romantic">Romantic Getaway</option>
                    <option value="Nature">Nature & Mountain</option>
                    <option value="City">City & Culture</option>
                  </select>
                </div>
                <div className="search-field">
                  <i className="fas fa-wallet"></i>
                  <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
                    <option value="all">Any Budget Tier</option>
                    <option value="Budget">Budget</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-search"></i> Search
                </button>
              </form>
            </div>

            {/* Hero Visual */}
            <div className="hero-visual">
              <div className="hero-card-main">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  alt="Exotic Beach Shore"
                />
              </div>

              <div className="hero-floating-stat">
                <div className="stat-icon icon-blue">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>100% Verified</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Smart Curated Itineraries</div>
                </div>
              </div>

              <div className="hero-floating-badge">
                <i className="fas fa-star" style={{ color: 'var(--accent-amber)', fontSize: '1.25rem' }}></i>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>4.9 / 5.0 Rating</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From 24,000+ Happy Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Strip */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="stats-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-icon icon-blue"><i className="fas fa-map-marked-alt"></i></div>
              <div>
                <div className="stat-value text-gradient">150+</div>
                <div className="stat-label">Destinations Cataloged</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-coral"><i className="fas fa-route"></i></div>
              <div>
                <div className="stat-value text-coral-gradient">42,000+</div>
                <div className="stat-label">Smart Trips Generated</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-green"><i className="fas fa-coins"></i></div>
              <div>
                <div className="stat-value">98.4%</div>
                <div className="stat-label">Budget Precision Rate</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-purple"><i className="fas fa-users"></i></div>
              <div>
                <div className="stat-value">35,000+</div>
                <div className="stat-label">Active Globetrotters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Built for Modern Travelers</span>
            <h2 className="section-title">Everything You Need for Effortless Journeys</h2>
            <p>No more messy spreadsheets or dozen open tabs. Travel Buddy consolidates your entire travel lifecycle into an elegant, unified platform.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-blue"><i className="fas fa-route"></i></div>
              <h3>Smart Trip Planning</h3>
              <p>Configure your destination, starting city, travel dates, passenger count, preferred transit, and lodging tier with seamless precision.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-coral"><i className="fas fa-earth-americas"></i></div>
              <h3>Destination Discovery</h3>
              <p>Explore world-class destinations featuring verified reviews, curated attractions, local transportation guides, and seasonal weather feeds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-green"><i className="fas fa-calculator"></i></div>
              <h3>Dynamic Budget Estimation</h3>
              <p>Accurately estimate expenses categorized into transit, lodging, dining, activities, and emergency buffer before spending a dime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-purple"><i className="fas fa-calendar-check"></i></div>
              <h3>Smart Day-by-Day Itinerary</h3>
              <p>Automatically generate time-stamped day-by-day schedules with full freedom to add custom stops, edit timings, and track completions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-blue"><i className="fas fa-ticket"></i></div>
              <h3>Booking Management</h3>
              <p>Keep your hotel stays, flight/train tickets, and adventure reservations organized with real-time status alerts and one-tap cancellations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper icon-coral"><i className="fas fa-hand-holding-heart"></i></div>
              <h3>Travel Assistance & Safety</h3>
              <p>Access ready-to-use packing checklists, document safeguards, emergency helplines, local etiquette guides, and seasonal advisories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Destinations Preview */}
      <section className="section" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-coral">Top Picks</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem' }}>Trending Destinations</h2>
              <p>Curated hotspots travelers are loving this season.</p>
            </div>
            <Link to="/destinations" className="btn btn-outline">
              View All Destinations <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="destinations-grid">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest._id}
                destination={dest}
                isFavourite={favourites.includes(dest._id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Assistance Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-purple">Traveler Support & Readiness</span>
            <h2 className="section-title">Essential Travel Assistance</h2>
            <p>Smart tools, checklists, and safety advisories to guarantee worry-free journeys wherever you go.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card" style={{ borderTop: '4px solid var(--primary-blue)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-suitcase-rolling" style={{ fontSize: '1.5rem', color: 'var(--primary-blue)' }}></i>
                <h4 style={{ fontSize: '1.2rem' }}>Smart Packing Checklist</h4>
              </div>
              <p style={{ fontSize: '0.9rem' }}>Never leave essentials behind. Pack weather-appropriate gear, universal adapters, emergency first aid, and power banks.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                <div><i className="fas fa-check text-gradient"></i> All-weather clothing & quick-dry layers</div>
                <div><i className="fas fa-check text-gradient"></i> Travel medical kit & personal prescriptions</div>
                <div><i className="fas fa-check text-gradient"></i> Universal power adapter (Type C/G)</div>
              </div>
            </div>

            <div className="feature-card" style={{ borderTop: '4px solid var(--accent-coral)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-passport" style={{ fontSize: '1.5rem', color: 'var(--accent-coral)' }}></i>
                <h4 style={{ fontSize: '1.2rem' }}>Important Documents Vault</h4>
              </div>
              <p style={{ fontSize: '0.9rem' }}>Ensure physical and digital duplicates are secured before departure to prevent border complications.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                <div><i className="fas fa-check text-coral-gradient"></i> Passport / National ID with 6 months validity</div>
                <div><i className="fas fa-check text-coral-gradient"></i> Digital travel insurance policy certificate</div>
                <div><i className="fas fa-check text-coral-gradient"></i> Printed hotel booking & return transit vouchers</div>
              </div>
            </div>

            <div className="feature-card" style={{ borderTop: '4px solid var(--success)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-shield-virus" style={{ fontSize: '1.5rem', color: 'var(--success)' }}></i>
                <h4 style={{ fontSize: '1.2rem' }}>Safety & Emergency Info</h4>
              </div>
              <p style={{ fontSize: '0.9rem' }}>Verified domestic and international tourist helplines and emergency protocols accessible 24/7.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                <div><i className="fas fa-phone" style={{ color: 'var(--success)' }}></i> Tourist Helpline (India): <strong>1363</strong></div>
                <div><i className="fas fa-phone" style={{ color: 'var(--success)' }}></i> Emergency SOS Services: <strong>112</strong></div>
                <div><i className="fas fa-hospital" style={{ color: 'var(--success)' }}></i> 24/7 Medical & Ambulance Dispatch: <strong>108</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary-navy), #1e293b)', borderRadius: 'var(--radius-xl)', padding: '4rem 2rem', textAlign: 'center', color: '#ffffff', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <span className="badge badge-coral">Start Your Journey Today</span>
            <h2 style={{ fontSize: '2.8rem', color: '#ffffff' }}>Ready for your next unforgettable adventure?</h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Join thousands of smart globetrotters who plan their dream getaways in minutes with Travel Buddy.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/plan-trip" className="btn btn-accent btn-lg">
                <i className="fas fa-paper-plane"></i> Plan My Trip Now
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
