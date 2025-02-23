import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import AdoptionForm from './AdoptionForm';

const petData = [
    {
        name: 'Lal',
        text: 'Hi I am Lal. If you like to adopt me click the button below.',
        image: './src/assets/dog1.jpg'
    },
    {
        name: 'Bako',
        text: 'Hi I am Bako. If you like to adopt me click the button below.',
        image: './src/assets/dog2.jpg'
    },
    {
        name: 'Kumaa',
        text: 'Hi I am Kumaa. If you like to adopt me click the button below.',
        image: './src/assets/dog3.jpg'
    },
    {
        name: 'Nina',
        text: 'Hi I am Nina. If you like to adopt me click the button below.',
        image: './src/assets/cat1.jpg'
    },
    {
        name: 'Lora',
        text: 'Hi I am Lora. If you like to adopt me click the button below.',
        image: './src/assets/dog4.jpg'
    },
    {
        name: 'Vije',
        text: 'Hi I am Vije. If you like to adopt me click the button below.',
        image: './src/assets/cat2.jpg'
    },
    {
        name: 'Vega',
        text: 'Hi I am Vega. If you like to adopt me click the button below.',
        image: './src/assets/cat3.jpg'
    },
    {
        name: 'Rose',
        text: 'Hi I am Rosa. If you like to adopt me click the button below.',
        image: './src/assets/dog6.jpg'
    },
    {
        name: 'Kuku',
        text: 'Hi I am Kuku. If you like to adopt me click the button below.',
        image: './src/assets/dog5.jpg'
    },
    {
        name: 'Trinco',
        text: 'Hi I am Trinco. If you like to adopt me click the button below.',
        image: './src/assets/cat4.jpg'
    }
];

const PetGrid = () => {
    const [selectedPet, setSelectedPet] = useState<typeof petData[0] | null>(null);

    const handleAdoptClick = (pet: typeof petData[0]) => {
        setSelectedPet(pet);
    };

    const handleFormSubmit = (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }) => {
        console.log('Adoption Form Data:', formData);
        alert(`Thank you, ${formData.name}! Your adoption request for ${selectedPet?.name} has been submitted.`);
        setSelectedPet(null); // Close the form after submission
    };

    const handleFormClose = () => {
        setSelectedPet(null); // Close the form
    };

    return (
        <Box sx={{ 
            padding: '2rem', 
            maxWidth: '1500px', 
            margin: '0 auto', 
            paddingTop: '80px' // Add padding to avoid Navbar overlap
        }}>
            {/* Add "Adopt a Pet" Topic */}
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    mb: 4,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Responsive font size
                }}
            >
                Adopt a Pet
            </Typography>

            {/* Pet Grid */}
            <Grid container spacing={4}>
                {petData.map((pet) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pet.name}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            boxShadow: 3,
                            overflow: 'hidden'
                        }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: '200px',
                                    objectFit: 'cover',
                                    width: '100%'
                                }}
                                image={pet.image}
                                alt={pet.name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        color: '#003366',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    {pet.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        textAlign: 'justify',
                                        hyphens: 'auto'
                                    }}
                                >
                                    {pet.text}
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#003366',
                                        color: '#ffffff',
                                        '&:hover': { backgroundColor: '#002244' }
                                    }}
                                    onClick={() => handleAdoptClick(pet)}
                                >
                                    Adopt Me
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Adoption Form Popup */}
            {selectedPet && (
                <AdoptionForm
                    pet={selectedPet}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                />
            )}
        </Box>
    );
};

export default PetGrid;