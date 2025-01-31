// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./editProfile.css";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// function EditProfile() {
//   const [phone, setPhone] = useState("");
//   const [passwd, setPassword] = useState("");
//   const [Cpasswd, setCPassword] = useState("");
//   const [Fname, setFname] = useState("");
//   const [Lname, setLname] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState({ phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" });

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     // Fetch user data from API or local storage and set initial state
//     const fetchUserData = async () => {
//       // Example API call to get user data
//       const userData = {
//         Fname: "John",
//         Lname: "Doe",
//         phone: "1234567890",
//       };
//       setFname(userData.Fname);
//       setLname(userData.Lname);
//       setPhone(userData.phone);
//     };

//     fetchUserData();
//   }, []);

//   const handleUpdate = () => {
//     let isValid = true;
//     let errors = { phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" };

//     // Phone number validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       errors.phone = "Please enter a valid 10-digit phone number";
//       isValid = false;
//     }

//     // Password validation (optional: only if user wants to update password)
//     if (passwd.trim() !== "" && passwd.length < 6) {
//       errors.passwd = "Password should be at least 6 characters";
//       isValid = false;
//     }

//     // Confirm password validation
//     if (passwd.trim() !== "" && Cpasswd !== passwd) {
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
//       // Simulate API call to update profile
//       setTimeout(() => {
//         alert("Profile updated successfully!");

//         // Navigate back to the profile page
//         navigate("/profile");
//       }, 500); // Mock delay for API call
//     }
//   };

//   return (
//     <>
// <body className="edit-profile">
//         <div className="edit-text">Edit Profile</div>
        

//       {/* First Name Field */}
//       <div className="edit-input-wrapper">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={Fname}
//           onChange={(e) => setFname(e.target.value)}
//         />
//         {error.Fname && <div className="error">{error.Fname}</div>}
//       </div>

//       {/* Last Name Field */}
//       <div className="edit-input-wrapper">
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={Lname}
//           onChange={(e) => setLname(e.target.value)}
//         />
//         {error.Lname && <div className="error">{error.Lname}</div>}
//       </div>

//       {/* Phone Number Field */}
//       <div className="edit-input-wrapper">
//         <input
//           type="text"
//           placeholder="Phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         {error.phone && <div className="error">{error.phone}</div>}
//       </div>

//       {/* Password Field */}
//       <div className="edit-input-wrapper">
//         <div className="input">
//           <input
//             className="passwd"
//             type={visible ? "text" : "password"}
//             placeholder="New Password (optional)"
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
//       <div className="edit-input-wrapper">
//         <div className="input">
//           <input
//             className="Conf"
//             type={confirmPasswordVisible ? "text" : "password"}
//             placeholder="Confirm New Password"
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
//       <button className="submit" onClick={handleUpdate}>
//         Update Profile
//       </button>
//       </body>
//     </>
//   );
// }

// export default EditProfile;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./editProfile.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function EditProfile() {
  const [phone, setPhone] = useState("");
  const [passwd, setPassword] = useState("");
  const [Cpasswd, setCPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({ phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setFname(data.firstName);
        setLname(data.lastName);
        setPhone(data.phone);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    let isValid = true;
    let errors = { phone: "", passwd: "", Fname: "", Lname: "", Cpasswd: "" };
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.trim() !== "" && !phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }
  
    // Password validation (only if user wants to update password)
    if (passwd.trim() !== "" && passwd.length < 6) {
      errors.passwd = "Password should be at least 6 characters";
      isValid = false;
    }
  
    // Confirm password validation
    if (passwd.trim() !== "" && Cpasswd !== passwd) {
      errors.Cpasswd = "Passwords do not match";
      isValid = false;
    }
  
    setError(errors);
  
    if (isValid) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authorization token not found");
        }
  
        // Construct payload with only the fields that have values
        const payload = {};
        if (Fname.trim() !== "") payload.firstName = Fname;
        if (Lname.trim() !== "") payload.lastName = Lname;
        if (phone.trim() !== "") payload.phone = phone;
        if (passwd.trim() !== "") payload.password = passwd;
  
        // Make the PUT request
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update profile");
        }
  
        alert("Profile updated successfully!");
  
        // Redirect to the profile page
        navigate("/user-login");
      } catch (error) {
        console.error("Error updating profile:", error.message);
        alert(error.message || "Error updating profile");
      }
    }
  };
  
  return (
    <>
      <body className="edit-profile">
        <div className="edit-text">Edit Profile</div>

        {/* First Name Field */}
        <div className="edit-input-wrapper">
          <input
            type="text"
            placeholder="First Name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          />
          {error.Fname && <div className="error">{error.Fname}</div>}
        </div>

        {/* Last Name Field */}
        <div className="edit-input-wrapper">
          <input
            type="text"
            placeholder="Last Name"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          />
          {error.Lname && <div className="error">{error.Lname}</div>}
        </div>

        {/* Phone Number Field */}
        <div className="edit-input-wrapper">
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phone && <div className="error">{error.phone}</div>}
        </div>

        {/* Password Field */}
        <div className="edit-input-wrapper">
          <div className="input">
            <input
              className="passwd"
              type={visible ? "text" : "password"}
              placeholder="New Password (optional)"
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
        <div className="edit-input-wrapper">
          <div className="input">
            <input
              className="Conf"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm New Password"
              value={Cpasswd}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <i
              className="passVis"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </i>
          </div>
          {error.Cpasswd && <div className="error">{error.Cpasswd}</div>}
        </div>

        {/* Submit Button */}
        <button className="submit" onClick={handleUpdate}>
          Update Profile
        </button>
      </body>
    </>
  );
}

export default EditProfile;
