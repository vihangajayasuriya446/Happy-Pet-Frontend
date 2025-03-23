import React, { useState } from 'react';
import {
    Box, Typography, Button, Paper, Grid, useMediaQuery,
    ThemeProvider, createTheme, Tabs, Tab, alpha,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CatIcon from '@mui/icons-material/Pets';
import DogIcon from '@mui/icons-material/Pets';

// Create a modern theme - same as other components
const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 800,
            letterSpacing: '-0.5px',
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.25px',
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            lineHeight: 1.6,
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    palette: {
        primary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1d4ed8',
        },
        background: {
            default: '#f8fafc',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    title: string;
    icon: React.ReactNode;
    faqs: FaqItem[];
}

const PetAdoptionFAQs: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [petType, setPetType] = useState<'dog' | 'cat'>('dog');

    const handlePetTypeChange = (_: React.SyntheticEvent, newValue: 'dog' | 'cat') => {
        setPetType(newValue);
    };

    const commonFaqs: FaqCategory[] = [
        {
            title: "General Adoption Questions",
            icon: <HelpOutlineIcon fontSize="medium" />,
            faqs: [
                {
                    question: "What's the difference between adopting and buying a pet?",
                    answer: "Adoption typically involves getting a pet from a shelter or rescue organization, often at a lower cost than buying from a breeder. When you adopt, you're giving a home to an animal in need. Buying usually refers to purchasing from a breeder or pet store, which may offer specific breeds or puppies/kittens."
                },
                {
                    question: "How much does it cost to adopt a pet?",
                    answer: "Adoption fees vary depending on the pet's age, breed, and medical history. Our platform processes payments through a secure payment gateway, and you'll receive an order ID upon completion. The fee covers basic veterinary care, microchipping, and sometimes spay/neuter procedures, ensuring your new pet starts their life with you in good health."
                },
                {
                    question: "What should I expect during the adoption process?",
                    answer: "Our adoption process is straightforward: Browse our list of available pets, each with details including name, breed, age, and rescue story. When you find a match, submit an adoption request form with your personal details, reason for adoption, and required documents. After submission, you'll receive a confirmation message with a unique request ID that you can use to track your application status."
                },
                {
                    question: "How do I know which pet is right for me?",
                    answer: "Our platform displays detailed information about each pet, including their name, breed, age, and rescue story. Take time to read through these profiles to understand each pet's personality and needs. Consider your lifestyle, living situation, and what kind of pet would best fit into your home. You can also use our matchmaking service to find compatible pets based on specific criteria."
                }
            ]
        },
        {
            title: "Pet Matchmaking Process",
            icon: <VolunteerActivismIcon fontSize="medium" />,
            faqs: [
                {
                    question: "What is pet matchmaking?",
                    answer: "Pet matchmaking is our specialized service that allows you to select two pets and evaluate their compatibility for potential breeding or companionship. Our system analyzes multiple factors to generate a compatibility score, helping you make informed decisions about pet pairing."
                },
                {
                    question: "How does the matchmaking process work?",
                    answer: "Our matchmaking process involves three main steps: 1) Pet Selection - you select two pets from our database for comparison; 2) Compatibility Scoring - our system calculates a compatibility score based on breed compatibility, age difference, and health conditions; and 3) Breeding Initialization - if the pets are compatible, you can initiate the breeding process with detailed information about timeline and expected outcomes."
                },
                {
                    question: "What factors determine compatibility in pet matching?",
                    answer: "Our system evaluates several critical factors to determine compatibility: breed compatibility (whether certain breeds pair well together), age difference (ensuring appropriate age matching), and health conditions (to prevent passing genetic issues). Each factor is weighted in our algorithm to provide a comprehensive compatibility score that helps predict successful matches."
                },
                {
                    question: "What happens after I find compatible pets?",
                    answer: "Once our system identifies compatible pets with a favorable score, you can initiate the breeding process. The system will provide you with detailed information about the breeding timeline, expected outcomes, and any special care requirements. You'll receive a confirmation and can track the process through your account dashboard."
                }
            ]
        },
        {
            title: "Post-Adoption Support",
            icon: <InfoIcon fontSize="medium" />,
            faqs: [
                {
                    question: "What support is available after I adopt?",
                    answer: "After adoption, we provide confirmation emails with your request ID and order details. Our system stores your adoption information securely in our database, allowing you to access resources and support through your account. We offer guidance on pet care."
                },
                {
                    question: "What if the adoption doesn't work out?",
                    answer: "If you encounter challenges with your adopted pet, please contact us using your request ID. Our team will work with you to address concerns and provide solutions. In cases where rehoming is necessary, we have protocols in place to ensure the pet returns to our care safely and finds another suitable home."
                },
                {
                    question: "How long does it take for a new pet to adjust?",
                    answer: "The adjustment period varies widely depending on the pet's background, personality, and your household. The '3-3-3 rule' suggests: 3 days to decompress, 3 weeks to learn routines, and 3 months to feel at home. Some pets adjust quickly, while others, especially those with trauma histories, may take longer."
                },
                {
                    question: "What resources are available for training and behavior issues?",
                    answer: "Many options exist: professional trainers, behavior consultants, veterinary behaviorists, online resources, books, classes, and apps. Your adoption organization may offer specific recommendations or resources. For serious behavior issues, consult professionals rather than trying to address them alone."
                }
            ]
        }
    ];

    const dogSpecificFaqs: FaqCategory[] = [
        {
            title: "Dog-Specific Adoption Questions",
            icon: <DogIcon fontSize="medium" />,
            faqs: [
                {
                    question: "What age dog should I adopt?",
                    answer: "The best age depends on your lifestyle and preferences. Puppies require more time, training, and supervision but offer the opportunity to shape their development. Adult dogs may already have some training and established personalities. Senior dogs often need less exercise and training but may have more health concerns."
                },
                {
                    question: "How do I choose the right breed for my lifestyle?",
                    answer: "Our platform provides detailed information about each dog, including breed characteristics, age, and health conditions. Consider factors like size, energy level, exercise needs, and grooming requirements. You can browse through our available dogs and read their rescue stories to get a better understanding of their personalities and needs."
                },
                {
                    question: "What should I know about adopting a rescue dog?",
                    answer: "Rescue dogs may have unknown backgrounds or past trauma that affects their behavior. They might need extra patience, training, and time to adjust to a new home. Our platform includes each dog's rescue story, giving you insight into their background. When you submit an adoption request, include your reason for adoption to help us ensure a good match."
                },
                {
                    question: "How much exercise does a dog need?",
                    answer: "Exercise needs vary greatly by breed, age, and individual. Working and sporting breeds typically need 1-2 hours of activity daily, while some toy breeds and seniors may need just 30 minutes. Mental stimulation through training and puzzle toys is also important. Discuss specific needs with the adoption organization."
                },
                {
                    question: "How does the dog breeding matchmaking work?",
                    answer: "Our dog breeding matchmaking follows a structured process: First, you select two dogs from our database. The system displays detailed information about each dog including breed, age, and health conditions. Our algorithm then calculates a compatibility score based on breed compatibility, age appropriateness, and health factors. If the dogs are deemed compatible, you can initiate the breeding process with guidance on timeline and expected outcomes. Each step is designed to ensure responsible breeding practices and healthy puppies."
                }
            ]
        },
        {
            title: "Buying vs. Adopting Dogs",
            icon: <ShoppingCartIcon fontSize="medium" />,
            faqs: [
                {
                    question: "Should I buy from a breeder or adopt from a shelter?",
                    answer: "Both options have merits. Adoption saves a life and is usually less expensive, but may offer less predictability in terms of breed, size, and temperament. Buying from a reputable breeder offers more predictability in health, appearance, and temperament, but costs more. Research thoroughly and avoid puppy mills and pet stores that source from them."
                },
                {
                    question: "How do I find a reputable breeder?",
                    answer: "Reputable breeders prioritize health and temperament over profit, provide clean living conditions, screen for genetic health issues, socialize puppies, and offer ongoing support. They welcome visits, ask you questions, provide health guarantees, and don't have multiple litters or breeds available. National breed clubs can provide referrals to responsible breeders."
                },
                {
                    question: "What questions should I ask a breeder?",
                    answer: "Ask about health testing for genetic conditions common in the breed, socialization practices, vaccination and deworming schedules, the parents' temperaments, and what support they offer after purchase. Request to see where the puppies are raised and meet at least the mother dog. A good breeder will also ask you many questions."
                },
                {
                    question: "What red flags should I watch for when buying a dog?",
                    answer: "Be wary of breeders who: have multiple breeds available, always have puppies, won't let you visit their facility, can't provide health clearances for parents, seem more interested in payment than your suitability, pressure you to decide quickly, or offer to ship puppies without meeting you. These may indicate a puppy mill or irresponsible breeding."
                }
            ]
        }
    ];

    const catSpecificFaqs: FaqCategory[] = [
        {
            title: "Cat-Specific Adoption Questions",
            icon: <CatIcon fontSize="medium" />,
            faqs: [
                {
                    question: "Should I adopt one cat or two?",
                    answer: "Many behavior experts recommend adopting two cats, especially if they'll be alone for long periods. Cats are social animals that benefit from feline companionship for play, grooming, and emotional support. Kittens particularly benefit from having a playmate to burn energy and learn appropriate behaviors. However, some cats prefer to be the only pet, so consider the individual cat's personality."
                },
                {
                    question: "What's the difference between adopting a kitten vs. an adult cat?",
                    answer: "Kittens require more supervision, training, and energy but allow you to shape their socialization. Adult cats have established personalities, making it easier to predict if they'll fit your lifestyle. They typically need less supervision and training. Senior cats are often the calmest and most appreciative of adoption but may have more health needs."
                },
                {
                    question: "How do I introduce a new cat to my home?",
                    answer: "Start by confining the new cat to one room with food, water, litter, and comfortable resting spots. This allows gradual adjustment to new sounds and smells. Slowly increase their access to the home as they show comfort. If introducing to other pets, use scent swapping, visual barriers, and supervised interactions to create positive associations."
                },
                {
                    question: "Should I adopt an indoor or outdoor cat?",
                    answer: "Most animal welfare organizations recommend keeping cats indoors or in secure outdoor enclosures. Indoor cats typically live longer, healthier lives without risks of traffic, predators, disease, or human cruelty. However, indoor cats need environmental enrichment through play, climbing opportunities, and mental stimulation to stay happy and healthy."
                },
                {
                    question: "How does the cat breeding matchmaking work?",
                    answer: "Our cat breeding matchmaking system follows the same structured process as for dogs: You select two cats from our database for comparison. The system shows you detailed information about each cat including breed, age, and health status. Our algorithm calculates a compatibility score based on breed compatibility, age difference, and health conditions. If the cats are compatible, you can proceed with the breeding process, receiving guidance on timeline, care requirements, and expected outcomes to ensure healthy kittens."
                }
            ]
        },
        {
            title: "Buying vs. Adopting Cats",
            icon: <ShoppingCartIcon fontSize="medium" />,
            faqs: [
                {
                    question: "What are the benefits of adopting a cat from a shelter?",
                    answer: "Shelter adoption saves lives, costs less than buying, and often includes spay/neuter surgery, vaccinations, and microchipping. Shelters can provide information about a cat's personality and behavior in various situations. Many shelter cats are already litter box trained and socialized, making the transition to your home easier."
                },
                {
                    question: "When might buying from a breeder be appropriate?",
                    answer: "Buying from a breeder might be appropriate if you're interested in a specific breed's characteristics, want to show cats, or need a cat with very specific traits (such as hypoallergenic qualities). However, many purebred cats also end up in shelters or breed-specific rescues, so adoption is still worth considering first."
                },
                {
                    question: "How do I find a reputable cat breeder?",
                    answer: "Reputable breeders prioritize health and temperament, provide excellent care, screen for genetic health issues, socialize kittens properly, and offer support throughout the cat's life. They should allow you to visit their cattery, which should be clean and spacious. They should also provide health guarantees and registration papers for purebred cats."
                },
                {
                    question: "What should I know about specific cat breeds?",
                    answer: "Different cat breeds have varying temperaments, energy levels, vocalization tendencies, grooming needs, and health predispositions. Research thoroughly before committing to a specific breed. Remember that individual personality varies within breeds, and many mixed-breed cats have excellent health and temperaments due to genetic diversity."
                }
            ]
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                bgcolor: 'background.default',
                minHeight: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                overflowX: 'hidden',
                position: 'absolute',
                left: 0,
                top: 0,
            }}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1400px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 4, md: 6 },
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Back button */}
                    <Button
                        component={RouterLink as any}
                        to="/"
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        sx={{
                            mb: 4,
                            fontWeight: 500,
                            color: 'primary.main',
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.04)
                            }
                        }}
                    >
                        Back to Home
                    </Button>

                    {/* Page Header */}
                    <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center', width: '100%' }}>
                        <Typography
                            variant={isMobile ? "h4" : "h3"}
                            component="h1"
                            sx={{
                                mb: 2,
                                fontWeight: 800,
                                color: 'primary.main',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            Pet Adoption, Buy, and Matchmaking FAQs
                        </Typography>
                    </Box>

                    {/* Header Image */}
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '220px', sm: '320px', md: '420px' },
                            mb: 5,
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={petType === 'dog' ? "/images/content-dog3.jpeg" : "/images/content-cat3.jpeg"}
                            alt={`${petType === 'dog' ? 'Dog' : 'Cat'} adoption FAQs`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                height: '70%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: { xs: 3, md: 5 }
                            }}
                        >
                            <Typography
                                variant={isMobile ? "h5" : "h4"}
                                component="h2"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    mb: 1
                                }}
                            >
                                Frequently Asked Questions
                            </Typography>
                            <Typography
                                variant={isMobile ? "body2" : "body1"}
                                sx={{
                                    color: 'white',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    maxWidth: '800px',
                                    opacity: 0.9
                                }}
                            >
                                Get answers to all the questions you haven't thought of for your {petType} adoption
                            </Typography>
                        </Box>
                    </Box>

                    {/* Subtitle and Tabs */}
                    <Box sx={{ mb: { xs: 5, md: 6 }, textAlign: 'center', width: '100%' }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '1.05rem', md: '1.25rem' },
                                maxWidth: '800px',
                                mx: 'auto',
                                px: 2,
                                mb: 5,
                                lineHeight: 1.6
                            }}
                        >
                            Find answers to common questions about pet adoption, buying, and our matchmaking process to help you make informed decisions.
                        </Typography>

                        {/* Pet Type Tabs */}
                        <Box
                            sx={{
                                maxWidth: 600,
                                mx: 'auto',
                                mb: 5,
                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                                borderRadius: 3,
                                p: 1
                            }}
                        >
                            <Tabs
                                value={petType}
                                onChange={handlePetTypeChange}
                                variant="fullWidth"
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        py: 1.5,
                                        color: 'text.primary',
                                        borderRadius: 2,
                                        transition: 'all 0.2s ease',
                                    },
                                    '& .Mui-selected': {
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        bgcolor: 'white',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
                                    },
                                    '& .MuiTabs-indicator': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <Tab
                                    icon={<DogIcon />}
                                    iconPosition="start"
                                    label="Dog Adoption FAQs"
                                    value="dog"
                                />
                                <Tab
                                    icon={<CatIcon />}
                                    iconPosition="start"
                                    label="Cat Adoption FAQs"
                                    value="cat"
                                />
                            </Tabs>
                        </Box>
                    </Box>

                    {/* Common FAQs Section */}
                    {commonFaqs.map((category, categoryIndex) => (
                        <Box key={categoryIndex} sx={{ mb: 6, width: '100%' }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    mb: 3,
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5
                                }}
                            >
                                {category.icon} {category.title}
                            </Typography>

                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    mb: 4,
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden'
                                }}
                            >
                                {category.faqs.map((faq, faqIndex) => (
                                    <Accordion
                                        key={faqIndex}
                                        disableGutters
                                        elevation={0}
                                        sx={{
                                            '&:not(:last-child)': {
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                            backgroundColor: faqIndex % 2 === 0 ? 'white' : alpha(theme.palette.primary.main, 0.02)
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                            sx={{
                                                px: { xs: 3, md: 4 },
                                                py: 2,
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                                }
                                            }}
                                        >
                                            <Typography fontWeight={600} sx={{ color: 'text.primary' }}>
                                                {faq.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ px: { xs: 3, md: 4 }, py: 3, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                                            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                                {faq.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Paper>
                        </Box>
                    ))}

                    {/* Pet-Specific FAQs */}
                    {(petType === 'dog' ? dogSpecificFaqs : catSpecificFaqs).map((category, categoryIndex) => (
                        <Box key={categoryIndex} sx={{ mb: 6, width: '100%' }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    mb: 3,
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5
                                }}
                            >
                                {category.icon} {category.title}
                            </Typography>

                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    mb: 4,
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'linear-gradient(90deg, #2563eb, #60a5fa)'
                                    }
                                }}
                            >
                                {category.faqs.map((faq, faqIndex) => (
                                    <Accordion
                                        key={faqIndex}
                                        disableGutters
                                        elevation={0}
                                        sx={{
                                            '&:not(:last-child)': {
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                            backgroundColor: faqIndex % 2 === 0 ? 'white' : alpha(theme.palette.primary.main, 0.02)
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                            sx={{
                                                px: { xs: 3, md: 4 },
                                                py: 2,
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                                }
                                            }}
                                        >
                                            <Typography fontWeight={600} sx={{ color: 'text.primary' }}>
                                                {faq.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ px: { xs: 3, md: 4 }, py: 3, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                                            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                                {faq.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Paper>
                        </Box>
                    ))}

                    {/* Still Have Questions Section */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                            mb: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        {/* Decorative elements */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                right: -20,
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.2), rgba(37, 99, 235, 0.2))',
                                zIndex: 0
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -30,
                                left: -30,
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.15), rgba(37, 99, 235, 0.15))',
                                zIndex: 0
                            }}
                        />

                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                    color: 'primary.dark'
                                }}
                            >
                                Still Have Questions?
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    maxWidth: '700px',
                                    mx: 'auto',
                                    color: 'text.secondary'
                                }}
                            >
                                Our team is here to help you with any additional questions about pet adoption, buying, or our matchmaking process. We're committed to helping you find the perfect pet companion.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Additional Resources Section */}
                    <Box sx={{ mb: 6, width: '100%' }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}
                        >
                            <InfoIcon fontSize="medium" /> Additional Resources
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        p: 4,
                                        height: '100%',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 700,
                                            color: 'primary.main'
                                        }}
                                    >
                                        Adoption Preparation
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'text.secondary',
                                            mb: 3,
                                            flexGrow: 1
                                        }}
                                    >
                                        Learn how to prepare your home and lifestyle for a new pet with our comprehensive checklists.
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        to="/adoption-checklist"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            alignSelf: 'flex-start'
                                        }}
                                    >
                                        View Checklist
                                    </Button>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        p: 4,
                                        height: '100%',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 700,
                                            color: 'primary.main'
                                        }}
                                    >
                                        Pet Age Calculator
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'text.secondary',
                                            mb: 3,
                                            flexGrow: 1
                                        }}
                                    >
                                        Understand your pet's age in human years and learn about life stage-specific care needs.
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        to="/pet-age-calculator"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            alignSelf: 'flex-start'
                                        }}
                                    >
                                        Calculate Pet Age
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
};

export default PetAdoptionFAQs;


