import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightSchedule = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNo: "",
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editFlightId, setEditFlightId] = useState(null);

  const API_URL = "https://airplane-management-system-chi.vercel.app/api/flights";

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get(API_URL);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      toast.error("Error fetching flights.");
    }
  };

  const handleAddFlight = async () => {
    if (!newFlight.flightNo || !newFlight.origin || !newFlight.destination || !newFlight.departure || !newFlight.arrival) {
      toast.warn("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        flightNumber: newFlight.flightNo,
        origin: newFlight.origin,
        destination: newFlight.destination,
        departureTime: newFlight.departure,
        arrivalTime: newFlight.arrival,
        seatCapacity: 200,
        availableSeats: 200,
        price: 100,
        crewAssigned: [],
      });
      setFlights((prevFlights) => [...prevFlights, response.data]);
      toast.success("Flight added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding flight:", error);
      toast.error("Failed to add flight.");
    }
  };

  const handleEditFlight = (id) => {
    const flightToEdit = flights.find((flight) => flight._id === id);
    setNewFlight({
      flightNo: flightToEdit.flightNumber,
      origin: flightToEdit.origin,
      destination: flightToEdit.destination,
      departure: flightToEdit.departureTime,
      arrival: flightToEdit.arrivalTime,
    });
    setIsEditing(true);
    setEditFlightId(id);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editFlightId}`, {
        flightNumber: newFlight.flightNo,
        origin: newFlight.origin,
        destination: newFlight.destination,
        departureTime: newFlight.departure,
        arrivalTime: newFlight.arrival,
      });
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight._id === editFlightId ? response.data : flight
        )
      );
      toast.success("Flight updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error saving flight edits:", error);
      toast.error("Failed to save changes.");
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== id));
      toast.success("Flight deleted successfully!");
    } catch (error) {
      console.error("Error deleting flight:", error);
      toast.error("Failed to delete flight.");
    }
  };

  const resetForm = () => {
    setNewFlight({ flightNo: "", origin: "", destination: "", departure: "", arrival: "" });
    setIsEditing(false);
    setEditFlightId(null);
  };

  return (
    <div>
    <ToastContainer />
    <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
  <h1 className="text-xl font-bold">Flight Schedules</h1>
</div>

  
    <div className="p-6 bg-white min-h-[600px] text-black space-y-6">
      {/* Add Flight Form */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="md:text-xl text-lg  font-semibold mb-4">
          {isEditing ? "Edit Flight" : "Add New Flight"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Flight No."
            value={newFlight.flightNo}
            onChange={(e) => setNewFlight({ ...newFlight, flightNo: e.target.value })}
            className="w-full p-3 text-sm bg-white text-black border rounded-md outline-black"
          />
          <input
            type="text"
            placeholder="Origin"
            value={newFlight.origin}
            onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
            className="w-full p-3 text-sm bg-white text-black border rounded-md outline-black"
          />
          <input
            type="text"
            placeholder="Destination"
            value={newFlight.destination}
            onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
            className="w-full p-3 text-sm bg-white text-black border rounded-md outline-black"
          />
          <input
            type="datetime-local"
            value={newFlight.departure}
            onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
            className="w-full p-3 text-sm bg-white text-black border rounded-md outline-black"
          />
          <input
            type="datetime-local"
            value={newFlight.arrival}
            onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
            className="w-full p-3 text-sm bg-white text-black border rounded-md outline-black"
          />
        </div>
        <button
          onClick={isEditing ? handleSaveEdit : handleAddFlight}
          className="mt-4 w-full py-3 text-sm text-white bg-accent-orange-light rounded-md hover:bg-gray-800 transition"
        >
          {isEditing ? "Save Changes" : "Add Flight"}
        </button>
      </div>
  
      {/* Flight Schedule Table */}
      <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Flight Schedule</h2>
        <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300">
          <table className="table-auto w-full text-sm border-collapse border border-gray-600">
            <thead className="sticky top-0 bg-gray-300 z-10">
              <tr>
                <th className="p-2 border border-gray-600 text-black text-left">Flight No.</th>
                <th className="p-2 border border-gray-600 text-black text-left">Origin</th>
                <th className="p-2 border border-gray-600 text-black text-left">Destination</th>
                <th className="p-2 border border-gray-600 text-black text-left">Departure</th>
                <th className="p-2 border border-gray-600 text-black text-left">Arrival</th>
                <th className="p-2 border border-gray-600 text-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 text-center text-gray-500">
                    No flights available.
                  </td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight._id} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-600">{flight.flightNumber}</td>
                    <td className="p-2 border border-gray-600">{flight.origin}</td>
                    <td className="p-2 border border-gray-600">{flight.destination}</td>
                    <td className="p-2 border border-gray-600">
                      {new Date(flight.departureTime).toLocaleString()}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {new Date(flight.arrivalTime).toLocaleString()}
                    </td>
                    <td className="p-2 border border-gray-600 text-center flex justify-center space-x-4">
                      <button
                        onClick={() => handleEditFlight(flight._id)}
                        className="px-4 py-2 text-white bg-accent-orange-light rounded-md hover:bg-gray-800 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFlight(flight._id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default FlightSchedule;
