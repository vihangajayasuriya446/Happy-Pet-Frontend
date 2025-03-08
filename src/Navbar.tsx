import { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Popover,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface UserDetails {
  email: string;
  role: string;
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleAccountClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const open = Boolean(anchorEl);
  const id = open ? "account-popover" : undefined;

  const token = localStorage.getItem("token");
  let userDetails: UserDetails | null = null;

  if (token) {
    try {
      const decodedToken = jwtDecode<any>(token);
      userDetails = {
        email: decodedToken.sub,
        role: decodedToken.role,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar>
          <Box
            component="img"
            src="./src/assets/logo512.png"
            alt="HappyPet Logo"
            sx={{ height: 70, width: 70, mr: 2 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#002855", flexGrow: 1 }}
          >
            HappyPet
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            onClick={() => handleNavigation("/services")}
          >
            Services
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            onClick={() => handleNavigation("/aboutus")}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, cursor: "pointer" }}
            onClick={() => handleNavigation("/contactus")}
          >
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
            <InputBase placeholder="Search" sx={{ ml: 1 }} />
          </Box>
          <IconButton sx={{ ml: 2 }} onClick={handleAccountClick}>
            <AccountCircle />
          </IconButton>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userDetails ? (
            <>
              <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
                {userDetails.email.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1">Email: {userDetails.email}</Typography>
              <Typography variant="body1">Role: {userDetails.role}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Typography variant="body1">No user details available</Typography>
          )}
        </Box>
      </Popover>

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
  const handleNavigation = (path: string) => {
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
        <ListItem
          key={"Home"}
          onClick={() => handleNavigation("/")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          key={"Services"}
          onClick={() => handleNavigation("/services")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary={"Services"} />
        </ListItem>
        <ListItem
          key={"About Us"}
          onClick={() => handleNavigation("/aboutus")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary={"About Us"} />
        </ListItem>
        <ListItem
          key={"Contact Us"}
          onClick={() => handleNavigation("/contactus")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary={"Contact Us"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;