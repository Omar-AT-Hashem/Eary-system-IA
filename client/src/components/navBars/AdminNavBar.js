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
          <Link to={`/${username}/admin`}>
            <li>Home</li>
          </Link>
          <Link to={`/${username}/admin/question-editing`}>
            <li>Edit Questions</li>
          </Link>

          <Link to={`/${username}/admin/question-form`}>
            <li>Add Questions </li>
          </Link>

          <Link to={`/${username}/admin/activate-users`}>
            <li>ActivateUsers </li>
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
