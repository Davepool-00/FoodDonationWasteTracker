import React, { useState, useEffect } from "react";
import axios from "axios";

const DonateFoodPage = () => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Login required");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/organizations/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrganizations(res.data);
      } catch (err) {
        setError("Failed to fetch organizations.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodType || !quantity || !expirationDate || !pickupLocation || !organization) {
      setError("All fields are required!");
      return;
    }

    setError("");

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Login required");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/food-donations/",
        {
          food_name: foodType,
          quantity,
          expiration_date: expirationDate,
          pickup_location: pickupLocation,
          organization,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Donation submitted successfully!");
      setFoodType("");
      setQuantity("");
      setExpirationDate("");
      setPickupLocation("");
      setOrganization("");
    } catch (err) {
      setError("Failed to make the donation. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4 fw-bold">Donate Food</h2>

      {loading ? (
        <p className="text-center">Loading organizations...</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Food Type</label>
              <input
                type="text"
                className="form-control"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                placeholder="e.g., Rice, Canned Goods"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Expiration Date</label>
              <input
                type="date"
                className="form-control"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Pickup Location</label>
              <input
                type="text"
                className="form-control"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="e.g., 123 Main St, City"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Organization</label>
            <select
              className="form-select"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            >
              <option value="">Choose an organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit Donation
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonateFoodPage;
