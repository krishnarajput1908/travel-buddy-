import Trip from '../models/Trip.js';
import Itinerary from '../models/Itinerary.js';
import Destination from '../models/Destination.js';

// Helper to generate day-by-day itinerary template
const generateDefaultItinerary = (destinationName, durationDays = 4, attractions = []) => {
  const days = [];
  for (let i = 1; i <= durationDays; i++) {
    let activities = [];
    if (i === 1) {
      activities = [
        { time: '10:00 AM', title: `Arrival in ${destinationName} & Check-in`, location: 'Transit Hub / Hotel', cost: 800, completed: false },
        { time: '03:30 PM', title: 'Local Neighborhood Stroll & Orientation', location: `${destinationName} Old Quarter`, cost: 300, completed: false },
        { time: '07:30 PM', title: 'Welcome Dinner & Culinary Tasting', location: 'Local Restaurant', cost: 1200, completed: false }
      ];
    } else if (i === durationDays) {
      activities = [
        { time: '09:00 AM', title: 'Breakfast & Souvenir Shopping', location: 'Local Craft Bazaars', cost: 1500, completed: false },
        { time: '11:30 AM', title: 'Hotel Checkout & Departure Prep', location: 'Hotel Lobby', cost: 0, completed: false },
        { time: '04:00 PM', title: 'Departure & Return Journey Home', location: 'Transit Station / Airport', cost: 600, completed: false }
      ];
    } else {
      const att = attractions[(i - 2) % (attractions.length || 1)] || { name: 'Iconic Scenic Landmark' };
      activities = [
        { time: '08:30 AM', title: 'Energizing Morning Breakfast', location: 'Hotel Dining', cost: 350, completed: false },
        { time: '10:00 AM', title: `Guided Tour: ${att.name}`, location: att.name, cost: 750, completed: false },
        { time: '01:30 PM', title: 'Lunch at Scenic Terrace Cafe', location: 'Town Terrace', cost: 650, completed: false },
        { time: '03:45 PM', title: 'Recreational Adventure & Excursion', location: 'Activity Site', cost: 1800, completed: false },
        { time: '07:00 PM', title: 'Sunset Leisure Walk & Evening Tea', location: 'Scenic Viewpoint', cost: 250, completed: false }
      ];
    }

    days.push({
      dayNumber: i,
      title: `Day ${i}: ${i === 1 ? 'Arrival & Orientation' : i === durationDays ? 'Farewell & Departure' : 'Full Discovery & Adventure'}`,
      activities
    });
  }
  return days;
};

// @desc    Get all trips for current logged-in user
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: trips.length,
      trips
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (trip) {
      res.json({ success: true, trip });
    } else {
      res.status(404).json({ success: false, message: 'Trip not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new trip (and auto-generate itinerary)
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req, res, next) => {
  try {
    const {
      destinationId,
      destinationName,
      country,
      image,
      startDate,
      endDate,
      durationDays,
      travellers,
      travelType,
      transport,
      accommodation,
      budget,
      breakdown
    } = req.body;

    if (!destinationName || !startDate || !endDate || !budget) {
      return res.status(400).json({ success: false, message: 'Please provide all required trip fields' });
    }

    // Look up destination for imagery/attractions if available
    let destDoc = null;
    if (destinationId) {
      destDoc = await Destination.findById(destinationId);
    } else {
      destDoc = await Destination.findOne({ name: new RegExp(`^${destinationName}$`, 'i') });
    }

    const trip = await Trip.create({
      user: req.user._id,
      destination: destDoc ? destDoc._id : null,
      destinationName,
      country: country || (destDoc ? destDoc.country : ''),
      image: image || (destDoc ? destDoc.image : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'),
      startDate,
      endDate,
      durationDays: durationDays || 5,
      travellers: travellers || 1,
      travelType: travelType || 'Solo',
      transport: transport || 'Flight',
      accommodation: accommodation || 'Standard',
      budget,
      status: 'Upcoming',
      breakdown: breakdown || { transport: 0, accommodation: 0, food: 0, activities: 0, misc: 0 }
    });

    // Auto-create smart itinerary
    const attractions = destDoc ? destDoc.attractions : [];
    const days = generateDefaultItinerary(destinationName, trip.durationDays, attractions);

    const itinerary = await Itinerary.create({
      user: req.user._id,
      trip: trip._id,
      destinationName: trip.destinationName,
      days
    });

    res.status(201).json({
      success: true,
      trip,
      itineraryId: itinerary._id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip details or status
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    Object.assign(trip, req.body);
    const updatedTrip = await trip.save();

    res.json({ success: true, trip: updatedTrip });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip and cascade delete its itinerary
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // Delete associated itinerary
    await Itinerary.deleteMany({ trip: trip._id });
    await trip.deleteOne();

    res.json({ success: true, message: 'Trip and associated itinerary deleted successfully' });
  } catch (error) {
    next(error);
  }
};
