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
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';
import { User } from './types';
import PetsIcon from "@mui/icons-material/Pets";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openPetModal, setOpenPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<User | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOwners = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://51.21.197.93:8080/api/v1/getowners', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

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
        const response = await fetch('http://51.21.197.93:8080/api/v1/getusers');
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
      const response = await fetch(`http://51.21.197.93:8080/api/v1/deleteowner/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
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
      const response = await fetch(`http://51.21.197.93:8080/api/v1/updateowner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
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
    <Box sx={{ py: 1, paddingTop: "5px" }}>
      <Box sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "80px auto 20px",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        bgcolor: "rgba(255, 255, 255, 0.8)",
      }}>
        <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Tooltip title="Admin Dashboard">
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{
                position: "fixed",
                left: isSidebarOpen ? 240 : 16,
                top: 90,
                zIndex: 1300,
                backgroundColor: 'background.paper,0.8',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                },
              }}
            >
              <KeyboardArrowRight sx={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'none', color: "black" }} />
            </IconButton>
          </Tooltip>

          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#003366",
                p: 2,
                borderRadius: "12px",
                mb: 3,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              <PetsIcon sx={{ fontSize: 32 }} />
              Matchmaking Requests
            </Typography>

            {/* Compact Summary Boxes with same text size */}
            <Grid container spacing={2} mb={3} sx={{ justifyContent: 'center' }}>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 1.5,
                    borderRadius: "12px",
                    boxShadow: 1,
                    textAlign: 'center',
                    borderLeft: '4px solid #3f51b5',
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 2,
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    TOTAL REQUESTS
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {totalRequests}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 1.5,
                    borderRadius: "12px",
                    boxShadow: 1,
                    textAlign: 'center',
                    borderLeft: '4px solid #4caf50',
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 2,
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    CONFIRMED
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {confirmedRequests}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 1.5,
                    borderRadius: "12px",
                    boxShadow: 1,
                    textAlign: 'center',
                    borderLeft: '4px solid #ff9800',
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 2,
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    UNCONFIRMED
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {unconfirmedRequests}
                  </Typography>
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
                  borderRadius: "12px",
                  outline: 'none',
                }}
              >
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
                    <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#002855' }}>
                      {selectedPet.name}
                    </Typography>

                    {selectedPet.photo && (
                      <img
                        src={`data:image/jpeg;base64,${selectedPet.photo}`}
                        alt={selectedPet.name}
                        style={{ width: '100%', height: 'auto', marginBottom: 16, borderRadius: 8 }}
                      />
                    )}

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

            {/* Filter and Table Section */}
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
                    boxShadow: 1,
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

            <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: "12px", overflow: 'hidden' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#003366' }}>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Contact</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Pet ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Confirmed</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', padding: '12px', textAlign: 'center', color: '#fff' }}>Actions</TableCell>
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
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>{owner.id}</TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>{owner.ownerName}</TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>{owner.address}</TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>{owner.contactNumber}</TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>
                            {pet ? (
                              <Tooltip title={pet.name}>
                                <Button 
                                  onClick={() => handleOpenPetModal(pet)} 
                                  sx={{ 
                                    color: '#000',
                                    textTransform: 'none',
                                    minWidth: 'auto',
                                    p: '4px 8px',
                                    '&:hover': {
                                      backgroundColor: 'rgba(0, 40, 85, 0.1)'
                                    }
                                  }}
                                >
                                  {owner.petId}
                                </Button>
                              </Tooltip>
                            ) : (
                              'Pet not found'
                            )}
                          </TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center', color: '#000' }}>
                            <Checkbox
                              checked={owner.confirmation === 'Yes'}
                              onChange={() => handleToggle(owner.id, owner.confirmation)}
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                            <Button 
                              variant="contained" 
                              color="error" 
                              size="small" 
                              onClick={() => handleDelete(owner.id)}
                              sx={{
                                minWidth: '80px',
                                borderRadius: '6px',
                                boxShadow: 'none',
                                p: '4px 8px',
                                fontSize: '0.75rem',
                                '&:hover': {
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }
                              }}
                            >
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
    </Box>
  );
};

export default OwnerTable;