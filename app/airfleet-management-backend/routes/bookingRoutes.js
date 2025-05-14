const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Passenger/BookingCont');

// Create a new booking
router.post('/book', bookingController.createBooking);

// Get all bookings of a specific user (passengerId)
router.get('/bookings/:passengerId', bookingController.getBookings);

// Cancel a booking
router.put('/cancel/:bookingId', bookingController.cancelBooking);
router.get('/bookings/latest/:passengerId', bookingController.getLatestBooking);
router.put('/bookings/:bookingId/payment-status', bookingController.updatePaymentStatus);
module.exports = router;
