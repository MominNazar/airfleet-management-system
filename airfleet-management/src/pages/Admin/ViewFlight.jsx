import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const FlightSchedule = () => {
  const [search, setSearch] = useState(""); // For search functionality
  const [flights, setFlights] = useState([]); // Flight data
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch flight schedule data from the AviationStack API
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true); // Set loading state to true when fetching starts
      try {
        const response = await axios.get("https://api.aviationstack.com/v1/flights", {
          params: {
            access_key: "cb5b6e526d888995f000d3ca6fca224e", // Your API key
            limit: 100, // Adjust the limit if needed
          },
        });

        // Format the response data to match your application's structure
        const formattedFlights = response.data.data.map((flight) => ({
          _id: flight.flight.iata, // Use the IATA code as a unique identifier
          flightNumber: flight.flight.iata,
          origin: flight.departure.airport,
          destination: flight.arrival.airport,
          departureTime: flight.departure.scheduled,
          status: flight.flight_status,
        }));

        setFlights(formattedFlights);
      } catch (err) {
        console.error("Error fetching flight schedule:", err);
        setError("Failed to fetch flight schedule data.");
      } finally {
        setLoading(false); // Set loading state to false once data is fetched
      }
    };

    fetchFlights();
  }, []);

 // Filter flights based on search input
const filteredFlights = flights.filter((flight) =>
  (flight.flightNumber ?? "").toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="bg-gradient-to-br from-[#2a3d56] to-[#212b3c] min-h-screen text-white">
      <Navbar />

      {/* Flight Schedule Page Content */}
      <div className="p-6">
        <h2 className="text-4xl font-semibold mb-6">Flight Schedule</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 gap-6">
          <input
            type="text"
            placeholder="Search by flight number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border border-[#3e4c62] rounded-lg bg-[#2a3d56] text-white focus:outline-none focus:ring focus:ring-[#fcbf49]"
          />
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center my-10">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Flight Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-[#3e4c62] scrollbar-track-[#2a3d56]">
  {!loading && filteredFlights.length > 0 ? (
    filteredFlights.map((flight) => (
      <div
        key={flight._id}
        className="bg-[#2a3d56] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
      >
        <div className="text-center mb-4">
          <span className="text-xl font-bold">{flight.flightNumber}</span>
          <p className="text-lg">
            {flight.origin} → {flight.destination}
          </p>
        </div>
        <div className="flex justify-between text-sm text-[#8b8f99]">
          <span>{new Date(flight.departureTime).toLocaleString()}</span>
          <span>{flight.status}</span>
        </div>
      </div>
    ))
  ) : (
    !loading && <p className="text-[#8b8f99]">No flights match the search criteria.</p>
  )}
</div>


        {/* Error Handling */}
        {error && (
          <div className="bg-[#c0392b] text-white p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#1a2533] py-4 text-center text-[#8b8f99]">
        <p>&copy; 2024 Qatar Airways. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FlightSchedule;
