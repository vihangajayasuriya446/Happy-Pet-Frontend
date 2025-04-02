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
  Paper,
  useMediaQuery,
  useTheme,
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
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      const response = await fetch('/api/v1/addowner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
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
    navigate('/matchmaking');
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: 1,
        px: { xs: 0, sm: 2 },
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 'sm',
        margin: '0 auto',
      }}
    >
      {/* Policy Modal */}
      <Modal 
        open={open} 
        onClose={handleAgree}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            textAlign: 'center',
            width: { xs: 'calc(100% - 32px)', sm: '500px' },
            maxWidth: '95vw',
            mx: 'auto',
            outline: 'none',
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            fontWeight="bold" 
            gutterBottom 
            sx={{ color: '#002855' }}
          >
            Pet Matchmaking Policy & Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            color: '#000000',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}>
            Happypet's Pet Matchmaking feature connects pet owners seeking
            breeding partners. We solely facilitate contact and do not
            participate in the breeding process. Users are responsible for
            verifying pet health, compatibility, and compliance with legal and
            ethical standards.
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            color: '#000000',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}>
            Happypet is not liable for any disputes, health issues, or outcomes
            arising from these arrangements. Use of this feature is at the
            user's own discretion and risk.
          </Typography>
          <Box mt={2} display="flex" justifyContent="center" gap={2}
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Button 
              variant="outlined" 
              onClick={handleBack} 
              fullWidth={isMobile}
              sx={{ 
                color: '#003366', 
                borderColor: '#003366',
                '&:hover': {
                  borderColor: '#003366',
                  backgroundColor: 'rgba(0, 0, 255, 0.04)',
                },
              }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAgree} 
              fullWidth={isMobile}
              sx={{ 
                backgroundColor: '#003366', 
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#040654',
                },
              }}
            >
              Agree
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Form Container */}
      <Paper elevation={0} sx={{ 
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${theme.palette.divider}`,
        width: 'calc(100% - 16px)',
        maxWidth: '500px',
        mx: 'auto',
        my: 2,
      }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ 
            color: '#002855',
            mb: 2,
            fontSize: { xs: '1.3rem', sm: '1.75rem' }
          }}
        >
          Matchmaking Request Form
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center" 
          sx={{ 
            color: '#000000', 
            mb: 3,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Fill required details to send a matchmaking request.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Request sent successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Owner Name"
            fullWidth
            value={owner.ownerName}
            onChange={(e) => setOwner({ ...owner, ownerName: e.target.value })}
            margin="normal"
            required
            sx={{ mb: 2 }}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            label="Address"
            fullWidth
            value={owner.address}
            onChange={(e) => setOwner({ ...owner, address: e.target.value })}
            margin="normal"
            required
            sx={{ mb: 2 }}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            label="Contact Number"
            fullWidth
            value={owner.contactNumber}
            onChange={(e) => setOwner({ ...owner, contactNumber: e.target.value })}
            margin="normal"
            required
            sx={{ mb: 3 }}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          
          <input type="hidden" name="petId" value={owner.petId} />
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            mt: 2 
          }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#003366',
                fontSize: '0.9375rem',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#040654',
                },
              }}
            >
              Send Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default OwnerForm;