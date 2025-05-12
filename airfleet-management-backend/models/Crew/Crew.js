const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  monday: { start: String, end: String },
  tuesday: { start: String, end: String },
  wednesday: { start: String, end: String },
  thursday: { start: String, end: String },
  friday: { start: String, end: String },
  saturday: { start: String, end: String },
  sunday: { start: String, end: String },
});

const crewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  emergencyContactName: { type: String },
  emergencyContactPhone: { type: String },
  availability: { type: availabilitySchema },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crew', crewSchema);
