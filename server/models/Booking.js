import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['hotel', 'transport', 'activity'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    checkIn: String,
    checkOut: String,
    date: String,
    time: String,
    guests: String,
    passengers: String,
    participants: String,
    roomType: String,
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Completed'],
      default: 'Confirmed'
    },
    confirmationCode: {
      type: String,
      default: () => 'TB-' + Math.random().toString(36).substr(2, 6).toUpperCase()
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
