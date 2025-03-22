import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChoosingRightDogBreedArticle: FC = () => {
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
                        color: '#2196f3',
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
                    Choosing the Right Dog Breed
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
                    Learn which type of dog will be the best match for your living situation and activity level.
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
                    src="/images/article2.jpeg"
                    alt="Different dog breeds"
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
                        Why Breed Selection Matters
                    </Typography>

                    <Typography paragraph>
                        Finding the right dog breed for your lifestyle is one of the most important decisions you'll make as a potential dog owner. While every dog has its own unique personality, different breeds have been developed over generations for specific traits, temperaments, and purposes.
                    </Typography>

                    <Typography paragraph>
                        Choosing a dog whose natural tendencies align with your living situation, activity level, and expectations will set both you and your future pet up for a harmonious relationship. This guide will help you navigate the hundreds of dog breeds available to find your perfect match.
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
                        Assessing Your Lifestyle
                    </Typography>

                    <Typography paragraph>
                        Before exploring specific breeds, take an honest assessment of your lifestyle and what you can realistically offer a dog:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ fontWeight: 600, mb: 1, color: '#2196f3' }}>
                            Key Factors to Consider:
                        </Typography>

                        <Typography paragraph>
                            <strong>Living space:</strong> Do you live in an apartment or a house with a yard? Some larger, more energetic breeds need space to run, while many smaller breeds can thrive in apartments.
                        </Typography>

                        <Typography paragraph>
                            <strong>Activity level:</strong> How active are you? Do you enjoy daily runs or prefer relaxing at home? High-energy dogs need owners who can match their exercise needs.
                        </Typography>

                        <Typography paragraph>
                            <strong>Time commitment:</strong> How much time can you dedicate to your dog each day? Some breeds require more attention, training, and mental stimulation than others.
                        </Typography>

                        <Typography paragraph>
                            <strong>Household members:</strong> Do you have children, elderly family members, or other pets? Some breeds are naturally more patient with children or compatible with other animals.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Grooming willingness:</strong> Are you prepared for regular grooming sessions? Some breeds require professional grooming every 4-6 weeks, while others need minimal maintenance.
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
                        Understanding Dog Breed Groups
                    </Typography>

                    <Typography paragraph>
                        The American Kennel Club (AKC) categorizes dogs into seven main groups based on the jobs they were originally bred to perform. Understanding these groups can help narrow your search:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Sporting Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Labrador Retrievers, Golden Retrievers, and Spaniels were bred to assist hunters. They're typically energetic, friendly, and trainable. These dogs excel at activities and generally love water. They need regular exercise and mental stimulation.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Hound Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Beagles, Dachshunds, and Greyhounds were bred to hunt using either keen scent or sight abilities. They can be independent and stubborn, but are also affectionate. Some have strong prey drives and may need secure areas when outdoors.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Working Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Boxers, Doberman Pinschers, and Great Danes were developed for tasks like guarding property and pulling sleds. They're intelligent, strong, and quick learners. These breeds typically need consistent training and socialization from an early age.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Terrier Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Jack Russell Terriers, Scottish Terriers, and Bull Terriers were bred to hunt and kill vermin. They're typically feisty, energetic, and determined. Many terriers have strong digging instincts and require outlets for their abundant energy.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Toy Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Chihuahuas, Pomeranians, and Shih Tzus were bred specifically for companionship. Despite their small size, they often have big personalities. Many make excellent apartment dogs but can still be quite energetic and require proper training.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Non-Sporting Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            This diverse group includes Bulldogs, Dalmatians, and Poodles. These breeds vary widely in size, personality, and coat type. Research individual breeds in this group carefully as their needs and temperaments differ significantly.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Herding Group
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Breeds like Border Collies, German Shepherds, and Australian Shepherds were developed to herd livestock. They're intelligent, trainable, and energetic. These dogs need both physical exercise and mental challenges to prevent boredom behaviors.
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
                        Size Considerations
                    </Typography>

                    <Typography paragraph>
                        A dog's size affects everything from the space they need to the cost of their food and medical care:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Small Dogs (under 22 lbs)
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Advantages:</strong> Lower food costs, easier to transport, often live longer, and can exercise in smaller spaces.
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Considerations:</strong> May be more fragile, sometimes more vocal, and can be injured by rough handling.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Chihuahua, Shih Tzu, Maltese, Pomeranian
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Medium Dogs (23-57 lbs)
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Advantages:</strong> Balance of portability and sturdiness, moderate exercise needs.
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Considerations:</strong> Still need regular exercise and training.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Beagle, Cocker Spaniel, Bulldog, Whippet
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Large Dogs (58-99 lbs)
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Advantages:</strong> Often calmer indoors, more physically capable for activities, good deterrents.
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Considerations:</strong> Higher food costs, need more space, stronger on leash.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Labrador Retriever, German Shepherd, Boxer, Standard Poodle
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Giant Dogs (100+ lbs)
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Advantages:</strong> Often gentle giants, impressive presence, typically calm indoors.
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Considerations:</strong> Shortest lifespans, highest costs for food/medicine, need space.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Great Dane, Saint Bernard, Newfoundland, Mastiff
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
                        Energy Level Matching
                    </Typography>

                    <Typography paragraph>
                        One of the most common mismatches occurs when a dog's energy level doesn't align with their owner's lifestyle:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            High Energy Breeds
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            Need 1-2+ hours of exercise daily. Best for active individuals or families who enjoy outdoor activities.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Border Collie, Australian Shepherd, Jack Russell Terrier, Dalmatian, Siberian Husky
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Medium Energy Breeds
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            Enjoy activity but also know how to relax. Adaptable to different lifestyles with proper exercise.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Labrador Retriever, Beagle, Cocker Spaniel, Brittany, Boxer
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#2196f3'
                            }}
                        >
                            Low Energy Breeds
                        </Typography>
                        <Typography paragraph sx={{ mb: 1 }}>
                            Content with short walks and lots of lounging. Good for less active individuals or apartment dwellers.
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Examples:</strong> Bulldog, Basset Hound, Shih Tzu, Cavalier King Charles Spaniel, Great Dane
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

                    <Typography paragraph>
                        Beyond the basics, consider these additional factors when choosing a breed:
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Allergies:</strong> If you or a family member has allergies, consider breeds often labeled as "hypoallergenic" (though no breed is truly 100% allergen-free). Examples include Poodles, Bichon Frises, and Portuguese Water Dogs.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Climate:</strong> Some breeds struggle in certain climates. Thick-coated breeds like Huskies can overheat in hot regions, while short-haired breeds may need sweaters in cold areas.
                        </Typography>

                        <Typography paragraph sx={{ mb: 1 }}>
                            <strong>Noise sensitivity:</strong> If you live in an apartment or have noise restrictions, consider breeds less prone to barking, like Basenjis, Greyhounds, or Cavalier King Charles Spaniels.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Breed-specific legislation:</strong> Some areas have restrictions on certain breeds. Check local laws before committing to breeds like Pit Bulls, Rottweilers, or Dobermans.
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
                        Mixed Breeds and Rescues
                    </Typography>

                    <Typography paragraph>
                        Don't forget that mixed-breed dogs and rescues can make wonderful pets. They often have fewer genetic health problems due to their diverse gene pools, and adult rescue dogs may already have established personalities that make it easier to determine if they'll fit your lifestyle.
                    </Typography>

                    <Typography paragraph>
                        When adopting a mixed-breed dog, look at their physical characteristics and behavior for clues about their heritage. Shelter staff can often provide insights about a dog's temperament and energy level based on their observations.
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
                        Meeting Dogs in Person
                    </Typography>

                    <Typography paragraph>
                        Before making a final decision, try to meet dogs of the breeds you're considering. Visit breed-specific rescues, attend dog shows, or ask breeders if you can meet their adult dogs (not just puppies). This will give you a better sense of the breed's typical temperament and behavior.
                    </Typography>

                    <Typography paragraph>
                        Remember that puppies of all breeds require significant time, patience, and training. If you're not prepared for the puppy phase, consider adopting an adult dog whose personality is already established.
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
                        Conclusion
                    </Typography>

                    <Typography paragraph>
                        Choosing the right dog breed is a decision that will affect your daily life for many years to come. Take your time, do thorough research, and be honest about what you can provide. The perfect dog for you is one whose needs you can meet and whose companionship you'll enjoy for their entire life.
                    </Typography>

                    <Typography paragraph>
                        Remember that while breed tendencies are important to consider, each dog is an individual. The time you invest in training, socialization, and building a relationship with your dog will have just as much impact on their behavior as their genetic predispositions.
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

export default ChoosingRightDogBreedArticle;


