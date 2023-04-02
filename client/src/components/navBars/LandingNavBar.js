import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { Link, useParams } from "react-router-dom";

export default function LandingNavBar() {
  const params = useParams();
  const { username } = params;

  return (
    <header className="main-header">
      <div className="logo">
        <img className="header-img" src={image} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home </Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact us </Link>
          </li>
          <li>
            <Link to={"/login"}>login </Link>
          </li>

          <li>
            <Link to={"/Signup"}>signup </Link>
          </li>
          <li>
            <Link to={"/about"}>About </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
