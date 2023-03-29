
import React from 'react';
import "../style/Header.css";
import image from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
export const Header = () => {
    return (
   
      <header className="main-header"> 
      <div className="logo"> 
      <img src={image}  alt="logo"/>
      </div>
      <nav>
      <ul>
      <li>
      <Link to={"/"}>Home </Link>
        </li>
      <li>
      <Link to={"/contact"}>Contact us </Link>
        
        </li>
        <li >
      <Link to={"/login"}>login </Link>
         
          </li>

          <li >
      <Link to={"/Signup"}>signup </Link>
         
          </li>
        <li>
      <Link to={"/about"}>About </Link>
         
          </li>
        </ul>
      </nav>
        </header>
    )
  }