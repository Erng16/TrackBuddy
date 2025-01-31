// import React from "react";
// import "./Card.css";

// const StaffCard = ({ staff }) => {
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
//                     onClick={() => alert(`Details for ${name}`)}
//                 >
//                     View Details
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default StaffCard;
import React from "react";
import "./Card.css";

const StaffCard = ({ staff, onDelete }) => {
    console.log("StaffCard received staff:", staff);

    if (!staff) {
        return <div className="card-error">Staff information not available</div>;
    }

    const { id, name, role, workOffice } = staff;

    return (
        <div className="staff-card">
            <div className="card-header">
                <h3>{name}</h3>
            </div>
            <div className="card-text">
                <p>Staff ID: {id}</p>
                {/* <p>Role: {role}</p> */}
                <p>Work Office: {workOffice}</p>
            </div>
            <div className="card-footer">
                <button
                    className="action-button"
                    onClick={() => {
                        console.log("Delete button clicked for ID:", id);
                        onDelete(id); // Trigger the onDelete function with staff ID
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default StaffCard;
