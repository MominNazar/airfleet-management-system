const mongoose = require('mongoose');

const crewAssignmentSchema = new mongoose.Schema({
  crewMemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }, // Reference to Flight
  assignmentDate: { type: Date, default: Date.now },
  status: { type: String, default: "Assigned" }, // Default status is "Assigned"
  requestNotes: { type: String, default: "" },
  adminApproval: { type: Boolean, default: false }, // Whether the assignment is approved by the admin
});

module.exports = mongoose.model('CrewAssignment', crewAssignmentSchema);
