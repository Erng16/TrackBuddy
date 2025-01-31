// import React, { useState } from "react";
// import "./StaffInfo.css"; // Create this CSS file for custom styling
// import { Link } from "react-router-dom";
// import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
// import StaffCardList from "./StaffCardList";

// // Mock data for staff (Replace with actual data source or API call)
// const initialStaffList = [
//   { id: "S001", name: "John Doe", role: "Courier", workOffice: "New York" },
//   { id: "S002", name: "Jane Smith", role: "Staff", workOffice: "Los Angeles" },
//   { id: "S003", name: "Alice Brown", role: "Courier", workOffice: "Chicago" },
//   { id: "S004", name: "Bob White", role: "Staff", workOffice: "Houston" },
// ];

// function StaffInfo() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [staffList, setStaffList] = useState(initialStaffList); // Use initialStaffList as the initial state

//   // Filter staff based on search term
//   const filteredStaff = staffList.filter((staff) => {
//     const trimmedSearch = searchTerm.trim().toLowerCase();
//     return (
//       trimmedSearch === "" ||
//       staff.name.toLowerCase().includes(trimmedSearch) ||
//       staff.id.toLowerCase().includes(trimmedSearch) ||
//       staff.workOffice.toLowerCase().includes(trimmedSearch)
//     );
//   });
//   console.log("Filtered Staff:", filteredStaff);


//   // Handle staff deletion
//   const handleDelete = (id) => {
//     const updatedList = staffList.filter((staff) => staff.id !== id); // Remove staff with matching ID
//     setStaffList(updatedList); // Update state
//   };

//   return (
//     <div className="staff-info-page">
//       <div className="staff-info-container">
//         <div className="header">Staff Information</div>
//       </div>
//       <div className="staff-info-input-wrapper">
//         <div className="search-bar">
//           <div className="input">
//             <input
//               type="text"
//               placeholder="Search by Name or Staff ID or Work Office"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
//             />
//             <i className="search">
//               <SearchOutlined />
//             </i>
//           </div>
//         </div>
//       </div>
//       <div className="staff-info-container">
//         <div className="staff-card-list">
//           {filteredStaff.length > 0 ? (
//             <StaffCardList staffList={filteredStaff} onDelete={handleDelete} />
//           ) : (
//             <div className="no-results">No staff found</div>
//           )}
//         </div>
//       </div>
//       <div className="admin-home-container">
//         <div className="menu">
//           <Link to="/admin-home">
//             <HomeOutlined />
//           </Link>
//           <Link to="/admin/staff-info">
//             <i className="bi bi-person-vcard-fill"></i>
//           </Link>
//           <Link to="/staff-profile">
//             <i className="bi bi-person"></i>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StaffInfo;

import React, { useState, useEffect } from "react";
import "./StaffInfo.css";
import { Link } from "react-router-dom";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import StaffCardList from "./StaffCardList";

function StaffInfo() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [staffList, setStaffList] = useState([]); // State for staff results

  // Fetch all staff or search staff based on search term
  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const endpoint =
          searchTerm.trim().length >= 2
            ? `http://localhost:3000/api/admin/deleteStaff/search?search=${searchTerm}`
            : `http://localhost:3000/api/admin/deleteStaff`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching staff list: ${response.statusText}`);
        }

        const data = await response.json();
        // Format the response data as needed
        const formattedData = data.map((staff) => ({
          id: staff.staff_id,
          name: staff.staff_name,
          workOffice: staff.work_office,
        }));
        setStaffList(formattedData);
      } catch (error) {
        console.error("Error fetching staff list:", error.message);
      }
    };

    fetchStaffList();
  }, [searchTerm]);

  // Handle staff deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(`http://localhost:3000/api/admin/deleteStaff/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting staff: ${response.statusText}`);
      }

      // Remove the deleted staff from the state
      setStaffList((prevList) => prevList.filter((staff) => staff.id !== id));
      alert("Staff deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error.message);
      alert("An error occurred while deleting the staff. Please try again.");
    }
  };

  return (
    <div className="staff-info-page">
      <div className="staff-info-container">
        <div className="header">Staff Information</div>
      </div>
      <div className="staff-info-input-wrapper">
        <div className="search-bar">
          <div className="input">
            <input
              type="text"
              placeholder="Search by Name or Staff ID or Work Office"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
            />
            <i className="search">
              <SearchOutlined />
            </i>
          </div>
        </div>
      </div>
      <div className="staff-info-container">
        <div className="staff-card-list">
          {staffList.length > 0 ? (
            <StaffCardList staffList={staffList} onDelete={handleDelete} />
          ) : (
            <div className="no-results">No staff found</div>
          )}
        </div>
      </div>
      <div className="admin-home-container">
        <div className="menu">
          <Link to="/admin-home">
            <HomeOutlined />
          </Link>
          <Link to="/admin/staff-info">
            <i className="bi bi-person-vcard-fill"></i>
          </Link>
          <Link to="/admin-profile">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
