import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ trackingNumber, status, updateTime, sender, receiver }) => {
    // Function to format time to 24-hour format (YYYY-MM-DD HH:mm)
    const formatTime = (time) => {
        if (!time) return "N/A"; // Handle missing or invalid time
        const date = new Date(time);
        const formattedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
        const formattedTime = date.toTimeString().slice(0, 5); // Extract HH:mm
        return `${formattedDate} ${formattedTime}`; // Combine date and time
    };

    return (
        <Link
            to={`/shipment/${trackingNumber}`}
            className="card-link"
            state={{ trackingNumber, status, updateTime, sender, receiver }}
        >
            <div className="card">
                <div className="card-header">
                    <h3>{trackingNumber}</h3>
                </div>
                <div className="card-text">
                    <p>
                        Status: {status} <span className="time">{formatTime(updateTime)}</span>
                    </p>
                    <p>From {sender} to {receiver}</p>
                    {status === "Unsuccessful" && (
                        <p className="refund-text">WAITING FOR REFUND</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default Card;
