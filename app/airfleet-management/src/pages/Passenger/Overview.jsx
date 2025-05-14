import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaServicestack, FaConciergeBell, FaStore, FaWifi } from "react-icons/fa"; // Importing FA icons

const AirportOverview = () => {
  const [airportServices, setAirportServices] = useState([]);
  const [airportLounges, setAirportLounges] = useState([]);
  const [airportShops, setAirportShops] = useState([]);
  const [airportAmenities, setAirportAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirportData = async () => {
    try {
      const [servicesResponse, loungesResponse, shopsResponse, amenitiesResponse] = await Promise.all([
        axios.get("https://airplane-management-system-chi.vercel.app/api/airport/services"),
        axios.get("https://airplane-management-system-chi.vercel.app/api/airport/lounges"),
        axios.get("https://airplane-management-system-chi.vercel.app/api/airport/shops"),
        axios.get("https://airplane-management-system-chi.vercel.app/api/airport/amenities")
      ]);

      setAirportServices(servicesResponse.data || []);
      setAirportLounges(loungesResponse.data || []);
      setAirportShops(shopsResponse.data || []);
      setAirportAmenities(amenitiesResponse.data || []);

      setLoading(false);
    } catch (err) {
      setError("There was an error fetching the data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirportData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Loading Airport Overview...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Airport Overview</h2>

      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg border-4 border-black">
        
        {/* Airport Services */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center">Airport Services <FaServicestack className="inline text-blue-500 text-4xl ml-2" /></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportServices.length > 0 ? (
              airportServices.map((service) => (
                <div key={service._id} className="bg-gray-200 p-6 rounded-lg shadow-md border-2 text-white border-gray-600 hover:scale-105 transform transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <FaConciergeBell className="text-4xl text-green-400 mr-4" />
                    <h4 className="text-xl font-semibold text-secondary">{service.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{service.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport services available.</p>
            )}
          </div>
        </section>

        {/* Airport Lounges */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center">Airport Lounges <FaConciergeBell className="inline text-accent-yellow text-4xl ml-2" /></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportLounges.length > 0 ? (
              airportLounges.map((lounge) => (
                <div key={lounge._id} className="bg-gray-200 p-6 rounded-lg shadow-md border-2 border-gray-600 hover:scale-105 transform transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <FaConciergeBell className="text-4xl text-accent-yellow mr-4" />
                    <h4 className="text-xl text-secondary font-semibold">{lounge.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{lounge.description}</p>
                  <p className="text-sm text-white px-2 mt-2 rounded-full bg-accent-yellow w-max">Location: {lounge.location}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport lounges available.</p>
            )}
          </div>
        </section>

        {/* Airport Shops */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center ">Airport Shops <FaStore className="inline text-secondary text-4xl ml-2" /></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportShops.length > 0 ? (
              airportShops.map((shop) => (
                <div key={shop._id} className="bg-gray-200 text-secondary p-6 rounded-lg shadow-md border-2 border-gray-600 hover:scale-105 transform transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <FaStore className="text-4xl text-blue-400 mr-4" />
                    <h4 className="text-xl font-semibold">{shop.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{shop.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No airport shops available.</p>
            )}
          </div>
        </section>

        {/* Airport Amenities */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center ">Airport Amenities <FaWifi className="inline text-purple-400 text-4xl ml-2" /></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportAmenities.length > 0 ? (
              airportAmenities.map((amenity) => (
                <div key={amenity._id} className="bg-gray-200 text-secondary p-6 rounded-lg shadow-md border-2 border-gray-600 hover:scale-105 transform transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <FaWifi className="text-4xl text-purple-400 mr-4" />
                    <h4 className="text-xl font-semibold">{amenity.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{amenity.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport amenities available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AirportOverview;
