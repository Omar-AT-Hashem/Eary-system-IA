import React from "react";
import AdminNavBar from "../../../components/navBars/AdminNavBar";
import './style.css'
export default function AdminHome() {
  const session = localStorage.getItem("token");
  const adminAuth = localStorage.getItem("isAdmin");
  if (!session || adminAuth != 1) {
    return <h1>403 Unauthorized</h1>;
  } else {
    return (
      <>
        <AdminNavBar />
        <div className="adminHome-background background-color">
          <div className="adminHome-container">
            <div className="adminHome-text">Admin dashboard</div>
            <div className="adminHome-text">Here you can manage our system</div>
          </div>
        </div>
      </>
    );
  }
}
