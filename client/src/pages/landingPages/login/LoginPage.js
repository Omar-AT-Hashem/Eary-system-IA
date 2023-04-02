import React, { useState, useEffect } from "react";
import { apiHandler } from "./apiHandler";
import { useNavigate, useParams } from "react-router-dom";

import "./forms.css";
export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [statusCode, setStatusCode] = useState()

  const api = new apiHandler();
  //const {username} = useParams()
  const navigate = useNavigate()
  
  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await api.login(loginForm);
    setStatusCode(response.status)
    console.log(response);
    const {id, token, isActive, isAdmin, username, phone, email} = response.data.userData
    localStorage.setItem("userID", id);
    localStorage.setItem("token", token);
    localStorage.setItem("isActive", isActive);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("username", username);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    if(isActive == 0){
      navigate(`/${username}/pending`)
    }else if(isActive == 1){
      if(isAdmin == 1){
      navigate(`/${username}/admin`)
      }else{
        navigate(`/${username}`)
      }
    }
  }

  return (
    <div className="cover">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div>
          <label className="login-label" for="email">
            Email
          </label>
          <input
            className="login-input"
            id="email"
            placeholder="plaese enter your email"
            type="email"
            required
            value={loginForm.email}
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
          />
        </div>

        <div>
          <label className="login-label" for="password">
            password
          </label>
          <input
            className="login-input"
            id="password"
            placeholder="please enter your password"
            type="password"
            required
            value={loginForm.password}
            onChange={(event) =>
              setLoginForm({ ...loginForm, password: event.target.value })
            }
          />
        </div>
        <button className="login-submit" type="submit">
          Login
        </button>
        <div className="alt-login">
          <br></br>
          <p className="text" style={{ textAlign: "center" }}>
            {" "}
            Or login using{" "}
          </p>
          <button type="fbutton" className="login-fbutton">
            {" "}
            facebook{" "}
          </button>
          <button type="gbutton" className="login-gbutton">
            {" "}
            google{" "}
          </button>{" "}
        </div>
      </form>
    </div>
  );
};
