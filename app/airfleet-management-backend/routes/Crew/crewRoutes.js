const express = require('express');
const router = express.Router();
const crewController = require('../controllers/crewController');

// Routes
router.post('/updateProfile', crewController.updateCrewProfile);
router.get('/getProfile/:email', crewController.getCrewProfile);

module.exports = router;
