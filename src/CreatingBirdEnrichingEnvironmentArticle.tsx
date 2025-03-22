import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreatingBirdEnrichingEnvironmentArticle: FC = () => {
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
                        color: '#f57c00',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    ENRICHMENT
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
                    Creating an Enriching Environment
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
                    How to provide mental stimulation and physical exercise for your companion bird.
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
                    src="/images/bird-article4.jpeg"
                    alt="Bird in an enriched environment"
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
                        Why Enrichment Matters for Birds
                    </Typography>

                    <Typography paragraph>
                        In the wild, birds spend their days flying, foraging, socializing, and problem-solving. Captive birds have the same physical and mental needs but limited opportunities to fulfill them. Environmental enrichment bridges this gap, preventing boredom and unwanted behaviors like feather plucking, excessive screaming, and aggression.
                    </Typography>

                    <Typography paragraph>
                        A properly enriched environment keeps your bird physically active, mentally stimulated, and emotionally satisfied—contributing to their overall health and happiness.
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
                        Cage Setup for Maximum Engagement
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#f57c00' }}>
                            Essential Elements of an Enriching Cage:
                        </Typography>

                        <Typography paragraph>
                            <strong>Strategic perch placement:</strong> Position perches at different heights and distances to encourage movement. Use various materials (natural wood, rope, cement) and diameters to exercise feet and prevent foot problems.
                        </Typography>

                        <Typography paragraph>
                            <strong>Multiple feeding stations:</strong> Spread food and water dishes throughout the cage to promote movement and mimic natural foraging behavior.
                        </Typography>

                        <Typography paragraph>
                            <strong>Cage positioning:</strong> Place the cage in a location where your bird can observe household activities while still having a quiet retreat. Provide partial coverage for security.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Rotation system:</strong> Regularly rotate toys and perches to maintain novelty and interest. A good rule is to change 1-2 items weekly while keeping some favorites constant.
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
                        Toys That Stimulate Natural Behaviors
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#f57c00'
                            }}
                        >
                            Foraging Toys
                        </Typography>
                        <Typography paragraph>
                            <strong>Purpose:</strong> Stimulate natural food-seeking behaviors and provide mental challenges.
                        </Typography>
                        <Typography paragraph>
                            <strong>Examples:</strong> Puzzle feeders, treat-dispensing toys, food wrapped in paper cups, hollow toys stuffed with treats.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>DIY option:</strong> Thread unsalted nuts in their shells onto untreated leather cord and hang in the cage, or hide treats in crumpled paper balls.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#f57c00'
                            }}
                        >
                            Destructible Toys
                        </Typography>
                        <Typography paragraph>
                            <strong>Purpose:</strong> Satisfy natural chewing instincts and beak maintenance.
                        </Typography>
                        <Typography paragraph>
                            <strong>Examples:</strong> Toys made of untreated wood, palm leaf, coconut shells, or bird-safe paper.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Safety note:</strong> Ensure materials are non-toxic and appropriate for your bird's size. Avoid small parts that could be swallowed by larger birds.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#f57c00'
                            }}
                        >
                            Physical Activity Toys
                        </Typography>
                        <Typography paragraph>
                            <strong>Purpose:</strong> Encourage movement and exercise.
                        </Typography>
                        <Typography paragraph>
                            <strong>Examples:</strong> Swings, ladders, ropes, bells, and hanging toys that require climbing or stretching to reach.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Customization:</strong> Different birds have different play styles—some prefer foot toys they can manipulate, while others enjoy hanging toys they can swing on.
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
                        Out-of-Cage Enrichment
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Playgyms and stands:</strong> Set up dedicated play areas away from the cage with different toys and perches. This provides novel stimulation and expanded territory.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Supervised exploration:</strong> Allow your bird to safely explore different rooms under close supervision. Novel environments provide sensory enrichment and satisfy curiosity.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Shower perches:</strong> Many birds enjoy bathing. A shower perch allows them to enjoy water while bonding with you.
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
                        Social Enrichment
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Quality interaction time:</strong> Most companion birds are highly social and need regular interaction. Schedule daily one-on-one time for handling, talking, or playing.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Training sessions:</strong> Using positive reinforcement to teach tricks provides mental stimulation and strengthens your bond. Even simple step-up training engages your bird's mind.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Background stimulation:</strong> When you can't interact directly, keeping your bird's cage near family activities provides passive social enrichment. Some birds also enjoy bird-appropriate videos or music when alone.
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
                        Foraging Opportunities
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 124, 0, 0.05)',
                            border: '1px solid rgba(245, 124, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Move beyond the food dish:</strong> In the wild, birds spend 6-8 hours daily searching for food. Offering all food in bowls eliminates this mentally stimulating activity.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Progressive foraging:</strong> For birds new to foraging, start simple—place favorite treats in partially open paper bags or visible containers. Gradually increase difficulty as your bird learns to search for food.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Variety of challenges:</strong> Offer different types of foraging puzzles—some requiring manipulation, others requiring destruction to access food. This prevents boredom and develops problem-solving skills.
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
                        An enriched environment is essential for your bird's psychological and physical wellbeing. By providing a variety of stimulating activities and opportunities for natural behaviors, you help prevent boredom and unwanted behaviors while strengthening your bond.
                    </Typography>

                    <Typography paragraph>
                        Remember that different bird species have different enrichment needs, and individuals within species have their preferences. Observe what engages your particular bird most, and adapt accordingly.
                    </Typography>

                    <Typography paragraph>
                        With creativity and consistency, you can create an environment where your feathered friend will thrive rather than merely survive.
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
                                to="/bird-adoption-articles/understanding-bird-body-language"
                                sx={{
                                    display: 'block',
                                    color: '#f57c00',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#ef6c00',
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

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/choosing-the-right-bird-species"
                                sx={{
                                    display: 'block',
                                    color: '#f57c00',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#ef6c00',
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

                        <Box>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/preparing-your-home-for-a-new-bird"
                                sx={{
                                    display: 'block',
                                    color: '#f57c00',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#ef6c00',
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
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default CreatingBirdEnrichingEnvironmentArticle;