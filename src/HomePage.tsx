import { Box, Button, Typography, Card, styled, CardContent, CardMedia, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const role = localStorage.getItem('role');
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/getusers")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
      });
  }, []);

  useEffect(() => {
    // Check if the user just signed up
    const justSignedUp = localStorage.getItem('justSignedUp');
    if (justSignedUp === 'true') {
      setSnackbarMessage(role === 'ADMIN' ? 'ADMIN Logged in' : 
        'User Logged in');
      setSnackbarOpen(true);
      localStorage.removeItem('justSignedUp'); // Clear the flag
    }
  }, [role]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      setLoading(false);
    }, 1000);
  };

  const handleCardClick = (path: string) => {
    if (!token) {
      alert("Please log in or sign up to access this feature.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      setLoading(false);
    }, 1000);
  };

  const FullHeightBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "grey.100",
  });

  return (
    <FullHeightBox>
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} sx={{ color: "#002855" }} />
        </Box>
      )}

      {/* Snackbar for showing signup success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Main Content Container */}
      <Box
        component="div"
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: 2,
          mt: 8,
        }}
      >
        {/* Modernized Text Overlay */}
        <Box
          component="div"
          sx={{
            textAlign: "center",
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.6)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            borderRadius: "32px",
            padding: { xs: 4, sm: 5, md: 6 },
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation: "fadeIn 1s ease-out",
            maxWidth: "85%",
            mx: "auto",
            my: 5,
            transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#667eea",
              fontWeight: 700,
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem" },
              textShadow: "2px 3px 10px rgba(0, 0, 0, 0.7)",
              lineHeight: 1.1,
              mb: 3,
              WebkitFontSmoothing: "antialiased",
              textRendering: "optimizeLegibility",
              animation: "fadeIn 1s ease-out",
              "@keyframes fadeIn": {
                "from": { opacity: 0, transform: "translateY(30px)" },
                "to": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Bringing Joy, One Paw at a Time
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "rgba(220, 220, 220, 0.9)",
              fontWeight: 500,
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
              textShadow: "1px 2px 5px rgba(0, 0, 0, 0.6)",
              mt: 3,
              lineHeight: 1.4,
              letterSpacing: "0.02em",
            }}
          >
            Where Happy Pets Meet Loving Homes!
          </Typography>
        </Box>

        {/* Cards Container */}
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Buy a Pet Card */}
          <Card
            sx={{
              width: 240,
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(16px) saturate(180%)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              },
              cursor: "pointer",
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => handleCardClick("/buy")}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                boxShadow: "0 4px 12px rgba(255, 154, 158, 0.3)",
              }}
            >
              <img
                src="/src/assets/buy-pet.png"
                alt="Buy Pet Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" align="center" sx={{ color: "text.primary" }}>
              Buy a Pet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Find your perfect pet to bring home.
            </Typography>
          </Card>

          {/* Adopt a Pet Card */}
          <Card
            sx={{
              width: 240,
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(16px) saturate(180%)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              },
              cursor: "pointer",
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => handleCardClick("/adopt")}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                boxShadow: "0 4px 12px rgba(161, 196, 253, 0.3)",
              }}
            >
              <img
                src="/src/assets/adopt_pet_icon.png"
                alt="Adopt Pet Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" align="center" sx={{ color: "text.primary" }}>
              Adopt a Pet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Give a loving home to a pet in need.
            </Typography>
          </Card>

          {/* Matchmaking Card */}
          <Card
            sx={{
              width: 240,
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(16px) saturate(180%)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              },
              cursor: "pointer",
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => handleCardClick("/matchmaking")}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                boxShadow: "0 4px 12px rgba(255, 236, 210, 0.3)",
              }}
            >
              <img
                src="/src/assets/matchmaking_icon.png"
                alt="Matchmaking Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" align="center" sx={{ color: "text.primary" }}>
              Matchmaking
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Find the perfect match for your lifestyle.
            </Typography>
          </Card>
        </Box>
      </Box>

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

      <Box sx={{ mt: 8, px: { xs: 2, md: 4 }, textAlign: "center" }}>
        <Typography variant="h3"
        fontWeight="bold"
        mb={4}
        sx={{
          color: "#FFFFFF", // Light text for contrast
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Subtle glow effect
        }}>
          Planning to Adopt a Pet?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 4,
            justifyContent: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Checklist Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/checklist.png"
                alt="Checklist Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Checklist for New Pet Lovers
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Make the pet adoption, pet buy, and pet matchmaking transition as smooth as possible.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Card>

          {/* Pet Age Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 193, 7, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/pet-care.png"
                alt="Pet Care Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              How Old Are Pets in Human Years?
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Learn to translate pet years to human years just for fun, and vice versa.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Card>

          {/* FAQ Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(156, 39, 176, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/help.png"
                alt="FAQ Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Pet Adoption, Buy, and Matchmaking FAQs
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Get answers to all the questions you haven't thought of for your adoption.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Card>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 4, px: 2 }}>
        <Typography variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{
          color: "#FFFFFF", // Light text for contrast
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Subtle glow effect
        }}>
          Available Pets for Matchmaking
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={4}
          justifyContent="center"
          width="100%"
          maxWidth="1200px"
        >
          {/* Display only 3 pets */}
          {pets.slice(0, 3).map((pet) => (
            <Card
              key={pet.id}
              sx={{
                borderRadius: "24px",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                },
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 200, width: "100%", objectFit: "cover", borderRadius: "24px 24px 0 0" }}
                image={`data:image/jpeg;base64,${pet.photo}`}
                alt={pet.name}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
                  {pet.name}
                </Typography>
                {pet.breed && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Breed:</strong> {pet.breed}
                  </Typography>
                )}
                {pet.age && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Age:</strong> {pet.age}
                  </Typography>
                )}
                {pet.location && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {pet.location}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}

          {/* "More Pets" Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 4,
              textAlign: "center",
              maxWidth: "400px",
              margin: "auto",
            }}
            onClick={() => handleNavigation("/matchmaking")}
          >
            <Box sx={{ p: 3 }}>
              <FavoriteBorderIcon
                sx={{
                  fontSize: 80,
                  mb: 3,
                  color: "primary.main",
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#333", mb: 2 }}
              >
                {pets.length - 3} more pets
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", mb: 3 }}
              >
                on HappyPet
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "primary.main",
                  borderColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Meet Them
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Additional Content Section */}
      <Box sx={{ mt: 8, px: { xs: 2, md: 4 }, textAlign: "center" }}>
        <Typography variant="h3"
        fontWeight="bold"
        mb={4}
        sx={{
          color: "#FFFFFF", // Light text for contrast
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Subtle glow effect
        }}>
          Explore More About Pets
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 4,
            justifyContent: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Dog Adoption Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/dog-icon.png"
                alt="Dog Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Dog Adoption Articles
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Learn more about caring for your new dog.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              READ MORE
            </Button>
          </Card>

          {/* Cat Adoption Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 193, 7, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/cat-icon.png"
                alt="Cat Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Cat Adoption Articles
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Helpful insights on what to expect.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              READ MORE
            </Button>
          </Card>

          {/* Bird Adoption Card */}
          <Card
            sx={{
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(156, 39, 176, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/src/assets/bird-icon.png"
                alt="Bird Icon"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Bird Adoption Articles
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Discover how to care for your new bird.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              READ MORE
            </Button>
          </Card>
        </Box>
      </Box>
    </FullHeightBox>
  );
};

export default HomePage;