import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PreparingHomeForCatArticle: FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Back button */}
            <Button
                startIcon={<ArrowBackIcon />}
                component={Link}
                to="/cat-adoption-articles"
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
                    Preparing Your Home for a New Cat
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
                    Essential tips for making your home safe, comfortable, and cat-friendly.
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
                    src="/images/cat-article1.jpeg"
                    alt="Cat in a prepared home environment"
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
                        Creating a Safe Space for Your New Feline Friend
                    </Typography>

                    <Typography paragraph>
                        Bringing a new cat home is an exciting experience, but it requires some preparation to ensure your home is both safe and welcoming. Cats are naturally curious and agile creatures that can access most areas of your home, so it's important to create an environment that allows them to thrive while preventing potential hazards.
                    </Typography>

                    <Typography paragraph>
                        This guide will help you prepare your living space before your new feline companion arrives, making the transition smoother for both of you.
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
                            Before Your Cat Arrives, Make Sure You Have:
                        </Typography>

                        <Typography paragraph>
                            <strong>Litter box and litter:</strong> Choose an appropriately sized litter box and quality cat litter. Many cats prefer unscented, clumping litter.
                        </Typography>

                        <Typography paragraph>
                            <strong>Food and water dishes:</strong> Ceramic or stainless steel dishes are best as they're easy to clean and don't harbor bacteria.
                        </Typography>

                        <Typography paragraph>
                            <strong>Quality cat food:</strong> Select age-appropriate food (kitten, adult, or senior) recommended by your veterinarian.
                        </Typography>

                        <Typography paragraph>
                            <strong>Comfortable bed:</strong> Provide a soft, warm place for your cat to sleep.
                        </Typography>

                        <Typography paragraph>
                            <strong>Scratching post or pad:</strong> Essential for claw maintenance and to protect your furniture.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Toys:</strong> Interactive toys, feather wands, and puzzle feeders help keep your cat mentally stimulated.
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
                        Cat-Proofing Your Home
                    </Typography>

                    <Typography paragraph>
                        Cats are curious explorers who can jump, climb, and squeeze into surprisingly small spaces. Take these precautions to keep your cat safe:
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
                            Secure Toxic Items
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Store household chemicals, medications, and toxic plants (like lilies, tulips, and azaleas) out of reach. Many common houseplants are toxic to cats, so research any plants in your home.
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
                            Eliminate Choking and Strangulation Hazards
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Secure or remove small items that could be swallowed, and tuck away blind cords, electrical cords, and strings that could entangle your cat.
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
                            Check for Escape Routes
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Ensure window screens are secure, repair any holes in walls or fencing, and be cautious when opening exterior doors. Consider using baby gates to restrict access to certain areas initially.
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
                        Creating a Comfortable Environment
                    </Typography>

                    <Typography paragraph>
                        Cats appreciate having options for resting, playing, and observing their surroundings:
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
                            <strong>Vertical space:</strong> Cats naturally enjoy climbing and perching up high. Consider cat trees, shelves, or window perches that allow your cat to observe from a safe vantage point.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Hiding spots:</strong> Provide cozy hiding places like covered beds or cardboard boxes where your cat can retreat when feeling overwhelmed.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Multiple resource stations:</strong> In multi-cat households, provide multiple feeding stations, water bowls, and litter boxes (the general rule is one per cat, plus one extra) in different locations.
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

                    <Typography paragraph>
                        When you first bring your cat home, start with a small, quiet space:
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
                            <strong>Set up a sanctuary room:</strong> Initially confine your new cat to one quiet room with all necessities (food, water, litter box, bed, toys). This helps them adjust without feeling overwhelmed.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Gradual exploration:</strong> Once your cat seems comfortable, allow access to the rest of your home gradually, one room at a time.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Patience is key:</strong> Some cats adjust quickly, while others may take weeks to feel secure. Let your cat set the pace for exploration.
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
                        Taking the time to properly prepare your home before bringing your new cat home will help ensure a smooth transition and set the foundation for a happy, healthy relationship. Remember that each cat has a unique personality, so be prepared to adjust your setup based on your cat's preferences and behaviors.
                    </Typography>

                    <Typography paragraph>
                        With proper preparation and patience, your new feline friend will soon feel right at home in their new environment.
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
                                to="/cat-adoption-articles/choosing-the-right-cat-breed"
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
                                Choosing the Right Cat Breed
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Find the perfect feline match for your lifestyle
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/understanding-cat-body-language"
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
                                Understanding Cat Body Language
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Learn what your cat is trying to tell you
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/essential-health-care-for-your-new-cat"
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
                                Essential Health Care for Your New Cat
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Keep your cat healthy with proper veterinary care
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default PreparingHomeForCatArticle;
