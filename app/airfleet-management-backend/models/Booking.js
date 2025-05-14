const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now },
  seatNumbers: [{ type: String, required: true }],
  status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  amountPaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
