// import React, { useState } from "react";
// import "./home.css";
// import { Link } from "react-router-dom";
// import {
//   SearchOutlined,
//   BellOutlined,
//   HomeFilled,
//   EnvironmentOutlined,
// } from "@ant-design/icons";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import CardList from "../Shipment/card/CardList";

// function HomePage() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const shipments = [
//     {
//       trackingNumber: "CSS0000000001",
//       status: "Delivered",
//       updateTime: "12/09/2024 14:35",
//       sender: "John Smith",
//       receiver: "Alice Withers",
//     },
//     {
//       trackingNumber: "CSS0000000002",
//       status: "In Transit",
//       updateTime: "12/09/2024 12:00",
//       sender: "Mike Doe",
//       receiver: "Sarah Connor",
//     },
//     {
//       trackingNumber: "CSS0000000004",
//       status: "Waiting For Refund",
//       updateTime: "12/09/2024 10:00",
//       sender: "Jane Doe",
//       receiver: "Bob Martin",
//     },
//   ];

//   const filteredShipments = shipments.filter((shipment) => {
//     const trimmedSearch = searchTerm.trim().toLowerCase();

//     // Check if the search term matches any field
//     const matchesSearch =
//       trimmedSearch === "" || // Matches all if search is empty
//       shipment.trackingNumber.toLowerCase().includes(trimmedSearch) ||
//       shipment.sender.toLowerCase().includes(trimmedSearch) ||
//       shipment.receiver.toLowerCase().includes(trimmedSearch);

//     return matchesSearch; // No status filtering here
//   });

//   return (
//     <>
//       <div className="home-container">
//         <div className="header">Hello, User!</div>
//         <div className="text"></div>
//         <div className="underline"></div>
//         <i className="noti">
//           <Link to="/notifications">
//             <BellOutlined />
//           </Link>
//         </i>
//       </div>
//       <div className="home-input-wrapper">
//         <div className="input">
//           <input
//             type="text"
//             placeholder="Search by tracking number"
//             value={searchTerm} // Bind to searchTerm state
//             onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
//           />
//           <i className="search">
//             <SearchOutlined />
//           </i>
//         </div>
//       </div>
//       {searchTerm.trim() ? ( // Only show results if searchTerm is not empty
//         filteredShipments.length > 0 ? (
//           <div className="shipment-results">
//             <CardList shipments={filteredShipments} /> {/* Render matching shipments */}
//           </div>
//         ) : (
//           <div className="no-results">
//             <p>No results found for "{searchTerm}".</p>
//           </div>
//         )
//       ) : null} {/* Do not show anything if searchTerm is empty */}
//       <div className="home-container">
//         <div className="menu">
//           <Link to="/home">
//             <HomeFilled />
//           </Link>
//           <Link to="/locations">
//             <EnvironmentOutlined />
//           </Link>
//           <Link to="/shipments">
//             <i className="bi bi-box2"></i>
//           </Link>
//           <Link to="/profile">
//             <i className="bi bi-person"></i>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage;

import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  BellOutlined,
  HomeFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./Card/NotiCard"; // Import Card component

function HomePage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for fetched search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async (trackingId) => {
    if (trackingId.length < 13) {
      setSearchResults([]); // Clear results if search term is less than 13 characters
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found");
      return;
    }

    setLoading(true); // Set loading to true while fetching
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(
        `http://localhost:3000/api/tracking/basic/${trackingId}`,
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
        } else {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch shipment");
        }
      } else {
        const data = await response.json();
        setSearchResults([data]); // Add the result to search results
      }
    } catch (error) {
      console.error("Error fetching shipment:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    if (value.length >= 10) {
      handleSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <main>
      <div className="home-container">
        <div className="header">Hello, User!</div>
        <div className="text"></div>
        <div className="underline"></div>
        <i className="noti">
          <Link to="/notifications">
            <BellOutlined />
          </Link>
        </i>
      </div>
      <div className="home-input-wrapper">
        <div className="input">
          <input
            type="text"
            placeholder="Search by tracking number"
            value={searchTerm} // Bind to searchTerm state
            onChange={handleInputChange} // Update searchTerm on input
          />
          <i className="search">
            <SearchOutlined />
          </i>
        </div>
      </div>

      <div className="shipment-results">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : searchResults.length > 0 ? (
          <div className="scrollable-container">
            {searchResults.map((shipment) => (
              <Card
                key={shipment.tracking_id} // Ensure unique key
                trackingNumber={shipment.tracking_id}
                status={shipment.current_status}
                sender={shipment.sender_name}
                receiver={shipment.recipient_name}
                lastUpdate={formatTimestamp(shipment.timestamp)} // Format timestamp
              />
            ))}
          </div>
        ) : (
          searchTerm.length >= 10 && (
            <div className="no-results">
              <p>No shipments found.</p>
            </div>
          )
        )}
      </div>

      <div className="home-container">
        <div className="menu">
          <Link to="/home">
            <HomeFilled />
          </Link>
          <Link to="/locations">
            <EnvironmentOutlined />
          </Link>
          <Link to="/shipments">
            <i className="bi bi-box2"></i>
          </Link>
          <Link to="/profile">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
