import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // To store error message
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Log in to get the JWT token
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = response.data;

      // Save the tokens in local storage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Step 2: Fetch user info after login
      const userResponse = await axios.get("http://127.0.0.1:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const { user_type } = userResponse.data; // Get user type (role)

      // Step 3: Redirect based on user role
      if (user_type === "donor") {
        navigate("/donor-dashboard");
      } else if (user_type === "organization") {
        navigate("/organization-dashboard");
      } else if (user_type === "admin") {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid role!"); // Handle invalid roles
      }

      console.log("Login successful!", response.data);
      alert("Logged in successfully!");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );

      if (error.response) {
        if (error.response.status === 401) {
          setError(
            "Invalid credentials. Please check your username and password."
          );
        } else if (error.response.status === 403) {
          setError("You are not authorized to log in.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else {
        setError(
          "No response from server. Please check your internet connection."
        );
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                  ></i>
                </span>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
