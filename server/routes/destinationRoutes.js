import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination
} from '../controllers/destinationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.post('/', protect, createDestination);

export default router;
