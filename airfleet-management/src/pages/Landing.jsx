import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPlane } from "react-icons/fa"; // Using a better airplane icon
import '../pages/CrewMember/crew.css'; // Assuming your custom styles
import airplane from '../assets/images/airplane.png'; // Import the airplane image

const LandingPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch flight schedule data from the AviationStack API
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true); // Set loading state to true when fetching starts
      try {
        const response = await axios.get("https://api.aviationstack.com/v1/flights", {
          params: {
            access_key: "d3e0db09f25f8190c59660e177761072", // Your API key
            limit: 100, // Adjust the limit if needed
          },
        });

        // Format the response data to match your application's structure
        const formattedFlights = response.data.data.map((flight) => ({
          _id: flight.flight.iata, // Use the IATA code as a unique identifier
          flightNumber: flight.flight.iata,
          origin: flight.departure.airport,
          destination: flight.arrival.airport,
          departureTime: flight.departure.scheduled,
          status: flight.flight_status,
        }));

        setFlights(formattedFlights);
      } catch (err) {
        console.error("Error fetching flight schedule:", err);
        setError("Failed to fetch flight schedule data.");
      } finally {
        setLoading(false); // Set loading state to false once data is fetched
      }
    };

    fetchFlights();
  }, []);

  // Function to get flight status class based on the flight status
  const getStatusClass = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-400 text-black"; // Yellow for scheduled
      case "completed":
        return "bg-green-400 text-white"; // Green for completed
      case "in_air":
        return "bg-blue-400 text-white"; // Blue for in air
      default:
        return "bg-gray-400 text-white"; // Default gray for unknown status
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://www.6seconds.org/wp-content/uploads/2016/05/qatar-emotional-intelligence-cabin.jpg')`,
        }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 text-center">
          <motion.h1
            className="text-5xl font-bold text-white leading-tight md:text-6xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to AirFleet
          </motion.h1>
        </div>
      </section>

      {/* Flight Schedule Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-secondary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Upcoming Flights
          </motion.h2>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-secondary"></div>
            </div>
          )}

          {/* Error Handling */}
          {error && <div className="text-xl text-red-600">{error}</div>}

          {/* Marquee for Flight Schedule */}
          <div className="overflow-hidden">
            <div className="flex space-x-6 animate-marquee py-6">
              {/* Upper Flight Divs (first 10 flights, starts from left) */}
              {!loading && !error && flights.slice(0, 10).map((flight) => (
                <div
                  key={flight._id}
                  className="bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-[350px] min-w-[320px] max-w-[400px]"
                >
                  <img src={airplane} alt="Airplane" className="h-12 w-12" />
                  <div>
                    <h3 className="text-xl font-semibold">{flight.flightNumber}</h3>
                    <p className="text-gray-600">{flight.origin} → {flight.destination}</p>
                    <p className="text-sm text-gray-500">{new Date(flight.departureTime).toLocaleString()}</p>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusClass(flight.status)}`}>
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Flight Divs (next 10 flights, starts from right) */}
          <div className="overflow-hidden mt-6">
            <div className="flex space-x-6 animate-marquee-reverse py-6">
              {!loading && !error && flights.slice(10, 20).map((flight) => (
                <div
                  key={flight._id}
                  className="bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-[350px] min-w-[320px] max-w-[400px]"
                >
                  <img src={airplane} alt="Airplane" className="h-12 w-12" />
                  <div>
                    <h3 className="text-xl font-semibold">{flight.flightNumber}</h3>
                    <p className="text-gray-600">{flight.origin} → {flight.destination}</p>
                    <p className="text-sm text-gray-500">{new Date(flight.departureTime).toLocaleString()}</p>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusClass(flight.status)}`}>
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  {/* About Us Section */}
  <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-6">
            AirFleet is committed to offering safe, reliable, and affordable flights to a wide range of destinations. We strive to ensure that every journey is a memorable one. Whether you’re traveling for business or leisure, our world-class service and friendly staff are here to make your experience exceptional.
          </p>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <form className="max-w-md mx-auto space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border-2 text-black bg-gray-200 border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border-2 text-black bg-gray-200 border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 border-2 text-black bg-gray-200 border-gray-300 rounded-lg"
              rows="4"
            />
            <button
              type="submit"
              className="bg-secondary text-white  py-3 px-6 rounded-lg hover:bg-gray-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Fly?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Discover the skies with AirFleet. Your next adventure awaits!
          </p>
          <Link to="/login" className="bg-secondary hover:text-white text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800">
            Book Your Flight Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
