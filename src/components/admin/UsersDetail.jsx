import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersDetail.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("users").then((res) => {
      console.log("Fetched Users ===>", res.data);
      if (Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`users/${id}`)
        .then(() => {
          alert("User deleted successfully.");
          fetchUsers(); 
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("Failed to delete user.");
        });
    }
  };

  return (
    <div className="admin-page">
      <h2>Users</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={u._id || index}>
                  <td>{u.firstName || "-"}</td>
                  <td>{u.lastName || "-"}</td>
                  <td>{u.email || "-"}</td>
                  <td>{u.roleId?.name || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No user data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
