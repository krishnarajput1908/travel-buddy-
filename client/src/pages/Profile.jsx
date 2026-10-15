import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { tripService } from '../services/tripService';
import { bookingService } from '../services/bookingService';
import { favouriteService } from '../services/favouriteService';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [stats, setStats] = useState({
    tripsCount: 0,
    bookingsCount: 0,
    favCount: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    avatar: ''
  });

  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }

    const loadStats = async () => {
      try {
        const [tripsRes, bookingsRes, favsRes] = await Promise.all([
          tripService.getAll(),
          bookingService.getAll(),
          favouriteService.getAll()
        ]);
        setStats({
          tripsCount: tripsRes.success ? tripsRes.trips.length : 0,
          bookingsCount: bookingsRes.success ? bookingsRes.bookings.length : 0,
          favCount: favsRes.success ? favsRes.favourites.length : 0
        });
      } catch (err) {
        console.error('Error loading profile stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await authService.updateProfile(formData);
      if (res.success && res.user) {
        updateUser(res.user);
        setIsEditModalOpen(false);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '2026';

  return (
    <div className="section profile-page">
      <div className="container">
        {/* Profile Card Header */}
        <div
          className="card"
          style={{
            padding: '2.5rem',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
              opacity: 0.8
            }}
          ></div>

          <div
            style={{
              position: 'relative',
              paddingTop: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            {/* Avatar & User Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '4px solid var(--card-bg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  background: 'var(--card-bg)'
                }}
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user?.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{user?.name}</h1>
                <p className="text-muted" style={{ margin: '0.2rem 0 0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span><i className="far fa-envelope text-primary"></i> {user?.email}</span>
                  {user?.phone && <span><i className="fas fa-phone-alt"></i> {user.phone}</span>}
                </p>
                <span className="badge badge-primary">
                  <i className="fas fa-passport"></i> Explorer Level • Member since {memberSince}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button onClick={() => setIsEditModalOpen(true)} className="btn btn-outline">
              <i className="fas fa-user-edit"></i> Edit Profile
            </button>
          </div>

          {/* Bio statement */}
          <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              ABOUT ME
            </div>
            <p style={{ margin: 0, fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
              "{user?.bio || 'Ready to see the world one destination at a time.'}"
            </p>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Planned Trips</span>
              <span className="stat-value">{stats.tripsCount}</span>
            </div>
            <div className="stat-icon"><i className="fas fa-map-marked-alt"></i></div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Confirmed Bookings</span>
              <span className="stat-value">{stats.bookingsCount}</span>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <i className="fas fa-check-double"></i>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <span className="stat-label">Wishlist Places</span>
              <span className="stat-value">{stats.favCount}</span>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>

        {/* Travel Preferences Section */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            <i className="fas fa-sliders-h text-primary"></i> Travel Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Preferred Travel Style</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                <i className="fas fa-hiking"></i> {user?.preferences?.type || 'Adventure'}
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Budget Tier</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                <i className="fas fa-coins"></i> {user?.preferences?.budget || 'Standard'}
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Primary Transit Mode</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>
                <i className="fas fa-plane-departure"></i> {user?.preferences?.transport || 'Flight'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
      >
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Avatar Image URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Short Bio</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Share a little about your travel passions..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Profile;
