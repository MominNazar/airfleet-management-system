const mongoose = require("mongoose");

const withdrawalRequestSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestStatus: { type: String, default: "Pending" }, // "Pending", "Approved", "Rejected"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WithdrawalRequest", withdrawalRequestSchema);
