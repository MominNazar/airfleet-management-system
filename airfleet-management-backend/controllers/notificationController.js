const Notification = require('../models/Notification');
const User = require('../models/User');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    if (!userId || !message || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newNotification = new Notification({ userId, message, type });
    await newNotification.save();

    res.status(201).json({ message: 'Notification created successfully.', notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

// Get all notifications (no userId filter)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("userId", "firstName lastName email");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Get notifications for a specific user by userId
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // If 'all' is passed as userId, fetch all notifications
    if (userId === "all") {
      return await exports.getAllNotifications(req, res); // Call the 'getAllNotifications' function
    }

    // Otherwise, fetch notifications for the specific user
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Get notifications for a specific user by email
exports.getNotificationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ userId: user._id }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Update the status of a notification
exports.updateNotificationStatus = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { status } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { status },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification updated successfully.', notification: updatedNotification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};
// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Find and delete the notification by its ID
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};
