import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await register(name.trim(), email.trim(), password);
      if (res.success) {
        showToast(`Welcome to Travel Buddy, ${res.user.name}! 🎉`, 'success');
        navigate('/dashboard');
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Sidebar */}
        <div className="auth-sidebar">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Mountain Odyssey"
            className="auth-sidebar-bg"
          />

          <div className="auth-sidebar-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-icon" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <i className="fas fa-mountain-sun"></i>
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.25rem' }}>Travel Buddy</span>
            </div>

            <div>
              <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.75rem' }}>Begin Your Adventure.</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
                Join our community of over 35,000 travelers. Unlock intelligent budget forecasting, custom multi-day itineraries, and instant booking organization.
              </p>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, fontSize: '0.85rem', color: '#94a3b8' }}>
            ✓ Real-time MongoDB persistence &nbsp;•&nbsp; ✓ JWT secured &nbsp;•&nbsp; ✓ Zero spam
          </div>
        </div>

        {/* Form Container */}
        <div className="auth-form-container">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Create Account</h2>
            <p style={{ fontSize: '0.95rem' }}>It only takes 30 seconds to start planning smarter trips.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input
                type="text"
                id="reg-name"
                className="form-control"
                placeholder="e.g. Jordan Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <input
                type="email"
                id="reg-email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input
                type="password"
                id="reg-password"
                className="form-control"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <input
                type="password"
                id="reg-confirm"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '1.25rem' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i> Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i> Create My Account
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
