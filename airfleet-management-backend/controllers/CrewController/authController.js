const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Crew = require('../../models/Crew/Crew');  // Updated to Crew model

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, emergencyContactName, emergencyContactPhone, availability } = req.body;

    // Check if the crew member already exists
    const existingCrew = await Crew.findOne({ email });
    if (existingCrew) return res.status(400).json({ message: 'Email already exists' });

    // Create a new crew member
    const newCrewMember = new Crew({
      name,
      email,
      passwordHash: password,
      phone,
      emergencyContactName,
      emergencyContactPhone,
      availability,
    });

    await newCrewMember.save();
    res.status(201).json({ message: 'Crew member registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering crew member', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const crew = await Crew.findOne({ email });
    if (!crew) return res.status(404).json({ message: 'Crew member not found' });

    const isPasswordValid = await crew.comparePassword(password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = crew.generateAuthToken();
    res.json({ token, role: 'Crew'});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
