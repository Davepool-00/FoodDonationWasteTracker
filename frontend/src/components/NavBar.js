import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_only.png";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token"); // Check if access token exists

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove the token
    localStorage.removeItem("refresh_token");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand on the left */}
        <img src={logo} alt="Logo" width="50px" className="rounded-circle me-2" />
        <Link className="navbar-brand" to="/">
          Bite Back
        </Link>

        {/* Centered nav links */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/organizations">
                Organizations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donate">
                Donate Food
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/track-donations">
                Track Donations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Buttons on the right */}
        <div className="d-flex">
          {!isLoggedIn ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-warning" to="/register">
                Sign Up
              </Link>
            </>
          ) : (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
