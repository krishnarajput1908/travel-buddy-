import Destination from '../models/Destination.js';

// @desc    Get all destinations with search, filter, and sorting
// @route   GET /api/destinations
// @access  Public
export const getDestinations = async (req, res, next) => {
  try {
    const { search, country, budget, type, minRating, sort } = req.query;
    let query = {};

    // 1. Keyword search (Name, State, Country, Short description)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { country: searchRegex },
        { state: searchRegex },
        { shortDesc: searchRegex }
      ];
    }

    // 2. Country filter
    if (country && country !== 'all') {
      query.country = new RegExp(`^${country}$`, 'i');
    }

    // 3. Budget category filter
    if (budget && budget !== 'all') {
      query.budgetCategory = budget;
    }

    // 4. Travel type filter
    if (type && type !== 'all') {
      query.travelType = type;
    }

    // 5. Minimum rating filter
    if (minRating && minRating !== 'all') {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Sorting
    let sortOptions = { reviewsCount: -1 }; // default: popular
    if (sort === 'price-low') {
      sortOptions = { estimatedBudget: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { estimatedBudget: -1 };
    } else if (sort === 'rating') {
      sortOptions = { rating: -1 };
    }

    const destinations = await Destination.find(query).sort(sortOptions);

    res.json({
      success: true,
      count: destinations.length,
      destinations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination by ID
// @route   GET /api/destinations/:id
// @access  Public
export const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (destination) {
      res.json({ success: true, destination });
    } else {
      res.status(404).json({ success: false, message: 'Destination not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a destination (Admin / seed)
// @route   POST /api/destinations
// @access  Private
export const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (error) {
    next(error);
  }
};
