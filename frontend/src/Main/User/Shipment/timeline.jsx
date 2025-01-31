import React from "react";
import "./Usertimeline.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Timeline({ route = [] }) {
  // Helper function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown Time";
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Process the route data
  const trackingData =
    route.length > 0
      ? route.map((entry) => ({
          status: entry.status || "Unknown Status",
          location: `${entry.location?.district || "Unknown District"}, ${
            entry.location?.province || "Unknown Province"
          }`,
          time: formatTimestamp(entry.timestamp), // Format the timestamp here
        }))
      : [
          {
            status: "Picked Up",
            location: "Warehouse A",
            time: "2024-11-10 08:00 AM",
          },
        ];

  // Find the index of the first "Unsuccessful" status
  const unsuccessfulIndex = trackingData.findIndex(
    (data) => data.status === "Unsuccessful"
  );

  // If "Unsuccessful" is found, slice the data; otherwise, use the full dataset
  const filteredData =
    unsuccessfulIndex !== -1
      ? trackingData
      : trackingData;

  return (
    <main className="user-timeline">
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
              <small>{status.location}</small>
              <br />
              <small className="time-text">{status.time}</small>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Timeline;
