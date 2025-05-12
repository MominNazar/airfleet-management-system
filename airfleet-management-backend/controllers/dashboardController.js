const Flight = require('../models/Flight');
const User = require('../models/User');

// Dashboard Controller to fetch stats
exports.getDashboardData = async (req, res) => {
  try {
    // Fetch all scheduled flights and count them
    const scheduledFlights = await Flight.find({ status: 'Scheduled' });
    const activeFlights = scheduledFlights.length;  // Total scheduled flights

    // Fetch all passengers (assuming 'role' is a field in the User model)
    const passengers = await User.find({ role: 'Passenger' });
    const totalPassengers = passengers.length;

    // Dummy data for on-time flights (since it's related to crew members)
    // For now, we assume there are 10 on-time flights out of the scheduled ones.
    const onTimeFlights = 10; // Dummy data for now

    // Total flights count
    const totalFlights = scheduledFlights.length;

    // Pending crew requests (dummy count for now)
    const pendingCrewRequests = 5; // Dummy count

    // Prepare stats for the dashboard
    const dashboardStats = {
      activeFlights,
      totalPassengers,
      pendingCrewRequests,
      totalFlights,
      onTimeFlights,
    };

    // Return the statistics data
    res.status(200).json({
      message: 'Dashboard data fetched successfully',
      data: dashboardStats,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};
