import React, { useState, useEffect } from "react";
import { apiHandler } from "./apiHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./forms.css";

import LandingNavBar from "../../../components/navBars/LandingNavBar";
export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const api = new apiHandler();
  //const {username} = useParams()
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await api.login(loginForm);
   
    console.log(response);
    if (response.status === 200) {
      const { id, token, isActive, isAdmin, username, phone, email } =
        response.data.userData;
      localStorage.setItem("userID", id);
      localStorage.setItem("token", token);
      localStorage.setItem("isActive", isActive);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("username", username);
      localStorage.setItem("phone", phone);
      localStorage.setItem("email", email);
      if (isActive == 0) {
        navigate(`/${username}/pending`);
        window.location.reload()
      } else if (isActive == 1) {
        if (isAdmin == 1) {
          navigate(`/${username}/admin`);
          window.location.reload()
        } else {
          navigate(`/${username}`);
          window.location.reload()
        }
      }
    } else {
      // display error message
      const errorMessage = "Invalid email or password";
      setError(errorMessage);
    }
  };

  return (
    <>
      <LandingNavBar />
      <div className="page-background">
        <div className="login-container">
          <div className="login-cover">
            <form onSubmit={handleSubmit}>
              <h1 style={{ textAlign: "center" }}>Login</h1>
              <div>
                <label className="login-label" for="email">
                  Email
                </label>
                <input
                  className="login-input"
                  id="email"
                  placeholder="please enter your email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(event) => {
                    setLoginForm({ ...loginForm, email: event.target.value });
                    setError("");
                  }}
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
                  onChange={(event) => {
                    setLoginForm({
                      ...loginForm,
                      password: event.target.value,
                    });
                    setError("");
                  }}
                />
              </div>
              <button className="login-submit" type="submit">
                Login
              </button>
              <div className="alt-login">
                <br></br>
                <p className="text" style={{ textAlign: "center" }}>
                  Dont have an account ? <Link to={"/signup"}>Signup</Link>
                </p>
                {error == "Invalid email or password" ? <p className="login-error">Invalid email or password</p> : <p  className="login-error"></p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
