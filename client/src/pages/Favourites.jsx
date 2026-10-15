import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favouriteService } from '../services/favouriteService';
import DestinationCard from '../components/DestinationCard';
import Toast from '../components/Toast';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const res = await favouriteService.getAll();
      if (res.success) {
        // Only keep items where destination is populated
        const validList = res.favourites
          .map(fav => fav.destination)
          .filter(dest => dest && dest._id);
        setFavourites(validList);
      }
    } catch (err) {
      console.error('Error fetching favourites:', err);
      showToast('Could not load saved destinations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavourite = async (destinationId) => {
    try {
      const res = await favouriteService.toggle(destinationId);
      if (res.success) {
        setFavourites(prev => prev.filter(d => d._id !== destinationId));
        showToast('Removed from favourites', 'info');
      }
    } catch (err) {
      showToast('Failed to update favourite', 'error');
    }
  };

  const filteredFavourites = favourites.filter(d =>
    d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.travelType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="section favourites-page">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>
              <i className="fas fa-heart"></i> Wishlist
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Favourite Destinations</h1>
            <p className="text-muted">Places you love and want to visit in the near future</p>
          </div>
          <Link to="/destinations" className="btn btn-primary">
            <i className="fas fa-compass"></i> Explore More Places
          </Link>
        </div>

        {/* Search and Counts bar */}
        {favourites.length > 0 && (
          <div
            className="card"
            style={{
              padding: '1rem 1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              <span className="text-primary">{filteredFavourites.length}</span> destinations saved
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search your wishlist..."
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
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center" style={{ padding: '4rem 1rem' }}>
            <i className="fas fa-spinner fa-spin fa-3x text-primary" style={{ marginBottom: '1rem' }}></i>
            <p>Loading your saved wishlist...</p>
          </div>
        ) : filteredFavourites.length === 0 ? (
          <div className="card text-center" style={{ padding: '4rem 2rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.1)',
                color: '#f43f5e',
                display: 'grid',
                placeContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.5rem'
              }}
            >
              <i className="fas fa-heart-broken"></i>
            </div>
            <h3>{favourites.length === 0 ? 'Your wishlist is currently empty' : 'No destinations match your search'}</h3>
            <p className="text-muted" style={{ margin: '0.5rem 0 1.5rem' }}>
              {favourites.length === 0
                ? 'Save your dream spots by clicking the heart icon on any destination card!'
                : 'Try adjusting your search keywords.'}
            </p>
            <Link to="/destinations" className="btn btn-primary" style={{ margin: '0 auto' }}>
              <i className="fas fa-compass"></i> Discover Destinations
            </Link>
          </div>
        ) : (
          <div className="destinations-grid">
            {filteredFavourites.map(dest => (
              <DestinationCard
                key={dest._id}
                destination={dest}
                isFavourite={true}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Favourites;
