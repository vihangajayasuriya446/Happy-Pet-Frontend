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
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(248, 249, 250, 0.9)", // Soft gray background
          backdropFilter: "blur(10px)", // Glass morphism effect
          color: "#333333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          px: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src="./src/assets/logo512.png"
            alt="HappyPet Logo"
            sx={{ height: 70, width: 70, mr: 2 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#002855",
              flexGrow: 1,
              fontSize: "1.5rem",
            }}
          >
            HappyPet
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mx: 2,
              cursor: "pointer",
              "&:hover": { color: "#007BFF", transition: "color 0.3s ease" },
            }}
            onClick={() => handleNavigation("/")}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mx: 2,
              cursor: "pointer",
              "&:hover": { color: "#007BFF", transition: "color 0.3s ease" },
            }}
            onClick={() => handleNavigation("/services")}
          >
            Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mx: 2,
              cursor: "pointer",
              "&:hover": { color: "#007BFF", transition: "color 0.3s ease" },
            }}
            onClick={() => handleNavigation("/about")}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mx: 2,
              cursor: "pointer",
              "&:hover": { color: "#007BFF", transition: "color 0.3s ease" },
            }}
            onClick={() => handleNavigation("/contactus")}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(241, 241, 241, 0.8)", // Semi-transparent background
              p: "5px 10px",
              borderRadius: "20px",
              mx: 2,
              "&:hover": { boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" },
            }}
          >
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Search" sx={{ ml: 1 }} />
          </Box>
          <IconButton sx={{ ml: 2 }} onClick={handleAccountClick}>
            {userDetails ? (
              <Avatar
                sx={{
                  bgcolor: "#007BFF",
                  width: 25,
                  height: 25,
                  fontSize: 15,
                  "&:hover": { transform: "scale(1.1)", transition: "transform 0.3s ease" },
                }}
              >
                {userDetails.firstName.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircle />
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
            minWidth: "300px",
            padding: "24px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            border: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
            backgroundColor: "rgba(248, 249, 250, 0.95)", // Soft gray background
            backdropFilter: "blur(10px)", // Glass morphism effect
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {userDetails ? (
            <>
              <Avatar
                sx={{
                  bgcolor: "linear-gradient(135deg, #007BFF, #00BFFF)",
                  width: "80px",
                  height: "80px",
                  fontSize: "32px",
                  mb: 3,
                  boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                }}
              >
                {userDetails.firstName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#333333",
                  textAlign: "center",
                }}
              >
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666666",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {userDetails.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666666",
                  fontSize: "14px",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Role: {userDetails.role}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #9c27b0, #e91e63)",
                  boxShadow: "0 4px 8px rgba(156, 39, 176, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e91e63, #9c27b0)",
                    boxShadow: "0 6px 12px rgba(156, 39, 176, 0.3)",
                    transform: "translateY(-2px)",
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
                color: "#666666",
                fontSize: "16px",
                textAlign: "center",
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
          bgcolor: "rgba(248, 249, 250, 0.95)", // Soft gray background
          backdropFilter: "blur(10px)", // Glass morphism effect
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRight: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
        },
      }}
    >
      <List>
        <ListItem
          key={"Home"}
          onClick={() => handleNavigation("/")}
          sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f1f1f1" } }}
        >
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          key={"Services"}
          onClick={() => handleNavigation("/services")}
          sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f1f1f1" } }}
        >
          <ListItemText primary={"Services"} />
        </ListItem>
        <ListItem
          key={"About Us"}
          onClick={() => handleNavigation("/aboutus")}
          sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f1f1f1" } }}
        >
          <ListItemText primary={"About Us"} />
        </ListItem>
        <ListItem
          key={"Contact Us"}
          onClick={() => handleNavigation("/contactus")}
          sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f1f1f1" } }}
        >
          <ListItemText primary={"Contact Us"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;