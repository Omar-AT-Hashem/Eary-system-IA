import { apiHandler } from "./apiHandler";

import React, { useState } from "react";

function ProfileUpdateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
     
      <div>
        <label htmlFor="new-email">New Email:</label>
        <input
          type="email"
          id="new-email"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="new-username">New Username:</label>
        <input
          type="text"
          id="new-username"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="new-phone">New Phone:</label>
        <input
          type="tel"
          id="new-phone"
          value={newPhone}
          onChange={(event) => setNewPhone(event.target.value)}
        />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default ProfileUpdateForm;
