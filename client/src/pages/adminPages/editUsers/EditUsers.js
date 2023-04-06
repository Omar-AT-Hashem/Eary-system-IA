import React from "react";
import AdminNavBar from "../../../components/navBars/AdminNavBar";
import { useState, useEffect } from "react";
import { apiHandler } from "./apiHandler";
import { useNavigate } from "react-router-dom";
import './style.css'

export default function EditUsers() {
  const [users, setUsers] = useState([]);
  const [statusCode, setStatusCode] = useState();
  const [rerenderTrigger, setRerenderTrigger] = useState();
  const api = new apiHandler();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const returnedUsers = await api.getAllUsers();
      setUsers(returnedUsers.data);
      setStatusCode(returnedUsers.status);
    }

    fetchData();
  }, []);

  console.log(users);

  console.log(statusCode);

  const handleUserChange = (e, userIndex) => {
    let currentUsers = [...users];
    currentUsers[userIndex] = {
      ...currentUsers[userIndex],
      [e.target.name]: e.target.value,
    };

    setUsers(currentUsers);
  };

  console.log(users);

  const handleDelete = async (e, userID) => {
    let currentUsers = users;
    const result = api.deleteUser(userID);
    currentUsers.splice(e.target.id, 1);
    setUsers(currentUsers);
    setRerenderTrigger(e.target.id);
  };

  const handleUpdate = async (e, userID, userIndex) => {
    let currentUser = users.filter((user) => {
      return user.id == userID;
    });
    currentUser = currentUser[0];

    console.log(currentUser);

    let result = await api.updateUser(currentUser);
  };

  const handleAddUser = () => {
    navigate(`/${localStorage.username}/admin/add-user`)
  }

  const session = localStorage.getItem("token");
  const adminAuth = localStorage.getItem("isAdmin");
  if (!session || adminAuth != 1) {
    return <h1>Unauthorized</h1>;
  } else if (statusCode == 404) {
    return (
      <div className="editUsers-background">
        <h1 className="editUsers-loading">No users availabe</h1>
      </div>
    );
  } else if (!users) {
    return (
      <div className="editUsers-background background-color">
        <h1 className="editUsers-loading">Loading...</h1>
      </div>
    );
  } else {
    return (
      <>
        <AdminNavBar />
        <div className="editUsers-background background-color">
          <h1 className="editUsers-header">Edit Users</h1>
          <div className="editUsers-container">
            <button 
            onClick={handleAddUser}
            className="addUserButton">Add a user</button>
            {users.map((user, userIndex) => (
              <>
              <div className="editUsers-user-card">
                <label>
                  Username:
                  <input
                    className="editUsers-question-setting"
                    id={user.id}
                    value={user.username}
                    type="text"
                    name="username"
                    onChange={(e) => {
                      handleUserChange(e, userIndex);
                    }}
                  />
                </label>
                <label>
                  Email:
                  <input
                    id={user.id}
                    className="editUsers-question editUsers-readonly"
                    value={user.email}
                    type="text"
                    name="email"
                    onChange={(e) => {
                      handleUserChange(e, userIndex);
                    }}
                    readonly
                  />
                  </label>
                <label>
                  Phone:
                  <input
                    id={user.id}
                    className="editUsers-question"
                    value={user.phone}
                    type="text"
                    name="phone"
                    onChange={(e) => {
                      handleUserChange(e, userIndex);
                    }}
                  />
                </label>
                <label>
                  isActive:
                  <input
                    id={user.id}
                    className="editUsers-question"
                    value={user.isActive}
                    type="number"
                    name="isActive"
                    min={0}
                    max={1}
                    onChange={(e) => {
                      handleUserChange(e, userIndex);
                    }}
                  />
                </label>
                <label>
                  isAdmin:
                  <input
                    id={user.id}
                    className="editUsers-question"
                    value={user.isAdmin}
                    type="number"
                    name="isAdmin"
                    min={0}
                    max={1}
                    onChange={(e) => {
                      handleUserChange(e, userIndex);
                    }}
                  />
                </label>

                <div className="editUsers-button-container">
                  <button
                    id={userIndex}
                    className="editUsers-delete-button"
                    onClick={(e) => {
                      handleDelete(e, user.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    id={userIndex}
                    className="editUsers-update-button"
                    onClick={(e) => {
                      handleUpdate(e, user.id, userIndex);
                    }}
                  >
                    Update
                  </button>
                </div>
            </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
}
