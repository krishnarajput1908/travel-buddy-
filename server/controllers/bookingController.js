import Booking from '../models/Booking.js';

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const { type } = req.query;
    let query = { user: req.user._id };

    if (type && type !== 'all') {
      query.type = type;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (booking) {
      res.json({ success: true, booking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = 'Cancelled';
    const updated = await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully', booking: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    await booking.deleteOne();
    res.json({ success: true, message: 'Booking removed successfully' });
  } catch (error) {
    next(error);
  }
};
