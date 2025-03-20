import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    Modal,
    useTheme,
    Skeleton,
    Collapse,
} from '@mui/material';
import AdoptionForm from './AdoptionForm';
import { fetchAvailablePets } from './petService';
import { Pet } from './types';
import { styled, alpha } from '@mui/system';
import PetsIcon from '@mui/icons-material/Pets';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styled Card with enhanced hover effects
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#ffffff',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
}));

// Gradient overlay for the pet image
const GradientOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(
        theme.palette.common.black,
        0.7
    )} 100%)`,
}));

const PetGrid = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [open, setOpen] = React.useState(false); // Modal open state
    const [expandedPetId, setExpandedPetId] = useState<string | null>(null); // Track expanded pet description

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

    // Toggle pet description visibility
    const toggleDescription = (petId: string) => {
        setExpandedPetId((prevId) => (prevId === petId ? null : petId));
    };

    if (loading) {
        return (
            <Box sx={{ padding: '2rem', maxWidth: '1500px', margin: '0 auto', paddingTop: '80px' }}>
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
                    {[...Array(8)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <StyledCard>
                                <Skeleton variant="rectangular" height={300} />
                                <CardContent>
                                    <Skeleton variant="text" width="60%" height={40} />
                                    <Skeleton variant="text" width="80%" height={20} />
                                    <Skeleton variant="text" width="80%" height={20} />
                                    <Skeleton variant="text" width="80%" height={20} />
                                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
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
                    mb: 2,
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
                                {/* Pet Image with Gradient Overlay */}
                                <Box sx={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                        image={`http://localhost:8080${pet.image_url}`}
                                        alt={pet.pet_name}
                                    />
                                    <GradientOverlay />
                                    {/* Pet Name Overlay */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            left: 16,
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        {pet.pet_name}
                                    </Typography>
                                </Box>

                                <CardContent>
                                    {/* Pet Details with Icons */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <CakeIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {pet.pet_age} years
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <PetsIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {pet.pet_breed}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        {pet.pet_gender.toLowerCase() === 'male' ? (
                                            <MaleIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                        ) : (
                                            <FemaleIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                        )}
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {pet.pet_gender}
                                        </Typography>
                                    </Box>

                                    {/* Pet Description */}
                                    <Box sx={{ mb: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="text"
                                            endIcon={
                                                expandedPetId === pet.pet_id.toString() ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                            }
                                            onClick={() => toggleDescription(pet.pet_id.toString())}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {expandedPetId === pet.pet_id.toString() ? 'Hide Description' : 'Read Description'}
                                        </Button>
                                        <Collapse in={expandedPetId === pet.pet_id.toString()}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontStyle: 'italic',
                                                    mt: 1,
                                                }}
                                            >
                                                {pet.pet_description ||
                                                    `Hi, I am ${pet.pet_name}. I'm a ${pet.pet_age} year old ${pet.pet_breed} ${pet.pet_species.toLowerCase()}. If you'd like to adopt me, click the button below.`}
                                            </Typography>
                                        </Collapse>
                                    </Box>

                                    {/* Adopt Button */}
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<FavoriteBorderIcon />}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#ffffff',
                                            borderRadius: '12px',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
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
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <img
                                src="/no-pets-illustration.svg" // Add a placeholder illustration
                                alt="No pets available"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <Typography
                                variant="h6"
                                sx={{ textAlign: 'center', color: 'white', mt: 2 }}
                            >
                                No pets available for adoption at the moment.
                            </Typography>
                        </Box>
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
                    width: { xs: '90%', sm: '400px' },
                    bgcolor: 'background.paper',
                    borderRadius: '16px',
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