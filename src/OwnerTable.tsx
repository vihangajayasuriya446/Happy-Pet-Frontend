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
  Checkbox,
  Grid,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Modal,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sidebar from './Sidebar'; 
import { User } from './types';

interface Owner {
  id: number;
  ownerName: string;
  address: string;
  contactNumber: string;
  petId: number;
  confirmation: string;
}

const OwnerTable: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState<string>('none');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [openPetModal, setOpenPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<User | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/getowners');
        if (!response.ok) {
          throw new Error('Failed to fetch owners');
        }
        const data = await response.json();
        setOwners(data);
      } catch (error) {
        console.error('Error fetching owners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/getusers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchOwners();
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deleteowner/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOwners(owners.filter((owner) => owner.id !== id));
      } else {
        console.error(`Failed to delete owner with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };

  const handleToggle = async (id: number, currentConfirmation: string) => {
    const newConfirmation = currentConfirmation === 'Yes' ? 'No' : 'Yes';
    try {
      const response = await fetch(`http://localhost:8080/api/v1/updateowner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmation: newConfirmation }),
      });

      if (response.ok) {
        setOwners(owners.map(owner =>
          owner.id === id ? { ...owner, confirmation: newConfirmation } : owner
        ));
      } else {
        console.error(`Failed to update owner with ID ${id}`);
      }
    } catch (error) {
      console.error('Error updating owner:', error);
    }
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    setAnchorEl(null);
  };

  const sortedOwners = [...owners].sort((a, b) => {
    switch (sortBy) {
      case 'id':
        return b.id - a.id;
      case 'unconfirmed':
        return a.confirmation.localeCompare(b.confirmation);
      case 'confirmed':
        return b.confirmation.localeCompare(a.confirmation);
      default:
        return 0;
    }
  });

  const totalRequests = sortedOwners.length;
  const confirmedRequests = sortedOwners.filter(owner => owner.confirmation === 'Yes').length;
  const unconfirmedRequests = totalRequests - confirmedRequests;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPetModal = (pet: User) => {
    setSelectedPet(pet);
    setOpenPetModal(true);
  };

  const handleClosePetModal = () => {
    setOpenPetModal(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Tooltip title="Admin Dashboard">
                  <IconButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    sx={{
                      position: "fixed",
                      left: isSidebarOpen ? 240 : 16, // Adjust position based on sidebar state
                      top: 60, // Increased top value to move the icon further down
                      zIndex: 1300, // High zIndex to ensure it's above other content
                      '& svg': {
                        fontSize: '2rem',
                        color:"black"
                      },
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(28, 34, 225, 0.61)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Tooltip>
      
        <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
          
          <Typography variant="h3" gutterBottom fontWeight="bold" textAlign="left" sx={{ color: '#fafafa', mb: 4 }}>
            Matchmaking Requests
          </Typography>

          <Grid container spacing={3} mb={4}>
            {/* Total Requests Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  border: '2px solid #1a1aff', // Blue outline
                }}
              >
                <Typography variant="h6" sx={{ color: '#000' }}>Total Requests</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#000' }}>{totalRequests}</Typography>
              </Box>
            </Grid>

            {/* Confirmed Requests Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  bgcolor: '#a0bce8',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  border: '2px solid #1a1aff', // Blue outline
                }}
              >
                <Typography variant="h6" sx={{ color: '#000' }}>Confirmed</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#000' }}>{confirmedRequests}</Typography>
              </Box>
            </Grid>

            {/* Unconfirmed Requests Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  bgcolor: '#ffff99', // Yellow background
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  border: '2px solid #ffcc00', // Yellow outline
                }}
              >
                <Typography variant="h6" sx={{ color: '#000' }}>Unconfirmed</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#000' }}>{unconfirmedRequests}</Typography>
              </Box>
            </Grid>
          </Grid>

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
                    <strong>Age:</strong> {selectedPet.age}
                  </Typography>
                </>
              )}
            </Box>
          </Modal>

          {/* Filter Icon positioned above the table */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Tooltip title="Sort by">
              <IconButton
                onClick={handleClick}
                sx={{
                  bgcolor: '#002855',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#001a33',
                  },
                  borderRadius: '8px',
                  boxShadow: 2,
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleSort('none')}>None</MenuItem>
              <MenuItem onClick={() => handleSort('id')}>Sort by Time Added</MenuItem>
              <MenuItem onClick={() => handleSort('confirmed')}>Confirmed Requests First</MenuItem>
              <MenuItem onClick={() => handleSort('unconfirmed')}>Unconfirmed Requests First</MenuItem>
            </Menu>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#000099' }}> {/* Updated background color */}
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Contact Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Pet ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Confirmation</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', padding: '16px', textAlign: 'center', color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : sortedOwners.length > 0 ? (
                  sortedOwners.map((owner) => {
                    const pet = users.find(user => user.id === owner.petId);
                    return (
                      <TableRow key={owner.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>{owner.id}</TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>{owner.ownerName}</TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>{owner.address}</TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>{owner.contactNumber}</TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>
                          {pet ? (
                            <Tooltip title={pet.name}>
                              <Button onClick={() => handleOpenPetModal(pet)} sx={{ color: '#000' }}>
                                {owner.petId}
                              </Button>
                            </Tooltip>
                          ) : (
                            'Pet not found'
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center', color: '#000' }}>
                          <Checkbox
                            checked={owner.confirmation === 'Yes'}
                            onChange={() => handleToggle(owner.id, owner.confirmation)}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '16px', textAlign: 'center' }}>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(owner.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ padding: '20px', fontWeight: 'bold', color: '#000' }}>
                      No Requests Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default OwnerTable;