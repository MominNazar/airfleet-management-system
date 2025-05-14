const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.addUser = async (req, res) => {
  try {
    const { role, firstName, lastName, email, password, contactDetails, travelPreferences, status, booking } = req.body;

    // Validate role
    if (!role || (role !== 'Crew' && role !== 'Passenger')) {
      return res.status(400).json({ message: 'Invalid role. Role must be either "Crew" or "Passenger".' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      passwordHash,
      contactDetails,
      travelPreferences: role === 'Passenger' ? travelPreferences || [] : undefined, // Add travel preferences only for passengers
      status: role === 'Crew' ? status || 'Active' : undefined, // Add status only for crew members, default to 'Active'
      booking: role === 'Crew' ? booking || '' : undefined,    // Add booking only for crew members, default to empty string
    });

    // Save the user to the database
    await newUser.save();

    // Return the response
    res.status(201).json({ message: `${role} added successfully`, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};
// Get all users (Crew + Passengers)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
// Get all crew members
exports.getAllCrew = async (req, res) => {
  try {
    const crewMembers = await User.find({ role: 'Crew' });
    res.status(200).json(crewMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crew members', error: error.message });
  }
};

// Get all passengers
exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await User.find({ role: 'Passenger' });
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching passengers', error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      email,
      role,
      contactDetails,
      travelPreferences,
      status,
      booking, // Include booking here
    } = req.body;

    const updateFields = {
      firstName,
      lastName,
      email,
      role,
      contactDetails,
    };

    // Conditionally add travelPreferences and booking for Passengers
    if (role === 'Passenger') {
      updateFields.travelPreferences = travelPreferences;
      updateFields.booking = booking; // Add booking for passengers
    }

    // Conditionally add status for Crew
    if (role === 'Crew') {
      updateFields.status = status;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
