import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itineraryService } from '../services/itineraryService';
import { tripService } from '../services/tripService';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const ItineraryPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [toast, setToast] = useState(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityForm, setActivityForm] = useState({
    time: '09:00 AM',
    title: '',
    location: '',
    cost: 0
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchTripAndItinerary();
  }, [tripId]);

  const fetchTripAndItinerary = async () => {
    setLoading(true);
    try {
      if (tripId) {
        const [tripRes, itinRes] = await Promise.all([
          tripService.getById(tripId),
          itineraryService.getByTripId(tripId)
        ]);
        if (tripRes.success) setTrip(tripRes.trip);
        if (itinRes.success) setItinerary(itinRes.itinerary);
      } else {
        // If no tripId in URL, fetch user trips and take the latest
        const tripsRes = await tripService.getAll();
        if (tripsRes.success && tripsRes.trips.length > 0) {
          const firstTrip = tripsRes.trips[0];
          setTrip(firstTrip);
          const itinRes = await itineraryService.getByTripId(firstTrip._id);
          if (itinRes.success) setItinerary(itinRes.itinerary);
        }
      }
    } catch (err) {
      console.error('Error fetching itinerary:', err);
      showToast('Could not load itinerary data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Toggle activity complete
  const handleToggleComplete = async (actId) => {
    if (!itinerary) return;
    try {
      const res = await itineraryService.toggleComplete(itinerary._id, actId);
      if (res.success) {
        setItinerary(res.itinerary);
        showToast('Activity status updated', 'success');
      }
    } catch (err) {
      showToast('Failed to update activity', 'error');
    }
  };

  // Open add activity modal
  const handleOpenAdd = () => {
    setActivityForm({
      time: '10:00 AM',
      title: '',
      location: '',
      cost: 0
    });
    setIsAddModalOpen(true);
  };

  // Submit add activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activityForm.title || !activityForm.time) {
      showToast('Please provide a title and time', 'error');
      return;
    }

    try {
      const res = await itineraryService.addActivity(itinerary._id, {
        dayIndex: activeDayIndex,
        ...activityForm
      });
      if (res.success) {
        setItinerary(res.itinerary);
        setIsAddModalOpen(false);
        showToast('Activity added successfully!', 'success');
      }
    } catch (err) {
      showToast('Failed to add activity', 'error');
    }
  };

  // Open edit activity modal
  const handleOpenEdit = (act) => {
    setSelectedActivity(act);
    setActivityForm({
      time: act.time || '',
      title: act.title || '',
      location: act.location || '',
      cost: act.cost || 0
    });
    setIsEditModalOpen(true);
  };

  // Submit edit activity
  const handleUpdateActivity = async (e) => {
    e.preventDefault();
    if (!selectedActivity) return;

    try {
      const actId = selectedActivity.id || selectedActivity._id;
      const res = await itineraryService.updateActivity(itinerary._id, actId, activityForm);
      if (res.success) {
        setItinerary(res.itinerary);
        setIsEditModalOpen(false);
        showToast('Activity updated successfully', 'success');
      }
    } catch (err) {
      showToast('Failed to update activity', 'error');
    }
  };

  // Delete activity
  const handleDeleteActivity = async (actId) => {
    if (!window.confirm('Are you sure you want to remove this activity?')) return;

    try {
      const res = await itineraryService.deleteActivity(itinerary._id, actId);
      if (res.success) {
        setItinerary(res.itinerary);
        showToast('Activity deleted', 'info');
      }
    } catch (err) {
      showToast('Failed to delete activity', 'error');
    }
  };

  // Add new day to itinerary
  const handleAddDay = async () => {
    if (!itinerary) return;
    const nextDayNum = (itinerary.days?.length || 0) + 1;
    const newDays = [
      ...(itinerary.days || []),
      {
        dayNumber: nextDayNum,
        title: `Day ${nextDayNum}: Exploration`,
        activities: [
          {
            id: 'act_' + Date.now() + '_1',
            time: '10:00 AM',
            title: 'Morning Sightseeing',
            location: 'Local Landmark',
            cost: 200,
            completed: false
          }
        ]
      }
    ];

    try {
      const res = await itineraryService.update(itinerary._id, { days: newDays });
      if (res.success) {
        setItinerary(res.itinerary);
        setActiveDayIndex(newDays.length - 1);
        showToast(`Day ${nextDayNum} added to your plan!`, 'success');
      }
    } catch (err) {
      showToast('Failed to add day', 'error');
    }
  };

  if (loading) {
    return (
      <div className="section container text-center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
        <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
        <p>Loading your itinerary...</p>
      </div>
    );
  }

  if (!trip && !itinerary) {
    return (
      <div className="section container text-center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
        <i className="fas fa-map-marked-alt fa-3x" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}></i>
        <h2>No Itinerary Found</h2>
        <p className="text-muted" style={{ margin: '1rem 0 1.5rem' }}>
          You don't have an active trip planned yet. Create your first dream vacation now!
        </p>
        <Link to="/plan-trip" className="btn btn-primary">
          <i className="fas fa-plus"></i> Plan a New Trip
        </Link>
      </div>
    );
  }

  const days = itinerary?.days || [];
  const currentDay = days[activeDayIndex] || days[0];

  // Calculate completion stats
  let totalActivities = 0;
  let completedActivities = 0;
  days.forEach(day => {
    (day.activities || []).forEach(act => {
      totalActivities++;
      if (act.completed) completedActivities++;
    });
  });
  const percentComplete = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  return (
    <div className="section itinerary-page">
      <div className="container">
        {/* Top Header Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">
                  <i className="fas fa-calendar-check"></i> Day-by-Day Schedule
                </span>
                {trip && (
                  <span className={`badge ${trip.status === 'completed' ? 'badge-info' : 'badge-success'}`}>
                    {trip.status.toUpperCase()}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
                {trip ? trip.title : itinerary.destinationName} Itinerary
              </h1>
              <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <span><i className="fas fa-map-marker-alt text-primary"></i> {trip ? trip.destinationName : itinerary.destinationName}</span>
                {trip && (
                  <>
                    <span><i className="fas fa-calendar-day"></i> {trip.durationDays} Days</span>
                    <span><i className="fas fa-wallet"></i> ₹{trip.estimatedBudget?.total?.toLocaleString('en-IN') || 'N/A'} Budget</span>
                  </>
                )}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} className="btn btn-outline">
                <i className="fas fa-print"></i> Print / Export
              </button>
              <Link to="/plan-trip" className="btn btn-primary">
                <i className="fas fa-plus"></i> New Trip
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>Trip Progress</span>
              <span className="text-primary">{completedActivities} of {totalActivities} Completed ({percentComplete}%)</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${percentComplete}%`,
                  height: '100%',
                  background: 'var(--primary-color)',
                  transition: 'width 0.4s ease'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`btn ${activeDayIndex === idx ? 'btn-primary' : 'btn-outline'}`}
              style={{ whiteSpace: 'nowrap', borderRadius: '12px' }}
            >
              <i className="fas fa-calendar-day"></i> Day {day.dayNumber || idx + 1}
            </button>
          ))}
          <button onClick={handleAddDay} className="btn btn-secondary" style={{ whiteSpace: 'nowrap', borderRadius: '12px' }}>
            <i className="fas fa-plus"></i> Add Day
          </button>
        </div>

        {/* Selected Day Activities Timeline */}
        {currentDay && (
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{currentDay.title}</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {(currentDay.activities || []).length} scheduled activities
                </p>
              </div>
              <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
                <i className="fas fa-plus"></i> Add Activity
              </button>
            </div>

            {(!currentDay.activities || currentDay.activities.length === 0) ? (
              <div className="text-center" style={{ padding: '3rem 1rem' }}>
                <i className="fas fa-clipboard-list fa-3x text-muted" style={{ marginBottom: '1rem' }}></i>
                <h4>No activities scheduled for this day</h4>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>Add sightseeing, dining, or travel stops to keep organized.</p>
                <button onClick={handleOpenAdd} className="btn btn-primary">
                  <i className="fas fa-plus"></i> Add Activity
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentDay.activities.map((act) => {
                  const actId = act.id || act._id;
                  return (
                    <div
                      key={actId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: act.completed ? 'var(--bg-secondary)' : 'var(--card-bg)',
                        opacity: act.completed ? 0.75 : 1,
                        transition: 'all 0.2s ease',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      {/* Checkbox and Info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                        <input
                          type="checkbox"
                          checked={act.completed}
                          onChange={() => handleToggleComplete(actId)}
                          style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            accentColor: 'var(--primary-color)'
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                              <i className="far fa-clock"></i> {act.time}
                            </span>
                            <h4
                              style={{
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                textDecoration: act.completed ? 'line-through' : 'none'
                              }}
                            >
                              {act.title}
                            </h4>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span><i className="fas fa-map-pin"></i> {act.location}</span>
                            {act.cost > 0 && <span><i className="fas fa-tag"></i> ₹{act.cost}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenEdit(act)}
                          className="btn btn-outline btn-sm"
                          title="Edit activity"
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(actId)}
                          className="btn btn-outline btn-sm"
                          title="Delete activity"
                          style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Activity to Day Schedule"
      >
        <form onSubmit={handleAddActivity}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 09:30 AM"
              value={activityForm.time}
              onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Activity Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Visit Hadimba Temple & Old Town"
              value={activityForm.title}
              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Location / Venue</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Dhungri, Manali"
              value={activityForm.location}
              onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Estimated Cost (₹)</label>
            <input
              type="number"
              className="form-control"
              value={activityForm.cost}
              onChange={(e) => setActivityForm({ ...activityForm, cost: Number(e.target.value) })}
              min="0"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i> Save Activity
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Activity Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Activity"
      >
        <form onSubmit={handleUpdateActivity}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Time</label>
            <input
              type="text"
              className="form-control"
              value={activityForm.time}
              onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Activity Title</label>
            <input
              type="text"
              className="form-control"
              value={activityForm.title}
              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Location / Venue</label>
            <input
              type="text"
              className="form-control"
              value={activityForm.location}
              onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Estimated Cost (₹)</label>
            <input
              type="number"
              className="form-control"
              value={activityForm.cost}
              onChange={(e) => setActivityForm({ ...activityForm, cost: Number(e.target.value) })}
              min="0"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-check"></i> Update Activity
            </button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ItineraryPage;
