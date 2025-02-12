import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Container, Card, CardContent, CardMedia, Button, Select, MenuItem, FormControl, InputLabel, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, Search as SearchIcon } from "@mui/icons-material";

const pets = [
  { name: "Jessy", gender: "Female", breed: "Rottweiler", birthYear: "2022", location: "Colombo", img: "https://via.placeholder.com/200" },
  { name: "Vonca", gender: "Female", breed: "Rottweiler", birthYear: "2024", location: "Colombo", img: "https://via.placeholder.com/200" },
];

const DrawerMenu = ({ open, toggleDrawer }) => (
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
      },
    }}
  >
    <List>
      {["Home", "Services", "About Us", "Contact Us"].map((text, index) => (
        <ListItem button key={text} onClick={toggleDrawer}  sx={{ cursor: "pointer" }} >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

const MainPage = () => {
  const [petType, setPetType] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <Box sx={{ bgcolor: "#002855", minHeight: "100vh", py: 4 }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar>
          {/* Logo */}
          <Box component="img" src="/logo192.png" alt="HappyPet Logo" sx={{ height: 70, width: 70, mr: 2 }} />
          
          {/* Brand Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002855", flexGrow: 1 }}>
            HappyPet
          </Typography>

          {/* Navigation Links */}
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }}>Home</Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }}>Services</Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }}>About Us</Typography>
          <Typography variant="body1" sx={{ mx: 2, cursor: "pointer" }}>Contact Us</Typography>

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f1f1f1", p: "5px 10px", borderRadius: "20px", mx: 2 }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="search" sx={{ ml: 1 }} />
          </Box>

          {/* User & Menu Icons */}
          <IconButton sx={{ ml: 2 }}><AccountCircle /></IconButton>
          <IconButton onClick={toggleDrawer}><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box display="flex" gap={3}>
          {/* Form Section */}
          <Box flex={1} bgcolor="white" p={4} borderRadius={2} boxShadow={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#002855">Yay, We Love to hear about the Pet you prefer to Match Make!</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Please give your pet details to find a perfect match...</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}><InputLabel>Pet Type</InputLabel>
              <Select value={petType} onChange={(e) => setPetType(e.target.value)}>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Bird">Bird</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}><InputLabel>Age</InputLabel>
              <Select value={age} onChange={(e) => setAge(e.target.value)}>
                <MenuItem value="Puppy">Puppy</MenuItem>
                <MenuItem value="Adult">Adult</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}><InputLabel>Gender</InputLabel>
              <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}><InputLabel>Breed</InputLabel>
              <Select value={breed} onChange={(e) => setBreed(e.target.value)}>
                <MenuItem value="Rottweiler">Rottweiler</MenuItem>
                <MenuItem value="Labrador">Labrador</MenuItem>
                <MenuItem value="Golden Retriever">Golden Retriever</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}><InputLabel>Your Location</InputLabel>
              <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                <MenuItem value="Colombo">Colombo</MenuItem>
                <MenuItem value="Kandy">Kandy</MenuItem>
                <MenuItem value="Galle">Galle</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" fullWidth sx={{ bgcolor: "#002855", color: "white", fontWeight: "bold" }}>Search</Button>
          </Box>
          
          {/* Pet Match Results */}
          <Box flex={2} bgcolor="#002855" p={4} borderRadius={2} color="white">
            <Typography variant="h4" fontWeight="bold" gutterBottom>Pet Match Making</Typography>
            <Typography variant="body2" gutterBottom>Below displays the results of best matches according to provided details by you!</Typography>
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
                    <Typography variant="h6" fontWeight="bold">{pet.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{pet.gender} - {pet.breed}</Typography>
                    <Typography variant="body2" color="textSecondary">Birth {pet.birthYear} - {pet.location}</Typography>
                    <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#002855", color: "white" }}>Contact Owner</Button>
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

