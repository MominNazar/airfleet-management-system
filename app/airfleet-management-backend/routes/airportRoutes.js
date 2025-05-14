const express = require('express');
const router = express.Router();
const airportController = require('../controllers/Passenger/AirportCont');
const { verifyAdmin } = require('../middleware/auth');

// Services routes
router.post('/services', verifyAdmin, airportController.addService);
router.get('/services', airportController.getServices);

// Lounges routes
router.post('/lounges', verifyAdmin, airportController.addLounge);
router.get('/lounges', airportController.getLounges);

// Shops routes
router.post('/shops', verifyAdmin, airportController.addShop);
router.get('/shops', airportController.getShops);

// Amenities routes
router.post('/amenities', verifyAdmin, airportController.addAmenity);
router.get('/amenities', airportController.getAmenities);

module.exports = router;
