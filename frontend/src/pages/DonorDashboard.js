import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);

  // Fetch donor donations (Simulated for now)
  useEffect(() => {
    // Assuming you have an API endpoint to get donor donations
    axios.get('http://127.0.0.1:8000/api/donations/')
      .then(response => setDonations(response.data))
      .catch(error => console.log('Error fetching donations:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Donor Dashboard</h2>
      <div className="mb-4">
        <h4>Your Donations</h4>
        <ul className="list-group">
          {donations.map(donation => (
            <li key={donation.id} className="list-group-item">
              {donation.food_item} - {donation.quantity} items donated
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary mt-3">Donate More Food</button>
    </div>
  );
};

export default DonorDashboard;
