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
  ListItemButton,
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

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinkStyles = {
    mx: 2,
    cursor: "pointer",
    textDecoration: "none",
    color: "primary.main",
    fontWeight: "normal",
    "&:hover": {
      textDecoration: "underline",
      color: "primary.main",
      fontWeight: "bold",
    },
    "&.active": {
      textDecoration: "underline",
      color: "primary.main",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#fff", color: "primary.main", px: 2 }}
      >
        <Toolbar>
          {/* Logo and Title Container */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box
              component="img"
              src="src\assets\HappyPet.png"
              alt="HappyPet Logo"
              sx={{ height: 50, width: 50 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                ml: 2
              }}
            >
              HappyPet
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body1" component={NavLink} to="/" sx={navLinkStyles}>
            Home
          </Typography>
          <Typography variant="body1" component={NavLink} to="/services" sx={navLinkStyles}>
            Services
          </Typography>
          <Typography variant="body1" component={NavLink} to="/about" sx={navLinkStyles}>
            About Us
          </Typography>
          <Typography variant="body1" component={NavLink} to="/contact" sx={navLinkStyles}>
            Contact Us
          </Typography>

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

          <IconButton sx={{ ml: 2 }}>
            <AccountCircle />
          </IconButton>

          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

interface DrawerMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, toggleDrawer }) => {
  const navItems = ['Home', 'Services', 'About', 'Contact'];
  const navPaths = ['/', '/services', '/about', '/contact'];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {navItems.map((text, index) => (
          <ListItemButton
            key={text}
            onClick={toggleDrawer}
            component={NavLink}
            to={navPaths[index]}
            sx={{
              textDecoration: 'none',
              color: '#000',
              '&.active': {
                color: "primary.main",
                fontWeight: 'bold',
              },
            }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
