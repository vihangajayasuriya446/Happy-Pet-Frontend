import {
  Box,
  Button,
  Typography,
  Card,
  AppBar,
  Toolbar,
  IconButton,
  styled,
  CardMedia,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";

// Define the Pet interface
export interface Pet {
  pet_id: number;
  pet_name: string;
  pet_species: string;
  pet_age: string;
  pet_gender: string;
  pet_breed: string;
  pet_adoptionStatus: string;
  pet_photo: File | string | null;
  pet_description?: string;
  image_url?: string; // This is what we want to load
  created_at?: string;
  status: "Pending" | "Approved" | "Rejected" | "Available" | "Adopted";
  isNew?: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);

  // Fetch pets from the backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/pets/available");
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();

        // Transform data to match the Pet interface
        const transformedPets: Pet[] = data.map((pet: any) => ({
          pet_id: pet.pet_id,
          pet_name: pet.pet_name,
          pet_species: pet.pet_species,
          pet_age: pet.pet_age,
          pet_gender: pet.pet_gender,
          pet_breed: pet.pet_breed,
          pet_adoptionStatus: pet.pet_adoptionStatus,
          pet_photo: pet.pet_photo,
          image_url: pet.image_url ? `http://localhost:8080${pet.image_url}` : "/images/default-pet-image.png", // Fallback for missing image_url
          status: pet.status,
        }));

        setPets(transformedPets.slice(0, 3)); // Only take the first 3 pets
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const FullHeightBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh", // Ensure the box takes up at least the full viewport height
    backgroundColor: "grey.100",
  });

  const FullWidthBackgroundImage = styled(Box)({
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1, // Allow the background image to grow and fill available space
    "& img": {
      width: "100%",
      height: "100%", // Make the image fill the container
      objectFit: "cover",
    },
  });

  return (
    <FullHeightBox>
      {/* Navigation Bar */}
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
          <Button color="inherit">Sign Up</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "white",
          textAlign: "center",
          py: 4,
          width: "100%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          position: "relative", // Add this to position the buttons absolutely within the banner
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          "Bringing Joy, One Paw at a Time – Where Happy Pets Meet Loving Homes!"
        </Typography>
        {/* Sign Up and Login Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "8px",
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
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Background Image */}
      <FullWidthBackgroundImage>
        <img src="/src/assets/backgroundimghome.png" alt="Background" />

        {/* Three Service Cards */}
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
          {/* Buy a Pet */}
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
                src="/src/assets/buy-pet.png"
                alt="Buy Pet Icon"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6">Buy a Pet</Typography>
          </Card>

          {/* Adopt a Pet */}
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

          {/* Matchmaking */}
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

      {/* Explore Services Button */}
      <Button variant="contained" color="warning" sx={{ mt: 4, px: 4, py: 1, borderRadius: "20px" }}>
        Explore our Services
      </Button>

      {/* Admin Dashboard Button */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2, px: 4, py: 1, borderRadius: "20px" }}
        onClick={() => handleCardClick("/dashboard")}
      >
        Admin Dashboard
      </Button>

      {/* Three More Pets Section */}
      <Box sx={{ mt: 8, px: { xs: 2, md: 4 }, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
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
          {/* Display only 3 pets */}
          {pets.map((pet) => (
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
                image={pet.image_url || "/src/assets/default-pet-image.png"} // Fallback for missing image_url
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
            onClick={() => handleCardClick("/adopt")}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333", mb: 2 }}>
                See More Pets
              </Typography>
              <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
                Explore more pets available for adoption.
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
    </FullHeightBox>
  );
};

export default HomePage;