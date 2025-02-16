const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  dropoffLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  departureTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  passengers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' }
  }],
  preferences: {
    smoking: Boolean,
    pets: Boolean,
    gender: { type: String, enum: ['male', 'female', 'any'], default: 'any' }
  },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  carModel: {
    type: String,
    required: [true, 'Car model is required']
  },
  carNumber: {
    type: String,
    required: [true, 'Car number is required']
  },
});

rideSchema.index({ pickupLocation: '2dsphere' });
rideSchema.index({ dropoffLocation: '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema); 