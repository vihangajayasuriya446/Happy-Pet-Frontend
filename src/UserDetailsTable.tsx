import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Stack,
  Button,
} from '@mui/material';
import { Adoption } from './types';

interface UserDetailsTableProps {
  rows: Adoption[];
  selectedAdoption: (adoption: Adoption) => void;
  deleteAdoption: (adoption: Adoption) => void;
  isLoading: boolean;
  error: string | null;
}

const UserDetailsTable: React.FC<UserDetailsTableProps> = ({
  rows,
  selectedAdoption,
  deleteAdoption,
  isLoading,
  error,
}) => {
  // Function to get status color
  type StatusColor = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

  const getStatusColor = (status: string): StatusColor => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Adoption ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Pet ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Pet Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Applicant Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Applied Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#002855', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.adoption_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell sx={{ textAlign: 'center' }}>{row.adoption_id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.pet_id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.pet_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.user_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {new Date(row.applied_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ textTransform: 'none', borderRadius: '4px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectedAdoption(row);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ textTransform: 'none', borderRadius: '4px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAdoption(row);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="textSecondary">
                  No adoption applications found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDetailsTable;