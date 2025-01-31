// import React from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import "./ShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const ShipmentDetailsPage = () => {
//   const { trackingNumber } = useParams();
//   const location = useLocation();
  
//   // Get data from the state passed via Link
//   const { status, updateTime, sender, receiver } = location.state || {};

//   // Mock route data for testing
//   const route = [
//     {
//       location: "Destination",
//       time: "2024-12-09 14:35",
//       status: "Delivered",
//     },
//     {
//       location: "Distribution Center B",
//       time: "2024-12-09 12:00",
//       status: "In Transit",
//     },
//     {
//       location: "Distribution Center A",
//       time: "2024-12-09 10:00",
//       status: "Arrived",
//     },
//     {
//       location: "Distribution Center A",
//       time: "2024-12-09 10:00",
//       status: "Arrived",
//     },
//     {
//       location: "Distribution Center A",
//       time: "2024-12-09 10:00",
//       status: "Arrived",
//     },
//     {
//       location: "Distribution Center A",
//       time: "2024-12-09 10:00",
//       status: "Arrived",
//     },
//   ];

//   // Sort route by time (latest to oldest)
//   const sortedRoute = route.sort((a, b) => new Date(b.time) - new Date(a.time));

//   return (
//     <body className="shipment-detail">
//     <div className="shipment-details">
//       <div className="top-bar">
//         <Link to="/shipments" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//       </div>
//       <div className="shipment-details-container">
//         <div className="text">
//           <p className="trackNum"> {trackingNumber}</p>
//           <p>Status: {status} <span className="time">{updateTime}</span></p>
//           <p>From {sender} to {receiver}</p>
//         </div>
//       </div>
      
//       <Timeline route={sortedRoute} />
//     </div>
//     </body>
//   );
// };

// export default ShipmentDetailsPage;

// import React from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { useShipmentContext } from "../../ShipmentContext"; // Import ShipmentContext
// import "./ShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const ShipmentDetailsPage = () => {
//   const { trackingNumber } = useParams();
//   const location = useLocation();
//   const { shipments } = useShipmentContext(); // Access shipments from context

//   // Get the specific shipment from the context
//   const shipment = shipments.find((s) => s.trackingNumber === trackingNumber) || {};
//   const { status, updateTime, sender, receiver, route: contextRoute = [] } = shipment;

//   // Sort route based on the same logic used in staff shipment detail page
//   const sortedRoute = [...contextRoute]; // Clone the route array to avoid mutations

//   // Use the existing route sorting logic (no sorting, prepend only if adding new entries elsewhere)
//   // Keep the same order as stored in the database/context

//   return (
//     <body className="shipment-detail">
//       <div className="shipment-details">
//         <div className="top-bar">
//           <Link to="/shipments" className="return-button">
//             <i className="bi bi-arrow-left"></i>
//           </Link>
//         </div>
//         <div className="shipment-details-container">
//           <div className="text">
//             <p className="trackNum"> {trackingNumber}</p>
//             <p>
//               Status: {status} <span className="time">{updateTime}</span>
//             </p>
//             <p>
//               From {sender} to {receiver}
//             </p>
//           </div>
//         </div>

//         <Timeline route={sortedRoute} />
//       </div>
//     </body>
//   );
// };

// export default ShipmentDetailsPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ShipmentDetailsPage.css";
import Timeline from "./timeline";
import "bootstrap-icons/font/bootstrap-icons.css";

const ShipmentDetailsPage = () => {
  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState(null); // State to store shipment data
  const [route, setRoute] = useState([]); // State to store shipment route
  const [reportNote, setReportNote] = useState(""); // State to store the latest report note
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchShipmentDetails = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/tracking/track/${trackingNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("Tracking ID not found");
        } else {
          const errorResponse = await response.json();
          setError(errorResponse.error || "Failed to fetch shipment details");
        }
      } else {
        const data = await response.json();
        setShipment(data.trackingInfo || {});
        setRoute(data.journey || []);

        // Extract the latest report note from the latest journey entry
        if (data.journey && data.journey.length > 0) {
          setReportNote(data.journey[0].note || "No report available");
        } else {
          setReportNote("No report available");
        }
      }
    } catch (err) {
      console.error("Error fetching shipment details:", err);
      setError(err.message || "Error fetching shipment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipmentDetails(); // Fetch shipment details on page load
  }, [trackingNumber]); // Refresh when trackingNumber changes

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const {
    tracking_id: trackingId,
    current_status: status,
    timestamp: updateTime,
    from: sender,
    to: receiver,
  } = shipment || {};

  return (
    <main className="shipment-detail">
      <div className="shipment-details">
        <div className="top-bar">
          <Link to="/shipments" className="return-button">
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="shipment-details-container">
          <div className="text">
            <p className="trackNum">{trackingId || trackingNumber}</p>
            <p>
              Status: {status || "Unknown"}{" "}
              <span className="time">{formatTimestamp(updateTime)}</span>
            </p>
            <p>
              From {sender || "Unknown sender"} to {receiver || "Unknown recipient"}
            </p>
          </div>
        </div>

        <Timeline
          route={route.map((entry) => ({
            ...entry,
            time: formatTimestamp(entry.timestamp), // Format timestamps in the timeline
          }))}
        />

        {/* Conditional rendering for "WAITING FOR REFUND" */}
        {status === "Unsuccessful" && (
          <div className="refund">
            <p>WAITING FOR REFUND</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShipmentDetailsPage;
