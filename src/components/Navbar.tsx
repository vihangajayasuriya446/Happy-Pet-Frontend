import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Drawer, List, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface DrawerMenuProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

interface NavItemProps {
  text: string;
  handleDrawerToggle: () => void;
}

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar>
          {/* Logo */}
          <Box component="img" src="../LOGOnew.png" alt="HappyPet Logo" sx={{ height: 70, width: 70, mr: 2 }} />
          
          {/* Brand Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002855", flexGrow: 1 }}>
            HappyPet
          </Typography>

          {/* Navigation Links */}
          {["Home", "Services", "About Us", "Contact Us"].map((text) => (
            <Typography key={text} variant="body1" sx={{ mx: 2, cursor: "pointer" }}>
              {text}
            </Typography>
          ))}

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f1f1f1", p: "5px 10px", borderRadius: "20px", mx: 2 }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Search" sx={{ ml: 1 }} />
          </Box>

          {/* User & Menu Icons */}
          <IconButton sx={{ ml: 2 }}><AccountCircle /></IconButton>
          <IconButton onClick={handleDrawerToggle}><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <DrawerMenu open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </>
  );
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, handleDrawerToggle }) => (
  <Drawer
    anchor="left"
    open={open}
    onClose={handleDrawerToggle}
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
      {["Home", "Services", "About Us", "Contact Us"].map((text) => (
        <NavItem key={text} text={text} handleDrawerToggle={handleDrawerToggle} />
      ))}
    </List>
  </Drawer>
);

const NavItem: React.FC<NavItemProps> = ({ text, handleDrawerToggle }) => (
  <Box onClick={handleDrawerToggle} sx={{ cursor: "pointer", p: 2 }}>
    <ListItemText primary={text} />
  </Box>
);

export default Navbar;