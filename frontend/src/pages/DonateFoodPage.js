import React, { useState } from 'react';
import axios from 'axios';

const DonateFoodPage = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      foodType,
      quantity,
      organization,
    };
    try {
      const response = await axios.post('API_URL/donations', donationData);
      console.log(response.data);
    } catch (error) {
      console.error('Error making donation:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Donate Food</h2>
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
            {/* Replace with dynamic data if needed */}
            <option value="Org1">Organization 1</option>
            <option value="Org2">Organization 2</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonateFoodPage;
