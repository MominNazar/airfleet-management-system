require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const crewRoutes = require('./routes/crewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const withdrawalRoutes = require('./routes/withdrawRoutes');
const bookingRoutes = require('./routes/bookingRoutes');  // Import the new booking routes
const passengerRoutes = require('./routes/updateProfile');
const airportRoutes = require('./routes/airportRoutes');
const stripeRoutes = require("./routes/stripeRoutes");

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit the process if the DB connection fails
});

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/users', userRoutes);  // Use the user routes for all /api/users endpoints
app.use("/api/flights", flightRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use('/api/bookings', bookingRoutes); // Use the booking routes
app.use('/api/passengers', passengerRoutes);
// Routes
app.use('/api/airport', airportRoutes);
app.use("/api/stripe", stripeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
