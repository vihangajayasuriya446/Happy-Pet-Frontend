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
    Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmailIcon from "@mui/icons-material/Email";
import { useCart } from "../contexts/CartContext";
import { Pet } from "../App"; // Import from App instead of ./types
import { useNavigate } from "react-router-dom";

interface PetCardProps {
    pet: Pet & { enableContactOwner?: boolean }; // Extend Pet type to include enableContactOwner flag
    onAdopt?: () => void;
}

// Helper function to format price in LKR
const formatPriceLKR = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `LKR ${numericPrice.toFixed(0)}/=`;
};

const PetCard: React.FC<PetCardProps> = ({ pet, onAdopt }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart, loading } = useCart();

    // Store the resolved image URL in state to ensure consistency
    const [resolvedImageUrl, setResolvedImageUrl] = useState<string>('');

    // Resolve the image URL once when component mounts
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
    }, [pet.imageUrl, pet.image, pet.id, pet.name]);

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
                console.log("Adding pet to cart with image:", {
                    petId: pet.id,
                    petName: pet.name,
                    imageUrl: resolvedImageUrl,
                    quantity: quantity
                });

                // Pass the entire pet object
                await addToCart(pet, quantity);
                setSnackbarOpen(true);
                setQuantity(0);
            } catch (error) {
                console.error("Error adding to cart:", error);
            } finally {
                setIsAdding(false);
            }
        }
    };

    // Handler for "Contact the owner" button - updated to pass pet information
    const handleContactOwner = () => {
        navigate('/contact-owner/' + pet.id, {
            state: {
                petId: pet.id,
                petName: pet.name,
                petBreed: pet.breed,
                petPrice: pet.price,
                petImage: resolvedImageUrl
            }
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Quick add - adds 1 item directly to cart
    const handleQuickAdd = async () => {
        setIsAdding(true);
        try {
            console.log("Quick adding pet to cart with image:", {
                petId: pet.id,
                petName: pet.name,
                imageUrl: resolvedImageUrl
            });

            // Pass the entire pet object
            await addToCart(pet, 1);
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
        <Card sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '100%',
            width: '100%',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
            }
        }}>
            {/* Quick add button that appears on hover */}
            <Box sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                opacity: 0,
                transition: 'opacity 0.2s',
                '.MuiCard-root:hover &': {
                    opacity: 1
                },
                zIndex: 1
            }}>
                <IconButton
                    onClick={handleQuickAdd}
                    disabled={isAdding || loading}
                    sx={{
                        bgcolor: 'white',
                        boxShadow: 2,
                        '&:hover': {
                            bgcolor: '#f5f5f5',
                        }
                    }}
                >
                    {isAdding ? <CircularProgress size={24} /> : <AddIcon />}
                </IconButton>
            </Box>

            <Box sx={{
                backgroundColor: '#e0e0e0',
                height: 240,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                width: '100%'
            }}>
                <CardMedia
                    component="img"
                    height={240}
                    image={resolvedImageUrl}
                    alt={pet.name}
                    sx={{
                        objectFit: "cover",
                        transition: 'transform 0.3s ease-in-out',
                        width: '100%',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                    onError={(e) => {
                        console.error(`Image failed to load for pet ${pet.name}:`, resolvedImageUrl);
                        (e.target as HTMLImageElement).src = '/default-pet-image.jpg';
                        setResolvedImageUrl('/default-pet-image.jpg');
                    }}
                />
            </Box>

            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* Name and price on the same line - name first, price after - both with same styling */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                        sx={{ fontSize: '1.1rem' }} // Slightly reduced font size from h6 default
                    >
                        {pet.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                        sx={{ fontSize: '1.1rem' }} // Matching reduced font size
                    >
                        {formatPriceLKR(pet.price)}
                    </Typography>
                </Box>

                {/* Breed - darker gray and consistent size */}
                <Typography
                    sx={{
                        color: '#555555',
                        fontSize: '0.9rem',
                        mb: 0.5
                    }}
                >
                    {pet.breed}
                </Typography>

                {/* Gender - without icon, matching styling */}
                {pet.gender && (
                    <Typography
                        sx={{
                            color: '#555555',
                            fontSize: '0.9rem',
                            mb: 0.5
                        }}
                    >
                        {pet.gender}
                    </Typography>
                )}

                {/* Birth year - matching the breed styling */}
                <Typography
                    sx={{
                        color: '#555555',
                        fontSize: '0.9rem',
                        mb: 1
                    }}
                >
                    Birth {pet.birthYear} ({calculateAge()} years old)
                </Typography>

                {/* Contact owner button - only show if enableContactOwner is true or undefined (default behavior) */}
                {(pet.enableContactOwner !== false) && (
                    <>
                        <Button
                            variant="outlined"
                            startIcon={<EmailIcon />}
                            onClick={handleContactOwner}
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 2,
                                borderColor: '#003366',
                                color: '#003366',
                                '&:hover': {
                                    borderColor: '#002244',
                                    backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                }
                            }}
                        >
                            Contact the owner
                        </Button>
                        <Divider sx={{ my: 1 }} />
                    </>
                )}

                {/* Spacer to push controls to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Quantity controls and Add to Cart button with same height */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    width: '100%'
                }}>
                    {/* Quantity control box */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        overflow: 'hidden',
                        height: 36
                    }}>
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            disabled={quantity === 0 || isAdding || loading}
                            sx={{
                                color: quantity === 0 ? 'rgba(0,0,0,0.3)' : 'inherit',
                                padding: '4px'
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{
                            px: 2,
                            minWidth: '24px',
                            textAlign: 'center'
                        }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            disabled={isAdding || loading}
                            sx={{ padding: '4px' }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={onAdopt || handleAddToCart}
                        disabled={(!onAdopt && quantity === 0) || isAdding || loading}
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': { bgcolor: '#002244' },
                            '&.Mui-disabled': {
                                bgcolor: 'rgba(0,0,0,0.12)',
                            },
                            height: 36,
                            ml: 2,
                            px: 2,
                            fontSize: '0.875rem',
                            fontWeight: 600
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
                    sx={{ width: '100%' }}
                >
                    {pet.name} added successfully!
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default PetCard;
