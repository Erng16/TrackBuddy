import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function UserLogin() {
  const [phone, setPhone] = useState("");
  const [passwd, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({ phone: "", passwd: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    let isValid = true;
    let errors = { phone: "", passwd: "" };
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/; // Adjust based on requirements (e.g., 10 digits)
    if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }
  
    // Password validation
    if (passwd.trim() === "") {
      errors.passwd = "Password cannot be empty";
      isValid = false;
    }
  
    setError(errors);
  
    if (isValid) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password: passwd }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("token", data.token); // Save the token in localStorage
          localStorage.setItem("user", JSON.stringify(data.user)); // Save user info if needed
          navigate("/home"); // Navigate to home page
        } else {
          alert(data.error || "Invalid credentials");
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  return (

      <main className="user-login">
      <Link to="/" className="return-button">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div className="wrapper">
          <div className="text">Log In</div>
          
        <div className="input-wrapper">
          <div className="input"></div>
          <img src="" alt=""></img>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phone && <p className="error">{error.phone}</p>}
        </div>

        <div className="input-wrapper">
          <div className="input">
            <input
              className="passwd"
              value={passwd}
              type={visible ? "text" : "password"}
              placeholder="Password"
              id="passwd"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="passVis" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </i>
          </div>
          {error.passwd && <p className="error">{error.passwd}</p>}
        </div>

        <div className="input-wrapper"></div>

        <button className="submit" onClick={handleLogin}>
          Log In
        </button>

        <div className="input-wrapper">
          <div className="signup">
            <span>
              Don't have an account? <Link to="/user-signup">Sign Up</Link>
            </span>
          </div>
        </div>
        </div>
        </main>

  );
}

export default UserLogin;
