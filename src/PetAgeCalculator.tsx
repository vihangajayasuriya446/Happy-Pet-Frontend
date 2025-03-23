import React, { useState } from 'react';
import {
    Box, Typography, Button, List, ListItem, ListItemIcon,
    ListItemText, Paper, Grid, useMediaQuery,
    ThemeProvider, createTheme, Tabs, Tab, alpha,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CatIcon from '@mui/icons-material/Pets';
import DogIcon from '@mui/icons-material/Pets';

// Create a modern theme - same as ChecklistForNewPetLovers
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

interface PetBreedAge {
    breed: string;
    petAge: string;
    humanAge: string;
}

interface PetSizeCategory {
    sizeCategory: string;
    description: string;
    breeds: PetBreedAge[];
}

const PetAgeCalculator: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [petType, setPetType] = useState<'dog' | 'cat'>('dog');

    const handlePetTypeChange = (_: React.SyntheticEvent, newValue: 'dog' | 'cat') => {
        setPetType(newValue);
    };

    const dogSizeCategories: PetSizeCategory[] = [
        {
            sizeCategory: 'Toy Size Dogs',
            description: 'Up to 10 lbs.',
            breeds: [
                { breed: 'Chihuahua', petAge: '0-9 mths', humanAge: 'Younger than 15' },
                { breed: 'Japanese Chin', petAge: '10-11 mths', humanAge: 'Younger than 15' },
                { breed: 'Maltese', petAge: '1', humanAge: '15' },
                { breed: 'Manchester Terrier', petAge: '2', humanAge: '23' },
                { breed: 'Papillion', petAge: '3', humanAge: '28' },
                { breed: 'Pomeranian', petAge: '4', humanAge: '31' },
            ]
        },
        {
            sizeCategory: 'Small Size Dogs',
            description: '11-25 lbs.',
            breeds: [
                { breed: 'Beagle', petAge: '1', humanAge: '15' },
                { breed: 'Miniature Schnauzer', petAge: '2', humanAge: '23' },
                { breed: 'Shih Tzu', petAge: '3', humanAge: '28' },
                { breed: 'Cocker Spaniel', petAge: '4', humanAge: '32' },
            ]
        },
        {
            sizeCategory: 'Medium Size Dogs',
            description: '26-50 lbs.',
            breeds: [
                { breed: 'Border Collie', petAge: '1', humanAge: '15' },
                { breed: 'Bulldog', petAge: '2', humanAge: '24' },
                { breed: 'Australian Shepherd', petAge: '3', humanAge: '29' },
                { breed: 'Boxer', petAge: '4', humanAge: '34' },
            ]
        },
        {
            sizeCategory: 'Large Size Dogs',
            description: '51-100 lbs.',
            breeds: [
                { breed: 'Labrador Retriever', petAge: '1', humanAge: '15' },
                { breed: 'German Shepherd', petAge: '2', humanAge: '24' },
                { breed: 'Golden Retriever', petAge: '3', humanAge: '30' },
                { breed: 'Rottweiler', petAge: '4', humanAge: '35' },
            ]
        }
    ];

    const catAgeCategories: PetSizeCategory[] = [
        {
            sizeCategory: 'Domestic Cats',
            description: 'Common house cats',
            breeds: [
                { breed: 'Domestic Shorthair', petAge: '1', humanAge: '15' },
                { breed: 'Domestic Mediumhair', petAge: '2', humanAge: '24' },
                { breed: 'Domestic Longhair', petAge: '3', humanAge: '28' },
                { breed: 'Mixed Breed', petAge: '4', humanAge: '32' },
                { breed: 'Tabby', petAge: '5', humanAge: '36' },
                { breed: 'Calico', petAge: '6', humanAge: '40' },
            ]
        },
        {
            sizeCategory: 'Small Breed Cats',
            description: 'Under 10 lbs.',
            breeds: [
                { breed: 'Singapura', petAge: '1', humanAge: '15' },
                { breed: 'Cornish Rex', petAge: '2', humanAge: '24' },
                { breed: 'Devon Rex', petAge: '3', humanAge: '28' },
                { breed: 'Munchkin', petAge: '4', humanAge: '32' },
            ]
        },
        {
            sizeCategory: 'Medium Breed Cats',
            description: '10-15 lbs.',
            breeds: [
                { breed: 'Siamese', petAge: '1', humanAge: '15' },
                { breed: 'American Shorthair', petAge: '2', humanAge: '24' },
                { breed: 'Abyssinian', petAge: '3', humanAge: '28' },
                { breed: 'Bengal', petAge: '4', humanAge: '32' },
            ]
        },
        {
            sizeCategory: 'Large Breed Cats',
            description: 'Over 15 lbs.',
            breeds: [
                { breed: 'Maine Coon', petAge: '1', humanAge: '15' },
                { breed: 'Ragdoll', petAge: '2', humanAge: '24' },
                { breed: 'Norwegian Forest Cat', petAge: '3', humanAge: '28' },
                { breed: 'Siberian', petAge: '4', humanAge: '32' },
            ]
        }
    ];

    const factorsList = [
        'Breed',
        'Size',
        'Weight',
        'Activity level',
        'Diet',
        'Lifestyle',
        'Health',
        'Lifespan'
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
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
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
                    </Link>

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
                            How Old Is Your Pet in Human Years?
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
                            src={petType === 'dog' ? "/images/content-dog2.jpeg" : "/images/content-cat2.jpeg"}
                            alt={`${petType === 'dog' ? 'Dog' : 'Cat'} age calculator`}
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
                                {petType === 'dog' ? 'Dog' : 'Cat'} Age Calculator
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
                                Learn how to translate your {petType}'s age into human years
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
                            Understanding your pet's age in human years helps you provide better care throughout their life stages.
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
                                    label="Dog Age Calculator"
                                    value="dog"
                                />
                                <Tab
                                    icon={<CatIcon />}
                                    iconPosition="start"
                                    label="Cat Age Calculator"
                                    value="cat"
                                />
                            </Tabs>
                        </Box>
                    </Box>

                    {/* The Truth About Age Conversion */}
                    <Box sx={{ mb: 5, width: '95%' }}>
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
                            <AccessTimeIcon fontSize="medium" /> The Truth About {petType === 'dog' ? 'Dog' : 'Cat'} Age Conversion
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                mb: 5,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                border: '1px solid',
                                borderColor: 'divider',
                                width: '100%'
                            }}
                        >
                            <Typography paragraph>
                                {petType === 'dog'
                                    ? "Experts agree that the level of maturity a dog reaches in the first two years is similar to that of a 14-year-old human, but that is where the similarity ends. The age of a pup in dog years to human years depends on the following factors:"
                                    : "The old rule that one cat year equals seven human years is not accurate. Cats mature much more rapidly in their first few years of life, then the aging process slows down. A cat's age in human years depends on the following factors:"}
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                    <List dense>
                                        {factorsList.slice(0, 4).map((factor, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                    <FiberManualRecordIcon fontSize="small" color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={factor}
                                                    primaryTypographyProps={{
                                                        sx: { fontWeight: 500, color: 'text.primary' }
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <List dense>
                                        {factorsList.slice(4).map((factor, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                    <FiberManualRecordIcon fontSize="small" color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={factor}
                                                    primaryTypographyProps={{
                                                        sx: { fontWeight: 500, color: 'text.primary' }
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>

                            <Typography paragraph>
                                {petType === 'dog'
                                    ? "While most pet parents have been calculating their pup's dog to human years for the longest time, the method has no basis of truth and human years to dog years conversion is mostly just for entertainment. Just for fun, take a look at how old your dog might be in human years based on size and breed."
                                    : "The first year of a cat's life is equivalent to approximately 15 human years, while the second year adds about 9 more human years. After that, each additional cat year is equivalent to about 4 human years. This is just an estimate, as individual cats age differently based on genetics, environment, and care."}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Age Comparison Tables */}
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            paddingTop: 2
                        }}
                    >
                        <PetsIcon fontSize="medium" /> COMPARING AGE: {petType === 'dog' ? 'DOG' : 'CAT'} YEARS VS HUMAN YEARS
                    </Typography>

                    {(petType === 'dog' ? dogSizeCategories : catAgeCategories).map((category, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                mb: 4,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                border: '1px solid',
                                borderColor: 'divider',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)'
                                },
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
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PetsIcon fontSize="small" /> {category.sizeCategory}: {category.description}
                            </Typography>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.08) }}>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Breeds</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>{petType === 'dog' ? 'Dog' : 'Cat'} Age</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Human Age</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {category.breeds.map((breed, breedIndex) => (
                                            <TableRow key={breedIndex} sx={{
                                                '&:nth-of-type(odd)': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
                                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                                                transition: 'background-color 0.2s ease'
                                            }}>
                                                <TableCell>{breed.breed}</TableCell>
                                                <TableCell>{breed.petAge}</TableCell>
                                                <TableCell>{breed.humanAge}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    ))}

                    {/* Why Understanding Pet Age Matters */}
                    <Box sx={{ mb: 5, width: '100%' }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                paddingTop: 3
                            }}
                        >
                            <AccessTimeIcon fontSize="medium" /> Why Understanding Pet Age Matters
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                border: '1px solid',
                                borderColor: 'divider',
                                background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                        Knowing your pet's approximate age in human years helps you better understand their life stage, health needs,
                                        and behavior. This knowledge allows you to provide age-appropriate care, nutrition, and exercise
                                        to ensure they live their happiest, healthiest life possible.
                                    </Typography>
                                    <Typography paragraph>
                                        Remember that these conversions are approximate. Different breeds and individual pets may age
                                        differently based on genetics, size, health conditions, and care quality.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

                    {/* Call to Action - Modified without the Chip button */}
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

                        {/* Content */}
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                    color: 'primary.dark',
                                    fontSize: { xs: '1.5rem', md: '1.75rem' }
                                }}
                            >
                                Want to Learn More About Your {petType === 'dog' ? 'Dog' : 'Cat'}?
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: '700px',
                                    mx: 'auto',
                                    color: 'text.secondary',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6
                                }}
                            >
                                Consult with your veterinarian about age-appropriate care for your {petType} at their specific life stage.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PetAgeCalculator;
