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
// import CardList from "./Shipment/card/CardList";

// function CourierHomePage() {
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
//     {
//       trackingNumber: "CSS0000000004",
//       status: "Waiting For Refund",
//       updateTime: "12/09/2024 10:00",
//       sender: "Jane Doe",
//       receiver: "Bob Martin",
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
//       <body className="staffHome">
//         <div className="home-container">
//           <div className="header">Parcel Arrival Confirmation</div>
//           <div className="text"></div>
//           <div className="underline"></div>
//         </div>

//         <div className="home-input-wrapper">
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
//         <div className="home-container">
//           <div className="menu">
//             <Link to="/courier-home">
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

// export default CourierHomePage;

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
// import { useShipmentContext } from "../../ShipmentContext"; // Import Shipment Context
// import Card from "./Shipment/card/CourierCard"; // Import the Card component

// function CourierHomePage() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const { shipments } = useShipmentContext(); // Fetch shipments from context

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
//         <div className="staff-home-container">
//           <div className="menu">
//             <Link to="/courier-home">
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

// export default CourierHomePage;

import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  HomeFilled,
} from "@ant-design/icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./Shipment/card/CourierCard"; // Import the Card component

let debounceTimeout; // Declare debounceTimeout globally

function CourierHomePage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [outForDeliveryShipments, setOutForDeliveryShipments] = useState([]); // State for "Out for delivery" shipments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchOutForDeliveryShipments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/courier/tracking/out-for-delivery",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch out for delivery shipments");
      }

      const data = await response.json();
      setOutForDeliveryShipments(data);
      setSearchResults(data); // Display these shipments by default
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchShipmentByTrackingId = async (trackingId) => {
    const MIN_TRACKING_ID_LENGTH = 11; // Set minimum length based on your backend requirements

    if (!trackingId || trackingId.length < MIN_TRACKING_ID_LENGTH) {
      setSearchResults(outForDeliveryShipments); // Reset to "Out for delivery" shipments
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found");
        return;
      }

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

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchShipmentByTrackingId(value);
    }, 500); // Wait 500ms before calling the API
  };

  useEffect(() => {
    fetchOutForDeliveryShipments(); // Fetch default shipments on mount
  }, []);

  return (
    <main className="staffHome">
      <div className="staff-home-container">
        <div className="header">Parcel Arrival Confirmation</div>
        <div className="text"></div>
        <div className="underline"></div>
      </div>

      <div className="staff-home-input-wrapper">
        <div className="input">
          <input
            type="text"
            placeholder="Search by tracking number"
            value={searchTerm} // Bind to searchTerm state
            onChange={handleSearchTermChange} // Debounced search handler
          />
          <i className="search">
            <SearchOutlined />
          </i>
        </div>
      </div>

      <div className="shipment-results">
        {loading ? (
          <p>Loading shipments...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : searchResults.length > 0 ? (
          <div className="scrollable-container">
            {searchResults.map((shipment) => (
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
        ) : (
          <div className="no-results">
            <p>No shipments available.</p>
          </div>
        )}
      </div>

      <div className="staff-home-container">
        <div className="menu">
          <Link to="/courier-home">
            <HomeFilled />
          </Link>
          <Link to="/courier-profile">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CourierHomePage;
