function Timeline({ route = [] }) {
  // Helper function to format timestamp to "YYYY-MM-DD HH:mm"
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
    <main className="c-timeline">
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
                    index === 0
                      ? "bi-circle-fill latest-icon"
                      : "bi-circle-fill older-icon"
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
              <small className="time-text">
                {formatTimestamp(status.timestamp)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Timeline;
