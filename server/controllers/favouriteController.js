import Favourite from '../models/Favourite.js';
import Destination from '../models/Destination.js';

// @desc    Get user's favourite destinations
// @route   GET /api/favourites
// @access  Private
export const getFavourites = async (req, res, next) => {
  try {
    const favourites = await Favourite.find({ user: req.user._id })
      .populate('destination')
      .sort({ createdAt: -1 });

    const destinations = favourites
      .filter(f => f.destination != null)
      .map(f => f.destination);

    res.json({
      success: true,
      count: destinations.length,
      favourites: destinations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle favourite destination
// @route   POST /api/favourites/toggle
// @access  Private
export const toggleFavourite = async (req, res, next) => {
  try {
    const { destinationId } = req.body;

    if (!destinationId) {
      return res.status(400).json({ success: false, message: 'destinationId is required' });
    }

    const existing = await Favourite.findOne({
      user: req.user._id,
      destination: destinationId
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({
        success: true,
        isFavourite: false,
        message: 'Removed from favourites'
      });
    } else {
      await Favourite.create({
        user: req.user._id,
        destination: destinationId
      });
      return res.json({
        success: true,
        isFavourite: true,
        message: 'Saved to favourites'
      });
    }
  } catch (error) {
    next(error);
  }
};
