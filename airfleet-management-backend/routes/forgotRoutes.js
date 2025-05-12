const express = require('express');
const { registerUser, loginUser } = require('../controllers/CrewController/authController');
const { requestPasswordReset, resetPassword } = require('../controllers/CrewController/forgotPass');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Password reset routes
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes for crew members
router.get('/admin/dashboard', protect(['Admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});
router.get('/crew/dashboard', protect(['Crew']), (req, res) => {
  res.json({ message: 'Welcome to the Crew Dashboard!' });
});

module.exports = router;
