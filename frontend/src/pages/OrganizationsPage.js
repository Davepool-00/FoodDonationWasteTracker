import React, { useEffect, useState } from "react";
import axios from "axios";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/organizations/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrganizations(response.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        alert("Error loading organizations");
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Partner Organizations</h2>
      <div className="row">
        {organizations.map((org, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{org.name}</h5>
                <p className="card-text">{org.description}</p>
                <p className="text-muted">
                  <strong>Location:</strong> {org.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;
