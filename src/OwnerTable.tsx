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
} from '@mui/material';

interface Owner {
  id: number;
  ownerName: string;
  address: string;
  contactNumber: string;
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
        // Handle error - e.g., display a user-friendly error message
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
        // Update the owners state (optimistic update)
        setOwners(owners.filter((owner) => owner.id !== id));
      } else {
        // Handle error, e.g., show an error message
        console.error(`Failed to delete owner with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ color: "#002855", mb: 4 }}>
        Owners List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}> 
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Contact Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress /> 
                </TableCell>
              </TableRow>
            ) : owners.length > 0 ? ( 
              owners.map((owner) => (
                <TableRow key={owner.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.id}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.ownerName}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.address}</TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: '12px' }}>{owner.contactNumber}</TableCell>
                  <TableCell sx={{ padding: '12px' }}>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(owner.id)}>
                      Delete 
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" colSpan={5} align="center" sx={{ padding: '20px', fontWeight: 'bold', color: 'grey' }}>
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