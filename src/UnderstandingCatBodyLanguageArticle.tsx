import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UnderstandingCatBodyLanguageArticle: FC = () => {
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
                        color: '#388e3c',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    BEHAVIOR
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
                    Understanding Cat Body Language
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
                    Learn to interpret what your cat is communicating through their posture, tail, ears, and vocalizations.
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
                    src="/images/cat-article3.jpeg"
                    alt="Cat displaying body language"
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
                        The Silent Language of Cats
                    </Typography>

                    <Typography paragraph>
                        Cats may not speak our language, but they're constantly communicating with us through their body language. Understanding these subtle signals can help strengthen your bond with your feline friend and ensure their needs are being met.
                    </Typography>

                    <Typography paragraph>
                        Unlike dogs, cats can be more reserved in expressing their emotions, making their body language more nuanced and sometimes challenging to interpret. This guide will help you decode what your cat is trying to tell you.
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
                        The Ears: Windows to a Cat's Mood
                    </Typography>

                    <Typography paragraph>
                        A cat's ears are incredibly expressive and often provide the first clue about how they're feeling:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Forward-facing and upright:</strong> Your cat is alert, interested, and content. They're ready to engage with their environment in a positive way.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Slightly rotated to the side:</strong> Your cat is relaxed but still attentive to their surroundings. They're in a casual, comfortable state.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Flattened against the head:</strong> This is a sign of fear or aggression. Your cat is trying to protect their ears in anticipation of conflict.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Rapidly swiveling or twitching:</strong> Your cat is processing multiple sounds or is unsure about something in their environment. They may be slightly anxious or just highly focused.
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
                        The Tale of the Tail
                    </Typography>

                    <Typography paragraph>
                        A cat's tail movements are perhaps their most expressive form of body language:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#388e3c'
                            }}
                        >
                            Happy and Content Signals
                        </Typography>
                        <Typography paragraph>
                            <strong>Tail held high:</strong> When your cat walks with their tail straight up, it's a sign of confidence and contentment. If the tip of the tail quivers, they're especially happy to see you.
                        </Typography>
                        <Typography paragraph>
                            <strong>Gentle swaying:</strong> A slow, gentle movement from side to side usually indicates a relaxed, contented state.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Wrapped around you or another pet:</strong> This is the equivalent of a hug in cat language—a sign of affection and trust.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#388e3c'
                            }}
                        >
                            Warning and Distress Signals
                        </Typography>
                        <Typography paragraph>
                            <strong>Puffed-up tail:</strong> Your cat is trying to appear larger to intimidate a perceived threat. They're frightened but prepared to defend themselves if necessary.
                        </Typography>
                        <Typography paragraph>
                            <strong>Rapid back-and-forth swishing:</strong> Unlike a dog's wagging tail, this rapid movement signals agitation or irritation. Your cat may be getting overstimulated during play or petting.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Tail tucked down or between legs:</strong> Your cat is feeling insecure, submissive, or fearful of something in their environment.
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
                        Body Posture and What It Means
                    </Typography>

                    <Typography paragraph>
                        Your cat's overall body posture provides valuable insight into their emotional state:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Relaxed and stretched out:</strong> This vulnerable position shows that your cat feels safe and secure in their environment.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Arched back with fur standing up:</strong> Your cat is feeling threatened and trying to appear larger. Give them space until they calm down.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Crouched low to the ground:</strong> Your cat may be frightened or preparing to pounce, depending on other body language cues.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Lying on back with exposed belly:</strong> While this might look like an invitation for belly rubs, it's actually a sign of trust. Many cats will react defensively if you touch their exposed belly, as this is a vulnerable area.
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
                        Eyes: The Soul's Windows
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Slow blinking:</strong> Often called a "cat kiss," slow blinking is a sign of trust and affection. Try slow blinking back to communicate your love.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Dilated pupils:</strong> This can indicate excitement, fear, or playfulness, depending on the context. In low light, it's normal for pupils to dilate.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Constricted pupils:</strong> In normal lighting, this might indicate your cat is stimulated or agitated.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Half-closed eyes:</strong> Your cat is relaxed and content, possibly ready for a nap.
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
                        Vocalizations: When Actions Aren't Enough
                    </Typography>

                    <Typography paragraph>
                        While body language is a cat's primary form of communication, they also use various vocalizations to express themselves:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(56, 142, 60, 0.05)',
                            border: '1px solid rgba(56, 142, 60, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Purring:</strong> While usually associated with contentment, cats may also purr when they're in pain or distressed as a self-soothing mechanism.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Meowing:</strong> Adult cats rarely meow at each other—this vocalization is primarily used to communicate with humans. Different meows can signal greeting, demands for food or attention, or distress.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Chirping/chattering:</strong> Often observed when a cat spots prey through a window, this sound might be a sign of excitement or frustration.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Hissing/growling:</strong> These are clear warning signs that your cat feels threatened and may become aggressive if pushed further.
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
                        Putting It All Together
                    </Typography>

                    <Typography paragraph>
                        To accurately understand your cat's body language, it's important to look at all the cues together rather than focusing on just one signal. For example, a cat with a swishing tail might be agitated, but if they're also purring and rubbing against you, they're likely just excited.
                    </Typography>

                    <Typography paragraph>
                        With practice, you'll become more adept at reading your cat's specific communication style. Each cat has their own personality and may express emotions in slightly different ways, so paying close attention to your individual feline's patterns will help you understand them better.
                    </Typography>

                    <Typography paragraph>
                        Remember that respecting your cat's boundaries when they communicate discomfort or displeasure will help build trust and strengthen your relationship over time.
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
                                    color: '#388e3c',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#2e7d32',
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
                                Find the perfect feline companion for your lifestyle
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/preparing-your-home-for-a-new-cat"
                                sx={{
                                    display: 'block',
                                    color: '#388e3c',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#2e7d32',
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

                        <Box>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/essential-health-care-for-your-new-cat"
                                sx={{
                                    display: 'block',
                                    color: '#388e3c',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#2e7d32',
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

export default UnderstandingCatBodyLanguageArticle;