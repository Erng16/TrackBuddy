import React from 'react';
import './card.css';

const Card = ({ centerName, location, postalCode }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{centerName}</h3>
                <span className="postal-code">{postalCode}</span>
            </div>
            <div className="card-location">
                <p>{location}</p>
            </div>
        </div>
    );
};

export default Card;