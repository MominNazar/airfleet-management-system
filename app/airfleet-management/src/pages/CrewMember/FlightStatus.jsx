import React, { useState, useEffect } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import axios from "axios";

const FlightStatusManagement = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [status, setStatus] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://airplane-management-system-chi.vercel.app/api/flights")
      .then((response) => setFlights(response.data))
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFlight && status) {
      const updatedStatus = { status };
  
      axios
        .put(`https://airplane-management-system-chi.vercel.app/api/flights/${selectedFlight._id}`, updatedStatus)
        .then(() => {
          setUpdateMessage(`Status "${status}" updated for flight ${selectedFlight.flightNumber}.`);
          setSelectedFlight((prev) => ({
            ...prev,
            status,
          }));
  
          // Reload the page to fetch the updated list of flights
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating flight status:", error);
          setUpdateMessage("Error updating flight status. Please try again.");
        });
    } else {
      setUpdateMessage("Please select a flight and status.");
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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar (hidden on smaller screens) */}
        <div className="w-full md:w-1/4 bg-gray-200 p-4 h-screen overflow-y-auto scrollbar-thin scrollbar-track-gray-300 md:block hidden">
          <h3 className="text-3xl font-medium mb-6">Assigned Flights</h3>
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight._id}
                className={`flex items-center p-4 rounded-lg shadow-md bg-white cursor-pointer transition-transform transform hover:scale-105 hover:bg-secondary hover:text-white ${
                  selectedFlight && selectedFlight._id === flight._id ? "bg-secondary text-green-500" : ""
                }`}
                onClick={() => setSelectedFlight(flight)}
              >
                <div className="flex-shrink-0 text-secondary mr-4">
                  <FaPlaneDeparture size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{flight.flightNumber}</h4>
                  <p className="text-sm">Departure: {flight.departureTime}</p>
                  <p className="text-sm">Destination: {flight.destination}</p>
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

        {/* Dropdown for smaller screens */}
        <div className="w-full md:hidden p-4">
          <select
            className="w-full p-3 border rounded-lg bg-gray-100"
            onChange={(e) => {
              const flight = flights.find(f => f._id === e.target.value);
              setSelectedFlight(flight);
            }}
          >
            <option value="">Select Flight</option>
            {flights.map((flight) => (
              <option key={flight._id} value={flight._id}>
                {flight.flightNumber} - {flight.departureTime}
              </option>
            ))}
          </select>
        </div>

        {/* Main Section */}
        <div className="w-full md:w-3/4 bg-white p-8 shadow-md h-screen overflow-y-auto scrollbar-none">
          <h3 className="text-2xl font-medium text-gray-800 mb-6 border-b pb-4">Update Flight Status</h3>
          {selectedFlight ? (
            <div className="bg-gray-50 p-6 rounded-lg border shadow-md">
              <h4 className="text-lg font-semibold mb-2">Flight Number: {selectedFlight.flightNumber}</h4>
              <p>Departure: {selectedFlight.departureTime}</p>
              <p>Destination: {selectedFlight.destination}</p>
              <p className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusLabel(selectedFlight.status)}`}
                >
                  {selectedFlight.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Please select a flight to update its status.</p>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-100"
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Air">In Air</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                type="submit"
                className="bg-accent-orange-light text-white md:px-4 md:py-2  p-1 text-sm md:text-lg rounded-lg shadow hover:bg-gray-800 transition"
              >
                Update Status
              </button>
            </div>
          </form>
          {updateMessage && <p className="mt-4 text-green-600 font-semibold">{updateMessage}</p>}

          {/* Updated Flight Status in Lower Section */}
          {selectedFlight && (
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Updated Flight Status</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="font-semibold">{selectedFlight.flightNumber}</h4>
                <p>{selectedFlight.status}</p>
                <p className="text-sm">{selectedFlight.departureTime}</p>
                <p className="text-sm">{selectedFlight.destination}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-semibold ${getStatusLabel(
                    selectedFlight.status
                  )}`}
                >
                  {selectedFlight.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightStatusManagement;
