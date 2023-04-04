import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { Link, useParams } from "react-router-dom";

export default function UserNavBar() {
  const params = useParams();
  const { username } = params;

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <header className="main-header">
      <div className="logo">
        <img className="header-img" src={image} alt="logo" />
      </div>
      <nav>
        <ul>
          <Link to={"/"}>
            <li>Home</li>{" "}
          </Link>

          <Link to={"/contact"}>
            <li>Contact us</li>{" "}
          </Link>

          <Link to={"/login"}>
            <li>login </li>
          </Link>

          <Link to={"/Signup"}>
            <li>signup </li>
          </Link>

          <Link to={"/about"}>
            <li>About </li>
          </Link>
        </ul>
        <ul className="logout">
            <Link to={"/"} onClick={handleLogout}>
              <li>logout</li>
            </Link>
          </ul> 
      </nav>
    </header>
  );
}