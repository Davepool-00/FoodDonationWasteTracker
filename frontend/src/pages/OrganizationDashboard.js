import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationDashboard = () => {
  const [received, setReceived] = useState([]);
  const [pending, setPending] = useState([]);
  const [expired, setExpired] = useState([]);
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
        const [receivedRes, pendingRes, expiredRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/donations/received-donations/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/donations/pending-donations/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/donations/expired-donations/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReceived(receivedRes.data);
        setPending(pendingRes.data);
        setExpired(expiredRes.data);
      } catch {
        setError("Failed to fetch donations.");
      } finally {
        setLoading(false);
      }
    };

    const markAsExpired = async (id) => {
      const token = localStorage.getItem("access_token");
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/donations/mark-expired/${id}/`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await fetchDonations(); // re-fetch all donations after marking expired
      } catch (error) {
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to mark as expired.");
        }
      }
    };

    fetchDonations();
  }, []);

  const markAsReceived = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/donations/mark-received/${id}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPending((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Failed to mark as received.");
    }
  };

  const markAsExpired = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/donations/mark-expired/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPending((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to mark as expired.");
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Organization Dashboard
      </h2>

      {loading && (
        <div className="alert alert-info text-center">Loading donations...</div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && (
        <>
          <section className="mb-5">
            <h4 className="mb-3">Received Donations</h4>
            {received.length === 0 ? (
              <div className="alert alert-warning">
                No received donations yet.
              </div>
            ) : (
              <ul className="list-group">
                {received.map(({ id, food_name, quantity }) => (
                  <li
                    key={id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {food_name} - {quantity} items
                    <span className="badge bg-success">Received</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-5">
            <h4 className="mb-3">Pending Donations</h4>
            {pending.length === 0 ? (
              <div className="alert alert-secondary">No pending donations.</div>
            ) : (
              <ul className="list-group">
                {pending.map(({ id, food_name, quantity, expiration_date }) => (
                  <li
                    key={id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {food_name} - {quantity} items
                    <div>
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => markAsReceived(id)}
                      >
                        Mark as Received
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => markAsExpired(id)}
                      >
                        Failed to Receive
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h4 className="mb-3">Expired Donations</h4>
            {expired.length === 0 ? (
              <div className="alert alert-danger">No expired donations.</div>
            ) : (
              <ul className="list-group">
                {expired.map(({ id, food_name, quantity }) => (
                  <li
                    key={id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {food_name} - {quantity} items
                    <span className="badge bg-danger">Expired</span>
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
