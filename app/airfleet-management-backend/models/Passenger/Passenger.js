const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user model
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  emergencyContactName: { type: String },
  emergencyContactPhone: { type: String },
  seatPreference: { type: String },
  mealPreference: { type: String },
  loyaltyPoints: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Passenger', passengerSchema);
