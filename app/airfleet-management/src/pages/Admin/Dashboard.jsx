import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // For redirection after failed auth

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeFlights: 0,
    totalPassengers: 0,
    pendingCrewRequests: 0,
    totalFlights: 0,
    onTimeFlights: 0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch('https://airplane-management-system-chi.vercel.app/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach token in the header
          },
        });

        if (response.status === 401 || response.status === 403) {
          navigate("/login");
        }

        const data = await response.json();
        if (data && data.data) {
          setStats(data.data); // Set the stats from the API response
        } else {
          console.error("No data received");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      {/* Header */}
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
        <h1 className="text-xl text-white font-bold">Airline Management</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-6 w-full overflow-y-auto">
        {/* Overview Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { label: "Active Flights", value: stats.activeFlights, color: "text-green-500" },
            { label: "Total Passengers", value: stats.totalPassengers, color: "text-blue-500" },
            { label: "Pending Crew Requests", value: stats.pendingCrewRequests, color: "text-red-500" },
            { label: "Total Flights", value: stats.totalFlights, color: "text-purple-500" },
            { label: "On-Time Flights", value: stats.onTimeFlights, color: "text-teal-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">{stat.label}</h2>
              <div className={`bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105`}>
                <p className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
