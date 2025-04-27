import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import DonateFoodPage from "./pages/DonateFoodPage";
import TrackDonationsPage from "./pages/TrackDonationsPage";
import AboutPage from "./pages/About";
import OrganizationPage from "./pages/OrganizationsPage";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route
          path="/organization-dashboard"
          element={<OrganizationDashboard />}
        />
        <Route path="/donate" element={<DonateFoodPage />} />
        <Route path="/track-donations" element={<TrackDonationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/organizations" element={<OrganizationPage/>} />
        {/* Other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
