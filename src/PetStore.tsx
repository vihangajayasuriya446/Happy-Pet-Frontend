import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
  Box,
} from '@mui/material';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'pending' | 'sold';
  photo: string; // Base64 encoded image
}

const API_BASE_URL = 'http://localhost:8080/api/v1/';

const PetStore: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const [petToUpdate, setPetToUpdate] = useState<Pet | null>(null);
  const navigate = useNavigate();

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newStatus, setNewStatus] = useState<'available' | 'pending' | 'sold'>('available');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get<Pet[]>(`${API_BASE_URL}getallstores`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleAddPet = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('type', newType);
      formData.append('breed', newBreed);
      formData.append('gender', newGender);
      formData.append('age', newAge);
      formData.append('price', newPrice.toString());
      formData.append('status', newStatus);
      if (newPhoto) {
        formData.append('photo', newPhoto);
      }

      await axios.post(`${API_BASE_URL}addstore`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchPets(); // Refresh pet list after adding

      setNewName('');
      setNewType('');
      setNewBreed('');
      setNewGender('');
      setNewAge('');
      setNewPrice(0);
      setNewStatus('available');
      setNewPhoto(null);
      setOpenAddDrawer(false);
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  const handleUpdatePet = async () => {
    try {
      if (!petToUpdate) {
        console.error('No pet selected for update.');
        return;
      }

      const formData = new FormData();
      formData.append('name', newName);
      formData.append('type', newType);
      formData.append('breed', newBreed);
      formData.append('gender', newGender);
      formData.append('age', newAge);
      formData.append('price', newPrice.toString());
      formData.append('status', newStatus);
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      await axios.put(`${API_BASE_URL}updatestore/${petToUpdate.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPets(); // Refresh pet list
      setOpenUpdateDrawer(false);
      setPetToUpdate(null);
      setNewName('');
      setNewType('');
      setNewBreed('');
      setNewGender('');
      setNewAge('');
      setNewPrice(0);
      setNewStatus('available');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}deletestore/${petId}`);
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handleStatusChange = async (petId: number, newStatus: string) => {
    try {
      await axios.put(`${API_BASE_URL}updatestorestatus/${petId}`, { status: newStatus });
      fetchPets();
    } catch (error) {
      console.error('Error updating pet status:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  const handleUpdateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleViewBuyerTableClick = () => {
    navigate('/buyertable');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', padding: '6rem 2rem 2rem 2rem' }}> {/* Increased top padding */}
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/src/assets/pet-cover.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header and Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#fafafa', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Pet Store
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDrawer(true)}
            sx={{ mr: 2 }}
          >
            Add New Pet
          </Button>
          <Button
            variant="contained"
            onClick={handleViewBuyerTableClick}
            sx={{ backgroundColor: 'blue', color: 'white' }}
          >
            View Buyer Table
          </Button>
        </Box>
      </Box>

      {/* Pet Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: 3, borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#679df5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Breed</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#002855' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <img src={`data:image/jpeg;base64,${pet.photo}`} alt={pet.name} style={{ width: 100, height: 100 }} />
                </TableCell>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.type}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>${pet.price}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      value={pet.status}
                      onChange={(e) => handleStatusChange(pet.id, e.target.value)}
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="sold">Sold</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setPetToUpdate(pet);
                      setNewName(pet.name);
                      setNewType(pet.type);
                      setNewBreed(pet.breed);
                      setNewGender(pet.gender);
                      setNewAge(pet.age);
                      setNewPrice(pet.price);
                      setNewStatus(pet.status);
                      setOpenUpdateDrawer(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeletePet(pet.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Pet Drawer */}
      <Drawer anchor="right" open={openAddDrawer} onClose={() => setOpenAddDrawer(false)}>
        <Box sx={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Add New Pet
          </Typography>
          <TextField label="Name" fullWidth value={newName} onChange={(e) => setNewName(e.target.value)} margin="normal" />

          {/* Type Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Bird">Bird</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Breed" fullWidth value={newBreed} onChange={(e) => setNewBreed(e.target.value)} margin="normal" />

          {/* Gender Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Age Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="age-select-label">Age</InputLabel>
            <Select
              labelId="age-select-label"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            >
              <MenuItem value="Baby">Baby</MenuItem>
              <MenuItem value="Young">Young</MenuItem>
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Price"
            fullWidth
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value))}
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as Pet['status'])}
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </Select>
          </FormControl>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleAddPet} sx={{ mt: 2 }}>
            Add Pet
          </Button>
        </Box>
      </Drawer>

      {/* Update Pet Drawer */}
      <Drawer anchor="right" open={openUpdateDrawer} onClose={() => setOpenUpdateDrawer(false)}>
        <Box sx={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Update Pet
          </Typography>
          {petToUpdate && (
            <>
              <TextField label="Name" fullWidth value={newName} onChange={(e) => setNewName(e.target.value)} margin="normal" />

              {/* Type Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                </Select>
              </FormControl>

              <TextField label="Breed" fullWidth value={newBreed} onChange={(e) => setNewBreed(e.target.value)} margin="normal" />

              {/* Gender Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              {/* Age Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="age-select-label">Age</InputLabel>
                <Select
                  labelId="age-select-label"
                  value={newAge}
                  onChange={(e) => setNewAge(e.target.value)}
                >
                  <MenuItem value="Baby">Baby</MenuItem>
                  <MenuItem value="Young">Young</MenuItem>
                  <MenuItem value="Adult">Adult</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Price"
                fullWidth
                value={newPrice}
                onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />

              {/* Status Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Pet['status'])}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                </Select>
              </FormControl>

              <input type="file" accept="image/*" onChange={handleUpdateFileChange} />
              <Button variant="contained" color="primary" onClick={handleUpdatePet} sx={{ mt: 2 }}>
                Update Pet
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default PetStore;