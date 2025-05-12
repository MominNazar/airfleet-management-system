const CrewAssignment = require('../models/CrewAssignment');
const Flight = require('../models/Flight');
const User = require('../models/User');

// Assign a crew member to a flight
exports.assignCrew = async (req, res) => {
  const { crewMemberId, flightId } = req.body;

  try {
    const crewMember = await User.findById(crewMemberId);
    const flight = await Flight.findById(flightId);

    if (!crewMember || crewMember.role !== 'Crew') {
      return res.status(400).json({ message: 'Invalid crew member.' });
    }

    if (!flight) {
      return res.status(400).json({ message: 'Invalid flight.' });
    }

    // Check if crew member is already assigned
    const existingAssignment = await CrewAssignment.findOne({ crewMemberId, flightId });
    if (existingAssignment) {
      return res.status(400).json({ message: 'This crew member is already assigned to this flight.' });
    }

    // Assign crew member
    const crewAssignment = new CrewAssignment({ crewMemberId, flightId });
    await crewAssignment.save();

    flight.crewAssigned.push(crewMemberId);
    await flight.save();

    res.status(200).json({ message: 'Crew member assigned successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning crew member' });
  }
};

// Remove crew member from a flight
exports.removeCrew = async (req, res) => {
  const { crewMemberId, flightId } = req.body;

  try {
    const crewAssignment = await CrewAssignment.findOneAndDelete({ crewMemberId, flightId });

    if (!crewAssignment) {
      return res.status(400).json({ message: 'Crew member not assigned to this flight.' });
    }

    const flight = await Flight.findById(flightId);
    flight.crewAssigned = flight.crewAssigned.filter(id => id.toString() !== crewMemberId.toString());
    await flight.save();

    res.status(200).json({ message: 'Crew member removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing crew member' });
  }
};

// Update crew member's flight assignment
exports.updateCrew = async (req, res) => {
  const { crewMemberId, oldFlightId, newFlightId } = req.body;

  try {
    const crewAssignment = await CrewAssignment.findOne({ crewMemberId, flightId: oldFlightId });
    if (!crewAssignment) {
      return res.status(400).json({ message: 'Crew member not assigned to the old flight.' });
    }

    crewAssignment.flightId = newFlightId;
    await crewAssignment.save();

    const oldFlight = await Flight.findById(oldFlightId);
    oldFlight.crewAssigned = oldFlight.crewAssigned.filter(id => id.toString() !== crewMemberId.toString());
    await oldFlight.save();

    const newFlight = await Flight.findById(newFlightId);
    newFlight.crewAssigned.push(crewMemberId);
    await newFlight.save();

    res.status(200).json({ message: 'Crew member reassigned successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error reassigning crew member' });
  }
};

// List all crew members assigned to a flight
exports.listAssignedCrew = async (req, res) => {
  const { flightId } = req.query;

  try {
    const flight = await Flight.findById(flightId).populate('crewAssigned');
    if (!flight) {
      return res.status(400).json({ message: 'Flight not found.' });
    }

    res.status(200).json(flight.crewAssigned);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned crew' });
  }
};
