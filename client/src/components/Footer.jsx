import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-brand">
              <div className="brand-icon">
                <i className="fas fa-plane"></i>
              </div>
              <span>Travel Buddy</span>
            </Link>
            <p className="footer-tagline">
              Making every journey easier, smarter, and more memorable. Discover places, craft itineraries, and track budgets seamlessly.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Explore</h4>
            <div className="footer-links-list">
              <Link to="/destinations">All Destinations</Link>
              <Link to="/destinations?type=Adventure">Adventure Spots</Link>
              <Link to="/destinations?type=Beach">Beach Getaways</Link>
              <Link to="/destinations?type=Heritage">Heritage & Culture</Link>
              <Link to="/destinations?budget=Budget">Budget Trips</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Platform</h4>
            <div className="footer-links-list">
              <Link to="/plan-trip">Plan a Trip</Link>
              <Link to="/dashboard">Travel Dashboard</Link>
              <Link to="/trips">My Trips</Link>
              <Link to="/bookings">Manage Bookings</Link>
              <Link to="/favourites">Saved Places</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Account & Legal</h4>
            <div className="footer-links-list">
              <Link to="/profile">My Profile</Link>
              <Link to="/settings">Account Settings</Link>
              <Link to="/settings">Privacy Policy</Link>
              <Link to="/settings">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 Travel Buddy. All Rights Reserved. Built with <i className="fas fa-heart" style={{ color: '#ef4444' }}></i> for curious globetrotters.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/settings">Privacy</Link>
            <Link to="/settings">Terms</Link>
            <Link to="/settings">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
