import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid2,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For routing
import { LoginAdmin } from "../../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  // State for storing form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for handling errors
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Clear the error if validation is passed
    setError("");

    console.log("formData:", formData);

    const payload = {
      email: formData.email,
      password: formData.password,
      // role: "admin", // Static role set as 'admin'
    };

    try {
      const response = await LoginAdmin(payload);
     
      console.log("Admin Logged In:", response);

      localStorage.setItem("token",response.token)
    
      navigate("/admin"); // Change this to the correct route after login
    } catch (err) {
        console.error("Error logging in:", err);
      setError("An error occurred. Please try again later.");
    }
  };


  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#f0f4f8",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: "100%",
          borderRadius: "12px",
          boxShadow: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 3,
            color: "#1976d2", // Blue branding color
          }}
        >
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            {/* Email Field */}
            <Grid2 item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                sx={{ marginBottom: 2 }}
              />
            </Grid2>

            {/* Password Field */}
            <Grid2 item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                sx={{ marginBottom: 2 }}
              />
            </Grid2>

            {/* Error Message */}
            {error && (
              <Grid2 item xs={12}>
                <Typography color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
              </Grid2>
            )}

            {/* Submit Button */}
            <Grid2 item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                sx={{
                  padding: "12px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#1565c0", // Darker blue on hover
                  },
                }}
              >
                Login
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
