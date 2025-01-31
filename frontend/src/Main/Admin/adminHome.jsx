// import React, { useState } from "react";
// import "./home.css";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   SearchOutlined,
//   BellOutlined,
//   HomeFilled,
// } from "@ant-design/icons";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useShipmentContext } from "../ShipmentContext"; // Import Shipment Context
// import Card from "./Shipment/card/AdminCard"; // Import the Card component

// function AdminHome() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [filterDate, setFilterDate] = useState(""); // State for filter by date input
//   const { shipments } = useShipmentContext(); // Fetch shipments from context
//   const navigate = useNavigate(); // React Router navigation function

//   // Filter shipments based on search term and date
//   const filteredShipments = shipments.filter((shipment) => {
//     const trimmedSearch = searchTerm.trim().toLowerCase();
//     const matchesSearch =
//       trimmedSearch === "" ||
//       shipment.trackingNumber.toLowerCase().includes(trimmedSearch) ||
//       shipment.sender.toLowerCase().includes(trimmedSearch) ||
//       shipment.receiver.toLowerCase().includes(trimmedSearch);

//     const matchesDate =
//       filterDate === "" || shipment.time.startsWith(filterDate); // Check if date matches

//     return matchesSearch && matchesDate;
//   });

//   const totalShipments = shipments.length;
//   const deliveredShipments = shipments.filter(
//     (shipment) => shipment.status.toLowerCase() === "delivered"
//   ).length;
//   const unsuccessfulShipments = shipments.filter(
//     (shipment) => shipment.status.toLowerCase() === "unsuccessful"
//   ).length;

//   // Navigation handlers
//   const handleCardClick = (filter) => {
//     const query = filter === "All" ? "" : `?filter=${filter}`;
//     navigate(`/admin-shipments${query}`);
//   };

//   return (
//     <>
//       <body className="adminHome">
//         <div className="admin-home-container">
//           <div className="header">Admin Dashboard</div>
//           <div className="text"></div>
//           <div className="underline"></div>
//           {/* Filter by Date Field */}
//           <div className="filter-date-wrapper">
//             <label htmlFor="filter-date" className="filter-label">
//               Filter by Date:
//             </label>
//             <input
//               id="filter-date"
//               type="date"
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)} // Update filterDate state
//               className="filter-date-input"
//             />
//           </div>
//         </div>
//         <div className="admin-home-container">
//           <div className="summary-cards">
//             <div
//               className="card total-shipments"
//               onClick={() => handleCardClick("All")}
//             >
//               <h3>Total Shipments</h3>
//               <p>{totalShipments}</p>
//             </div>
//             <div
//               className="card delivered-shipments"
//               onClick={() => handleCardClick("Delivered")}
//             >
//               <h3>Delivered Shipments</h3>
//               <p>{deliveredShipments}</p>
//             </div>
//             <div
//               className="card unsuccessful-shipments"
//               onClick={() => handleCardClick("Unsuccessful")}
//             >
//               <h3>Unsuccessful Shipments</h3>
//               <p>{unsuccessfulShipments}</p>
//             </div>
//           </div>
//         </div>
//         <div className="admin-home-input-wrapper">
//           <div className="input">
//             <input
//               type="text"
//               placeholder="Search by tracking number"
//               value={searchTerm} // Bind to searchTerm state
//               onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
//             />
//             <i className="search">
//               <SearchOutlined />
//             </i>
//           </div>
//         </div>
//         <div className="shipment-results">
//           {filteredShipments.length > 0 ? (
//             <div className="scrollable-container">
//               {filteredShipments.map((shipment) => (
//                 <Card
//                   key={shipment.trackingNumber}
//                   trackingNumber={shipment.trackingNumber}
//                   status={shipment.status}
//                   updateTime={shipment.time}
//                   sender={shipment.sender}
//                   receiver={shipment.receiver}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="no-results">
//               <p>No shipments available.</p>
//             </div>
//           )}
//         </div>
//         <div className="admin-home-container">
//           <div className="menu">
//             <Link to="/admin-home">
//               <HomeFilled />
//             </Link>
//             <Link to="/admin/staff-info">
//               <i className="bi bi-person-vcard"></i>
//             </Link>
//             <Link to="/admin-profile">
//               <i className="bi bi-person"></i>
//             </Link>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// }

// export default AdminHome;

import React, { useState, useEffect } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, HomeFilled } from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./Shipment/card/AdminCard"; // Import the Card component

let debounceTimeout;

function AdminHome() {
  const [filterDate, setFilterDate] = useState(""); // State for filter by date input
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [summaryCounts, setSummaryCounts] = useState({
    total: 0,
    delivered: 0,
    unsuccessful: 0,
  }); // State for summary counts
  const [unsuccessfulShipments, setUnsuccessfulShipments] = useState([]); // State for unsuccessful shipments
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const navigate = useNavigate(); // React Router navigation function

  // Set the current date as the default filterDate on initial render
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFilterDate(today);
    fetchSummaryCounts(today);
    fetchUnsuccessfulShipments(); // Fetch unsuccessful shipments
  }, []);

  // Fetch shipment counts by date
  const fetchSummaryCounts = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/reports/counts?date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Please log in again.");
          navigate("/staff-login");
          return;
        }
        throw new Error(`Failed to fetch summary counts: ${response.status}`);
      }

      const data = await response.json();
      setSummaryCounts({
        total: data["All status"] || 0,
        delivered: data["Delivered"] || 0,
        unsuccessful: data["Unsuccessful"] || 0,
      });
    } catch (error) {
      console.error("Error fetching summary counts:", error.message);
      setSummaryCounts({ total: 0, delivered: 0, unsuccessful: 0 });
    }
  };

  // Fetch all unsuccessful shipments
  const fetchUnsuccessfulShipments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/reports/unsuccessful`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch unsuccessful shipments: ${response.status}`);
      }

      const data = await response.json();
      setUnsuccessfulShipments(data);
    } catch (error) {
      console.error("Error fetching unsuccessful shipments:", error.message);
    }
  };

  // Fetch shipment by tracking number
  const fetchShipmentByTrackingId = async (trackingId) => {
    const MIN_TRACKING_ID_LENGTH = 11; // Set minimum length based on your backend requirements

    if (!trackingId || trackingId.length < MIN_TRACKING_ID_LENGTH) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/tracking/basic/${trackingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setSearchResults([]); // Clear results if not found
          return;
        }
        throw new Error(`Failed to fetch shipment: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults([data]); // Add the result to search results
    } catch (error) {
      console.error("Error fetching shipment:", error.message);
      setSearchResults([]); // Clear results on error
    }
  };

  // Handle search term change with debounce
  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchShipmentByTrackingId(value);
    }, 500); // Wait 500ms before calling the API
  };


  // Handle date change and fetch counts
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    fetchSummaryCounts(selectedDate);
  };
  const handleCardClick = (status) => {
    const query = `?date=${filterDate || new Date().toISOString().split("T")[0]}&status=${status}`;
    navigate(`/admin-shipments${query}`);
  };


  return (
    <>
      <main className="adminHome">
        <div className="admin-home-container">
          <div className="header">Admin Dashboard</div>
          <div className="text"></div>
          <div className="underline"></div>
          {/* Filter by Date Field */}
          <div className="filter-date-wrapper">
            <label htmlFor="filter-date" className="filter-label">
              Filter by Date:
            </label>
            <input
              id="filter-date"
              type="date"
              value={filterDate}
              onChange={handleDateChange}
              className="filter-date-input"
            />
          </div>
        </div>
        <div className="admin-home-container">
          <div className="summary-cards">
            <div
              className="card total-shipments"
              onClick={() => handleCardClick("All")} // Pass "All" as the status
            >
              <h3>Total Shipments</h3>
              <p>{summaryCounts.total}</p>
            </div>
            <div
              className="card delivered-shipments"
              onClick={() => handleCardClick("Delivered")} // Pass "Delivered" as the status
            >
              <h3>Delivered Shipments</h3>
              <p>{summaryCounts.delivered}</p>
            </div>
            <div
              className="card unsuccessful-shipments"
              onClick={() => handleCardClick("Unsuccessful")} // Pass "Unsuccessful" as the status
            >
              <h3>Unsuccessful Shipments</h3>
              <p>{summaryCounts.unsuccessful}</p>
            </div>
          </div>

          <div className="admin-home-input-wrapper">
            <div className="input">
              <input
                type="text"
                placeholder="Search by tracking number"
                value={searchTerm}
                onChange={handleSearchTermChange} // Trigger search on input change
              />
              <i className="search">
                <SearchOutlined />
              </i>
            </div>
          </div>
        </div>
        <div className="shipment-results-scrollable-container">
          {(searchResults.length > 0 ? searchResults : unsuccessfulShipments).map((shipment) => (
            <Card
              key={shipment.tracking_id}
              trackingNumber={shipment.tracking_id}
              status={shipment.status_tracking}
              updateTime={shipment.timestamp}
              sender={shipment.from}
              receiver={shipment.to}
            />
          ))}
        </div>
        <div className="admin-home-container">
          <div className="menu">
            <Link to="/admin-home">
              <HomeFilled />
            </Link>
            <Link to="/admin/staff-info">
              <i className="bi bi-person-vcard"></i>
            </Link>
            <Link to="/admin-profile">
              <i className="bi bi-person"></i>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminHome;
