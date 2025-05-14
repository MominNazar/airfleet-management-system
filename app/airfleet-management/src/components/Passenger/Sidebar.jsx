import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white h-screen w-64 p-4">
      <h2 className="text-xl font-bold mb-6">Passenger Panel</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/passenger/dashboard"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/passenger/booking"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }
        >
          Book Flight
        </NavLink>
        <NavLink
          to="/passenger/history"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }
        >
          Travel History
        </NavLink>
        <NavLink
          to="/passenger/profile"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/passenger/tracking"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }
        >
          Flight Tracking
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
