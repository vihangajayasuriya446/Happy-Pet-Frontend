import { FC } from 'react';
import {
    Box, Typography, Button, List, ListItem, ListItemIcon,
    ListItemText, Divider, Paper, Grid, useMediaQuery,
    ThemeProvider, createTheme, Tabs, Tab, alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CatIcon from '@mui/icons-material/Pets';

// Create a modern theme
const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 800,
            letterSpacing: '-0.5px',
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.25px',
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            lineHeight: 1.6,
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    palette: {
        primary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1d4ed8',
        },
        background: {
            default: '#f8fafc',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});

const ChecklistForNewPetLovers: FC = () => {
    // Now useMediaQuery will have access to the theme
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [petType, setPetType] = useState<'dog' | 'cat'>('cat');

    const handlePetTypeChange = (_: React.SyntheticEvent, newValue: 'dog' | 'cat') => {
        setPetType(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                bgcolor: 'background.default',
                minHeight: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                overflowX: 'hidden',
                position: 'absolute',
                left: 0,
                top: 0,
            }}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1400px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 4, md: 6 },
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Back button */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant="text"
                            sx={{
                                mb: 4,
                                fontWeight: 500,
                                color: 'primary.main',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                }
                            }}
                        >
                            Back to Home
                        </Button>
                    </Link>

                    {/* Page Header - Moved before the image */}
                    <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center', width: '100%' }}>
                        <Typography
                            variant={isMobile ? "h4" : "h3"}
                            component="h1"
                            sx={{
                                mb: 2,
                                fontWeight: 800,
                                color: 'primary.main',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            Checklist for New Pet Lovers
                        </Typography>
                    </Box>

                    {/* Header Image - Modernized with rounded corners and subtle shadow */}
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '220px', sm: '320px', md: '420px' },
                            mb: 5,
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                            position: 'relative'
                        }}
                    >
                        <img
                            src="/images/content-dog-cat1.jpeg"
                            alt="Dog and cat adoption checklist"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                height: '70%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: { xs: 3, md: 5 }
                            }}
                        >
                            <Typography
                                variant={isMobile ? "h5" : "h4"}
                                component="h2"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    mb: 1
                                }}
                            >
                                Pet Adoption Checklist
                            </Typography>
                            <Typography
                                variant={isMobile ? "body2" : "body1"}
                                sx={{
                                    color: 'white',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    maxWidth: '800px',
                                    opacity: 0.9
                                }}
                            >
                                Your guide to bringing home a new dog or cat
                            </Typography>
                        </Box>
                    </Box>

                    {/* Subtitle and Tabs - Modernized */}
                    <Box sx={{ mb: { xs: 5, md: 6 }, textAlign: 'center', width: '100%' }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '1.05rem', md: '1.25rem' },
                                maxWidth: '800px',
                                mx: 'auto',
                                px: 2,
                                mb: 5,
                                lineHeight: 1.6
                            }}
                        >
                            Make your pet adoption journey smooth and enjoyable with our comprehensive checklist.
                        </Typography>

                        {/* Pet Type Tabs - Modernized */}
                        <Box
                            sx={{
                                maxWidth: 600,
                                mx: 'auto',
                                mb: 5,
                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                                borderRadius: 3,
                                p: 1
                            }}
                        >
                            <Tabs
                                value={petType}
                                onChange={handlePetTypeChange}
                                variant="fullWidth"
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        py: 1.5,
                                        color: 'text.primary',
                                        borderRadius: 2,
                                        transition: 'all 0.2s ease',
                                    },
                                    '& .Mui-selected': {
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        bgcolor: 'white',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
                                    },
                                    '& .MuiTabs-indicator': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <Tab
                                    icon={<PetsIcon />}
                                    iconPosition="start"
                                    label="Dog Adoption"
                                    value="dog"
                                />
                                <Tab
                                    icon={<CatIcon />}
                                    iconPosition="start"
                                    label="Cat Adoption"
                                    value="cat"
                                />
                            </Tabs>
                        </Box>
                    </Box>

                    {/* Dog Content */}
                    {petType === 'dog' && (
                        <>
                            {/* Questions for Dog Adopters */}
                            <Box sx={{ mb: 5, width: '95%' }}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    <PetsIcon fontSize="medium" /> Questions for Dog Adopters
                                </Typography>

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        borderRadius: 4,
                                        mb: 5,
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        width: '100%'
                                    }}
                                >
                                    <List>
                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <PetsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Do you have enough space for a dog to exercise?</Typography>}
                                                secondary="Dogs need space to run and play. Consider your living situation and access to outdoor areas."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Can you commit to daily walks and exercise?</Typography>}
                                                secondary="Most dogs need daily walks and playtime to stay healthy and happy."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <HomeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Do you have time for training and socialization?</Typography>}
                                                secondary="Dogs need consistent training and socialization with other dogs and people."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>

                                {/* Dog Supplies Checklist */}
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    <ShoppingCartIcon fontSize="medium" /> Dog Supplies Checklist
                                </Typography>

                                <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: { xs: 3, md: 4 },
                                                height: '100%',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)'
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, #2563eb, #60a5fa)'
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
                                                Essential Dog Supplies
                                            </Typography>
                                            <List dense sx={{ pt: 0 }}>
                                                {[
                                                    'Food and water bowls',
                                                    'High-quality dog food',
                                                    'Collar with ID tag',
                                                    'Leash and harness',
                                                    'Dog bed',
                                                    'Crate or carrier',
                                                    'Dog toys (chew toys, balls)',
                                                    'Poop bags and holder'
                                                ].map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 1.2 }}>
                                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                                            <CheckCircleOutlineIcon sx={{ color: 'primary.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={item}
                                                            primaryTypographyProps={{
                                                                sx: { fontWeight: 500, color: 'text.primary' }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: { xs: 3, md: 4 },
                                                height: '100%',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)'
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, #2563eb, #60a5fa)'
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
                                                Dog-Specific Home Preparation
                                            </Typography>
                                            <List dense sx={{ pt: 0 }}>
                                                {[
                                                    'Secure fencing in yard',
                                                    'Dog-proof trash cans',
                                                    'Remove toxic plants',
                                                    'Install baby gates if needed',
                                                    'Create a designated potty area',
                                                    'Set up a feeding station',
                                                    'Find nearby dog parks',
                                                    'Research local dog trainers'
                                                ].map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 1.2 }}>
                                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                                            <CheckCircleOutlineIcon sx={{ color: 'primary.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={item}
                                                            primaryTypographyProps={{
                                                                sx: { fontWeight: 500, color: 'text.primary' }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )}

                    {/* Cat Content */}
                    {petType === 'cat' && (
                        <>
                            {/* Questions for Cat Adopters */}
                            <Box sx={{ mb: 5, width: '95%' }}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        display: 'flex',
                                        maxWidth: '90%',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    <CatIcon fontSize="medium" /> Questions for Cat Adopters
                                </Typography>

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        borderRadius: 4,
                                        mb: 5,
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        width: '100%'
                                    }}
                                >
                                    <List>
                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <CatIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Is your home safe for a curious cat?</Typography>}
                                                secondary="Cats are climbers and explorers. Make sure your home is cat-proofed for safety."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <HomeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Do you have space for litter boxes?</Typography>}
                                                secondary="The general rule is one litter box per cat, plus one extra, placed in quiet, accessible locations."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Can you provide mental stimulation and play?</Typography>}
                                                secondary="Cats need daily play and enrichment to stay mentally and physically healthy."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>

                                {/* Cat Supplies Checklist */}
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    <ShoppingCartIcon fontSize="medium" /> Cat Supplies Checklist
                                </Typography>

                                <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: { xs: 3, md: 4 },
                                                height: '100%',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)'
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, #2563eb, #60a5fa)'
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
                                                Essential Cat Supplies
                                            </Typography>
                                            <List dense sx={{ pt: 0 }}>
                                                {[
                                                    'Food and water bowls',
                                                    'High-quality cat food',
                                                    'Litter boxes',
                                                    'Cat litter',
                                                    'Litter scoop',
                                                    'Cat carrier',
                                                    'Scratching post or pad',
                                                    'Cat toys (wands, mice, balls)'
                                                ].map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 1.2 }}>
                                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                                            <CheckCircleOutlineIcon sx={{ color: 'primary.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={item}
                                                            primaryTypographyProps={{
                                                                sx: { fontWeight: 500, color: 'text.primary' }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: { xs: 3, md: 4 },
                                                height: '100%',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)'
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, #2563eb, #60a5fa)'
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
                                                Cat-Specific Home Preparation
                                            </Typography>
                                            <List dense sx={{ pt: 0 }}>
                                                {[
                                                    'Secure window screens',
                                                    'Remove toxic plants',
                                                    'Hide or secure electrical cords',
                                                    'Create vertical spaces for climbing',
                                                    'Set up cozy resting spots',
                                                    'Provide hiding places',
                                                    'Secure small items cats might swallow',
                                                    'Create a feeding station away from litter'
                                                ].map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 1.2 }}>
                                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                                            <CheckCircleOutlineIcon sx={{ color: 'primary.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={item}
                                                            primaryTypographyProps={{
                                                                sx: { fontWeight: 500, color: 'text.primary' }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )}

                    {/* First Week Checklist - Common for both */}
                    <Box sx={{ mb: 5, width: '100%' }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                paddingTop: 6
                            }}
                        >
                            <AccessTimeIcon fontSize="medium" /> First Week Checklist
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                                border: '1px solid',
                                borderColor: 'divider',
                                background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
                                <Grid item xs={12} md={6}>
                                    <List>
                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <MedicalServicesIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Schedule a veterinary check-up</Typography>}
                                                secondary="Establish care with your own veterinarian even if your pet was examined at the shelter."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <HomeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Allow gradual adjustment</Typography>}
                                                secondary="Give your pet time to explore at their own pace. Start with a small, quiet area."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <List>
                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <PetsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Establish a routine</Typography>}
                                                secondary="Consistent feeding times, walks, and play sessions help your pet feel secure."
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>

                                        <Divider variant="inset" component="li" sx={{ my: 1 }} />

                                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                            <ListItemIcon>
                                                <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={600} sx={{ mb: 0.5, fontSize: '1.05rem' }}>Start basic training</Typography>}
                                                secondary={petType === 'dog' ? "Begin teaching basic commands using positive reinforcement." : "Introduce litter box and scratching post usage."}
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.6 } }}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

                    {/* Call to Action*/}
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                            mb: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        {/* Decorative elements */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                right: -20,
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.2), rgba(37, 99, 235, 0.2))',
                                zIndex: 0
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -30,
                                left: -30,
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.15), rgba(37, 99, 235, 0.15))',
                                zIndex: 0
                            }}
                        />

                        {/* Content */}
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                    color: 'primary.dark',
                                    fontSize: { xs: '1.5rem', md: '1.75rem' }
                                }}
                            >
                                Ready to Find Your Perfect {petType === 'dog' ? 'Dog' : 'Cat'} Match?
                            </Typography>
                            <Typography
                                sx={{
                                    mb: 3,
                                    maxWidth: '700px',
                                    mx: 'auto',
                                    color: 'text.secondary',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6
                                }}
                            >
                                Now that you've reviewed the important considerations, take the next step in your pet adoption journey.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ChecklistForNewPetLovers;


