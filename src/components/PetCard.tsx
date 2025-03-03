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
    CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../contexts/CartContext";
import { Pet } from "../App"; // Import Pet type from App.tsx

interface PetCardProps {
    pet: Pet;
}

// Helper function to format price in LKR
const formatPriceLKR = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `LKR ${numericPrice.toFixed(0)}/=`;
};

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
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
                // Create a complete pet object with image explicitly included
                const petWithImage = {
                    ...pet,
                    image: resolvedImageUrl,
                    imageUrl: resolvedImageUrl
                };

                console.log("Adding pet to cart with image:", {
                    petId: pet.id,
                    petName: pet.name,
                    imageUrl: resolvedImageUrl,
                    quantity: quantity
                });

                await addToCart(petWithImage, quantity);
                setSnackbarOpen(true);
                setQuantity(0); // Reset quantity after adding to cart
            } catch (error) {
                console.error("Error adding to cart:", error);
                // You could show an error snackbar here
            } finally {
                setIsAdding(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Quick add - adds 1 item directly to cart
    const handleQuickAdd = async () => {
        setIsAdding(true);
        try {
            // Create a complete pet object with image explicitly included
            const petWithImage = {
                ...pet,
                image: resolvedImageUrl,
                imageUrl: resolvedImageUrl
            };

            console.log("Quick adding pet to cart with image:", {
                petId: pet.id,
                petName: pet.name,
                imageUrl: resolvedImageUrl
            });

            await addToCart(petWithImage, 1);
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error adding to cart:", error);
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
                zIndex: 1 // Ensure button is clickable
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

            <CardMedia
                component="img"
                height={240}
                image={resolvedImageUrl}
                alt={pet.name}
                sx={{
                    objectFit: "cover",
                    transition: 'transform 0.3s ease-in-out',
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

            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Name and price on the same line - name first, price after */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {pet.name}
                    </Typography>
                    <Typography
                        color="primary"
                        sx={{
                            fontSize: '0.9rem', // Reduced font size for price
                            fontWeight: 600
                        }}
                    >
                        {formatPriceLKR(pet.price)}
                    </Typography>
                </Box>

                {/* Breed */}
                <Typography variant="body2" color="text.secondary">
                    {pet.breed}
                </Typography>

                {/* Birth year below breed - Changed "Born" to "Birth" */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                    Birth {pet.birthYear} ({calculateAge()} years old)
                </Typography>

                {/* Spacer to push controls to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Quantity controls and Add to Cart button with same height */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2
                }}>
                    {/* Quantity control box */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        overflow: 'hidden',
                        height: 36 // Explicit height
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

                    {/* Add to Cart button */}
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        disabled={quantity === 0 || isAdding || loading}
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': { bgcolor: '#002244' },
                            '&.Mui-disabled': {
                                bgcolor: 'rgba(0,0,0,0.12)',
                            },
                            height: 36, // Same height as quantity box
                            ml: 2,
                            px: 2,
                            fontSize: '0.875rem',
                            fontWeight: 600
                        }}
                    >
                        {isAdding ? (
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                        ) : (
                            'Add to Cart'
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
                    {pet.name} added to cart!
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default PetCard;
