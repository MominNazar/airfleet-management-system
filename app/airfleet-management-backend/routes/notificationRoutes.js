const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// Route to get all notifications
router.get("/all", notificationController.getAllNotifications);

// Route to get notifications for a specific user or all notifications if "all" is passed as userId
router.get("/:userId", notificationController.getNotifications);

// Route to get notifications for a specific user by email
router.get("/byEmail/:email", notificationController.getNotificationsByEmail);

// Route to create a new notification
router.post("/", notificationController.createNotification);

// Route to update the status of a specific notification
router.put("/:notificationId", notificationController.updateNotificationStatus);

// Route to delete a specific notification
router.delete("/:notificationId", notificationController.deleteNotification);

module.exports = router;
