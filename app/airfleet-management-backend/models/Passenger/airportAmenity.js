const mongoose = require('mongoose');

const airportAmenitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('AirportAmenity', airportAmenitySchema);
