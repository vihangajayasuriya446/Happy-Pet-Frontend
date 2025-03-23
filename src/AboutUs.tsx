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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
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
          variant={isMobile ? 'h5' : 'h4'} // Adjust heading size on mobile
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', marginBottom: theme.spacing(4) }}
        >
          About Us
        </Typography>

        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ marginBottom: theme.spacing(4) }}
        >
          Welcome to HappyPet, your all-in-one online platform dedicated to pet adoption, purchase, and care. Our mission is to create a seamless and trustworthy environment where pet lovers, adopters, and welfare organizations can come together to ensure the well-being of animals.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2">
                We envision a world where every pet finds a loving home, and responsible pet ownership is encouraged through education and accessible resources. By leveraging technology, we aim to simplify the process of pet adoption and care, making it easier for people to connect with their ideal companions.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                What We Do
              </Typography>
              <Typography variant="body2">
                At HappyPet, we offer a user-friendly platform that serves as a bridge between pet seekers, reputable breeders, and animal welfare organizations. Our key offerings include:
                <ul style={{ textAlign: 'left', listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Pet Adoption & Purchase</li>
                  <li>Pet Matchmaking</li>
                  <li>Stray Animal Welfare Support</li>
                  <li>Comprehensive Pet Care Resources</li>
                </ul>
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>

        <Box mt={8}>
          <Typography variant="h5" align="center" gutterBottom>
            Why Choose HappyPet?
          </Typography>
          <Grid container spacing={3} justifyContent="center" direction={isMobile ? 'column' : 'row'}> {/*Stack on mobile*/}
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Trust & Transparency
                </Typography>
                <Typography variant="body2">
                  We ensure all pet listings are from verified sources, giving you peace of mind when adopting or purchasing a pet.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Seamless User Experience
                </Typography>
                <Typography variant="body2">
                  Our intuitive interface is designed for ease of use, whether you’re on a desktop or mobile device.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Support for Animal Welfare
                </Typography>
                <Typography variant="body2">
                  A portion of our proceeds and partnerships go towards helping stray animals and improving their quality of life.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>

        <Box mt={8} textAlign="center">
          <Typography variant="body1">
            Join us in making a difference! Whether you’re looking for a new pet, supporting animal welfare, or seeking expert pet care resources, HappyPet is here to help. Together, we can build a compassionate community where pets and people thrive.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;