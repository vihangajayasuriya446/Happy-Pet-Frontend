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
  Badge,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoImg from './assets/logo512.png';
import { useCart } from "./contexts/CartContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Cart from "./components/Cart"; 

interface UserDetails {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [navigationLoading, setNavigationLoading] = useState(false);
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
    }, 300); // Reduced from 500ms to 300ms
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
    }, 300); // Reduced from 2000ms to 300ms
  };

  const handleSignup = () => {
    setSignupLoading(true);
    setTimeout(() => {
      navigate("/signup");
      setSignupLoading(false);
    }, 300); // Reduced from 2000ms to 300ms
  };

  const handleLogin = () => {
    setLoginLoading(true);
    setTimeout(() => {
      navigate("/login");
      setLoginLoading(false);
    }, 300); // Reduced from 2000ms to 300ms
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
          bgcolor: "rgba(248, 249, 250, 0.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "#333333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          px: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={logoImg}
              alt="HappyPet Logo"
              sx={{ height: isMobile ? 60 : 100, width: isMobile ? 60 : 100, mr: 2 }}
            />
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                mr: 4,
              }}
            >
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
                onClick={() => handleNavigation("/")}
              >
                Home
              </Typography>

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
                onClick={() => handleNavigation("/aboutus")}
              >
                About Us
              </Typography>

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
                onClick={() => handleNavigation("/terms")}
              >
                Terms
              </Typography>

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
                onClick={() => handleNavigation("/contactus")}
              >
                Contact Us
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center">
            <IconButton onClick={toggleCart}>
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

            <IconButton sx={{ ml: isMobile ? 1 : 2 }} onClick={handleAccountClick}>
              {userDetails ? (
                <Avatar
                  sx={{
                    bgcolor: "#007BFF",
                    width: isMobile ? 25 : 30,
                    height: isMobile ? 25 : 30,
                    fontSize: isMobile ? 12 : 15,
                    "&:hover": { transform: "scale(1.1)", transition: "transform 0.3s ease" },
                  }}
                >
                  {userDetails.firstName.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <AccountCircle sx={{ fontSize: isMobile ? 30 : 40 }} />
              )}
            </IconButton>

            <IconButton onClick={toggleDrawer}>
              <MenuIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
            </IconButton>
          </Box>
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
            minWidth: isMobile ? "280px" : "320px",
            padding: "24px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            backgroundImage: "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))",
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
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  width: isMobile ? "80px" : "100px",
                  height: isMobile ? "80px" : "100px",
                  fontSize: isMobile ? "28px" : "36px",
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

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "800",
                  fontSize: isMobile ? "20px" : "24px",
                  color: "#1a1a1a",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                }}
              >
                {userDetails.firstName} {userDetails.lastName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#4a4a4a",
                  fontSize: isMobile ? "14px" : "16px",
                  textAlign: "center",
                }}
              >
                {userDetails.email}
              </Typography>
              
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
                  fontSize: isMobile ? "14px" : "16px",
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
              <Typography
                variant="body1"
                sx={{
                  color: "#4a4a4a",
                  fontSize: isMobile ? "16px" : "18px",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Please sign in to the system
              </Typography>

              <Button
                variant="contained"
                onClick={handleSignup}
                disabled={signupLoading}
                sx={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  textTransform: "none",
                  fontSize: isMobile ? "14px" : "16px",
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

              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={loginLoading}
                sx={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  textTransform: "none",
                  fontSize: isMobile ? "14px" : "16px",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      toggleDrawer();
      navigate(path);
      setLoading(false);
    }, 300); // Reduced from 2000ms to 300ms
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: isMobile ? 250 : 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? 250 : 300,
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
            fontSize: isMobile ? "1.2rem" : "1.5rem",
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
          <Box sx={{ width: "100%" }}>
            {/* General Section */}
            <Typography
              variant="subtitle1"
              sx={{
                px: 2,
                pt: 1,
                color: "#666",
                fontWeight: "600",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              General
            </Typography>
            <List sx={{ width: "100%" }}>
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/aboutus" },
                { name: "Terms", path: "/terms" },
                { name: "Contact Us", path: "/contactus" },
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

            {/* Pet Services Section */}
            <Typography
              variant="subtitle1"
              sx={{
                px: 2,
                pt: 2,
                color: "#666",
                fontWeight: "600",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              Pet Services
            </Typography>
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
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Navbar;