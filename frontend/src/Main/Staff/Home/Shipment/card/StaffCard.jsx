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
    return (
        <Link
            to={`/staff-shipments/${trackingNumber}`}
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
                    <p>From {sender} to {receiver}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
