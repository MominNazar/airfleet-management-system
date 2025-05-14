import React from "react";
import { createPortal } from "react-dom"; // To render the modal outside the main component

const Modal = ({ isOpen, onClose, flightDetails }) => {
  if (!isOpen) return null; // Do not render the modal if not open

  return createPortal(
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
        <div className="space-y-4">
          <p><strong>Flight Number:</strong> {flightDetails.flightNumber}</p>
          <p><strong>Status:</strong> {flightDetails.status}</p>
          <p><strong>Location:</strong> {flightDetails.location}</p>
          <p><strong>Speed:</strong> {flightDetails.speed}</p>
          <p><strong>Altitude:</strong> {flightDetails.altitude}</p>
          <p><strong>Seat Capacity:</strong> {flightDetails.seatCapacity}</p>
          <p><strong>Available Seats:</strong> {flightDetails.availableSeats}</p>
          <p><strong>Departure Time:</strong> {new Date(flightDetails.departureTime).toLocaleString()}</p>
          <p><strong>Arrival Time:</strong> {new Date(flightDetails.arrivalTime).toLocaleString()}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body // Render the modal outside the main DOM
  );
};

export default Modal;
