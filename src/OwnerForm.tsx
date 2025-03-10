import React, { useEffect, useState } from "react"; 


import { 
  Box, 
  Alert, 
  TextField, 
  Button, 
  Typography, 
  Container 
} from '@mui/material';

const OwnerForm: React.FC = () => {
  const [owner, setOwner] = useState({ ownerName: '', address: '', contactNumber: '' });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false); 

    
    if (owner.contactNumber.length !== 10 || isNaN(Number(owner.contactNumber))) {
      setError('Contact Number must be 10 digits.');
      return; 
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/addowner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(owner),
      });

      if (response.ok) {
        console.log('Owner added successfully!');
        setOwner({ ownerName: '', address: '', contactNumber: '' }); 
        setSuccess(true); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add owner');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

 

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}> 

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ color: "#002855", mb: 4 }}
        >
          Request Form
        </Typography>

        {/* Error and Success Messages */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Request sent successfully!
          </Alert>
        )} 

        <form onSubmit={handleSubmit}>
          <TextField
            label="Owner Name"
            fullWidth
            value={owner.ownerName}
            onChange={(e) => setOwner({ ...owner, ownerName: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            label="Address"
            fullWidth
            value={owner.address}
            onChange={(e) => setOwner({ ...owner, address: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            label="Contact Number"
            fullWidth
            value={owner.contactNumber}
            onChange={(e) => setOwner({ ...owner, contactNumber: e.target.value })}
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OwnerForm;