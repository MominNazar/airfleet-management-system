import React, { useState } from "react";
import Navbar from "../../components/Navbar"; // Adjust the path to your Navbar component

const AboutUs = () => {
  // State to handle the visibility of the expanded content
  const [showMore, setShowMore] = useState(false);

  // Function to toggle the expanded content
  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl max-w-3xl text-center mb-4">
          Welcome to <span className="text-orange-500">AirFleet.com</span>! We are passionate about delivering seamless flight scheduling and exceptional airline management services.
        </p>
        <p className="text-xl max-w-3xl text-center">
          Our mission is to revolutionize the aviation industry with cutting-edge technology and unparalleled customer service. Fly with us for a better tomorrow!
        </p>
        
        {/* Conditional Rendering of More Content */}
        {showMore && (
          <div className="mt-8 max-w-3xl text-center text-xl">
            <p>
              AirFleet.com was founded with the vision of streamlining the aviation industry through innovative technologies and top-tier customer service. 
              We work tirelessly to provide an effortless and delightful experience for both our users and employees. 
            </p>
            <p className="mt-4">
              From advanced flight scheduling systems to real-time updates, we ensure that our services are always accessible and reliable. 
              Join us as we continue to push boundaries and shape the future of air travel!
            </p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleLearnMore} // Toggle the content visibility
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
          >
            {showMore ? "Show Less" : "Learn More"} {/* Button Text Changes Based on State */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
