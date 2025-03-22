import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DogHomePreparationArticle: FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Back button */}
            <Button
                startIcon={<ArrowBackIcon />}
                component={Link}
                to="/dog-adoption-articles"
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
                        color: '#3f51b5',
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
                    Preparing Your Home for a New Dog
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
                    Essential tips for making your home safe and comfortable for your new canine companion.
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
                    src="/images/article1.jpeg"
                    alt="Dog with welcome mat"
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
                        Why Proper Preparation Matters
                    </Typography>

                    <Typography paragraph>
                        Bringing a new dog home is an exciting time, but without proper preparation, it can quickly become overwhelming for both you and your new pet. Dogs need time to adjust to new environments, and having a safe, welcoming space ready for them can make the transition much smoother.
                    </Typography>

                    <Typography paragraph>
                        Whether you're adopting a puppy or an adult dog, the steps you take before their arrival can set the foundation for a happy, healthy relationship. This guide will walk you through essential preparations to ensure your home is ready for your new furry family member.
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
                        Dog-Proofing Your Home
                    </Typography>

                    <Typography paragraph>
                        Dogs, especially puppies, are naturally curious and will explore their new environment with their mouths. This means you'll need to dog-proof your home similar to how you would childproof it.
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: 0.5
                            }}>1</Box>
                            <Typography>
                                <strong>Secure loose wires and cables:</strong> Chewing on electrical cords can cause burns or electric shock. Use cord covers or bitter apple spray to deter chewing.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: 0.5
                            }}>2</Box>
                            <Typography>
                                <strong>Remove toxic plants:</strong> Many common houseplants are toxic to dogs, including lilies, aloe vera, and pothos. Either remove them or place them in inaccessible areas.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: 0.5
                            }}>3</Box>
                            <Typography>
                                <strong>Store chemicals safely:</strong> Cleaning supplies, medications, and other chemicals should be stored in cabinets with childproof locks or in high places your dog can't reach.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: 0.5
                            }}>4</Box>
                            <Typography>
                                <strong>Secure trash cans:</strong> Dogs can be attracted to food waste and other interesting smells. Use trash cans with secure lids to prevent tipping and rummaging.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: 0.5
                            }}>5</Box>
                            <Typography>
                                <strong>Put away small items:</strong> Small objects like children's toys, socks, and jewelry can be choking hazards if swallowed.
                            </Typography>
                        </Box>
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
                        Creating a Comfortable Space
                    </Typography>

                    <Typography paragraph>
                        Your new dog needs a dedicated space where they can feel safe and secure. This is especially important during the first few days in a new home when everything is unfamiliar.
                    </Typography>

                    <Typography paragraph>
                        Choose a quiet area of your home for your dog's main resting place. This should include:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: 3
                        }}
                    >
                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#3f51b5',
                                    fontSize: '1rem'
                                }}
                            >
                                A comfortable bed
                            </Typography>
                            <Typography>
                                Select an appropriately sized bed for your dog. Puppies and older dogs may appreciate beds with lower sides for easy access.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#3f51b5',
                                    fontSize: '1rem'
                                }}
                            >
                                Food and water bowls
                            </Typography>
                            <Typography>
                                Place these in a consistent location away from high-traffic areas. Stainless steel or ceramic bowls are more hygienic than plastic.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#3f51b5',
                                    fontSize: '1rem'
                                }}
                            >
                                Toys and chews
                            </Typography>
                            <Typography>
                                Provide appropriate toys to keep your dog mentally stimulated and to redirect chewing behavior away from furniture and other valuables.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#3f51b5',
                                    fontSize: '1rem'
                                }}
                            >
                                A crate (optional but recommended)
                            </Typography>
                            <Typography>
                                When properly introduced, a crate can become a safe haven for your dog and aid in housetraining.
                            </Typography>
                        </Box>
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
                        Preparing Your Yard
                    </Typography>

                    <Typography paragraph>
                        If you have outdoor space, it's important to make it safe for your new dog as well:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5'
                            }}/>
                            <Typography>
                                <strong>Check your fence:</strong> Ensure your fence is secure with no gaps or holes where your dog could escape. The recommended height depends on your dog's size and jumping ability.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5'
                            }}/>
                            <Typography>
                                <strong>Remove toxic plants and hazardous materials:</strong> Many garden plants can be harmful to dogs. Also remove pesticides, fertilizers, and sharp gardening tools.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#3f51b5'
                            }}/>
                            <Typography>
                                <strong>Provide shade and water:</strong> Dogs need protection from the sun and access to fresh water when outdoors.
                            </Typography>
                        </Box>
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
                        Essential Supplies Checklist
                    </Typography>

                    <Typography paragraph>
                        Before bringing your dog home, make sure you have these essential supplies:
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 3
                    }}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#3f51b5',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(255, 152, 0, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Food & Nutrition
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>High-quality dog food appropriate for age and size</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Food and water bowls</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Treats for training</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#3f51b5',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(255, 152, 0, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Comfort & Safety
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Dog bed</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Crate or carrier</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Baby gates (if needed)</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#3f51b5',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(255, 152, 0, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Walking & Identification
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Collar with ID tag</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Leash (standard 6ft for training)</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Harness (recommended for puppies/pullers)</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)'
                        }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#3f51b5',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(255, 152, 0, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Grooming & Health
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Brush appropriate for coat type</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Dog-specific shampoo</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Nail clippers</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#3f51b5'
                                }}/>
                                <Typography>Toothbrush and dog toothpaste</Typography>
                            </Box>
                        </Box>
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
                        Final Preparations
                    </Typography>

                    <Typography paragraph>
                        As the day approaches to bring your new dog home, take these final steps:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255, 152, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3f51b5',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>1</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Find a veterinarian
                                </Typography>
                                <Typography>
                                    Research and select a vet before bringing your dog home. Schedule an initial check-up within the first week.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255, 152, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3f51b5',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>2</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Research dog trainers
                                </Typography>
                                <Typography>
                                    Look into positive reinforcement training classes in your area, especially if you're a first-time dog owner.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255, 152, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3f51b5',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>3</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Establish house rules
                                </Typography>
                                <Typography>
                                    Discuss with family members which furniture the dog is allowed on, feeding schedules, and who will handle which responsibilities.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255, 152, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3f51b5',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>4</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Plan the first day
                                </Typography>
                                <Typography>
                                    Try to bring your dog home when you have a few days off to help them adjust. Keep the first day calm and low-key.
                                </Typography>
                            </Box>
                        </Box>
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

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph>
                            Preparing your home for a new dog takes time and consideration, but the effort you put in before their arrival will help create a smooth transition for everyone. Remember that each dog is unique, and you may need to make adjustments as you learn about your specific dog's needs and personality.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            With proper preparation, you'll be ready to welcome your new furry family member into a safe, comfortable environment where they can thrive and your relationship can flourish from day one.
                        </Typography>
                    </Box>
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
                                to="/dog-adoption-articles/choosing-the-right-dog-breed"
                                sx={{
                                    display: 'block',
                                    color: '#3f51b5',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#303f9f',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Choosing the Right Dog Breed
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Find your perfect canine match
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography
                                component={Link}
                                to="/dog-adoption-articles/basic-obedience-training"
                                sx={{
                                    display: 'block',
                                    color: '#3f51b5',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#303f9f',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Basic Obedience Training
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Start training your dog right
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                component={Link}
                                to="/dog-adoption-articles/understanding-dog-body-language"
                                sx={{
                                    display: 'block',
                                    color: '#3f51b5',
                                    textDecoration: 'none',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#303f9f',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Understanding Dog Body Language
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Learn what your dog is telling you
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DogHomePreparationArticle;

