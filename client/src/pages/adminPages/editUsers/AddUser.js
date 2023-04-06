import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHandler } from "./apiHandler";
import "./style.css";
import AdminNavBar from "../../../components/navBars/AdminNavBar";

export default function AddUser() {
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
        setErrors({success: "User created Successfully"})
        setSignupForm({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        })
      } else if (response.status == 402 ) {
        // email already exists in database
        setErrors({ email: "This email is already registered" });
      } else {
        // sign up failed for other reasons
        setErrors({ general: "Sign up failed, please try again" });
      }
    };
    const session = localStorage.getItem("token")
    const adminAuth = localStorage.getItem("isAdmin")
    if(!session || adminAuth != 1){
      return <h1>Unauthorized</h1>
    }else{
    return (
      <>
        <AdminNavBar />
        <div className="page-background">
          <div className="signup-cover">
            
            <form onSubmit={handleSubmit}>
              <div>
                <label className="signup-label" for="username">
                  Username
                </label>
                <input
                  className="signup-input"
                  id="username"
                  name="username"
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
               Create user
              </button>
              
              {errors.general && <div className="signUp-error">{errors.general}</div>}
              {errors.email && <div className="signUp-error">{errors.email}</div>}
              {errors.success && <div className="signUp-success">{errors.success}</div>}
              {errors.confirmPassword && (
                <div className="signUp-error">{errors.confirmPassword}</div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  };
}
  
