import React, { useState } from "react";

const Register = () => {
  const [userType, setUserType] = useState("donor");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
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
