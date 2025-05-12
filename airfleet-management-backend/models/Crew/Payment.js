const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Credit Card', 'Bank Transfer', 'Cash'], required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Failed'], required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);
