import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaPlane,
  FaBell,
  FaComments,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); // To highlight the active link.

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/crew-management", icon: <FaUsers />, label: "Crew Management" },
    { to: "/admin/flight-schedule", icon: <FaPlane />, label: "Flight Schedule" },
    { to: "/admin/user-management", icon: <FaUsers />, label: "User Management" },
    { to: "/admin/notifications", icon: <FaBell />, label: "Notifications" },
    { to: "/admin/feedback", icon: <FaComments />, label: "Feedback" },
    { to: "/admin/tracking", icon: <FaMapMarkerAlt />, label: "Tracking" },
  ];

  return (
    <div className={`flex h-screen ${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300`}>
      {/* Sidebar */}
      <div
        className={`w-64 h-screen sidebar bg-white text-black p-6 fixed top-0 left-0 ${isSidebarOpen ? "" : "hidden"} md:block shadow-lg`}
      >
        {/* Logo and Admin Panel Link */}
        <div className="text-center text-2xl font-bold mb-6 text-maroon-600">
          <Link to="/admin/dashboard" className="no-underline text-black px-3">
            <FaHome className="mb-2 md:inline-block hidden text-maroon-600" />
            Admin Panel
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center text-lg hover:bg-secondary hover:text-white text-black px-4 py-3 rounded transition-colors duration-300 space-x-3 ${
                  location.pathname === link.to
                    ? "bg-secondary text-white"
                    : "text-black hover:bg-gray-200"
                }`}
              >
                {link.icon}
                <span className="text-sm sm:text-md">{link.label}</span> {/* Adjust text size for smaller screens */}
              </Link>
            </li>
          ))}
        </ul>

        {/* Log Out Button */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <Link
            to="/"
            className="flex items-center text-lg text-black hover:text-red-500 px-4 py-3 rounded transition-colors duration-300 space-x-3"
          >
            <FaSignOutAlt />
            <span className="text-sm sm:text-lg">Log Out</span> {/* Adjust text size */}
          </Link>
        </div>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 left-2 z-50 bg-maroon-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaHome className="text-xl" />
      </button>
    </div>
  );
};

export default AdminSidebar;
