import { Box, Button, Typography, Card, styled, CardContent, CardMedia, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pets from "./Pets";

type Pet = {
  id: number;
  name: string;
  petType: string;
  price: number;
  breed: string;
  birthYear: string;
  gender: string;
  imageUrl: string;
  purchased: boolean;
};

interface Pets {
  pet_id: number;
  pet_name: string;
  pet_species: string;
  pet_age: number;
  pet_gender: string;
  pet_breed: string;
  pet_adoptionStatus: string;
  pet_photo: string;
  image_url: string;
  status: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const role = localStorage.getItem('role');
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [buyPets, setBuyPets] = useState<Pet[]>([]);
  const [adoptPets, setAdoptPets] = useState<Pets[]>([]);

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
    const fetchAdoptPets = async () => {
      try {
        const response = await fetch("/api/pets/available");
        if (!response.ok) {
          throw new Error("Failed to fetch adoptable pets");
        }
        const data = await response.json();
  
        // Transform data to match the Pets interface
        const transformedAdoptPets: Pets[] = data.map((pet: any) => ({
          pet_id: pet.pet_id, // Use snake_case
          pet_name: pet.pet_name,
          pet_species: pet.pet_species,
          pet_age: pet.pet_age,
          pet_gender: pet.pet_gender,
          pet_breed: pet.pet_breed,
          pet_adoptionStatus: pet.pet_adoptionStatus,
          pet_photo: pet.pet_photo,
          image_url: pet.image_url ? `${pet.image_url}` : "/images/default-pet-image.png", // Fallback for missing image_url
          status: pet.status,
        }));
  
        setAdoptPets(transformedAdoptPets.slice(0, 3)); // Only take the first 3 pets
      } catch (error) {
        console.error("Error fetching adoptable pets:", error);
      }
    };
  
    fetchAdoptPets();
  }, []);

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
      .get<Pet[]>("/api/v1/pets") // Use the Pet type here
      .then((response) => {
        // Filter out purchased pets
        const availablePets = response.data.filter((pet) => !pet.purchased);
        setBuyPets(availablePets);
      })
      .catch((error) => {
        console.error("Error fetching buy pets:", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("/api/v1/getusers")
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

  const article1 = () => {
    navigate('/checklist');
  };
  const article2 = () => {
    navigate('/petagecalculator');
  };
  const article3 = () => {
    navigate('/FAQ');
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
        

{/* Modernized Glass Morphism Text Overlay for 2025 */}
<Box
  component="div"
  sx={{

    textAlign: "center",
    backdropFilter: "blur(30px) saturate(250%)",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Ultra-translucent background
    boxShadow: `
      0 12px 40px rgba(255, 255, 255, 0.15),
      0 -12px 40px rgba(255, 255, 255, 0.1),
      inset 0 0 20px rgba(255, 255, 255, 0.1)
    `, // Multi-layered glowing shadow
    borderRadius: "40px",
    padding: { xs: "32px 24px", sm: "40px 32px", md: "48px 40px" }, // Adjusted padding for better spacing
    border: "1px solid rgba(255, 255, 255, 0.4)", // Enhanced border for depth
    animation: "fadeIn 1s ease-out, float 6s infinite ease-in-out",
    maxWidth: "90%",
    mx: "auto",
    my: 5,
    transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "&:hover": {
      transform: "scale(1.05) rotate(1deg)",
      boxShadow: `
        0 16px 50px rgba(255, 255, 255, 0.25),
        0 -16px 50px rgba(255, 255, 255, 0.2),
        inset 0 0 30px rgba(255, 255, 255, 0.2)
      `, // Enhanced glow and 3D effect on hover
    },
    "@keyframes fadeIn": {
      "from": { opacity: 0, transform: "translateY(30px)" },
      "to": { opacity: 1, transform: "translateY(0)" },
    },
    "@keyframes float": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  }}
>
  <Typography
    variant="h2"
    sx={{
      color: "#0f2179", // Solid, vibrant color
      fontWeight: 800,
      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
      textShadow: "2px 3px 10px rgba(0, 0, 0, 0.4)", // Softer shadow
      lineHeight: 1.2, // Adjusted line height for better readability
      mb: 3,
      WebkitFontSmoothing: "antialiased",
      textRendering: "optimizeLegibility",
      animation: "fadeIn 1s ease-out",
    }}
  >
    Bringing Joy, One Paw at a Time
  </Typography>
  <Typography
    variant="h4"
    sx={{
      color: "rgba(255, 255, 255, 0.95)", // Bright, modern text color
      fontWeight: 600,
      fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.2rem" },
      textShadow: "1px 2px 5px rgba(0, 0, 0, 0.4)", // Subtle shadow
      mt: 3,
      lineHeight: 1.4,
      letterSpacing: "0.03em",
      animation: "fadeIn 1.5s ease-out",
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
                src="/buy-pet.png"
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
                src="/adopt_pet_icon.png"
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
                src="/matchmaking_icon.png"
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
                src="/checklist.png"
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
              onClick={article1}
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
                src="/pet-care.png"
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
              onClick={article2}
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
                src="/help.png"
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
              onClick={article3}
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
  {/* Matchmaking Section */}
  <Typography
    variant="h4"
    fontWeight="bold"
    mb={4}
    sx={{
      color: "#FFFFFF",
      position: "relative",
      zIndex: 2,
      textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    }}
  >
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
    {/* Display up to 3 pets - show empty cards if less than 3 */}
    {[...Array(3)].map((_, index) => {
      const pet = pets[index];
      if (pet) {
        return (
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
        );
      } else {
        return (
          <Card
            key={`empty-${index}`}
            sx={{
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px dashed rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              opacity: 0.7,
            }}
          >
            <CardMedia
              component="div"
              sx={{ 
                height: 200, 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "24px 24px 0 0"
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No pet available
              </Typography>
            </CardMedia>
            <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
              No pet available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Breed:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Age:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Location:</strong> -
              </Typography>
            </CardContent>
          </Card>
        );
      }
    })}

    {/* "More Pets" Card for Matchmaking */}
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
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mb: 2 }}>
          See more pets
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          for Match
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

{/* Adopt a Pet Section */}
<Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 4, px: 2 }}>
  <Typography variant="h4" fontWeight="bold" mb={4} sx={{ color: "#FFFFFF", textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
    Available Pets for Adoption
  </Typography>
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
    gap={4}
    justifyContent="center"
    width="100%"
    maxWidth="1200px"
  >
    {/* Display up to 3 adoptable pets - show empty cards if less than 3 */}
    {[...Array(3)].map((_, index) => {
      const pet = adoptPets[index];
      if (pet) {
        return (
          <Card
            key={pet.pet_id}
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
              image={pet.image_url || "/images/default-pet-image.png"}
              alt={pet.pet_name}
            />
            <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
                {pet.pet_name}
              </Typography>
              {pet.pet_breed && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Breed:</strong> {pet.pet_breed}
                </Typography>
              )}
              {pet.pet_age && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Age:</strong> {pet.pet_age}
                </Typography>
              )}
              {pet.pet_species && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Species:</strong> {pet.pet_species}
                </Typography>
              )}
              {pet.status && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {pet.status}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card
            key={`empty-adopt-${index}`}
            sx={{
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px dashed rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              opacity: 0.7,
            }}
          >
            <CardMedia
              component="div"
              sx={{ 
                height: 200, 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "24px 24px 0 0"
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No pet available
              </Typography>
            </CardMedia>
            <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
              No pet available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Breed:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Age:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Species:</strong> -
              </Typography>
            </CardContent>
          </Card>
        );
      }
    })}

    {/* "More Pets" Card for Adoption */}
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
      onClick={() => handleCardClick("/adopt")}
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
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mb: 2 }}>
          See more pets
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          for Adoption
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
          See More
        </Button>
      </Box>
    </Card>
  </Box>
</Box>

{/* Buy Section */}
<Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 4, px: 2 }}>
  <Typography
    variant="h4"
    fontWeight="bold"
    mb={4}
    sx={{
      color: "#FFFFFF",
      position: "relative",
      zIndex: 2,
      textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    }}
  >
    Available Pets for Buy
  </Typography>

  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
    gap={4}
    justifyContent="center"
    width="100%"
    maxWidth="1200px"
  >
    {/* Display up to 3 buy pets - show empty cards if less than 3 */}
    {[...Array(3)].map((_, index) => {
      const pet = buyPets[index];
      if (pet) {
        return (
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
              image={pet.imageUrl ? `${pet.imageUrl}` : "/src/assets/pet-placeholder.png"}

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
              {pet.birthYear && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Birth Year:</strong> {pet.birthYear}
                </Typography>
              )}
              {pet.gender && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Gender:</strong> {pet.gender}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card
            key={`empty-buy-${index}`}
            sx={{
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px dashed rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              opacity: 0.7,
            }}
          >
            <CardMedia
              component="div"
              sx={{ 
                height: 200, 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "24px 24px 0 0"
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No pet available
              </Typography>
            </CardMedia>
            <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
              No pet available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Breed:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Birth Year:</strong> -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Gender:</strong> -
              </Typography>
            </CardContent>
          </Card>
        );
      }
    })}

    {/* "More Pets" Card for Buy */}
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
      onClick={() => handleNavigation("/buy")}
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
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mb: 2 }}>
          See more pets
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          for Buy
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
                  src="/dog-icon.png"
                  alt="Dog Icon"
                  style={{ width: "60%", height: "60%", objectFit: "contain" }}
                />
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
                Dog Adoption Guide
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
                component="a"
                href="https://www.helpguide.org/wellness/pets/adopting-a-dog-for-the-first-time"
                target="_blank"
                rel="noopener noreferrer"
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
                  src="/cat-icon.png"
                  alt="Cat Icon"
                  style={{ width: "60%", height: "60%", objectFit: "contain" }}
                />
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
                Cat Adoption Guide
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
                component="a"
                href="https://www.kinship.com/cat-lifestyle/step-by-step-guide-to-adopting-a-cat"
                target="_blank"
                rel="noopener noreferrer"
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
                  src="/bird-icon.png"
                  alt="Bird Icon"
                  style={{ width: "60%", height: "60%", objectFit: "contain" }}
                />
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
                Bird Adoption Guide
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
                component="a"
                href="https://nhspca.org/things-to-consider-before-adopting-a-bird/"
                target="_blank"
                rel="noopener noreferrer"
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
