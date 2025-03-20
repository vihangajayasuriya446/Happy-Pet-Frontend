import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

interface Pet {
  id: number;
  name: string;
  gender: string;
  breed: string;
  age: string;
  location: string;
  photo: string;
}

const MainPage = () => {
  const [petType, setPetType] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleOwnerForm = (petId: number) => {
    navigate(`/OwnerForm/${petId}`);
  };

  const breeds: { [key: string]: string[] } = {
    Dog: [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Bulldog",
      "Beagle",
      "Poodle",
      "Boxer",
      "Rottweiler",
      "Dachshund",
      "Shih Tzu",
      "Chihuahua",
      "Siberian Husky",
      "Cocker Spaniel",
      "Pug",
      "Doberman Pinscher",
    ],
    Cat: [
      "Persian",
      "Maine Coon",
      "Siamese",
      "Bengal",
      "Ragdoll",
      "Sphynx",
      "Abyssinian",
      "British Shorthair",
      "Scottish Fold",
      "Siberian",
      "Russian Blue",
      "Burmese",
      "Birman",
      "Devon Rex",
      "Oriental Shorthair",
    ],
    Bird: [
      "Budgerigar",
      "Cockatiel",
      "African Grey Parrot",
      "Macaw",
      "Lovebird",
      "Canary",
      "Finch",
      "Conure",
      "Amazon Parrot",
      "Eclectus Parrot",
      "Parakeet",
      "Quaker Parrot",
      "Pionus Parrot",
      "Kea",
      "Cockatoo",
    ],
  };

  const token = localStorage.getItem('token');

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        type: petType,
        age: age,
        gender: gender,
        breed: breed,
        location: location,
      });

      // Simulate a delay to show loading spinner
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `http://localhost:8080/api/v1/getfetchedusers?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data: Pet[] = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError("Failed to fetch pets. Please try again later.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        paddingTop: "15px",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {/* Search Filters Section */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="rgba(255, 255, 255, 0.9)"
              p={4}
              borderRadius={4}
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              sx={{ backdropFilter: "blur(10px)" }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                color="#002855"
              >
                Yay, We Love to hear about the Pet you prefer to Match Make!
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please give your pet details to find a perfect match...
              </Typography>

              {/* Pet Type Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel id="pet-type-label">Pet Type</InputLabel>
                <Select
                  labelId="pet-type-label"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  label="Pet Type"
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                </Select>
              </FormControl>

              {/* Age Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel id="age-label">Age</InputLabel>
                <Select
                  labelId="age-label"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  label="Age"
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Baby">Baby</MenuItem>
                  <MenuItem value="Young">Young</MenuItem>
                  <MenuItem value="Adult">Adult</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>

              {/* Gender Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              {/* Breed Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel id="breed-label">Breed</InputLabel>
                <Select
                  labelId="breed-label"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  label="Breed"
                  disabled={!petType}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">Select</MenuItem>
                  {petType &&
                    breeds[petType]?.map((breedOption) => (
                      <MenuItem key={breedOption} value={breedOption}>
                        {breedOption}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/* Location Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
                <InputLabel id="location-label">Your Location</InputLabel>
                <Select
                  labelId="location-label"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Your Location"
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Ampara">Ampara</MenuItem>
                  <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
                  <MenuItem value="Badulla">Badulla</MenuItem>
                  <MenuItem value="Batticaloa">Batticaloa</MenuItem>
                  <MenuItem value="Colombo">Colombo</MenuItem>
                  <MenuItem value="Galle">Galle</MenuItem>
                  <MenuItem value="Gampaha">Gampaha</MenuItem>
                  <MenuItem value="Hambantota">Hambantota</MenuItem>
                  <MenuItem value="Jaffna">Jaffna</MenuItem>
                  <MenuItem value="Kalutara">Kalutara</MenuItem>
                  <MenuItem value="Kandy">Kandy</MenuItem>
                  <MenuItem value="Kegalle">Kegalle</MenuItem>
                  <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
                  <MenuItem value="Kurunegala">Kurunegala</MenuItem>
                  <MenuItem value="Mannar">Mannar</MenuItem>
                  <MenuItem value="Matale">Matale</MenuItem>
                  <MenuItem value="Matara">Matara</MenuItem>
                  <MenuItem value="Monaragala">Monaragala</MenuItem>
                  <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
                  <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
                  <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
                  <MenuItem value="Puttalam">Puttalam</MenuItem>
                  <MenuItem value="Ratnapura">Ratnapura</MenuItem>
                  <MenuItem value="Trincomalee">Trincomalee</MenuItem>
                  <MenuItem value="Vavuniya">Vavuniya</MenuItem>
                </Select>
              </FormControl>

              {/* Search Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#002855",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  py: 1.5,
                  "&:hover": { bgcolor: "#001f4d" },
                }}
                onClick={fetchPets}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
              </Button>
            </Box>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={8}>
            <Box
              bgcolor="rgba(255, 255, 255, 0.9)"
              p={4}
              borderRadius={4}
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              sx={{ backdropFilter: "blur(10px)" }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom color="#002855">
                Pet Match Making
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Below displays the results of best matches according to provided details by you!
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3} mt={2}>
                  {pets.length > 0 ? (
                    pets.map((pet) => (
                      <Grid item xs={12} sm={6} md={4} key={pet.id}>
                        <Card
                          sx={{
                            borderRadius: 2,
                            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ height: 200, width: "100%", objectFit: "cover" }}
                            image={`data:image/jpeg;base64,${pet.photo}`}
                            alt={pet.name}
                          />
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                              {pet.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {pet.gender} • {pet.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Age: {pet.age}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Location: {pet.location}
                            </Typography>
                            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "#002855", color: "white" }}
                onClick={() => handleOwnerForm(pet.id)} 
              >
                Contact Owner
              </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        No matches found. Try adjusting your search criteria.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainPage;
