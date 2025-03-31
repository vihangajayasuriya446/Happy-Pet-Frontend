import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  Fab
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Pets as PetsIcon
} from '@mui/icons-material';

// Styled components with glassmorphism effect
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '12px !important',
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:before': {
    display: 'none'
  },
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)'
  }
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#003366',
  fontWeight: 600,
  fontSize: '1.5rem'
}));

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showScroll, setShowScroll] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "How do I adopt a pet on HappyPet?",
      answer: "To adopt a pet, visit the Adopt page on HappyPet, browse the available pets, and follow the adoption process."
    },
    {
      question: "Can I purchase a pet on HappyPet?",
      answer: "Yes, HappyPet allows you to purchase pets from verified pet owners and organizations. You can filter pets by various preferences."
    },
    {
      question: "What is the Pet Matchmaking System?",
      answer: "The Pet Matchmaking System helps you find the perfect pet breed based on your preferences. You can filter pets by breed, age, size, and other preferences."
    },
    {
      question: "How do I update my account information?",
      answer: "You can update your account information by logging into your HappyPet account."
    },
    {
      question: "Can I return a pet after adoption?",
      answer: "Each shelter has its own return policy. Please contact the shelter directly for more information."
    },
    {
      question: "How does HappyPet support stray animal welfare?",
      answer: "HappyPet collaborates with animal welfare organizations to ensure stray animals receive proper care. You can also contribute to these initiatives through the platform."
    },
    {
      question: "Is HappyPet available on mobile devices?",
      answer: "Yes, HappyPet is optimized for both mobile and desktop users, providing a seamless experience across devices."
    },
    {
      question: "How do I contact a shelter or breeder?",
      answer: "Each pet listing includes contact information for the shelter or breeder. You can reach out to them directly through the platform."
    },
    {
      question: "What should I do if I encounter an issue with the platform?",
      answer: "If you encounter any issues, please visit our support page or contact our customer service team for assistance."
    },
    {
      question: "What types of pets are available for adoption on HappyPet?",
      answer: "HappyPet offers a variety of pets for adoption, including dogs, cats, birds, rabbits, and other small animals. Availability depends on local shelters and rescue groups."
    },
    {
      question: "Are the pets on HappyPet vaccinated and spayed/neutered?",
      answer: "Most shelters and rescue organizations ensure pets are vaccinated and spayed/neutered before adoption. Details can be found on each pet's profile."
    },
    {
      question: "How much does it cost to adopt a pet?",
      answer: "Adoption fees vary depending on the shelter, breed, and medical care provided. Some organizations may also offer discounts or promotions."
    },
    {
      question: "How do I know if a pet is a good fit for my home?",
      answer: "HappyPet provides details on a pet's temperament, energy level, and special needs. You can also contact shelters for advice on selecting the right pet for your lifestyle."
    },
    {
      question: "Can I adopt a pet if I live in an apartment?",
      answer: "Yes! Many pets, including small dog breeds, cats, and other small animals, are well-suited for apartment living. Be sure to check your building's pet policy before adopting."
    },
    {
      question: "Does HappyPet offer pet insurance or veterinary services?",
      answer: "While HappyPet does not directly provide insurance or vet services, we partner with trusted providers to offer pet care resources and recommendations."
    },
    {
      question: "Can I adopt a pet if I already have other pets at home?",
      answer: "Yes, but it's important to consider your current pets' personalities and needs. A gradual introduction process is recommended to ensure compatibility."
    },
    {
      question: "How does HappyPet verify pet sellers and breeders?",
      answer: "HappyPet verifies pet sellers and breeders through a strict vetting process, ensuring they meet ethical and legal requirements before listing pets on the platform."
    },
    {
      question: "Can I rehome a pet through HappyPet?",
      answer: "Yes, if you need to rehome your pet, you can create a listing on HappyPet to find a responsible new owner."
    }
  ];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 7,
      position: 'relative',
      
    }}>
      {/* Back to Top Button */}
      {showScroll && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            backgroundColor: 'rgba(0, 51, 102, 0.9)',
            color: 'white',
            '&:hover': {
              backgroundColor: '#003366',
              boxShadow: theme.shadows[6]
            },
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            
          }}
          size="medium"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      )}

      <Container maxWidth="md" sx={{ 
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          borderRadius: 12,
          border: '1px solid rgba(0, 51, 102, 0.1)',
          pointerEvents: 'none',
          zIndex: -1
        }
      }}>
        <Box sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 8,
          p: { xs: 2, sm: 4 },
          boxShadow: '0 8px 32px rgba(0, 51, 102, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          <Box textAlign="center" mb={6} position="relative">
            <Box sx={{
              position: 'absolute',
              left: { xs: 10, sm: 30, md: 50 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#003366',
              opacity: 1
            }}>
              <PetsIcon sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} />
            </Box>
            <Box sx={{
              position: 'absolute',
              right: { xs: 10, sm: 30, md: 50 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#003366',
              opacity: 1
            }}>
              <PetsIcon sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: '#003366',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 2
              }}
            >
              Pet Adoption, Buy, and Matchmaking for Breeding
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{
                color: 'rgba(0, 51, 102, 0.8)',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 500
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <StyledAccordion 
                key={index} 
                expanded={expanded === `panel${index}`} 
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  sx={{
                    backgroundColor: expanded === `panel${index}` ? 
                      'rgba(0, 51, 102, 0.08)' : 
                      'rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px !important',
                    minHeight: '72px',
                    '&.Mui-expanded': {
                      minHeight: '72px',
                    },
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#003366',
                      fontSize: '1.1rem'
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '0 0 12px 12px',
                    py: 3,
                    borderTop: '1px solid rgba(0, 51, 102, 0.1)'
                  }}
                >
                  <Typography variant="body1" color="black">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>

          <Box textAlign="center" mt={6}>
            <Typography 
              variant="body1" 
              color="black"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            >
              Still have questions? Contact our support team for assistance.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;