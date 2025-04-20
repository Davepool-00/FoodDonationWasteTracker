import React from "react";

const TrackDonationsPage = () => {
  const donations = [
    { id: 1, item: "Bread", quantity: "20 loaves", status: "Delivered", date: "2025-04-18" },
    { id: 2, item: "Canned Goods", quantity: "50 cans", status: "Pending", date: "2025-04-19" },
    { id: 3, item: "Fruits", quantity: "30 kg", status: "In Transit", date: "2025-04-20" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Track Your Donations</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date Donated</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.item}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      donation.status === "Delivered"
                        ? "bg-success"
                        : donation.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-info text-dark"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td>{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackDonationsPage;
