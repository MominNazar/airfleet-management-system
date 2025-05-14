const User = require('../../models/User');

// Controller to add loyalty points to a user
const addLoyaltyPoints = async (req, res) => {
  const { pointsToAdd } = req.body;
  if (pointsToAdd <= 0) {
    return res.status(400).json({ message: 'Points to add must be greater than 0' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.updateLoyaltyPoints(pointsToAdd); // Call the method to update points

    res.status(200).json({
      message: `Successfully added ${pointsToAdd} points.`,
      loyaltyPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding loyalty points', error: error.message });
  }
};

// Controller to redeem loyalty points
const redeemLoyaltyPoints = async (req, res) => {
  const { pointsToRedeem } = req.body;

  if (pointsToRedeem <= 0) {
    return res.status(400).json({ message: 'Points to redeem must be greater than 0' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Redeem loyalty points
    await user.redeemPoints(pointsToRedeem);

    res.status(200).json({
      message: `Successfully redeemed ${pointsToRedeem} points.`,
      remainingPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error redeeming points', error: error.message });
  }
};

// Controller to get a user's loyalty points
const getLoyaltyPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      loyaltyPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loyalty points', error: error.message });
  }
};

module.exports = {
  addLoyaltyPoints,
  redeemLoyaltyPoints,
  getLoyaltyPoints,
};
