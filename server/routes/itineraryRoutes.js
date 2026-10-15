import express from 'express';
import {
  getItineraryByTrip,
  updateItinerary,
  addActivity,
  updateActivity,
  toggleActivityComplete,
  deleteActivity
} from '../controllers/itineraryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All itinerary routes are protected

router.get('/trip/:tripId', getItineraryByTrip);
router.put('/:id', updateItinerary);
router.post('/:id/activities', addActivity);
router.put('/:id/activities/:actId', updateActivity);
router.put('/:id/activities/:actId/toggle', toggleActivityComplete);
router.delete('/:id/activities/:actId', deleteActivity);

export default router;
