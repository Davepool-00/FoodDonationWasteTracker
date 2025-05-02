import React, { useState, useEffect } from "react";
import axios from "axios";

const DonateFoodPage = () => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState(""); // New field for expiration date
  const [pickupLocation, setPickupLocation] = useState(""); // New field for pickup location
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Login required");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/organizations/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setOrganizations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setError("Failed to fetch organizations.");
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !foodType ||
      !quantity ||
      !expirationDate ||
      !pickupLocation ||
      !organization
    ) {
      setError("All fields are required!");
      return;
    }

    setError("");

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Login required");
      return;
    }

    const donationData = {
      food_name: foodType, // Map to the `food_name` field in FoodDonation model
      quantity,
      expiration_date: expirationDate, // Add expiration date here
      pickup_location: pickupLocation, // Add pickup location here
      organization, // Send selected organization
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/food-donations/",
        donationData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Donation successful", response.data);
      alert("Donation submitted successfully!");
      setFoodType("");
      setQuantity("");
      setExpirationDate("");
      setPickupLocation("");
      setOrganization(""); // Clear form fields
    } catch (error) {
      console.error("Error making donation:", error.response?.data || error);
      setError("Failed to make the donation. Please try again.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Donate Food</h2>
      {loading ? (
        <div className="text-center">Loading organizations...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="foodType">Food Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="foodType"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  placeholder="Enter food type"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="expirationDate"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="pickupLocation"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter pickup location"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="organization">Select Organization</label>
            <select
              className="form-control"
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            >
              <option value="">Choose Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Donate
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonateFoodPage;
