import React, { useEffect, useState } from "react";
import Modal from "../../components/crewMembers/Modal"; // Import the modal

const AssignedFlights = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch flights data from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("https://airplane-management-system-chi.vercel.app/api/flights");
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Fetch flight details for a particular flight
  const fetchFlightDetails = async (flightId) => {
    try {
      const response = await fetch(`https://airplane-management-system-chi.vercel.app/api/flights/${flightId}`);
      const data = await response.json();
      setSelectedFlightDetails(data);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching flight details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlightDetails(null);
  };

  return (
    <div className="min-h-screen bg-white px-6 lg:px-12">
      {/* Header */}
      <h2 className="text-3xl font-medium text-center text-gray-800 mb-8">
        Assigned Flights
      </h2>

      {/* Table Section */}
      <div className="overflow-x-auto bg-gray-200 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-100">
        <table className="table-auto  w-full bg-white rounded-lg shadow-md">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="py-2 px-2 md:py-4 md:px-6 text-left text-xs md:text-base font-medium">
                Flight Number
              </th>
              <th className="py-1 px-1 md:py-4 md:px-6 text-left text-xs md:text-base font-medium">
                Departure Time
              </th>
              <th className="py-1 px-1 md:py-4 md:px-6 text-left text-xs md:text-base font-medium">
                Destination
              </th>
              <th className="py-1 px-1 md:py-4 md:px-6 text-left text-xs md:text-base font-medium">
                Status
              </th>
              <th className="py-1 px-1 md:py-4 md:px-6 text-left text-xs md:text-base font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {flights.map((flight) => (
              <tr
                key={flight._id}
                className="border-t border-b hover:bg-gray-100 transition duration-300"
              >
                <td className="py-1 px-1 text-xs md:text-base">
                  {flight.flightNumber}
                </td>
                <td className="py-1 px-1 text-xs md:text-base">
                  {new Date(flight.departureTime).toLocaleString()}
                </td>
                <td className="py-1 px-1 text-xs md:text-base">
                  {flight.destination}
                </td>
                <td className="py-1 px-1 text-xs md:text-base">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-white text-xs md:text-sm ${
                      flight.status === "Completed"
                        ? "bg-green-700"
                        : flight.status === "In Air"
                        ? "bg-blue-600"
                        : "bg-accent-orange-light"
                    }`}
                  >
                    {flight.status}
                  </span>
                </td>
                <td className="py-1 px-1 text-xs md:text-base">
                  <button
                    onClick={() => fetchFlightDetails(flight._id)}
                    className="bg-bg-secondary text-white hover:bg-gray-700 py-2 px-2 rounded-md text-xs transition duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show flight details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        flightDetails={selectedFlightDetails || {}}
      />
    </div>
  );
};

export default AssignedFlights;
