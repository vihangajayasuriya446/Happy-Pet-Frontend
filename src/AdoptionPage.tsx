// src/components/PetGrid.tsx
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Box, CircularProgress } from '@mui/material';
import AdoptionForm from './AdoptionForm';
import { fetchAvailablePets } from './petService';
import { Pet } from './types';

const PetGrid = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    useEffect(() => {
        const loadPets = async () => {
            try {
                setLoading(true);
                const availablePets = await fetchAvailablePets();
                setPets(availablePets);
                setError(null);
            } catch (err) {
                setError('Failed to load pets. Please try again later.');
                console.error('Error loading pets:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPets();
    }, []);

    const handleAdoptClick = (pet: Pet) => {
        setSelectedPet(pet);
    };

    const handleFormSubmit = (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }) => {
        // Here you would actually submit the adoption request to your backend
        console.log('Adoption Form Data:', formData);
        alert(`Thank you, ${formData.name}! Your adoption request for ${selectedPet?.pet_name} has been submitted.`);
        setSelectedPet(null); // Close the form after submission
    };

    const handleFormClose = () => {
        setSelectedPet(null); // Close the form
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
                <Button 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

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
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={pet.pet_id}>
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
                                    image={pet.image_url}
                                    alt={pet.pet_name}
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
                                        {pet.pet_name}
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
                                        {pet.pet_description || `Hi I am ${pet.pet_name}. I'm a ${pet.pet_age} year old ${pet.pet_breed} ${pet.pet_species.toLowerCase()}. If you'd like to adopt me, click the button below.`}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#555'
                                        }}
                                    >
                                        <strong>Age:</strong> {pet.pet_age} years
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#555'
                                        }}
                                    
                                    >
                                        <strong>Species:</strong> {pet.pet_species}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#555'
                                        }}
                                    >
                                        <strong>Breed:</strong> {pet.pet_breed}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 2,
                                            color: '#555'
                                        }}

                                        
                                    >
                                        <strong>Gender:</strong> {pet.pet_gender}
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
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography 
                            variant="h6" 
                            sx={{ textAlign: 'center', color: 'white', mt: 4 }}
                        >
                            No pets available for adoption at the moment.
                        </Typography>
                    </Grid>
                )}
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