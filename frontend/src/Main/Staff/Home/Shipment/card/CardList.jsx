import React from "react";
import Card from "./Card.jsx";
import "./CardList.css";

const CardList = ({ shipments }) => {
  return (
    <div className="card-list">
      {shipments.map((shipment) => (
        <Card
          key={shipment.trackingNumber}
          trackingNumber={shipment.trackingNumber}
          status={shipment.status}
          updateTime={shipment.updateTime}
          sender={shipment.sender}
          receiver={shipment.receiver}
        />
      ))}
    </div>
  );
};

export default CardList;
