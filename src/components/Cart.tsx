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
    Badge,
    Divider,
    useMediaQuery,
    useTheme
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
    const itemCount = getItemCount();

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Calculate the total price of all items in the cart
    const getCartTotal = () => {
        return items.reduce((total, item) => {
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
        onClose();
    };

    const handleIncrement = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        updateQuantity(id, 'plus');
    };

    const handleDecrement = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const item = items.find(item => item.pet.id === id);
        if (item && item.quantity > 1) {
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

            {items.length === 0 ? (
                <Box sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh'
                }}>
                    <ShoppingCartIcon sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
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
                            const itemPrice = Number(item.pet.price);
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
                                            src={item.pet.image}
                                            alt={item.pet.name}
                                            variant="rounded"
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                mr: 2,
                                                borderRadius: 2,
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
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
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.pet.petType} • {item.pet.breed}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        display: 'block',
                                                        fontWeight: 'bold',
                                                        mt: 1,
                                                        color: '#003366'
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
                                        mr: isMobile ? 2 : 5,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        px: 0.5
                                    }}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleDecrement(item.pet.id, e)}
                                            disabled={item.quantity <= 1}
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
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Total:
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003366' }}>
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => clearCart()}
                                sx={{
                                    borderColor: '#999',
                                    color: '#666',
                                    borderRadius: 2,
                                    py: 1.2,
                                    '&:hover': {
                                        borderColor: '#666',
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
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: '#002244'
                                    }
                                }}
                            >
                                CHECKOUT NOW
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Drawer>
    );
};

export default Cart;
