import React from "react";
import "./style.css";
import image from "../../assets/images/logo.png";
import { Link, useParams } from "react-router-dom";
export default function AdminNavBar() {
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
            <Link to={`/${username}/admin/question-editing`}>
              Edit Questions
            </Link>
          </li>
          <li>
            <Link to={`/${username}/admin/question-form`}>Add Questions </Link>
          </li>
          <li>
            <Link to={`/${username}/admin/activate-users`}>ActivateUsers </Link>
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
