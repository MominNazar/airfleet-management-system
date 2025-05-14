const mongoose = require('mongoose');

const airportShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('AirportShop', airportShopSchema);
