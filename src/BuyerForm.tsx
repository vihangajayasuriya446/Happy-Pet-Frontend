import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Alert,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

const BuyerForm: React.FC = () => {
  const location = useLocation();
  const { petIds, totalPrice } = location.state || { petIds: [], totalPrice: 0 };
  const [buyer, setBuyer] = useState({
    buyerName: '',
    contactNumber: '',
    deliveryMethod: 'Home Delivery',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (buyer.contactNumber.length !== 10 || isNaN(Number(buyer.contactNumber))) {
      setError('Contact Number must be 10 digits.');
      return;
    }

    try {
      // Submit buyer details for each petId
      const requests = petIds.map((petId: number) =>
        fetch('http://localhost:8080/api/v1/addbuyer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...buyer, petId }), 
        })
      );

      const responses = await Promise.all(requests);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        console.log('Buyer details saved for all pets!');
        setSuccess(true);
        // Navigate to the payment gateway with petIds and totalPrice
        navigate('/payment', { state: { petIds, totalPrice } }); 
      } else {
        setError('Failed to save buyer details for some pets.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '2.5rem',
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          mt: 15,
          mb: 8,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ color: '#002855', mb: 3 }}
        >
          Buyer Details
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Details saved successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Buyer Name"
            fullWidth
            value={buyer.buyerName}
            onChange={(e) => setBuyer({ ...buyer, buyerName: e.target.value })}
            margin="normal"
            required
            sx={{ mb: 3 }}
            variant="outlined"
          />
          <TextField
            label="Contact Number"
            fullWidth
            value={buyer.contactNumber}
            onChange={(e) => setBuyer({ ...buyer, contactNumber: e.target.value })}
            margin="normal"
            required
            sx={{ mb: 3 }}
            variant="outlined"
          />
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="delivery-method">Delivery Method</InputLabel>
            <Select
              labelId="delivery-method"
              value={buyer.deliveryMethod}
              onChange={(e) => setBuyer({ ...buyer, deliveryMethod: e.target.value })}
            >
              <MenuItem value="Home Delivery">Home Delivery</MenuItem>
              <MenuItem value="Pick From Store">Pick From Store</MenuItem>
            </Select>
          </FormControl>

          {/* Display pet IDs and total price */}
          <Typography variant="h6" sx={{ mb: 3 }}>
            Total Price: ${totalPrice}
          </Typography>
          <Table>
            <TableBody>
              {petIds.map((petId: number) => (
                <TableRow key={petId}>
                  <TableCell>Pet ID: {petId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ 
                px: 5, 
                py: 1.5, 
                borderRadius: 2, 
                textTransform: 'none', 
                fontSize: '1rem', 
                fontWeight: 'bold',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default BuyerForm;