import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the green tick icon from FontAwesome

const TravelHistory = () => {
  const [pastFlights, setPastFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null); // For the popup modal

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        if (!passengerId) {
          throw new Error("Passenger ID not found in local storage");
        }

        const response = await fetch(
          `https://airplane-management-system-chi.vercel.app/api/bookings/bookings/${passengerId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        const transformedFlights = data
          .filter((booking) => booking.status !== "Completed") // Exclude "Completed" flights
          .map((booking) => ({
            id: booking._id,
            flightNo: booking.flightId.flightNumber,
            origin: booking.flightId.origin,
            destination: booking.flightId.destination,
            departure: booking.flightId.departureTime,
            arrival: booking.flightId.arrivalTime,
            seatNumbers: booking.seatNumbers.join(", "),
            bookingDate: booking.bookingDate,
            amountPaid: booking.amountPaid,
            status: booking.status,
            paymentStatus: booking.paymentStatus,
          }));

        setPastFlights(transformedFlights);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleDownloadReceipt = (flight) => {
    const receiptContent = `Flight Number: ${flight.flightNo}
Origin: ${flight.origin}
Destination: ${flight.destination}
Departure: ${formatTime(flight.departure)}
Arrival: ${formatTime(flight.arrival)}
Seat Numbers: ${flight.seatNumbers}
Booking Date: ${formatTime(flight.bookingDate)}
Amount Paid: $${flight.amountPaid}
Status: ${flight.status}
Payment Status: ${flight.paymentStatus}`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${flight.flightNo}.txt`;
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "bg-red-500 text-white"; // Red for cancelled flights
      default:
        return "bg-gray-500 text-white"; // Gray for others
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl text-black font-bold mb-6 text-center">
        Your Travel History
      </h2>

      {/* Main Container */}
      <div className="max-w-7xl min-h-screen mx-auto bg-white p-6 rounded-lg shadow-lg border-4 border-black">
        {loading ? (
          <p className="text-center text-gray-300 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pastFlights.length > 0 ? (
          <div className="space-y-6 pr-4">
            {pastFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-md border border-gray-400 hover:scale-101 transform transition-transform duration-200 relative"
              >
                <div className="flex items-center justify-between">
                  {/* Green Tick Icon */}
                  <FaCheckCircle className="text-green-500 text-3xl sm:text-5xl" />

                  <div className="flex-1 ml-4">
                    <h3 className="text-lg sm:text-2xl text-secondary font-semibold mb-2">
                      Flight {flight.flightNo} - {flight.destination}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Origin: {flight.origin}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Departure: {formatTime(flight.departure)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Arrival: {formatTime(flight.arrival)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Seat Numbers: {flight.seatNumbers}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Amount Paid: ${flight.amountPaid}
                    </p>
                    {/* Status Label */}
                    <span
                      className={`inline-block text-xs sm:text-sm font-semibold py-1 px-3 rounded-full ${getStatusColor(
                        flight.status
                      )}`}
                    >
                      {flight.status}
                    </span>
                  </div>
                </div>

                {/* View Receipt Button at the bottom-right */}
                <button
                  onClick={() => setSelectedFlight(flight)}
                  className="absolute bottom-4 right-4 bg-green-500 text-white font-semibold py-1 px-4 sm:py-2 sm:px-6 rounded-full shadow hover:bg-green-400 transition-colors duration-200"
                >
                  View Receipt
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No past flights found.</p>
        )}
      </div>

      {/* Popup Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 text-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-80 sm:w-96">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Receipt for Flight {selectedFlight.flightNo}
            </h3>
            <p className="text-sm sm:text-base">Origin: {selectedFlight.origin}</p>
            <p className="text-sm sm:text-base">Destination: {selectedFlight.destination}</p>
            <p className="text-sm sm:text-base">Departure: {formatTime(selectedFlight.departure)}</p>
            <p className="text-sm sm:text-base">Arrival: {formatTime(selectedFlight.arrival)}</p>
            <p className="text-sm sm:text-base">Seat Numbers: {selectedFlight.seatNumbers}</p>
            <p className="text-sm sm:text-base">Booking Date: {formatTime(selectedFlight.bookingDate)}</p>
            <p className="text-sm sm:text-base">Amount Paid: ${selectedFlight.amountPaid}</p>
            <p className="text-sm sm:text-base">Status: {selectedFlight.status}</p>
            <p className="text-sm sm:text-base">Payment Status: {selectedFlight.paymentStatus}</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleDownloadReceipt(selectedFlight)}
                className="bg-green-500 text-white font-semibold py-1 px-4 sm:py-2 sm:px-6 rounded-full  hover:bg-green-400"
              >
                Download
              </button>
              <button
                onClick={() => setSelectedFlight(null)}
                className="bg-red-500 text-white font-semibold py-1 px-4 sm:py-2 sm:px-6 rounded-full hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelHistory;
