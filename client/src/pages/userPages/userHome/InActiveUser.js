import React from "react";

export default function InActiveUser() {
  const session = localStorage.getItem("token");
  if (!session) {
    return <h1>Unauthorized</h1>;
  } else {
    return (
      <>
        <div className="userHome-background background-color">
          <div>Your account is pending activation...</div>
        </div>
      </>
    );
  }
}
