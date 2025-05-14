import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlightBookingManagement = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ route: "", date: "" });
  const [bookedFlights, setBookedFlights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("https://airplane-management-system-chi.vercel.app/api/flights/");
        setFlights(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();
  }, []);

  const handleSearchFlights = () => {
    const { route, date } = searchParams;
    const filteredFlights = flights.filter(
      (flight) =>
        (!route || flight.destination.toLowerCase().includes(route.toLowerCase())) &&
        (!date || flight.departureTime.includes(date))
    );
    setSearchResults(filteredFlights);
  };

  const handleClearSearch = () => {
    setSearchParams({ route: "", date: "" });
    setSearchResults(flights);
  };

  const handleBookFlight = (flightId) => {
    const flightToBook = flights.find((flight) => flight._id === flightId);
    if (!bookedFlights.some((booked) => booked._id === flightId)) {
      setBookedFlights([...bookedFlights, flightToBook]);
    }
  };

  const handleUnbookFlight = (flightId) => {
    setBookedFlights(bookedFlights.filter((flight) => flight._id !== flightId));
  };

  const handleProceedToSeatSelection = (flightId) => {
    const passengerId = localStorage.getItem("PassID");

    if (!passengerId) {
      console.error("Passenger ID is not found in localStorage");
      return;
    }

    navigate(`/passenger/seat-selection?passengerId=${passengerId}&flightId=${flightId}`);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-white text-gray-800 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Sidebar for search */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 border-2 border-black rounded-lg shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Search Flights</h2>
          <input
            type="text"
            placeholder="Route (e.g., New York)"
            value={searchParams.route}
            onChange={(e) => setSearchParams({ ...searchParams, route: e.target.value })}
            className="w-full p-2 sm:p-3 mb-4 sm:mb-6 bg-gray-100 rounded-full text-gray-800 focus:ring focus:ring-yellow-500"
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            className="w-full p-2 sm:p-3 mb-4 sm:mb-6 bg-gray-100 rounded-full text-gray-800 focus:ring focus:ring-yellow-500"
          />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={handleSearchFlights}
              className="w-full sm:w-1/2 bg-secondary text-white py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-all font-semibold text-sm sm:text-base"
            >
              Search
            </button>
            <button
              onClick={handleClearSearch}
              className="w-full sm:w-1/2 bg-secondary text-white py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-all font-semibold text-sm sm:text-base"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full lg:w-2/3 gap-4 sm:gap-6">
          {/* Available Flights */}
          <div className="bg-white p-4 sm:p-6 border-2 border-black rounded-lg shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Available Flights</h2>
            <div className="overflow-x-auto">
              {searchResults.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600 bg-gray-200">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Flight No.</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Destination</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Departure</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((flight) => (
                      <tr key={flight._id} className="hover:bg-gray-300">
                        <td className="p-2 sm:p-4 border border-gray-600">{flight.flightNumber}</td>
                        <td className="p-2 sm:p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-2 sm:p-4 border border-gray-600">
                          {new Date(flight.departureTime).toLocaleString()}
                        </td>
                        <td className="p-2 sm:p-4 border border-gray-600 text-center">
                          <button
                            onClick={() => handleBookFlight(flight._id)}
                            className="text-white hover:underline rounded-full bg-green-600 hover:bg-gray-800 hover:text-white py-2 sm:py-3 px-4 sm:px-6"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-400">No flights found.</p>
              )}
            </div>
          </div>

          {/* Booked Flights */}
          <div className="bg-white p-4 sm:p-6 border-2 border-black rounded-lg shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Booked Flights</h2>
            <div className="overflow-x-auto">
              {bookedFlights.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600 bg-gray-200">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Flight No.</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Destination</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-left">Departure</th>
                      <th className="p-2 sm:p-4 border border-gray-600 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedFlights.map((flight) => (
                      <tr key={flight._id} className="hover:bg-gray-300">
                        <td className="p-2 sm:p-4 border border-gray-600">{flight.flightNumber}</td>
                        <td className="p-2 sm:p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-2 sm:p-4 border border-gray-600">
                          {new Date(flight.departureTime).toLocaleString()}
                        </td>
                        <td className="p-2 sm:p-4 border border-gray-600 text-center">
                          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                            <button
                              onClick={() => handleUnbookFlight(flight._id)}
                              className="w-full sm:w-32 bg-red-500 text-white py-2 sm:py-3 rounded-full hover:bg-red-600 transition-all font-semibold text-sm sm:text-base"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleProceedToSeatSelection(flight._id)}
                              className="w-full sm:w-32 bg-green-600 text-white py-2  sm:py-3 rounded-full hover:bg-gray-800 transition-all font-semibold text-sm sm:text-base"
                            >
                              Buy Ticket
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-400">No flights booked yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingManagement;
