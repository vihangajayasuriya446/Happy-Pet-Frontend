import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EssentialCatHealthCareArticle: FC = () => {
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
                    Essential Health Care for Your New Cat
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
                    Learn about vaccinations, regular check-ups, and preventative care for your feline companion.
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
                    src="/images/cat-article5.jpeg"
                    alt="Cat receiving health care"
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
                        The Foundation of a Healthy Cat
                    </Typography>

                    <Typography paragraph>
                        Bringing a new cat into your home is an exciting experience, but it also comes with the responsibility of ensuring your feline friend stays healthy throughout their life. Proper healthcare isn't just about addressing issues as they arise—it's about creating a foundation of preventative care that helps your cat live a long, happy, and comfortable life.
                    </Typography>

                    <Typography paragraph>
                        Whether you've adopted a kitten or an adult cat, establishing a healthcare routine early on will help you catch potential problems before they become serious and build a trusting relationship with your veterinarian.
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
                        Your relationship with your veterinarian is one of the most important aspects of your cat's healthcare:
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
                            <strong>Look for cat-friendly practices:</strong> Some veterinarians specialize in feline care or have "cat-friendly" certifications, meaning they've taken extra steps to create a less stressful environment for cats.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Schedule a meet-and-greet:</strong> Many veterinary practices allow you to schedule a short visit just to meet the staff and tour the facility before bringing your cat in for an actual appointment.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Consider location and hours:</strong> Choose a practice that's reasonably close to your home and offers hours that work with your schedule, including some emergency services or after-hours options.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Communication style:</strong> Find a veterinarian who communicates in a way that makes you comfortable, answers your questions thoroughly, and respects your input about your cat's care.
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
                        Vaccinations: A Critical Component
                    </Typography>

                    <Typography paragraph>
                        Vaccinations protect your cat from several serious and potentially fatal diseases. Your veterinarian will recommend a vaccination schedule based on your cat's age, health status, and lifestyle:
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
                            Core Vaccines
                        </Typography>
                        <Typography paragraph>
                            <strong>Rabies:</strong> Required by law in most areas, this vaccine protects against a fatal disease that can be transmitted to humans.
                        </Typography>
                        <Typography paragraph>
                            <strong>FVRCP (Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia):</strong> Often called the "distemper" vaccine, this protects against common respiratory viruses and panleukopenia, a highly contagious and often fatal disease.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Vaccination schedule:</strong> Kittens typically receive a series of vaccines starting at 6-8 weeks of age, with boosters every 3-4 weeks until 16 weeks old. Adult cats may need boosters annually or every three years, depending on the vaccine.
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
                            Non-Core Vaccines
                        </Typography>
                        <Typography paragraph>
                            <strong>Feline Leukemia Virus (FeLV):</strong> Recommended for kittens and cats who go outdoors or live with FeLV-positive cats. This virus weakens the immune system and can lead to cancer.
                        </Typography>
                        <Typography paragraph>
                            <strong>Bordetella:</strong> Sometimes recommended for cats who will be boarded or live in multi-cat environments, this vaccine protects against a common cause of upper respiratory infections.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Lifestyle considerations:</strong> Your veterinarian will recommend non-core vaccines based on your cat's risk factors, such as whether they go outdoors, are exposed to other cats, or live in areas with specific disease risks.
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
                        Parasite Prevention and Control
                    </Typography>

                    <Typography paragraph>
                        Cats can be affected by various internal and external parasites that can cause discomfort, disease, and even death if left untreated:
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
                            <strong>Fleas and ticks:</strong> Even indoor cats can get fleas or ticks, which can cause skin irritation, anemia, and transmit diseases. Your veterinarian can recommend safe and effective preventative products.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Heartworm:</strong> Contrary to popular belief, cats can get heartworm disease, although it presents differently than in dogs. Monthly preventatives are available and recommended in many areas.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Intestinal parasites:</strong> Roundworms, hookworms, and tapeworms are common in cats and can cause weight loss, vomiting, diarrhea, and other issues. Regular deworming and fecal tests are important parts of preventative care.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Year-round protection:</strong> Parasites can be a threat year-round, even in colder climates. Talk to your veterinarian about a comprehensive parasite prevention strategy for your cat.
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
                        Spaying and Neutering
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
                            <strong>Health benefits:</strong> Spaying and neutering not only prevent unwanted litters but also reduce the risk of certain cancers and behavioral problems. Spayed females have a lower risk of mammary tumors and uterine infections, while neutered males are less likely to develop testicular cancer or prostate problems.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Timing:</strong> Most veterinarians recommend spaying or neutering kittens between 4-6 months of age, though some newer research supports earlier procedures. Discuss the optimal timing with your veterinarian.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Recovery:</strong> Most cats recover quickly from these routine surgeries, but they will need limited activity for a few days and monitoring to ensure they don't lick or chew at their incision.
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
                        Dental Care
                    </Typography>

                    <Typography paragraph>
                        Dental disease is one of the most common health issues in cats, but it's often overlooked:
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
                            <strong>Signs of dental problems:</strong> Bad breath, drooling, difficulty eating, pawing at the mouth, and red or bleeding gums can all indicate dental issues.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Professional cleaning:</strong> Most cats will need professional dental cleanings periodically throughout their lives. These are performed under anesthesia to allow for thorough cleaning below the gumline and dental X-rays to check for problems not visible to the naked eye.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Home care:</strong> Daily tooth brushing is the gold standard for feline dental care, but it requires patience and training. Special dental diets, treats, and water additives can also help reduce plaque and tartar buildup.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Early intervention:</strong> Addressing dental issues early can prevent pain and more serious health problems, as bacteria from dental disease can affect the heart, kidneys, and other organs.
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
                        Routine Health Monitoring
                    </Typography>

                    <Typography paragraph>
                        Regular veterinary check-ups are essential, but monitoring your cat's health at home is equally important:
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
                            <strong>Regular exams:</strong> Healthy adult cats should see a veterinarian at least once a year, while kittens, senior cats, and those with chronic conditions may need more frequent visits.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Weight monitoring:</strong> Obesity is a common problem in cats and can lead to diabetes, arthritis, and other health issues. Keep track of your cat's weight and body condition with regular weigh-ins at home.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Grooming observations:</strong> Regular grooming sessions are not only bonding opportunities but also chances to check for skin issues, lumps, parasites, or areas of pain or discomfort.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Litter box habits:</strong> Changes in urination or defecation can signal health problems. Monitor the frequency, volume, and appearance of your cat's waste, and note any straining, blood, or changes in consistency.
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
                        Nutrition and Weight Management
                    </Typography>

                    <Typography paragraph>
                        Proper nutrition is a cornerstone of good health for cats:
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
                            <strong>Life-stage appropriate diets:</strong> Kittens, adults, and senior cats have different nutritional needs. Choose a high-quality cat food formulated for your cat's life stage.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Portion control:</strong> Free-feeding (leaving food out all day) works for some cats, but many will overeat. Measured meals help prevent obesity and allow you to monitor appetite changes that might indicate health problems.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Hydration:</strong> Cats evolved as desert animals and often don't drink enough water, which can contribute to urinary and kidney problems. Consider wet food, water fountains, or multiple water stations to encourage drinking.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Special dietary needs:</strong> Some cats require prescription diets to manage conditions like urinary tract disease, kidney disease, or allergies. Never make sudden changes to such diets without consulting your veterinarian.
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
                        Cats are masters at hiding illness, so knowing what to look for is crucial:
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
                            <strong>Changes in behavior:</strong> Hiding more than usual, decreased interaction, aggression, or changes in vocalization can all indicate discomfort or illness.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Appetite changes:</strong> Both increased and decreased appetite can signal health problems. A sudden increase might indicate diabetes or hyperthyroidism, while decreased appetite could result from various conditions from dental pain to more serious illnesses.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Litter box issues:</strong> Urinating outside the box, straining in the box, or making frequent trips to the box could indicate urinary tract problems, which can become emergency situations in male cats.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>When to seek emergency care:</strong> Difficulty breathing, prolonged vomiting, inability to urinate, seizures, collapse, or severe lethargy require immediate veterinary attention.
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
                        Special Considerations for Senior Cats
                    </Typography>

                    <Typography paragraph>
                        As cats age, their healthcare needs change:
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
                            <strong>More frequent check-ups:</strong> Seniors (generally considered 11 years and older) should see the veterinarian at least twice yearly, as health changes can happen quickly in older cats.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Bloodwork and urinalysis:</strong> Regular lab work helps detect common age-related conditions like kidney disease, hyperthyroidism, and diabetes before symptoms become severe.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Mobility considerations:</strong> Many senior cats develop arthritis. Provide ramps or steps to favorite perches, ensure litter boxes are easily accessible, and talk to your veterinarian about pain management options.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Environmental enrichment:</strong> Even older cats need mental and physical stimulation. Adapt play sessions to their energy level and provide comfortable observation posts near windows or bird feeders.
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
                        Providing comprehensive healthcare for your cat involves a partnership between you and your veterinarian. By establishing preventative care routines, monitoring your cat's health at home, and seeking prompt attention for potential problems, you're giving your feline companion the best chance for a long, healthy life.
                    </Typography>

                    <Typography paragraph>
                        Remember that each cat is unique, and healthcare plans should be tailored to their individual needs, lifestyle, and risk factors. Regular communication with your veterinarian will help ensure your cat receives the most appropriate care throughout all life stages.
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
                                to="/cat-adoption-articles/creating-an-enriching-environment"
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
                                How to provide mental stimulation for your indoor cat
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                component={Link}
                                to="/cat-adoption-articles/understanding-cat-body-language"
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
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EssentialCatHealthCareArticle;