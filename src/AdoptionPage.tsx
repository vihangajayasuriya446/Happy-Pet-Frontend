import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    CircularProgress,
    Modal,
    useTheme
} from '@mui/material';
import AdoptionForm from './AdoptionForm';
import { fetchAvailablePets } from './petService';
import { Pet } from './types';
import { styled } from '@mui/system';

// Styled Card for Hover Effect
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: Array.isArray(theme.shadows) && theme.shadows.length > 3 ? theme.shadows[3] : 'none',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: Array.isArray(theme.shadows) && theme.shadows.length > 5 ? theme.shadows[5] : 'none',
    },
}));

const PetGrid = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [open, setOpen] = React.useState(false); // Modal open state
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Access the theme
    const theme = useTheme();


    useEffect(() => {
        const loadPets = async () => {
            try {
                setLoading(true);
                const availablePets = await fetchAvailablePets();
                console.log("Fetched pets:", availablePets);
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
        handleOpen(); // Open the modal
    };

    const handleFormSubmit = (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }) => {
        console.log('Adoption Form Data:', formData);
        alert(`Thank you, ${formData.name}! Your adoption request for ${selectedPet?.pet_name} has been submitted.`);

        if (selectedPet) {
            setPets((prevPets) => prevPets.filter(pet => pet.pet_id !== selectedPet.pet_id));
        }

        setSelectedPet(null);
        handleClose(); // Close the modal after submission
    };

    const handleFormClose = () => {
        setSelectedPet(null);
        handleClose(); // Close the modal
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
            paddingTop: '80px'
        }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    mb: 4,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Adopt a Pet
            </Typography>

            <Grid container spacing={4}>
                {pets.filter(pet => pet.status !== 'Adopted').length > 0 ? (
                    pets.filter(pet => pet.status !== 'Adopted').map((pet) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={pet.pet_id}>
                            <StyledCard>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: '400px',
                                        objectFit: 'cover',
                                        width: '100%'
                                    }}
                                    image={`http://localhost:8080${pet.image_url}`}
                                    alt={pet.pet_name}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            color: theme.palette.primary.main, // Use primary color
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' } // Responsive font size
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
                                            hyphens: 'auto',
                                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, // Responsive font size
                                            color: theme.palette.text.secondary // Use theme's secondary text color
                                        }}
                                    >
                                        {pet.pet_description || `Hi I am ${pet.pet_name}. I'm a ${pet.pet_age} year old ${pet.pet_breed} ${pet.pet_species.toLowerCase()}. If you'd like to adopt me, click the button below.`}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary, // Use theme's secondary text color
                                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } // Responsive font size
                                        }}
                                    >
                                        <strong>Age:</strong> {pet.pet_age} years
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary, // Use theme's secondary text color
                                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } // Responsive font size
                                        }}
                                    >
                                        <strong>Species:</strong> {pet.pet_species}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary, // Use theme's secondary text color
                                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } // Responsive font size
                                        }}
                                    >
                                        <strong>Breed:</strong> {pet.pet_breed}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary, // Use theme's secondary text color
                                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } // Responsive font size
                                        }}
                                    >
                                        <strong>Gender:</strong> {pet.pet_gender}
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: theme.palette.primary.main, // Use primary color
                                            color: '#ffffff',
                                            '&:hover': { backgroundColor: theme.palette.primary.dark } // Use darker shade on hover
                                        }}
                                        onClick={() => handleAdoptClick(pet)}
                                    >
                                        Adopt Me
                                    </Button>
                                </CardContent>
                            </StyledCard>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="adoption-form-title"
                aria-describedby="adoption-form-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {selectedPet && (
                        <AdoptionForm
                            pet={selectedPet}
                            onClose={handleFormClose}
                            onSubmit={handleFormSubmit}
                        />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default PetGrid;
