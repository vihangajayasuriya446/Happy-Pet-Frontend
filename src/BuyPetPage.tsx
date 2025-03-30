import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  FormControl, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  Snackbar, 
  Alert,
  styled
} from "@mui/material";
import { useCart } from "./contexts/CartContext";
import PetList from "./components/PetList";
import DrawerMenu from "./components/DrawerMenu";
import Cart from "./components/Cart";

const MainContentBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.58)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(8),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6),
    width: '95%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    borderRadius: '16px',
  },
}));

const FilterSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  minWidth: 180,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: '1px',
  },
  marginLeft: theme.spacing(2),
}));

const BuyPetPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery] = useState('');
    const [petType, setPetType] = useState<string>('all');
    const { getItemCount } = useCart();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const toggleCart = () => setCartOpen(!cartOpen);

    const handlePetTypeChange = (event: SelectChangeEvent<unknown>) => {
        setPetType(event.target.value as string);
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
            position: 'relative',
            padding: { xs: '48px 0', md: '96px 0' },
           
        }}>
            <DrawerMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Cart open={cartOpen} onClose={toggleCart} />

            <MainContentBox>
                {/* Header Section with increased padding */}
                <Box sx={{
                    mb: { xs: 4, md: 6 },
                    textAlign: 'center',
                    paddingTop: { xs: 2, md: 4 },
                }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontFamily: '"Nunito", sans-serif',
                            lineHeight: 1.3,
                            color: '#003366',
                            mb: { xs: 3, md: 4 },
                        }}
                    >
                        Discover Your Perfect Companion
                    </Typography>
                    
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                        paddingBottom: { xs: 2, md: 4 },
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#4a5568'
                            }}
                        >
                            Browse our selection of
                        </Typography>
                        <FormControl size="medium">
                            <FilterSelect
                                value={petType}
                                onChange={handlePetTypeChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select pet type' }}
                                sx={{
                                    color: '#2d3748',
                                    fontWeight: 600,
                                }}
                            >
                                <MenuItem value="all">All Pets</MenuItem>
                                <MenuItem value="dog">Dogs</MenuItem>
                                <MenuItem value="cat">Cats</MenuItem>
                                <MenuItem value="bird">Birds</MenuItem>
                                <MenuItem value="other">Other Animals</MenuItem>
                            </FilterSelect>
                        </FormControl>
                    </Box>
                </Box>

                {/* Pet List Section with adjusted padding */}
                <Box sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    padding: { xs: 1, md: 2 },
                    marginTop: { xs: 2, md: 4 },
                }}>
                    <PetList searchQuery={searchQuery} petType={petType} />
                </Box>
            </MainContentBox>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    bottom: { xs: 90, sm: 24 }
                }}
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