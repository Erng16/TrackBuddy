// import React, { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { useShipmentContext } from "../../../ShipmentContext"; // Import the Shipment context
// import "./StaffShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const DeliveryPage = () => {
//   const { trackingNumber } = useParams();
//   const location = useLocation();
//   const { shipments, dispatch } = useShipmentContext(); // Access shipments and dispatch from context

//   const shipment = shipments.find((s) => s.trackingNumber === trackingNumber) || {};
//   const { sender, receiver, route: initialRoute = [] } = shipment;

//   // Compute the sorted route dynamically
//   const sortedRoute = [...shipment.route].sort((a, b) => new Date(b.time) - new Date(a.time));

//   const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toTimeString().slice(0, 5) // Extracts "HH:mm" from the current time
//   );
//   const [isReportChecked, setIsReportChecked] = useState(false);
//   const [note, setNote] = useState("");
//   const [currentStatus, setCurrentStatus] = useState("Out For Delivery");
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
//   const statuses = ["Out For Delivery", "Delivered", "Unsuccessful"]; // Status options

//   useEffect(() => {
//     console.log("Updated shipment:", shipment);
//   }, [shipment]);

//   const handleStatusSelection = (status) => {
//     setCurrentStatus(status);
//     setDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleSubmit = () => {
//     const newRouteEntry = {
//       location: "Quebec", // Replace with the current location if needed
//       province: "Quebec", // Replace with the current province if needed
//       time: `${currentDate} ${currentTime}`,
//       status: currentStatus,
//     };
  
//     // Include the note only if "Report" is checked
//     if (isReportChecked) {
//       newRouteEntry.note = note;
//     }
  
//     // Check if the entry with the same location, province, and time already exists
//     const existingEntryIndex = shipment.route.findIndex(
//       (entry) =>
//         entry.location === newRouteEntry.location &&
//         entry.province === newRouteEntry.province &&
//         entry.time === newRouteEntry.time
//     );
  
//     if (existingEntryIndex !== -1) {
//       // Update the existing entry's status
//       const updatedRoute = [...shipment.route];
//       updatedRoute[existingEntryIndex] = {
//         ...updatedRoute[existingEntryIndex],
//         status: currentStatus, // Update status
//       };
  
//       dispatch({
//         type: "UPDATE_ROUTE",
//         payload: {
//           trackingNumber,
//           route: updatedRoute,
//           latestStatus: currentStatus,
//         },
//       });
//     } else {
//       // Add a new entry if it doesn't exist
//       dispatch({
//         type: "UPDATE_ROUTE",
//         payload: {
//           trackingNumber,
//           route: [newRouteEntry],
//           latestStatus: currentStatus,
//         },
//       });
//     }
  
//     // Log submission for testing
//     console.log("New route added or updated:", newRouteEntry);
//   };
  

//   const latestStatus = sortedRoute[0] || {};

//   return (
//     <main className="shipment-detail">
//       <div className="shipment-details">
//         <div className="top-bar">
//           <Link to="/courier-home" className="return-button">
//             <i className="bi bi-arrow-left"></i>
//           </Link>
//         </div>
//         <div className="shipment-details-container">
//           <div className="text">
//             <p className="trackNum">{trackingNumber}</p>
//             <p>
//               Status: {shipment.status || "Unknown"}{" "}
//               <span className="time">{sortedRoute[0]?.time || "N/A"}</span>
//             </p>
//             <p>
//               From {sender} to {receiver}
//             </p>
//           </div>
//         </div>

//         {/* Scrollable Timeline Container */}
//         <div className="timeline-container">
//           <Timeline route={sortedRoute} />
//         </div>

//         <div className="dis-info">
//           {/* Status Dropdown */}
//           <div className="status-drop-wrapper">
//             <div className="status-dropdown">
//               <div
//                 className={`status-select ${dropdownOpen ? "status-select-clicked" : ""}`}
//                 onClick={toggleDropdown}
//               >
//                 <span className="status-selected">{currentStatus}</span>
//                 <div className={`status-caret ${dropdownOpen ? "status-caret-rotate" : ""}`}>
//                   <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
//                 </div>
//               </div>
//               <ul className={`status-menu ${dropdownOpen ? "status-menu-open" : ""}`}>
//                 {statuses.map((status, index) => (
//                   <li key={index} onClick={() => handleStatusSelection(status)}>
//                     {status}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

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

//           <p>Note</p>
//           <div className="note-wrapper">
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className="note-input"
//             />
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="submit-button"
//             disabled={hasSubmitted}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default DeliveryPage;


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./StaffShipmentDetailsPage.css";
import Timeline from "./timeline";
import "bootstrap-icons/font/bootstrap-icons.css";

const DeliveryPage = () => {
  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState({});
  const [sortedRoute, setSortedRoute] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTime, setCurrentTime] = useState(
    new Date().toTimeString().slice(0, 5) // Extracts "HH:mm" from the current time
  );
  const [isReportChecked, setIsReportChecked] = useState(false);
  const [note, setNote] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Out for delivery");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const statuses = ["Out for delivery", "Delivered", "Unsuccessful"]; // Status options

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

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      const token = localStorage.getItem("token"); // Replace with appropriate token retrieval method
      if (!token) {
        console.error("Authorization token not found");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/courier/tracking/info/full/${trackingNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch shipment details: ${response.status}`);
        }

        const data = await response.json();
        setShipment(data.basicInfo || {});
        setSortedRoute(data.journey || []);
      } catch (error) {
        console.error("Error fetching shipment details:", error.message);
      }
    };

    fetchShipmentDetails();
  }, [trackingNumber]);

  const handleStatusSelection = (status) => {
    setCurrentStatus(status);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token not found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/courier/tracking/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trackingId: trackingNumber,
          trackingStatus: currentStatus,
          note: isReportChecked ? note : null, // Include note only if "Report" is checked
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      // Refresh the shipment details after updating the status
      const fetchShipmentDetails = async () => {
        const res = await fetch(
          `http://localhost:3000/api/courier/tracking/info/full/${trackingNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to refresh shipment details: ${res.status}`);
        }

        const data = await res.json();
        setShipment(data.basicInfo || {});
        setSortedRoute(data.journey || []);
      };

      await fetchShipmentDetails();
      console.log("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const latestStatus = sortedRoute[0] || {};

  return (
    <main className="courier-shipment-detail">
      <div className="shipment-details">
        <div className="top-bar">
          <Link to="/courier-home" className="return-button">
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="shipment-details-container">
          <div className="text">
            <p className="trackNum">{trackingNumber}</p>
            <p>
              Status: {shipment.status_tracking || "Unknown"}{" "}
              <span className="time">{formatTimestamp(latestStatus.timestamp)}</span>
            </p>
            <p>
              From {shipment.sender_name || "Unknown sender"} to {shipment.recipient_name || "Unknown recipient"}
            </p>
          </div>
        </div>

        {/* Scrollable Timeline Container */}
        <div className="timeline-container">
          <Timeline
            route={sortedRoute.map((entry) => ({
              ...entry,
              timestamp: formatTimestamp(entry.timestamp), // Format timestamps in timeline
            }))}
          />
        </div>

        <div className="dis-info">
          {/* Status Dropdown */}
          <p>Status</p>
          <div className="status-drop-wrapper">
            <div className="status-dropdown">
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

          <p>Date<span>Time</span></p>
          <div className="date-time-wrapper">
            <input
              type="date"
              value={currentDate}
              readOnly
              onChange={(e) => setCurrentDate(e.target.value)}
              className="date-input"
            />
            <input
              type="time"
              value={currentTime}
              readOnly
              onChange={(e) => setCurrentTime(e.target.value)}
              className="time-input"
            />
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

          <button
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeliveryPage;
