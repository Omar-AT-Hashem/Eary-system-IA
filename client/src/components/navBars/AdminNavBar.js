import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { Link, useParams } from "react-router-dom";
export default function AdminNavBar() {
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
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <Link to={`/${username}/admin/question-editing`}>
            <li>Edit questions</li>
          </Link>

          <Link to={`/${username}/admin/question-form`}>
            <li>Add questions </li>
          </Link>

          <Link to={`/${username}/admin/activate-users`}>
            <li>Activate users </li>
          </Link>
          <Link to={`/${username}/update-profile`}>
            <li>Edit profile </li>
          </Link>
        </ul>
          <ul className="logout">
            <Link to={"/"} onClick={handleLogout}>
              <li>Logout</li>
            </Link>
          </ul>   
      </nav>
    </header>
  );
}
