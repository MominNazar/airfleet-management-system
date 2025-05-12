const Flight = require("../models/Flight");
const Payment = require('../models/Crew/Payment');

exports.getPaymentsByFlight = async (req, res) => {
  const { flightId } = req.params;

  try {
    const payments = await Payment.find({ flightId });

    if (!payments.length) {
      return res.status(404).json({ message: 'No payment records found for this flight.' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment records.', error });
  }
};
exports.addPayment = async (req, res) => {
  const { flightId } = req.params;
  const { date, amount, method, status } = req.body;

  try {
    const newPayment = new Payment({
      flightId,
      date,
      amount,
      method,
      status,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment record.', error });
  }
};
const HistoricalData = require('../models/Crew/HistroicalData');

exports.getHistoricalDataByFlight = async (req, res) => {
  const { flightId } = req.params;

  try {
    const history = await HistoricalData.find({ flightId });

    if (!history.length) {
      return res.status(404).json({ message: 'No historical data found for this flight.' });
    }

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical data.', error });
  }
};
exports.addHistoricalData = async (req, res) => {
  const { flightId } = req.params;
  const { date, status, details } = req.body;

  try {
    const newHistory = new HistoricalData({
      flightId,
      date,
      status,
      details,
    });

    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding historical data.', error });
  }
};

// Function to get tracking information for a specific flight
exports.getFlightTrackingInfo = async (req, res) => {
  const { flightId } = req.params;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const { status, location, speed, altitude } = flight;

    res.json({
      flightNumber: flight.flightNumber,
      status,
      location,
      speed,
      altitude,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight tracking info', error });
  }
};

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate("crewAssigned", "firstName lastName role");
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights." });
  }
};

// Create a new flight
exports.createFlight = async (req, res) => {
  const {
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    seatCapacity,
    availableSeats,
    price,
    crewAssigned,
  } = req.body;

  try {
    const flightExists = await Flight.findOne({ flightNumber });
    if (flightExists) {
      return res.status(400).json({ error: "Flight with this number already exists." });
    }

    const newFlight = new Flight({
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      seatCapacity,
      availableSeats,
      price,
      crewAssigned,
    });

    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(500).json({ error: "Failed to create flight." });
  }
};

exports.updateFlight = async (req, res) => {
  const { id } = req.params; // Extract flight ID from the route parameters
  const updateData = req.body; // Extract update data from the request body

  try {
    // Log the received update data for debugging
    console.log("Update Data:", updateData);

    // Find and update the flight
    const updatedFlight = await Flight.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() }, // Merge update data and set updatedAt
      { new: true, runValidators: true } // Return updated document and apply schema validation
    );

    if (!updatedFlight) {
      return res.status(404).json({ error: "Flight not found." });
    }

    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: "Failed to update flight.", details: error.message });
  }
};


// Delete a flight
exports.deleteFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).json({ error: "Flight not found." });
    }

    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete flight." });
  }
};
// Get flight by ID
exports.getFlightById = async (req, res) => {
  const { flightId } = req.params;

  try {
    const flight = await Flight.findById(flightId).populate("crewAssigned", "firstName lastName role");

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);  // Return the flight details
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight details', error });
  }
};
