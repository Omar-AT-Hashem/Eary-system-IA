import UserNavBar from "../../../components/navBars/UserNavBar";
import { apiHandler } from "./apiHandler";
import { useNavigate } from "react-router-dom";
import "./style.css";
import React, { useState } from "react";
import AdminNavBar from "../../../components/navBars/AdminNavBar";

function ProfileUpdateForm() {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayOverlay, setDisplayOverlay] = useState(0);
  const api = new apiHandler();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = localStorage.getItem("userID");
      let user = { id: userID, email: localStorage.email, password: password };
      const result = await api.verifyUser(user);
      if (result.status == 200) {
        user = {
          id: userID,
          email: newEmail,
          username: newUsername,
          phone: newPhone,
          password: password,
          newPassword: newPassword,
        };
        if (newUsername) localStorage.setItem("username", newUsername);
        if (newPhone) localStorage.setItem("phone", newPhone);
        const res = await api.updateUser(user);
        if (user.newPassword) {
          await api.updateUserPassword(user);
        }
        setErrorMessage("Updated Successfully");
        console.log(res);
      } else if (result.status == 403 || result.status == 404) {
        setErrorMessage("Wrong Password");
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  const handleTerminateProfile = async () => {
    await api.deleteUser(localStorage.userID);
    setDisplayOverlay(0);
    navigate("/");
  };
  const session = localStorage.getItem("token");
  if (!session) {
    return <h1>Unauthorized</h1>;
  } else {
    return (
      <>
        {localStorage.isAdmin != 1 ? <UserNavBar /> : <AdminNavBar />}
        <div className="updateUser-background background-color">
          <div class="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="updateUser-label" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  className="updateUser-readonly"
                  id="email"
                  value={localStorage.email}
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="updateUser-label" htmlFor="email">
                  Username:
                </label>
                <input
                  type="text"
                  className="updateUser-readonly"
                  id="email"
                  value={localStorage.username}
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="updateUser-label" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  className="updateUser-input"
                  id="password"
                  value={password}
                  onChange={(event) => {
                    setErrorMessage("");
                    setPassword(event.target.value);
                  }}
                  required
                />
              </div>

              <div>
                <label className="updateUser-label" htmlFor="new-username">
                  New Username:<small> optional</small>
                </label>
                <input
                  type="text"
                  className="updateUser-input"
                  id="new-username"
                  value={newUsername}
                  onChange={(event) => {
                    setErrorMessage("");
                    setNewUsername(event.target.value);
                  }}
                />
              </div>
              <div>
                <label className="updateUser-label" htmlFor="new-phone">
                  New Phone:<small> optional</small>
                </label>
                <input
                  type="tel"
                  className="updateUser-input"
                  id="new-phone"
                  value={newPhone}
                  onChange={(event) => {
                    setErrorMessage("");
                    setNewPhone(event.target.value);
                  }}
                />
              </div>

              <div>
                <label className="updateUser-label" htmlFor="new-phone">
                  New Password: <small>optional</small>
                </label>
                <input
                  type="password"
                  className="updateUser-input"
                  id="new-phone"
                  value={newPassword}
                  onChange={(event) => {
                    setErrorMessage("");
                    setNewPassword(event.target.value);
                  }}
                />
              </div>
              {errorMessage == "Updated Successfully" ? (
                <div class="error-success">{errorMessage}</div>
              ) : (
                <div class="error-message">{errorMessage}</div>
              )}
              <button className="updateUser-button" type="submit">
                Update Profile
              </button>
              <button
                className="updateUser-button-red"
                onClick={(e) => {
                  setDisplayOverlay(1);
                }}
              >
                Terminate Account
              </button>
            </form>
          </div>
          {displayOverlay == 1 ? (
            <div className="updateUser-overlay">
              <div className="updateUser-overlay-content-container">
                <div className="updateUser-overlay-text">
                  <b>
                    Are you sure you want to terminate your account? The account
                    will be permenantly deleted
                  </b>
                </div>
                <div className="updateUser-overlay-button-container">
                  <button
                    className="updateUser-overlay-button"
                    onClick={handleTerminateProfile}
                  >
                    Yes
                  </button>
                  <button
                    className="updateUser-overlay-button"
                    onClick={(e) => {
                      setDisplayOverlay(0);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default ProfileUpdateForm;
