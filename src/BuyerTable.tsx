import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
  Modal,
  IconButton,
  Tooltip,
} from '@mui/material';
import Sidebar from './Sidebar';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon

interface PetStore {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  age: string;
  price: number;
  status: string;
  photo: string; // Base64 encoded image
}

interface Buyer {
  id: number;
  buyerName: string;
  contactNumber: string;
  deliveryMethod: string;
  petId: number;
}

const BuyerTable: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [petStore, setPetStore] = useState<PetStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openPetModal, setOpenPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetStore | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/getbuyers');
        if (!response.ok) {
          throw new Error('Failed to fetch buyers');
        }
        const data = await response.json();
        setBuyers(data);
      } catch (error) {
        console.error('Error fetching buyers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPetStore = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/getallstores');
        if (!response.ok) {
          throw new Error('Failed to fetch pet store data');
        }
        const data = await response.json();
        setPetStore(data);
      } catch (error) {
        console.error('Error fetching pet store data:', error);
      }
    };

    fetchBuyers();
    fetchPetStore();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deletebuyer/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete buyer');
      }

      // Update the buyers state after successful deletion
      setBuyers(buyers.filter(buyer => buyer.id !== id));
    } catch (error) {
      console.error('Error deleting buyer:', error);
    }
  };

  const handleOpenPetModal = async (petId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/getstore/${petId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }
      const data = await response.json();
      setSelectedPet(data);
      setOpenPetModal(true);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  const handleClosePetModal = () => {
    setOpenPetModal(false);
    setSelectedPet(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
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

      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            textAlign="left"
            sx={{ color: '#fafafa', mb: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Buyer Requests
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#679df5' }}>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Buyer ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Buyer Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Contact Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Delivery Method
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Pet ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#002855' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : buyers.length > 0 ? (
                  buyers.map((buyer) => {
                    const pet = petStore.find(pet => pet.id === buyer.petId);
                    return (
                      <TableRow key={buyer.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#002855' }}>
                          {buyer.id}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#002855' }}>
                          {buyer.buyerName}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#002855' }}>
                          {buyer.contactNumber}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#002855' }}>
                          {buyer.deliveryMethod}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#002855' }}>
                          {pet ? (
                            <Tooltip title={`ID: ${pet.id}, Name: ${pet.name}`}>
                              <Button onClick={() => handleOpenPetModal(buyer.petId)} sx={{ color: '#002855' }}>
                                {buyer.petId}
                              </Button>
                            </Tooltip>
                          ) : (
                            'Pet not found'
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center' }}>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(buyer.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ padding: '20px', fontWeight: 'bold', color: '#002855' }}>
                      No Buyers Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Modal for Pet Details */}
      <Modal open={openPetModal} onClose={handleClosePetModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 'none',
          }}
        >
          {/* Close Icon */}
          <IconButton
            aria-label="close"
            onClick={handleClosePetModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#002855',
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedPet && (
            <>
              {/* Bold Pet Name */}
              <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#002855' }}>
                {selectedPet.name}
              </Typography>

              {/* Pet Photo */}
              {selectedPet.photo && (
                <img
                  src={`data:image/jpeg;base64,${selectedPet.photo}`}
                  alt={selectedPet.name}
                  style={{ width: '100%', height: 'auto', marginBottom: 16, borderRadius: 8 }}
                />
              )}

              {/* Pet Details */}
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Type:</strong> {selectedPet.type}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Breed:</strong> {selectedPet.breed}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Gender:</strong> {selectedPet.gender}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Age:</strong> {selectedPet.age}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Price:</strong> ${selectedPet.price}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#002855' }}>
                <strong>Status:</strong> {selectedPet.status}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BuyerTable;