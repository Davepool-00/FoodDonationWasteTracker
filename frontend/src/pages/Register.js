import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "donor",
    location: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Ensure the value is correctly set as a string
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure confirmPassword is a string
    const confirmPassword = String(formData.confirmPassword);

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      user_type: formData.userType,
      name: formData.username,
      confirm_password: confirmPassword, // Ensure it's sent as a string
    };
    console.log("Sending this data to the backend:", userData);

    if (formData.userType === "organization") {
      userData.location = formData.location;
      userData.description = formData.description;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        userData
      );
      console.log(response.data);
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.detail || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
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
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                  ></i>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye" : "bi-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
              <label className="form-label">User Type</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="donor"
                  value="donor"
                  checked={formData.userType === "donor"}
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
                  checked={formData.userType === "organization"}
                  onChange={handleUserTypeChange}
                />
                <label className="form-check-label" htmlFor="organization">
                  Organization
                </label>
              </div>
            </div>

            {formData.userType === "organization" && (
              <>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

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
