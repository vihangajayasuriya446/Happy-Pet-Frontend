import React, { useState } from "react";
import { Box, Typography, Container, IconButton, Badge } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { CartProvider, useCart } from "./contexts/CartContext";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DrawerMenu from "./components/DrawerMenu";
import Cart from "./components/Cart";

// Types definitions
export interface Pet {
    id: number;
    name: string;
    breed: string;
    price: number;
    birthYear: number;
    petType: 'cat' | 'dog';
    image: string;
}

export interface CartItem {
    pet: Pet;
    quantity: number;
}

// AppContent component that uses the cart context
const AppContent: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery] = useState('');
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

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

            {/* Title Section with Shopping Bag Icon */}
            <Box
                sx={{
                    bgcolor: '#003366',
                    pt: { xs: 12, md: 16 },
                    pb: 3,
                    position: 'relative',
                }}
            >
                <Container maxWidth="lg" sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
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

                    {/* Shopping Bag Icon positioned at the right edge */}
                    <IconButton
                        onClick={toggleCart}
                        sx={{
                            position: 'absolute',
                            right: { xs: -70, sm: -70, md: -70 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: 3,
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                            },
                        }}
                    >
                        <Badge
                            badgeContent={itemCount}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.7rem',
                                    height: '20px',
                                    minWidth: '20px',
                                    padding: '0 4px',
                                }
                            }}
                        >
                            <ShoppingBagIcon sx={{ color: '#003366' }} /> {/* Changed to ShoppingBagIcon */}
                        </Badge>
                    </IconButton>
                </Container>
            </Box>

            {/* Main content */}
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
                    <PetList searchQuery={searchQuery} />
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
