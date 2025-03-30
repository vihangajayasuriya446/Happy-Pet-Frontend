import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Share as ShareIcon,
  Groups as GroupsIcon,
  CheckCircle as CheckCircleIcon,
  LinkedIn as LinkedInIcon,
  Handshake as HandshakeIcon
} from '@mui/icons-material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';

const SupportUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const supportOptions = [
    {
      icon: <PetsIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Buy & Sell Pets Responsibly",
      description: "If you're looking for a new pet or want to find a loving home for one, our platform connects ethical pet sellers with responsible buyers. We promote transparency, ensuring every pet gets the best care.",
      action: "Browse Pets for Sale",
      link: "/buy",
    },
    {
      icon: <FavoriteIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Find the Perfect Breeding Match",
      description: "Are you a pet owner looking for a suitable breeding partner for your pet? Our matchmaking service ensures ethical and well-planned pairings to support responsible breeding practices.",
      action: "Find a Breeding Partner",
      link: "/matchmaking",
    },
    {
      icon: <VolunteerActivismIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Adopt & Give a Pet a Second Chance",
      description: "Many pets are looking for their forever homes. By choosing adoption, you are not only gaining a loyal friend but also helping reduce the number of homeless animals.",
      action: "Adopt a Pet",
      link: "/adopt",
    },
    {
      icon: <GroupsIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Donate & Support Our Mission",
      description: "Your donations help us:",
      bullets: [
        "Improve our platform for a safer and better pet matchmaking experience",
        "Support animal shelters and rescue organizations",
        "Educate pet owners on responsible breeding, adoption, and care"
      ],
      action: "Donate Now",
      link: "https://www.patreon.com/",
    },
    {
      icon: <HandshakeIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Partner with Us",
      description: "Are you a pet breeder, veterinarian, or pet-related business? Partner with Happypet to grow your reach and support ethical pet ownership.",
      action: "Become a Partner",
      link: "/contactus",
    },
    {
      icon: <ShareIcon sx={{ color: '#003366' }} fontSize="large" />,
      title: "Spread the Word",
      description: "Help us build a stronger pet-loving community! Share Happypet with your friends, family, and fellow pet enthusiasts.",
      action: null,
      link: null,
    }
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: isMobile ? 2 : 4, py: 6 }}>
      {/* Hero Section with Glass Morphism */}
      <Box 
        sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 4,
          p: 6,
          mb: 8,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          textAlign="center"
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary,
            [theme.breakpoints.down('sm')]: { fontSize: '2rem' }
          }}
        >
          Support Us
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          textAlign="center"
          sx={{ 
            fontWeight: 500,
            color: "#003366",
            mb: 3
          }}
        >
          Help Us Build a Better Future for Pets & Pet Owners
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center"
          sx={{ 
            maxWidth: 1000,
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          At Happypet, we are dedicated to creating a trusted platform where pet lovers can find their perfect companions, 
          responsible breeders can connect, and homeless animals can find loving homes. With your support, we can continue 
          to improve our services and promote ethical pet care, breeding, and adoption.
        </Typography>
      </Box>

      {/* Ways to Support */}
<Box mb={8} sx={{ textAlign: 'center' }}>
  <Box
    sx={{
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(255, 255, 255, 0.13)',
      borderRadius: 2,
      p: 3,
      mb: 6,
      display: 'inline-block',
      textAlign: 'center',
    }}
  >
    <Typography 
      variant="h3" 
      component="h2" 
      sx={{ 
        fontWeight: 600,
        color: 'black',
        position: 'relative',
        display: 'inline-block',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '50%',
          height: '4px',
          bottom: '-10px',
          left: '25%',
          backgroundColor: '#003366',
          borderRadius: '2px'
        }
      }}
    >
      Ways You Can Support Us
    </Typography>
  </Box>

        <Grid container spacing={4}>
          {supportOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box textAlign="center" mb={3} sx={{ '& svg': { fontSize: '3rem' } }}>
                    {option.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    textAlign="center"
                    sx={{ fontWeight: 600, color: '#003366' }}
                  >
                    {option.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {option.description}
                  </Typography>
                  
                  {option.bullets && (
                    <List dense sx={{ mb: 2 }}>
                      {option.bullets.map((bullet, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon sx={{ color: '#003366' }} fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="body2">{bullet}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {option.title === "Spread the Word" && (
                    <Box textAlign="center" mt={3}>
                      <IconButton 
                        href="https://facebook.com/"
                        target="_blank"
                        sx={{ mx: 1, color: '#003366' }}
                      >
                        <FacebookIcon fontSize="large" />
                      </IconButton>
                      <IconButton 
                        href="https://www.linkedin.com/in/happy-pet-664b40352/"
                        target="_blank"
                        sx={{ mx: 1, color: '#003366' }}
                      >
                        <LinkedInIcon fontSize="large" />
                      </IconButton>
                      <IconButton 
                        href="https://www.instagram.com/happypetlk?igsh=MW51MmI2OWJ3OHR5OA=="
                        target="_blank"
                        sx={{ mx: 1, color: '#003366' }}
                      >
                        <InstagramIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>

                {option.action && option.link && (
                  <Box textAlign="center" pb={3} px={2}>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 2,
                        backgroundColor: '#003366',
                        '&:hover': {
                          backgroundColor: '#002244'
                        }
                      }}
                      size="large"
                      fullWidth
                      href={option.link}
                    >
                      {option.action}
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section with Light Transparency */}
      <Box 
        sx={{ 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 4,
          p: 6,
          textAlign: 'center',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: "#003366",
            mb: 3
          }}
        >
          Your Support Matters!
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          sx={{ 
            maxWidth: 800,
            mx: 'auto',
            mb: 4,
            color: "black"
          }}
        >
          Every pet deserves love, care, and a responsible owner. Whether you buy, sell, adopt, breed, donate, 
          or simply spread awareness, you are helping us build a better future for pets.
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: "#003366",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          Thank you for being a part of Happypet's journey! 
          <PetsIcon fontSize="large" sx={{ color: '#003366' }} />
          <PetsIcon fontSize="large" sx={{ color: '#003366' }} />
          <FavoriteIcon fontSize="large" sx={{ color: '#ff0040' }} />
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportUsPage;