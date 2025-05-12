import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import seaticon from "../../assets/images/chair.png"; // Import the seat icon

const SeatSelection = () => {
  const [flightData, setFlightData] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse passengerId and flightId from the URL query string
  const params = new URLSearchParams(location.search);
  const passengerId = params.get("passengerId");
  const flightId = params.get("flightId");

  // Fetch flight data from API
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(`https://airplane-management-system-chi.vercel.app/api/flights/${flightId}`);
        const flight = response.data;

        setFlightData(flight);

        // Generate seat layout
        const rows = Math.ceil(flight.seatCapacity / 6); // Assume 6 seats per row (A-F)
        const layout = [];
        let seatCount = 0;

        for (let row = 1; row <= rows; row++) {
          const rowSeats = [];
          for (let col of ["A", "B", "C", "D", "E", "F"]) {
            seatCount++;
            rowSeats.push({
              row,
              seat: col,
              isAvailable: seatCount <= flight.availableSeats,
            });
          }
          layout.push(...rowSeats);
        }
        setSeatLayout(layout);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlightData();
  }, [flightId]);

  // Handles seat selection
  const handleSelectSeat = (seat) => {
    if (seat.isAvailable) {
      const isSelected = selectedSeats.some((s) => s.row === seat.row && s.seat === seat.seat);
      if (isSelected) {
        // Deselect the seat
        setSelectedSeats(selectedSeats.filter((s) => !(s.row === seat.row && s.seat === seat.seat)));
      } else {
        // Select the seat
        setSelectedSeats([...selectedSeats, seat]);
      }
    } else {
      alert("This seat is already booked.");
    }
  };

  // Calculate the total price based on selected seats
  useEffect(() => {
    if (flightData) {
      setAmountPaid(selectedSeats.length * flightData.price);
    }
  }, [selectedSeats, flightData]);

  // Confirm seat selection and book
  const handleConfirmBooking = async () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat.");
      return;
    }

    const seatNumbers = selectedSeats.map((seat) => `${seat.row}${seat.seat}`);
    try {
      await axios.post("https://airplane-management-system-chi.vercel.app/api/bookings/book", {
        passengerId,
        flightId,
        seatNumbers,
        amountPaid,
      });

      // SweetAlert2 popup
      Swal.fire({
        icon: "success",
        title: "Flight Booked Successfully!",
        text: `Your seats: ${seatNumbers.join(", ")}`,
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/passenger/tracking`); // Navigate after popup confirmation
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Failed to confirm booking. Please try again.",
        confirmButtonText: "Retry",
      });
    }
  };

  if (!flightData) {
    return <div className="text-center text-white">Loading flight data...</div>;
  }

  return (
    <div className="bg-gray-200 text-black">
      <h2 className="md:text-3xl text-lg font-bold text-center text-black mb-4">Select Your Seat</h2>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border-4 border-black mt-6 mb-6">
        {/* Seat Selection Section and Payment Section in Flex */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Seat Selection Section */}
          <div className="lg:w-2/3 sm:w-full bg-gray-200 p-6 rounded-lg shadow-lg mb-6 border-2 border-black">
          <div
  className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6 overflow-y-auto max-h-[500px] p-2 bg-gray-300 rounded-lg scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200"
>
  {seatLayout.map((seat, index) => (
    <button
      key={index}
      className={`p-2 rounded-lg font-semibold text-sm ${seat.isAvailable
        ? selectedSeats.some((s) => s.row === seat.row && s.seat === seat.seat)
          ? "bg-accent-yellow text-white" // Yellow for selected seats
          : "bg-gray-100 hover:bg-accent-yellow hover:text-white" // Default available seat color
        : "bg-red-500 cursor-not-allowed" // Red for unavailable (booked) seats
        }`}
      onClick={() => handleSelectSeat(seat)}
      disabled={!seat.isAvailable}
    >
      {seat.row}
      {seat.seat}
    </button>
  ))}
</div>

          </div>

          {/* Payment Section */}
          <div className="lg:w-1/3 w-full bg-gray-200 p-6 rounded-lg shadow-lg border-2 border-black">
            <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
            <div className="text-lg mb-4">
              <p>
                <strong>Flight Number:</strong> {flightData.flightNumber}
              </p>
              <p>
                <strong>Destination:</strong> {flightData.destination}
              </p>
              <p>
                <strong>Price per Seat:</strong> ${flightData.price}
              </p>
            </div>

            {/* Display each selected seat */}
            {selectedSeats.length > 0 && (
              <div className="bg-gray-300 p-4 rounded-lg mb-4">
                <h4 className="text-lg font-semibold mb-2">Selected Seats</h4>
                {selectedSeats.map((seat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-2"
                  >
                    <div className="flex items-center">
                      {/* Seat Icon (use any icon or image for this) */}
                      <img src={seaticon} alt="Seat Icon" className="w-8 h-8 mr-4" />
                      <span className="font-semibold text-lg">
                        {seat.row}{seat.seat}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${flightData.price}</p>
                    </div>
                  </div>
                ))}
                {/* Total Payment */}
                <div className="border-t-2 border-gray-400 pt-4 mt-4">
                  <p className="font-semibold text-xl">
                    <strong>Total Payment: </strong>${amountPaid}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleConfirmBooking}
              className="bg-green-500 py-3 px-6 w-full rounded-full text-white hover:bg-gray-800 font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
