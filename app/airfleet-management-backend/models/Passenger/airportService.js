const mongoose = require('mongoose');

const airportServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('AirportService', airportServiceSchema);
