// import React, { Component } from "react";
// import { Link } from "react-router-dom"; // Import withRouter
// import { ShipmentContext } from "../../ShipmentContext.jsx";
// import CardList from "./card/CardList.jsx";
// import {
//   SearchOutlined,
//   EnvironmentOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import "./shipment.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { withRouter } from "../../../withRouter.jsx";

// class AdminShipmentPage extends Component {
//   static contextType = ShipmentContext;

//   state = {
//     searchTerm: "",
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchTerm: event.target.value });
//   };

//   render() {
//     const { searchTerm } = this.state;
//     const { shipments } = this.context || {};

//     if (!shipments) {
//       return <div>Loading shipments...</div>;
//     }

//     // Get the filter from the URL query parameters
//     const params = new URLSearchParams(this.props.location.search);
//     const filterStatus = params.get("filter") || "All";

//     // Filter shipments
//     const filteredShipments = shipments.filter((shipment) => {
//       const trimmedSearch = searchTerm.trim().toLowerCase();
//       const matchesStatus =
//         filterStatus === "All" ||
//         (filterStatus === "Delivered" && shipment.status === "Delivered") ||
//         (filterStatus === "Unsuccessful" &&
//           shipment.status === "Waiting For Refund");

//       const matchesSearch =
//         trimmedSearch === "" ||
//         shipment.trackingNumber.toLowerCase().includes(trimmedSearch) ||
//         shipment.sender.toLowerCase().includes(trimmedSearch) ||
//         shipment.receiver.toLowerCase().includes(trimmedSearch);

//       return matchesStatus && matchesSearch;
//     });

//     return (
//       <main className="admin-shipment">
//         <Link to="/admin-home" className="return-button">
//           <i className="bi bi-arrow-left"></i>
//         </Link>
//         <div className="admin-shipment-container">
//           <div className="header">Report</div>
//         </div>
//         <div className="filter-bar">
//           <button
//             className={`filter-button ${
//               filterStatus === "All" ? "active" : ""
//             }`}
//             onClick={() => this.props.navigate("/admin-shipments?filter=All")}
//           >
//             All
//           </button>
//           <button
//             className={`filter-button ${
//               filterStatus === "Delivered" ? "active" : ""
//             }`}
//             onClick={() =>
//               this.props.navigate("/admin-shipments?filter=Delivered")
//             }
//           >
//             Delivered
//           </button>
//           <button
//             className={`filter-button ${
//               filterStatus === "Unsuccessful" ? "active" : ""
//             }`}
//             onClick={() =>
//               this.props.navigate("/admin-shipments?filter=Unsuccessful")
//             }
//           >
//             Unsuccessful
//           </button>
//         </div>
//         <div className="admin-shipment-input-wrapper">
//           <div className="input">
//             <input
//               type="text"
//               placeholder="Search by tracking number"
//               value={searchTerm}
//               onChange={this.handleSearchChange}
//             />
//             <i className="search">
//               <SearchOutlined />
//             </i>
//           </div>
//         </div>
//         <div className="scrollable-card-list">
//           <CardList shipments={filteredShipments} />
//         </div>
//         <div className="admin-shipment-container">
//           <div className="menu">
//             <Link to="/admin-home">
//               <HomeOutlined />
//             </Link>
//             <Link to="/staff-info">
//               <i className="bi bi-person-vcard"></i>
//             </Link>
//             <Link to="/admin-profile">
//               <i className="bi bi-person"></i>
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
//   }
// }

// export default withRouter(AdminShipmentPage);

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import "./shipment.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./card/AdminCard"; // Use the Card component

function AdminShipmentPage() {
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Access location
  const navigate = useNavigate(); // Access navigation

  useEffect(() => {
    fetchShipments();
  }, [location.search]); // Refetch data when query parameters change

  const fetchShipments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Unauthorized: No token found.");
        navigate("/staff-login");
        return;
      }
  
      const params = new URLSearchParams(location.search);
      let date = params.get("date");
      const status = params.get("status") || "All";
  
      if (!date || date === "null") {
        date = new Date().toISOString().split("T")[0];
      }
  
      const response = await fetch(
        `http://localhost:3000/api/admin/reports/parcels?date=${date}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Invalid token.");
          navigate("/staff-login");
          return;
        }
        throw new Error(`Error fetching shipments: ${response.statusText}`);
      }
  
      const data = await response.json();
      // Ensure no duplicates and only the latest status
      const latestShipments = {};
      data.forEach((shipment) => {
        if (
          !latestShipments[shipment.tracking_id] ||
          new Date(latestShipments[shipment.tracking_id].timestamp) <
            new Date(shipment.timestamp)
        ) {
          latestShipments[shipment.tracking_id] = shipment;
        }
      });
  
      setShipments(Object.values(latestShipments));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setShipments([]);
      setLoading(false);
      setError(err.message);
    }
  };
  
  
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShipments = shipments.filter((shipment) => {
    const trimmedSearch = searchTerm.trim().toLowerCase();
    return (
      trimmedSearch === "" ||
      shipment.tracking_id.toLowerCase().includes(trimmedSearch) ||
      shipment.from.toLowerCase().includes(trimmedSearch) ||
      shipment.to.toLowerCase().includes(trimmedSearch)
    );
  });

  if (loading) return <div>Loading shipments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="admin-shipment">
      <Link to="/admin-home" className="return-button">
        <i className="bi bi-arrow-left"></i>
      </Link>
      <div className="admin-shipment-container">
        <div className="header">Report</div>
      </div>
      <div className="filter-bar">
  <button
    className="filter-button"
    onClick={() => {
      const params = new URLSearchParams(location.search); // Access query parameters
      const date = params.get("date") || new Date().toISOString().split("T")[0];
      navigate(`/admin-shipments?date=${date}&status=All`);
    }}
  >
    All
  </button>
  <button
    className="filter-button"
    onClick={() => {
      const params = new URLSearchParams(location.search);
      const date = params.get("date") || new Date().toISOString().split("T")[0];
      navigate(`/admin-shipments?date=${date}&status=Delivered`);
    }}
  >
    Delivered
  </button>
  <button
    className="filter-button"
    onClick={() => {
      const params = new URLSearchParams(location.search);
      const date = params.get("date") || new Date().toISOString().split("T")[0];
      navigate(`/admin-shipments?date=${date}&status=Unsuccessful`);
    }}
  >
    Unsuccessful
  </button>
</div>

      <div className="admin-shipment-input-wrapper">
        <div className="input">
          <input
            type="text"
            placeholder="Search by tracking number"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="search">
            <SearchOutlined />
          </i>
        </div>
      </div>
      <div className="scrollable-card-list">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <Card
              key={shipment.tracking_id}
              trackingNumber={shipment.tracking_id}
              status={shipment.status_tracking}
              updateTime={shipment.timestamp}
              sender={shipment.from}
              receiver={shipment.to}
            />
          ))
        ) : (
          <div>No shipments found.</div>
        )}
      </div>
      <div className="admin-shipment-container">
        <div className="menu">
          <Link to="/admin-home">
            <HomeOutlined />
          </Link>
          <Link to="/staff-info">
            <i className="bi bi-person-vcard"></i>
          </Link>
          <Link to="/admin-profile">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AdminShipmentPage;


