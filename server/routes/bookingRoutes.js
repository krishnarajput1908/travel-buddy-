import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All booking routes are protected

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBookingById)
  .delete(deleteBooking);

router.put('/:id/cancel', cancelBooking);

export default router;
