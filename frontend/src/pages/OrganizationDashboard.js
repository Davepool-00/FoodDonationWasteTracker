import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationDashboard = () => {
  const [receivedDonations, setReceivedDonations] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("Login required");
        setLoading(false);
        return;
      }

      try {
        // Correct API endpoints
        const receivedRes = await axios.get(
          "http://127.0.0.1:8000/food-donations/api/received-donations/", // Updated URL
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReceivedDonations(receivedRes.data);

        const pendingRes = await axios.get(
          "http://127.0.0.1:8000/food-donations/api/pending-donations/", // Updated URL
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPendingDonations(pendingRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to fetch donations.");
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Organization Dashboard</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <h4>Received Donations</h4>
            {receivedDonations.length === 0 ? (
              <p>No received donations yet.</p>
            ) : (
              <ul className="list-group">
                {receivedDonations.map((donation) => (
                  <li key={donation.id} className="list-group-item">
                    {donation.food_name} - {donation.quantity} items received
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <h4>Pending Donations</h4>
            {pendingDonations.length === 0 ? (
              <p>No pending donations.</p>
            ) : (
              <ul className="list-group">
                {pendingDonations.map((donation) => (
                  <li key={donation.id} className="list-group-item">
                    {donation.food_name} - {donation.quantity} items pending
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationDashboard;
