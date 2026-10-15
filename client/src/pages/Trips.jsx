import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import Toast from '../components/Toast';

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await tripService.getAll();
      if (res.success) {
        setTrips(res.trips);
      }
    } catch (err) {
      console.error('Error fetching trips:', err);
      showToast('Could not load trips', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this trip and its itinerary?')) return;

    try {
      const res = await tripService.delete(id);
      if (res.success) {
        showToast('Trip deleted successfully', 'info');
        setTrips(trips.filter(t => t._id !== id));
      }
    } catch (err) {
      showToast('Failed to delete trip', 'error');
    }
  };

  const handleDuplicateTrip = async (trip, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const duplicateData = {
        destinationName: trip.destinationName,
        country: trip.country,
        image: trip.image,
        startDate: trip.startDate,
        endDate: trip.endDate,
        durationDays: trip.durationDays,
        travellers: trip.travellers,
        travelType: trip.travelType,
        transport: trip.transport,
        accommodation: trip.accommodation,
        budget: trip.budget,
        breakdown: trip.breakdown,
        status: 'Upcoming'
      };

      const res = await tripService.create(duplicateData);
      if (res.success) {
        showToast(`Cloned trip to ${trip.destinationName}!`, 'success');
        fetchTrips();
      }
    } catch (err) {
      showToast('Failed to duplicate trip', 'error');
    }
  };

  const filteredTrips = trips.filter(trip => {
    const matchesFilter =
      activeFilter === 'all' ||
      trip.status?.toLowerCase() === activeFilter.toLowerCase();

    const matchesSearch =
      trip.destinationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.country?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="section trips-page">
      <div className="container">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              <i className="fas fa-route"></i> Travel Portfolio
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Saved Trips</h1>
            <p className="text-muted">Review, customize itineraries, and track progress on all your adventures</p>
          </div>
          <Link to="/plan-trip" className="btn btn-primary">
            <i className="fas fa-plus"></i> Plan a New Trip
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'upcoming', 'completed', 'cancelled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`btn btn-sm ${activeFilter === tab ? 'btn-primary' : 'btn-outline'}`}
                style={{ textTransform: 'capitalize', borderRadius: '20px', padding: '0.4rem 1.1rem' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', borderRadius: '20px' }}
            />
            <i
              className="fas fa-search text-muted"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            ></i>
          </div>
        </div>

        {/* Trips Grid */}
        {loading ? (
          <div className="text-center" style={{ padding: '4rem 1rem' }}>
            <i className="fas fa-spinner fa-spin fa-3x text-primary" style={{ marginBottom: '1rem' }}></i>
            <p>Loading your adventures...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="card text-center" style={{ padding: '4rem 2rem' }}>
            <i className="fas fa-compass fa-3x text-muted" style={{ marginBottom: '1rem' }}></i>
            <h3>No trips found</h3>
            <p className="text-muted" style={{ margin: '0.5rem 0 1.5rem' }}>
              {activeFilter !== 'all'
                ? `You don't have any trips marked as "${activeFilter}".`
                : 'You have not created any trips yet. Start planning your first getaway now!'}
            </p>
            <Link to="/plan-trip" className="btn btn-primary" style={{ margin: '0 auto' }}>
              <i className="fas fa-plus"></i> Plan Your First Trip
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredTrips.map(trip => {
              const isCompleted = trip.status === 'Completed';
              const isCancelled = trip.status === 'Cancelled';

              return (
                <div
                  key={trip._id}
                  className="card"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  {/* Image banner */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={trip.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.destinationName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: isCompleted ? '#60a5fa' : isCancelled ? '#f87171' : '#34d399'
                      }}
                    >
                      <i className={`fas fa-circle`} style={{ fontSize: '0.5rem', marginRight: '0.35rem' }}></i>
                      {trip.status || 'Upcoming'}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '1rem',
                        color: '#fff'
                      }}
                    >
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{trip.destinationName}</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                        <i className="fas fa-map-marker-alt"></i> {trip.country || 'Destination'}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Meta chips */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.8rem' }}>
                        <span className="badge badge-primary">
                          <i className="far fa-calendar-alt"></i> {trip.durationDays || 5} Days
                        </span>
                        <span className="badge badge-secondary">
                          <i className="fas fa-user-friends"></i> {trip.travellers || 1} {trip.travellers === 1 ? 'Person' : 'People'}
                        </span>
                        <span className="badge badge-info">
                          <i className="fas fa-suitcase"></i> {trip.travelType || 'Solo'}
                        </span>
                      </div>

                      {/* Dates */}
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        <i className="far fa-clock text-primary"></i> {trip.startDate} - {trip.endDate}
                      </div>

                      {/* Budget */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Budget:</span>
                        <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                          ₹{trip.budget?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Actions footer */}
                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <Link
                        to={`/itinerary/${trip._id}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <i className="fas fa-calendar-day"></i> View Schedule
                      </Link>

                      <button
                        onClick={(e) => handleDuplicateTrip(trip, e)}
                        className="btn btn-outline btn-sm"
                        title="Clone / Plan Again"
                      >
                        <i className="fas fa-copy"></i>
                      </button>

                      <button
                        onClick={(e) => handleDeleteTrip(trip._id, e)}
                        className="btn btn-outline btn-sm"
                        title="Delete Trip"
                        style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Trips;
