// controllers/feedbackController.js

const Feedback = require('../models/Feedback');
const Flight = require('../models/Flight');

exports.createFeedback = async (req, res) => {
  try {
    const { passengerId, flightNo, rating, comments } = req.body;

    // Validate the data
    if (!passengerId || !flightNo || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Find the Flight by flightNo
    const flight = await Flight.findOne({ flightNumber: flightNo });

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const newFeedback = new Feedback({
      passengerId,
      flightId: flight._id,  // Use the ObjectId of the flight
      rating,
      comments,
    });

    // Save the feedback
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('passengerId', 'name email')  // Assuming you want to include user details
      .populate('flightId', 'flightNo departure arrival');  // Assuming you want flight details

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get feedback for a specific flight
exports.getFeedbackForFlight = async (req, res) => {
  const { flightId } = req.params;

  try {
    const feedbacks = await Feedback.find({ flightId })
      .populate('passengerId', 'name email')
      .populate('flightId', 'flightNo departure arrival');

    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this flight' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
