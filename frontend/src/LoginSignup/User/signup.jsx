// import React, { useState } from "react";
// import "./signup.css";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate here
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// function UserSignUp() {
//   const [phone, setPhone] = useState("");
//   const [passwd, setPassword] = useState("");
//   const [Cpasswd, setCPassword] = useState("");
//   const [Fname, setFname] = useState("");
//   const [Lname, setLname] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState({ phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" });

//   // Initialize useNavigate here
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     let isValid = true;
//     let errors = { phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" };

//     // Phone number validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       errors.phone = "Please enter a valid 10-digit phone number";
//       isValid = false;
//     }

//     // Password validation
//     if (passwd.trim() === "") {
//       errors.passwd = "Password cannot be empty";
//       isValid = false;
//     } else if (passwd.length < 6) {
//       errors.passwd = "Password should be at least 6 characters";
//       isValid = false;
//     }

//     // Confirm password validation
//     if (Cpasswd !== passwd) {
//       errors.Cpasswd = "Passwords do not match";
//       isValid = false;
//     }

//     // First name validation
//     if (Fname.trim() === "") {
//       errors.Fname = "First name cannot be empty";
//       isValid = false;
//     }

//     // Last name validation
//     if (Lname.trim() === "") {
//       errors.Lname = "Last name cannot be empty";
//       isValid = false;
//     }

//     setError(errors);

//     if (isValid) {
//       // Add signup logic here (e.g., API call)
//       alert("Account created successfully!");
      
//       // Redirect to the home page after successful signup
//       navigate("/home"); // Replace with the correct route for your homepage
//     }
//   };

//   return (
//     <>
//     <body className="user-signup">
//     <Link to="/" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//      <div className="wrapper">
//         <div className="text">Sign Up</div>
      
//       {/* First Name Field */}
//       <div className="input-wrapper">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={Fname}
//           onChange={(e) => setFname(e.target.value)}
//         />
//         {error.Fname && <div className="error">{error.Fname}</div>}
//       </div>

//       {/* Last Name Field */}
//       <div className="input-wrapper">
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={Lname}
//           onChange={(e) => setLname(e.target.value)}
//         />
//         {error.Lname && <div className="error">{error.Lname}</div>}
//       </div>

//       {/* Phone Number Field */}
//       <div className="input-wrapper">
//         <input
//           type="text"
//           placeholder="Phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         {error.phone && <div className="error">{error.phone}</div>}
//       </div>

//       {/* Password Field */}
//       <div className="input-wrapper">
//         <div className="input">
//           <input
//             className="passwd"
//             type={visible ? "text" : "password"}
//             placeholder="Password"
//             value={passwd}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <i className="passVis" onClick={() => setVisible(!visible)}>
//             {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//           </i>
//         </div>
//         {error.passwd && <div className="error">{error.passwd}</div>}
//       </div>

//       {/* Confirm Password Field */}
//       <div className="input-wrapper">
//         <div className="input">
//           <input
//             className="Conf"
//             type={confirmPasswordVisible ? "text" : "password"}
//             placeholder="Confirm Password"
//             value={Cpasswd}
//             onChange={(e) => setCPassword(e.target.value)}
//           />
//           <i className="passVis" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
//             {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//           </i>
//         </div>
//         {error.Cpasswd && <div className="error">{error.Cpasswd}</div>}
//       </div>

//       {/* Submit Button */}
//       <button className="submit" onClick={handleSignup}>
//         Create an account
//       </button>

//       <div className="input-wrapper">
//         <div className="signup">
//           <span>
//             Already have an account? <Link to="/user-login">Log In</Link>
//           </span>
//         </div>
//       </div>
//       </div>
//       </body>
//     </>
//   );
// }

// export default UserSignUp;

import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate here
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function UserSignUp() {
  const [phone, setPhone] = useState("");
  const [passwd, setPassword] = useState("");
  const [Cpasswd, setCPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({ phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" });

  // Initialize useNavigate here
  const navigate = useNavigate();

  const handleSignup = async () => {
    let isValid = true;
    let errors = { phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" };
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }
  
    // Password validation
    if (passwd.trim() === "") {
      errors.passwd = "Password cannot be empty";
      isValid = false;
    } else if (passwd.length < 6) {
      errors.passwd = "Password should be at least 6 characters";
      isValid = false;
    }
  
    // Confirm password validation
    if (Cpasswd !== passwd) {
      errors.Cpasswd = "Passwords do not match";
      isValid = false;
    }
  
    // First name validation
    if (Fname.trim() === "") {
      errors.Fname = "First name cannot be empty";
      isValid = false;
    }
  
    // Last name validation
    if (Lname.trim() === "") {
      errors.Lname = "Last name cannot be empty";
      isValid = false;
    }
  
    setError(errors);
  
    if (isValid) {
      try {
        // API call to backend
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: Fname,
            lastName: Lname,
            phone,
            password: passwd,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Handle success
          alert("Account created successfully!");
          navigate("/user-login"); // Redirect to home or login page
        } else {
          // Handle errors
          alert(data.error || "Failed to sign up");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
 
    <main className="user-signup">
    <Link to="/" className="return-button">
          <i className="bi bi-arrow-left"></i>
        </Link>
     <div className="wrapper">
        <div className="text">Sign Up</div>
      
      {/* First Name Field */}
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="First Name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
        />
        {error.Fname && <div className="error">{error.Fname}</div>}
      </div>

      {/* Last Name Field */}
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Last Name"
          value={Lname}
          onChange={(e) => setLname(e.target.value)}
        />
        {error.Lname && <div className="error">{error.Lname}</div>}
      </div>

      {/* Phone Number Field */}
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error.phone && <div className="error">{error.phone}</div>}
      </div>

      {/* Password Field */}
      <div className="input-wrapper">
        <div className="input">
          <input
            className="passwd"
            type={visible ? "text" : "password"}
            placeholder="Password"
            value={passwd}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="passVis" onClick={() => setVisible(!visible)}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </i>
        </div>
        {error.passwd && <div className="error">{error.passwd}</div>}
      </div>

      {/* Confirm Password Field */}
      <div className="input-wrapper">
        <div className="input">
          <input
            className="Conf"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={Cpasswd}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <i className="passVis" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </i>
        </div>
        {error.Cpasswd && <div className="error">{error.Cpasswd}</div>}
      </div>

      {/* Submit Button */}
      <button className="submit" onClick={handleSignup}>
        Create an account
      </button>

      <div className="input-wrapper">
        <div className="signup">
          <span>
            Already have an account? <Link to="/user-login">Log In</Link>
          </span>
        </div>
      </div>
      </div>
      </main>

  );
}

export default UserSignUp;
