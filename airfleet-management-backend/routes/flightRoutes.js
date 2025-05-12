const express = require("express");
const router = express.Router();
const {
  getAllFlights,
  createFlight,
  updateFlight,
  deleteFlight,
  getFlightTrackingInfo,
  getFlightById,  // Import the new controller function
  getPaymentsByFlight,
  addPayment,
  getHistoricalDataByFlight,
  addHistoricalData,
} = require("../controllers/flightController");

router.get('/:flightId/tracking', getFlightTrackingInfo);

// Route to get all flights
router.get("/", getAllFlights);

// Route to get a flight by ID (New route)
router.get("/:flightId", getFlightById);  // Fetch flight by ID

// Route to create a new flight
router.post("/", createFlight);

// Route to update a flight
router.put("/:id", updateFlight);

// Route to delete a flight
router.delete("/:id", deleteFlight);
// Payment Routes
router.get("/:flightId/payments", getPaymentsByFlight);
router.post("/:flightId/payments", addPayment);

// Historical Data Routes
router.get("/:flightId/history", getHistoricalDataByFlight);
router.post("/:flightId/history", addHistoricalData);

module.exports = router;
