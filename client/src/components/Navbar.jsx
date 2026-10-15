import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { showToast } from './Toast';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of Travel Buddy?')) {
      logout();
      showToast('Logged out successfully', 'info');
      navigate('/');
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand" onClick={closeMobile}>
            <div className="brand-icon">
              <i className="fas fa-plane"></i>
            </div>
            <span>Travel Buddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/destinations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Destinations
            </NavLink>
            <NavLink to="/plan-trip" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Plan Trip
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Dashboard
                </NavLink>
                <NavLink to="/trips" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  My Trips
                </NavLink>
                <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Bookings
                </NavLink>
                <NavLink to="/favourites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Favourites
                </NavLink>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Link to="/profile" className="user-menu-btn" title="View Profile">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user?.name || 'User'}
                    className="user-avatar-sm"
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {user?.name?.split(' ')[0] || 'Explorer'}
                  </span>
                </Link>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <i className="fas fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={closeMobile}>
          Home
        </NavLink>
        <NavLink to="/destinations" className="nav-link" onClick={closeMobile}>
          Destinations
        </NavLink>
        <NavLink to="/plan-trip" className="nav-link" onClick={closeMobile}>
          Plan Trip
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className="nav-link" onClick={closeMobile}>
              Dashboard
            </NavLink>
            <NavLink to="/trips" className="nav-link" onClick={closeMobile}>
              My Trips
            </NavLink>
            <NavLink to="/bookings" className="nav-link" onClick={closeMobile}>
              Bookings
            </NavLink>
            <NavLink to="/favourites" className="nav-link" onClick={closeMobile}>
              Favourites
            </NavLink>
            <NavLink to="/profile" className="nav-link" onClick={closeMobile}>
              Profile
            </NavLink>
            <NavLink to="/settings" className="nav-link" onClick={closeMobile}>
              Settings
            </NavLink>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderTop: '1px solid var(--border-light)', marginTop: '0.5rem' }}>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                alt=""
                className="user-avatar-sm"
              />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.email}</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => { closeMobile(); handleLogout(); }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMobile}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
