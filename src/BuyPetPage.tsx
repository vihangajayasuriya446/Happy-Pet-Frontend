import React, { useState } from "react";
import { Box, Typography, Container, FormControl, Select, MenuItem, SelectChangeEvent, Snackbar, Alert } from "@mui/material";

import PetList from "./components/PetList";
import DrawerMenu from "./components/DrawerMenu";
import Cart from "./components/Cart";

const BuyPetPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery] = useState('');
    const [petType, setPetType] = useState<string>('all');
    
   

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
            <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Cart open={cartOpen} onClose={toggleCart} />

            {/* White transparent box around heading and filter */}
            <Box
                sx={{
                    pt: { xs: 12, md: 16 },
                    pb: 3,
                    position: 'relative',
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    <Box sx={{
                        backgroundColor: 'rgba(249, 247, 247, 0.04)',
                        borderRadius: '12px',
                        p: 3,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.22)',
                        backdropFilter: 'blur(8px)',
                    }}>
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
                                        color: '#003366',
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
        color: 'black',
        fontWeight: 800,
        fontSize: { xs: '3rem', md: '4rem' },
        fontFamily: '"Nunito", sans-serif',
        textAlign: 'center',
        order: { xs: 1, sm: 2 },
        position: 'relative',
        display: 'inline-block',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: '25%', // This will start the underline at 25% of the text width
            bottom: '-10px', // Adjust this to position the underline properly
            width: '50%', // This will make the underline half the width of the text
            height: '3.5px', // Adjust thickness as needed
            backgroundColor: '#003366',
        }
    }}
>
    Buy a Pet
</Typography>

                            {/* Empty Box to maintain layout balance */}
                            <Box
                                sx={{
                                    width: { xs: '100%', sm: '150px' },
                                    order: { xs: 3, sm: 3 },
                                    mt: { xs: 2, sm: 0 }
                                }}
                            />
                        </Box>
                    </Box>
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