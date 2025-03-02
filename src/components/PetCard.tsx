import React, { useState } from "react";
import {
    Card,
    CardMedia,
    Typography,
    Button,
    Box,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../contexts/CartContext";
import { Pet } from "../App"; // Import Pet type from App.tsx

interface PetCardProps {
    pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    const [quantity, setQuantity] = useState(0);
    const { addToCart } = useCart();

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

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(pet, quantity);
            setQuantity(0); // Reset quantity after adding to cart
        }
    };

    return (
        <Card sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
            }
        }}>
            <CardMedia
                component="img"
                height={240}
                image={pet.image}
                alt={pet.name}
                sx={{
                    objectFit: "cover",
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}
            />

            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Name and price on the same line - name first, price after */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {pet.name}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        ${pet.price}
                    </Typography>
                </Box>

                {/* Breed */}
                <Typography variant="body2" color="text.secondary">
                    {pet.breed}
                </Typography>

                {/* Birth year below breed */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                    Born {pet.birthYear}
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
                            disabled={quantity === 0}
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
                            sx={{ padding: '4px' }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* Add to Cart button */}
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        disabled={quantity === 0}
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
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default PetCard;
