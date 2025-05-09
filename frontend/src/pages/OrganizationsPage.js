import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [userType, setUserType] = useState(localStorage.getItem("user_type") || "");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgsRes = await axios.get("http://127.0.0.1:8000/organizations/");
        setOrganizations(orgsRes.data);
      } catch (error) {
        console.error("Error loading organizations:", error);
        alert("Failed to load organizations. Please try again.");
      }

      // Fetch user type if not already set
      const token = localStorage.getItem("access_token");
      if (token && !userType) {
        try {
          const userRes = await axios.get("http://127.0.0.1:8000/user-info/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserType(userRes.data.user_type);
          localStorage.setItem("user_type", userRes.data.user_type);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_type");
        }
      }
    };

    fetchOrganizations();
  }, [userType]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Partner Organizations</h2>
      <div className="row">
        {organizations.map((org) => (
          <div key={org.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{org.name}</h5>
                <p className="card-text">{org.description}</p>
                <p className="text-muted">
                  <strong>Location:</strong> {org.location}
                </p>

                {/* Hide donate button for organization accounts */}
                {userType && userType !== "organization" && (
                  <Link
                    to={`/donate?organization=${org.id}&name=${encodeURIComponent(org.name)}`}
                    className="btn btn-primary w-100 mt-3"
                  >
                    Donate to {org.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;
