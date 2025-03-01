import React, { useState } from "react";
import {
    Card,
    CardMedia,
    Typography,
    Button,
    Box,
    IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../contexts/CartContext";

export interface Pet {
    id: number;
    name: string;
    breed: string;
    price: number;
    birthYear: number;
    petType: string;
    image: string;
}

interface PetCardProps {
    pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    const [quantity, setQuantity] = useState(0);
    const { addToCart } = useCart();

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
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
                sx={{ objectFit: "cover" }}
            />

            <Box sx={{ p: 2 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                }}>
                    <Typography variant="h6" fontWeight="bold">
                        {pet.name}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        ${pet.price}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    {pet.breed} • Born {pet.birthYear}
                </Typography>

                {/* Quantity controls */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 2
                }}>
                    <Typography variant="body2">
                        Quantity:
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            className="minus"
                            disabled={quantity === 0}
                            sx={{ color: quantity === 0 ? 'rgba(0,0,0,0.3)' : 'inherit' }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ px: 2 }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            className="plus"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={quantity === 0}
                    sx={{
                        bgcolor: '#003366',
                        '&:hover': { bgcolor: '#002244' },
                        '&.Mui-disabled': {
                            bgcolor: 'rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Card>
    );
};

export default PetCard;
