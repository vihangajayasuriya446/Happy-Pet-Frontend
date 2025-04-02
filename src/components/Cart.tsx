import React, { useState, useEffect,  } from "react";
import {
    Box, Typography, IconButton, Drawer, Button, List, ListItem,
    Badge as MuiBadge, Divider, useMediaQuery, useTheme,
    CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "../contexts/CartContext";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

interface CartOperationResponse {
    success: boolean;
    message: string;
}

interface CartPet {
    id: string | number;
    name: string;
    breed: string;
    birthYear?: number | string;
    petType?: string;
    price: number | string;
    imageUrl?: string;
    gender?: string;
    image?: string;
    category?: string;
    type?: string;
    description?: string;
}

const DEFAULT_IMAGE = '/default-pet-image.png';

export const CartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
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
                    <MuiBadge
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
                        <ShoppingBagIcon sx={{ color: '#003366' }} />
                    </MuiBadge>
                )}
            </IconButton>
        </Box>
    );
};

const Cart: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { items, removeFromCart, clearCart, loading, getCartTotal } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [toast, setToast] = useState({
        open: false,
        message: '',
        type: 'success' as 'success' | 'error'
    });

    const normalizeImageUrl = (url: string): string => {
        // Remove localhost prefix and any cache-busting query parameters
        return url.replace(/^http:\/\/localhost:\d+\//, '/')
                 .replace(/\?v=\d+$/, '');
    };

    const getImageUrl = (pet: CartPet): string => {
        // First try imageUrl if it exists
        if (pet.imageUrl && typeof pet.imageUrl === 'string' && pet.imageUrl.trim() !== '') {
            return normalizeImageUrl(pet.imageUrl);
        }
        
        // Then try image property if it exists
        if (pet.image && typeof pet.image === 'string' && pet.image.trim() !== '') {
            return normalizeImageUrl(pet.image);
        }
        
        // Fallback to default image
        return DEFAULT_IMAGE;
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        // Only set default image if current src isn't already the default
        if (!img.src.includes(DEFAULT_IMAGE)) {
            img.src = DEFAULT_IMAGE;
        }
        img.onerror = null; // Prevent infinite loop
    };

    const extractGenderFromPet = (pet: CartPet): string => {
        return pet.gender || "Unknown";
    };

    const determinePetType = (pet: CartPet): string => {
        if (pet.petType) return pet.petType;
        if (pet.category) return pet.category;
        if (pet.type) return pet.type;
        
        const lowerBreed = pet.breed?.toLowerCase() || '';
        const lowerName = pet.name?.toLowerCase() || '';
        const lowerDesc = pet.description?.toLowerCase() || '';

        if (lowerBreed.includes('bird') || lowerName.includes('bird') || lowerDesc.includes('bird') ||
            lowerBreed.includes('parrot') || lowerName.includes('parrot') || lowerDesc.includes('parrot')) {
            return 'Bird';
        }

        return 'Unknown';
    };

    useEffect(() => {
        const handleBeforeUnload = async () => {
            try {
                await clearCart();
            } catch (error) {
                console.error("Error clearing cart on page refresh:", error);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [clearCart]);

    const handleRemove = async (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const result = await removeFromCart(id) as CartOperationResponse | undefined;
            setToast({
                open: true,
                message: result?.message || 'Pet successfully removed',
                type: result?.success !== false ? 'success' : 'error'
            });
        } catch (error) {
            setToast({
                open: true,
                message: 'Failed to remove pet',
                type: 'error'
            });
        }
    };

    const handleClearCart = async () => {
        try {
            const result = await clearCart() as CartOperationResponse | undefined;
            setToast({
                open: true,
                message: result?.message || 'Pet bag cleared successfully',
                type: result?.success !== false ? 'success' : 'error'
            });
        } catch (error) {
            setToast({
                open: true,
                message: 'Failed to clear pet bag',
                type: 'error'
            });
        }
    };

    const closeToast = () => setToast({ ...toast, open: false });
    const handleClickto = () => navigate('/buy');

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
                        Selected Pets ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </Typography>
                    <IconButton onClick={onClose} size="medium" sx={{ color: '#666', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress sx={{ color: '#003366' }} />
                    </Box>
                ) : items.length === 0 ? (
                    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                        <ShoppingBagIcon sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
                        <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'medium' }}>
                            Your pet bag is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                            Find a furry friend to add!
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleClickto}
                            sx={{
                                bgcolor: '#003366',
                                px: 4,
                                py: 1.2,
                                borderRadius: 2,
                                '&:hover': { bgcolor: '#002244' }
                            }}
                        >
                            Find a Pet
                        </Button>
                    </Box>
                ) : (
                    <>
                        <List sx={{
                            pt: 0,
                            maxHeight: 'calc(100vh - 200px)',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': { width: '8px' },
                            '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
                            '&::-webkit-scrollbar-thumb': { background: '#c1c1c1', borderRadius: '4px' },
                        }}>
                            {items.map((item) => {
                                const itemPrice = typeof item.pet.price === 'string' ? parseFloat(item.pet.price) : item.pet.price;
                                const itemTotal = (itemPrice * item.quantity).toFixed(2);
                                const cartPet = item.pet as unknown as CartPet;
                                const imageUrl = getImageUrl(cartPet);
                                const petType = determinePetType(cartPet);
                                const birthYear = item.pet.birthYear ? Number(item.pet.birthYear) : null;
                                const age = birthYear ? new Date().getFullYear() - birthYear : null;

                                return (
                                    <ListItem
                                        key={item.pet.id}
                                        sx={{
                                            py: 2.5,
                                            px: 3,
                                            transition: 'background-color 0.2s',
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
                                            position: 'relative'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', width: '100%', pr: isMobile ? 4 : 6 }}>
                                            <Box
                                                component="img"
                                                src={imageUrl}
                                                alt={item.pet.name}
                                                onError={handleImageError}
                                                sx={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: 2,
                                                    objectFit: 'cover',
                                                    bgcolor: '#e0e0e0',
                                                    mr: 2,
                                                    flexShrink: 0
                                                }}
                                            />
                                            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    {item.pet.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        {petType} • {item.pet.breed}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        Gender: {extractGenderFromPet(cartPet)}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        Birth Year: {birthYear ? birthYear.toString() : "Not specified"}
                                                        {age !== null && ` (Age: ${age} years)`}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        component="div"
                                                        sx={{
                                                            display: 'block',
                                                            fontWeight: 'bold',
                                                            mt: 1,
                                                            color: '#003366',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        LKR {itemPrice.toFixed(2)} × {item.quantity} = LKR {itemTotal}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={(e) => handleRemove(item.pet.id, e)}
                                                disabled={loading}
                                                sx={{
                                                    color: '#999',
                                                    '&:hover': { color: '#f44336', bgcolor: 'rgba(244,67,54,0.04)' }
                                                }}
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Box>
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
                                    LKR {getCartTotal().toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Total:
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003366' }}>
                                    LKR {getCartTotal().toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleClearCart}
                                    disabled={loading}
                                    sx={{
                                        borderColor: '#999',
                                        color: '#666',
                                        borderRadius: 2,
                                        py: 1.2,
                                        '&:hover': { borderColor: '#666', bgcolor: 'rgba(0,0,0,0.03)' }
                                    }}
                                >
                                    Clear Bag
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate("/payment-home")}
                                    disabled={loading}
                                    sx={{
                                        bgcolor: '#003366',
                                        borderRadius: 2,
                                        py: 1.2,
                                        '&:hover': { bgcolor: '#002244' }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Checkout'}
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Drawer>
            <Toast open={toast.open} message={toast.message} type={toast.type} onClose={closeToast} />
        </>
    );
};

export default Cart;