import React from "react";
import { Link } from "react-router-dom";
import "./CourierCard.css";

const Card = ({ trackingNumber, status, updateTime, sender, receiver }) => {
    // Determine the navigation path based on the status
    // const navigateTo =
    //   status === "Out for Delivery"
    //     ? `/courier-shipments/confirm-delivery/${trackingNumber}`
    //     : `/courier-shipments/delivery/${trackingNumber}`;

  const navigateTo = `/courier-shipments/confirm-delivery/${trackingNumber}`;

  
    return (
      <Link
        to={navigateTo}
        className="card-link"
        state={{ trackingNumber, status, updateTime, sender, receiver }}
      >
        <div className="card">
          <div className="card-header">
            <h3>{trackingNumber}</h3>
          </div>
          <div className="card-text">
            <p>
              Status: {status} <span className="time">{updateTime}</span>
            </p>
            <p>
              From {sender} to {receiver}
            </p>
          </div>
        </div>
      </Link>
    );
  };
  
  export default Card;