// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   SearchOutlined,
//   EnvironmentOutlined,
//   UserOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import "./profile.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function ProfilePage() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({ name: "", phone: "" });

//   useEffect(() => {
//     // Fetch user data from API or local storage
//     const fetchUserData = () => {
//       // Simulate fetching data from localStorage or an API
//       const storedUserData = JSON.parse(localStorage.getItem("user")) || {
//         name: "John Doe",
//         phone: "1234567890",
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
//     navigate("/login");
//   };

//   const handleEditProfile = () => {
//     // Redirect to edit profile page
//     navigate("/profile/edit-profile");
//   };

//   return (
//     <>
//       <body className="profile">
//         <div className="profile-wrapper">
//           <i className="bi bi-person-circle">
//             <span className="name">
//               Name: {userData.name}
//               <br />
//               Phone: {userData.phone}
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
//             <Link to="/home">
//               <HomeOutlined />
//             </Link>
//             <Link to="/locations">
//               <EnvironmentOutlined />
//             </Link>
//             <Link to="/shipments">
//               <i className="bi bi-box2"></i>
//             </Link>
//             <Link to="/profile">
//               <i className="bi bi-person-fill"></i>
//             </Link>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// }

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EnvironmentOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "", phone: "" });
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("Authorization token not found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch profile data");
        }

        const data = await response.json();
        setUserData(data); // Set the user data
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear token or session
    localStorage.removeItem("token"); // Or sessionStorage.removeItem("authToken")
    // Redirect to login page
    navigate("/user-login");
  };

  const handleEditProfile = () => {
    // Redirect to edit profile page
    navigate("/profile/edit-profile");
  };

  if (error) {
    return <p className="error">Error: {error}</p>; // Display error if any
  }

  return (

      <main className="profile">
        <div className="profile-wrapper">
          <i className="bi bi-person-circle">
            <span className="name">
              Name: {userData.firstName} {userData.lastName}
              <br />
              Phone: {userData.phone}
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
            <Link to="/home">
              <HomeOutlined />
            </Link>
            <Link to="/locations">
              <EnvironmentOutlined />
            </Link>
            <Link to="/shipments">
              <i className="bi bi-box2"></i>
            </Link>
            <Link to="/profile">
              <i className="bi bi-person-fill"></i>
            </Link>
          </div>
        </div>
      </main>

  );
}

export default ProfilePage;
