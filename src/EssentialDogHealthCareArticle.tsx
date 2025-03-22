import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EssentialDogHealthCareArticle: FC = () => {
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
                        color: '#4caf50',
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
                    Essential Health Care for Your New Dog
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
                    Learn about vaccinations, regular check-ups, and preventative care for your canine companion.
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
                    src="/images/article5.jpeg"
                    alt="Dog at veterinary checkup"
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
                        The Foundation of Dog Health Care
                    </Typography>

                    <Typography paragraph>
                        Bringing a new dog into your home is an exciting time, but it also comes with significant responsibilities—especially regarding their health care. A comprehensive health care plan is essential for ensuring your dog lives a long, happy, and healthy life. This guide will walk you through the fundamental aspects of canine health care that every dog owner should know.
                    </Typography>

                    <Typography paragraph>
                        Whether you've adopted a puppy or an adult dog, understanding their health needs is crucial. Preventative care is always more effective—and often less expensive—than treating conditions after they develop. By establishing good health care habits early, you'll set your dog up for a lifetime of wellbeing.
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
                        Finding the Right Veterinarian
                    </Typography>

                    <Typography paragraph>
                        Your relationship with your veterinarian is one of the most important partnerships you'll form as a dog owner. Here's how to find the right match:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
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
                                bgcolor: '#4caf50',
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
                                <strong>Ask for recommendations:</strong> Consult other dog owners, local shelters, or rescue groups for veterinarian recommendations. Personal experiences can provide valuable insights.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
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
                                <strong>Consider location and hours:</strong> Choose a clinic that's reasonably close to your home and offers hours that work with your schedule. In emergencies, proximity matters.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
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
                                <strong>Visit before deciding:</strong> Schedule a meet-and-greet appointment to get a feel for the clinic's environment, the staff's demeanor, and the veterinarian's communication style.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
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
                                <strong>Ask about emergency services:</strong> Understand the clinic's protocol for after-hours emergencies. Do they provide 24-hour care, or will they refer you to an emergency hospital?
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
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
                                <strong>Consider specialties:</strong> If your dog has specific health concerns or is a breed prone to particular issues, a vet with relevant experience can be invaluable.
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
                        Essential Vaccinations
                    </Typography>

                    <Typography paragraph>
                        Vaccinations protect your dog from potentially deadly diseases and are a cornerstone of preventative care. Core vaccines are recommended for all dogs, while non-core vaccines may be advised based on your dog's lifestyle and risk factors.
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
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
                                    color: '#4caf50',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Core Vaccines
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography>
                                    <strong>Rabies:</strong> Required by law in most areas, this vaccine protects against the fatal rabies virus that can be transmitted to humans.
                                </Typography>

                                <Typography>
                                    <strong>Distemper:</strong> Prevents a highly contagious and serious disease that affects the respiratory, gastrointestinal, and nervous systems.
                                </Typography>

                                <Typography>
                                    <strong>Parvovirus:</strong> Protects against a highly contagious virus that causes severe, often fatal gastrointestinal illness, especially in puppies.
                                </Typography>

                                <Typography>
                                    <strong>Adenovirus (Hepatitis):</strong> Prevents infectious canine hepatitis, which affects the liver, kidneys, and eyes.
                                </Typography>
                            </Box>
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
                                    color: '#4caf50',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                    pb: 0.5
                                }}
                            >
                                Non-Core Vaccines
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography>
                                    <strong>Bordetella (Kennel Cough):</strong> Often required for dogs that will be boarded, attend daycare, or visit dog parks.
                                </Typography>

                                <Typography>
                                    <strong>Leptospirosis:</strong> Recommended for dogs with outdoor exposure, especially to wildlife or standing water.
                                </Typography>

                                <Typography>
                                    <strong>Lyme Disease:</strong> Important in areas where ticks carrying Lyme disease are prevalent.
                                </Typography>

                                <Typography>
                                    <strong>Canine Influenza:</strong> May be recommended for social dogs in areas with outbreaks.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        Puppies typically receive a series of vaccinations starting at 6-8 weeks of age, with boosters every 3-4 weeks until they're about 16 weeks old. Adult dogs require regular boosters, with frequency depending on the specific vaccine and local regulations.
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
                        Parasite Prevention
                    </Typography>

                    <Typography paragraph>
                        Parasites can cause serious health problems for your dog and sometimes pose risks to human family members. A comprehensive parasite prevention plan includes:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#4caf50',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Heartworm Prevention
                            </Typography>

                            <Typography paragraph>
                                Heartworm disease is a potentially fatal condition caused by worms that live in the heart, lungs, and blood vessels. Prevention is much safer and more affordable than treatment.
                            </Typography>

                            <Typography>
                                Most veterinarians recommend year-round heartworm preventative medication, which is typically given monthly as a chewable tablet or topical solution. Annual heartworm testing is also recommended, even for dogs on preventative medication.
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#4caf50',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Flea and Tick Control
                            </Typography>

                            <Typography paragraph>
                                Fleas can cause skin irritation, allergic reactions, and transmit tapeworms, while ticks can spread diseases like Lyme disease and Rocky Mountain spotted fever.
                            </Typography>

                            <Typography paragraph>
                                Year-round prevention is typically recommended, with options including:
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography>Topical treatments applied to the skin</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography>Oral medications</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography>Collars that repel and kill fleas and ticks</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography>Sprays and powders (generally less effective than other options)</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: '#4caf50',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Intestinal Parasite Control
                            </Typography>

                            <Typography paragraph>
                                Common intestinal parasites include roundworms, hookworms, whipworms, and tapeworms. Many monthly heartworm preventatives also control some intestinal parasites.
                            </Typography>

                            <Typography>
                                Regular fecal examinations (typically recommended 1-2 times per year for adult dogs and more frequently for puppies) help detect parasites that might not be prevented by routine medications.
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
                        Routine Veterinary Care
                    </Typography>

                    <Typography paragraph>
                        Regular check-ups are essential even when your dog appears healthy. These visits allow your veterinarian to detect potential issues before they become serious problems.
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
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
                                    color: '#4caf50',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                    pb: 0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Box sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                Puppy Visits
                            </Typography>

                            <Typography>
                                Puppies typically need monthly visits until they're about 16 weeks old for vaccinations, deworming, and developmental assessments. These visits are also an excellent opportunity to discuss training, nutrition, and other aspects of puppy care.
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
                                    color: '#4caf50',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                    pb: 0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Box sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                Adult Dog Check-ups
                            </Typography>

                            <Typography paragraph>
                                Healthy adult dogs should see a veterinarian at least once a year. These annual exams typically include:
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Physical examination</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Weight assessment</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Dental check</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Vaccination boosters</Typography>
                                </Box>
                            </Box>
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
                                    color: '#4caf50',
                                    fontSize: '1.1rem',
                                    borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                    pb: 0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Box sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                Senior Dog Care
                            </Typography>

                            <Typography paragraph>
                                Dogs are generally considered seniors around 7-10 years of age, depending on breed and size. Senior dogs benefit from more frequent check-ups, typically every 6 months.
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Blood work</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Urinalysis</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">Blood pressure measurement</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#4caf50'
                                    }}/>
                                    <Typography variant="body2">X-rays if needed</Typography>
                                </Box>
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
                        Dental Health
                    </Typography>

                    <Typography paragraph>
                        Dental disease is one of the most common health issues in dogs, affecting approximately 80% of dogs by age three. Poor dental health doesn't just cause bad breath—it can lead to painful infections and potentially affect the heart, liver, and kidneys.
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>1</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Home care
                                </Typography>
                                <Typography>
                                    Daily tooth brushing with dog-specific toothpaste is ideal. Dental chews, water additives, and special diets can also help, though they're not as effective as brushing.
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>2</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Professional cleanings
                                </Typography>
                                <Typography>
                                    Most dogs benefit from professional dental cleanings performed by a veterinarian under anesthesia. The frequency depends on the individual dog, but many need this care every 1-3 years.
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>3</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Regular monitoring
                                </Typography>
                                <Typography>
                                    Check your dog's mouth regularly for signs of dental disease, including bad breath, red or bleeding gums, yellow-brown tartar on teeth, or changes in eating habits.
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
                        Nutrition and Weight Management
                    </Typography>

                    <Typography paragraph>
                        Proper nutrition is fundamental to your dog's health. Obesity is a common problem in dogs and can lead to numerous health issues, including diabetes, joint problems, and reduced lifespan.
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
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
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                <Typography sx={{ fontWeight: 600 }}>
                                    Choose quality food
                                </Typography>
                            </Box>
                            <Typography sx={{ pl: 4 }}>
                                Select a high-quality commercial dog food appropriate for your dog's age, size, and activity level. Consult your veterinarian for specific recommendations, especially if your dog has health conditions.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                <Typography sx={{ fontWeight: 600 }}>
                                    Monitor portions
                                </Typography>
                            </Box>
                            <Typography sx={{ pl: 4 }}>
                                Follow feeding guidelines on the package as a starting point, but adjust based on your individual dog's needs and activity level.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                <Typography sx={{ fontWeight: 600 }}>
                                    Maintain healthy weight
                                </Typography>
                            </Box>
                            <Typography sx={{ pl: 4 }}>
                                You should be able to feel your dog's ribs without pressing hard, and they should have a visible waist when viewed from above.
                            </Typography>
                        </Box>

                        <Box sx={{
                            p: 2.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50'
                                }}/>
                                <Typography sx={{ fontWeight: 600 }}>
                                    Consider life stage
                                </Typography>
                            </Box>
                            <Typography sx={{ pl: 4 }}>
                                Puppies, adults, and senior dogs have different nutritional needs, as do pregnant or nursing females.
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
                        Spaying and Neutering
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Typography>
                            Spaying (for females) and neutering (for males) are common surgical procedures that prevent reproduction. Beyond population control, these procedures offer several health benefits:
                        </Typography>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: 3
                        }}>
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
                                        color: '#4caf50',
                                        fontSize: '1.1rem',
                                        borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                        pb: 0.5
                                    }}
                                >
                                    Benefits for Females
                                </Typography>

                                <Typography>
                                    Spaying eliminates the risk of uterine infections and significantly reduces the risk of mammary tumors, especially when performed before the first heat cycle.
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
                                        color: '#4caf50',
                                        fontSize: '1.1rem',
                                        borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                                        pb: 0.5
                                    }}
                                >
                                    Benefits for Males
                                </Typography>

                                <Typography>
                                    Neutering prevents testicular cancer and reduces the risk of prostate problems. It can also help reduce marking behaviors and aggression in some dogs.
                                </Typography>
                            </Box>
                        </Box>

                        <Typography>
                            The ideal age for spaying or neutering varies depending on the dog's breed, size, and individual circumstances. Discuss timing with your veterinarian to make the best decision for your specific dog.
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

                    <Typography paragraph>
                        Dogs can't tell us when they're feeling unwell, so it's important to be vigilant for signs of illness. Contact your veterinarian if you notice:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: { xs: 1.5, sm: 3 }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Changes in appetite or water consumption</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Unexplained weight loss or gain</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Lethargy or decreased activity</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Vomiting or diarrhea</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Coughing, sneezing, or labored breathing</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Changes in urination habits</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Unusual lumps or bumps</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Limping or difficulty moving</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Bad breath or excessive drooling</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Red, cloudy, or discharge-filled eyes</Typography>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        When in doubt, it's better to consult your veterinarian. Early intervention often leads to better outcomes and can save on treatment costs in the long run.
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
                        Emergency Preparedness
                    </Typography>

                    <Typography paragraph>
                        Being prepared for emergencies can save precious time when your dog needs immediate care:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>1</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Know emergency facilities
                                </Typography>
                                <Typography>
                                    Identify the nearest 24-hour emergency veterinary hospital and save their contact information in your phone and post it somewhere visible in your home.
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>2</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Keep records accessible
                                </Typography>
                                <Typography>
                                    Maintain a file with your dog's medical history, current medications, and vaccination status that you can quickly access in an emergency.
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>3</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Consider a pet first aid kit
                                </Typography>
                                <Typography>
                                    Basic supplies like gauze, adhesive tape, hydrogen peroxide, and digital thermometer can be helpful in certain emergency situations.
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
                                bgcolor: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#4caf50',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>4</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Learn basic first aid
                                </Typography>
                                <Typography>
                                    Understanding how to safely handle an injured dog and provide basic first aid can be valuable in emergency situations and potentially save your dog's life.
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
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph>
                            Providing comprehensive health care for your dog requires commitment, but the rewards are immeasurable. By establishing a relationship with a trusted veterinarian, following preventative care recommendations, maintaining proper nutrition and exercise, and being vigilant for signs of illness, you'll be giving your canine companion the best chance at a long, healthy, and happy life.
                        </Typography>

                        <Typography paragraph>
                            Remember that each dog is unique, with individual health needs that may change throughout their life. Regular communication with your veterinarian will help you adapt your care plan as needed and address any concerns before they become serious problems.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            The bond you share with your dog is special, and providing excellent health care is one of the most important ways you can show your love and commitment to your furry family member.
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
                                to="/dog-adoption-articles/preparing-your-home-for-a-new-dog"
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
                                Preparing Your Home for a New Dog
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Essential tips for making your home safe and comfortable
                            </Typography>
                        </Box>

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
                                Find the perfect match for your lifestyle
                            </Typography>
                        </Box>

                        <Box>
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
                                Essential commands every dog should know
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

   </Container>
);
};

export default EssentialDogHealthCareArticle;


