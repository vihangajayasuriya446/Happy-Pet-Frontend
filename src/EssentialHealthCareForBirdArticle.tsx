import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EssentialHealthCareForBirdArticle: FC = () => {
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
                        color: '#E75480',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    HEALTH
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
                    Essential Health Care for Your New Bird
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
                    Learn about vet visits, diet, and preventative care for your avian companion.
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
                    src="/images/bird-article5.jpeg"
                    alt="Bird receiving health care"
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
                        The Foundation of Avian Health
                    </Typography>

                    <Typography paragraph>
                        Birds are masters at hiding illness—an evolutionary adaptation that protects them from predators in the wild. This instinct makes early detection of health problems challenging for pet owners. Establishing a strong preventative care routine is essential for keeping your feathered friend healthy and catching potential issues before they become serious.
                    </Typography>

                    <Typography paragraph>
                        A comprehensive health plan for your bird includes finding an avian veterinarian, understanding proper nutrition, maintaining a clean environment, monitoring for signs of illness, and providing regular health check-ups.
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
                        Finding an Avian Veterinarian
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#E75480' }}>
                            Why Avian Specialists Matter:
                        </Typography>

                        <Typography paragraph>
                            <strong>Specialized knowledge:</strong> Birds have unique anatomies and physiologies that require specialized training to treat properly. A veterinarian with avian experience will be familiar with species-specific health issues and treatments.
                        </Typography>

                        <Typography paragraph>
                            <strong>Establish a relationship early:</strong> Schedule an initial wellness exam within the first week of bringing your bird home. This provides a baseline for future health assessments and allows your bird to become familiar with the veterinary setting.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Finding a specialist:</strong> The Association of Avian Veterinarians maintains a directory of certified bird specialists. Exotic pet stores, bird clubs, and rescue organizations can also provide recommendations for avian veterinarians in your area.
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
                        Optimal Nutrition for Avian Health
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#E75480'
                            }}
                        >
                            Species-Specific Diets
                        </Typography>
                        <Typography paragraph>
                            <strong>Beyond seed diets:</strong> Seeds alone are typically high in fat and deficient in essential vitamins and minerals. Most companion birds benefit from a varied diet that includes high-quality pellets, fresh vegetables, limited fruits, and occasional healthy proteins.
                        </Typography>
                        <Typography paragraph>
                            <strong>Transitioning diets:</strong> Birds can be resistant to dietary changes. If your bird is currently on an all-seed diet, work with your veterinarian to develop a gradual transition plan to a healthier diet.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Toxic foods:</strong> Avoid offering chocolate, caffeine, alcohol, avocado, and foods high in salt or sugar. Also be cautious with high-fat foods like nuts—these should be occasional treats rather than dietary staples.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#E75480'
                            }}
                        >
                            Supplements and Treats
                        </Typography>
                        <Typography paragraph>
                            <strong>Calcium supplementation:</strong> Female birds, especially those that lay eggs, may need additional calcium. Cuttlebone or mineral blocks can provide this essential mineral.
                        </Typography>
                        <Typography paragraph>
                            <strong>Vitamin supplementation:</strong> Most birds on a well-balanced diet don't need additional vitamins. Always consult with your veterinarian before adding supplements, as over-supplementation can be harmful.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Healthy treats:</strong> Use small pieces of favorite foods for training rewards or occasional treats. Millet sprays are popular with smaller birds but should be limited due to their high carbohydrate content.
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
                        Environmental Health Considerations
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Cage hygiene:</strong> Clean food and water dishes daily. Change cage liners or substrate 1-2 times weekly, and perform a thorough cage cleaning (including perches and toys) monthly. Use bird-safe, non-toxic cleaning products.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Air quality:</strong> Birds have sensitive respiratory systems. Avoid exposing them to cooking fumes, tobacco smoke, scented candles, incense, aerosol sprays, and fumes from non-stick cookware heated at high temperatures.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Temperature and humidity:</strong> Most companion birds do well in environments comfortable for humans (65-80°F). Avoid placing cages in drafty areas or direct sunlight, which can cause overheating.
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
                        Preventative Health Measures
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Regular check-ups:</strong> Schedule annual wellness exams for younger birds and bi-annual exams for older birds or those with known health issues. These check-ups often include physical examinations, fecal tests, and sometimes blood work.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Nail and beak maintenance:</strong> Overgrown nails or beaks can cause discomfort and affect your bird's ability to eat properly. Provide appropriate perches to help wear down nails naturally, and consult your veterinarian about proper beak maintenance.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Wing trims:</strong> Discuss with your veterinarian whether wing trimming is appropriate for your bird. A proper wing trim allows a bird to glide to the floor safely while preventing uncontrolled flight and potential injury.
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
                        Recognizing Signs of Illness
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#E75480' }}>
                            Watch for These Warning Signs:
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Changes in droppings:</strong> Color, consistency, or frequency changes in droppings can indicate dietary problems or illness.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Respiratory symptoms:</strong> Tail bobbing (when breathing), wheezing, sneezing, discharge from nostrils, or labored breathing require immediate veterinary attention.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Behavioral changes:</strong> Decreased vocalization, unusual lethargy, significant appetite change, increased sleeping, fluffed feathers for extended periods, or sitting on the cage bottom are all potential signs of illness.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Physical changes:</strong> Weight loss, swellings, lumps, bald patches, broken or abnormal feathers, and changes in posture can indicate health issues.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>IMPORTANT:</strong> Birds often hide illness until they are critically ill. Any sign of sickness should be considered an emergency requiring prompt veterinary care.
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
                        Creating a Health Journal
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(231, 84, 128, 0.05)',
                            border: '1px solid rgba(231, 84, 128, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 0 }}>
                            Maintain a simple health journal for your bird, recording weight (using a digital gram scale), dietary changes, behavioral notes, and any unusual observations. Weigh your bird at the same time each week, as consistent weight is one of the best indicators of good health. Share this information with your veterinarian during check-ups to help identify patterns or subtle changes that might indicate developing health issues.
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
                        Providing proper healthcare for your avian companion involves prevention, careful observation, and prompt response to potential health concerns. By establishing a relationship with an avian veterinarian, understanding your bird's nutritional needs, maintaining a clean environment, and monitoring for signs of illness, you're giving your feathered friend the best chance at a long, healthy life.
                    </Typography>

                    <Typography paragraph>
                        Remember that birds can live many years—even decades for some species—with proper care. The investment you make in understanding their health needs will reward you with years of companionship with your avian friend.
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
                                    color: '#E75480',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#D64C72',
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
                                to="/bird-adoption-articles/creating-an-enriching-environment"
                                sx={{
                                    display: 'block',
                                    color: '#E75480',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#D64C72',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Creating an Enriching Environment
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                How to provide mental stimulation for your companion bird
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                component={Link}
                                to="/bird-adoption-articles/understanding-bird-body-language"
                                sx={{
                                    display: 'block',
                                    color: '#E75480',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#D64C72',
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
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EssentialHealthCareForBirdArticle;