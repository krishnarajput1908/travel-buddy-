import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const fillDemo = () => {
    setEmail('alex@travelbuddy.com');
    setPassword('password123');
    showToast('Demo credentials filled!', 'success', 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast(`Welcome back, ${res.user.name}! 👋`, 'success');
        navigate(from, { replace: true });
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try again.', 'error');
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
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Scenic Travel"
            className="auth-sidebar-bg"
          />

          <div className="auth-sidebar-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-icon" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <i className="fas fa-compass"></i>
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.25rem' }}>Travel Buddy</span>
            </div>

            <div>
              <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.75rem' }}>Welcome Back, Explorer.</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
                Sign in to manage your saved destinations, customized day-by-day itineraries, flight/hotel bookings, and live budget tracking.
              </p>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, fontSize: '0.85rem', color: '#94a3b8' }}>
            “The world is a book and those who do not travel read only one page.” — Augustine
          </div>
        </div>

        {/* Form Container */}
        <div className="auth-form-container">
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Sign In</h2>
            <p style={{ fontSize: '0.95rem' }}>Enter your credentials or use the demo login to get started.</p>
          </div>

          {/* Quick Demo Helper */}
          <div className="demo-account-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>
                <i className="fas fa-key"></i> Quick Demo Account
              </span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                onClick={fillDemo}
              >
                Auto-Fill Credentials
              </button>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Email: <code>alex@travelbuddy.com</code> | Password: <code>password123</code>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="login-password">Password</label>
                <button
                  type="button"
                  onClick={() => alert('For demo accounts, use password: password123')}
                  style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                id="login-password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i> Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-right-to-bracket"></i> Log In to Travel Buddy
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
