import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PreparingHomeForBirdArticle: FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Back button */}
            <Button
                startIcon={<ArrowBackIcon />}
                component={Link}
                to="/bird-adoption-articles"
                sx={{
                    mb: 4,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    py: 0.75,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
            >
                Back to Articles
            </Button>

            {/* Article Header */}
            <Box sx={{ mb: 5 }}>
                <Typography
                    variant="overline"
                    sx={{
                        display: 'inline-block',
                        mb: 1.5,
                        color: '#7b1fa2',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    PREPARATION
                </Typography>

                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        mb: 2.5,
                        fontWeight: 800,
                        lineHeight: 1.2
                    }}
                >
                    Preparing Your Home for a New Bird
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 0,
                        color: '#555',
                        fontSize: '1.1rem',
                        fontWeight: 400
                    }}
                >
                    Essential tips for making your home safe, comfortable, and bird-friendly.
                </Typography>
            </Box>

            {/* Featured Image */}
            <Box
                sx={{
                    mb: 5,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    position: 'relative'
                }}
            >
                <Box
                    component="img"
                    src="/images/bird-article1.jpeg"
                    alt="Bird in a prepared home environment"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.01)'
                        }
                    }}
                />
            </Box>

            {/* Article Content */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 5,
                pb: 6,
                maxWidth: '100%'
            }}>
                {/* Main Content */}
                <Box sx={{
                    flex: '1 1 70%',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: '#2a2a2a'
                }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 2.5,
                            fontWeight: 700,
                            color: '#333'
                        }}
                    >
                        Creating a Safe Space for Your New Avian Friend
                    </Typography>

                    <Typography paragraph>
                        Bringing a new bird home is exciting, but requires preparation to ensure your space is both safe and welcoming. Birds have sensitive respiratory systems and curious natures that need specific accommodations.
                    </Typography>

                    <Divider sx={{ my: 4, opacity: 0.6 }} />

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 2.5,
                            fontWeight: 700,
                            color: '#333'
                        }}
                    >
                        Essential Supplies Checklist
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(123, 31, 162, 0.05)',
                            border: '1px solid rgba(123, 31, 162, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#7b1fa2' }}>
                            Before Your Bird Arrives, Make Sure You Have:
                        </Typography>

                        <Typography paragraph>
                            <strong>Appropriately sized cage:</strong> Choose a cage large enough for your bird to stretch its wings fully. Bar spacing should be appropriate for your bird's size.
                        </Typography>

                        <Typography paragraph>
                            <strong>Varied perches:</strong> Natural wood perches of different diameters help prevent foot problems.
                        </Typography>

                        <Typography paragraph>
                            <strong>Food and water dishes:</strong> Stainless steel is easiest to keep clean and sanitized.
                        </Typography>

                        <Typography paragraph>
                            <strong>Species-appropriate food:</strong> Research your bird's specific dietary needs.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Toys and enrichment:</strong> Provide mental stimulation appropriate for your bird's size and behaviors.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4, opacity: 0.6 }} />

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: '#333'
                        }}
                    >
                        Bird-Proofing Your Home
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(123, 31, 162, 0.05)',
                            border: '1px solid rgba(123, 31, 162, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#7b1fa2'
                            }}
                        >
                            Eliminate Airborne Hazards
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Remove aerosol sprays, scented candles, air fresheners, and non-stick cookware. Keep your home smoke-free and avoid chemical cleaning products near your bird.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(123, 31, 162, 0.05)',
                            border: '1px solid rgba(123, 31, 162, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#7b1fa2'
                            }}
                        >
                            Create a Comfortable Environment
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Position the cage against a wall rather than in the center of a room. Keep it away from drafts, direct sunlight, and temperature fluctuations. Place the cage in a family area where the bird can observe activities while still having a quiet retreat.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4, opacity: 0.6 }} />

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 2.5,
                            fontWeight: 700,
                            color: '#333'
                        }}
                    >
                        The Introduction Process
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(123, 31, 162, 0.05)',
                            border: '1px solid rgba(123, 31, 162, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Quiet acclimation period:</strong> Allow your new bird a few days to adjust before handling. Keep the environment calm and quiet.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Gradual socialization:</strong> Begin by sitting near the cage and speaking softly. Progress to offering treats through the cage bars before attempting handling.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4, opacity: 0.6 }} />

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 2.5,
                            fontWeight: 700,
                            color: '#333'
                        }}
                    >
                        Conclusion
                    </Typography>

                    <Typography paragraph>
                        Taking the time to properly prepare your home will help ensure a smooth transition and lay the foundation for a healthy relationship with your bird. With the right setup and patience, your new feathered friend will soon feel right at home.
                    </Typography>
                </Box>

                {/* Sidebar */}
                <Box sx={{ flex: '1 1 30%' }}>
                    <Box sx={{
                        bgcolor: '#f8f9fa',
                        borderRadius: 3,
                        p: 3.5,
                        position: 'sticky',
                        top: 24,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid #eaeaea'
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                pb: 1.5,
                                borderBottom: '1px solid #e0e0e0',
                                fontWeight: 700,
                                fontSize: '1.1rem'
                            }}
                        >
                            Related Articles
                        </Typography>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/choosing-the-right-bird-species"
                                sx={{
                                    display: 'block',
                                    color: '#7b1fa2',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#6a1b9a',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Choosing the Right Bird Species
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Find the perfect avian match for your lifestyle
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/understanding-bird-body-language"
                                sx={{
                                    display: 'block',
                                    color: '#7b1fa2',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#6a1b9a',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Understanding Bird Body Language
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Learn what your bird is trying to tell you
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/essential-health-care-for-your-new-bird"
                                sx={{
                                    display: 'block',
                                    color: '#7b1fa2',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#6a1b9a',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Essential Health Care for Your New Bird
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Keep your bird healthy with proper veterinary care
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default PreparingHomeForBirdArticle;