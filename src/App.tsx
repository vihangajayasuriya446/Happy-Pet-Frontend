// App.tsx
import React, { useState } from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { CartProvider } from "./contexts/CartContext";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DrawerMenu from "./components/DrawerMenu";
import Cart, { CartButton } from "./components/Cart";

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

            {/* Title and Cart Button Section */}
            <Box
                sx={{
                    bgcolor: '#003366',
                    pt: { xs: 12, md: 16 },
                    pb: 3,
                    px: 4,
                }}
            >
                <Container maxWidth="lg">
                    {/* Stack for horizontal layout with space between */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        {/* Cart icon on the left with explicit onClick prop */}
                        <Box>
                            <CartButton onClick={toggleCart} />
                        </Box>

                        {/* Title in the center */}
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'common.white',
                                fontWeight: 800,
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontFamily: '"Nunito", sans-serif',
                                flexGrow: 1,
                                textAlign: 'center'
                            }}
                        >
                            Buy a Pet
                        </Typography>

                        {/* Empty box for spacing */}
                        <Box sx={{ width: '40px' }} />
                    </Stack>
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
