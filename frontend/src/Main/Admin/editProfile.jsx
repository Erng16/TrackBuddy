// import React, { useEffect, useState } from "react";
// import "../../LoginSignup/Staff/signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function AdminEditProfile() {
//   const [passwd, setPassword] = useState("");
//   const [Cpasswd, setCPassword] = useState("");
//   const [Fname, setFname] = useState("");
//   const [Lname, setLname] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState({
//     passwd: "",
//     Fname: "",
//     Lname: "",
//     Cpasswd: "",
//     role: "",
//     office: "",
//   });
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("Role");
//   const [officeDropdownOpen, setOfficeDropdownOpen] = useState(false);
//   const [selectedOffice, setSelectedOffice] = useState("Work Office");

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch staff profile data from an API or localStorage
//     const fetchProfileData = () => {
//       const storedData = JSON.parse(localStorage.getItem("userProfile")) || {
//         Fname: "John",
//         Lname: "Doe",
//         role: "Staff",
//         office: "Distribution A",
//         passwd: "",
//       };

//       setFname(storedData.Fname);
//       setLname(storedData.Lname);
//       setSelectedRole(storedData.role);
//       setSelectedOffice(storedData.office);
//     };

//     fetchProfileData();
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleRoleSelection = (role) => {
//     setSelectedRole(role);
//     setDropdownOpen(false);
//   };

//   const toggleOfficeDropdown = () => {
//     setOfficeDropdownOpen(!officeDropdownOpen);
//   };

//   const handleOfficeSelection = (office) => {
//     setSelectedOffice(office);
//     setOfficeDropdownOpen(false);
//   };

//   const roles = ["Staff", "Courier", "Admin"];
//   const offices = ["Distribution A", "Distribution B", "Distribution C"];

//   const handleUpdateProfile = () => {
//     let isValid = true;
//     let errors = {
//       passwd: "",
//       Fname: "",
//       Lname: "",
//       Cpasswd: "",
//       role: "",
//       office: "",
//     };

//     if (passwd.trim() !== "" && passwd.length < 6) {
//       errors.passwd = "Password should be at least 6 characters";
//       isValid = false;
//     }

//     if (Cpasswd !== passwd) {
//       errors.Cpasswd = "Passwords do not match";
//       isValid = false;
//     }

//     if (Fname.trim() === "") {
//       errors.Fname = "First name cannot be empty";
//       isValid = false;
//     }

//     if (Lname.trim() === "") {
//       errors.Lname = "Last name cannot be empty";
//       isValid = false;
//     }

//     if (selectedRole === "Role") {
//       errors.role = "Please select a role";
//       isValid = false;
//     }

//     if (selectedOffice === "Work Office") {
//       errors.office = "Please select a work office";
//       isValid = false;
//     }

//     setError(errors);

//     if (isValid) {
//       alert("Profile updated successfully!");
//       // Save the updated profile data
//       const updatedProfile = {
//         Fname,
//         Lname,
//         role: selectedRole,
//         office: selectedOffice,
//         passwd: passwd || undefined, // Only save if a new password is entered
//       };

//       localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

//       // Redirect to the staff profile page
//       navigate("/admin-profile");
//     }
//   };

//   return (

//       <main className="staff-signup">
//         <Link to="/admin-profile" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//         <div className="wrapper">
//           <div className="text">Edit Profile</div>

//           {/* First Name Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               placeholder="First Name"
//               value={Fname}
//               onChange={(e) => setFname(e.target.value)}
//             />
//             {error.Fname && <div className="error">{error.Fname}</div>}
//           </div>

//           {/* Last Name Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={Lname}
//               onChange={(e) => setLname(e.target.value)}
//             />
//             {error.Lname && <div className="error">{error.Lname}</div>}
//           </div>

//           {/* Role Dropdown */}
//           <div className="drop-wrapper">
//             <div className="dropdown">
//               <div
//                 className={`select ${dropdownOpen ? "select-clicked" : ""}`}
//                 onClick={toggleDropdown}
//               >
//                 <span className="selected">{selectedRole}</span>
//                 <div className={`caret ${dropdownOpen ? "caret-rotate" : ""}`}>
//                   <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
//                 </div>
//               </div>
//               <ul
//                 className={`signup-menu ${dropdownOpen ? "signup-menu-open" : ""}`}
//               >
//                 {roles.map((role, index) => (
//                   <li key={index} onClick={() => handleRoleSelection(role)}>
//                     {role}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {error.role && <div className="error">{error.role}</div>}
//           </div>

//           {/* Work Office Dropdown */}
//           <div className="drop-wrapper">
//             <div className="dropdown">
//               <div
//                 className={`select ${officeDropdownOpen ? "select-clicked" : ""}`}
//                 onClick={toggleOfficeDropdown}
//               >
//                 <span className="selected">{selectedOffice}</span>
//                 <div className={`caret ${officeDropdownOpen ? "caret-rotate" : ""}`}>
//                   <i className={`bi bi-caret-${officeDropdownOpen ? "up" : "down"}-fill`}></i>
//                 </div>
//               </div>
//               <ul
//                 className={`signup-menu ${officeDropdownOpen ? "signup-menu-open" : ""}`}
//               >
//                 {offices.map((office, index) => (
//                   <li key={index} onClick={() => handleOfficeSelection(office)}>
//                     {office}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {error.office && <div className="error">{error.office}</div>}
//           </div>

//           {/* Password Field */}
//           <div className="input-wrapper">
//             <div className="input">
//               <input
//                 className="passwd"
//                 type={visible ? "text" : "password"}
//                 placeholder="New Password"
//                 value={passwd}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <i className="passVis" onClick={() => setVisible(!visible)}>
//                 {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//               </i>
//             </div>
//             {error.passwd && <div className="error">{error.passwd}</div>}
//           </div>

//           {/* Confirm Password Field */}
//           <div className="input-wrapper">
//             <div className="input">
//               <input
//                 className="Conf"
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 placeholder="Confirm New Password"
//                 value={Cpasswd}
//                 onChange={(e) => setCPassword(e.target.value)}
//               />
//               <i
//                 className="passVis"
//                 onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//               >
//                 {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//               </i>
//             </div>
//             {error.Cpasswd && <div className="error">{error.Cpasswd}</div>}
//           </div>

//           {/* Update Profile Button */}
//           <button className="submit" onClick={handleUpdateProfile}>
//             Update Profile
//           </button>
//         </div>
//       </main>

//   );
// }

// export default AdminEditProfile;

import React, { useEffect, useState } from "react";
import "../../LoginSignup/Staff/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminEditProfile() {
  const [passwd, setPassword] = useState("");
  const [Cpasswd, setCPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({
    passwd: "",
    Fname: "",
    Lname: "",
    Cpasswd: "",
    role: "",
    office: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Role");
  const [workOfficeId, setWorkOfficeId] = useState(""); // Normal text field for Work Office ID

  const navigate = useNavigate();

  const roles = ["Staff", "Courier", "Admin"]; // Role options

  useEffect(() => {
    const fetchProfileData = () => {
      const storedData = JSON.parse(localStorage.getItem("userProfile")) || {
        Fname: "",
        Lname: "",
        role: "Role",
        office: "",
        passwd: "",
      };

      setFname(storedData.Fname || "");
      setLname(storedData.Lname || "");
      setSelectedRole(storedData.role || "Role");
      setWorkOfficeId(storedData.office || ""); // Set initial value for Work Office ID
    };

    fetchProfileData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  const handleUpdateProfile = async () => {
    let isValid = true;
    let errors = {
      passwd: "",
      Fname: "",
      Lname: "",
      Cpasswd: "",
      role: "",
      office: "",
    };
  
    if (passwd.trim() !== "" && passwd.length < 6) {
      errors.passwd = "Password should be at least 6 characters";
      isValid = false;
    }
  
    if (Cpasswd !== passwd) {
      errors.Cpasswd = "Passwords do not match";
      isValid = false;
    }
  
    if (Fname.trim() === "") {
      errors.Fname = "First name cannot be empty";
      isValid = false;
    }
  
    if (Lname.trim() === "") {
      errors.Lname = "Last name cannot be empty";
      isValid = false;
    }
  
    if (selectedRole === "Role") {
      errors.role = "Please select a role";
      isValid = false;
    }
  
    if (!workOfficeId.trim()) {
      errors.office = "Please enter a work office ID";
      isValid = false;
    }
  
    setError(errors);
  
    if (isValid) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) {
          alert("You are not authorized to perform this action.");
          navigate("/staff-login"); // Redirect to login if token is missing
          return;
        }
  
        const updatedProfile = {
          firstName: Fname,
          lastName: Lname,
          role: selectedRole,
          distId: Number(workOfficeId),
          password: passwd || undefined, // Only send password if it is updated
        };
  
        const response = await fetch("http://localhost:3000/api/staff/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          body: JSON.stringify(updatedProfile),
        });
  
        if (response.ok) {
          alert("Profile updated successfully!");
          localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
          navigate("/staff-login");
        } else {
          const result = await response.json();
          alert(result.error || "Failed to update profile.");
        }
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("An error occurred while updating the profile.");
      }
    }
  };
  

  return (
    <main className="staff-signup">
      <Link to="/admin-profile" className="return-button">
        <i className="bi bi-arrow-left"></i>
      </Link>
      <div className="wrapper">
        <div className="text">Edit Profile</div>

        {/* First Name */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="First Name"
            value={Fname || ""}
            onChange={(e) => setFname(e.target.value)}
          />
          {error.Fname && <div className="error">{error.Fname}</div>}
        </div>

        {/* Last Name */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Last Name"
            value={Lname || ""}
            onChange={(e) => setLname(e.target.value)}
          />
          {error.Lname && <div className="error">{error.Lname}</div>}
        </div>

        {/* Role Dropdown */}
        <div className="drop-wrapper">
          <div className="dropdown">
            <div
              className={`select ${dropdownOpen ? "select-clicked" : ""}`}
              onClick={toggleDropdown}
            >
              <span className="selected">{selectedRole}</span>
              <div className={`caret ${dropdownOpen ? "caret-rotate" : ""}`}>
                <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
              </div>
            </div>
            <ul
              className={`signup-menu ${dropdownOpen ? "signup-menu-open" : ""}`}
            >
              {roles.map((role, index) => (
                <li key={index} onClick={() => handleRoleSelection(role)}>
                  {role}
                </li>
              ))}
            </ul>
          </div>
          {error.role && <div className="error">{error.role}</div>}
        </div>

        {/* Work Office Text Field */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Work Office ID"
            value={workOfficeId}
            onChange={(e) => setWorkOfficeId(e.target.value)}
          />
          {error.office && <div className="error">{error.office}</div>}
        </div>

        {/* Password */}
        <div className="input-wrapper">
          <div className="input">
            <input
              className="passwd"
              type={visible ? "text" : "password"}
              placeholder="New Password"
              value={passwd}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="passVis" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </i>
          </div>
          {error.passwd && <div className="error">{error.passwd}</div>}
        </div>

        {/* Confirm Password */}
        <div className="input-wrapper">
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

        <button className="submit" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </main>
  );
}

export default AdminEditProfile;
