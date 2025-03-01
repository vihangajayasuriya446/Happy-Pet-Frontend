import React, { useState, KeyboardEvent } from "react";
import {
    Box,
    Container,
    Typography,
    InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PetList from "./components/PetList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DrawerMenu from "./components/DrawerMenu";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(searchQuery);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: "20px",
                display: 'flex',
                alignItems: 'center',
                p: "5px 10px",
                width: '300px',
            }}
        >
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={{
                    ml: 1,
                    width: '100%',
                    fontFamily: '"Nunito Sans", sans-serif',
                }}
            />
        </Box>
    );
};

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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

            <Box
                sx={{
                    bgcolor: '#003366',
                    pt: { xs: 12, md: 14 },
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

                    <Box sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: { xs: 'none', md: 'block' }
                    }}>
                        <SearchBar
                            placeholder="Search for dogs or cats..."
                            onSearch={handleSearch}
                        />
                    </Box>
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
                    <PetList searchQuery={searchQuery} />
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

export default App;
