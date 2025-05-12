import React, { useState, useEffect } from "react";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightWithdrawalRequests = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT
        setUserId(decodedToken.userId);
      }
    };
    fetchUserId();
  }, []);

  // Fetch flights data from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("https://airplane-management-system-chi.vercel.app/api/flights");
        const data = await response.json();
        if (response.ok) {
          setFlights(data);
        } else {
          setRequestMessage("Error fetching flights.");
        }
      } catch (error) {
        setRequestMessage("Error fetching flights.");
      }
    };
    fetchFlights();
  }, []);

  // Handle withdrawal request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFlight && userId) {
      try {
        const response = await fetch("https://airplane-management-system-chi.vercel.app/api/withdrawals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ flightId: selectedFlight._id, userId }),
        });
        const data = await response.json();
        if (response.ok) {
          setRequestMessage(`Request for withdrawal from flight ${selectedFlight.flightNumber} has been sent.`);
        } else {
          setRequestMessage(data.message || "Error sending withdrawal request.");
        }
      } catch (error) {
        setRequestMessage("Error sending withdrawal request.");
      }
    } else {
      setRequestMessage("Please select a flight and make sure you are logged in.");
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "In Air":
        return "bg-blue-500 text-white";
      case "Scheduled":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-secondary">
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-200 text-gray-800 p-4 h-screen overflow-y-auto scrollbar-thin scrollbar-track-current">
          <h3 className="text-3xl font-medium text-gray-800 mb-6">Assigned Flights</h3>
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight._id}
                className={`flex items-center p-4 rounded-lg shadow-md bg-white cursor-pointer transition-transform transform hover:scale-105 hover:bg-secondary hover:text-white ${
                  selectedFlight && selectedFlight._id === flight._id ? "bg-secondary text-green-500" : ""
                }`}
                onClick={() => setSelectedFlight(flight)}
              >
                {/* Icon */}
                <div className="flex-shrink-0 text-secondary  mr-4">
                  <FaPlaneDeparture size={24} />
                </div>
                {/* Flight Details */}
                <div className="">
                  <h4 className="font-semibold text-lg">{flight.flightNumber}</h4>
                  <p className="text-sm ">
                    Departure: {flight.departureTime}
                  </p>
                  <p className="text-sm  ">
                    Destination: {flight.destination}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-semibold ${getStatusLabel(
                      flight.status
                    )}`}
                  >
                    {flight.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Withdrawal Form */}
        <div className="w-full md:w-3/4 bg-white p-8 shadow-md h-screen overflow-y-auto">
          <h3 className="text-2xl font-medium text-gray-800 mb-6 border-b pb-4">Request Withdrawal</h3>
          {selectedFlight ? (
            <div className="bg-gray-50 p-6 rounded-lg border shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Flight Number: {selectedFlight.flightNumber}
              </h4>
              <p className="text-gray-600">Departure: {selectedFlight.departureTime}</p>
              <p className="text-gray-600">Destination: {selectedFlight.destination}</p>
              <p className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusLabel(selectedFlight.status)}`}
                >
                  {selectedFlight.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Please select a flight to withdraw from.</p>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition"
              >
                Submit Withdrawal Request
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition"
                onClick={() => setSelectedFlight(null)}
              >
                Clear Selection
              </button>
            </div>
          </form>
          {requestMessage && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-semibold">{requestMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightWithdrawalRequests;
