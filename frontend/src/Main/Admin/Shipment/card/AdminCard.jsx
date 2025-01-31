// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Card.css';

// const Card = ({ trackingNumber, status, updateTime, sender, receiver }) => {
//     return (
//         <Link 
//             to={`/staff-shipments/${trackingNumber}`} 
//             className="card-link"
//             state={{ trackingNumber, status, updateTime, sender, receiver }}
//         >
//             <div className="card">
//                 <div className="card-header">
//                     <h3>{trackingNumber}</h3>
//                 </div>
//                 <div className="card-text">
//                     <p>Status: {status} <span className='time'>{updateTime}</span></p>
//                     <p>From {sender} to {receiver}</p>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default Card;


import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ trackingNumber, status, updateTime, sender, receiver }) => {
    // Helper function to format time to 24-hour format (YYYY-MM-DD HH:mm)
    const formatTime = (time) => {
        if (!time) return "N/A"; // Handle missing or invalid time
        const date = new Date(time);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
        const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
        const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero
        const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <Link
            to={`/admin-shipments/${trackingNumber}`}
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
                </div>
            </div>
        </Link>
    );
};

export default Card;
