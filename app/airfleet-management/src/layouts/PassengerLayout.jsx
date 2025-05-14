import React from "react";
import PassengerNavbar from "../components/Passenger/PNavbar"; // Including the navbar
import { Outlet } from "react-router-dom"; // Used for nested routes

const PassengerLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto overflow-x-hidden"> {/* Keep vertical scroll, remove horizontal scroll */}
      {/* Navbar */}
      <PassengerNavbar /> {/* Passenger Navbar */}

      {/* Main Content Area */}
      <div
        className=""
      >
        <Outlet />
      </div>
    </div>
  );
};

export default PassengerLayout;
