import React from "react";

const organizations = [
  {
    name: "Helping Hands Foundation",
    description: "Provides meals to homeless communities.",
    contact: "contact@helpinghands.org",
  },
  {
    name: "Food4All PH",
    description: "Distributes food to underprivileged families.",
    contact: "support@food4all.ph",
  },
  {
    name: "Bayanihan Kitchen",
    description: "Feeds displaced individuals during calamities.",
    contact: "info@bayanihankitchen.com",
  },
];

const OrganizationsPage = () => {
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
                  <strong>Contact:</strong> {org.contact}
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
