import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Drawer,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  age: string;
  price: number;
  photo: string;
  status: string;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const PetShowroom: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [cart, setCart] = useState<Pet[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [petType, setPetType] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Pet[]>(`${API_BASE_URL}/getallstores`);
        const availablePets = response.data.filter((pet) => pet.status === 'available');
        setPets(availablePets);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleAddToCart = (pet: Pet) => {
    setCart([...cart, pet]);
  };

  const handleRemoveFromCart = (petId: number) => {
    setCart(cart.filter((item) => item.id !== petId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const petIds = cart.map((pet) => pet.id);
    const totalPrice = calculateTotalPrice();
    navigate('/buyer-form', { state: { petIds, totalPrice } });
  };

  const handlePetTypeChange = (event: SelectChangeEvent<string>) => {
    setPetType(event.target.value);
  };

  const filteredPets = petType === 'all' ? pets : pets.filter((pet) => pet.type.toLowerCase() === petType);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#003366', fontFamily: '"Nunito Sans", sans-serif' }}>
      {/* Space above the AppBar */}
      <Box sx={{ height: '40px' }} />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0)',
          marginLeft: 'auto',
          boxShadow: 'none',
          width: '80%',
          mx: 'auto',
          mt: 10,
          py: 1,
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpenCart(true)} sx={{ color: 'white', marginLeft: 'auto' }}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Separate Heading for Pet Store */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            fontFamily: '"Nunito", sans-serif',
          }}
        >
          Pet Store
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ pt: 4, pb: 3, px: 3 }}>
        {/* Filter Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <FormControl
            size="small"
            sx={{
              minWidth: 150,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            }}
          >
            <Select
              value={petType}
              onChange={handlePetTypeChange}
              displayEmpty
              sx={{ color: '#003366', fontWeight: 600 }}
            >
              <MenuItem value="all">All Pets</MenuItem>
              <MenuItem value="dog">Dogs</MenuItem>
              <MenuItem value="cat">Cats</MenuItem>
              <MenuItem value="bird">Birds</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Pet Grid */}
        <Grid container spacing={3} justifyContent="center">
          {isLoading ? (
            <Grid item xs={12} textAlign="center">
              <CircularProgress sx={{ color: 'white' }} />
            </Grid>
          ) : filteredPets.length === 0 ? (
            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" sx={{ color: 'white' }}>
                No pets available.
              </Typography>
            </Grid>
          ) : (
            filteredPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      '& .add-to-cart-icon': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Card Media (Pet Photo) */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={pet.photo ? `data:image/jpeg;base64,${pet.photo}` : 'placeholder-image.jpg'}
                      alt={pet.name}
                      sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                    />
                    {/* Add to Cart Icon on Hover */}
                    <IconButton
                      className="add-to-cart-icon"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      onClick={() => handleAddToCart(pet)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Box>

                  {/* Card Content */}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003366' }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {pet.type} - {pet.breed}
                    </Typography>
                    <Typography variant="body2">Age: {pet.age}</Typography>
                    <Typography variant="body2">Gender: {pet.gender}</Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${pet.price}
                    </Typography>

                    {/* Add to Cart Button (Always Visible) */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(pet)}
                      sx={{
                        mt: 2,
                        bgcolor: '#003366',
                        color: 'white',
                        '&:hover': { bgcolor: '#002855' },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <Box sx={{ width: 350, padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body2">Your cart is empty.</Typography>
          ) : (
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
                  <ListItemIcon>
                    <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
              <hr />
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1">${calculateTotalPrice()}</Typography>
              </ListItem>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: '#003366', color: 'white', '&:hover': { bgcolor: '#002855' } }}
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Checkout
              </Button>
            </List>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default PetShowroom;