// // ShipmentPage.js
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import CardList from "./card/CardList";
// import {
//   SearchOutlined,
//   EnvironmentOutlined,
//   UserOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import "./shipment.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// class ShipmentPage extends Component {
//   state = {
//     searchTerm: "",
//     filterStatus: "All",
//     shipments: [
//       {
//         trackingNumber: "CSS0000000001",
//         status: "Delivered",
//         updateTime: "12/09/2024 14:35",
//         sender: "John Smith",
//         receiver: "Alice Withers",
//       },
//       {
//         trackingNumber: "CSS0000000002",
//         status: "In Transit",
//         updateTime: "12/09/2024 12:00",
//         sender: "Mike Doe",
//         receiver: "Sarah Connor",
//       },
//       {
//         trackingNumber: "CSS0000000004",
//         status: "Waiting For Refund",
//         updateTime: "12/09/2024 10:00",
//         sender: "Jane Doe",
//         receiver: "Bob Martin",
//       },
//     ],
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchTerm: event.target.value });
//   };

//   handleFilterChange = (status) => {
//     this.setState({ filterStatus: status });
//   };

//   render() {
//     const { searchTerm, shipments, filterStatus } = this.state;

//     // Filter shipments
//     const filteredShipments = shipments.filter((shipment) => {
//       const trimmedSearch = searchTerm.trim().toLowerCase();
//       const matchesStatus =
//         filterStatus === "All" ||
//         (filterStatus === "In Progress" && shipment.status === "In Transit") ||
//         (filterStatus === "Delivered" && shipment.status === "Delivered") ||
//         (filterStatus === "Unsuccessful" && shipment.status === "Waiting For Refund");

//       const matchesSearch =
//         trimmedSearch === "" || // Matches all if search is empty
//         shipment.trackingNumber.toLowerCase().includes(trimmedSearch) ||
//         shipment.sender.toLowerCase().includes(trimmedSearch) ||
//         shipment.receiver.toLowerCase().includes(trimmedSearch);

//       return matchesStatus && matchesSearch;
//     });

//     return (
//       <>
//       <body className="shipment">
//         <div className="shipment-container">
//           <div className="header">My Shipments</div>
//         </div>
//         <div className="filter-bar">
//           <button
//             className={`filter-button ${
//               filterStatus === "All" ? "active" : ""
//             }`}
//             onClick={() => this.handleFilterChange("All")}
//           >
//             All
//           </button>
//           <button
//             className={`filter-button ${
//               filterStatus === "In Progress" ? "active" : ""
//             }`}
//             onClick={() => this.handleFilterChange("In Progress")}
//           >
//             In Progress
//           </button>
//           <button
//             className={`filter-button ${
//               filterStatus === "Delivered" ? "active" : ""
//             }`}
//             onClick={() => this.handleFilterChange("Delivered")}
//           >
//             Delivered
//           </button>
//           <button
//             className={`filter-button ${
//               filterStatus === "Unsuccessful" ? "active" : ""
//             }`}
//             onClick={() => this.handleFilterChange("Unsuccessful")}
//           >
//             Unsuccessful
//           </button>
//         </div>
//         <div className="shipment-input-wrapper">
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
//         <CardList shipments={filteredShipments} />
//         <div className="shipment-container">
//           <div className="menu">
//             <Link to="/home">
//               <HomeOutlined />
//             </Link>
//             <Link to="/locations">
//               <EnvironmentOutlined />
//             </Link>
//             <Link to="/shipments">
//               <i className="bi bi-box2-fill"></i>
//             </Link>
//             <Link to="/profile">
//             <i class="bi bi-person"></i>
//             </Link>
//           </div>
//         </div>
//         </body>
//       </>
//     );
//   }
// }

// export default ShipmentPage;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "./card/ShipmentCard";
import {
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./shipment.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class ShipmentPage extends Component {
  state = {
    searchTerm: "",
    filterStatus: "All",
    shipments: [], // Store fetched shipments
    loading: true, // Loading state
    error: null, // Error state
  };

  componentDidMount() {
    this.fetchShipments(); // Fetch shipments on component mount
  }

  fetchShipments = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      this.setState({ error: "Authorization token not found", loading: false });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/shipments/my-shipments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use token for authorization
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch shipments");
      }

      const data = await response.json();
      this.setState({ shipments: data, loading: false });
    } catch (error) {
      console.error("Error fetching shipments:", error.message);
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleFilterChange = (status) => {
    this.setState({ filterStatus: status });
  };

  getFilteredShipments = () => {
    const { searchTerm, filterStatus, shipments } = this.state;
    const trimmedSearch = searchTerm.trim().toLowerCase();

    return shipments.filter((shipment) => {
      const matchesStatus =
  filterStatus === "All" ||
  (filterStatus === "In Progress" &&
    (shipment.status === "In Transit" ||
     shipment.status === "Pick up" ||
     shipment.status === "Out for delivery")) ||
  (filterStatus === "Delivered" && shipment.status === "Delivered") ||
  (filterStatus === "Unsuccessful" && shipment.status === "Unsuccessful");

      const matchesSearch =
        trimmedSearch === "" || // Matches all if search is empty
        shipment.tracking_id.toLowerCase().includes(trimmedSearch) ||
        shipment.sender_name.toLowerCase().includes(trimmedSearch) ||
        shipment.recipient_name.toLowerCase().includes(trimmedSearch);

      return matchesStatus && matchesSearch;
    });
  };

  render() {
    const { searchTerm, filterStatus, loading, error } = this.state;
    const filteredShipments = this.getFilteredShipments();

    return (
      <main className="shipment">
        <div className="shipment-container">
          <div className="header">My Shipments</div>
        </div>
        <div className="filter-bar">
          <button
            className={`filter-button ${
              filterStatus === "All" ? "active" : ""
            }`}
            onClick={() => this.handleFilterChange("All")}
          >
            All
          </button>
          <button
            className={`filter-button ${
              filterStatus === "In Progress" ? "active" : ""
            }`}
            onClick={() => this.handleFilterChange("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`filter-button ${
              filterStatus === "Delivered" ? "active" : ""
            }`}
            onClick={() => this.handleFilterChange("Delivered")}
          >
            Delivered
          </button>
          <button
            className={`filter-button ${
              filterStatus === "Unsuccessful" ? "active" : ""
            }`}
            onClick={() => this.handleFilterChange("Unsuccessful")}
          >
            Unsuccessful
          </button>
        </div>
        <div className="shipment-input-wrapper">
          <div className="input">
            <input
              type="text"
              placeholder="Search by tracking number"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
            <i className="search">
              <SearchOutlined />
            </i>
          </div>
        </div>
        <div className="scrollable-card-list">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="error">{error}</p>
  ) : filteredShipments.length > 0 ? (
    filteredShipments.map((shipment) => (
      <Card
        key={shipment.tracking_id}
        trackingNumber={shipment.tracking_id}
        status={shipment.status}
        updateTime={shipment.timestamp}
        sender={shipment.sender_name}
        receiver={shipment.recipient_name}
      />
    ))
  ) : (
    <p>No shipments found.</p>
  )}
</div>

        <div className="shipment-container">
          <div className="menu">
            <Link to="/home">
              <HomeOutlined />
            </Link>
            <Link to="/locations">
              <EnvironmentOutlined />
            </Link>
            <Link to="/shipments">
              <i className="bi bi-box2-fill"></i>
            </Link>
            <Link to="/profile">
              <i className="bi bi-person"></i>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default ShipmentPage;
