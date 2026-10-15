import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate favourites for the same user and destination
favouriteSchema.index({ user: 1, destination: 1 }, { unique: true });

const Favourite = mongoose.model('Favourite', favouriteSchema);
export default Favourite;
