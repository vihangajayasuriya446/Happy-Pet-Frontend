import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { theme } from "../themes/themes";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: "#fff", color: theme.primaryColor, px: 2 }}>
        <Toolbar>
          {/* Logo */}
          <Box
            component="img"
            src="/logo192.png"
            alt="HappyPet Logo"
            sx={{ height: 70, width: 70, mr: 2 }}
          />

          {/* Brand Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.primaryColor,
              flexGrow: 1,
            }}
          >
            HappyPet
          </Typography>

          {/* Navigation Links */}
          {/* Use NavLink from React Router DOM to navigate to different routes */}
          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            component={NavLink}
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.primaryColor : "inherit",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Home
          </Typography>

          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            component={NavLink}
            to="/services"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.primaryColor : "inherit",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Services
          </Typography>

          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            component={NavLink}
            to="/about"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.primaryColor : "inherit",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            About Us
          </Typography>

          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            component={NavLink}
            to="/contact"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.primaryColor : "inherit",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Contact Us
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              p: "5px 10px",
              borderRadius: "20px",
              mx: 2,
            }}
          >
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Hinted search text" sx={{ ml: 1 }} />
          </Box>

          {/* User & Menu Icons */}
          <IconButton sx={{ ml: 2 }}>
            <AccountCircle />
          </IconButton>

          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

// Drawer Menu Component
const DrawerMenu = ({ open, toggleDrawer }) => {
  const navItems = ["Home", "Services", "About", "Contact"];
  const navPaths = ["/", "/services", "/about", "/contact"];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {navItems.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={toggleDrawer}
            component={NavLink}
            to={navPaths[index]}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
