import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Ensure users is initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://healthsphere-ln4c.onrender.com/api/userManage"); // Fetch users from backend
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setError("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError("Unable to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://healthsphere-ln4c.onrender.com/api/userManage/${id}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Failed to delete user.");
    }
  };

  const handleUpdate = async (id) => {
    const updatedData = {
      name: "Updated Name",
      role: "Updated Role",
    };
    try {
      await axios.put(`https://healthsphere-ln4c.onrender.com/api/userManage/${id}`, updatedData);
      alert("User updated successfully!");
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error("Error updating user:", error.message);
      alert("Failed to update user.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://healthsphere-ln4c.onrender.com/api/userManage", newUser);
      alert("User added successfully!");
      setNewUser({ name: "", email: "", role: "", password: "" });
      fetchUsers(); // Refresh users list
    } catch (err) {
      console.error("Error adding user:", err.message);
      alert("Failed to add user.");
    }
  };

  if (loading) return <div className="loading">Loading Users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      {/* Add User Form */}
      <form className="add-user-form" onSubmit={handleAddUser}>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit" className="add-button">Add User</button>
      </form>

      {/* Users List */}
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <h3>{user.name}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button onClick={() => handleDelete(user._id)} className="delete-button">
                Delete
              </button>
              <button onClick={() => handleUpdate(user._id)} className="update-button">
                Update
              </button>
            </div>
          ))
        ) : (
          <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
