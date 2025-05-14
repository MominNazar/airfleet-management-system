const Booking = require('../../models/Booking');
const Flight = require('../../models/Flight');
const User = require('../../models/User');
exports.getLatestBooking = async (req, res) => {
  const { passengerId } = req.params;

  try {
    const booking = await Booking.find({ passengerId })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .populate('flightId') // Populate flight details if necessary
      .limit(1); // Only fetch the most recent booking

    if (!booking || booking.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this passenger.' });
    }

    res.json(booking[0]); // Send the most recent booking
  } catch (err) {
    console.error('Error fetching latest booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { passengerId, flightId, seatNumbers, amountPaid } = req.body;

    // Validate input fields
    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return res.status(400).json({ message: 'seatNumbers must be a non-empty array' });
    }

    // Validate user and flight
    const user = await User.findById(passengerId);
    const flight = await Flight.findById(flightId);

    if (!user || !flight) {
      return res.status(404).json({ message: 'User or Flight not found' });
    }

    // Ensure sufficient seats
    if (flight.availableSeats < seatNumbers.length) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    // Calculate total price
    const totalPrice = flight.price * seatNumbers.length;
    if (amountPaid !== totalPrice) {
      return res.status(400).json({ message: `Payment amount does not match total price of $${totalPrice}` });
    }

    // Create a single booking for all selected seats
    const booking = new Booking({
      passengerId,
      flightId,
      seatNumbers, // Pass the array of seat numbers directly
      amountPaid,
      status: 'Confirmed',
      paymentStatus: 'Pending',
      bookingDate: new Date(),
    });
    await booking.save();

    // Decrease available seats
    flight.availableSeats -= seatNumbers.length;
    await flight.save();

    return res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Error in createBooking:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
// Update payment status and booking status to "Completed" and "Paid"
exports.updatePaymentStatus = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by its ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the payment status and booking status
    booking.paymentStatus = 'Paid';   // Set paymentStatus to "Paid"
    booking.status = 'Confirmed';     // Set status to "Completed"

    // Save the updated booking
    await booking.save();

    return res.status(200).json({ message: 'Payment status updated successfully', booking });
  } catch (err) {
    console.error('Error updating payment status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all bookings for a specific passenger
exports.getBookings = async (req, res) => {
  try {
    const { passengerId } = req.params;

    const bookings = await Booking.find({ passengerId }).populate('flightId');

    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Restore available seats
    const flight = await Flight.findById(booking.flightId);
    flight.availableSeats += 1;
    await flight.save();

    // Update booking status to cancelled
    booking.status = 'Cancelled';
    await booking.save();

    return res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
