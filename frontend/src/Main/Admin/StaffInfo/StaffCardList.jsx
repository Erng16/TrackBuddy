// import React from "react";
// import "./Card.css";

// const StaffCard = ({ staff, onDelete }) => {
//     if (!staff) {
//         return <div className="card-error">Staff information not available</div>;
//     }

//     const { id, name, role, workOffice } = staff;

//     return (
//         <div className="card">
//             <div className="card-header">
//                 <h3>{name}</h3>
//             </div>
//             <div className="card-text">
//                 <p>Staff ID: {id}</p>
//                 <p>Role: {role}</p>
//                 <p>Work Office: {workOffice}</p>
//             </div>
//             <div className="card-footer">
//                 <button
//                     className="action-button"
//                     onClick={() => onDelete(id)} // Trigger the onDelete function with staff ID
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default StaffCard;
import React from "react";
import StaffCard from "./StaffInfoCard";

const StaffCardList = ({ staffList, onDelete }) => {
  if (!staffList || staffList.length === 0) {
    return <div>No staff available</div>;
  }

  return (
    <div className="card-list">
      {staffList.map((staff) => (
        <StaffCard key={staff.id} staff={staff} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StaffCardList;
