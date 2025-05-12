// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to get all feedbacks
router.get('/feedbacks', feedbackController.getAllFeedbacks);

// Route to get feedback for a specific flight
router.get('/feedbacks/flight/:flightId', feedbackController.getFeedbackForFlight);

// Route to create new feedback
router.post('/feedbacks', feedbackController.createFeedback);

module.exports = router;
