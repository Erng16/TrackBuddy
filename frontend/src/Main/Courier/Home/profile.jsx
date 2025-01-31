// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { HomeOutlined } from "@ant-design/icons";
// import "./profile.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function AdminProfilePage() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({ name: "", staffId: "" }); // Updated phone to staffId

//   useEffect(() => {
//     // Fetch user data from API or local storage
//     const fetchUserData = () => {
//       // Simulate fetching data from localStorage or an API
//       const storedUserData = JSON.parse(localStorage.getItem("user")) || {
//         name: "John Doe",
//         staffId: "STF123456", // Updated mock data to staffId
//       };

//       setUserData(storedUserData);
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     // Clear token or session
//     localStorage.removeItem("authToken"); // Or sessionStorage.removeItem("authToken")
//     localStorage.removeItem("user"); // Clear user data
//     // Redirect to login page
//     navigate("/staff-login");
//   };

//   const handleEditProfile = () => {
//     // Redirect to edit profile page
//     navigate("/staff-profile/edit-profile");
//   };

//   return (
//     <>
    
//       <body className="profile">
//         <div className="profile-wrapper">
//           <i className="bi bi-person-circle">
//             <span className="name">
//               Name: {userData.name}
//               <br />
//               Staff ID: {userData.staffId}
//             </span>
//           </i>
//           <div className="profile-input-wrapper">
//             <button className="Edit" onClick={handleEditProfile}>
//               Edit Profile
//             </button>
//             <button className="Edit" onClick={handleLogout}>
//               Log Out
//             </button>
//           </div>
//         </div>
//         <div className="profile-container">
//           <div className="menu">
//           <Link to="/admin-home">
//               <HomeOutlined />
//             </Link>
//             <Link to="/admin/staff-info">
//               <i className="bi bi-person-vcard"></i>
//             </Link>
//             <Link to="/staff-profile">
//               <i className="bi bi-person-fill"></i>
//             </Link>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// }

// export default AdminProfilePage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "./profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function CourierProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    staffId: "",
    role: "",
    workOffice: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch("http://localhost:3000/api/staff/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }

        const data = await response.json();
        const profile = data.profile;

        // Update state with the fetched profile data
        setUserData({
          name: `${profile.staff_fname} ${profile.staff_lname}`,
          staffId: profile.staff_id,
          role: profile.staff_role,
          workOffice: profile.dist_id, // Assuming work office is represented by dist_id
        });
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        // Optionally handle errors, such as redirecting to login if unauthorized
        navigate("/staff-login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user"); // Clear user data
    navigate("/staff-login"); // Redirect to login page
  };

  const handleEditProfile = () => {
    navigate("/courier-profile/edit-profile"); // Redirect to edit profile page
  };

  return (
      <main className="profile">
        <div className="profile-wrapper">
          <i className="bi bi-person-circle">
            <span className="name">
              Name: {userData.name}
              <br />
              Staff ID: {userData.staffId}
              <br />
              Role: {userData.role}
              <br />
              Work Office: {userData.workOffice}
            </span>
          </i>
          <div className="profile-input-wrapper">
            <button className="Edit" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="Edit" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="profile-container">
          <div className="menu">
            <Link to="/courier-home">
              <HomeOutlined />
            </Link>
            <Link to="/courier-profile">
              <i className="bi bi-person-fill"></i>
            </Link>
          </div>
        </div>
      </main>

  );
}

export default CourierProfilePage;
