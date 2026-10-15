import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: true
    },
    gallery: [String],
    budgetCategory: {
      type: String,
      enum: ['Budget', 'Moderate', 'Luxury'],
      default: 'Moderate'
    },
    travelType: {
      type: String,
      enum: ['Adventure', 'Beach', 'Heritage', 'Nature', 'Romantic', 'City'],
      default: 'Adventure'
    },
    estimatedBudget: {
      type: Number,
      required: true
    },
    bestTime: {
      type: String,
      default: 'All Year Round'
    },
    duration: {
      type: String,
      default: '4 - 6 Days'
    },
    shortDesc: {
      type: String,
      required: true
    },
    fullDesc: {
      type: String,
      required: true
    },
    attractions: [
      {
        name: { type: String, required: true },
        desc: { type: String, required: true }
      }
    ],
    activities: [String],
    transport: {
      flight: String,
      train: String,
      road: String
    },
    accommodation: {
      budget: String,
      standard: String,
      premium: String
    },
    dailyExpenses: {
      hotel: Number,
      food: Number,
      transport: Number,
      activities: Number
    },
    travelTips: [String],
    weather: {
      temp: String,
      condition: String,
      humidity: String,
      season: String
    }
  },
  {
    timestamps: true
  }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
