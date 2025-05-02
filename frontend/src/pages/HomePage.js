import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [userType, setUserType] = useState(null);

  // Fetch the current user info (including user_type)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserType(response.data.user_type); // Set user_type
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const renderUserTypeContent = () => {
    if (userType === "donor") {
      return (
        <>
          <p className="lead mb-4">
            Thank you for considering donating food! You can help others by
            donating your excess food.
          </p>
          <Link to="/donor-dashboard" className="btn btn-lg btn-success">
            View Donor Dashboard
          </Link>
        </>
      );
    }

    if (userType === "organization") {
      return (
        <>
          <p className="lead mb-4">
            As an organization, you can receive food donations from donors to
            support your cause.
          </p>
          <Link to="/organization-dashboard" className="btn btn-lg btn-primary">
            View Organization Dashboard
          </Link>
        </>
      );
    }

    if (userType === "admin") {
      return (
        <>
          <p className="lead mb-4">
            Welcome, Admin! You have full control over the system and can manage
            all aspects of the platform.
          </p>
          <Link to="/admin-dashboard" className="btn btn-lg btn-warning">
            Admin Dashboard
          </Link>
        </>
      );
    }

    return <p className="lead mb-4">Please log in to access your dashboard.</p>;
  };

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
          {renderUserTypeContent()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
