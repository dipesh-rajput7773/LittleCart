import React from "react";
import { Box, Grid2, Paper, Typography, Card, CardContent } from "@mui/material";


function AdminDashboardHome() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Component */}
      {/* <SidebarWithToggle /> */}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: "24px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "24px" }}>
          Welcome to the Admin Dashboard
        </Typography>

        {/* Dashboard Overview Grid2 */}
        <Grid2 container spacing={3}>
          {/* Total Users Card */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Users
                </Typography>
                <Typography variant="h4">1,250</Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Total Orders Card */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Orders
                </Typography>
                <Typography variant="h4">580</Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Total Products Card */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Products
                </Typography>
                <Typography variant="h4">320</Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Total Revenue Card */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Revenue
                </Typography>
                <Typography variant="h4">$12,450</Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>

        {/* Recent Activities Section */}
        <Box sx={{ marginTop: "32px" }}>
          <Typography variant="h5" sx={{ marginBottom: "16px" }}>
            Recent Activities
          </Typography>

          {/* Recent Activities List */}
          <Paper sx={{ padding: "16px" }}>
            <Typography variant="h6" color="text.secondary">
              New Order Received
            </Typography>
            <Typography variant="body2">Order #234 has been placed.</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ marginTop: "16px" }}>
              New Product Added
            </Typography>
            <Typography variant="body2">Product "Smartwatch" has been added to the catalog.</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ marginTop: "16px" }}>
              New User Signup
            </Typography>
            <Typography variant="body2">User "John Doe" signed up for the platform.</Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default AdminDashboardHome;
