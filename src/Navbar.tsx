// CHANGES - Imported cart icon and drawer to navbar . now cart can be obened through navbar
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
  Popover,
  Button,
  Avatar,
  CircularProgress,
  Badge
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoImg from './assets/logo512.png'; // CHANGES - Import logo image
import { useCart } from "./contexts/CartContext"; // CHANGES - Import cart context
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Cart from "./components/Cart"; 


interface UserDetails {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [signupLoading, setSignupLoading] = useState(false); // Separate loading state for Sign Up
  const [loginLoading, setLoginLoading] = useState(false); // Separate loading state for Login
  const [navigationLoading, setNavigationLoading] = useState(false); // Loading state for navigation
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNavigation = (path: string) => {
    setNavigationLoading(true);
    setTimeout(() => {
      navigate(path);
      setNavigationLoading(false);
    }, 500);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
};

  const handleAccountClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setNavigationLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
      setNavigationLoading(false);
    }, 2000);
  };

  const handleSignup = () => {
    setSignupLoading(true); // Set loading state for Sign Up
    setTimeout(() => {
      navigate("/signup");
      setSignupLoading(false); // Reset loading state after navigation
    }, 2000);
  };

  const handleLogin = () => {
    setLoginLoading(true); // Set loading state for Login
    setTimeout(() => {
      navigate("/login");
      setLoginLoading(false); // Reset loading state after navigation
    }, 2000);
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
    <Cart open={cartOpen} onClose={toggleCart} />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(248, 249, 250, 0.9)", // Soft gray background
          backdropFilter: "blur(10px)", // Glass morphism effect
          WebkitBackdropFilter: "blur(10px)", // Safari support
          color: "#333333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          px: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={logoImg} // CHANGES - Use imported logo image instead of using path
            alt="HappyPet Logo"
            sx={{ height: 100, width: 100, mr: 2 }}
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
            &nbsp;
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4, // Standardized gap between navigation links
              mr: 4, // Margin to separate from account icon
            }}
          >
            {/* Home */}
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#333333",
                position: "relative",
                "&:hover": {
                  color: "#007BFF",
                  transition: "color 0.3s ease",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#007BFF",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
              onClick={() => handleNavigation("/")} // Hardcoded path for Home
            >
              Home
            </Typography>

            {/* Services */}
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#333333",
                position: "relative",
                "&:hover": {
                  color: "#007BFF",
                  transition: "color 0.3s ease",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#007BFF",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
              onClick={() => handleNavigation("/aboutus")} // Hardcoded path for Services
            >
              About Us
            </Typography>

            {/* About Us */}
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#333333",
                position: "relative",
                "&:hover": {
                  color: "#007BFF",
                  transition: "color 0.3s ease",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#007BFF",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
              onClick={() => handleNavigation("/terms")} // Hardcoded path for About Us
            >
              Terms
            </Typography>

            {/* Contact Us */}
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#333333",
                position: "relative",
                "&:hover": {
                  color: "#007BFF",
                  transition: "color 0.3s ease",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#007BFF",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
              onClick={() => handleNavigation("/contactus")} // Hardcoded path for Contact Us
            >
              Contact Us
            </Typography>
          </Box>
          <IconButton
              onClick={toggleCart}
              // sx={{
              //     position: 'absolute',
              //     right: { xs: -70, sm: -70, md: -70 },
              //     top: { xs: 20, md: 15 },
              //     transform: 'translateY(-50%)',
              //     bgcolor: 'white',
              //     boxShadow: 3,
              //     '&:hover': {
              //         bgcolor: '#f5f5f5',
              //     },
              // }}
            >
              <Badge
                  badgeContent={itemCount}
                  color="error"
                  sx={{
                      '& .MuiBadge-badge': {
                          fontSize: '0.7rem',
                          height: '20px',
                          minWidth: '20px',
                          padding: '0 4px',
                      }
                  }}
              >
              <ShoppingBagIcon sx={{ color: '#003366' }} />
            </Badge>
          </IconButton>
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
            minWidth: "320px",
            padding: "24px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for glass effect
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white
            backdropFilter: "blur(20px)", // Enhanced glass morphism
            WebkitBackdropFilter: "blur(20px)", // Safari support
            backgroundImage: "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))", // Gradient overlay
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {userDetails ? (
            <>
              {/* Avatar with gradient background */}
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  width: "100px",
                  height: "100px",
                  fontSize: "36px",
                  mb: 3,
                  boxShadow: "0 8px 16px rgba(106, 17, 203, 0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(106, 17, 203, 0.4)",
                  },
                }}
              >
                {userDetails.firstName.charAt(0).toUpperCase()}
              </Avatar>

              {/* User Name */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "800",
                  fontSize: "24px",
                  color: "#1a1a1a",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                }}
              >
                {userDetails.firstName} {userDetails.lastName}
              </Typography>

              {/* User Email */}
              <Typography
                variant="body2"
                sx={{
                  color: "#4a4a4a",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {userDetails.email}
              </Typography>
              
              {/* Sign Out Button */}
              <Button
                variant="contained"
                onClick={handleLogout}
                disabled={navigationLoading}
                sx={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  textTransform: "none",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  boxShadow: "0 6px 12px rgba(255, 65, 108, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff4b2b, #ff416c)",
                    boxShadow: "0 8px 16px rgba(255, 75, 43, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {navigationLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign Out"}
              </Button>
            </>
          ) : (
            <>
              {/* No User Details Message */}
              <Typography
                variant="body1"
                sx={{
                  color: "#4a4a4a",
                  fontSize: "18px",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Please sign in to the system
              </Typography>

              {/* Sign Up Button */}
              <Button
                variant="contained"
                onClick={handleSignup}
                disabled={signupLoading} // Use signupLoading state
                sx={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  textTransform: "none",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  boxShadow: "0 6px 12px rgba(106, 17, 203, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
                    boxShadow: "0 8px 16px rgba(37, 117, 252, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {signupLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign Up"}
              </Button>

              {/* Login Button */}
              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={loginLoading} // Use loginLoading state
                sx={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  textTransform: "none",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                  boxShadow: "0 6px 12px rgba(0, 198, 255, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                    boxShadow: "0 8px 16px rgba(0, 114, 255, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {loginLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
              </Button>
            </>
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
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      toggleDrawer();
      navigate(path);
      setLoading(false);
    }, 2000);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          bgcolor: "rgba(248, 249, 250, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRight: "1px solid rgba(0, 0, 0, 0.1)",
          backgroundImage: "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          gap: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#333333",
            "&:hover": { color: "#007BFF" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#002855",
            fontSize: "1.5rem",
            mb: 2,
          }}
        >
          Menu
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ width: "100%" }}>
            {[
              { name: "Pet Buy", path: "/buy" },
              { name: "Pet Adopt", path: "/adopt" },
              { name: "Matchmaking", path: "/matchmaking" },
            ].map((item) => (
              <ListItem
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  "&:hover": {
                    bgcolor: "rgba(0, 123, 255, 0.1)",
                    transform: "translateX(5px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: "#333333",
                    fontWeight: "500",
                    "&:hover": { color: "#007BFF" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default Navbar;