// import React, { useEffect, useState } from "react";
// import CardList from "./Card/CardList";
// import Card from "./Card/Card";
// import "./noti.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Link } from "react-router-dom";
// import { useShipmentContext } from "../../ShipmentContext"; // Import ShipmentContext

// function NotificationsPage() {
//   const { shipments } = useShipmentContext(); // Access shipments from context
//   const [filteredShipments, setFilteredShipments] = useState([]);

//   useEffect(() => {
//     // Filter shipments based on status
//     const notifications = shipments.filter((shipment) =>
//       ["Delivered", "Unsuccessful", "Out for Delivery"].includes(
//         shipment.status
//       )
//     );

//     setFilteredShipments(notifications);
//   }, [shipments]); // Re-run filter whenever shipments are updated

//   return (
//     <body className="notification">
//       <Link to="/home" className="return-button">
//         <i className="bi bi-arrow-left"></i>
//       </Link>
//       <div className="text">Notification</div>

//       <div className="card-list"> 
//         {filteredShipments.length > 0 ? (
//           <CardList>
//             {filteredShipments.map((shipment) => (
//               <Card
//                 key={shipment.trackingNumber}
//                 trackingNumber={shipment.trackingNumber}
//                 status={shipment.status}
//                 sender={shipment.sender}
//                 receiver={shipment.receiver}
//                 lastUpdate={shipment.time} // Assuming `time` represents the last update
//               />
//             ))}
//           </CardList>
//         ) : (
//           <p className="card-text">No notifications to display.</p>
//         )}
//       </div>
//     </body>
//   );
// }

// export default NotificationsPage;


import React, { useEffect, useState } from "react";
import Card from "./Card/NotiCard";
import "./noti.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        setError("Authorization token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch notifications");
        }

        const data = await response.json();
        // Format the timestamps before setting state
        const formattedData = data.map((notification) => ({
          ...notification,
          timestamp: formatTimestamp(notification.timestamp), // Format the timestamp
        }));
        setNotifications(formattedData); // Update notifications state with fetched data
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
        setError(err.message || "An error occurred while fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <main className="notification">
      <Link to="/home" className="return-button">
        <i className="bi bi-arrow-left"></i>
      </Link>
      <div className="text">Notification</div>

      <div className="card-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.tracking_id} // Unique key for each card
              trackingNumber={notification.tracking_id}
              status={notification.status}
              sender={notification.from}
              receiver={notification.to}
              lastUpdate={notification.timestamp} // Already formatted timestamp
              note={notification.status === "Unsuccessful" ? notification.note : null} // Pass note if Unsuccessful
            />
          ))
        ) : (
          <p className="card-text">No notifications to display.</p>
        )}
      </div>
    </main>
  );
}

export default NotificationsPage;
