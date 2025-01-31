// import React, { useState, useEffect } from "react";
// import "./createShip.css";
// import { Link } from "react-router-dom";
// import 'bootstrap-icons/font/bootstrap-icons.css';

// function CreateShipmentPage() {
//   const [formData, setFormData] = useState({
//     senderName: "",
//     senderPhone: "",
//     recipientName: "",
//     recipientPhone: "",
//     date: "",
//     time: "",
//     finalDistribution: "Final Distribution",
//   });

//   const [errors, setErrors] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Set current time as default for the time field
//   useEffect(() => {
//     const now = new Date();
//     const currentTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     setFormData((prevData) => ({
//       ...prevData,
//       time: currentTime,
//     }));
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDropdownSelection = (option) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       finalDistribution: option,
//     }));
//     setDropdownOpen(false);
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!formData.senderName.trim()) {
//       newErrors.senderName = "Sender name is required.";
//       isValid = false;
//     }

//     if (!formData.senderPhone.trim()) {
//       newErrors.senderPhone = "Sender phone number is required.";
//       isValid = false;
//     }

//     if (!formData.recipientName.trim()) {
//       newErrors.recipientName = "Recipient name is required.";
//       isValid = false;
//     }

//     if (!formData.recipientPhone.trim()) {
//       newErrors.recipientPhone = "Recipient phone number is required.";
//       isValid = false;
//     }

//     if (!formData.date.trim()) {
//       newErrors.date = "Date is required.";
//       isValid = false;
//     }

//     if (!formData.time.trim()) {
//       newErrors.time = "Time is required.";
//       isValid = false;
//     }

//     if (formData.finalDistribution === "Final Distribution") {
//       newErrors.finalDistribution = "Please select a distribution center.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       console.log("Shipment Data:", formData);
//       alert("Shipment created successfully!");
//       // Add API call or other actions here
//     }
//   };

//   const finalDistributionOptions = [
//     "Distribution Center A",
//     "Distribution Center B",
//     "Distribution Center C",
//   ];

//   return (
//     <>
//       <body className="create-shipment">
//         <Link to="/staff-home" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//         <div className="create-container">
//           <div className="text">Create Shipment</div>

//           {/* Sender Name Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               name="senderName"
//               placeholder="Sender Name"
//               value={formData.senderName}
//               onChange={handleInputChange}
//             />
//             {errors.senderName && <div className="error">{errors.senderName}</div>}
//           </div>

//           {/* Sender Phone Number Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               name="senderPhone"
//               placeholder="Sender Phone Number"
//               value={formData.senderPhone}
//               onChange={handleInputChange}
//             />
//             {errors.senderPhone && <div className="error">{errors.senderPhone}</div>}
//           </div>

//           {/* Recipient Name Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               name="recipientName"
//               placeholder="Recipient Name"
//               value={formData.recipientName}
//               onChange={handleInputChange}
//             />
//             {errors.recipientName && <div className="error">{errors.recipientName}</div>}
//           </div>

//           {/* Recipient Phone Number Field */}
//           <div className="input-wrapper">
//             <input
//               type="text"
//               name="recipientPhone"
//               placeholder="Recipient Phone Number"
//               value={formData.recipientPhone}
//               onChange={handleInputChange}
//             />
//             {errors.recipientPhone && <div className="error">{errors.recipientPhone}</div>}
//           </div>

//           {/* Date Field */}
//           <div className="input-wrapper">
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//             />
//             {errors.date && <div className="error">{errors.date}</div>}
//           </div>

//           {/* Time Field */}
//           <div className="input-wrapper">
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleInputChange}
//             />
//             {errors.time && <div className="error">{errors.time}</div>}
//           </div>

//           {/* Final Distribution Dropdown */}
//           <div className="drop-wrapper">
//             <div className="dropdown">
//               <div
//                 className={`select ${dropdownOpen ? "select-clicked" : ""}`}
//                 onClick={toggleDropdown}
//               >
//                 <span className="selected">{formData.finalDistribution}</span>
//                 <div className={`caret ${dropdownOpen ? "caret-rotate" : ""}`}>
//                   <i className={`bi bi-caret-${dropdownOpen ? "up" : "down"}-fill`}></i>
//                 </div>
//               </div>
//               <ul
//                 className={`signup-menu ${dropdownOpen ? "signup-menu-open" : ""}`}
//                 style={{
//                   maxHeight: "150px",
//                   overflowY: "auto",
//                   border: "1px solid #ccc",
//                 }}
//               >
//                 {finalDistributionOptions.map((option, index) => (
//                   <li key={index} onClick={() => handleDropdownSelection(option)}>
//                     {option}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {errors.finalDistribution && <div className="error">{errors.finalDistribution}</div>}
//           </div>

//           {/* Submit Button */}
//           <button className="submit" onClick={handleSubmit}>
//             Create Shipment
//           </button>
//         </div>
//       </body>
//     </>
//   );
// }

// export default CreateShipmentPage;

import React, { useState, useEffect } from "react";
import "./createShip.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function CreateShipmentPage() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    date: "",
    time: "",
    finalDistribution: "",
    recipientAddress: "",
  });

  const [errors, setErrors] = useState({});

  // Set current date and time as defaults
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm
  
    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
      time: currentTime,
    }));
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.senderName.trim()) {
      newErrors.senderName = "Sender name is required.";
      isValid = false;
    }

    if (!formData.senderPhone.trim()) {
      newErrors.senderPhone = "Sender phone number is required.";
      isValid = false;
    }

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required.";
      isValid = false;
    }

    if (!formData.recipientPhone.trim()) {
      newErrors.recipientPhone = "Recipient phone number is required.";
      isValid = false;
    }

    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = "Recipient address is required.";
      isValid = false;
    }

    if (!formData.finalDistribution.trim()) {
      newErrors.finalDistribution = "Final distribution is required.";
      isValid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    if (!formData.time.trim()) {
      newErrors.time = "Time is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not authorized to perform this action.");
          return;
        }
  
        const payload = {
          sender_name: formData.senderName,
          sender_phone: formData.senderPhone,
          recipient_name: formData.recipientName,
          recipient_phone: formData.recipientPhone,
          recipient_address: formData.recipientAddress,
          final_dist_id: formData.finalDistribution,
        };
  
        const response = await fetch("http://localhost:3000/api/staff/shipment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(`Shipment created successfully! Tracking ID: ${data.tracking_id}`);
          
          // Recalculate current date and time
          const now = new Date();
          const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
          const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm
  
          // Reset form with refreshed time and date
          setFormData({
            senderName: "",
            senderPhone: "",
            recipientName: "",
            recipientPhone: "",
            date: currentDate,
            time: currentTime,
            finalDistribution: "",
            recipientAddress: "",
          });
        } else {
          const errorResponse = await response.json();
          alert(errorResponse.error || "Failed to create shipment.");
        }
      } catch (error) {
        console.error("Error creating shipment:", error);
        alert("An error occurred while creating the shipment.");
      }
    }
  };
  

  return (

      <main className="create-shipment">
        <Link to="/staff-home" className="return-button">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div className="create-container">
          <div className="text">Create Shipment</div>

          {/* Sender Name Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="senderName"
              placeholder="Sender Name"
              value={formData.senderName}
              onChange={handleInputChange}
            />
            {errors.senderName && <div className="error">{errors.senderName}</div>}
          </div>

          {/* Sender Phone Number Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="senderPhone"
              placeholder="Sender Phone Number"
              value={formData.senderPhone}
              onChange={handleInputChange}
            />
            {errors.senderPhone && <div className="error">{errors.senderPhone}</div>}
          </div>

          {/* Recipient Name Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="recipientName"
              placeholder="Recipient Name"
              value={formData.recipientName}
              onChange={handleInputChange}
            />
            {errors.recipientName && <div className="error">{errors.recipientName}</div>}
          </div>

          {/* Recipient Phone Number Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="recipientPhone"
              placeholder="Recipient Phone Number"
              value={formData.recipientPhone}
              onChange={handleInputChange}
            />
            {errors.recipientPhone && <div className="error">{errors.recipientPhone}</div>}
          </div>

          {/* Recipient Address Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="recipientAddress"
              placeholder="Recipient Address"
              value={formData.recipientAddress}
              onChange={handleInputChange}
            />
            {errors.recipientAddress && <div className="error">{errors.recipientAddress}</div>}
          </div>

          {/* Final Distribution Field */}
          <div className="input-wrapper">
            <input
              type="text"
              name="finalDistribution"
              placeholder="Final Distribution"
              value={formData.finalDistribution}
              onChange={handleInputChange}
            />
            {errors.finalDistribution && <div className="error">{errors.finalDistribution}</div>}
          </div>

          {/* Date Field */}
          <div className="input-wrapper">
            <input
              type="date"
              name="date"
              value={formData.date}
              readOnly
              onChange={handleInputChange}
            />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>

          {/* Time Field */}
          <div className="input-wrapper">
            <input
              type="time"
              name="time"
              value={formData.time}
              readOnly
              onChange={handleInputChange}
            />
            {errors.time && <div className="error">{errors.time}</div>}
          </div>

          {/* Submit Button */}
          <button className="submit" onClick={handleSubmit}>
            Create Shipment
          </button>
        </div>
      </main>

  );
}

export default CreateShipmentPage;
