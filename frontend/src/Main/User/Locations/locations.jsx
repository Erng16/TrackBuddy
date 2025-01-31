// // LocationPage.js
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import CardList from './card/cardlist';
// import { SearchOutlined, EnvironmentFilled, InboxOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
// import "./locations.css";
// import 'bootstrap-icons/font/bootstrap-icons.css';

// class LocationPage extends Component {
//     state = {
//         searchTerm: ''
//     };

//     handleSearchChange = (event) => {
//         this.setState({ searchTerm: event.target.value });
//     };

//     render() {
//         return (
//             <>
//                 <div className="location-container">
//                     <div className="header">Location</div>
//                 </div>
//                 <div className="location-input-wrapper">
//                     <div className="input">
//                         <input
//                             type="text"
//                             placeholder="Search by district, province, or postal code"
//                             value={this.state.searchTerm}
//                             onChange={this.handleSearchChange}
//                         />
//                         <i className="search">
//                             <SearchOutlined />
//                         </i>
//                     </div>
//                     <div className="scrollable-card-list"> {/* Scrollable container */}
//                         <CardList searchTerm={this.state.searchTerm} />
//                     </div>
//                 </div>
//                 <div className="location-container">
//                     <div className="menu">
//                         <Link to="/home">
//                             <HomeOutlined />
//                         </Link>
//                         <Link to="/locations">
//                             <EnvironmentFilled />
//                         </Link>
//                         <Link to="/shipments">
//                           <i class="bi bi-box2"></i>
//                         </Link>
//                         <Link to="/profile">
//                         <i class="bi bi-person"></i>
//                         </Link>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default LocationPage;


import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "./card/card"; // Use individual card rendering in this page
import {
  SearchOutlined,
  EnvironmentFilled,
  HomeOutlined,
} from "@ant-design/icons";
import "./locations.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class LocationPage extends Component {
  state = {
    searchTerm: "",
    locations: [], // State to store fetched locations
    loading: true, // Loading state
    error: null, // Error state
  };

  componentDidMount() {
    this.fetchLocations(); // Fetch locations on component mount
  }

  fetchLocations = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      this.setState({ error: "Authorization token not found", loading: false });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/location/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use token for authorization
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch locations");
      }

      const data = await response.json();
      this.setState({ locations: data, loading: false });
    } catch (error) {
      console.error("Error fetching locations:", error.message);
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  getFilteredLocations = () => {
    const { searchTerm, locations } = this.state;
    const lowercasedSearch = searchTerm.trim().toLowerCase();
  
    if (!lowercasedSearch) {
      return locations; // Return all locations if no search term
    }
  
    // Ensure all fields are valid and lowercase for comparison
    return locations.filter((location) => {
      const district = location.district?.toLowerCase() || "";
      const province = location.province?.toLowerCase() || "";
      const postalCode = location.postal_code || "";
      const distName = location.dist_name?.toLowerCase() || "";
  
      return (
        district.includes(lowercasedSearch) ||
        province.includes(lowercasedSearch) ||
        postalCode.includes(lowercasedSearch) ||
        distName.includes(lowercasedSearch)
      );
    });
  };
  

  render() {
    const { searchTerm, loading, error } = this.state;
    const filteredLocations = this.getFilteredLocations();

    return (
      <>
        <div className="location-container">
          <div className="header">Location</div>
        </div>
        <div className="location-input-wrapper">
          <div className="input">
            <input
              type="text"
              placeholder="Search by district, province, or postal code"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
            <i className="search">
              <SearchOutlined />
            </i>
          </div>
          <div className="scrollable-card-list">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card
                  key={location.dist_id}
                  centerName={location.dist_name}
                  location={`${location.district}, ${location.province}`}
                  postalCode={location.postal_code}
                />
              ))
            ) : (
              <p>No locations found.</p>
            )}
          </div>
        </div>
        <div className="location-container">
          <div className="menu">
            <Link to="/home">
              <HomeOutlined />
            </Link>
            <Link to="/locations">
              <EnvironmentFilled />
            </Link>
            <Link to="/shipments">
              <i className="bi bi-box2"></i>
            </Link>
            <Link to="/profile">
              <i className="bi bi-person"></i>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default LocationPage;
