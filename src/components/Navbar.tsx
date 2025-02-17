import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar>
          {/* Logo */}
          <Box component="img" src="./src/assets/logo.png" alt="HappyPet Logo" sx={{ height: 70, width: 70, mr: 2 }} />
          
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

const DrawerMenu = ({ open, toggleDrawer }: DrawerMenuProps) => (
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
      {["Home", "Services", "About Us", "Contact Us"].map((text) => (
        <ListItem key={text} onClick={toggleDrawer} sx={{ cursor: "pointer" }}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default Navbar;
