import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    message: "",
    type: "Important",
    _id: "",
  });
  const [alertSettings, setAlertSettings] = useState({ enableNotifications: true });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const apiUrl = "https://airplane-management-system-chi.vercel.app/api/notifications";
  const usersApiUrl = "https://airplane-management-system-chi.vercel.app/api/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(usersApiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${apiUrl}/${selectedUserId}`);
          setNotifications(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching notifications", error);
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [selectedUserId]);

  const handleSendNotification = async () => {
    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }

    if (!newNotification.message) {
      alert("Please enter a notification message.");
      return;
    }

    try {
      if (newNotification._id) {
        const response = await axios.put(`${apiUrl}/${newNotification._id}`, {
          userId: selectedUserId,
          message: newNotification.message,
          type: newNotification.type,
        });
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === newNotification._id ? response.data.notification : notification
          )
        );
      } else {
        const response = await axios.post(apiUrl, {
          userId: selectedUserId,
          message: newNotification.message,
          type: newNotification.type,
        });
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          response.data.notification,
        ]);
      }
      setNewNotification({ message: "", type: "Important", _id: "" });
    } catch (error) {
      console.error("Error sending notification", error);
    }
  };

  const handleEditNotification = (notificationId) => {
    const notificationToEdit = notifications.find(
      (notification) => notification._id === notificationId
    );
    if (notificationToEdit) {
      setNewNotification({ ...notificationToEdit });
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`${apiUrl}/${notificationId}`);
      setNotifications(notifications.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "Important":
        return "bg-yellow-600 text-gray-900";
      case "Info":
        return "bg-blue-600 text-white";
      case "Critical":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="p-0 h-full bg-gradient-to-br from-gray-100 to-gray-700 min-h-screen rounded-none flex flex-col md:flex-row gap-0">
        {/* Notification Form */}
        <div className="w-full sm:w-full md:w-1/3 bg-white p-6 border border-gray-300 shadow-lg sm:px-4 sm:py-3">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 sm:text-sm">Send Notification</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="user-select" className="text-lg text-gray-800 sm:text-sm">Select User:</label>
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 sm:text-sm"
              >
                <option value="">--Select User--</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {`${user.firstName} (${user.role})`}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="message"
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              placeholder="Enter notification message"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 sm:text-sm"
            />
            <div>
              <label htmlFor="notification-type" className="text-lg text-gray-800 sm:text-sm">Notification Type:</label>
              <select
                id="notification-type"
                name="type"
                value={newNotification.type}
                onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 sm:text-sm"
              >
                <option value="Important">Important</option>
                <option value="Info">Info</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button
              onClick={handleSendNotification}
              className="w-full py-3 text-xl text-white bg-accent-orange-light rounded-lg sm:text-sm"
            >
              {newNotification._id ? "Update Notification" : "Send Notification"}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="w-full md:w-2/3 bg-orange-100 p-6 ml-0 sm:px-4 sm:py-3">
          {loading ? (
            <p className="text-center text-gray-800 sm:text-sm">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-800 sm:text-sm">No notifications available</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg ${getNotificationColor(
                    notification.type
                  )}`}
                >
                  <div>
                    <p className="text-lg font-semibold sm:text-sm">{notification.message}</p>
                    <p className="text-sm sm:text-xs">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => handleEditNotification(notification._id)}
                      className="text-yellow-300 sm:text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notification._id)}
                      className="text-red-600 sm:text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
