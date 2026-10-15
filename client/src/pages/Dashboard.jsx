import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripService } from '../services/tripService';
import { destinationService } from '../services/destinationService';
import { favouriteService } from '../services/favouriteService';
import DestinationCard from '../components/DestinationCard';
import { showToast } from '../components/Toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [quickSearch, setQuickSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tripsRes, destsRes, favsRes] = await Promise.all([
          tripService.getAll(),
          destinationService.getAll(),
          favouriteService.getAll()
        ]);

        if (tripsRes.success) setTrips(tripsRes.trips);
        if (destsRes.success) setDestinations(destsRes.destinations.slice(0, 6));
        if (favsRes.success) setFavourites(favsRes.favourites.map((f) => f._id));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleToggleFavourite = async (destId) => {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  const formatCurrency = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN');
  };

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  let greetingPrefix = 'Good morning';
  if (hour >= 12 && hour < 17) greetingPrefix = 'Good afternoon';
  if (hour >= 17) greetingPrefix = 'Good evening';

  const upcomingTrips = trips.filter((t) => t.status === 'Upcoming');
  const completedTrips = trips.filter((t) => t.status === 'Completed');
  const nextUpcoming = upcomingTrips[0];

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      {/* Greeting & Search Header */}
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>{greetingPrefix}, {user?.name?.split(' ')[0] || 'Explorer'} 👋</h1>
          <p style={{ fontSize: '1.1rem' }}>Ready for your next adventure?</p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} style={{ minWidth: '320px', flexGrow: 0.3 }}>
          <div className="search-input-group">
            <i className="fas fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search your next destination…"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Travel Statistics Strip */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue">
            <i className="fas fa-route"></i>
          </div>
          <div>
            <div className="stat-value">{trips.length}</div>
            <div className="stat-label">Trips Planned</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-green">
            <i className="fas fa-map-location-dot"></i>
          </div>
          <div>
            <div className="stat-value">{completedTrips.length}</div>
            <div className="stat-label">Destinations Visited</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-coral">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <div className="stat-value text-coral-gradient">{upcomingTrips.length}</div>
            <div className="stat-label">Upcoming Trips</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-purple">
            <i className="fas fa-heart"></i>
          </div>
          <div>
            <div className="stat-value">{favourites.length}</div>
            <div className="stat-label">Saved Destinations</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-grid">
        <Link to="/plan-trip" className="quick-action-btn">
          <div className="action-icon icon-coral">
            <i className="fas fa-paper-plane"></i>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Plan a Trip</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Smart budgeting & schedule</div>
          </div>
        </Link>

        <Link to="/destinations" className="quick-action-btn">
          <div className="action-icon icon-blue">
            <i className="fas fa-earth-americas"></i>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Explore Places</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Discover top attractions</div>
          </div>
        </Link>

        <Link to="/trips" className="quick-action-btn">
          <div className="action-icon icon-purple">
            <i className="fas fa-suitcase"></i>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>My Trips</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upcoming & past routes</div>
          </div>
        </Link>

        <Link to="/bookings" className="quick-action-btn">
          <div className="action-icon icon-green">
            <i className="fas fa-ticket"></i>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Bookings</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hotels, transit & passes</div>
          </div>
        </Link>
      </div>

      {/* Upcoming Trip Card */}
      {nextUpcoming ? (
        <div className="upcoming-trip-card">
          <div className="upcoming-trip-info">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-coral"><i className="fas fa-plane-departure"></i> Next Upcoming Trip</span>
                <span className="badge badge-success"><i className="fas fa-circle-check"></i> {nextUpcoming.status}</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>{nextUpcoming.destinationName}</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                <i className="fas fa-calendar-alt"></i> {nextUpcoming.startDate} to {nextUpcoming.endDate} ({nextUpcoming.durationDays} Days)
              </p>
            </div>

            <div className="upcoming-trip-chips">
              <div className="trip-chip">
                <i className="fas fa-users"></i> {nextUpcoming.travellers} Travelers ({nextUpcoming.travelType})
              </div>
              <div className="trip-chip">
                <i className="fas fa-wallet"></i> Est. Budget: {formatCurrency(nextUpcoming.budget)}
              </div>
              <div className="trip-chip">
                <i className="fas fa-hotel"></i> {nextUpcoming.accommodation} Stay
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={`/itinerary/${nextUpcoming._id}`} className="btn btn-primary">
                <i className="fas fa-list-check"></i> View Smart Itinerary
              </Link>
              <Link to="/bookings" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                <i className="fas fa-ticket"></i> Manage Bookings
              </Link>
            </div>
          </div>

          <div className="upcoming-trip-img">
            <img src={nextUpcoming.image} alt={nextUpcoming.destinationName} />
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-surface)', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-strong)', textAlign: 'center', marginBottom: '3rem' }}>
          <i className="fas fa-paper-plane" style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}></i>
          <h3>No upcoming trips scheduled yet</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0.5rem auto 1.5rem' }}>
            Pick your dream destination and let Travel Buddy craft your budget and day-by-day plan in seconds.
          </p>
          <Link to="/plan-trip" className="btn btn-accent"><i className="fas fa-plus"></i> Plan a New Trip</Link>
        </div>
      )}

      {/* Recommended Destinations */}
      <section style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-blue">Recommended For You</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.3rem' }}>Handpicked Destinations</h2>
          </div>
          <Link to="/destinations" className="btn btn-outline btn-sm">
            Browse All <i className="fas fa-arrow-right"></i>
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
      </section>
    </main>
  );
};

export default Dashboard;
