// import React, { useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import "./StaffShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const StaffShipmentDetailsPage = () => {
//   const { trackingNumber } = useParams();
//   const location = useLocation();

//   // Get data from the state passed via Link
//   const { sender, receiver } = location.state || {};

//   // Mock route data for testing (with province added)
//   const [route, setRoute] = useState([
//     {
//       location: "Central Warehouse",
//       province: "Saskatchewan",
//       time: "2024-12-09 18:30",
//       status: "Processed",
//     },
//     {
//       location: "Regional Warehouse",
//       province: "Manitoba",
//       time: "2024-12-09 14:00",
//       status: "Picked Up",
//     },
//   ]);

//   // Staff's current distribution center (mocked)
//   const currentDistributionCenter = "Distribution Center A";

//   // States for date, time, note, and status updates
//   const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
//   );
//   const [isReportChecked, setIsReportChecked] = useState(false);
//   const [note, setNote] = useState(""); // State for note field
//   const [currentStatus, setCurrentStatus] = useState("Arrived"); // Initial status
//   const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the staff has already submitted

//   const handleSubmit = () => {
//     if (hasSubmitted) {
//       // Prevent further submissions
//       console.log("Submission is already completed.");
//       return;
//     }

//     // Build the new route entry
//     const newRouteEntry = {
//       location: currentDistributionCenter,
//       province: "Quebec", // Replace with the current province if needed
//       time: `${currentDate} ${currentTime}`,
//       status: currentStatus,
//     };

//     // Include the note only if "Report" is checked
//     if (isReportChecked) {
//       newRouteEntry.note = note;
//     }

//     // Prepend the new entry to the route array without sorting
//     setRoute((prevRoute) => [newRouteEntry, ...prevRoute]);

//     // Mark as submitted
//     setHasSubmitted(true);

//     // Log submission for testing
//     console.log("New route added:", newRouteEntry);
//   };

//   // Extract the latest status details
//   const latestStatus = route[0] || {};

//   return (
//     <body className="shipment-detail">
//       <div className="shipment-details">
//         <div className="top-bar">
//           <Link to="/staff-home" className="return-button">
//             <i className="bi bi-arrow-left"></i>
//           </Link>
//         </div>
//         <div className="shipment-details-container">
//           <div className="text">
//             <p className="trackNum">{trackingNumber}</p>
//             <p>
//               Status: {latestStatus.status || "Unknown"}{" "}
//               <span className="time">{latestStatus.time || "N/A"}</span>
//             </p>
//             <p>
//               From {sender} to {receiver}
//             </p>
//           </div>
//         </div>

//         {/* Scrollable Timeline Container */}
//         <div className="timeline-container">
//           <Timeline route={route} />
//         </div>

//         <div className="dis-info">
//           <p>Location</p>
//           {/* Fixed Input Field */}
//           <div className="input-field-wrapper">
//             <input
//               type="text"
//               value={currentDistributionCenter}
//               readOnly
//               className="fixed-input-field"
//             />
//           </div>

//           {/* Editable Date and Time Fields */}
//           <p>Date<span>Time</span></p>
//           <div className="date-time-wrapper">
//             <input
//               type="date"
//               value={currentDate}
//               onChange={(e) => setCurrentDate(e.target.value)}
//               className="date-input"
//             />
//             <input
//               type="time"
//               value={currentTime}
//               onChange={(e) => setCurrentTime(e.target.value)}
//               className="time-input"
//             />
//           </div>

//           {/* Checkbox */}
//           <div className="report-checkbox-wrapper">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isReportChecked}
//                 onChange={(e) => setIsReportChecked(e.target.checked)}
//                 className="report-checkbox"
//               />
//               Report
//             </label>
//           </div>

//           {/* Note Field */}
//           <p>Note</p>
//           <div className="note-wrapper">
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className="note-input"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="submit-button"
//             disabled={hasSubmitted} // Disable the button after submission
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </body>
//   );
// };

// export default StaffShipmentDetailsPage;

// import React, { useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { useShipmentContext } from "../../../ShipmentContext"; // Import ShipmentContext
// import "./StaffShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const StaffShipmentDetailsPage = () => {
//   const { trackingNumber } = useParams();
//   const location = useLocation();
//   const { shipments, dispatch } = useShipmentContext(); // Access shipments and dispatch from context

//   // Find the shipment by tracking number
//   const shipment = shipments.find((s) => s.trackingNumber === trackingNumber) || {};
//   const { sender, receiver, route: initialRoute = [] } = shipment;

//   // State for route and other fields
//   const [route, setRoute] = useState(initialRoute); // Initialize with the current route from context
//   const currentDistributionCenter = "Distribution Center A";

//   const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toTimeString().slice(0, 5) // Extracts "HH:mm" from "HH:mm:ss GMT+xxxx"
//   );
  
//   const [isReportChecked, setIsReportChecked] = useState(false);
//   const [note, setNote] = useState("");
//   const [currentStatus, setCurrentStatus] = useState("Arrived");
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const handleSubmit = () => {
//     if (hasSubmitted) {
//       console.log("Submission is already completed.");
//       return;
//     }

//     // Build the new route entry (route logic unchanged)
//     const newRouteEntry = {
//       location: currentDistributionCenter,
//       province: "Quebec",
//       time: `${currentDate} ${currentTime}`,
//       status: currentStatus,
//     };

//     if (isReportChecked) {
//       newRouteEntry.note = note;
//     }

//     // Update local state
//     setRoute((prevRoute) => [newRouteEntry, ...prevRoute]);

//     // Dispatch update to global state
//     dispatch({
//       type: "UPDATE_ROUTE",
//       payload: {
//         trackingNumber,
//         route: [newRouteEntry, ...route],
//         latestStatus: currentStatus,
//       },
//     });

//     setHasSubmitted(true);
//     console.log("New route added:", newRouteEntry);
//   };

//   // Extract the latest status details
//   const latestStatus = route[0] || {};

//   return (
//     <body className="shipment-detail">
//       <div className="shipment-details">
//         <div className="top-bar">
//           <Link to="/staff-home" className="return-button">
//             <i className="bi bi-arrow-left"></i>
//           </Link>
//         </div>
//         <div className="shipment-details-container">
//           <div className="text">
//             <p className="trackNum">{trackingNumber}</p>
//             <p>
//               Status: {latestStatus.status || "Unknown"}{" "}
//               <span className="time">{latestStatus.time || "N/A"}</span>
//             </p>
//             <p>
//               From {sender} to {receiver}
//             </p>
//           </div>
//         </div>

//         {/* Scrollable Timeline Container */}
//         <div className="timeline-container">
//           <Timeline route={route} />
//         </div>

//         <div className="dis-info">
//           <p>Location</p>
//           {/* Fixed Input Field */}
//           <div className="input-field-wrapper">
//             <input
//               type="text"
//               value={currentDistributionCenter}
//               readOnly
//               className="fixed-input-field"
//             />
//           </div>

//           {/* Editable Date and Time Fields */}
//           <p>Date<span>Time</span></p>
//           <div className="date-time-wrapper">
//             <input
//               type="date"
//               value={currentDate}
//               onChange={(e) => setCurrentDate(e.target.value)}
//               className="date-input"
//             />
//             <input
//               type="time"
//               value={currentTime}
//               onChange={(e) => setCurrentTime(e.target.value)}
//               className="time-input"
//             />
//           </div>

//           {/* Checkbox */}
//           <div className="report-checkbox-wrapper">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isReportChecked}
//                 onChange={(e) => setIsReportChecked(e.target.checked)}
//                 className="report-checkbox"
//               />
//               Report
//             </label>
//           </div>

//           {/* Note Field */}
//           <p>Note</p>
//           <div className="note-wrapper">
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className="note-input"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="submit-button"
//             disabled={hasSubmitted} // Disable the button after submission
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </body>
//   );
// };

// export default StaffShipmentDetailsPage;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./StaffShipmentDetailsPage.css";
import Timeline from "./timeline";
import "bootstrap-icons/font/bootstrap-icons.css";

const StaffShipmentDetailsPage = () => {
  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState(null); // Shipment data
  const [route, setRoute] = useState([]); // Shipment route
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [currentStatus, setCurrentStatus] = useState("Arrived"); // Current status to update
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTime, setCurrentTime] = useState(new Date().toTimeString().slice(0, 5));
  const [isReportChecked, setIsReportChecked] = useState(false);
  const [note, setNote] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false); // Status dropdown state
  const statuses = ["Arrived", "Unsuccessful"]; // Status options

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleStatusSelection = (status) => {
    setCurrentStatus(status);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/staff/tracking/info/full/${trackingNumber}`,
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
            setError("Tracking ID not found");
          } else {
            const errorResponse = await response.json();
            setError(errorResponse.error || "Failed to fetch shipment details");
          }
        } else {
          const data = await response.json();
          setShipment(data.basicInfo || {});
          setRoute(data.journey || []);
        }
      } catch (err) {
        console.error("Error fetching shipment details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentDetails();
  }, [trackingNumber]);

  const handleStatusUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token not found");
      return;
    }
  
    const payload = {
      trackingId: trackingNumber,
      trackingStatus: currentStatus,
      note: isReportChecked ? note : undefined, // Include note if "Report" is checked
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/staff/tracking/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to update status");
      }
  
      alert("Status updated successfully!");
      window.location.reload(); // Refresh the page
  
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.message || "An error occurred while updating the status.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const {
    sender_name: sender,
    recipient_name: receiver,
    status_tracking: status,
    timestamp,
  } = shipment;

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
    <main className="staff-shipment-detail">
      <div className="shipment-details">
        <div className="top-bar">
          <Link to="/staff-home" className="return-button">
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="shipment-details-container">
          <div className="text">
            <p className="trackNum">{trackingNumber}</p>
            <p>
              Status: {status || "Unknown"}{" "}
              <span className="time">{formatTimestamp(timestamp) || "N/A" }</span>
            </p>
            <p>
              From {sender || "Unknown sender"} to {receiver || "Unknown recipient"}
            </p>
          </div>
        </div>

        <div className="timeline-container">
          <Timeline route={route} />
        </div>

        <div className="dis-info">
          <p>Date<span>Time</span></p>
          <div className="date-time-wrapper">
            <input
              type="date"
              readOnly
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="date-input"
            />
            <input
              type="time" 
              readOnly
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="time-input"
            />
          </div>

          {/* Status Dropdown */}
          <div className="status-drop-wrapper">
            <div className="status-dropdown">
              <p>Status</p>
              <div
                className={`status-select ${dropdownOpen ? "status-select-clicked" : ""}`}
                onClick={toggleDropdown}
              >
                <span className="status-selected">{currentStatus}</span>
                <div className={`status-caret ${dropdownOpen ? "status-caret-rotate" : ""}`}>
                  <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
                </div>
              </div>
              <ul className={`status-menu ${dropdownOpen ? "status-menu-open" : ""}`}>
                {statuses.map((status, index) => (
                  <li key={index} onClick={() => handleStatusSelection(status)}>
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="report-checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={isReportChecked}
                onChange={(e) => setIsReportChecked(e.target.checked)}
                className="report-checkbox"
              />
              Report
            </label>
          </div>

          <p>Note</p>
          <div className="note-wrapper">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="note-input"
            />
          </div>

          <button onClick={handleStatusUpdate} className="submit-button">
            Update Status
          </button>
        </div>
      </div>
    </main>
  );
};

export default StaffShipmentDetailsPage;
