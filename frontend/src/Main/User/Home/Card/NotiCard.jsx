import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ trackingNumber, status, sender, receiver, lastUpdate, note }) {
  return (
    <Link to={`/shipment/${trackingNumber}`} className="card-link">
      <div className="card">
        <div className="card-header">
          <h3>{trackingNumber}</h3>
        </div>
        <p>
          Status: {status} <span className="time">{lastUpdate}</span>
        </p>
        <p>
          From {sender} to {receiver}
        </p>
        {status === "Unsuccessful" && (
          <>
          <p className="refund-text">WAITING FOR REFUND</p>
          {note && <p className="note-text">Note: {note}</p>}
          </>
        )}
      </div>
    </Link>
  );
}

export default Card;
