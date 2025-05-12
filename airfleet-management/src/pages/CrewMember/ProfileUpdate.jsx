import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    availability: {
      monday: { start: "", end: "" },
      tuesday: { start: "", end: "" },
      wednesday: { start: "", end: "" },
      thursday: { start: "", end: "" },
      friday: { start: "", end: "" },
      saturday: { start: "", end: "" },
      sunday: { start: "", end: "" },
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing profile data dynamically based on logged-in crew email using JWT token
  const fetchProfile = async () => {
    const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
    if (!token) {
      console.error("No JWT token found in localStorage.");
      return;
    }

    try {
      const response = await fetch("https://airplane-management-system-chi.vercel.app/api/crew/getProfile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const data = await response.json();
      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        availability: data.availability,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profile data using JWT token
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("availability")) {
      const [_, day, time] = name.split("-");
      setUserData((prevData) => ({
        ...prevData,
        availability: {
          ...prevData.availability,
          [day]: {
            ...prevData.availability[day],
            [time]: value,
          },
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://airplane-management-system-chi.vercel.app/api/crew/updateProfile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      // Refresh the profile data to reflect changes
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating your profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h2 className="text-3xl font-medium text-center mb-6">Profile Update</h2>

      <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-secondary mb-4">Personal Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full sm:w-3/4 p-3 mb-4 bg-white rounded-lg text-gray-800 border border-black focus:ring focus:ring-yellow-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full sm:w-3/4 p-3 mb-4 bg-white rounded-lg text-gray-800 border border-black focus:ring focus:ring-yellow-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleInputChange}
            className="w-full sm:w-3/4 p-3 mb-4 bg-white rounded-lg text-gray-800 border border-black focus:ring focus:ring-yellow-500"
          />
          <h4 className="text-lg font-semibold text-secondary mb-2">Emergency Contact</h4>
          <input
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            value={userData.emergencyContactName}
            onChange={handleInputChange}
            className="w-full sm:w-3/4 p-3 mb-4 bg-white rounded-lg text-gray-800 border border-black focus:ring focus:ring-yellow-500"
          />
          <input
            type="tel"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            value={userData.emergencyContactPhone}
            onChange={handleInputChange}
            className="w-full sm:w-3/4 p-3 mb-4 bg-white rounded-lg text-gray-800 border border-black focus:ring focus:ring-yellow-500"
          />
        </div>

        {/* Availability Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-secondary mb-4">Modify Availability</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(userData.availability).map((day) => (
              <div key={day}>
                <label className="block text-gray-600">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    name={`availability-${day}-start`}
                    value={userData.availability[day].start}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 bg-white rounded-lg text-gray-800 border border-black"
                  />
                  <input
                    type="time"
                    name={`availability-${day}-end`}
                    value={userData.availability[day].end}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 bg-white rounded-lg text-gray-800 border border-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
