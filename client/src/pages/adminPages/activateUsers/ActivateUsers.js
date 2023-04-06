import React from "react";
import { apiHandler } from "./apiHandler";
import { useState, useEffect } from "react";
import "./style.css";
import AdminNavBar from "../../../components/navBars/AdminNavBar";

export default function ActivateUsers() {
  const api = new apiHandler();
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [statusCode, setStatusCode] = useState();
  const [rerenderTrigger, setRerenderTrigger] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await api.getInActiveUsers();
      setInactiveUsers(result.data);
    }
    fetchData();
  }, []);

  const handleActivate = async (e, index) => {
    let updatedUsers = inactiveUsers;
    updatedUsers[index].isActive = 1;
    const updatedUser = updatedUsers[index];
    const result = await api.updateUserData(updatedUser);
    updatedUsers.splice(index, 1);
    setInactiveUsers(updatedUsers);
    setStatusCode(result.status);
    setRerenderTrigger(e.target.id);
  };

  const handleDelete = async (e, index) => {
    let updatedUsers = inactiveUsers;
    const result = await api.deleteUser(e.target.id);
    updatedUsers.splice(index, 1);
    setInactiveUsers(updatedUsers);
    setStatusCode(result.status);
    setRerenderTrigger(e.target.id);
  };

  console.log(inactiveUsers);
  const session = localStorage.getItem("token")
  const adminAuth = localStorage.getItem("isAdmin")
  if(!session || adminAuth != 1){
    return <h1>Unauthorized</h1>
  }
  else if (!inactiveUsers) {
    return <h1>loading...</h1>;
  } else {
    return (
      <>
        <AdminNavBar />
        <div className="activateUsers-background background-color">
          <h1>ActivateUsers</h1>
          {inactiveUsers.map((user, index) => {
            return (
              <>
                <div className="activateUsers-single-user">
                  <div className="activateUsers-single-user-data">
                    <div><b>Username:</b> {user.username}</div>
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Phone:</b> {user.phone}</div>
                  </div>
                  <div className="activateUsers-buttons">
                    <button
                      id={user.id}
                      className="activateUsers-activate"
                      onClick={(e) => {
                        handleActivate(e, index);
                      }}
                    >
                      Activate
                    </button>
                    <button
                      id={user.id}
                      className="activateUsers-reject"
                      onClick={(e) => {
                        handleDelete(e, index);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
}
