// components/Cart.tsx
import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Badge
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../contexts/CartContext";

// CartButton component
interface CartButtonProps {
    onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const { getItemCount } = useCart();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: { xs: 16, sm: 24 },
                right: { xs: 16, sm: 24 },
                zIndex: 1100,
            }}
        >
            <IconButton
                color="inherit"
                aria-label="cart"
                onClick={onClick}
                sx={{
                    bgcolor: 'white',
                    boxShadow: 2,
                    '&:hover': { bgcolor: '#f5f5f5' }
                }}
            >
                <Badge badgeContent={getItemCount()} color="error">
                    <ShoppingCartIcon sx={{ color: '#003366' }} />
                </Badge>
            </IconButton>
        </Box>
    );
};

// Cart component
interface CartProps {
    open: boolean;
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
    const { items, removeFromCart, updateQuantity, clearCart } = useCart();

    // Calculate the total price of all items in the cart
    const getCartTotal = () => {
        return items.reduce((total, item) => {
            // Safely get numeric price
            const price = Number(item.pet.price);
            const quantity = Number(item.quantity);
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    // Handle checkout process
    const handleCheckout = () => {
        // You would typically redirect to a checkout page or open a checkout modal
        alert(`Processing checkout for $${getCartTotal()}`);
        clearCart(); // Clear cart after checkout
    };

    // Updated handlers for increment/decrement
    const handleIncrement = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        // Find current item
        const item = items.find(item => item.pet.id === id);
        if (item) {
            // Increment quantity by 1
            updateQuantity(id, 'plus');
        }
    };

    const handleDecrement = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        // Find current item
        const item = items.find(item => item.pet.id === id);
        if (item && item.quantity > 1) {
            // Decrement quantity by 1
            updateQuantity(id, 'minus');
        }
    };

    const handleRemove = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        removeFromCart(id);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    bgcolor: '#ffffff',
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid #eee'
            }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            {items.length === 0 ? (
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
                    <ShoppingCartIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                        Add some pets to get started!
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': { bgcolor: '#002244' }
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <>
                    <List sx={{ pt: 0, maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
                        {items.map((item) => {
                            // Calculate item total price - safely convert to number
                            const itemPrice = Number(item.pet.price);
                            const itemTotal = (itemPrice * item.quantity).toFixed(2);

                            return (
                                <ListItem
                                    key={item.pet.id}
                                    divider
                                    sx={{ py: 2 }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={item.pet.image}
                                            alt={item.pet.name}
                                            variant="rounded"
                                            sx={{ width: 60, height: 60, mr: 1 }}
                                        />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                {item.pet.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.secondary" component="span">
                                                    {item.pet.petType} • {item.pet.breed}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: 'block',
                                                        fontWeight: 'bold',
                                                        mt: 0.5
                                                    }}
                                                >
                                                    ${itemPrice.toFixed(2)} × {item.quantity} = ${itemTotal}
                                                </Typography>
                                            </>
                                        }
                                    />

                                    {/* Quantity controls */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mr: 4
                                    }}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleDecrement(item.pet.id, e)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>

                                        <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                                            {item.quantity}
                                        </Typography>

                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleIncrement(item.pet.id, e)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={(e) => handleRemove(item.pet.id, e)}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
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
                        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1">
                                Subtotal:
                            </Typography>
                            <Typography variant="body1">
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">
                                Total:
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => clearCart()}
                                sx={{
                                    borderColor: '#666',
                                    color: '#666',
                                    '&:hover': {
                                        borderColor: '#444',
                                        bgcolor: 'rgba(0,0,0,0.04)'
                                    }
                                }}
                            >
                                CLEAR CART
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleCheckout}
                                sx={{
                                    bgcolor: '#003366',
                                    '&:hover': {
                                        bgcolor: '#002244'
                                    }
                                }}
                            >
                                CHECKOUT
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Drawer>
    );
};

export default Cart;
