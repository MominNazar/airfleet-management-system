const mongoose = require('mongoose');

const airportLoungeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('AirportLounge', airportLoungeSchema);
