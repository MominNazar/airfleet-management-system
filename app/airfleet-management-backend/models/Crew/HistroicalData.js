const mongoose = require('mongoose');

const historicalDataSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  details: { type: String, required: true },
});

module.exports = mongoose.model('HistoricalData', historicalDataSchema);
