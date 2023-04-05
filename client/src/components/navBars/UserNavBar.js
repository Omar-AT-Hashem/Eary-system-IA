import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function UserNavBar() {
  const params = useParams();
  const navigate = useNavigate()
  const { username } = params;

  function handleLogout() {
    localStorage.clear();
  }

  function handleRefresh() {
    navigate(`/${username}/history`)
    window.location.reload(false)
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

          <Link to={`/${username}`}>
            <li>Take Exam</li>{" "}
          </Link>

          <Link onClick={handleRefresh} to={`/${username}/history`}>
            <li>History </li>
          </Link>

          <Link to={`/${username}/update-profile`}>
            <li>Update profile </li>
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
