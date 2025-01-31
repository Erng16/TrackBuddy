import React from "react";
import "./CardList.css";

function CardList({ children }) {
  return <div className="card-list">{children}</div>;
}

export default CardList;
