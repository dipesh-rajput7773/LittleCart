import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice"; // Import your logout action
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Navbar = () => {
  const [open, setOpen] = useState(true); // State to toggle sidebar
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check if user is logged in
  const dispatch = useDispatch(); // Get the dispatch function for redux actions

  // Toggle sidebar visibility
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    // Optionally, clear session or token data here if needed
  };

  return (
    <div>
      {open ? (
        ""
      ) : (
        <AppBar position="sticky" sx={{ zIndex: 1301,backgroundColor:"transparent",color:"#000",boxShadow:"none" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? 250 : 60,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: open ? 250 : 60,
            transition: "width 0.3s ease",
          },
        }}
      >
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 8px", 
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />
        <List>
          {/* List of links in the sidebar */}
          <ListItem button component={Link} to="/admin">
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to="/admin/products">
            <ListItemText primary="Products" />
          </ListItem>

          <ListItem button component={Link} to="/admin/orders">
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem button component={Link} to="/admin/users">
            <ListItemText primary="Users" />
          </ListItem>

          <ListItem button component={Link} to="/admin/settings">
            <ListItemText primary="Settings" />
          </ListItem>

          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default", // Use string directly instead of theme.palette
          padding: "16px",
        }}
      >
        {/* Additional content goes here */}
      </Box>
    </div>
  );
};

export default Navbar;
