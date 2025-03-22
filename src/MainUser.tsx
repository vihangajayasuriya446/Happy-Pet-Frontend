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
  const navigate = useNavigate();



  const handleOwnerForm = (petId: number) => {
    navigate(`/OwnerForm/${petId}`); // Pass petId in the route
  };

  const breeds: { [key: string]: string[] } = {
    Dog: [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog (English/French)",
    "Beagle",
    "Poodle (Standard, Miniature, Toy)",
    "Boxer",
    "Rottweiler",
    "Dachshund",
    "Shih Tzu",
    "Chihuahua",
    "Siberian Husky",
    "Cocker Spaniel",
    "Pug",
    "Doberman Pinscher",],

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
    "Oriental Shorthair",],

    Bird: [
    "Budgerigar (Budgie)",
    "Cockatiel",
    "African Grey Parrot",
    "Macaw (Blue-and-Gold, Scarlet, etc.)",
    "Lovebird",
    "Canary",
    "Finch (Zebra Finch, Gouldian Finch)",
    "Conure (Sun Conure, Green-cheeked Conure)",
    "Amazon Parrot (Yellow-naped, Blue-fronted)",
    "Eclectus Parrot",
    "Parakeet",
    "Quaker Parrot",
    "Pionus Parrot",
    "Kea",
    "Cockatoo",],
  };

  const fetchPets = async () => {
    try {
      const queryParams = new URLSearchParams({
        type: petType,
        age: age,
        gender: gender,
        breed: breed,
        location: location,
      });

      const response = await fetch(
        `http://localhost:8080/api/v1/getfetchedusers?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
    }
  };

  return (
    <Box sx={{ bgcolor: "#002855", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box bgcolor="white" p={4} borderRadius={2} boxShadow={2}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="#002855">
                Yay, We Love to hear about the Pet you prefer to Match Make!
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please give your pet details to find a perfect match...
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Pet Type</InputLabel>
                <Select value={petType} onChange={(e) => setPetType(e.target.value)}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Age</InputLabel>
                <Select value={age} onChange={(e) => setAge(e.target.value)}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Baby">Baby</MenuItem>
                  <MenuItem value="Young">Young</MenuItem>
                  <MenuItem value="Adult">Adult</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel shrink>Breed</InputLabel>
                <Select
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  disabled={!petType}
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

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Your Location</InputLabel>
                <Select value={location} onChange={(e) => setLocation(e.target.value)}>
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

              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#002855", color: "white", fontWeight: "bold" }}
                onClick={fetchPets}
              >
                Search
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box bgcolor="#002855" p={4} borderRadius={2} color="white">
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Pet Match Making
              </Typography>
              <Typography variant="body2" gutterBottom>
                Below displays the results of best matches according to provided details by you!
              </Typography>
              <Grid container spacing={3} mt={2}>
                {pets.length > 0 ? (
                  pets.map((pet) => (
                    <Grid item xs={12} sm={6} md={4} key={pet.id}>
                      <Card sx={{ borderRadius: 2 }}>
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
                          <Typography variant="body2" color="textSecondary">
                            {pet.gender} - {pet.breed}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Age: {pet.age} - {pet.location}
                          </Typography>
                          <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "#002855", color: "white" }}
                onClick={() => handleOwnerForm(pet.id)} // Pass pet.id here
              >
                Contact Owner
              </Button>
                        </CardContent>
                      </Card></Grid>
                          ))
                        ) : (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="white">
                              No matches found. Try adjusting your search criteria.
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          );
        };

export default MainPage;      