const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



// Example protected route
router.get('/admin/dashboard', protect(['Admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});
router.get('/passenger/dashboard', protect(['Passenger']), (req, res) => {
  res.json({ message: 'Welcome to the Passenger Dashboard!' });
});

module.exports = router;
