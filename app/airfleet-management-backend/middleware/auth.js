const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model for admins

// Verify if the user is an admin
exports.verifyAdmin = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      console.log(decoded);  // Log decoded token
  
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: 'Not authorized' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: 'Invalid token' });
    }
  };
  
