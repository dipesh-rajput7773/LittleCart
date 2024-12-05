import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // For routing

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Toggle the Drawer (Sidebar)
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      {/* AppBar for desktop */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            eCommerce Site
          </Typography>
          
          {/* Desktop Navbar Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit" component={Link} to="/user">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/user/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          </Box>

          {/* Hamburger Menu for mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => toggleDrawer(true)}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText>
              <Link to="/user" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText>
              <Link to="/user/products" style={{ textDecoration: 'none', color: 'black' }}>Products</Link>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText>
              <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>Admin</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
