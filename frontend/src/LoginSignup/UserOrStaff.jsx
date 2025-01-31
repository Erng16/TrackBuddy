import React from "react";
import "./UserOrStaff.css";
import { Link } from "react-router-dom";

function UserOrStaff() {
  return (
    <div className="UOS">
      <div className="text">Log In/Sign Up <br></br>As</div>
      <div className="button-container">
        <Link to="/user-login">
          <button className="uos-button">User</button>
        </Link>
        <Link to="/staff-login">
          <button className="uos-button">Staff</button>
        </Link>
      </div>
    </div>
  );
}

export default UserOrStaff;
