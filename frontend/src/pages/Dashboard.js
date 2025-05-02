import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userType }) => {
  const navigate = useNavigate();

  // Simulate fetching user data (you would fetch this data from the backend)
  const [userInfo, setUserInfo] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    donations: [],
    receivedItems: [],
  });

  useEffect(() => {
    // Fetch data related to the user based on userType (donor or organization)
    // This is just an example, replace with actual API calls
    if (userType === "donor") {
      setUserInfo({
        ...userInfo,
        donations: ["5 kg of rice", "10 loaves of bread"], // Example donor items
      });
    } else if (userType === "organization") {
      setUserInfo({
        ...userInfo,
        receivedItems: ["5 kg of rice", "10 loaves of bread"], // Example organization received items
      });
    }
  }, [userType]);

  return (

    
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to your Dashboard, {userInfo.username}!</h2>
      <p>Email: {userInfo.email}</p>

      <div className="row">
        <div className="col-md-6">
          <h4>Your Information:</h4>
          <ul className="list-group">
            <li className="list-group-item">
              Username: {userInfo.username}
            </li>
            <li className="list-group-item">Email: {userInfo.email}</li>
          </ul>
        </div>

        <div className="col-md-6">
          {userType === "donor" ? (
            <>
              <h4>Your Donations:</h4>
              <ul className="list-group">
                {userInfo.donations.length > 0 ? (
                  userInfo.donations.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">You have not donated any food yet.</li>
                )}
              </ul>
              <button className="btn btn-primary mt-3 w-100" onClick={() => navigate("/donate")}>
                Donate More Food
              </button>
            </>
          ) : userType === "organization" ? (
            <>
              <h4>Received Donations:</h4>
              <ul className="list-group">
                {userInfo.receivedItems.length > 0 ? (
                  userInfo.receivedItems.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No donations received yet.</li>
                )}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>


    
  );
};

export default Dashboard;
