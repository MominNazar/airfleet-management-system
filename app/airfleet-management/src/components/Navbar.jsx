import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import FA Icons
import { NavLink } from "react-router-dom"; // Import NavLink for routing

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white p-4 text-center shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <NavLink to="/" className="text-2xl font-bold text-secondary">
            AirFleet
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 items-center">
        

          {/* Login/Signup Button */}
          <li>
            <NavLink
              to="/login"
              className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
              activeClassName="bg-secondary-dark"
            >
              Login/Signup
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

      {/* Mobile Menu */}
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

          {/* Mobile Navigation Links */}
          

          {/* Login/Signup Button */}
          <NavLink
            to="/login"
            className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
            activeClassName="bg-secondary-dark"
            onClick={() => setMenuOpen(false)}
          >
            Login/Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
