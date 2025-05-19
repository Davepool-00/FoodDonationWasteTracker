import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_only.png";

const NavBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const userType = localStorage.getItem("user_type")?.toLowerCase();
  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          width="50px"
          className="rounded-circle me-2"
        />
        <Link className="navbar-brand" to="/">
          Bite Back
        </Link>

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
            {userType === "donor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donor-dashboard">
                  Donor Dashboard
                </Link>
              </li>
            )}
            {userType === "organization" && (
              <li className="nav-item">
                <Link className="nav-link" to="/organization-dashboard">
                  Organization Dashboard
                </Link>
              </li>
            )}
            {userType === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex">
          {accessToken ? (
            <>
              <span className="navbar-text text-light me-3">
                Welcome, <strong>{userName}</strong>{" "}
                {userType
                  ? userType.charAt(0).toUpperCase() + userType.slice(1)
                  : ""}
                )
              </span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-warning" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
