import React, { useState } from "react";
import { Box, Typography, Container, IconButton, Badge, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { CartProvider, useCart } from "./contexts/CartContext";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DrawerMenu from "./components/DrawerMenu";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import UserDetailsDashboard from "./components/UserDetailsDashboard";
import PetManagementDashboard from "./AddPetForm";

// Types definitions with gender field added
export interface Pet {
    id: number | string;
    name: string;
    breed: string;
    price: number | string;
    birthYear: number | string;
    petType: string;
    gender?: string;
    image?: string;
    imageUrl?: string;
    purchased?: boolean;
}

export interface CartItem {
    pet: Pet;
    quantity: number;
}

// New interface for contact requests
export interface ContactRequest {
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    message: string;
    date: string;
    petId: string | number;
    petName: string;
    petBreed: string;
    petType: string;
}

// AppContent component that uses the cart context
const AppContent: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery] = useState('');
    const [petType, setPetType] = useState<string>('all');
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const handlePetTypeChange = (event: SelectChangeEvent<string>) => {
        setPetType(event.target.value);
        console.log(`Pet type changed to: ${event.target.value}`);
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

            {/* Title Section with Shopping Bag Icon and Filters */}
            <Box
                sx={{
                    bgcolor: '#003366',
                    pt: { xs: 12, md: 16 },
                    pb: 3,
                    position: 'relative',
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    {/* Title and Filter in the same row */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 3, sm: 4 },
                        position: 'relative'
                    }}>
                        {/* Filters positioned on the left */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                position: { xs: 'static', sm: 'absolute' },
                                left: { xs: 'auto', sm: 25 },
                                top: '180%',
                                transform: { xs: 'none', sm: 'translateY(-50%)' },
                                order: { xs: 2, sm: 1 },
                                mt: { xs: 2, sm: 0 },
                                gap: 2
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    mr: 2,
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                Filter by:
                            </Typography>
                            {/* Pet Type Filter */}
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: 150,
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    }
                                }}
                            >
                                <Select
                                    value={petType}
                                    onChange={handlePetTypeChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Select pet type' }}
                                    sx={{
                                        color: '#003366',
                                        fontWeight: 600,
                                        '&:focus': {
                                            backgroundColor: 'white'
                                        }
                                    }}
                                >
                                    <MenuItem value="all">All Pets</MenuItem>
                                    <MenuItem value="dog">Dogs</MenuItem>
                                    <MenuItem value="cat">Cats</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Title in the center */}
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'common.white',
                                fontWeight: 800,
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontFamily: '"Nunito", sans-serif',
                                textAlign: 'center',
                                order: { xs: 1, sm: 2 },
                                mx: 'auto'
                            }}
                        >
                            Buy a Pet
                        </Typography>
                    </Box>

                    {/* Shopping Bag Icon positioned at the right edge */}
                    <IconButton
                        onClick={toggleCart}
                        sx={{
                            position: 'absolute',
                            right: { xs: -70, sm: -70, md: -70 },
                            top: { xs: 20, md: 15 },
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
                            <ShoppingBagIcon sx={{ color: '#003366' }} />
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
                        py: { xs: 2, md: 3 }
                    }}
                >
                    {/* Pet List Component without gender filter */}
                    <PetList searchQuery={searchQuery} petType={petType} />
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

// Create a ContactContext to share contact request data between components
export const ContactContext = React.createContext<{
    contactRequests: ContactRequest[];
    addContactRequest: (request: ContactRequest) => void;
}>({
    contactRequests: [],
    addContactRequest: () => {},
});

// ContactProvider component
export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

    const addContactRequest = (request: ContactRequest) => {
        setContactRequests(prev => [...prev, request]);
    };

    return (
        <ContactContext.Provider value={{ contactRequests, addContactRequest }}>
            {children}
        </ContactContext.Provider>
    );
};

// Main App component with routing
const App: React.FC = () => {
    return (
        <Router>
            <CartProvider>
                <ContactProvider>
                    <Routes>
                        <Route path="/" element={<AppContent />} />
                        <Route path="/contact-owner/:petId" element={<UserDetailsDashboard />} />
                        <Route path="/contact" element={<UserDetailsDashboard />} />
                        {/* Renamed component for clarity */}
                        <Route path="/admin/pets" element={<PetManagementDashboard />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </ContactProvider>
            </CartProvider>
        </Router>
    );
};

export default App;
