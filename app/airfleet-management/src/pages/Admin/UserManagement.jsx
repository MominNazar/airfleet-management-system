import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    role: "Passenger",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactDetails: { phone: "", emergencyContact: "" },
    status: "Active",
    booking: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = "https://airplane-management-system-chi.vercel.app/api/users"; // Update as needed

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    if (!newUser.firstName || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL, newUser);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      toast.success("User added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user");
    }
  };

  // Edit an existing user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    setNewUser(userToEdit);
    setIsEditing(true);
    setEditUserId(id);
  };

  // Save edited user
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${editUserId}`, newUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editUserId ? response.data : user
        )
      );
      toast.success("User updated successfully");
      resetForm();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // Search users by name or email
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset the form
  const resetForm = () => {
    setNewUser({
      role: "Passenger",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactDetails: { phone: "", emergencyContact: "" },
      status: "Active",
      booking: "",
    });
    setIsEditing(false);
    setEditUserId(null);
  };

  return (
    <div>
    <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
  <h1 className="md:text-xl text-lg font-bold">User Management</h1>
</div>

      <div className="p-6 bg-gradient-to-br from-white to-white min-h-[600px] text-black">
        {/* Add User Form */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6 text-black">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="p-3 border text-sm rounded-md bg-white text-black placeholder-gray-800"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              className="p-3 border text-sm rounded-md bg-white text-black placeholder-gray-800"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-3 border text-sm rounded-md bg-white text-black placeholder-gray-800"
            />
            {!isEditing && (
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="p-3 border text-sm rounded-md bg-white text-black placeholder-gray-800"
              />
            )}
            <input
              type="text"
              placeholder="Phone"
              value={newUser.contactDetails.phone}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  contactDetails: {
                    ...newUser.contactDetails,
                    phone: e.target.value,
                  },
                })
              }
              className="p-3 border rounded-md text-sm bg-white text-black placeholder-gray-800"
            />
            <input
              type="text"
              placeholder="Emergency Contact"
              value={newUser.contactDetails.emergencyContact}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  contactDetails: {
                    ...newUser.contactDetails,
                    emergencyContact: e.target.value,
                  },
                })
              }
              className="p-3 border rounded-md text-sm bg-white text-black placeholder-gray-800"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-3 border rounded-md text-sm bg-white text-black placeholder-gray-800"
            >
              <option value="Passenger">Passenger</option>
              <option value="Crew">Crew</option>
            </select>
            <input
              type="text"
              placeholder="Booking"
              value={newUser.booking}
              onChange={(e) => setNewUser({ ...newUser, booking: e.target.value })}
              className="p-3 border rounded-md text-sm bg-white text-black placeholder-gray-800"
            />
          </div>
          <button
            onClick={isEditing ? handleSaveEdit : handleAddUser}
            className="w-full mt-4 py-3 rounded-md text-sm  text-white border bg-accent-orange-light hover:bg-gray-800 transition-colors"
          >
            {isEditing ? "Save Changes" : "Add User"}
          </button>
        </div>

        {/* User List Table */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-black">
          <h2 className="md:text-xl text-lg font-semibold mb-4">User Management</h2>
          <input
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border bg-white text-black placeholder-gray-800 rounded-md mb-4"
          />
          <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
            <table className="table-auto  text-sm w-full border-collapse border border-gray-300">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="p-4 border border-gray-300 text-left">First Name</th>
                  <th className="p-4 border border-gray-300 text-left">Last Name</th>
                  <th className="p-4 border border-gray-300 text-left">Email</th>
                  <th className="p-4 border border-gray-300 text-left">Role</th>
                  <th className="p-4 border border-gray-300 text-left">Booking</th>
                  <th className="p-4 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="p-2 border border-gray-300">{user.firstName}</td>
                      <td className="p-2 border border-gray-300">{user.lastName}</td>
                      <td className="p-2 border border-gray-300">{user.email}</td>
                      <td className="p-2 border border-gray-300">{user.role}</td>
                      <td className="p-2 border border-gray-300">{user.booking}</td>
                      <td className="p-2 border border-gray-300 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user._id)}
                          className="bg-accent-orange-light text-black p-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
