//import "../styles/HomePage.css"; // For styling the home page
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="display-4 text-primary mb-4">
            Welcome to the Food Donation & Waste Tracker
          </h1>
          <p className="lead mb-4">
            Our mission is to reduce food waste and connect excess food to those
            in need. Help us make a difference by donating food today!
          </p>
          <Link to="/donate" className="btn btn-lg btn-success">
            Donate Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
