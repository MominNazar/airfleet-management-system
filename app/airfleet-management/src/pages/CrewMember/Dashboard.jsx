import React, { useState, useEffect } from "react";
import axios from "axios";
import "./crew.css";
import logo from "../../assets/images/airplane.png";
import straightlogo from "../../assets/images/offline.png";
const Dashboard = () => {
  const crewEmail = localStorage.getItem("crewEmail");

  const [assignedFlights, setAssignedFlights] = useState([]);
  const [otherFlights, setOtherFlights] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightResponse = await axios.get("https://airplane-management-system-chi.vercel.app/api/flights");
        const notificationResponse = await axios.get(`https://airplane-management-system-chi.vercel.app/api/notifications/byEmail/${crewEmail}`);

        setAssignedFlights(flightResponse.data.slice(0, 3));
        setOtherFlights(flightResponse.data.slice(3));
        setNotifications(Array.isArray(notificationResponse.data) ? notificationResponse.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
        setNotifications([]);
      }
    };

    fetchData();
  }, [crewEmail]);

  if (loading) {
    return <div className="text-center p-6">Loading data...</div>;
  }

  return (
    <div className="min-h-screen text-secondary bg-white p-6">
      <h2 className="text-3xl font-medium text-center mb-8 text-bg-secondary text-gray-800">Dashboard</h2>

      {/* Assigned Flights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {assignedFlights.map((flight) => (
          <div
            key={flight.id}
            className="bg-gray-200 py-6 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
          >
            {/* Flight Logo */}
            <img
              src={straightlogo}
              alt={`${flight.flightNumber} Logo`}
              className="h-16 w-16 object-contain mr-4"
            />
            {/* Flight Details */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-bg-secondary">{flight.flightNumber}</h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    flight.status === "Completed"
                      ? "bg-green-700 text-white"
                      : flight.status === "In Air"
                      ? "bg-blue-600 text-white"
                      : "bg-accent-orange-light text-white"
                  }`}
                >
                  {flight.status}
                </span>
              </div>
              <p className="text-gray-600">{flight.destination}</p>
              <p className="text-sm text-gray-500">Departure: {flight.departureTime}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Other Flights Section with Marquee */}
      {otherFlights.length > 0 && (
        <div className="overflow-hidden bg-gray-200 py-6 px-4 rounded-lg shadow-md mb-8 relative">
          <div className="whitespace-nowrap animate-marquee flex space-x-6">
            {otherFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-gray-300 py-6 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
              >
                {/* Flight Logo */}
                <img
                  src={logo}
                  alt={`${flight.flightNumber} Logo`}
                  className="h-12 w-12 object-contain mr-4"
                />
                {/* Flight Details */}
                <div className="min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-bg-secondary truncate">{flight.flightNumber}</h3>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        flight.status === "Completed"
                          ? "bg-green-700 text-white"
                          : flight.status === "In Air"
                          ? "bg-blue-600 text-white"
                          : "bg-accent-orange-light text-white"
                      }`}
                    >
                      {flight.status}
                    </span>
                  </div>
                  <p className="text-gray-600 truncate">{flight.destination}</p>
                  <p className="text-sm text-gray-500 truncate">Departure: {flight.departureTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Section */}
      <div className="bg-gray-200 py-6 px-4 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4 text-bg-secondary">Recent Notifications</h3>
        <div className="space-y-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm ${
                  notification.type === "critical"
                    ? "bg-red-100 text-red-600"
                    : notification.type === "warning"
                    ? "bg-yellow-100 text-yellow-600"
                    : notification.type === "info"
                    ? "bg-blue-100 text-blue-600"
                    : notification.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <p className="text-sm sm:text-base">{notification.message}</p>
                <p className="text-xs sm:text-sm mt-2">{notification.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
