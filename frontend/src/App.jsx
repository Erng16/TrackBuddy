import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./LoginSignup/User/login.jsx";
import UserSignUp from "./LoginSignup/User/signup.jsx";
import HomePage from "./Main/User/Home/home.jsx";
import LocationPage from "./Main/User/Locations/locations.jsx";
import ShipmentPage from "./Main/User/Shipment/shipment.jsx";
import ShipmentDetailsPage from "./Main/User/Shipment/ShipmentDetailsPage.jsx";
import ProfilePage from "./Main/User/Profile/profile.jsx";
import EditProfile from "./Main/User/Profile/editProfile.jsx";
import NotificationsPage from "./Main/User/Home/noti.jsx";
import UserOrStaff from "./LoginSignup/UserOrStaff.jsx";
import StaffLogin from "./LoginSignup/Staff/login.jsx";
import StaffSignUp from "./LoginSignup/Staff/signup.jsx";
import StaffHomePage from "./Main/Staff/Home/home.jsx";
import CreateShipmentPage from "./Main/Staff/Home/createShip.jsx";
import StaffShipmentDetailsPage from "./Main/Staff/Home/Shipment/StaffShipmentDetailsPage.jsx";
import StaffProfilePage from "./Main/Staff/Profile/profile.jsx";
import StaffEditProfile from "./Main/Staff/Profile/editProfile.jsx";
import CourierHomePage from "./Main/Courier/Home/home.jsx";
// import DeliveryPage from "./Main/Courier/Home/Shipment/Delivery.jsx";

// Import ShipmentProvider
import { ShipmentProvider } from "./Main/ShipmentContext.jsx";
import ConfirmDeliveryPage from "./Main/Courier/Home/Shipment/Confirm.jsx";
import AdminHome from "./Main/Admin/adminHome.jsx";
import AdminShipmentPage from "./Main/Admin/Shipment/shipment.jsx";
import StaffInfo from "./Main/Admin/StaffInfo/StaffInfo.jsx";
import AdminShipmentDetailsPage from "./Main/Admin/Shipment/AdminShipmentDetailsPage.jsx";
import AdminProfilePage from "./Main/Admin/profile.jsx";
import AdminEditProfile from "./Main/Admin/editProfile.jsx";
import CourierProfilePage from "./Main/Courier/Home/profile.jsx";
import CourierEditProfile from "./Main/Courier/Home/editProfile.jsx";


function App() {
  return (
    <ShipmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserOrStaff />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-signup" element={<StaffSignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/shipments" element={<ShipmentPage />} />
          <Route path="/shipment/:trackingNumber" element={<ShipmentDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit-profile" element={<EditProfile />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/staff-home" element={<StaffHomePage />} />
          <Route path="/staff-create-shipment" element={<CreateShipmentPage />} />
          <Route
            path="/staff-shipments/:trackingNumber"
            element={<StaffShipmentDetailsPage />}
          />
          <Route path="/staff-profile" element={<StaffProfilePage />} />
          <Route
            path="/staff-profile/edit-profile"
            element={<StaffEditProfile />}
          />
          <Route path="/courier-home" element={<CourierHomePage />} />
          {/* <Route
            path="/courier-shipments/delivery/:trackingNumber"
            element={<DeliveryPage />}
          /> */}
          <Route
            path="/courier-shipments/confirm-delivery/:trackingNumber"
            element={<ConfirmDeliveryPage />}
          />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-shipments" element={<AdminShipmentPage />} />
          <Route path="/admin/staff-info" element={<StaffInfo />} />
          <Route
            path="/admin-shipments/:trackingNumber"
            element={<AdminShipmentDetailsPage />}
          />
           <Route path="/admin-profile" element={<AdminProfilePage />} />
           <Route path="/admin-profile/edit-profile" element={<AdminEditProfile />} />
           <Route path="/courier-profile" element={<CourierProfilePage />} />
           <Route path="/courier-profile/edit-profile" element={<CourierEditProfile />} />
        </Routes>
      </Router>
    </ShipmentProvider>
  );
}

export default App;
