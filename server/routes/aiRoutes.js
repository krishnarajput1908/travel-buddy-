import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateItinerary, getDestinationSuggestions, getBudgetAdvisory, chatWithBuddy } from '../controllers/aiController.js';

const router = express.Router();

router.use(protect);

router.post('/itinerary', generateItinerary);
router.post('/suggest-destinations', getDestinationSuggestions);
router.post('/budget-advisory', getBudgetAdvisory);
router.post('/chat', chatWithBuddy);

export default router;
