
// // import React, { useState, useEffect } from "react";
// // import { useParams, Link, useLocation } from "react-router-dom";
// // import { useShipmentContext } from "../../ShipmentContext"; // Import the Shipment context
// // import "./StaffShipmentDetailsPage.css";
// // import Timeline from "./timeline";
// // import "bootstrap-icons/font/bootstrap-icons.css";

// // const AdminShipmentDetailsPage = () => {
// //   const { trackingNumber } = useParams();
// //   const location = useLocation();
// //   const { shipments, dispatch } = useShipmentContext(); // Access shipments and dispatch from context

// //   const shipment = shipments.find((s) => s.trackingNumber === trackingNumber) || {};
// //   const { sender, receiver, route: initialRoute = [] } = shipment;

// //   // Compute the sorted route dynamically
// //   const sortedRoute = [...shipment.route].sort((a, b) => new Date(b.time) - new Date(a.time));

// //   const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
// //   const [currentTime, setCurrentTime] = useState(
// //     new Date().toTimeString().slice(0, 5) // Extracts "HH:mm" from the current time
// //   );
// //   const [isReportChecked, setIsReportChecked] = useState(false);
// //   const [note, setNote] = useState("");
// //   const [currentStatus, setCurrentStatus] = useState("Out For Delivery");
// //   const [hasSubmitted, setHasSubmitted] = useState(false);

// //   const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
// //   const statuses = ["Out For Delivery", "Delivered", "Unsuccessful", "Arrived"]; // Status options

// //   useEffect(() => {
// //     console.log("Updated shipment:", shipment);
// //   }, [shipment]);

// //   const handleStatusSelection = (status) => {
// //     setCurrentStatus(status);
// //     setDropdownOpen(false);
// //   };

// //   const toggleDropdown = () => {
// //     setDropdownOpen((prev) => !prev);
// //   };

// //   const handleSubmit = () => {
// //     const latestRouteEntry = sortedRoute[0];

// //     if (latestRouteEntry) {
// //       const updatedRoute = [...shipment.route];
// //       const latestIndex = updatedRoute.indexOf(latestRouteEntry);

// //       // Update the latest route entry's status
// //       updatedRoute[latestIndex] = {
// //         ...latestRouteEntry,
// //         status: currentStatus, // Update status
// //       };

// //       // Dispatch the update
// //       dispatch({
// //         type: "UPDATE_ROUTE",
// //         payload: {
// //           trackingNumber,
// //           route: updatedRoute,
// //           latestStatus: currentStatus,
// //         },
// //       });
// //     }

// //     // Log submission for testing
// //     console.log("Latest status updated:", currentStatus);
// //   };

// //   const latestStatus = sortedRoute[0] || {};

// //   return (
// //     <body className="shipment-detail">
// //       <div className="shipment-details">
// //         <div className="top-bar">
// //           <Link to="/courier-home" className="return-button">
// //             <i className="bi bi-arrow-left"></i>
// //           </Link>
// //         </div>
// //         <div className="shipment-details-container">
// //           <div className="text">
// //             <p className="trackNum">{trackingNumber}</p>
// //             <p>
// //               Status: {shipment.status || "Unknown"}{" "}
// //               <span className="time">{sortedRoute[0]?.time || "N/A"}</span>
// //             </p>
// //             <p>
// //               From {sender} to {receiver}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Scrollable Timeline Container */}
// //         <div className="timeline-container">
// //           <Timeline route={sortedRoute} />
// //         </div>

// //         <div className="dis-info">
// //           {/* Status Dropdown */}
// //           <div className="status-drop-wrapper">
// //             <div className="status-dropdown">
// //               <div
// //                 className={`status-select ${dropdownOpen ? "status-select-clicked" : ""}`}
// //                 onClick={toggleDropdown}
// //               >
// //                 <span className="status-selected">{currentStatus}</span>
// //                 <div className={`status-caret ${dropdownOpen ? "status-caret-rotate" : ""}`}>
// //                   <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
// //                 </div>
// //               </div>
// //               <ul className={`status-menu ${dropdownOpen ? "status-menu-open" : ""}`}>
// //                 {statuses.map((status, index) => (
// //                   <li key={index} onClick={() => handleStatusSelection(status)}>
// //                     {status}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>

// //           <p>Date<span>Time</span></p>
// //           <div className="date-time-wrapper">
// //             <input
// //               type="date"
// //               value={currentDate}
// //               onChange={(e) => setCurrentDate(e.target.value)}
// //               className="date-input"
// //             />
// //             <input
// //               type="time"
// //               value={currentTime}
// //               onChange={(e) => setCurrentTime(e.target.value)}
// //               className="time-input"
// //             />
// //           </div>

// //           <div className="report-checkbox-wrapper">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 checked={isReportChecked}
// //                 onChange={(e) => setIsReportChecked(e.target.checked)}
// //                 className="report-checkbox"
// //               />
// //               Report
// //             </label>
// //           </div>

// //           <p>Note</p>
// //           <div className="note-wrapper">
// //             <textarea
// //               value={note}
// //               onChange={(e) => setNote(e.target.value)}
// //               className="note-input"
// //             />
// //           </div>

// //           <button
// //             onClick={handleSubmit}
// //             className="submit-button"
// //             disabled={hasSubmitted}
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </div>
// //     </body>
// //   );
// // };

// // export default AdminShipmentDetailsPage;


// import React, { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { useShipmentContext } from "../../ShipmentContext"; // Import the Shipment context
// import "./StaffShipmentDetailsPage.css";
// import Timeline from "./timeline";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const AdminShipmentDetailsPage = () => {
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
//   const [currentStatus, setCurrentStatus] = useState("Out For Delivery");
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
//   const statuses = ["Out For Delivery", "Delivered", "Unsuccessful", "Arrived"]; // Status options

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
//     const latestRouteEntry = sortedRoute[0];

//     if (latestRouteEntry) {
//       const updatedRoute = [...shipment.route];
//       const latestIndex = updatedRoute.indexOf(latestRouteEntry);

//       // Update the latest route entry's status
//       updatedRoute[latestIndex] = {
//         ...latestRouteEntry,
//         status: currentStatus, // Update status
//       };

//       // Dispatch the update
//       dispatch({
//         type: "UPDATE_ROUTE",
//         payload: {
//           trackingNumber,
//           route: updatedRoute,
//           latestStatus: currentStatus,
//           time: `${currentDate} ${currentTime}`,
//         },
//       });
//     }

//     // Log submission for testing
//     console.log("Latest status updated:", currentStatus);
//   };

//   const latestStatus = sortedRoute[0] || {};
//   const currentDistributionCenter = latestStatus.location || "N/A";
//   const latestReportNote = latestStatus.note || "No report available";

//   return (
//     <main className="admin-shipment-detail">
//       <div className="shipment-details">
//         <div className="top-bar">
//           <Link to="/admin-shipments" className="return-button">
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
//           {/* Latest Status Location Display */}
//           <div className="input-field-wrapper">
//             <p>Location</p>
//             <input
//               type="text"
//               value={currentDistributionCenter}
//               readOnly
//               className="fixed-input-field"
//             />
//           </div>

//           {/* Status Dropdown */}
//           <div className="status-drop-wrapper">
//             <div className="status-dropdown">
//             <p>Status</p>
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

//           <p>Report Note</p>
//           <div className="note-wrapper">
//             <textarea
//               value={latestReportNote}
//               readOnly
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

// export default AdminShipmentDetailsPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdminShipmentDetailsPage.css";
import Timeline from "./timeline";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminShipmentDetailsPage = () => {
  const { trackingNumber } = useParams();
  const [shipment, setShipment] = useState({});
  const [route, setRoute] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTime, setCurrentTime] = useState(new Date().toTimeString().slice(0, 5)); // "HH:mm"
  const [isReportChecked, setIsReportChecked] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Out For Delivery");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const statuses = ["Out For Delivery", "Successful", "Unsuccessful", "Arrived"]; // Status options
  const formattedTimestamp = `${currentDate} ${currentTime}:00`;

  // For editable location
  const [locationSearch, setLocationSearch] = useState(""); // Search term for distribution
  const [distributions, setDistributions] = useState([]); // List of distribution centers
  const [selectedDistribution, setSelectedDistribution] = useState(""); // Selected distribution

  // Editable note
  const [editableReportNote, setEditableReportNote] = useState(""); // Editable note

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
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/admin/tracking/full/${trackingNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching shipment details: ${response.statusText}`);
        }

        const data = await response.json();
        setShipment(data.basic_info);
        setRoute(data.journey.map((entry) => ({
          ...entry,
          timestamp: formatTimestamp(entry.timestamp), // Format timestamps for the route
        })));
        setEditableReportNote(data.journey[0]?.note || ""); // Initialize with the latest note
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

  const handleLocationSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/reports/distributions?search=${locationSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching distributions: ${response.statusText}`);
      }

      const data = await response.json();
      setDistributions(data);
    } catch (error) {
      console.error("Error fetching distributions:", error.message);
    }
  };

  const handleLocationSelect = (distributionName) => {
    setSelectedDistribution(distributionName);
    setLocationSearch(distributionName); // Set the input field with selected distribution
    setDistributions([]); // Clear the dropdown
  };

  const handleSubmit = async () => {
    try {
      // Determine the location to use for the update
      const locationToUse = selectedDistribution || null;

      // Determine the note to use
      const noteToUse = isReportChecked ? editableReportNote : null;

      // Construct the payload based on the backend requirements
      const payload = {
        trackingId: trackingNumber, // Tracking ID
        location: locationToUse, // Location or null
        status: currentStatus, // Current status
        note: noteToUse, // Note or null
      };

      console.log("Submitting payload:", payload);

      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      // Make the PUT request to update the tracking status
      const response = await fetch("http://localhost:3000/api/admin/reports/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify(payload), // Send the payload as JSON
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error updating status");
      }

      // Refresh the shipment details after successful submission
      const fetchShipmentDetails = async () => {
        const response = await fetch(
          `http://localhost:3000/api/admin/tracking/full/${trackingNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setShipment(data.basic_info);
        setRoute(data.journey.map((entry) => ({
          ...entry,
          timestamp: formatTimestamp(entry.timestamp), // Format timestamps for refreshed data
        })));
        setEditableReportNote(data.journey[0]?.note || "");
      };

      await fetchShipmentDetails();

      console.log("Status updated successfully.");
    } catch (error) {
      console.error("Error submitting updated status:", error.message);
    }
  };

  // Extract relevant details
  const { tracking_id: trackingId, status_tracking: status, from, to } = shipment;
  const latestStatus = route[0] || {};

  return (
    <main className="admin-shipment-detail">
      <div className="shipment-details">
        <div className="top-bar">
          <Link to="/admin-shipments" className="return-button">
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="shipment-details-container">
          <div className="text">
            <p className="trackNum">{trackingId || "Loading..."}</p>
            <p>
              Status: {status || "Unknown"}{" "}
              <span className="time">{formatTimestamp(latestStatus.timestamp)}</span>
            </p>
            <p>
              From {from || "Unknown Sender"} to {to || "Unknown Recipient"}
            </p>
          </div>
        </div>

        <div className="timeline-container">
          <Timeline route={route} />
        </div>

        <div className="dis-info">
          <div className="input-field-wrapper">
            <p>Location</p>
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              onBlur={handleLocationSearch}
              className="editable-input-field"
            />
            {distributions.length > 0 && (
              <ul className="distribution-dropdown">
                {distributions.map((dist) => (
                  <li key={dist.dist_id} onClick={() => handleLocationSelect(dist.dist_name)}>
                    {dist.dist_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

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

          <p>Date<span>Time</span></p>
          <div className="date-time-wrapper">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              readOnly
              className="date-input"
            />
            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              readOnly
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

          <p>Report Note</p>
          <div className="note-wrapper">
            <textarea
              value={editableReportNote}
              onChange={(e) => setEditableReportNote(e.target.value)}
              className="note-input"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={hasSubmitted}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminShipmentDetailsPage;
