import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChoosingRightBirdSpeciesArticle: FC = () => {
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
                        color: '#0288d1',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    SPECIES
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
                    Choosing the Right Bird Species
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
                    Learn which type of bird will be the best match for your living situation and lifestyle.
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
                    src="/images/bird-article2.jpeg"
                    alt="Various bird species showcase"
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
                        Finding Your Perfect Avian Companion
                    </Typography>

                    <Typography paragraph>
                        Birds make wonderful companions, but different species have distinct personalities, care requirements, and lifespans. Choosing the right bird can mean the difference between a rewarding relationship and a challenging mismatch.
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
                        Consider Your Lifestyle First
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(2, 136, 209, 0.05)',
                            border: '1px solid rgba(2, 136, 209, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Time commitment:</strong> Some birds require hours of interaction daily, while others are more independent.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Noise tolerance:</strong> Consider your living situation - apartments with thin walls may not be suitable for louder species.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Budget:</strong> Factor in ongoing costs for food, supplies, and veterinary care, which varies significantly by species.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Longevity:</strong> Many birds live surprisingly long lives—some parrots can live 50+ years. Consider whether a decades-long commitment fits your future plans.
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
                        Bird Species Overview
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(2, 136, 209, 0.05)',
                            border: '1px solid rgba(2, 136, 209, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#0288d1'
                            }}
                        >
                            Beginner-Friendly Birds
                        </Typography>
                        <Typography paragraph>
                            <strong>Budgerigars (Budgies/Parakeets):</strong> Small, colorful, and social birds that can learn to talk. They're relatively quiet and content with smaller cages, making them ideal for apartment living.
                        </Typography>
                        <Typography paragraph>
                            <strong>Cockatiels:</strong> Gentle and affectionate medium-sized birds that can whistle tunes. They're more hands-on than budgies but still manageable for first-time owners.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Finches & Canaries:</strong> These birds are more for watching than handling. They require minimal interaction and their soft chirping is pleasant and unlikely to disturb neighbors.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(2, 136, 209, 0.05)',
                            border: '1px solid rgba(2, 136, 209, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#0288d1'
                            }}
                        >
                            Intermediate Birds
                        </Typography>
                        <Typography paragraph>
                            <strong>Conures:</strong> These medium-sized parrots are playful and affectionate but can be quite vocal. Green-cheeked conures are generally quieter than sun conures.
                        </Typography>
                        <Typography paragraph>
                            <strong>Lovebirds:</strong> Small parrots with big personalities that form strong bonds with their caregivers. They require significant interaction if kept without another lovebird companion.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Parrotlets:</strong> Tiny birds with parrot-like personalities. They're quieter than many parrots but still need plenty of interaction and mental stimulation.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(2, 136, 209, 0.05)',
                            border: '1px solid rgba(2, 136, 209, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#0288d1'
                            }}
                        >
                            Advanced Birds
                        </Typography>
                        <Typography paragraph>
                            <strong>African Greys:</strong> Incredibly intelligent birds known for their talking ability and cognitive skills. They require significant mental stimulation and attention.
                        </Typography>
                        <Typography paragraph>
                            <strong>Amazons & Macaws:</strong> These larger parrots are loud, demanding, and require spacious housing. They can live for decades and need experienced caretakers.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Cockatoos:</strong> Known for being affectionate but extremely demanding of attention. They're prone to behavioral issues if their substantial social needs aren't met.
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
                        Adoption vs. Purchase
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(2, 136, 209, 0.05)',
                            border: '1px solid rgba(2, 136, 209, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 0 }}>
                            Consider adopting from rescue organizations where many birds, especially larger parrots, need loving homes. Rescues can often match you with a bird whose personality and needs align with your lifestyle. While rescue birds may come with behavioral challenges, experienced staff can guide you through these issues and the reward of giving a bird a second chance is immeasurable.
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
                        Remember that while species characteristics provide general guidelines, each bird is an individual with its own unique personality. Spend time interacting with different species before making your decision, and consider the bird's temperament as well as your lifestyle compatibility.
                    </Typography>

                    <Typography paragraph>
                        Taking the time to find the right avian match will lead to a rewarding relationship that could last for many years. The bond you can develop with your feathered companion is truly special and worth the careful consideration in selecting the appropriate species.
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
                                to="/bird-adoption-articles/preparing-your-home-for-a-new-bird"
                                sx={{
                                    display: 'block',
                                    color: '#0288d1',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#0277bd',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Preparing Your Home for a New Bird
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Essential tips for making your home safe and bird-friendly
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/understanding-bird-body-language"
                                sx={{
                                    display: 'block',
                                    color: '#0288d1',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#0277bd',
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
                                    color: '#0288d1',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#0277bd',
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

export default ChoosingRightBirdSpeciesArticle;