import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Enhanced Glass Morphism Styling
const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Less transparent for better readability
  backdropFilter: 'blur(10px)', // Slightly reduced blur for clarity
  borderRadius: '16px', // Rounded corners
  border: '1px solid rgba(255, 255, 255, 0.5)', // More visible border
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', // Soft shadow for depth
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)', // Lift effect on hover
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
  },
}));

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? 'h5' : 'h3'} // Larger heading for modern look
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            marginBottom: theme.spacing(4),
            color: 'rgb(255, 255, 255)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle text shadow
          }}
        >
          About Us
        </Typography>

        {/* Enhanced Contrast for Welcome Text */}
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
            padding: theme.spacing(4),
            borderRadius: '8px',
            marginBottom: theme.spacing(4),
          }}
        >
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{
              color: '#ffffff', // White text for high contrast
              fontSize: isMobile ? '1rem' : '1.1rem', // Slightly larger text
            }}
          >
            Welcome to <strong>HappyPet</strong>, your all-in-one online platform dedicated to pet adoption, purchase, and care. Our mission is to create a seamless and trustworthy environment where pet lovers, adopters, and welfare organizations can come together to ensure the well-being of animals.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <GlassPaper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                Our Vision
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                We envision a world where every pet finds a loving home, and responsible pet ownership is encouraged through education and accessible resources. By leveraging technology, we aim to simplify the process of pet adoption and care, making it easier for people to connect with their ideal companions.
              </Typography>
            </GlassPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <GlassPaper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                What We Do
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                At HappyPet, we offer a user-friendly platform that serves as a bridge between pet seekers, reputable breeders, and animal welfare organizations. Our key offerings include:
                <ul style={{ textAlign: 'left', listStyleType: 'disc', paddingLeft: '20px', marginTop: '8px', color: theme.palette.text.primary }}>
                  <li>Pet Adoption & Purchase</li>
                  <li>Pet Matchmaking</li>
                  <li>Stray Animal Welfare Support</li>
                </ul>
              </Typography>
            </GlassPaper>
          </Grid>
        </Grid>

        <Box mt={8}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'rgb(255, 255, 255)', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
          >
            Why Choose HappyPet?
          </Typography>
          <Grid container spacing={3} justifyContent="center" direction={isMobile ? 'column' : 'row'}>
            <Grid item xs={12} md={4}>
              <GlassPaper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                  Trust & Transparency
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  We ensure all pet listings are from verified sources, giving you peace of mind when adopting or purchasing a pet.
                </Typography>
              </GlassPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <GlassPaper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                  Seamless User Experience
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  Our intuitive interface is designed for ease of use, whether you’re on a desktop or mobile device.
                </Typography>
              </GlassPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <GlassPaper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                  Support for Animal Welfare
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  A portion of our proceeds and partnerships go towards helping stray animals and improving their quality of life.
                </Typography>
              </GlassPaper>
            </Grid>
          </Grid>
        </Box>

        {/* Enhanced Contrast for Join Us Text */}
        <Box
          mt={8}
          textAlign="center"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
            padding: theme.spacing(4),
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff', // White text for high contrast
              fontSize: isMobile ? '1rem' : '1.1rem',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Join us in making a difference! Whether you’re looking for a new pet, supporting animal welfare, or seeking expert pet care resources, HappyPet is here to help. Together, we can build a compassionate community where pets and people thrive.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;