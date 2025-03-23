import React, { useState } from "react";
import { Box, Typography, Container, IconButton, Badge, FormControl, Select, MenuItem, SelectChangeEvent, Snackbar, Alert } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "./contexts/CartContext";
import PetList from "./components/PetList";


import DrawerMenu from "./components/DrawerMenu";
import Cart from "./components/Cart";

const BuyPetPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery] = useState('');
    const [petType, setPetType] = useState<string>('all');
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

    // Handle snackbar messages
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Nunito Sans", sans-serif',
        }}>
            {/* Fix the Navbar component by checking its props requirements */}
            {/* If toggleDrawer is not a valid prop, remove it */}
            
            <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Cart open={cartOpen} onClose={toggleCart} />

            {/* Title Section with Shopping Bag Icon and Filters */}
            <Box
                sx={{
                    
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
                        justifyContent: 'space-between',
                        mb: { xs: 3, sm: 4 },
                        position: 'relative'
                    }}>
                        {/* Filters positioned on the left */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
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
                                    <MenuItem value="bird">Birds</MenuItem>
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
                            }}
                        >
                            Buy a Pet
                        </Typography>

                        {/* Empty Box to maintain layout balance (replacing the button) */}
                        <Box
                            sx={{
                                width: { xs: '100%', sm: '150px' },
                                order: { xs: 3, sm: 3 },
                                mt: { xs: 2, sm: 0 }
                            }}
                        />
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

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Operation successful!
                </Alert>
            </Snackbar>

           
        </Box>
    );
};

export default BuyPetPage;
