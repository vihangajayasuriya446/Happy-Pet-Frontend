import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Badge,
    Drawer,
    Button,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DrawerMenu from "./components/DrawerMenu";
import { CartProvider, useCart } from "./contexts/CartContext";

// Add the Pet type definition
interface Pet {
    id: number;
    name: string;
    breed: string;
    price: number;
    birthYear: number;
    petType: string;
    image: string;
}

// Cart component to display selected pets
const Cart: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const { items, removeFromCart, updateQuantity } = useCart();

    // Calculate the total price of all items in the cart
    const getCartTotal = () => {
        return items.reduce((total, item) => total + (item.pet.price * item.quantity), 0).toFixed(2);
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
                    Shopping Cart
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            {items.length === 0 ? (
                <Box sx={{ p: 3 }}>
                    <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                        Your cart is empty
                    </Typography>
                </Box>
            ) : (
                <>
                    <List sx={{ pt: 0, maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
                        {items.map((item) => (
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
                                                ${item.pet.price} × {item.quantity}
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
                                        onClick={() => updateQuantity(item.pet.id, 'minus')}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>

                                    <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                                        {item.quantity}
                                    </Typography>

                                    <IconButton
                                        size="small"
                                        onClick={() => updateQuantity(item.pet.id, 'plus')}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => removeFromCart(item.pet.id)}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{
                        p: 3,
                        borderTop: '1px solid #eee',
                        position: 'sticky',
                        bottom: 0,
                        bgcolor: 'white',
                        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
                    }}>
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
                                onClick={onClose}
                                sx={{
                                    borderColor: '#000',
                                    color: '#000',
                                    '&:hover': {
                                        borderColor: '#000',
                                        bgcolor: 'rgba(0,0,0,0.04)'
                                    }
                                }}
                            >
                                CLOSE
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: '#000',
                                    '&:hover': {
                                        bgcolor: '#333'
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

// Here's the PetCard component with quantity controls
const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = React.useState(1);

    const handleAddToCart = () => {
        addToCart(pet, quantity);
        setQuantity(1); // Reset quantity after adding to cart
    };

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <Box sx={{
            border: '1px solid #ddd',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'white',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
            }
        }}>
            <Box
                component="img"
                src={pet.image}
                alt={pet.name}
                sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                }}
            />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {pet.breed} • Born {pet.birthYear}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        ${pet.price}
                    </Typography>

                    {/* Quantity selector */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        mr: 1
                    }}>
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            sx={{ p: 0.5 }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            sx={{ p: 0.5 }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': { bgcolor: '#002244' }
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// Modified AppContent component that uses the cart context
const AppContent: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(false);
    const searchQuery = React.useState('')[0];

    const { getItemCount } = useCart();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#003366',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Nunito Sans", sans-serif',
        }}>
            <Navbar toggleDrawer={toggleDrawer} />
            <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Cart open={cartOpen} onClose={toggleCart} />

            {/* Cart icon in the top right corner */}
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
                    onClick={toggleCart}
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

            <Box
                sx={{
                    bgcolor: '#003366',
                    pt: { xs: 12, md: 16 },
                    pb: 3,
                    px: 4,
                    position: 'relative',
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'common.white',
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '3rem' },
                            fontFamily: '"Nunito", sans-serif',
                        }}
                    >
                        Buy a Pet
                    </Typography>
                </Container>
            </Box>

            <Box
                sx={{
                    bgcolor: '#003366',
                    flex: 1,
                    width: '100%'
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        py: { xs: 4, md: 6 }
                    }}
                >
                    {/* We need to pass the PetCard component to PetList */}
                    <PetList searchQuery={searchQuery} PetCardComponent={PetCard} />
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

// Main App component that provides the cart context
const App: React.FC = () => {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    );
};

export default App;
