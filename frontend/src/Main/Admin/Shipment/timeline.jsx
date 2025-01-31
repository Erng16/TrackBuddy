// import React from "react";
// import "./timeline.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function Timeline({ route = [] }) {
//   // Use the provided route data or fallback to default mock data
//   const trackingData = route.length > 0 ? route : [
//     {
//       status: "Picked Up",
//       location: "Warehouse A",
//       province: "Ontario",
//       time: "2024-11-10 08:00 AM",
//     },
//     // Add more mock data if needed
//   ];

//   // Find the index of the first "Unsuccessful" status
//   const unsuccessfulIndex = trackingData.findIndex(
//     (data) => data.status === "Unsuccessful"
//   );

//   // If "Unsuccessful" is found, slice the data; otherwise, use the full dataset
//   const filteredData =
//     unsuccessfulIndex !== -1
//       ? trackingData
//       : trackingData;

//   return (
//     <div className="timeline">
//       {filteredData
//         .slice(0)
//         .map((status, index) => (
//           <div
//             key={index}
//             className={`container ${
//               index % 2 === 0 ? "left-container" : "right-container"
//             }`}
//           >
//             <div className="icon-with-border">
//               {status.status === "Delivered" ? (
//                 <>
//                   <i className="bi bi-circle-fill white-circle"></i>
//                   <i className="bi bi-check-circle-fill green-check"></i>
//                 </>
//               ) : status.status === "Unsuccessful" ? (
//                 <i className="bi bi-exclamation-circle-fill unsuccessful-icon"></i>
//               ) : (
//                 <i
//                   className={`bi ${
//                     index === 0 ? "bi-circle-fill latest-icon" : "bi-circle-fill older-icon"
//                   }`}
//                 ></i>
//               )}
//             </div>
//             <div className="text-box">
//               <small>{status.status}</small>
//               <br />
//               <small>
//                 {status.location}, {status.province}
//               </small>
//               <br />
//               <small className="time-text">{status.time}</small>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Timeline;

import React from "react";
import "./timeline.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Timeline({ route = [] }) {
  // If no route data is provided, return a message
  if (route.length === 0) {
    return <div className="timeline">No shipment data available.</div>;
  }

  // Find the index of the first "Unsuccessful" status
  const unsuccessfulIndex = route.findIndex(
    (data) => data.status === "Unsuccessful"
  );

  // If "Unsuccessful" is found, slice the data; otherwise, use the full dataset
  const filteredData =
    unsuccessfulIndex !== -1
      ? route
      : route;

  return (
    <div className="timeline">
      {filteredData.map((status, index) => (
        <div
          key={index}
          className={`container ${
            index % 2 === 0 ? "left-container" : "right-container"
          }`}
        >
          <div className="icon-with-border">
            {status.status === "Delivered" ? (
              <>
                <i className="bi bi-circle-fill white-circle"></i>
                <i className="bi bi-check-circle-fill green-check"></i>
              </>
            ) : status.status === "Unsuccessful" ? (
              <i className="bi bi-exclamation-circle-fill unsuccessful-icon"></i>
            ) : (
              <i
                className={`bi ${
                  index === 0 ? "bi-circle-fill latest-icon" : "bi-circle-fill older-icon"
                }`}
              ></i>
            )}
          </div>
          <div className="text-box">
            <small>{status.status}</small>
            <br />
            <small>
              {status.location
                ? `${status.location.district}, ${status.location.province}`
                : "Unknown location"}
            </small>
            <br />
            <small className="time-text">{status.timestamp}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
