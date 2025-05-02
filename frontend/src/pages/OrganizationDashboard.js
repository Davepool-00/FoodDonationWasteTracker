import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationDashboard = () => {
  const [receivedDonations, setReceivedDonations] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]);

  useEffect(() => {
    // Fetch received donations for organization
    axios
      .get("http://127.0.0.1:8000/api/received-donations/")
      .then((response) => setReceivedDonations(response.data))
      .catch((error) =>
        console.log("Error fetching received donations:", error)
      );

    // Fetch pending donations
    axios
      .get("http://127.0.0.1:8000/api/pending-donations/")
      .then((response) => setPendingDonations(response.data))
      .catch((error) =>
        console.log("Error fetching pending donations:", error)
      );
  }, []);

  return (
    <div className="container mt-5">
      <h2>Organization Dashboard</h2>

      <div className="mb-4">
        <h4>Received Donations</h4>
        <ul className="list-group">
          {receivedDonations.map((donation) => (
            <li key={donation.id} className="list-group-item">
              {donation.food_item} - {donation.quantity} items received
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4>Pending Donations</h4>
        <ul className="list-group">
          {pendingDonations.map((donation) => (
            <li key={donation.id} className="list-group-item">
              {donation.food_item} - {donation.quantity} items pending
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
// <button className="btn btn-success mt-3">Request More Donations</button>