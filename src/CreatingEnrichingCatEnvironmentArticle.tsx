import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreatingEnrichingCatEnvironmentArticle: FC = () => {
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
                    How to provide mental stimulation and physical exercise for your indoor cat.
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
                    src="/images/cat-article4.jpeg"
                    alt="Cat in an enriched environment"
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
                        Why Enrichment Matters for Indoor Cats
                    </Typography>

                    <Typography paragraph>
                        Indoor cats live longer, healthier lives away from predators, traffic, and disease. However, indoor living presents its own challenges—namely, how to provide enough mental and physical stimulation to keep your feline friend happy and prevent boredom-related behaviors.
                    </Typography>

                    <Typography paragraph>
                        In the wild, cats spend their days hunting, exploring, climbing, and defending territory. Indoor cats still have these natural instincts and drives, but in a limited environment. Environmental enrichment helps satisfy these instincts while preventing obesity, depression, and problematic behaviors like excessive grooming, aggression, or destructive tendencies.
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
                        Creating Vertical Space
                    </Typography>

                    <Typography paragraph>
                        Cats are natural climbers who appreciate surveying their territory from elevated positions. Vertical space is crucial for their sense of security and satisfaction:
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
                            <strong>Cat trees and shelving:</strong> Invest in a sturdy cat tree or install cat-specific shelving to create pathways around the room. These give your cat exercise, observation posts, and escape routes from other pets or children.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Window perches:</strong> Cats love watching the outside world. A comfortable window perch provides hours of entertainment as your cat observes birds, squirrels, and neighborhood activity.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Varying heights:</strong> Provide resting spots at different heights throughout your home. This gives your cat choices and allows them to adjust their location based on their comfort level and temperature preferences.
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
                        Satisfying Hunting Instincts
                    </Typography>

                    <Typography paragraph>
                        Even well-fed domestic cats retain strong hunting instincts that need appropriate outlets:
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
                            Interactive Play
                        </Typography>
                        <Typography paragraph>
                            <strong>Wand toys:</strong> Mimic natural prey movements with feather wands or string toys (always supervised). Move the toy like a bird or mouse—darting unpredictably, hiding behind furniture, and occasionally "freezing."
                        </Typography>
                        <Typography paragraph>
                            <strong>Daily sessions:</strong> Aim for at least two 10-15 minute play sessions daily. The best times are usually early morning and evening, when cats are naturally most active.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Ending on success:</strong> Always let your cat "catch" the prey at the end of a play session. This provides closure and satisfaction of their hunting sequence.
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
                            Food Puzzles and Foraging
                        </Typography>
                        <Typography paragraph>
                            <strong>Food puzzles:</strong> Instead of feeding from a bowl, use food puzzles that require your cat to work for their food. This mental exercise mimics natural hunting and foraging behaviors.
                        </Typography>
                        <Typography paragraph>
                            <strong>DIY options:</strong> Create simple food puzzles by cutting holes in cardboard tubes or plastic containers. Start with easy puzzles and gradually increase difficulty as your cat masters each level.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Hide and seek:</strong> Hide small portions of dry food around your home for your cat to find throughout the day. This encourages natural foraging behavior and provides mental stimulation.
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
                        Scratching Opportunities
                    </Typography>

                    <Typography paragraph>
                        Scratching is a natural and necessary behavior for cats. It helps them stretch muscles, shed dead nail sheaths, and mark territory:
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
                            <strong>Multiple surfaces:</strong> Provide a variety of scratching surfaces—vertical posts, horizontal pads, and inclined scratchers. Different cats prefer different angles and materials.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Strategic placement:</strong> Place scratchers near sleeping areas (cats often stretch and scratch upon waking) and in prominent locations (scratching is partly about marking territory).
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Materials:</strong> Experiment with different textures like sisal, cardboard, carpet, and wood. Most cats prefer rough textures that allow their claws to sink in satisfyingly.
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
                        Creating Safe Outdoor Experiences
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
                            <strong>Catios:</strong> Consider building or purchasing a "catio"—an enclosed outdoor space where your cat can safely experience fresh air, sunshine, and outdoor stimulation without the risks of free-roaming.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Window screens:</strong> Ensure all windows have secure screens to prevent escapes while allowing fresh air and outdoor scents.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Harness training:</strong> Some cats can be trained to walk on a harness and leash. Start slowly indoors, and gradually work up to short outdoor excursions if your cat seems comfortable.
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
                        Rotating Toys and Creating Novelty
                    </Typography>

                    <Typography paragraph>
                        Cats are naturally curious and respond well to new and changing elements in their environment:
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
                            <strong>Toy rotation:</strong> Rather than leaving all toys out at once, rotate toys weekly to maintain interest. Store unused toys in a container with catnip to refresh their appeal.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Sensory enrichment:</strong> Introduce new textures, scents, and sounds periodically. Cat-safe plants like cat grass, silver vine, or catnip can provide sensory enrichment.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Rearranging furniture:</strong> Occasionally rearranging furniture or cat trees creates new pathways and exploration opportunities.
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

                    <Typography paragraph>
                        Don't forget that for many cats, interaction with humans or other animals is a crucial form of enrichment:
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
                            <strong>Quality time:</strong> Set aside time each day for one-on-one attention. This could be play, grooming, or simply sitting together while you read or watch TV.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Training:</strong> Many cats enjoy learning tricks through clicker training. This provides mental stimulation and strengthens your bond.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Feline friends:</strong> For some cats, having another feline companion provides social enrichment. However, this depends entirely on your cat's personality—not all cats want or need feline companionship.
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
                        Creating an enriching environment for your cat doesn't require expensive equipment or extensive home modifications. Even small changes, implemented thoughtfully, can dramatically improve your cat's quality of life.
                    </Typography>

                    <Typography paragraph>
                        Remember that each cat is an individual with unique preferences. Observe what engages your cat, and build on those interests. By providing appropriate outlets for your cat's natural behaviors, you'll not only prevent behavior problems but also deepen your bond and ensure your feline friend lives a fulfilling, happy life.
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
                                to="/cat-adoption-articles/understanding-cat-body-language"
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

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/choosing-the-right-cat-breed"
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

                        <Box>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/preparing-your-home-for-a-new-cat"
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
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default CreatingEnrichingCatEnvironmentArticle;