import { Box, Button, Typography, Card, AppBar, Toolbar, IconButton, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const role = localStorage.getItem('role');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleCardClick = (path: string) => {
    if (!token) {
      alert("Please log in or sign up to access this feature.");
      return;
    }
    navigate(path);
    window.scrollTo(0, 0);
  };

  const FullHeightBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "grey.100",
  });

  const FullWidthBackgroundImage = styled(Box)({
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  });

  return (
    <FullHeightBox>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HappyPet
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "white",
          textAlign: "center",
          py: 4,
          width: "100%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          "Bringing Joy, One Paw at a Time – Where Happy Pets Meet Loving Homes!"
        </Typography>
        {/* Sign Up and Login Buttons */}
        {!token && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "8px 24px",
                fontWeight: "bold",
                backgroundColor: "#ff4081",
                "&:hover": {
                  backgroundColor: "#e91e63",
                },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "8px 24px",
                fontWeight: "bold",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>

      <FullWidthBackgroundImage>
        <img src="/src/assets/backgroundimghome.png" alt="Background" />
        <Box
          component="div"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 4,
          }}
        >
          <Card
            sx={{
              width: 180,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("/buy")}
          >
            <Box sx={{ width: 80, height: 80, mb: 2 }}>
              <img
                src="/src/assets/buy_pet_icon.png"
                alt="Buy Pet Icon"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6">Buy a Pet</Typography>
          </Card>
          <Card
            sx={{
              width: 180,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("/adopt")}
          >
            <Box sx={{ width: 80, height: 80, mb: 2 }}>
              <img
                src="/src/assets/adopt_pet_icon.png"
                alt="Adopt Pet Icon"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6">Adopt a Pet</Typography>
          </Card>
          <Card
            sx={{
              width: 180,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("/matchmaking")}
          >
            <Box sx={{ width: 80, height: 80, mb: 2 }}>
              <img
                src="/src/assets/matchmaking_icon.png"
                alt="Matchmaking Icon"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6">Matchmaking</Typography>
          </Card>
        </Box>
      </FullWidthBackgroundImage>

      <Button
        variant="contained"
        color="warning"
        sx={{ mt: 4, px: 4, py: 1, borderRadius: "20px" }}
        onClick={() => {
          if (!token) {
            alert("Please log in or sign up to access this feature.");
            return;
          }
          // Add logic for exploring services
        }}
      >
        Explore our Services
      </Button>

      {role === 'ADMIN' && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, px: 4, py: 1, borderRadius: "20px" }}
          onClick={() => handleNavigation("/admindb")}
        >
          Admin Dashboard
        </Button>
      )}
    </FullHeightBox>
  );
};

export default HomePage;