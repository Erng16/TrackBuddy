// import React, { useState } from "react";
// import "./signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function StaffSignUp() {
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

//   const handleSignup = () => {
//     let isValid = true;
//     let errors = {
//       passwd: "",
//       Fname: "",
//       Lname: "",
//       Cpasswd: "",
//       role: "",
//       office: "",
//     };

//     if (passwd.trim() === "") {
//       errors.passwd = "Password cannot be empty";
//       isValid = false;
//     } else if (passwd.length < 6) {
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
//       alert("Account created successfully!");

//       if (selectedRole === "Staff") {
//         navigate("/staff-home"); // Navigate to staff home if role is Staff
//       } else if (selectedRole === "Courier") {
//         navigate("/courier-home"); // Navigate to courier home if role is Courier
//       } else {
//         navigate("/"); // Default navigation for other roles
//       }
//     }
//   };

//   return (
//     <main className="staff-signup">
//       <Link to="/" className="return-button">
//         <i className="bi bi-arrow-left"></i>
//       </Link>
//       <div className="wrapper">
//         <div className="text">Sign Up</div>

//         {/* First Name Field */}
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={Fname}
//             onChange={(e) => setFname(e.target.value)}
//           />
//           {error.Fname && <div className="error">{error.Fname}</div>}
//         </div>

//         {/* Last Name Field */}
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={Lname}
//             onChange={(e) => setLname(e.target.value)}
//           />
//           {error.Lname && <div className="error">{error.Lname}</div>}
//         </div>

//         {/* Role Dropdown */}
//         <div className="drop-wrapper">
//           <div className="dropdown">
//             <div
//               className={`select ${dropdownOpen ? "select-clicked" : ""}`}
//               onClick={toggleDropdown}
//             >
//               <span className="selected">{selectedRole}</span>
//               <div className={`caret ${dropdownOpen ? "caret-rotate" : ""}`}>
//                 <i
//                   className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}
//                 ></i>
//               </div>
//             </div>
//             <ul
//               className={`signup-menu ${
//                 dropdownOpen ? "signup-menu-open" : ""
//               }`}
//             >
//               {roles.map((role, index) => (
//                 <li key={index} onClick={() => handleRoleSelection(role)}>
//                   {role}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {error.role && <div className="error">{error.role}</div>}
//         </div>

//         {/* Work Office Dropdown */}
//         <div className="drop-wrapper">
//           <div className="dropdown">
//             <div
//               className={`select ${officeDropdownOpen ? "select-clicked" : ""}`}
//               onClick={toggleOfficeDropdown}
//             >
//               <span className="selected">{selectedOffice}</span>
//               <div
//                 className={`caret ${officeDropdownOpen ? "caret-rotate" : ""}`}
//               >
//                 <i
//                   className={`bi bi-caret-${
//                     officeDropdownOpen ? "up" : "down"
//                   }-fill`}
//                 ></i>
//               </div>
//             </div>
//             <ul
//               className={`signup-menu ${
//                 officeDropdownOpen ? "signup-menu-open" : ""
//               }`}
//             >
//               {offices.map((office, index) => (
//                 <li key={index} onClick={() => handleOfficeSelection(office)}>
//                   {office}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {error.office && <div className="error">{error.office}</div>}
//         </div>

//         {/* Password Field */}
//         <div className="input-wrapper">
//           <div className="input">
//             <input
//               className="passwd"
//               type={visible ? "text" : "password"}
//               placeholder="Password"
//               value={passwd}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <i className="passVis" onClick={() => setVisible(!visible)}>
//               {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//             </i>
//           </div>
//           {error.passwd && <div className="error">{error.passwd}</div>}
//         </div>

//         {/* Confirm Password Field */}
//         <div className="input-wrapper">
//           <div className="input">
//             <input
//               className="Conf"
//               type={confirmPasswordVisible ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={Cpasswd}
//               onChange={(e) => setCPassword(e.target.value)}
//             />
//             <i
//               className="passVis"
//               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//             >
//               {confirmPasswordVisible ? (
//                 <EyeOutlined />
//               ) : (
//                 <EyeInvisibleOutlined />
//               )}
//             </i>
//           </div>
//           {error.Cpasswd && <div className="error">{error.Cpasswd}</div>}
//         </div>

//         {/* Submit Button */}
//         <button className="submit" onClick={handleSignup}>
//           Create an account
//         </button>

//         <div className="input-wrapper">
//           <div className="signup">
//             <span>
//               Already have an account? <Link to="/staff-login">Log In</Link>
//             </span>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default StaffSignUp;
import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";

function StaffSignUp() {
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
  const [selectedOffice, setSelectedOffice] = useState(""); // Selected office

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  const roles = ["Staff", "Courier", "Admin"];

  const handleSignup = async () => {
    let isValid = true;
    let errors = {
      passwd: "",
      Fname: "",
      Lname: "",
      Cpasswd: "",
      role: "",
      office: "",
    };
  
    if (passwd.trim() === "") {
      errors.passwd = "Password cannot be empty";
      isValid = false;
    } else if (passwd.length < 6) {
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
  
    if (!selectedOffice.trim()) {
      errors.office = "Please enter a work office (distribution ID)";
      isValid = false;
    }
  
    setError(errors);
  
    if (isValid) {
      try {
        const response = await fetch("http://localhost:3000/api/staff/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: Fname,
            lastName: Lname,
            password: passwd,
            distId: Number(selectedOffice.trim()), // Trim the input to remove extra spaces
            role: selectedRole,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(data.error || "Error creating account");
          return;
        }
  
        alert("Account created successfully!");
        navigate("/staff-login");
      } catch (error) {
        console.error("Signup Error:", error.message);
        alert("An error occurred during signup. Please try again.");
      }
    }
  };
  
  

  return (
    <main className="staff-signup">
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

        {/* Role Dropdown */}
        <div className="drop-wrapper">
          <div className="dropdown">
            <div
              className={`select ${dropdownOpen ? "select-clicked" : ""}`}
              onClick={toggleDropdown}
            >
              <span className="selected">{selectedRole}</span>
              <div className={`caret ${dropdownOpen ? "caret-rotate" : ""}`}>
                <i
                  className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}
                ></i>
              </div>
            </div>
            <ul
              className={`signup-menu ${
                dropdownOpen ? "signup-menu-open" : ""
              }`}
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

        {/* Work Office Input */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Work Office"
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
          />
          {error.office && <div className="error">{error.office}</div>}
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
            <i
              className="passVis"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
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
              Already have an account? <Link to="/staff-login">Log In</Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StaffSignUp;
