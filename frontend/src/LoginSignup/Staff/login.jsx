// import React, { useState } from "react";
// import "../User/login.css";
// import { Link } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// function StaffLogin() {
//   const [staffId, setStaffId] = useState(""); // Changed from phone to staffId
//   const [passwd, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [error, setError] = useState({ staffId: "", passwd: "" });

//   const handleLogin = () => {
//     let isValid = true;
//     let errors = { staffId: "", passwd: "" };

//     // Staff ID validation
//     const staffIdRegex = /^[a-zA-Z0-9]{5,}$/; // Example: Alphanumeric, at least 5 characters
//     if (!staffIdRegex.test(staffId)) {
//       errors.staffId = "Please enter a valid Staff ID (at least 5 characters)";
//       isValid = false;
//     }

//     // Password validation
//     if (passwd.trim() === "") {
//       errors.passwd = "Password cannot be empty";
//       isValid = false;
//     }

//     setError(errors);

//     if (isValid) {
//       alert("Login successful!");
//     }
//   };

//   return (

//       <main className="user-login">
//         <Link to="/" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//         <div className="wrapper">
//           <div className="text">Log In</div>

//           <div className="input-wrapper">
//             <div className="input"></div>
//             <img src="" alt=""></img>
//             <input
//               type="text"
//               placeholder="Staff ID" // Updated placeholder
//               value={staffId} // Updated value
//               onChange={(e) => setStaffId(e.target.value)} // Updated handler
//             />
//             {error.staffId && <p className="error">{error.staffId}</p>}
//           </div>

//           <div className="input-wrapper">
//             <div className="input">
//               <input
//                 className="passwd"
//                 value={passwd}
//                 type={visible ? "text" : "password"}
//                 placeholder="Password"
//                 id="passwd"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <i className="passVis" onClick={() => setVisible(!visible)}>
//                 {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//               </i>
//               <div className="forgot">
//                 <a href="#">Forgot Password?</a>
//               </div>
//             </div>
//             {error.passwd && <p className="error">{error.passwd}</p>}
//           </div>

//           <div className="input-wrapper"></div>

//           <button className="submit" onClick={handleLogin}>
//             Log In
//           </button>

//           <div className="input-wrapper">
//             <div className="signup">
//               <span>
//                 Don't have an account? <Link to="/staff-signup">Sign Up</Link>
//               </span>
//             </div>
//           </div>
//         </div>
//       </main>

//   );
// }

// export default StaffLogin;

import React, { useState } from "react";
import "../User/login.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function StaffLogin() {
  const [staffId, setStaffId] = useState(""); // Changed from phone to staffId
  const [passwd, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({ staffId: "", passwd: "" });
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    let isValid = true;
    let errors = { staffId: "", passwd: "" };

    // Staff ID validation
    const staffIdRegex = /^[a-zA-Z0-9]{1,}$/; // Example: Alphanumeric, at least 5 characters
    if (!staffIdRegex.test(staffId)) {
      errors.staffId = "Please enter a valid Staff ID";
      isValid = false;
    }

    // Password validation
    if (passwd.trim() === "") {
      errors.passwd = "Password cannot be empty";
      isValid = false;
    }

    setError(errors);

    if (isValid) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          "http://localhost:3000/api/staff/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              staffId,
              password: passwd,
            }),
          }
        );

        const data = await response.json();
        setLoading(false); // Stop loading

        if (!response.ok) {
          // Handle errors from the server
          if (data.error) {
            alert(data.error);
          } else {
            alert("An error occurred. Please try again.");
          }
          return;
        }

        // Successful login
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Save the JWT token
        localStorage.setItem("userProfile", JSON.stringify(data.staff)); // Save user profile
        console.log("Saved token:", localStorage.getItem("token"));


        // Redirect based on role
        const { role } = data.staff;
        switch (role) {
          case "Staff":
            navigate("/staff-home");
            break;
          case "Courier":
            navigate("/courier-home");
            break;
          case "Admin":
            navigate("/admin-home");
            break;
          default:
            navigate("/"); // Default redirection
        }
      } catch (error) {
        setLoading(false); // Stop loading
        console.error("Login Error:", error);
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
            placeholder="Staff ID" // Updated placeholder
            value={staffId} // Updated value
            onChange={(e) => setStaffId(e.target.value)} // Updated handler
          />
          {error.staffId && <p className="error">{error.staffId}</p>}
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

        <button className="submit" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div className="input-wrapper">
          <div className="signup">
            <span>
              Don't have an account? <Link to="/staff-signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StaffLogin;
