import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  id: { type: String, default: () => 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4) },
  time: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
});

const daySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  activities: [activitySchema]
});

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    destinationName: {
      type: String,
      required: true
    },
    days: [daySchema]
  },
  {
    timestamps: true
  }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
