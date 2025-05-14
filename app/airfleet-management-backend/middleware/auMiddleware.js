const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId); // Use userId instead of id
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      req.user = user; // Attach user to the request
      next();
    } catch (error) {
      console.error('Authentication error:', error.message); // Log error for debugging
      res.status(401).json({ error: 'Invalid or expired token.' });
    }
  };
  
  module.exports = authenticate;
  