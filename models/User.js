const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['driver', 'rider'], default: 'rider' },
  phone: String,
  vehicle: {
    model: String,
    licensePlate: String
  },
  preferences: {
    smoking: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    music: { type: Boolean, default: false }
  },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Add direct password comparison method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema); 