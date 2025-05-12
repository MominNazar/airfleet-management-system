// routes/passengerRoutes.js
const express = require('express');
const { updateProfile, getProfile } = require('../controllers/Passenger/UpdateProfile');

const router = express.Router();

// Update profile route for passengers
router.put('/update/:userId', updateProfile);

// Get profile route for passengers
router.get('/profile/:userId', getProfile);

module.exports = router;
