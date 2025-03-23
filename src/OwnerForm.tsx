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
        {/* Policy Modal */}
        <Modal open={open} onClose={handleAgree}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#fff',
              boxShadow: 24,
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              outline: 'none',
              width: '520px', // Match the form box width
              maxWidth: '90%', // Ensure responsiveness
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#002855' }}>
              Pet Matchmaking Policy & Terms
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#000000' }}>
              Happypet’s Pet Matchmaking feature connects pet owners seeking
              breeding partners. We solely facilitate contact and do not
              participate in the breeding process. Users are responsible for
              verifying pet health, compatibility, and compliance with legal and
              ethical standards.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#000000' }}>
              Happypet is not liable for any disputes, health issues, or outcomes
              arising from these arrangements. Use of this feature is at the
              user’s own discretion and risk.
            </Typography>
            <Box mt={3} display="flex" justifyContent="center" gap={2}>
              <Button 
                variant="outlined" 
                onClick={handleBack} 
                sx={{ 
                  px: 4, 
                  color: '#0000ff', 
                  borderColor: '#0000ff',
                  '&:hover': {
                    borderColor: '#0000ff',
                    backgroundColor: 'rgba(0, 0, 255, 0.04)',
                  },
                }}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleAgree} 
                sx={{ 
                  px: 4, 
                  backgroundColor: '#0000ff', 
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0000cc',
                  },
                }}
              >
                Agree
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Form Container */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '2.5rem',
            borderRadius: 3,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            mt: 15,
            mb: 8,
            width: '500px', // Match the modal width
            maxWidth: '90%', // Ensure responsiveness
            mx: 'auto', // Center the form
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
            sx={{ color: '#002855', mb: 3 }}
          >
            Matchmaking Request Form
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ color: '#000000', mb: 4 }}>
            Fill required details to send a matchmaking request.
          </Typography>

          {/* Error/Success Alerts */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Request sent successfully!
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Owner Name"
              fullWidth
              value={owner.ownerName}
              onChange={(e) => setOwner({ ...owner, ownerName: e.target.value })}
              margin="normal"
              required
              sx={{ mb: 3 }}
              variant="outlined"
            />
            <TextField
              label="Address"
              fullWidth
              value={owner.address}
              onChange={(e) => setOwner({ ...owner, address: e.target.value })}
              margin="normal"
              required
              sx={{ mb: 3 }}
              variant="outlined"
            />
            <TextField
              label="Contact Number"
              fullWidth
              value={owner.contactNumber}
              onChange={(e) => setOwner({ ...owner, contactNumber: e.target.value })}
              margin="normal"
              required
              sx={{ mb: 4 }}
              variant="outlined"
            />
            {/* Hidden field for petId */}
            <input type="hidden" name="petId" value={owner.petId} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  px: 5, 
                  py: 1.5, 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  
                  fontWeight: 'bold',
                  backgroundColor: '#0000ff',
                   fontSize: '1.05rem',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0000cc',
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default OwnerForm;