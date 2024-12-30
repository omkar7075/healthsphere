import React, { useState } from "react";
import "../CSS/AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Patient", status: "Active" },
    { id: 2, name: "Dr. Jane Smith", role: "Doctor", status: "Inactive" },
    { id: 3, name: "Alice Brown", role: "Admin", status: "Active" },
  ]);

  const updateUserStatus = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      <div className="user-table">
        <div className="table-header">
          <div>Name</div>
          <div>Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <div>{user.name}</div>
            <div>{user.role}</div>
            <div className={`status ${user.status.toLowerCase()}`}>
              {user.status}
            </div>
            <div>
              <button
                className={`action-btn ${
                  user.status === "Active" ? "deactivate" : "activate"
                }`}
                onClick={() =>
                  updateUserStatus(
                    user.id,
                    user.status === "Active" ? "Inactive" : "Active"
                  )
                }
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
