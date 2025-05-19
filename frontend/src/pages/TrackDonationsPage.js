import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackDonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Login required.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/my-donations/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data);
      } catch (err) {
        setError("Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div className="alert alert-info text-center">Loading donations...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Track Your Donations</h2>
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
            {donations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No donations found.</td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.food_name || donation.item}</td>
                  <td>{donation.quantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        donation.status === "Delivered"
                          ? "bg-success"
                          : donation.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-info text-dark"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td>{donation.date_donated || donation.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackDonationsPage;
