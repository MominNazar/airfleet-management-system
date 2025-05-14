import React, { useState, useEffect } from "react";
import axios from "axios";
import AirplaneIcon from "../../assets/images/airplane.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrewManagement = () => {
  const [crewMembers, setCrewMembers] = useState([]); // State for crew members
  const [flights, setFlights] = useState([]); // State for flights
  const [assignedCrew, setAssignedCrew] = useState([]); // State for assigned crew
  const [selectedCrew, setSelectedCrew] = useState(""); // Selected crew
  const [selectedFlight, setSelectedFlight] = useState(""); // Selected flight

  // Fetch data from the backend API on page load
  useEffect(() => {
    fetchCrewMembers();
    fetchFlights();
    fetchAssignedCrew();
  }, []);

  // Function to fetch Crew Members
  const fetchCrewMembers = () => {
    axios
      .get("https://airplane-management-system-chi.vercel.app/api/users/crew")
      .then((response) => setCrewMembers(response.data))
      .catch((error) => {
        console.error("Error fetching crew members:", error);
        toast.error("Error fetching crew members.");
      });
  };

  // Function to fetch Flights
  const fetchFlights = () => {
    axios
      .get("https://airplane-management-system-chi.vercel.app/api/flights")
      .then((response) => setFlights(response.data))
      .catch((error) => {
        console.error("Error fetching flights:", error);
        toast.error("Error fetching flights.");
      });
  };

  // Function to fetch assigned crew for flights
  const fetchAssignedCrew = () => {
    axios
      .get("https://airplane-management-system-chi.vercel.app/api/crew/assigned")
      .then((response) => setAssignedCrew(response.data))
      .catch((error) => {
        console.error("Error fetching assigned crew:", error);
        toast.error("Error fetching assigned crew.");
      });
  };

  // Handle assigning crew to a flight
  const handleAssignCrew = () => {
    if (selectedCrew && selectedFlight) {
      const newAssignment = {
        crewMemberId: selectedCrew,
        flightId: selectedFlight,
      };

      setAssignedCrew((prevAssignedCrew) => [
        ...prevAssignedCrew,
        {
          ...newAssignment,
          crewMemberId: { firstName: "Crew", lastName: "Member" }, // Placeholder
          flightId: { flightNumber: "Flight No.", destination: "Destination" }, // Placeholder
        },
      ]);

      axios
        .post("https://airplane-management-system-chi.vercel.app/api/crew/assign", newAssignment)
        .then((response) => {
          toast.success("Crew member assigned successfully.");
          fetchAssignedCrew(); // Re-fetch assigned crew after successful assignment
        })
        .catch((error) => {
          toast.error("Error assigning crew member.");
          console.error("Error:", error);
        });
    } else {
      toast.error("Please select both crew member and flight.");
    }
  };

  // Handle removing crew from a flight
  const handleRemoveCrew = (crewId, flightId) => {
    setAssignedCrew((prevAssignedCrew) =>
      prevAssignedCrew.filter(
        (assignment) =>
          assignment.crewMemberId._id !== crewId || assignment.flightId._id !== flightId
      )
    );

    axios
      .delete("https://airplane-management-system-chi.vercel.app/api/crew/remove", {
        data: { crewMemberId: crewId, flightId },
      })
      .then(() => {
        toast.success("Crew member removed successfully.");
        fetchAssignedCrew(); // Re-fetch assigned crew after successful removal
      })
      .catch((error) => {
        toast.error("Error removing crew member.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white text-gray-800">
      {/* Header */}
      <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
  <h1 className="text-xl font-bold text-white">Crew Management</h1>
</div>


      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Assign Crew Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Assign Crew</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crew Member Select */}
            <select
              value={selectedCrew}
              onChange={(e) => setSelectedCrew(e.target.value)}
              className="p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-accent-yellow"
            >
              <option value="">Select Crew Member</option>
              {crewMembers.length === 0 ? (
                <option disabled>No crew members available</option>
              ) : (
                crewMembers.map((crew) => (
                  <option key={crew._id} value={crew._id}>
                    {crew.firstName} {crew.lastName} - {crew.role}
                  </option>
                ))
              )}
            </select>

            {/* Flight Select */}
            <select
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
              className="p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-accent-yellow"
            >
              <option value="">Select Flight</option>
              {flights.map((flight) => (
                <option key={flight._id} value={flight._id}>
                  {flight.flightNumber} - {flight.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Assign Crew Button */}
          <button
            onClick={handleAssignCrew}
            className="mt-4 w-full bg-accent-orange-light py-2 rounded-lg font-semibold hover:bg-gray-800  transition text-white"
          >
            Assign Crew
          </button>
        </div>

        {/* Assigned Crew List */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Assigned Crew</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
            {assignedCrew.length === 0 ? (
              <p>No crew assigned yet.</p>
            ) : (
              assignedCrew.map((assignment) => (
                <div key={assignment._id} className="flex justify-between p-3 bg-gray-100 rounded-lg shadow text-sm">
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <img src={AirplaneIcon} alt="Flight Logo" className="w-8 h-8" />
                    <p>
                      Crew: {assignment.crewMemberId.firstName} {assignment.crewMemberId.lastName}, Flight: {assignment.flightId.flightNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveCrew(assignment.crewMemberId._id, assignment.flightId._id)}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CrewManagement;
