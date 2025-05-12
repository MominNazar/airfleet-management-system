const WithdrawalRequest = require("../../models/WithdrawalRequest");

// Create a withdrawal request
exports.createWithdrawalRequest = async (req, res) => {
  try {
    const { flightId, userId } = req.body;

    if (!flightId || !userId) {
      return res.status(400).json({ message: "Flight ID and User ID are required." });
    }

    const newRequest = new WithdrawalRequest({ flightId, userId });
    await newRequest.save();

    res.status(201).json({ message: "Withdrawal request created successfully.", newRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get all withdrawal requests
exports.getAllWithdrawalRequests = async (req, res) => {
  try {
    const requests = await WithdrawalRequest.find().populate("flightId").populate("userId");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Update withdrawal request status
exports.updateWithdrawalRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(requestStatus)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const updatedRequest = await WithdrawalRequest.findByIdAndUpdate(
      id,
      { requestStatus, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Withdrawal request not found." });
    }

    res.status(200).json({ message: "Request status updated.", updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
// Delete a withdrawal request
exports.deleteWithdrawalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await WithdrawalRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Withdrawal request not found." });
    }

    res.status(200).json({ message: "Withdrawal request deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
