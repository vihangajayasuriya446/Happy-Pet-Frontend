import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UnderstandingBirdBodyLanguageArticle: FC = () => {
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
                    Understanding Bird Body Language
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
                    Learn to interpret what your bird is communicating through their posture, wings, and vocalizations.
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
                    src="/images/bird-article3.jpeg"
                    alt="Bird displaying body language"
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
                        The Silent Language of Birds
                    </Typography>

                    <Typography paragraph>
                        Birds may not speak our language, but they're constantly communicating through body postures, movements, and vocalizations. Learning to interpret these signals helps you understand your bird's emotional state, needs, and boundaries—creating a stronger bond and a happier, healthier pet.
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
                        Reading Your Bird's Eyes and Posture
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
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#388e3c' }}>
                            What Your Bird's Eyes Are Saying:
                        </Typography>

                        <Typography paragraph>
                            <strong>Pinning pupils:</strong> When a bird's pupils rapidly dilate and contract (pinning), it typically indicates excitement or heightened interest. However, combined with an aggressive posture, it can also signal that the bird feels threatened.
                        </Typography>

                        <Typography paragraph>
                            <strong>Half-closed eyes:</strong> A relaxed, content bird may perch with eyes partially closed. If your bird closes its eyes while you're petting it, that's a sign of trust and enjoyment.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Wide open, fixed stare:</strong> This often indicates fear or alertness. If accompanied by a rigid posture, your bird may be feeling threatened or nervous.
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
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#388e3c' }}>
                            Body Posture Indicators:
                        </Typography>

                        <Typography paragraph>
                            <strong>Relaxed stance:</strong> A content bird stands on one foot or both feet with feathers slightly fluffed, wings relaxed at sides, and tail feathers held loosely.
                        </Typography>

                        <Typography paragraph>
                            <strong>Crouching with head forward:</strong> This aggressive posture may precede lunging or biting, especially when combined with raised neck feathers.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Tail flicking or wagging:</strong> Depending on the species, this can indicate excitement, agitation, or simply that your bird is maintaining its balance.
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
                        Wing and Feather Communication
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
                            Wing Positions
                        </Typography>
                        <Typography paragraph>
                            <strong>Wing drooping:</strong> Slight drooping can indicate relaxation. However, pronounced drooping in a bird that normally keeps wings tightly against the body might indicate illness.
                        </Typography>
                        <Typography paragraph>
                            <strong>Wing spreading or flashing:</strong> Birds may spread their wings to appear larger when feeling territorial or threatened. However, a single wing spread might be simple stretching.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Wing flapping while perched:</strong> This often signals exercise or excitement, and in young birds, it helps develop flight muscles. Some birds also flap in place when they're especially happy to see you.
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
                            Feather Positions
                        </Typography>
                        <Typography paragraph>
                            <strong>Slicked feathers:</strong> When a bird presses its feathers tightly against its body, it's often feeling fearful or defensive.
                        </Typography>
                        <Typography paragraph>
                            <strong>Fluffed feathers:</strong> Slight puffing indicates contentment, but excessive fluffing (particularly when the bird appears lethargic) can signal illness as birds fluff up to conserve heat when sick.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Raised crest:</strong> In species with head crests (like cockatiels), a raised crest indicates alertness or excitement. A flattened crest might signal fear or aggression.
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
                        Vocalizations and Their Meanings
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
                            <strong>Soft chirping or singing:</strong> Generally indicates contentment. Many birds "talk" to themselves or their favorite humans with quiet chirps and whistles.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Loud, repetitive calling:</strong> Often signals distress, loneliness, or a desire for attention. In the wild, birds call loudly to locate flock members, and your pet may do the same when separated from you.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Clicking, hissing, or growling:</strong> These are warning sounds that indicate your bird feels threatened and may bite if approached. Always respect these signals and give your bird space.
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
                        Common Behaviors and What They Mean
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
                            <strong>Beak grinding:</strong> Light grinding of the beak often indicates contentment and relaxation, typically occurring when a bird is settling down to rest.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Head bobbing:</strong> In many species, particularly parrots, head bobbing can be a sign of excitement or playfulness. Young birds may bob their heads when begging for food.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Regurgitation:</strong> While sometimes concerning to new bird owners, regurgitation to another bird or even to you is a sign of affection and bonding. However, distinguish this from vomiting, which is a sign of illness.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Beak wiping:</strong> Birds often wipe their beaks on perches after eating to clean them. However, excessive beak wiping might indicate irritation around the face or beak.
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
                        Learning to interpret your bird's body language takes time and careful observation. Each bird has individual quirks and preferences, and you'll become more attuned to your pet's unique communication style as your relationship develops.
                    </Typography>

                    <Typography paragraph>
                        Always respect warning signals such as lunging, hissing, or pinning pupils with an aggressive posture. Forcing interaction with a bird that's communicating discomfort can damage trust and potentially result in bites.
                    </Typography>

                    <Typography paragraph>
                        By responding appropriately to your bird's signals, you'll build a trusting relationship and deepen your bond with your feathered companion.
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
                                to="/bird-adoption-articles/preparing-your-home-for-a-new-bird"
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

                        <Box>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/essential-health-care-for-your-new-bird"
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

export default UnderstandingBirdBodyLanguageArticle;