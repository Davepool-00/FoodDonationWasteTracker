import React, { useEffect, useState } from "react";
import axios from "axios";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤝 Partner Organizations</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search organization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredOrgs.length === 0 ? (
          <div className="text-center text-muted">No organizations found.</div>
        ) : (
          filteredOrgs.map((org, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{org.name}</h5>
                  <p className="card-text">{org.description || "No description provided."}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <small className="text-muted">
                    <i className="bi bi-geo-alt-fill me-1"></i>{org.location}
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizationsPage;
