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
  Input,
} from "@mui/material";

const pets = [
  { name: "Jessy", gender: "Female", breed: "Rottweiler", birthYear: "2022", location: "Colombo", img: "https://via.placeholder.com/200" },
  { name: "Vonca", gender: "Female", breed: "Rottweiler", birthYear: "2024", location: "Colombo", img: "https://via.placeholder.com/200" },
];

const MainPage:React.FC = () => {
  const [petType, setPetType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleOwnerForm = () => {
    navigate('/OwnerForm'); 
  };

  return (
    <Box sx={{ bgcolor: "#002855", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box display="flex" gap={3}>
          <Box flex={1} bgcolor="white" p={4} borderRadius={2} boxShadow={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#002855">
              Yay, We Love to hear about the Pet you prefer to Match Make!
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please give your pet details to find a perfect match...
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Pet Type</InputLabel>
              <Select value={petType} onChange={(e) => setPetType(e.target.value)}>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Bird">Bird</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Age</InputLabel>
              <Select value={age} onChange={(e) => setAge(e.target.value)}>
                <MenuItem value="Baby">Baby</MenuItem>
                <MenuItem value="Young">Young</MenuItem>
                <MenuItem value="Adult">Adult</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Gender</InputLabel>
              <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel shrink>Breed</InputLabel>
              <Input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Enter breed"
                sx={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Your Location</InputLabel>
              <Select value={location} onChange={(e) => setLocation(e.target.value)}>
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
            <Button variant="contained" fullWidth sx={{ bgcolor: "#002855", color: "white", fontWeight: "bold" }}>
              Search
            </Button>
          </Box>
          <Box flex={2} bgcolor="#002855" p={4} borderRadius={2} color="white">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Pet Match Making
            </Typography>
            <Typography variant="body2" gutterBottom>
              Below displays the results of best matches according to provided details by you!
            </Typography>
            <Box display="flex" gap={3} flexWrap="wrap" mt={2}>
              {pets.map((pet, index) => (
                <Card key={index} sx={{ borderRadius: 2, flex: "1 1 45%" }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 250, width: "100%", objectFit: "cover" }}
                    image={pet.img}
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
                      Birth {pet.birthYear} - {pet.location}
                    </Typography>
                    <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2, bgcolor: "#002855", color: "white" }}
                onClick={handleOwnerForm} 
              >
                Contact Owner
              </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
