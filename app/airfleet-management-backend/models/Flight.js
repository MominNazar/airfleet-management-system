// const mongoose = require('mongoose');

// const flightSchema = new mongoose.Schema({
//   flightNumber: { type: String, unique: true, required: true },
//   origin: { type: String, required: true },
//   destination: { type: String, required: true },
//   departureTime: { type: Date, required: true },
//   arrivalTime: { type: Date, required: true },
//   status: { type: String, default: 'Scheduled' }, // e.g., "Scheduled", "Completed"
//   seatCapacity: { type: Number, required: true },
//   availableSeats: { type: Number, required: true },
//   price: { type: Number, required: true },
//   crewAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });
// models/flightModel.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, unique: true, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  status: { type: String, default: 'Scheduled' }, // "In Air", "Scheduled", "Landed"
  location: { type: String, default: "Not Available" }, // Flight location (e.g., latitude and longitude)
  speed: { type: String, default: "0 km/h" }, // Flight speed
  altitude: { type: String, default: "0 ft" }, // Flight altitude
  seatCapacity: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  crewAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flight', flightSchema);

