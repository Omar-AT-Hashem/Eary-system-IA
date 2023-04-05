import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response
    if (SignupForm.password !== SignupForm.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      }); 
    }
    else{
       response = await api.registerUser(SignupForm);
    }
    console.log(response);
     if (response.status === 201 ) {
      navigate("/login");
    } else if (response.status == 402 ) {
      // email already exists in database
      setErrors({ email: "This email is already registered" });
    } else {
      // sign up failed for other reasons
      setErrors({ general: "Sign up failed, please try again" });
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
                onChange={(event) =>{
                  setErrors({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                  })
                  setSignupForm({ ...SignupForm, username: event.target.value })
                }}
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
                  {
                    setErrors({
                      username: "",
                      email: "",
                      phone: "",
                      password: "",
                      confirmPassword: "",
                    })
                  setSignupForm({ ...SignupForm, phone: event.target.value })
                }}
              />
            </div>

            <div>
              <label className="signup-label" htmlFor="email">
                Email
              </label>
              <input
                className="signup-input"
                name="email"
                id="email"
                placeholder="please enter your email"
                type="email"
                required
                value={SignupForm.email}
                onChange={(event) =>{
                  setErrors({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                  })
                  setSignupForm({ ...SignupForm, email: event.target.value })
                }}
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
                onChange={(event) =>{
                  setErrors({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                  })
                  setSignupForm({ ...SignupForm, password: event.target.value })
                }}
              />
            </div>
          

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
                onChange={(event) =>{
                  setErrors({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                  })
                  setSignupForm({
                    ...SignupForm,
                    confirmPassword: event.target.value,
                  })}
                }
              />
            </div>

            <button className="signup-submit" type="submit">
              Signup
            </button>
            <div className="alt-login">
              <br></br>
              <p className="text" style={{ textAlign: "center" }}>
                Already Have an account ? <Link to={"/login"}>Login</Link>
              </p>
              
            </div>
            {errors.general && <div className="signUp-error">{errors.general}</div>}
            {errors.email && <div className="signUp-error">{errors.email}</div>}
            {errors.confirmPassword && (
              <div className="signUp-error">{errors.confirmPassword}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
