const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the correct middleware
const { getDashboardData } = require('../controllers/dashboardController');

// Protect route and ensure only users with the 'Admin' role can access it
router.get('/dashboard', protect(['Admin']), getDashboardData);
router.get('/dashboard', protect(['Passenger']), getDashboardData);
module.exports = router;
