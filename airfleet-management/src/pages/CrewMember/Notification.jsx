import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationsAndAlerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const crewEmail = localStorage.getItem('crewEmail'); // Get the email from localStorage

    if (crewEmail) {
      // Fetch notifications based on the crew email from the backend API
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`https://airplane-management-system-chi.vercel.app/api/notifications/byEmail/${crewEmail}`);
          setNotifications(response.data); // Set the notifications state with the response data
        } catch (error) {
          setMessage('Failed to fetch notifications. Please try again later.');
        }
      };

      fetchNotifications();
    } else {
      setMessage('No crew email found. Please log in.');
    }
  }, []);

  // Mark notification as read
  const markAsRead = async (notification) => {
    const { _id } = notification;

    if (!_id) {
      console.error("Notification ID is missing");
      return;
    }

    try {
      // Make a PUT request to update the notification status
      const response = await axios.put(`https://airplane-management-system-chi.vercel.app/api/notifications/${_id}`, {
        status: 'Read', // Send 'status' as 'Read'
      });

      // Update the local state with the updated notification status
      setNotifications(notifications.map((notif) =>
        notif._id === _id ? { ...notif, status: 'Read' } : notif
      ));

      console.log('Notification updated:', response.data); // Log response data to see if the update is successful
    } catch (error) {
      setMessage('Failed to update notification status.');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h2 className="text-3xl font-medium text-center mb-6">Notifications and Alerts</h2>

      {/* Display Notifications */}
      <div className="bg-bg-secondary p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-secondary mb-4">Important Notifications</h3>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">{message || 'No notifications available.'}</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 rounded-lg ${notification.status === "Read" ? "bg-gray-700" : "bg-gray-600"} hover:bg-gray-500 border border-black`}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg text-white flex-1">{notification.message}</p>
                  {notification.status !== "Read" && (
                    <button
                      onClick={() => markAsRead(notification)}
                      className="text-blue-500 hover:text-blue-400 text-sm mt-2 ml-2"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsAndAlerts;
