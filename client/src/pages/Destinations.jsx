import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { favouriteService } from '../services/favouriteService';
import { useAuth } from '../context/AuthContext';
import DestinationCard from '../components/DestinationCard';
import { showToast } from '../components/Toast';

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [country, setCountry] = useState(searchParams.get('country') || 'all');
  const [budget, setBudget] = useState(searchParams.get('budget') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [minRating, setMinRating] = useState(searchParams.get('rating') || 'all');
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (country !== 'all') params.country = country;
      if (budget !== 'all') params.budget = budget;
      if (type !== 'all') params.type = type;
      if (minRating !== 'all') params.minRating = minRating;
      if (sort !== 'popular') params.sort = sort;

      const res = await destinationService.getAll(params);
      if (res.success) {
        setDestinations(res.destinations);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
      showToast('Failed to load destinations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavourites = async () => {
    if (isAuthenticated) {
      try {
        const res = await favouriteService.getAll();
        if (res.success) {
          setFavourites(res.favourites.map((f) => f._id));
        }
      } catch (err) {
        console.error('Error fetching favourites:', err);
      }
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchFavourites();
  }, [country, budget, type, minRating, sort, isAuthenticated]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  const handleToggleFavourite = async (destId) => {
    if (!isAuthenticated) {
      showToast('Please log in to save favourites ❤️', 'info');
      navigate('/login');
      return;
    }

    try {
      const res = await favouriteService.toggle(destId);
      if (res.success) {
        if (res.isFavourite) {
          setFavourites((prev) => [...prev, destId]);
          showToast('Added to favourites ❤️', 'success');
        } else {
          setFavourites((prev) => prev.filter((id) => id !== destId));
          showToast('Removed from favourites', 'info');
        }
      }
    } catch (err) {
      showToast('Failed to update favourite', 'error');
    }
  };

  const resetFilters = () => {
    setSearch('');
    setCountry('all');
    setBudget('all');
    setType('all');
    setMinRating('all');
    setSort('popular');
    setSearchParams({});
  };

  return (
    <>
      <header style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(237, 233, 254, 0.4))', padding: '3.5rem 0 2.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
            <i className="fas fa-compass"></i> Curated Catalog
          </span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>Discover Extraordinary Places</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Explore realistic travel hotspots with verified local advice, attraction highlights, travel cost forecasts, and instant trip planning.
          </p>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Filter Container */}
        <div className="filter-container">
          <form className="filter-main-search" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <i className="fas fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Where do you want to go? (e.g. Manali, Goa, Paris, Dubai…)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-filter"></i> Apply Filters
            </button>
          </form>

          <div className="filter-pills-row">
            <span className="filter-label"><i className="fas fa-sliders"></i> Filters:</span>

            <select className="filter-select" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="all">All Countries</option>
              <option value="India">India</option>
              <option value="France">France</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Switzerland">Switzerland</option>
            </select>

            <select className="filter-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="all">Any Budget Tier</option>
              <option value="Budget">Budget Tier</option>
              <option value="Moderate">Moderate Tier</option>
              <option value="Luxury">Luxury Tier</option>
            </select>

            <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">Any Travel Type</option>
              <option value="Adventure">Adventure</option>
              <option value="Beach">Beach</option>
              <option value="Heritage">Heritage</option>
              <option value="Nature">Nature & Mountain</option>
              <option value="Romantic">Romantic</option>
              <option value="City">City & Culture</option>
            </select>

            <select className="filter-select" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
              <option value="all">Any Rating</option>
              <option value="4.8">4.8 & Above</option>
              <option value="4.5">4.5 & Above</option>
            </select>

            <select className="filter-select" style={{ marginLeft: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Sort: Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', alignSelf: 'center' }}>Quick tags:</span>
            <button className={`filter-chip ${type === 'all' ? 'active' : ''}`} onClick={() => setType('all')}>All Places</button>
            <button className={`filter-chip ${type === 'Adventure' ? 'active' : ''}`} onClick={() => setType('Adventure')}>🏔️ Adventure</button>
            <button className={`filter-chip ${type === 'Beach' ? 'active' : ''}`} onClick={() => setType('Beach')}>🏖️ Beach & Island</button>
            <button className={`filter-chip ${type === 'Heritage' ? 'active' : ''}`} onClick={() => setType('Heritage')}>🏰 Royal Heritage</button>
            <button className={`filter-chip ${type === 'Romantic' ? 'active' : ''}`} onClick={() => setType('Romantic')}>❤️ Romantic</button>
            <button className={`filter-chip ${type === 'City' ? 'active' : ''}`} onClick={() => setType('City')}>🌆 Megacities</button>
          </div>
        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem' }}>
            Showing {destinations.length} Destination{destinations.length === 1 ? '' : 's'}
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
            <i className="fas fa-arrow-rotate-left"></i> Reset Filters
          </button>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-blue)' }}></i>
            <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>Loading destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-strong)' }}>
            <i className="fas fa-map-location-dot" style={{ fontSize: '3rem', color: 'var(--text-subtle)', marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No destinations found</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              We couldn't find any places matching your criteria. Try adjusting your search query or filters.
            </p>
            <button className="btn btn-primary btn-sm" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest._id}
                destination={dest}
                isFavourite={favourites.includes(dest._id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Destinations;
