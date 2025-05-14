const express = require('express');
const { addUser, getAllUsers,getAllCrew, getAllPassengers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();
const userController = require('../controllers/Passenger/LoyaltyCont');

// Route to add loyalty points
router.put('/loyalty/add/:userId', userController.addLoyaltyPoints);

// Route to redeem loyalty points
router.put('/loyalty/redeem/:userId', userController.redeemLoyaltyPoints);

// Route to get a user's loyalty points
router.get('/loyalty/:userId', userController.getLoyaltyPoints);
// Add a user (Crew or Passenger)
router.post('/', addUser);

// Get all crew members
router.get('/crew', getAllCrew);

// Get all passengers
router.get('/passengers', getAllPassengers);

// Update a user
router.put('/:userId', updateUser);

// Delete a user
router.delete('/:userId', deleteUser);

// Get all users (Crew + Passengers)
router.get('/', getAllUsers);
module.exports = router;
