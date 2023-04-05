import UserNavBar from "../../../components/navBars/UserNavBar";
import { apiHandler } from "./apiHandler";
import './style.css'

import React, { useState } from "react";

function ProfileUpdateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const api = new apiHandler();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = localStorage.getItem("userID");
      let user = { id: userID, email: email, password: password };
      const result = await api.verifyUser(user);
      if (result.status == 200) {
        user = {
          id: userID,
          email: newEmail,
          username: newUsername,
          phone: newPhone,
        };
        const res = await api.updateUser(user);
        console.log(res);
      } else if (result.status == 403 || result.status == 404) {
        setErrorMessage(result.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <>
   <UserNavBar />
<div class="form-container">
  <form onSubmit={handleSubmit}>
    <div>
      <label className="updateUser-label" htmlFor="email">Email:</label>
      <input
        type="email"
        className="updateUser-input"
        id="email"
        class="form-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
    </div>
    <div>
      <label className="updateUser-label" htmlFor="password">Password:</label>
      <input
        type="password"
        className="updateUser-input"
        id="password"
        class="form-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
    </div>
    <div>
      <label className="updateUser-label" htmlFor="new-email">New Email:</label>
      <input
        type="email"
        className="updateUser-input"
        id="new-email"
        class="form-input"
        value={newEmail}
        onChange={(event) => setNewEmail(event.target.value)}
      />
    </div>
    <div>
      <label className="updateUser-label" htmlFor="new-username">New Username:</label>
      <input
        type="text"
        className="updateUser-input"
        id="new-username"
        class="form-input"
        value={newUsername}
        onChange={(event) => setNewUsername(event.target.value)}
      />
    </div>
    <div>
      <label className="updateUser-label" htmlFor="new-phone">New Phone:</label>
      <input
        type="tel"
        className="updateUser-input"
        id="new-phone"
        class="form-input"
        value={newPhone}
        onChange={(event) => setNewPhone(event.target.value)}
      />
    </div>
    {errorMessage && <div class="error-message">{errorMessage}</div>}
    <button className="updateUser-button" type="submit">Update Profile</button>
  </form>
</div>
  </>
  );
}

export default ProfileUpdateForm;