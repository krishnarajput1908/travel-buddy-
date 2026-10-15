import Itinerary from '../models/Itinerary.js';
import Trip from '../models/Trip.js';

// @desc    Get itinerary by trip ID
// @route   GET /api/itineraries/trip/:tripId
// @access  Private
export const getItineraryByTrip = async (req, res, next) => {
  try {
    let itinerary = await Itinerary.findOne({ trip: req.params.tripId, user: req.user._id });

    // Fallback: If no itinerary exists yet, generate one for the trip
    if (!itinerary) {
      const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Trip not found' });
      }

      itinerary = await Itinerary.create({
        user: req.user._id,
        trip: trip._id,
        destinationName: trip.destinationName,
        days: [
          {
            dayNumber: 1,
            title: 'Day 1: Arrival & Local Exploration',
            activities: [
              { time: '10:00 AM', title: `Arrival in ${trip.destinationName}`, location: 'Terminal', cost: 500, completed: false },
              { time: '02:00 PM', title: 'Hotel Check-in & Relaxation', location: 'Hotel', cost: 0, completed: false }
            ]
          }
        ]
      });
    }

    res.json({ success: true, itinerary });
  } catch (error) {
    next(error);
  }
};

// @desc    Update full itinerary days
// @route   PUT /api/itineraries/:id
// @access  Private
export const updateItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });
    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    if (req.body.days) {
      itinerary.days = req.body.days;
    }

    const updated = await itinerary.save();
    res.json({ success: true, itinerary: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Add an activity to a specific day in itinerary
// @route   POST /api/itineraries/:id/activities
// @access  Private
export const addActivity = async (req, res, next) => {
  try {
    const { dayIndex, time, title, location, cost } = req.body;
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    const targetDay = itinerary.days[dayIndex !== undefined ? dayIndex : 0];
    if (!targetDay) {
      return res.status(400).json({ success: false, message: 'Invalid day selected' });
    }

    const newActivity = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      time: time || '10:00 AM',
      title: title || 'New Scheduled Stop',
      location: location || 'City Center',
      cost: Number(cost) || 0,
      completed: false
    };

    targetDay.activities.push(newActivity);
    await itinerary.save();

    res.status(201).json({ success: true, itinerary });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an activity in an itinerary
// @route   PUT /api/itineraries/:id/activities/:actId
// @access  Private
export const updateActivity = async (req, res, next) => {
  try {
    const { time, title, location, cost } = req.body;
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    let found = false;
    for (const day of itinerary.days) {
      const act = day.activities.find(a => a.id === req.params.actId || a._id?.toString() === req.params.actId);
      if (act) {
        if (time) act.time = time;
        if (title) act.title = title;
        if (location) act.location = location;
        if (cost !== undefined) act.cost = Number(cost);
        found = true;
        break;
      }
    }

    if (!found) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    await itinerary.save();
    res.json({ success: true, itinerary });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle activity completed state
// @route   PUT /api/itineraries/:id/activities/:actId/toggle
// @access  Private
export const toggleActivityComplete = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    let targetAct = null;
    for (const day of itinerary.days) {
      const act = day.activities.find(a => a.id === req.params.actId || a._id?.toString() === req.params.actId);
      if (act) {
        act.completed = !act.completed;
        targetAct = act;
        break;
      }
    }

    if (!targetAct) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    await itinerary.save();
    res.json({ success: true, activity: targetAct, itinerary });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an activity from itinerary
// @route   DELETE /api/itineraries/:id/activities/:actId
// @access  Private
export const deleteActivity = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }

    for (const day of itinerary.days) {
      const index = day.activities.findIndex(a => a.id === req.params.actId || a._id?.toString() === req.params.actId);
      if (index !== -1) {
        day.activities.splice(index, 1);
        break;
      }
    }

    await itinerary.save();
    res.json({ success: true, itinerary });
  } catch (error) {
    next(error);
  }
};
