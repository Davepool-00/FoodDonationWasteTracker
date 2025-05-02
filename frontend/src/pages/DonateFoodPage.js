import React, { useState, useEffect } from "react";
import axios from "axios";

const DonateFoodPage = () => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]); // To store organizations
  const [loading, setLoading] = useState(true); // Loading state for fetching organizations

  useEffect(() => {
    // Fetch organizations from backend
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
        setOrganizations(response.data); // Store organizations in state
        setLoading(false); // Set loading to false once organizations are fetched
      } catch (error) {
        console.error("Error fetching organizations:", error);
        alert("Failed to fetch organizations");
        setLoading(false); // Set loading to false even if fetching fails
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Login required");
      return;
    }

    const donationData = {
      name: foodType, // Maps to `name` field in FoodDonation model
      quantity,
      organization,
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
      alert("Donation submitted!");
      setFoodType("");
      setQuantity("");
      setOrganization("");
    } catch (error) {
      console.error("Error making donation:", error.response?.data || error);
      alert("Failed to donate. Check console.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Donate Food</h2>
      {loading ? (
        <div className="text-center">Loading organizations...</div>
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
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
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
