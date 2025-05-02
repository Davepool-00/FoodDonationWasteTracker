import React, { useState, useEffect } from "react";
import axios from "axios";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/food-donations/my-donations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Failed to fetch donations.");
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Donor Dashboard</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="mb-4">
        <h4>Your Donations</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date Donated</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((donation, index) => (
                  <tr key={donation.id}>
                    <td>{index + 1}</td>
                    <td>{donation.food_name}</td>
                    <td>{donation.quantity}</td>
                    <td>
                      <span
                        className={`badge ${
                          donation.is_claimed ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {donation.is_claimed ? "Delivered" : "Pending"}
                      </span>
                    </td>
                    <td>{new Date(donation.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No donations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/donate"}>
        Donate More Food
      </button>
    </div>
  );
};

export default DonorDashboard;
