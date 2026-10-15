import React from 'react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination, isFavourite, onToggleFavourite }) => {
  const formatCurrency = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN');
  };

  const getBadgeClass = (budgetCategory) => {
    if (budgetCategory === 'Budget') return 'badge-success';
    if (budgetCategory === 'Moderate') return 'badge-blue';
    return 'badge-coral';
  };

  return (
    <div className="destination-card">
      <div className="card-img-container">
        <img src={destination.image} alt={destination.name} loading="lazy" />
        <span className="card-badge-country">
          <i className="fas fa-location-dot"></i> {destination.country}
        </span>
        <button
          className={`fav-btn ${isFavourite ? 'active' : ''}`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => onToggleFavourite && onToggleFavourite(destination._id)}
        >
          <i className={`${isFavourite ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="rating-pill">
            <i className="fas fa-star"></i> {destination.rating?.toFixed(1) || '4.8'}
            <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '0.8rem', marginLeft: '4px' }}>
              ({destination.reviewsCount || 100})
            </span>
          </span>
          <span className={`badge ${getBadgeClass(destination.budgetCategory)}`}>
            {destination.budgetCategory}
          </span>
        </div>

        <h3 className="card-title">{destination.name}</h3>
        <p className="card-desc">{destination.shortDesc}</p>

        <div className="card-details-row">
          <div>
            <i className="far fa-calendar-alt"></i> {destination.bestTime?.split('(')[0] || 'Seasonal'}
          </div>
          <div className="price-tag">
            {formatCurrency(destination.estimatedBudget)}
          </div>
        </div>

        <div className="card-actions">
          <Link to={`/destinations/${destination._id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          <Link
            to={`/plan-trip?destination=${encodeURIComponent(destination.name)}`}
            className="btn btn-primary btn-sm"
          >
            Plan Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
