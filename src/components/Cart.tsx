import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, IconButton, Drawer, Button, List, ListItem,
    Badge, Divider, useMediaQuery, useTheme,
    CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "../contexts/CartContext";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

// Define a type for the response from cart operations
interface CartOperationResponse {
    success: boolean;
    message: string;
}

// Define a CartPet type that can represent both versions of Pet
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
                        <ShoppingBagIcon sx={{ color: '#003366' }} />
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


// Cache for resolved image URLs to avoid repeated processing
const imageCache: Record<string, string> = {};

// Default fallback image path
const DEFAULT_IMAGE = '/default-pet-image.png';

// Helper function to get image with fallbacks for different formats
const getImageWithFallbacks = (
    baseImageUrl: string | undefined,
    petName: string = 'pet'
): string => {
    if (!baseImageUrl || baseImageUrl.trim() === '') {
        console.log(`Empty image URL for ${petName}, using default`);
        return DEFAULT_IMAGE;
    }

    // If URL already has an extension or is a full URL, use it as is
    if (
        baseImageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ||
        baseImageUrl.startsWith('http://') ||
        baseImageUrl.startsWith('https://') ||
        baseImageUrl.startsWith('/api/v1/pets/images/')
    ) {
        return baseImageUrl;
    }

    // Otherwise, assume it's just a base filename and we need to add path and extension
    const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;

    // Remove any trailing slashes from baseUrl
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

    // Clean up the image name (remove any path and extension)
    const imageName = baseImageUrl.split('/').pop()?.split('.')[0] || baseImageUrl;

    // Return the URL without extension - let the server determine the correct format
    return `${cleanBaseUrl}/api/v1/pets/images/${imageName}`;
};

// Helper function to extract gender from pet object
const extractGenderFromPet = (pet: CartPet): string => {
    // Check if gender property exists directly
    if (pet.gender) {
        return pet.gender;
    }

    // If gender doesn't exist, return "Unknown"
    return "Unknown";
};

// Helper function to determine pet type
const determinePetType = (pet: CartPet): string => {
    // First check if petType is already set
    if (pet.petType) {
        return pet.petType;
    }

    // Check for category property that might be used in API responses
    if (pet.category) {
        return pet.category;
    }

    // Check if there's a "type" field in the pet object
    if (pet.type) {
        return pet.type;
    }

    // Look for bird indicators in the breed or name
    if (pet.breed) {
        const breedLower = pet.breed.toLowerCase();
        if (
            breedLower.includes('parrot') ||
            breedLower.includes('amazon') ||
            breedLower.includes('canary') ||
            breedLower.includes('finch') ||
            breedLower.includes('bird') ||
            breedLower.includes('cockatiel') ||
            breedLower.includes('cockatoo') ||
            breedLower.includes('macaw')
        ) {
            return 'Bird';
        }
    }

    // Check name for bird indicators
    if (pet.name) {
        const nameLower = pet.name.toLowerCase();
        if (
            nameLower.includes('bird') ||
            nameLower.includes('parrot') ||
            nameLower.includes('tweet') ||
            nameLower.includes('wing')
        ) {
            return 'Bird';
        }
    }

    // If we have a description field, check that too
    if (pet.description) {
        const descLower = pet.description.toLowerCase();
        if (
            descLower.includes('bird') ||
            descLower.includes('parrot') ||
            descLower.includes('feather') ||
            descLower.includes('fly') ||
            descLower.includes('beak')
        ) {
            return 'Bird';
        }
    }

    // If we can't determine the type, return Unknown
    return 'Unknown';
};

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { items, removeFromCart, clearCart, loading, getCartTotal } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Toast state for notifications
    const [toast, setToast] = useState({
        open: false,
        message: '',
        type: 'success' as 'success' | 'error'
    });

    // State to track resolved image URLs
    const [resolvedImages, setResolvedImages] = useState<Record<string | number, string>>({});

    // Enhanced image handling function with pet type normalization - MODIFIED to use CartPet type
    const getPetImageUrl = (pet: CartPet): string => {
        const petId = pet.id.toString();

        // Return from cache if available
        if (imageCache[petId]) {
            return imageCache[petId];
        }

        // Normalize pet type if needed (this doesn't modify the original pet object)
        const petType = determinePetType(pet);

        // Debug log to check what image data is available
        console.log("Processing pet image for cart:", {
            id: pet.id,
            name: pet.name,
            petType: petType,
            imageUrl: pet.imageUrl,
            image: pet.image
        });

        let finalImageUrl = DEFAULT_IMAGE;

        // Check for image property first (from frontend)
        if (pet.image && typeof pet.image === 'string' && pet.image.trim() !== '') {
            finalImageUrl = getImageWithFallbacks(pet.image, pet.name);
        }
        // Then check for imageUrl (from backend)
        else if (pet.imageUrl && typeof pet.imageUrl === 'string' && pet.imageUrl.trim() !== '') {
            finalImageUrl = getImageWithFallbacks(pet.imageUrl, pet.name);
        }
        else {
            console.warn(`No image found for pet ${pet.name} (${petId}), using default`);
        }

        // Cache the result
        imageCache[petId] = finalImageUrl;

        console.log(`Resolved image URL for pet ${pet.name} (${pet.id}):`, finalImageUrl);
        return finalImageUrl;
    };

    // Handle image error with format fallbacks
    const handleImageError = useCallback((petId: string | number, petName: string) => {
        console.error(`Image failed to load for pet ${petName} (ID: ${petId})`);

        // Get the current URL that failed
        const currentUrl = imageCache[petId.toString()] || '';
        console.log(`Failed URL: ${currentUrl}`);

        // If the URL doesn't have a file extension, try different ones
        if (currentUrl && !currentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const baseUrl = currentUrl.split('?')[0]; // Remove any query parameters
            const baseUrlWithoutExt = baseUrl.replace(/\.[^/.]+$/, ''); // Remove any existing extension

            // Try with different extensions
            const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
            let extensionIndex = 0;

            const tryNextExtension = () => {
                if (extensionIndex >= extensions.length) {
                    // We've tried all extensions, use the default image
                    imageCache[petId.toString()] = DEFAULT_IMAGE;
                    setResolvedImages(prev => ({
                        ...prev,
                        [petId.toString()]: DEFAULT_IMAGE
                    }));
                    return;
                }

                const extension = extensions[extensionIndex++];
                const newUrl = `${baseUrlWithoutExt}${extension}`;

                console.log(`Trying URL with extension: ${newUrl}`);

                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Found working URL for ${petName}: ${newUrl}`);
                    imageCache[petId.toString()] = newUrl;
                    setResolvedImages(prev => ({
                        ...prev,
                        [petId.toString()]: newUrl
                    }));
                };
                img.onerror = () => {
                    console.log(`❌ URL failed: ${newUrl}`);
                    tryNextExtension();
                };
                img.src = newUrl;
            };

            // Start trying extensions
            tryNextExtension();
        } else {
            // If the URL already has an extension but still failed, use default
            imageCache[petId.toString()] = DEFAULT_IMAGE;
            setResolvedImages(prev => ({
                ...prev,
                [petId.toString()]: DEFAULT_IMAGE
            }));
        }
    }, []);

    // Preload and resolve all images when cart opens or items change
    useEffect(() => {
        if (open && items.length > 0) {
            const newResolvedImages: Record<string | number, string> = {};

            items.forEach(item => {
                // Use the item.pet as CartPet type
                const cartPet = item.pet as unknown as CartPet;
                const imageUrl = getPetImageUrl(cartPet);
                newResolvedImages[item.pet.id] = imageUrl;

                // Preload the image
                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Image for ${item.pet.name} loaded successfully: ${imageUrl}`);
                };
                img.onerror = () => {
                    console.error(`❌ Image for ${item.pet.name} failed to load: ${imageUrl}`);
                    handleImageError(item.pet.id, item.pet.name);
                };
                img.src = imageUrl;
            });

            setResolvedImages(newResolvedImages);
        }
    }, [open, items, handleImageError]);

   

    // Handle quantity increment without showing notifications
    
    // Handle quantity decrement without showing notifications
    

    const handleRemove = async (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            // Type assertion to fix the TypeScript error
            const result = await removeFromCart(id) as CartOperationResponse | undefined;

            // Show notification from backend or default message
            setToast({
                open: true,
                message: result?.message || 'Pet successfully removed ',
                type: result?.success !== false ? 'success' : 'error'
            });
        } catch (error) {
            console.error("Error removing pet :", error);
            setToast({
                open: true,
                message: 'Failed to remove pet',
                type: 'error'
            });
        }
    };

    // Handle clearing the cart with notifications
    const handleClearCart = async () => {
        try {
            // Type assertion to fix the TypeScript error
            const result = await clearCart() as CartOperationResponse | undefined;

            // Show notification from backend or default message
            setToast({
                open: true,
                message: result?.message || 'Pet bag cleared successfully',
                type: result?.success !== false ? 'success' : 'error'
            });
        } catch (error) {
            console.error("Error clearing pet bag:", error);
            setToast({
                open: true,
                message: 'Failed to clear pet bag',
                type: 'error'
            });
        }
    };

    // Close toast handler
    const closeToast = () => {
        setToast({ ...toast, open: false });
    };
    
  const handleClickto = () => {
    // Navigate to the about page
    navigate('/buy');
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
                        Selected Pets ({items.length} {items.length === 1 ? 'item' : 'items'})
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

                                // Cast to CartPet to avoid type errors
                                const cartPet = item.pet as unknown as CartPet;

                                // Get the image URL for this pet from resolved images or compute it
                                const imageUrl = resolvedImages[item.pet.id] || getPetImageUrl(cartPet);

                                // Determine pet type using our helper function
                                const petType = determinePetType(cartPet);

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
                                        {/* UPDATED: Using a custom layout with Box components instead of ListItemAvatar */}
                                        <Box sx={{
                                            display: 'flex',
                                            width: '100%',
                                            pr: isMobile ? 4 : 6 // Make room for the delete button
                                        }}>
                                            {/* Pet Image */}
                                            <Box
                                                component="img"
                                                src={imageUrl}
                                                alt={item.pet.name}
                                                sx={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: 2,
                                                    objectFit: 'cover',
                                                    bgcolor: '#e0e0e0',
                                                    mr: 2,
                                                    flexShrink: 0
                                                }}
                                                onError={() => {
                                                    // Set to default image on error
                                                    const imgElement = document.querySelector(`img[alt="${item.pet.name}"]`) as HTMLImageElement;
                                                    if (imgElement) imgElement.src = DEFAULT_IMAGE;
                                                    handleImageError(item.pet.id, item.pet.name);
                                                }}
                                            />

                                            {/* Pet Details */}
                                            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    {item.pet.name}
                                                </Typography>

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    {/* Pet type and breed - UPDATED to use our determinePetType function */}
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        {petType} • {item.pet.breed}
                                                    </Typography>

                                                    {/* Gender - Using the helper function */}
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        Gender: {extractGenderFromPet(cartPet)}
                                                    </Typography>

                                                    {/* Birth Year */}
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        Birth Year: {item.pet.birthYear || "Not specified"}
                                                        {item.pet.birthYear && ` (Age: ${new Date().getFullYear() - Number(item.pet.birthYear)} years)`}
                                                    </Typography>

                                                    {/* MODIFIED: Price information - reduced size */}
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

                                        {/* Quantity Controls */}
                                        {/* <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            right: isMobile ? 40 : 50,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
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
                                        </Box> */}

                                        {/* Delete Button */}
                                        <Box sx={{
                                            position: 'absolute',
                                            right: 12,
                                            top: '50%',
                                            transform: 'translateY(-50%)'
                                        }}>
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
                                        '&:hover': {
                                            borderColor: '#666',
                                            bgcolor: 'rgba(0,0,0,0.03)'
                                        }
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

            {/* Use the Toast component for notifications */}
            <Toast
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </>
    );
};

export default Cart;
