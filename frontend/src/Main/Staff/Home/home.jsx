// import React, { useState } from "react";
// import "./home.css";
// import { Link } from "react-router-dom";
// import {
//   SearchOutlined,
//   BellOutlined,
//   HomeFilled,
//   EnvironmentOutlined,
// } from "@ant-design/icons";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useShipmentContext } from "../../ShipmentContext"; // Import ShipmentContext
// import CardList from "./Shipment/card/CardList";

// function StaffHomePage() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const { shipments } = useShipmentContext(); // Access shipments from context

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
//       <body className="staffHome">
//         <div className="staff-home-container">
//           <div className="header">Parcel Arrival Confirmation</div>
//           <div className="text"></div>
//           <div className="underline"></div>
//         </div>
//         <div className="staff-home-container">
//           <Link to="/staff-create-shipment">
//             <button className="create-button">Create Shipment</button>
//           </Link>
//         </div>

//         <div className="staff-home-input-wrapper">
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
//               <CardList shipments={filteredShipments} />{" "}
//               {/* Always render cards */}
//             </div>
//           ) : (
//             <div className="no-results">
//               <p>No shipments available.</p>
//             </div>
//           )}
//         </div>
//         <div className="staff-home-container">
//           <div className="menu">
//             <Link to="/staff-home">
//               <HomeFilled />
//             </Link>
//             <Link to="/staff-profile">
//               <i className="bi bi-person"></i>
//             </Link>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// }

// export default StaffHomePage;

import React, { useState, useEffect } from "react";
import "../Home/home.css";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  BellOutlined,
  HomeFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./Shipment/card/StaffCard";

function StaffHomePage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for fetched search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async (trackingId) => {
    if (trackingId.length < 13) {
      setSearchResults([]); // Clear results if search term is less than 10 characters
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
        `http://localhost:3000/api/staff/tracking/info/basic/${trackingId}`,
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

  useEffect(() => {
    if (searchTerm.trim().length >= 10) {
      handleSearch(searchTerm.trim());
    } else {
      setSearchResults([]); // Clear results if search term is less than 10 characters
    }
  }, [searchTerm]);

  return (

    <main className="staffHome">
      <div className="staff-home-container">
        <div className="header">Parcel Arrival Confirmation</div>
        <div className="text"></div>
        <div className="underline"></div>
      </div>
      <div className="staff-home-container">
        <Link to="/staff-create-shipment">
          <button className="create-button">Create Shipment</button>
        </Link>
      </div>

      <div className="staff-home-input-wrapper">
        <div className="input">
          <input
            type="text"
            placeholder="Search by tracking number"
            value={searchTerm} // Bind to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
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
          key={shipment.tracking_id} // Ensure this key is unique for each Card
          trackingNumber={shipment.tracking_id}
          sender={shipment.from}
          receiver={shipment.to}
          status={shipment.status_tracking}
          time={shipment.timestamp}
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


      <div className="staff-home-container">
        <div className="menu">
          <Link to="/staff-home">
            <HomeFilled />
          </Link>
          <Link to="/staff-profile">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </div>
    </main>

  );
}

export default StaffHomePage;
