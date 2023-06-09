import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function UserNavBar() {
  const params = useParams();
  const navigate = useNavigate();
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
          <Link to={`/${username}`}>
            <li>Take Exam</li>{" "}
          </Link>

          <Link to={`/${username}/history`}>
            <li>History </li>
          </Link>

          <Link to={`/${username}/update-profile`}>
            <li>Edit profile </li>
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
