const express = require("express");
const {
  createWithdrawalRequest,
  getAllWithdrawalRequests,
  updateWithdrawalRequestStatus,
  deleteWithdrawalRequest,
} = require("../controllers/CrewController/withdrawalController");

const router = express.Router();

// Route to create a withdrawal request
router.post("/", createWithdrawalRequest);

// Route to get all withdrawal requests
router.get("/", getAllWithdrawalRequests);

// Route to update the status of a withdrawal request
router.put("/:id", updateWithdrawalRequestStatus);
// New DELETE route
router.delete("/:id", deleteWithdrawalRequest);
module.exports = router;
