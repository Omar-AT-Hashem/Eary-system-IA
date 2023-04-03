import React from "react";
import LandingNavBar from "../../../components/navBars/LandingNavBar";
import "./style.css"
export default function Landing() {
  return (
    <>
      <LandingNavBar />
      <div className="landing-background background-color">
        <div className="landing-container">
          <div className="landing-text">Welcome to Hear Check.</div>
          <div className="landing-text">
            Embark on your journey of improving your hearing now !
          </div>
        </div>
      </div>
    </>
  );
}
