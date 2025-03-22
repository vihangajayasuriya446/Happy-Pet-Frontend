import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChoosingRightCatBreedArticle: FC = () => {
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
                        color: '#0288d1',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    BREEDS
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
                    Choosing the Right Cat Breed
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
                    Learn which type of cat will be the best match for your living situation and personality.
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
                    src="/images/cat-article2.jpeg"
                    alt="Various cat breeds showcase"
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
                        Finding Your Perfect Feline Companion
                    </Typography>

                    <Typography paragraph>
                        Cats make wonderful companions, but different breeds have different characteristics that can affect how well they'll fit into your lifestyle. From energetic and playful to calm and reserved, understanding breed traits can help ensure you and your new feline friend are a perfect match.
                    </Typography>

                    <Typography paragraph>
                        This guide will help you navigate the various cat breeds and their typical personality traits, care requirements, and compatibility with different living situations.
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

                    <Typography paragraph>
                        Before exploring specific breeds, take some time to honestly assess your lifestyle, living situation, and what you're looking for in a feline companion:
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
                            <strong>Activity level:</strong> How much time do you have to play and interact with your cat? Some breeds require more engagement and mental stimulation than others.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Living space:</strong> Do you live in a small apartment or a house with outdoor access? Some breeds need more space to roam.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Alone time:</strong> How many hours will your cat be home alone? Some breeds are more independent, while others need more companionship.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Other pets:</strong> Do you have other cats, dogs, or small pets? Some breeds are more sociable and adaptable to multi-pet households.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Grooming commitment:</strong> Are you willing to brush your cat daily? Long-haired breeds typically require more grooming.
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
                        Popular Cat Breeds and Their Characteristics
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
                            Active and Playful Breeds
                        </Typography>
                        <Typography paragraph>
                            <strong>Abyssinian:</strong> Athletic, curious, and highly intelligent. These cats love interactive play and exploring their environment. They're ideal for active households that can provide plenty of stimulation.
                        </Typography>
                        <Typography paragraph>
                            <strong>Bengal:</strong> With wild ancestry, Bengals are energetic, agile, and need plenty of exercise. They often enjoy water and require engaging toys and climbing opportunities.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Siamese:</strong> Vocal, social, and intelligent. Siamese cats form strong bonds with their humans and do best in homes where they'll receive lots of attention and interaction.
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
                            Relaxed and Gentle Breeds
                        </Typography>
                        <Typography paragraph>
                            <strong>Ragdoll:</strong> True to their name, these cats are docile and relaxed. They're typically good with children and other pets, making them perfect for family homes.
                        </Typography>
                        <Typography paragraph>
                            <strong>Persian:</strong> Calm, quiet, and affectionate, Persians enjoy a serene environment. Their long coats require daily grooming, so they're best for owners who enjoy this bonding routine.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>British Shorthair:</strong> Independent, easygoing, and low-maintenance. These sturdy cats adapt well to various living situations and don't demand constant attention.
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
                            Family-Friendly Breeds
                        </Typography>
                        <Typography paragraph>
                            <strong>Maine Coon:</strong> Gentle giants known for their friendly, dog-like personalities. They're patient with children and get along well with other pets.
                        </Typography>
                        <Typography paragraph>
                            <strong>American Shorthair:</strong> Adaptable, even-tempered, and moderately active. These cats are known for their hunting abilities and typically enjoy family life.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Birman:</strong> Affectionate, gentle, and sociable. Birmans form strong bonds with their families and are usually patient with children.
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
                        Don't Forget About Mixed-Breed Cats
                    </Typography>

                    <Typography paragraph>
                        Domestic shorthair and longhair cats (often found in shelters) can make wonderful companions with their diverse personalities and generally robust health.
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
                            <strong>Domestic Shorthair:</strong> The "mutts" of the cat world, these cats come in all colors, patterns, and personalities. Shelter staff can often help match you with one whose temperament suits your lifestyle.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Health benefits:</strong> Mixed-breed cats often have fewer genetic health issues than purebred cats.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Adult cats:</strong> Consider adopting an adult cat whose personality is already established, making it easier to find a good match.
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
                        Special Considerations
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
                            <strong>Allergies:</strong> If you or family members have allergies, consider breeds that produce fewer allergens, such as the Siberian, Balinese, or Russian Blue.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Budget:</strong> Consider not just the initial cost, but ongoing expenses for food, litter, toys, and veterinary care. Purebred cats often cost more to purchase and may have breed-specific health issues.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Longevity:</strong> Cats typically live 12-18 years, with some breeds living even longer. Make sure you're prepared for a long-term commitment.
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
                        Remember that while breed characteristics provide general guidelines, each cat is an individual with its own unique personality. Spend time interacting with a cat before bringing them home if possible, and be honest about what you're looking for in a companion.
                    </Typography>

                    <Typography paragraph>
                        Whether you choose a specific breed or adopt a wonderful mixed-breed cat from a shelter, taking the time to find the right match will lead to a rewarding relationship that can last for many years.
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
                                to="/cat-adoption-articles/preparing-your-home-for-a-new-cat"
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
                                Preparing Your Home for a New Cat
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Essential tips for making your home safe and cat-friendly
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/understanding-cat-body-language"
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

export default ChoosingRightCatBreedArticle;