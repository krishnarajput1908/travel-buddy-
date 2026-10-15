import mongoose from 'mongoose';
import Destination from '../models/Destination.js';
import User from '../models/User.js';
import Trip from '../models/Trip.js';
import Booking from '../models/Booking.js';
import Favourite from '../models/Favourite.js';
import Itinerary from '../models/Itinerary.js';
import { demoDestinations } from '../utils/seedData.js';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_buddy';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    
    // Auto-seed database if empty
    await autoSeedDatabase();

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn(`
========================================================================
[NOTE] If local MongoDB is not running, you can:
1. Start local MongoDB: mongod
2. Or set MONGO_URI in .env to a free MongoDB Atlas cluster:
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/travel_buddy
========================================================================
    `);
  }
};

async function autoSeedDatabase() {
  try {
    // 1. Seed Destinations
    const destCount = await Destination.countDocuments();
    if (destCount === 0) {
      console.log('Seeding 12 rich destinations into MongoDB...');
      await Destination.insertMany(demoDestinations);
      console.log('Destinations seeded successfully!');
    }

    // 2. Seed Demo User
    let demoUser = await User.findOne({ email: 'alex@travelbuddy.com' });
    if (!demoUser) {
      console.log('Creating demo user (alex@travelbuddy.com / password123)...');
      demoUser = await User.create({
        name: 'Alex Morgan',
        email: 'alex@travelbuddy.com',
        password: 'password123',
        phone: '+1 (555) 234-5678',
        bio: 'Passionate globetrotter & photography enthusiast. 14 countries and counting!',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        preferences: {
          type: 'Adventure',
          budget: 'Standard',
          transport: 'Flight',
          notifications: { reminders: true, updates: true, promos: false }
        }
      });
      console.log('Demo user created!');
    }

    // 3. Seed Demo Trips & Itinerary
    const tripCount = await Trip.countDocuments({ user: demoUser._id });
    if (tripCount === 0) {
      const manali = await Destination.findOne({ name: 'Manali' });
      const paris = await Destination.findOne({ name: 'Paris' });
      const goa = await Destination.findOne({ name: 'Goa' });

      console.log('Seeding demo trips for demo user...');
      const trip1 = await Trip.create({
        user: demoUser._id,
        destination: manali ? manali._id : null,
        destinationName: 'Manali, Himachal Pradesh',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        startDate: '2026-10-15',
        endDate: '2026-10-20',
        durationDays: 5,
        travellers: 2,
        travelType: 'Couple',
        transport: 'Flight',
        accommodation: 'Premium',
        budget: 45000,
        status: 'Upcoming',
        breakdown: { transport: 18000, accommodation: 15000, food: 6000, activities: 4500, misc: 1500 }
      });

      // Create itinerary for trip1
      await Itinerary.create({
        user: demoUser._id,
        trip: trip1._id,
        destinationName: trip1.destinationName,
        days: [
          {
            dayNumber: 1,
            title: 'Day 1: Arrival & Local Exploration',
            activities: [
              { time: '10:00 AM', title: 'Arrival at Kullu-Manali & Hotel Check-in', location: 'The Himalayan Pine Resort', cost: 800, completed: true },
              { time: '03:30 PM', title: 'Walking Tour of Old Manali Cafes', location: 'Old Manali', cost: 400, completed: true },
              { time: '07:30 PM', title: 'Riverside Dinner featuring Himachali Dham', location: 'Beas View Cafe', cost: 1200, completed: false }
            ]
          },
          {
            dayNumber: 2,
            title: 'Day 2: Solang Valley Adventure',
            activities: [
              { time: '08:30 AM', title: 'Hearty Breakfast at Resort', location: 'Resort Dining', cost: 350, completed: false },
              { time: '10:00 AM', title: 'Paragliding & Zorbing at Solang Valley', location: 'Solang Valley', cost: 3200, completed: false },
              { time: '04:00 PM', title: 'Visit Hadimba Temple cedar grove', location: 'Hadimba Temple', cost: 100, completed: false }
            ]
          },
          {
            dayNumber: 3,
            title: 'Day 3: Atal Tunnel & Sissu Waterfall',
            activities: [
              { time: '09:00 AM', title: 'Scenic Drive through Atal Tunnel', location: 'Atal Tunnel North Portal', cost: 1200, completed: false },
              { time: '01:00 PM', title: 'Lunch at Sissu & Waterfall photography', location: 'Sissu Valley', cost: 700, completed: false }
            ]
          }
        ]
      });

      await Trip.create({
        user: demoUser._id,
        destination: paris ? paris._id : null,
        destinationName: 'Paris',
        country: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        startDate: '2026-12-01',
        endDate: '2026-12-08',
        durationDays: 7,
        travellers: 1,
        travelType: 'Solo',
        transport: 'Flight',
        accommodation: 'Standard',
        budget: 125000,
        status: 'Upcoming',
        breakdown: { transport: 65000, accommodation: 35000, food: 14000, activities: 8000, misc: 3000 }
      });

      await Trip.create({
        user: demoUser._id,
        destination: goa ? goa._id : null,
        destinationName: 'Goa',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        startDate: '2026-02-10',
        endDate: '2026-02-15',
        durationDays: 5,
        travellers: 4,
        travelType: 'Friends',
        transport: 'Flight',
        accommodation: 'Standard',
        budget: 52000,
        status: 'Completed',
        breakdown: { transport: 22000, accommodation: 16000, food: 8000, activities: 4000, misc: 2000 }
      });
      console.log('Demo trips and itinerary seeded!');
    }

    // 4. Seed Demo Bookings
    const bookingCount = await Booking.countDocuments({ user: demoUser._id });
    if (bookingCount === 0) {
      console.log('Seeding demo bookings...');
      await Booking.create([
        {
          user: demoUser._id,
          type: 'hotel',
          title: 'The Himalayan Pine Resort & Spa',
          destination: 'Manali, Himachal Pradesh',
          checkIn: '2026-10-15',
          checkOut: '2026-10-20',
          guests: '2 Adults',
          roomType: 'Deluxe Valley View Suite',
          price: 15000,
          status: 'Confirmed',
          confirmationCode: 'TB-HTL-9481'
        },
        {
          user: demoUser._id,
          type: 'transport',
          title: 'Air India AI-402 (Flight)',
          destination: 'New Delhi (DEL) → Kullu Manali (KUU)',
          date: '2026-10-15',
          time: '08:45 AM',
          passengers: '2 Passengers',
          price: 18000,
          status: 'Confirmed',
          confirmationCode: 'TB-FLT-3021'
        },
        {
          user: demoUser._id,
          type: 'activity',
          title: 'Solang Valley Paragliding & Ski Pass',
          destination: 'Solang Valley, Manali',
          date: '2026-10-17',
          time: '10:00 AM',
          participants: '2 Adults',
          price: 4500,
          status: 'Confirmed',
          confirmationCode: 'TB-ACT-7832'
        },
        {
          user: demoUser._id,
          type: 'hotel',
          title: 'Hotel Le Marais Boutique',
          destination: 'Paris, France',
          checkIn: '2026-12-01',
          checkOut: '2026-12-08',
          guests: '1 Adult',
          roomType: 'Classic Parisian Queen',
          price: 35000,
          status: 'Confirmed',
          confirmationCode: 'TB-HTL-1120'
        }
      ]);
      console.log('Demo bookings seeded!');
    }

    // 5. Seed Demo Favourites
    const favCount = await Favourite.countDocuments({ user: demoUser._id });
    if (favCount === 0) {
      console.log('Seeding demo favourites...');
      const sampleDests = await Destination.find().limit(4);
      for (const d of sampleDests) {
        await Favourite.create({
          user: demoUser._id,
          destination: d._id
        });
      }
      console.log('Demo favourites seeded!');
    }

  } catch (err) {
    console.error('Error in auto-seeding:', err.message);
  }
}
