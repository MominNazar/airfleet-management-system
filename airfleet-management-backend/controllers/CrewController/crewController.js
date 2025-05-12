const Crew = require('../../models/Crew/Crew');

// Create or Update Crew Profile
exports.updateCrewProfile = async (req, res) => {
  try {
    const { name, email, phone, emergencyContactName, emergencyContactPhone, availability } = req.body;

    // Find crew by email and update if exists; otherwise, create a new one
    const crew = await Crew.findOneAndUpdate(
      { email }, // Search condition
      {
        name,
        phone,
        emergencyContactName,
        emergencyContactPhone,
        availability,
        updatedAt: Date.now(),
      },
      { new: true, upsert: true } // Return the updated document; create new if not found
    );

    res.status(200).json({ message: 'Profile updated successfully!', crew });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile.', error });
  }
};

// Get Crew Profile by Email
exports.getCrewProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const crew = await Crew.findOne({ email });

    if (!crew) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json(crew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profile.', error });
  }
};
