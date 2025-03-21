import React, { useState, useEffect } from "react";
import {
    Card,
    CardMedia,
    Typography,
    Button,
    Box,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress,
    Chip,
    Tooltip,
    Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useCart } from "../contexts/CartContext";
import { Pet } from "./types";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";

interface PetCardProps {
    pet: Pet & { enableContactOwner?: boolean };
    onAdopt?: () => void;
}

// Helper function to format price in LKR
const formatPriceLKR = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `LKR ${numericPrice.toFixed(0)}/=`;
};

// Helper function to derive pet type from breed
const derivePetTypeFromBreed = (breed: string): string => {
    if (!breed) return 'Pet';

    const breedLower = breed.toLowerCase();

    // Check for common dog breeds/terms
    if (breedLower.includes('dog') ||
        breedLower.includes('puppy') ||
        breedLower.includes('retriever') ||
        breedLower.includes('shepherd') ||
        breedLower.includes('terrier') ||
        breedLower.includes('bulldog') ||
        breedLower.includes('poodle') ||
        breedLower.includes('labrador') ||
        breedLower.includes('beagle') ||
        breedLower.includes('rottweiler')) {
        return 'Dog';
    }

    // Check for common cat breeds/terms
    if (breedLower.includes('cat') ||
        breedLower.includes('kitten') ||
        breedLower.includes('persian') ||
        breedLower.includes('siamese') ||
        breedLower.includes('bengal') ||
        breedLower.includes('ragdoll') ||
        breedLower.includes('maine coon') ||
        breedLower.includes('sphynx') ||
        breedLower.includes('british shorthair')) {
        return 'Cat';
    }

    // Check for other pet types
    if (breedLower.includes('bird') || breedLower.includes('parrot') || breedLower.includes('finch')) {
        return 'Bird';
    }

    // Default to the first word of the breed as a fallback
    const firstWord = breed.split(' ')[0];
    return firstWord || 'Pet';
};

const PetCard: React.FC<PetCardProps> = ({ pet, onAdopt }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart, loading } = useCart();
    const [resolvedImageUrl, setResolvedImageUrl] = useState<string>('');
    const [petType, setPetType] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);

    // Dark blue theme color for all pet types
    const themeColor = '#003366';

    // Resolve the image URL and determine pet type when component mounts
    useEffect(() => {
        // Get the correct image URL with fallback
        const imageSource = pet.imageUrl || pet.image || '/default-pet-image.jpg';

        // Log the image source for debugging
        console.log(`Resolving image for pet ${pet.id} (${pet.name}):`, {
            petImageUrl: pet.imageUrl,
            petImage: pet.image,
            resolved: imageSource
        });

        setResolvedImageUrl(imageSource);

        // Determine pet type from pet object or derive from breed
        // Use only petType property or derive from breed (removed the 'type' property reference)
        const type = pet.petType || derivePetTypeFromBreed(pet.breed);
        console.log(`Determined pet type for ${pet.name}: ${type}`);
        setPetType(type);
    }, [pet.imageUrl, pet.image, pet.id, pet.name, pet.petType, pet.breed]);

    // Updated to explicitly increment by 1
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Updated to explicitly decrement by 1
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (quantity > 0) {
            setIsAdding(true);
            try {
                console.log("Adding pet to bag with image:", {
                    petId: pet.id,
                    petName: pet.name,
                    imageUrl: resolvedImageUrl,
                    petType: petType,
                    quantity: quantity
                });

                // Pass the entire pet object with type information
                await addToCart({...pet, petType}, quantity);
                setSnackbarOpen(true);
                setQuantity(0);
            } catch (error) {
                console.error("Error adding to bag:", error);
            } finally {
                setIsAdding(false);
            }
        }
    };

    // Handler for "Contact the owner" button - updated to store pet type information
    const handleContactOwner = () => {
        // Store pet information in localStorage with pet type
        localStorage.setItem('selectedPet', JSON.stringify({
            id: pet.id,
            name: pet.name,
            breed: pet.breed,
            price: pet.price,
            gender: pet.gender,
            birthYear: pet.birthYear,
            imageUrl: resolvedImageUrl,
            petType: petType  // Include the determined pet type
        }));

        console.log(`Stored pet ${pet.name} in localStorage with type: ${petType}`);

        // Navigate to contact form
        navigate('/contact');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Quick add - adds 1 item directly to cart
    const handleQuickAdd = async () => {
        setIsAdding(true);
        try {
            console.log("Quick adding pet to bag with image:", {
                petId: pet.id,
                petName: pet.name,
                imageUrl: resolvedImageUrl,
                petType: petType
            });

            // Pass the entire pet object with type information
            await addToCart({...pet, petType}, 1);
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error adding to pet bag:", error);
        } finally {
            setIsAdding(false);
        }
    };

    // Calculate pet age safely
    const calculateAge = (): number => {
        const birthYear = typeof pet.birthYear === 'string'
            ? parseInt(pet.birthYear, 10)
            : pet.birthYear;

        return new Date().getFullYear() - birthYear;
    };

    // Preload the image to ensure it's cached
    useEffect(() => {
        if (resolvedImageUrl) {
            const img = new Image();
            img.src = resolvedImageUrl;
        }
    }, [resolvedImageUrl]);

    return (
        <Card
            sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: isHovered
                    ? `0 16px 32px ${alpha(themeColor, 0.15)}, 0 8px 16px ${alpha(themeColor, 0.1)}`
                    : '0 8px 16px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                maxWidth: '100%',
                width: '100%',
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                backgroundColor: '#ffffff',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: themeColor,
                    transition: 'height 0.3s ease',
                    opacity: isHovered ? 1 : 0.7,
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Price chip */}
            <Chip
                label={formatPriceLKR(pet.price)}
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '16px',
                    fontWeight: 600,
                    color: themeColor,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    border: `1px solid ${alpha(themeColor, 0.2)}`,
                    '& .MuiChip-label': {
                        px: 1.5
                    }
                }}
            />

            {/* Quick add button */}
            <Tooltip title="Add to bag" arrow placement="left">
                <IconButton
                    onClick={handleQuickAdd}
                    disabled={isAdding || loading}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        width: 40,
                        height: 40,
                        transition: 'all 0.3s ease',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-90deg)',
                        border: `1px solid ${alpha(themeColor, 0.2)}`,
                        '&:hover': {
                            bgcolor: alpha(themeColor, 0.1),
                            transform: 'scale(1.1) rotate(0deg)'
                        }
                    }}
                >
                    {isAdding ?
                        <CircularProgress size={20} sx={{ color: themeColor }} /> :
                        <ShoppingBagOutlinedIcon sx={{ color: themeColor }} />
                    }
                </IconButton>
            </Tooltip>

            {/* Image section */}
            <Box sx={{
                height: 220,
                overflow: 'hidden',
                width: '100%',
                position: 'relative'
            }}>
                <CardMedia
                    component="img"
                    height={220}
                    image={resolvedImageUrl}
                    alt={pet.name}
                    sx={{
                        objectFit: "cover",
                        transition: 'transform 0.7s ease',
                        width: '100%',
                        transform: isHovered ? 'scale(1.12)' : 'scale(1.05)',
                    }}
                    onError={(e) => {
                        console.error(`Image failed to load for pet ${pet.name}:`, resolvedImageUrl);
                        (e.target as HTMLImageElement).src = '/default-pet-image.jpg';
                        setResolvedImageUrl('/default-pet-image.jpg');
                    }}
                />
                {/* Gradient overlay */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background: `linear-gradient(to top, ${alpha(themeColor, 0.8)} 0%, transparent 100%)`,
                    opacity: isHovered ? 0.9 : 0.7,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1
                }} />

                {/* Pet name overlay */}
                <Typography
                    variant="h6"
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 16,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        zIndex: 2,
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                >
                    {pet.name}
                </Typography>
            </Box>

            {/* Content section - improved layout */}
            <Box sx={{
                p: 2.5,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}>
                {/* Pet details - cleaner layout */}
                <Box sx={{ mb: 1.5 }}>
                    {/* Type and breed with gender icon */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 0.75,
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: themeColor,
                                    fontSize: '1rem',
                                    mr: 0.75
                                }}
                            >
                                {petType}
                            </Typography>

                            {/* Gender icon */}
                            {pet.gender && pet.gender.toLowerCase() === "male" && (
                                <MaleIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                            )}
                            {pet.gender && pet.gender.toLowerCase() === "female" && (
                                <FemaleIcon sx={{ color: "#d81b60", fontSize: 18 }} />
                            )}
                        </Box>
                    </Box>

                    {/* Breed */}
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: '#555',
                            mb: 1.25
                        }}
                    >
                        {pet.breed}
                    </Typography>

                    {/* Subtle divider */}
                    <Divider sx={{ mb: 1.25, opacity: 0.6 }} />

                    {/* Age information */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',pl: 1,
                        width: '80%'  }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: themeColor,
                                    mr: 0.5
                                }}
                            >
                                Birth:
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#555'
                                }}
                            >
                                {new Date().getFullYear() - calculateAge()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: themeColor,
                                    mr: 0.5
                                }}
                            >
                                Age:
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#555'
                                }}
                            >
                                {calculateAge()} years
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Contact owner button */}
                {(pet.enableContactOwner !== false) && (
                    <Button
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        onClick={handleContactOwner}
                        fullWidth
                        sx={{
                            borderColor: alpha(themeColor, 0.5),
                            color: themeColor,
                            borderRadius: '12px',
                            padding: '8px 0',
                            fontWeight: 600,
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            mb: 1,
                            mr: 'auto',
                            width: '80%',
                            '&:hover': {
                                borderColor: themeColor,
                                backgroundColor: alpha(themeColor, 0.05),
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Contact the owner
                    </Button>
                )}

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Quantity controls and Add to Cart button */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    mt: 1

                }}>
                    {/* Quantity control */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: alpha(themeColor, 0.05),
                        borderRadius: '12px',
                        overflow: 'hidden',
                        width: '40%',
                        mr: 2,
                        height: 36,
                        border: `1px solid ${alpha(themeColor, 0.2)}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            boxShadow: `0 2px 8px ${alpha(themeColor, 0.2)}`
                        }
                    }}>
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            disabled={quantity === 0 || isAdding || loading}
                            sx={{
                                color: quantity === 0 ? alpha(themeColor, 0.3) : themeColor,
                                padding: '6px',
                                ml: 0.5,
                                width: '20px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{
                            px: 2,
                            minWidth: '28px',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            color: themeColor
                        }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            disabled={isAdding || loading}
                            sx={{
                                padding: '6px',
                                color: themeColor,
                                ml: -1.5,
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={onAdopt || handleAddToCart}
                        disabled={(!onAdopt && quantity === 0) || isAdding || loading}
                        sx={{
                            background: themeColor,
                            '&:hover': {
                                background: '#00264d',
                                boxShadow: `0 6px 12px ${alpha(themeColor, 0.4)}`,
                                transform: 'translateY(-2px)'
                            },
                            '&.Mui-disabled': {
                                background: alpha(themeColor, 0.3),
                            },
                            height: 36,
                            ml: 0,
                            mr: 'auto',
                            width: 'auto',
                            px: 2,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            borderRadius: '10px',
                            textTransform: 'none',
                            boxShadow: `0 4px 8px ${alpha(themeColor, 0.25)}`,
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            minWidth: 'max-content',

                        }}
                    >
                        {isAdding ? (
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                        ) : (
                            onAdopt ? 'Adopt Now' : 'Select Me'
                        )}
                    </Button>
                </Box>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{
                        width: '100%',
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }}
                >
                    {pet.name} added successfully!
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default PetCard;