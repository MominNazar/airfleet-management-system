// controllers/passengerController.js
// controllers/passengerController.js
  const mongoose = require('mongoose');
const User = require('../../models/User');
// Function to update user profile
const updateProfile = async (req, res) => {
    try {
      const { userId } = req.params; // Get the userId from params
      const updatedData = req.body; // Get the updated profile data from request body
  
      // Clean up any extra whitespace or newline characters from the userId
      const cleanUserId = userId.trim();
  
      // Validate if the userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      // Find the user by userId
      const user = await User.findById(cleanUserId);
  
      if (!user || user.role !== 'Passenger') {
        return res.status(404).json({ message: 'User is not a passenger or does not exist' });
      }
  
      // Check if the email is being updated, and if so, ensure it's unique
      if (updatedData.email && updatedData.email !== user.email) {
        const existingUser = await User.findOne({ email: updatedData.email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email address already exists' });
        }
      }
  
      // Ensure required fields are provided in updatedData
      const requiredFields = ['firstName', 'lastName', 'email']; // Add any additional required fields
      for (let field of requiredFields) {
        if (!updatedData[field]) {
          return res.status(400).json({ message: `${field} is required` });
        }
      }
  
      // Update the user document with the updated data
      const updatedUser = await User.findByIdAndUpdate(
        cleanUserId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
// Function to get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from params

    // Clean up any extra whitespace or newline characters from the userId
    const cleanUserId = userId.trim();

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Find the user by userId
    const user = await User.findById(cleanUserId);

    if (!user || user.role !== 'Passenger') {
      return res.status(404).json({ message: 'User is not a passenger or does not exist' });
    }

    res.status(200).json({ message: 'User profile retrieved successfully', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateProfile, getProfile };
