import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6
    },
    phone: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: 'Passionate globetrotter ready to explore the world!'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    preferences: {
      type: {
        type: String,
        default: 'Adventure'
      },
      budget: {
        type: String,
        default: 'Standard'
      },
      transport: {
        type: String,
        default: 'Flight'
      },
      notifications: {
        reminders: { type: Boolean, default: true },
        updates: { type: Boolean, default: true },
        promos: { type: Boolean, default: false }
      }
    },
    interests: {
      type: [String],
      default: []
    },
    isFirstLogin: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
