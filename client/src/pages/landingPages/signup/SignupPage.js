import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiHandler } from "./apiHandler";
import "./forms.css";
import LandingNavBar from "../../../components/navBars/LandingNavBar";

export const SignupPage = () => {
  <title>Sign Up Page</title>;
  const [SignupForm, setSignupForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const api = new apiHandler();
  const [errors, setErrors] = useState({});
  const Signup = (event) => {
    event.preventDefault();
    if (SignupForm.password !== SignupForm.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }
  };
  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    showPopup("signup-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await api.registerUser(SignupForm);
    console.log(response);
    if (response.status == 201) {
      navigate("/login");
    }
  };

  return (
    <>
      <LandingNavBar />
      <div className="page-background">
        <div className="signup-cover">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="signup-label" for="username">
                Username
              </label>
              <input
                className="signup-input"
                id="username"
                name="username"
                placeholder="please enter your name"
                type="text"
                required
                value={SignupForm.username}
                onChange={(event) =>
                  setSignupForm({ ...SignupForm, username: event.target.value })
                }
              />
            </div>

            <div>
              <label className="signup-label" for="phone">
                Phone
              </label>
              <input
                className="signup-input"
                id="phone"
                name="phone"
                placeholder="please enter your name"
                type="text"
                required
                value={SignupForm.phone}
                onChange={(event) =>
                  setSignupForm({ ...SignupForm, phone: event.target.value })
                }
              />
            </div>

            <div>
              <label className="signup-label" for="email">
                Email
              </label>
              <input
                className="signup-input"
                name="email"
                id="email"
                placeholder="plaese enter your email"
                type="email"
                required
                value={SignupForm.email}
                onChange={(event) =>
                  setSignupForm({ ...SignupForm, email: event.target.value })
                }
              />
            </div>

            <div>
              <label className="signup-label" for="password">
                password
              </label>
              <input
                className="signup-input"
                name="password"
                id="password"
                placeholder="please enter your password"
                type="password"
                required
                value={SignupForm.password}
                onChange={(event) =>
                  setSignupForm({ ...SignupForm, password: event.target.value })
                }
              />
            </div>
            {errors.confirmPassword && (
              <div style={{ color: "red" }}>{errors.confirmPassword}</div>
            )}

            <div>
              <label className="signup-label" for="confirmPassword">
                confirm-password
              </label>
              <input
                className="signup-input"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="please re-enter your password"
                type="password"
                required
                value={SignupForm.confirmPassword}
                onChange={(event) =>
                  setSignupForm({
                    ...SignupForm,
                    confirmPassword: event.target.value,
                  })
                }
              />
            </div>

            <button className="signup-submit" type="submit">
              Signup
            </button>
            <div className="alt-login">
              <br></br>
              <p className="text" style={{ textAlign: "center" }}>
                {" "}
                Or signup using{" "}
              </p>
              <button type="fbutton" className="signup-fbutton">
                {" "}
                facebook{" "}
              </button>
              <button type="gbutton" className="signup-gbutton">
                {" "}
                google{" "}
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
