import express from 'express';
import {
  getFavourites,
  toggleFavourite
} from '../controllers/favouriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All favourite routes are protected

router.get('/', getFavourites);
router.post('/toggle', toggleFavourite);

export default router;
