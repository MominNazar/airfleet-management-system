import React, { useState, useEffect } from "react";
import airplane from "../../assets/images/airplane.png"; // Import the airplane icon

const ScheduledFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("https://airplane-management-system-chi.vercel.app/api/flights/");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        setFlights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Air":
        return "bg-blue-500 text-white"; // Blue for flights in the air
      case "Delayed":
        return "bg-yellow-500 text-white"; // Yellow for delayed flights
      case "Scheduled":
        return "bg-accent-orange-light text-white"; // Green for scheduled flights
      case "Completed":
        return "bg-green-500 text-white"; // Gray for completed flights
      case "Cancelled":
        return "bg-red-500 text-white"; // Red for cancelled flights
      default:
        return "bg-gray-300 text-black"; // Default gray color for unknown status
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Main Container */}
      <h2 className="text-3xl font-bold mb-4 text-black text-center">Scheduled Flights</h2>

      <div className="max-w-7xl mx-auto bg-white p-6 text-secondary rounded-lg shadow-lg border-4 border-black">
     
        {/* Loading and error handling */}
        {loading && <p className="text-center text-gray-400">Loading flights...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Flight Cards in 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 cursor-pointer  lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-gray-200 p-6 rounded-lg shadow-md border border-gray-400 flex items-center space-x-4 hover:bg-gray-300 transition-all duration-300"
            >
              {/* Airplane Icon */}
              <img src={airplane} alt="Airplane" className="w-12 h-12" />

              {/* Flight Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{flight.flightNumber} - {flight.destination}</h3>
                <p className="text-sm text-gray-400">Departure: {formatTime(flight.departureTime)}</p>
                {/* Status Label */}
                <span className={`inline-block text-sm font-semibold py-1 px-3 rounded-full ${getStatusColor(flight.status)}`}>
                  {flight.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledFlights;
