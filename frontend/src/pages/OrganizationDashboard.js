import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationDashboard = () => {
  const [received, setReceived] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Login required");
        setLoading(false);
        return;
      }

      try {
        const [receivedRes, pendingRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/food-donations/api/received-donations/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/food-donations/api/pending-donations/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setReceived(receivedRes.data);
        setPending(pendingRes.data);
      } catch (err) {
        setError("Failed to fetch donations.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const markAsReceived = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(`http://127.0.0.1:8000/food-donations/api/mark-received/${id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const donation = pending.find((item) => item.id === id);
      setPending(pending.filter((item) => item.id !== id));
      setReceived([...received, donation]);
    } catch (err) {
      setError("Failed to mark as received.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Organization Dashboard</h2>

      {loading && <div className="alert alert-info text-center">Loading donations...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && (
        <>
          <section className="mb-5">
            <h4 className="mb-3">Received Donations</h4>
            {received.length === 0 ? (
              <div className="alert alert-warning">No received donations yet.</div>
            ) : (
              <ul className="list-group">
                {received.map((donation) => (
                  <li key={donation.id} className="list-group-item d-flex justify-content-between">
                    {donation.food_name} - {donation.quantity} items
                    <span className="badge bg-success">Received</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h4 className="mb-3">Pending Donations</h4>
            {pending.length === 0 ? (
              <div className="alert alert-secondary">No pending donations.</div>
            ) : (
              <ul className="list-group">
                {pending.map((donation) => (
                  <li key={donation.id} className="list-group-item d-flex justify-content-between">
                    {donation.food_name} - {donation.quantity} items
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => markAsReceived(donation.id)}
                    >
                      Mark as Received
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default OrganizationDashboard;
