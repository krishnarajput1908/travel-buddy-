import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="section container text-center"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, var(--primary-color), var(--coral-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem'
        }}
      >
        404
      </div>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Lost in Exploration?</h2>
      <p className="text-muted" style={{ maxWidth: '480px', marginBottom: '2rem', fontSize: '1.05rem' }}>
        We couldn't find the page you're searching for. It might have been moved, renamed, or temporarily unavailable.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home"></i> Back to Home
        </Link>
        <Link to="/destinations" className="btn btn-outline">
          <i className="fas fa-compass"></i> Discover Places
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
