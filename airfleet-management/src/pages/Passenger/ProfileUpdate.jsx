import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    seatPreference: "",
    mealPreference: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  useEffect(() => {
    // Get userId from localStorage
    const userId = localStorage.getItem("PassID");
    if (userId) {
      // Fetch user data from the backend
      axios
        .get(`https://airplane-management-system-chi.vercel.app/api/passengers/profile/${userId}`)
        .then((response) => {
          const userData = response.data.user;
          
          // Check if travelPreferences exists and has values
          const seatPreference = userData.travelPreferences && userData.travelPreferences[0] ? userData.travelPreferences[0] : "";
          const mealPreference = userData.travelPreferences && userData.travelPreferences[1] ? userData.travelPreferences[1] : "";
  
          setFormData({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.contactDetails ? userData.contactDetails.phone : "",
            emergencyContactName: userData.contactDetails ? userData.contactDetails.emergencyContact : "",
            emergencyContactPhone: userData.contactDetails ? userData.contactDetails.emergencyContact : "",
            seatPreference: seatPreference,
            mealPreference: mealPreference,
          });
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching profile data", error);
          setLoading(false); // Stop loading in case of error
        });
    }
  }, []);
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if necessary

    // Update the profile using PUT request
    const userId = localStorage.getItem("PassID");
    axios
      .put(`https://airplane-management-system-chi.vercel.app/api/passengers/update/${userId}`, {
        firstName: formData.fullName.split(" ")[0], // Extract first name from full name
        lastName: formData.fullName.split(" ")[1], // Extract last name from full name
        email: formData.email,
        contactDetails: {
          phone: formData.phone,
          emergencyContact: formData.emergencyContactPhone, // Assuming this is the emergency contact phone
        },
        travelPreferences: [formData.seatPreference, formData.mealPreference], // Assuming two preferences
      })
      .then((response) => {
        setMessage("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        setMessage("Failed to update profile.");
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Update Your Profile</h2>
      
      <div className="max-w-4xl mx-auto bg-white border-black border-2 p-8 rounded-lg shadow-lg">
        
        {message && (
          <div className="mb-6 text-green-500 font-semibold">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                placeholder="Emergency Contact Name"
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                placeholder="Emergency Contact Phone"
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* Travel Preferences */}
          <div>
            <h3 className="text-xl font-semibold">Travel Preferences</h3>
            <div className="space-y-4 mt-4">
              <select
                name="seatPreference"
                value={formData.seatPreference}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select Seat Preference</option>
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Middle">Middle</option>
              </select>
              <select
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select Meal Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-secondary hover:bg-gray-800 py-3 px-6 rounded-lg text-white  font-semibold w-full"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
