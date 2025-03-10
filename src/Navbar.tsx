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
  firstName: string;
  lastName: string;
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
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
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
          {userDetails ? (
            <Avatar
              sx={{
                bgcolor: "primary.main", // Use primary color for the avatar background
                width: 25, // Adjust size to match the icon
                height: 25,
                fontSize: 15, // Adjust font size for the character
              }}
            >
              {userDetails.firstName.charAt(0).toUpperCase()} {/* Display first character */}
            </Avatar>
          ) : (
            <AccountCircle /> // Default icon when no user is logged in
          )}
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
        PaperProps={{
          style: {
            minWidth: '280px', // Slightly wider for better readability
            padding: '20px', // More padding for a spacious feel
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Softer shadow
            borderRadius: '12px', // More rounded corners
            border: '1px solid #e0e0e0', // Subtle border for definition
            backgroundColor: '#ffffff', // Ensure white background
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: '12px', // Consistent spacing between elements
          }}
        >
          {userDetails ? (
            <>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: '64px', // Larger avatar
                  height: '64px',
                  fontSize: '24px', // Larger font for initials
                  mb: 2, // More space below the avatar
                }}
              >
                {userDetails.firstName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: '600', // Bold for emphasis
                  fontSize: '18px', // Slightly larger font
                  color: '#333333', // Darker text for better readability
                  textAlign: 'center', // Center-aligned text
                }}
              >
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#666666', // Lighter text for less emphasis
                  fontSize: '14px', // Smaller font for secondary info
                  textAlign: 'center',
                }}
              >
                {userDetails.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#666666',
                  fontSize: '14px',
                  textAlign: 'center',
                  mb: 2, // Space above the button
                }}
              >
                Role: {userDetails.role}
              </Typography>
              <Button
              variant="contained"
              color="secondary" // Standard secondary color
              onClick={handleLogout}
              sx={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
                textTransform: 'none',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9c27b0', // Darker shade of secondary color on hover
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Sign Out
            </Button>
            </>
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                fontSize: '16px',
                textAlign: 'center',
              }}
            >
              No user details available
            </Typography>
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