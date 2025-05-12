import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackingPanel = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [flights, setFlights] = useState([]);
  const [trackingData, setTrackingData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch all flights from the backend (initial data load)
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("https://airplane-management-system-chi.vercel.app/api/flights"); // Replace with your actual endpoint
        setFlights(response.data);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Failed to fetch flight data.");
      }
    };
    fetchFlights();
  }, []);

  // Fetch tracking data for a selected flight
  const fetchTrackingData = async (flightId) => {
    try {
      const response = await axios.put(`https://airplane-management-system-chi.vercel.app/api/flights/${flightId}`);
      if (response.data) {
        setTrackingData(response.data);
        setSelectedFlight(response.data);
      } else {
        setError("No tracking data available.");
      }
    } catch (err) {
      console.error("Error fetching tracking data:", err);
      setError("Failed to fetch tracking information.");
    }
  };

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch = flight.flightNumber.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "real-time" && flight.status === "In Air") ||
      (filter === "historical" && flight.status !== "In Air");
    return matchesSearch && matchesFilter;
  });

  // Determine the button and status color based on the flight status
  const getStatusStyles = (status) => {
    if (status === "Completed") {
      return {
        buttonClass: "bg-green-500 text-white",
        statusText: "Completed",
        trackingStatus: "--/--",
        isCompleted: true
      };
    }
    if (status === "In Air") {
      return {
        buttonClass: "bg-blue-500 text-white",
        statusText: "In Air",
        trackingStatus: "Tracking...",
        isCompleted: false
      };
    }
    if (status === "Scheduled") {
      return {
        buttonClass: "bg-orange-400 text-white",
        statusText: "Scheduled",
        trackingStatus: "Pending",
        isCompleted: false
      };
    }
    return {
      buttonClass: "bg-gray-500 text-white",
      statusText: "Unknown",
      trackingStatus: "--/--",
      isCompleted: false
    };
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
  <h1 className="text-xl font-bold">Tracking Panel</h1>
</div>

      <div className="h-[800px] bg-white text-black p-6">

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by flight number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring focus:ring-secondary-light"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 border border-gray-700 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring focus:ring-secondary-light"
          >
            <option value="all">All Flights</option>
            <option value="real-time">Real-Time Tracking</option>
            <option value="historical">Historical Data</option>
          </select>
        </div>

        {/* Flight Data Table */}
        <div className="overflow-x-auto bg-gray-200 p-0 rounded-lg shadow-md mb-8">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-secondary text-white rounded-t-lg">
                <th className="px-4 py-2 text-left text-lg font-semibold">Flight Number</th>
                <th className="px-4 py-2 text-left text-lg font-semibold">Status</th>
                <th className="px-4 py-2 text-right text-lg font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => {
                  const { buttonClass, statusText, trackingStatus, isCompleted } = getStatusStyles(flight.status);
                  return (
                    <tr key={flight._id} className="border-b border-gray-300">
                      <td className="px-4 py-2">{flight.flightNumber}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`font-semibold ${flight.status === "In Air" ? "text-blue-500" : "text-gray-500"}`}
                        >
                          {statusText}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => {
                            setSelectedFlight(flight);
                            fetchTrackingData(flight._id);
                            toggleModal(); // Open modal on button click
                          }}
                          className={`px-4 py-2 text-sm rounded-full shadow-lg ${buttonClass} hover:${buttonClass} transition duration-300`}
                        >
                          {isCompleted ? "Completed" : "Track"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-400 py-4">
                    No flights match the search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tracking Data Pop-Up */}
        {isModalOpen && selectedFlight && trackingData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <div className="space-y-4">
                <button
                  onClick={toggleModal}
                  className="text-white text-2xl absolute top-2 right-2 rounded-full hover:bg-secondary"
                >
                  &times;
                </button>
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">Tracking Information</h2>
                <p className="font-bold text-gray-700">
                  <strong>Flight Number:</strong> {trackingData.flightNumber}
                </p>
                <p className="font-bold text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      trackingData.status === "In Air" ? "text-blue-500" : "text-gray-400"
                    }`}
                  >
                    {trackingData.status}
                  </span>
                </p>
                <p className="font-bold text-gray-700">
                  <strong>Location:</strong> {trackingData.location}
                </p>
                <p className="font-bold text-gray-700">
                  <strong>Speed:</strong> {trackingData.speed}
                </p>
                <p className="font-bold text-gray-700">
                  <strong>Altitude:</strong> {trackingData.altitude}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPanel;
