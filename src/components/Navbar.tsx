import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    toggleDrawer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDrawer }) => {
    return (
        <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", px: 2 }}>
            <Toolbar>
                <Box
                    component="img"
                    src="/images/logo.png"
                    alt="HappyPet Logo"
                    sx={{ height: 70, width: 70, mr: 2 }}
                />

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "#002855",
                        flexGrow: 1,
                        fontFamily: '"Nunito Sans", sans-serif',
                    }}
                >
                    HappyPet
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mx: 2,
                        cursor: "pointer",
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    Home
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mx: 2,
                        cursor: "pointer",
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    Services
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mx: 2,
                        cursor: "pointer",
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    About Us
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mx: 2,
                        cursor: "pointer",
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    Contact Us
                </Typography>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#f1f1f1",
                    p: "5px 10px",
                    borderRadius: "20px",
                    mx: 2
                }}>
                    <SearchIcon sx={{ color: "gray" }} />
                    <InputBase placeholder="search" sx={{ ml: 1 }} />
                </Box>

                <IconButton sx={{ ml: 2 }}><AccountCircleIcon /></IconButton>
                <IconButton onClick={toggleDrawer}><MenuIcon /></IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
