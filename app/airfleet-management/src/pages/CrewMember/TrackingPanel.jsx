import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlane, FaTimes } from "react-icons/fa"; // Importing FontAwesome icons

const TrackingPanel = () => {
  const [assignedFlights, setAssignedFlights] = useState([]); // Holds all flights data
  const [selectedFlight, setSelectedFlight] = useState(null); // Holds the selected flight details
  const [paymentRecords, setPaymentRecords] = useState([]); // Holds payment records for the selected flight
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showTrackingPopup, setShowTrackingPopup] = useState(false); // To toggle the tracking popup

  // Fetch all flights when the component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://airplane-management-system-chi.vercel.app/api/flights/");
        setAssignedFlights(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch flights. Please try again.");
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Fetch details of the selected flight and its payment records
  const handleSelectFlight = async (flightId) => {
    try {
      setLoading(true);
      setError(null);

      // Clear payment records while loading new data
      setPaymentRecords([]);

      // Fetch flight details
      const flightResponse = await axios.get(`https://airplane-management-system-chi.vercel.app/api/flights/${flightId}`);
      setSelectedFlight(flightResponse.data);

      // Fetch payment records
      const paymentResponse = await axios.get(`https://airplane-management-system-chi.vercel.app/api/flights/${flightId}/payments`);
      setPaymentRecords(paymentResponse.data);

      setLoading(false);
      setShowTrackingPopup(true); // Show tracking popup when flight is selected
    } catch (err) {
      setError("Failed to fetch flight details or payment records.");
      setLoading(false);
    }
  };

  // Close the tracking information popup
  const closeTrackingPopup = () => {
    setShowTrackingPopup(false);
  };

  // Function to determine the status label color
  const getStatusLabel = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Air":
        return "bg-blue-500";
      case "Scheduled":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h2 className="text-3xl font-medium text-center mb-8">Tracking Panel</h2>

      {/* Flight Selection */}
      <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl text-secondary font-semibold mb-4">Assigned Flights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assignedFlights.map((flight) => (
            <div
              key={flight._id}
              className="p-6 py-10 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleSelectFlight(flight._id)}
            >
              <div className="flex items-center gap-4">
                <FaPlane size={24} className="text-gray-500" />
                <div>
                  <h4 className="font-bold text-lg">{flight.flightNumber}</h4>
                  <p className="text-sm text-secondary">{flight.destination}</p>
                  <p className="text-xs text-gray-700">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                </div>
                <span
                  className={`text-white text-xs px-3 py-1 rounded-full ${getStatusLabel(flight.status)}`}
                >
                  {flight.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Information Popup */}
      {showTrackingPopup && selectedFlight && (
        <div className="fixed inset-0 flex items-center  justify-center bg-white bg-opacity-50">
          <div className="bg-gray-200 p-8 rounded-lg text-sm ml-5 mr-5 text-gray-800 max-w-2xl mx-auto transform transition-all duration-500 ease-in-out w-full sm:w-3/4 md:w-2/3">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-gray-200 text-red-500 text-3xl"
              onClick={closeTrackingPopup}
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-semibold mb-6">Tracking Information</h3>

            <div className="space-y-6">
              {/* Flight Info */}
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">{selectedFlight.flightNumber}</h4>
                <p className="text-gray-800 ">Destination: {selectedFlight.destination}</p>
                <p className="text-gray-600">
                  Departure: {new Date(selectedFlight.departureTime).toLocaleString()}
                </p>
                <p className="text-gray-600">Status: 
                  <span className={`text-white text-xs px-3 py-1 rounded-full ${getStatusLabel(selectedFlight.status)}`}>
                    {selectedFlight.status}
                  </span>
                </p>
                <p className="text-gray-600">Current Location: {selectedFlight.location}</p>
              </div>

              {/* Payment Records */}
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-4">Payment Records</h4>
                {paymentRecords.length === 0 ? (
                  <p className="text-gray-600">No payment information available.</p>
                ) : (
                  paymentRecords.map((payment, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-gray-800">
                        {new Date(payment.date).toLocaleDateString()}: {payment.amount}
                      </p>
                      <p className="text-sm text-gray-600">Method: {payment.method}</p>
                      <p className="text-sm text-gray-600">Status: {payment.status}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
    </div>
  );
};

export default TrackingPanel;
