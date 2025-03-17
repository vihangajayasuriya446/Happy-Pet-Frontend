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
  Switch, 
  FormControlLabel,
  Grid,
  Box
} from '@mui/material';

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
  const [isLoading, setIsLoading] = useState(true);

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

    fetchOwners();
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

  // Calculate request summary
  const totalRequests = owners.length;
  const confirmedRequests = owners.filter(owner => owner.confirmation === 'Yes').length;
  const unconfirmedRequests = totalRequests - confirmedRequests;

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}> {/* Increased top/bottom margin */}
      {/* Matchmaking Requests Heading */}
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="left" sx={{ color: "#fafafa", mb: 4 }}>
        Matchmaking Requests
      </Typography>

      {/* Request Summary Box */}
      <Grid container spacing={3} mb={4}> 
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2,opacity: 0.6, textAlign: 'center' }}> 
            <Typography variant="h6">Total Requests</Typography>
            <Typography variant="h5" fontWeight="bold">{totalRequests}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#a0bce8', p: 3, borderRadius: 2,opacity: 0.6, textAlign: 'center' }}> 
            <Typography variant="h6">Confirmed</Typography>
            <Typography variant="h5" fontWeight="bold">{confirmedRequests}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: '#eff283', p: 3, borderRadius: 2,opacity: 0.6, textAlign: 'center' }}> 
            <Typography variant="h6">Unconfirmed</Typography>
            <Typography variant="h5" fontWeight="bold">{unconfirmedRequests}</Typography>
          </Box>
        </Grid>
      </Grid> 

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}> 
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Contact Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Pet ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Confirmation</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Actions</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center"> 
                  <CircularProgress /> 
                </TableCell>
              </TableRow>
            ) : owners.length > 0 ? ( 
              owners.map((owner) => (
                <TableRow key={owner.id} 
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.id}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.ownerName}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.address}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.contactNumber}</TableCell>
                  <TableCell sx={{ padding: '12px' }}>{owner.petId}</TableCell>
                  <TableCell sx={{ padding: '12px' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={owner.confirmation === 'Yes'}
                          onChange={() => handleToggle(owner.id, owner.confirmation)}
                          color="primary"
                        />
                      }
                      label={owner.confirmation}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '12px' }}>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(owner.id)}>
                      Delete 
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" colSpan={7} align="center" sx={{ padding: '20px', fontWeight: 'bold', color: 'grey' }}>
                  No Requests Found 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OwnerTable;

