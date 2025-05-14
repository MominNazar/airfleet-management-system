import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/notifications';

// Fetch notifications for a user
export const getNotifications = async (userId) => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

// Create a new notification
export const createNotification = async (notificationData) => {
  const response = await axios.post(BASE_URL, notificationData);
  return response.data;
};

// Update a notification's status
export const updateNotificationStatus = async (notificationId, status) => {
  const response = await axios.put(`${BASE_URL}/${notificationId}`, { status });
  return response.data;
};
