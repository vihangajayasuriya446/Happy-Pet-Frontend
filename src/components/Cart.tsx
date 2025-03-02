import React, { useState } from "react";
import {
    Box, Typography, IconButton, Drawer, Button, List, ListItem, ListItemAvatar, Avatar,
    ListItemText, ListItemSecondaryAction, Badge, Divider, useMediaQuery, useTheme,
    CircularProgress, Snackbar, Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "../contexts/CartContext";
import { Pet } from "../App"; // Import the Pet type

// CartButton component
interface CartButtonProps {
    onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const { getItemCount, loading } = useCart();
    const itemCount = getItemCount();

    return (
        <Box sx={{ position: 'fixed', top: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 }, zIndex: 1100 }}>
            <IconButton
                color="inherit"
                aria-label="cart"
                onClick={onClick}
                disabled={loading}
                sx={{
                    bgcolor: 'white',
                    boxShadow: 3,
                    width: 48,
                    height: 48,
                    transition: 'transform 0.2s',
                    '&:hover': {
                        bgcolor: '#f5f5f5',
                        transform: 'scale(1.05)'
                    }
                }}
            >
                {loading ? (
                    <CircularProgress size={24} sx={{ color: '#003366' }} />
                ) : (
                    <Badge
                        badgeContent={itemCount}
                        color="primary"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#0066cc',
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        <ShoppingBagIcon  sx={{ color: '#003366' }} />
                    </Badge>
                )}
            </IconButton>
        </Box>
    );
};

// Cart component
interface CartProps {
    open: boolean;
    onClose: () => void;
}

// Helper function to ensure number type
const ensureNumber = (value: string | number): number => {
    if (typeof value === 'string') {
        return parseInt(value, 10);
    }
    return value;
};

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
    const { items, removeFromCart, updateQuantity, clearCart, loading, getCartTotal } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const getPetImageUrl = (pet: Pet): string => {
        // First check if imageUrl exists (from backend)
        if (pet.imageUrl && pet.imageUrl.trim() !== '') {
            // Check if the URL is already absolute (starts with http or https)
            if (pet.imageUrl.startsWith('http://') || pet.imageUrl.startsWith('https://')) {
                return pet.imageUrl;
            }

            // If it's a relative URL from the backend (starts with /api/v1/pets/images/)
            if (pet.imageUrl.startsWith('/api/v1/pets/images/')) {
                // Get the base URL of your API
                const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;
                return `${baseUrl}${pet.imageUrl}`;
            }

            // If it's just a filename, construct the full path
            return `${process.env.REACT_APP_API_URL || window.location.origin}/api/v1/pets/images/${pet.imageUrl}`;
        }

        // Then check if image exists (from frontend)
        if (pet.image && typeof pet.image === 'string' && pet.image.trim() !== '') {
            return pet.image;
        }

        // Return a default image if neither exists
        return '/default-pet-image.jpg';
    };
    const handleCheckout = () => {
        // Just close the cart drawer
        onClose();

        // Optional: log for development purposes
        console.log("Checkout clicked, total:", getCartTotal().toFixed(2));
    };


    const handleIncrement = async (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        await updateQuantity(id, 'plus');
    };

    const handleDecrement = async (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        const idAsNumber = ensureNumber(id);
        const item = items.find(item => ensureNumber(item.pet.id) === idAsNumber);
        if (item && item.quantity > 1) {
            await updateQuantity(id, 'minus');
        }
    };

    const handleRemove = async (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        await removeFromCart(id);
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: 450 },
                        bgcolor: '#ffffff',
                        boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2.5,
                    borderBottom: '1px solid #eee'
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#003366' }}>
                        Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="medium"
                        sx={{
                            color: '#666',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {loading ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px'
                    }}>
                        <CircularProgress sx={{ color: '#003366' }} />
                    </Box>
                ) : items.length === 0 ? (
                    <Box sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '60vh'
                    }}>
                        <ShoppingBagIcon  sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
                        <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'medium' }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                            Add some pets to get started!
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            sx={{
                                bgcolor: '#003366',
                                px: 4,
                                py: 1.2,
                                borderRadius: 2,
                                '&:hover': { bgcolor: '#002244' }
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <List sx={{
                            pt: 0,
                            maxHeight: 'calc(100vh - 200px)',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#c1c1c1',
                                borderRadius: '4px',
                            },
                        }}>
                            {items.map((item) => {
                                const itemPrice = typeof item.pet.price === 'string'
                                    ? parseFloat(item.pet.price)
                                    : item.pet.price;
                                const itemTotal = (itemPrice * item.quantity).toFixed(2);

                                return (
                                    <ListItem
                                        key={item.pet.id}
                                        sx={{
                                            py: 2.5,
                                            px: 3,
                                            transition: 'background-color 0.2s',
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={getPetImageUrl(item.pet)}
                                                alt={item.pet.name}
                                                variant="rounded"
                                                sx={{
                                                    width: 70,
                                                    height: 70,
                                                    mr: 2,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    {item.pet.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    {/* Fixed nested paragraph issue by adding component="span" */}
                                                    <Typography variant="body2" color="text.secondary" component="span">
                                                        {item.pet.petType} • {item.pet.breed}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        component="span"
                                                        sx={{
                                                            display: 'block',
                                                            fontWeight: 'bold',
                                                            mt: 1,
                                                            color: '#003366'
                                                        }}
                                                    >
                                                        LKR{itemPrice.toFixed(2)} × {item.quantity} = LKR{itemTotal}
                                                    </Typography>
                                                </>
                                            }
                                        />

                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mr: isMobile ? 2 : 5,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 1,
                                            px: 0.5
                                        }}>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleDecrement(item.pet.id, e)}
                                                disabled={item.quantity <= 1 || loading}
                                                sx={{
                                                    color: item.quantity <= 1 ? '#ccc' : '#666'
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>

                                            <Typography sx={{
                                                mx: 1.5,
                                                minWidth: '24px',
                                                textAlign: 'center',
                                                fontWeight: 'medium'
                                            }}>
                                                {item.quantity}
                                            </Typography>

                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleIncrement(item.pet.id, e)}
                                                disabled={loading}
                                                sx={{ color: '#666' }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={(e) => handleRemove(item.pet.id, e)}
                                                disabled={loading}
                                                sx={{
                                                    color: '#999',
                                                    '&:hover': {
                                                        color: '#f44336',
                                                        bgcolor: 'rgba(244,67,54,0.04)'
                                                    }
                                                }}
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                        <Divider sx={{ position: 'absolute', bottom: 0, left: 16, right: 16 }} />
                                    </ListItem>
                                );
                            })}
                        </List>

                        <Box sx={{
                            p: 3,
                            borderTop: '1px solid #eee',
                            position: 'sticky',
                            bottom: 0,
                            bgcolor: 'white',
                            boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Subtotal:
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    LKR{getCartTotal().toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Total:
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003366' }}>
                                    LKR{getCartTotal().toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => clearCart()}
                                    disabled={loading}
                                    sx={{
                                        borderColor: '#999',

                                        color: '#666',
                                        borderRadius: 2,
                                        py: 1.2,
                                        '&:hover': {
                                            borderColor: '#666',
                                            bgcolor: 'rgba(0,0,0,0.03)'
                                        }
                                    }}
                                >
                                    Clear Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    sx={{
                                        bgcolor: '#003366',
                                        borderRadius: 2,
                                        py: 1.2,
                                        '&:hover': {
                                            bgcolor: '#002244'
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} sx={{ color: 'white' }} />
                                    ) : (
                                        'Checkout'
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Drawer>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Cart;
