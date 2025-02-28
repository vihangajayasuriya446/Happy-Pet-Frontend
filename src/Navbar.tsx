import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (path: string) => { // Corrected: use lowercase 'string'
    navigate(path);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar>
          {/* Logo */}
          <Box component="img" src="./src/assets/logo512.png" alt="HappyPet Logo" sx={{ height: 70, width: 70, mr: 2 }} />

          {/* Brand Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002855", flexGrow: 1 }}>
            HappyPet
          </Typography>

          {/* Navigation Links */}
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }} onClick={() => handleNavigation("/")}>
            Home
          </Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }} onClick={() => handleNavigation("/services")}>
            Services
          </Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }} onClick={() => handleNavigation("/aboutus")}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }} onClick={() => handleNavigation("/contactus")}>
            Contact Us
          </Typography>

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f1f1f1", p: "5px 10px", borderRadius: "20px", mx: 2 }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Search" sx={{ ml: 1 }} />
          </Box>

          {/* User & Menu Icons */}
          <IconButton sx={{ ml: 2 }}><AccountCircle /></IconButton>
          <IconButton onClick={toggleDrawer}><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

interface DrawerMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerMenu = ({ open, toggleDrawer }: DrawerMenuProps) => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => { // Corrected: use lowercase 'string'
    toggleDrawer();
    navigate(path);
  };
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
        <ListItem key={"Home"} onClick={() => handleNavigation("/home")} sx={{ cursor: "pointer" }}>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem key={"Services"} onClick={() => handleNavigation("/services")} sx={{ cursor: "pointer" }}>
          <ListItemText primary={"Services"} />
        </ListItem>
        <ListItem key={"About Us"} onClick={() => handleNavigation("/aboutus")} sx={{ cursor: "pointer" }}>
          <ListItemText primary={"About Us"} />
        </ListItem>
        <ListItem key={"Contact Us"} onClick={() => handleNavigation("/contactus")} sx={{ cursor: "pointer" }}>
          <ListItemText primary={"Contact Us"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;