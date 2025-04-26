import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand on the left */}
        <img src="/assets/logo_only.png" alt="Logo"></img>
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
          <Link className="btn btn-outline-light me-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-warning" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
