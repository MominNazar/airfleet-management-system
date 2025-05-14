import React from "react";
import PassengerNavbar from "../components/crewMembers/CNavbar"; // Including the navbar
import { Outlet } from "react-router-dom"; // Used for nested routes
import planeImage from "../assets/images/plane.jpg";

const CrewLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto overflow-x-hidden"> {/* Keep vertical scroll, remove horizontal scroll */}
      {/* Navbar */}
      <PassengerNavbar /> {/* Passenger Navbar */}

      {/* Main Content Area */}
      <div
        className="w-full h-full"
        style={{
          backgroundColor: "#fdfd96", // Yellowish fallback
          backgroundImage: `url(${planeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default CrewLayout;
