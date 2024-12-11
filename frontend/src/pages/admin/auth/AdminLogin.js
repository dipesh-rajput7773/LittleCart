import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await LoginAdmin(payload);
      localStorage.setItem("token", response.token);
      navigate("/admin"); // Navigate to the admin dashboard after login
    } catch (err) {
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
        backgroundColor: "#f4f6f9", // Light background for the page
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
          <Grid container spacing={3}>
            {/* Email Field */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Error Message */}
            {error && (
              <Grid item xs={12}>
                <Typography color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
            </Grid>

            {/* Register and Forgot Password Links */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Register
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
