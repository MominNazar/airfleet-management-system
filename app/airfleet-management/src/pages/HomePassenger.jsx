import React from "react";
import Navbar from "../components/Passenger/PNavbar"; // Assuming Passenger Navbar
import HeroSection from "../components/HeroSection"; // Hero Section Component

const HomePassenger = () => {
  return (
    <div className="flex flex-col h-screen w-screen m-0 p-0">
      {/* Navbar for Passenger */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
    </div>
  );
};

export default HomePassenger;
