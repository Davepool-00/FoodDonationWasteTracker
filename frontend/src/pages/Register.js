import React, { useState } from "react";
import axios from "axios";  // Import axios

const Register = () => {
  const [userType, setUserType] = useState("donor");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Data to send to backend
    const userData = {
      username: username,
      email: email,
      password: password,
      user_type: userType,  // Or user_type if that's your model field
    };

    try {
      // Make API request to register the user
      const response = await axios.post("http://localhost:8000/api/register/", userData);
      if (response.status === 201) {
        // Handle success (e.g., redirect to login page or show success message)
        alert("Registration successful!");
      }
    } catch (error) {
      console.error("There was an error with the registration:", error);
      // Handle error (show error message to user)
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">User Type</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="donor"
                  value="donor"
                  checked={userType === "donor"}
                  onChange={handleUserTypeChange}
                />
                <label className="form-check-label" htmlFor="donor">
                  Donor
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="organization"
                  value="organization"
                  checked={userType === "organization"}
                  onChange={handleUserTypeChange}
                />
                <label className="form-check-label" htmlFor="organization">
                  Organization
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
