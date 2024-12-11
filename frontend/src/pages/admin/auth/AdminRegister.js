import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid2,
  Container,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateAdmin } from "../../../services/api";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      };

      const response = await CreateAdmin(payload);
      localStorage.setItem("token", response.token);
      navigate("/admin");
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
        backgroundColor: "#f4f6f9",
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
          Admin Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            {/* Name Field */}
            <Grid2 item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid2>

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

            {/* Confirm Password Field */}
            <Grid2 item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={formData.confirmPassword}
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
                Register
              </Button>
            </Grid2>

            {/* Divider */}
            <Grid2 item xs={12}>
              <Divider sx={{ marginY: 2 }} />
            </Grid2>

            {/* Login and Forgot Password Links */}
            <Grid2 item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Login
                </Link>
              </Typography>
              {/* <Typography variant="body2" sx={{ marginTop: 1 }}>
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
              </Typography> */}
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminRegister;
