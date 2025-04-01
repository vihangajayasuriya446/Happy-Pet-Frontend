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

// Enhanced Glass Morphism effects Styling with better readability
const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.6)', // Increased opacity for better readability
  backdropFilter: 'blur(8px)', // Reduced blur for clarity
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.6)', // More visible border
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)', // Subtler lift effect
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)',
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
        // Added subtle gradient background
      }}
    >
      <Container maxWidth="lg">
        {/* Main Heading with Half Underline */}
        <Box sx={{ 
          textAlign: 'center',
          mb: 6,
          position: 'relative',
          display: 'inline-block',
          width: '100%'
        }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'} // Larger heading size
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              letterSpacing: '0.5px',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '25%',
                bottom: '-10px',
                width: '50%',
                height: '4px',
                backgroundColor: theme.palette.primary.main,
              }
            }}
          >
            About HappyPet
          </Typography>
        </Box>

        {/* Welcome Section */}
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better contrast
            padding: theme.spacing(5),
            borderRadius: '12px',
            marginBottom: theme.spacing(6),
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            align="center"
            paragraph
            sx={{
              color: '#ffffff',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              lineHeight: 1.6,
              fontWeight: 400,
              mb: 3,
            }}
          >
            Welcome to <Box component="span" sx={{ fontWeight: 700, color: theme.palette.primary.light }}>HappyPet</Box>, your trusted online platform dedicated to pet adoption, purchase, and care.
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            align="center"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              lineHeight: 1.7,
            }}
          >
            Our mission is to create a seamless and trustworthy environment where pet lovers, adopters, and welfare organizations can come together to ensure the well-being of animals.
          </Typography>
        </Box>

        {/* Vision and What We Do */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <GlassPaper>
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.dark,
                  mb: 3,
                }}
              >
                Our Vision
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                sx={{ 
                  color: theme.palette.text.primary,
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  lineHeight: 1.7,
                }}
              >
                We envision a world where every pet finds a loving home, and responsible pet ownership is encouraged through education and accessible resources.
              </Typography>
            </GlassPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <GlassPaper>
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.dark,
                  mb: 3,
                }}
              >
                What We Do
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                sx={{ 
                  color: theme.palette.text.primary,
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  lineHeight: 1.7,
                }}
              >
                At HappyPet, we offer a comprehensive platform that connects pet seekers with reputable sources:
              </Typography>
              <Box 
                component="ul" 
                sx={{ 
                  textAlign: 'left', 
                  pl: 3, 
                  mt: 2,
                  '& li': {
                    fontSize: isMobile ? '1.1rem' : '1.2rem',
                    lineHeight: 1.8,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }
                }}
              >
                <li>Pet Adoption & Purchase</li>
                <li>Personalized Pet Matchmaking</li>
                <li>Stray Animal Welfare Support</li>
                <li>Pet Care Resources</li>
              </Box>
            </GlassPaper>
          </Grid>
        </Grid>

        {/* Why Choose Us Section */}
        <Box mt={8} textAlign="center">
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            gutterBottom
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              mb: 6,
              fontSize: isMobile ? '2rem' : '2.5rem',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '25%',
                bottom: '-10px',
                width: '50%',
                height: '4px',
                backgroundColor: theme.palette.primary.main,
              }
            }}
          >
            Why Choose HappyPet?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Trust & Transparency",
                content: "All pet listings are from verified sources with complete health and background information."
              },
              {
                title: "Seamless Experience",
                content: "Intuitive interface designed for effortless browsing on any device."
              },
              {
                title: "Animal Welfare",
                content: "We donate a portion of proceeds to shelters and rescue organizations."
              },
              {
                title: "Expert Support",
                content: "Access to veterinarians and pet care specialists for guidance."
              },
              {
                title: "Community",
                content: "Join a network of passionate pet lovers and experts."
              },
              {
                title: "Lifetime Care",
                content: "Resources and support for your pet's entire lifecycle."
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <GlassPaper sx={{ height: '100%' }}>
                  <Typography 
                    variant={isMobile ? 'h5' : 'h5'} 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      color: theme.palette.primary.dark,
                      mb: 2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant={isMobile ? 'body1' : 'body1'} 
                    sx={{ 
                      color: theme.palette.text.primary,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.content}
                  </Typography>
                </GlassPaper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Join Us Section - Increased padding above this section */}
        <Box
          mt={12} // Increased from mt={8} to mt={12} for more spacing
          textAlign="center"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: theme.spacing(5),
            borderRadius: '12px',
            boxShadow: theme.shadows[6],
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.light,
              mb: 3,
            }}
          >
            Join Our Community
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: isMobile ? '1.2rem' : '1.3rem',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Whether you're looking to adopt, support animal welfare, or access pet care resources, HappyPet provides everything you need in one place. Together, we're building a compassionate community where pets and people thrive.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;