import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Alert,
  TextField,
  Button,
  Typography,
  Container,
  Modal,
} from '@mui/material';

const OwnerForm: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [owner, setOwner] = useState({
    ownerName: '',
    address: '',
    contactNumber: '',
    petId: petId ? parseInt(petId, 10) : 0,
    confirmation: 'No',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [open, setOpen] = useState(true); // Modal starts open
  const navigate = useNavigate();

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
        setOwner({ ownerName: '', address: '', contactNumber: '', petId: owner.petId, confirmation: 'No' });
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add owner');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleAgree = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate('/matchmaking'); // Navigate to MainUser page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box> 
        <Modal open={open} onClose={handleAgree}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Pet Matchmaking Policy & Terms
            </Typography>
            <Typography variant="body2" paragraph>
              Happypet’s Pet Matchmaking feature connects pet owners seeking
              breeding partners. We solely facilitate contact and do not
              participate in the breeding process. Users are responsible for
              verifying pet health, compatibility, and compliance with legal and
              ethical standards.
            </Typography>
            <Typography variant="body2" paragraph>
              Happypet is not liable for any disputes, health issues, or outcomes
              arising from these arrangements. Use of this feature is at the
              user’s own discretion and risk.
            </Typography>
            <Box mt={2} display="flex" justifyContent="center"> 
              <Button variant="contained" color="primary" onClick={handleBack} sx={{ mr: 2 }}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleAgree}>
                Agree
              </Button>
            </Box>
          </Box>
        </Modal>

        <Box 
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            mt: 4, 
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
            {/* Hidden field for petId */}
            <input type="hidden" name="petId" value={owner.petId} /> 
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default OwnerForm;
