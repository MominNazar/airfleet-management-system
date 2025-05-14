import React, { useState } from "react";
import { FaBars, FaTimes, FaUserAlt, FaBell } from "react-icons/fa"; // Import FA Icons
import { NavLink } from "react-router-dom"; // Import NavLink for active link styling
import AirFleet from "../../assets/images/AirFleet.png"; // AirFleet Logo Image

const CrewNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white p-4 text-center mx-0 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={AirFleet} // Add your logo image here
            alt="AirFleet Logo"
            className="w-8 h-8"
          />
          <NavLink to="/" className="text-2xl font-bold text-secondary">
            AirFleet
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 items-center">
          {/* Links to Crew Member routes */}
          {[
            { label: "Dashboard", path: "/crew/dashboard" },
            { label: "Assigned Flights", path: "/crew/assigned-flights" },
            { label: "Withdrawal Requests", path: "/crew/flight-withdrawal" },
            { label: "Flight Status", path: "/crew/flight-status" },
            { label: "Tracking Panel", path: "/crew/tracking" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="nav-link text-black py-2 px-4 transition-all duration-300 ease-in-out whitespace-nowrap hover:text-secondary active:text-secondary"
                activeClassName="text-secondary underline"
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* User and Notifications Icons */}
          <li className="relative">
            <NavLink to="/crew/profile">
              <FaUserAlt size={24} className="text-secondary hover:text-gray-800" />
            </NavLink>
          </li>
          <li className="relative">
            <NavLink to="/crew/notifications">
              <FaBell size={24} className="text-secondary hover:text-gray-800" />
            </NavLink>
          </li>

          {/* CTA Button */}
          <li>
            <NavLink
              to="/crew/assigned-flights"
              className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
              activeClassName="bg-secondary-dark"
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              View Flights
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <div
          className="lg:hidden flex items-center p-2 bg-white rounded-md border-none"
          onClick={toggleMenu}
        >
          <button className="text-secondary bg-white border-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Popup Panel) */}
      <div
        className={`lg:hidden fixed top-0 right-0 bg-white z-50 transition-all duration-300 ease-in-out transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } overflow-hidden w-full h-full`}
      >
        <div className="flex flex-col items-center justify-start space-y-6 pt-16">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button className="text-secondary bg-white" onClick={toggleMenu}>
              <FaTimes size={30} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          {[
            { label: "Dashboard", path: "/crew/dashboard" },
            { label: "Assigned Flights", path: "/crew/assigned-flights" },
            { label: "Withdrawal Requests", path: "/crew/flight-withdrawal" },
            { label: "Flight Status", path: "/crew/flight-status" },
            { label: "Tracking Panel", path: "/crew/tracking" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="text-black py-3 px-6 w-full text-center transition-all duration-300 ease-in-out "
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setMenuOpen(false)}
              activeClassName="text-secondary underline"
            >
              {item.label}
            </NavLink>
          ))}

          {/* User and Notifications Icons in Mobile Menu */}
          <div className="flex space-x-4 mt-6">
            <NavLink to="/crew/profile" className="relative">
              <FaUserAlt size={28} className="text-secondary" />
            </NavLink>
            <NavLink to="/crew/notifications" className="relative">
              <FaBell size={28} className="text-secondary" />
            </NavLink>
          </div>

          {/* CTA Button in Mobile Menu */}
          <NavLink
            to="/crew/assigned-flights"
            className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
            activeClassName="bg-secondary-dark"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            View Flights
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default CrewNavbar;
