import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    destinationName: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    durationDays: {
      type: Number,
      default: 5
    },
    travellers: {
      type: Number,
      default: 1
    },
    travelType: {
      type: String,
      default: 'Solo'
    },
    transport: {
      type: String,
      default: 'Flight'
    },
    accommodation: {
      type: String,
      default: 'Standard'
    },
    budget: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Completed', 'Cancelled'],
      default: 'Upcoming'
    },
    breakdown: {
      transport: { type: Number, default: 0 },
      accommodation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      activities: { type: Number, default: 0 },
      misc: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
