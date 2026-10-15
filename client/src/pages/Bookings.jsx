import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // New Booking form state
  const [form, setForm] = useState({
    type: 'hotel',
    title: '',
    destination: '',
    price: '',
    checkIn: '',
    checkOut: '',
    date: '',
    time: '',
    roomType: 'Deluxe Room',
    guests: '2 Adults'
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getAll(activeTab);
      if (res.success) {
        setBookings(res.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      showToast('Could not load bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!form.title || !form.destination || !form.price) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      const res = await bookingService.create({
        ...form,
        price: Number(form.price)
      });
      if (res.success) {
        setIsModalOpen(false);
        setForm({
          type: 'hotel',
          title: '',
          destination: '',
          price: '',
          checkIn: '',
          checkOut: '',
          date: '',
          time: '',
          roomType: 'Deluxe Room',
          guests: '2 Adults'
        });
        showToast('Booking reserved successfully!', 'success');
        fetchBookings();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create booking', 'error');
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await bookingService.cancel(id);
      if (res.success) {
        showToast('Booking cancelled', 'info');
        fetchBookings();
      }
    } catch (err) {
      showToast('Failed to cancel booking', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this record permanently?')) return;

    try {
      const res = await bookingService.delete(id);
      if (res.success) {
        showToast('Record deleted', 'info');
        fetchBookings();
      }
    } catch (err) {
      showToast('Failed to delete booking', 'error');
    }
  };

  // Stats calculation
  const totalSpent = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (b.price || 0) : sum, 0);
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotel': return 'fas fa-hotel';
      case 'transport': return 'fas fa-plane-departure';
      case 'activity': return 'fas fa-hiking';
      default: return 'fas fa-ticket-alt';
    }
  };

  return (
    <div className="section bookings-page">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              <i className="fas fa-suitcase-rolling"></i> Reservations
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Manage Bookings</h1>
            <p className="text-muted">Keep track of all your confirmed hotels, transit tickets, and activities</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <i className="fas fa-plus"></i> New Reservation
          </button>
        </div>

        {/* Metric Cards */}
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">{bookings.length}</span>
            </div>
            <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Confirmed Active</span>
              <span className="stat-value">{confirmedCount}</span>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Amount</span>
              <span className="stat-value">₹{totalSpent.toLocaleString('en-IN')}</span>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <i className="fas fa-wallet"></i>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          {['all', 'hotel', 'transport', 'activity'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize', borderRadius: '20px', padding: '0.4rem 1.25rem' }}
            >
              {tab === 'all' ? 'All Bookings' : tab + 's'}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center" style={{ padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin fa-2x text-primary" style={{ marginBottom: '1rem' }}></i>
            <p>Loading your reservations...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <i className="fas fa-ticket-alt fa-3x text-muted" style={{ marginBottom: '1rem' }}></i>
            <h3>No reservations found</h3>
            <p className="text-muted" style={{ margin: '0.5rem 0 1.5rem' }}>
              {activeTab === 'all'
                ? 'You do not have any bookings saved in your account yet.'
                : `No ${activeTab} reservations found.`}
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ margin: '0 auto' }}>
              <i className="fas fa-plus"></i> Add a Reservation
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  borderLeft: `5px solid ${
                    booking.status === 'Confirmed' ? '#10b981' : booking.status === 'Cancelled' ? '#ef4444' : '#3b82f6'
                  }`
                }}
              >
                {/* Left Info */}
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '12px',
                      background: 'rgba(14, 165, 233, 0.1)',
                      color: 'var(--primary-color)',
                      display: 'grid',
                      placeContent: 'center',
                      fontSize: '1.4rem'
                    }}
                  >
                    <i className={getTypeIcon(booking.type)}></i>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{booking.title}</h3>
                      <span
                        className={`badge ${
                          booking.status === 'Confirmed' ? 'badge-success' : booking.status === 'Cancelled' ? 'badge-danger' : 'badge-info'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span><i className="fas fa-map-marker-alt"></i> {booking.destination}</span>
                      <span><i className="fas fa-barcode"></i> Code: {booking.confirmationCode}</span>
                      {booking.checkIn && <span><i className="far fa-calendar"></i> In: {booking.checkIn}</span>}
                      {booking.checkOut && <span><i className="far fa-calendar-check"></i> Out: {booking.checkOut}</span>}
                      {booking.date && <span><i className="far fa-calendar"></i> {booking.date} {booking.time || ''}</span>}
                      {booking.roomType && <span><i className="fas fa-bed"></i> {booking.roomType}</span>}
                    </div>
                  </div>
                </div>

                {/* Right Price & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                      ₹{booking.price?.toLocaleString('en-IN')}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Cost</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {booking.status === 'Confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-outline btn-sm"
                        title="Cancel reservation"
                        style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <i className="fas fa-ban"></i> Cancel
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="btn btn-outline btn-sm"
                      title="Delete record"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Reservation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Reservation"
      >
        <form onSubmit={handleCreateBooking}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Service Type</label>
            <select
              className="form-control"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="hotel">Hotel / Stay</option>
              <option value="transport">Flight / Train / Transit</option>
              <option value="activity">Guided Tour / Activity</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Booking Title / Vendor</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Grand Himalayan Resort & Spa"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Destination City</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Manali"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 7500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                min="0"
              />
            </div>
          </div>

          {form.type === 'hotel' && (
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Check-in Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                />
              </div>
            </div>
          )}

          {form.type !== 'hotel' && (
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Departure / Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 06:45 AM"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-check-circle"></i> Confirm Booking
            </button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Bookings;
