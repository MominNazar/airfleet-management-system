import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaMoneyBillAlt } from "react-icons/fa";

const Dashboard = () => {
  const [flights, setFlights] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("https://airplane-management-system-chi.vercel.app/api/flights/");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoadingFlights(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        const response = await axios.get(
          `http://localhost:5000/api/bookings/bookings/${passengerId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching travel history:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleBookFlight = (flightId) => {
    const passengerId = localStorage.getItem("PassID");
    if (!passengerId || !flightId) {
      console.error("Missing passengerId or flightId");
      return;
    }
    navigate(
      `/passenger/seat-selection?passengerId=${passengerId}&flightId=${flightId}`
    );
  };

  return (
    <div className="dashboard min-h-screen bg-white p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Dashboard
      </h2>

      {/* Available Flights Section */}
      <div className="max-w-5xl mx-auto bg-white border-black border-2 p-4 sm:p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
          <span>Available Flights</span>
          <FaPlane className="text-secondary text-3xl" />
        </h3>
        {loadingFlights ? (
          <p>Loading flights...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flights.map((flight) => (
              <div
                key={flight._id}
                className="flight-card bg-gray-200 text-gray-800 p-4 sm:p-6 rounded-lg relative flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xl font-bold mb-2">{flight.flightNumber}</h4>
                  <p className="text-sm sm:text-base mb-1">
                    From: {flight.origin}
                  </p>
                  <p className="text-sm sm:text-base mb-1">
                    To: {flight.destination}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm sm:text-base">
                    ${flight.price}
                  </span>
                  <button
                    className="bg-secondary text-white hover:bg-gray-800 py-2 px-4 rounded-full"
                    onClick={() => handleBookFlight(flight._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Travel History Section */}
      <div className="max-w-5xl mx-auto bg-white border-black border-2 p-4 sm:p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
          <span>Travel History</span>
          <FaMoneyBillAlt className="text-secondary text-3xl" />
        </h3>
        {loadingHistory ? (
          <p>Loading travel history...</p>
        ) : (
          <div>
            {history.length > 0 ? (
              <ul>
                {history.map((booking) => (
                  <li
                    key={booking._id}
                    className="bg-gray-200 text-gray-800 p-4 sm:p-6 rounded-lg mb-4 relative flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm sm:text-base mb-1">
                        Flight Number: {booking.flightId.flightNumber}
                      </p>
                      <p className="text-sm sm:text-base mb-1">
                        From: {booking.flightId.origin}
                      </p>
                      <p className="text-sm sm:text-base mb-1">
                        To: {booking.flightId.destination}
                      </p>
                      <p className="text-sm sm:text-base mb-1">
                        Date:{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm sm:text-base mb-1 flex items-center">
                        Status:{" "}
                        {booking.status === "Completed" ? (
                          <span className="ml-2 text-green-500 text-lg font-bold">
                            ✔
                          </span>
                        ) : (
                          booking.status
                        )}
                      </p>
                    </div>
                    <FaMoneyBillAlt className="text-secondary text-3xl" />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No travel history found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
