import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BasicObedienceDogTrainingArticle: FC = () => {
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
                        color: '#ff9800',
                        fontWeight: 600,
                        letterSpacing: 1.2
                    }}
                >
                    TRAINING
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
                    Basic Obedience Training
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
                    Start off on the right paw with these essential commands every dog should know.
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
                    src="/images/article3.jpeg"
                    alt="Dog training session"
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
                        Why Training Matters
                    </Typography>

                    <Typography paragraph>
                        Training isn't just about teaching your dog tricks—it's an essential part of responsible dog ownership. A well-trained dog is a happier dog who can safely enjoy more freedom, more interaction with people, and more adventures with you.
                    </Typography>

                    <Typography paragraph>
                        Beyond the practical benefits, training sessions provide mental stimulation for your dog and strengthen the bond between you. Regular training using positive reinforcement methods builds trust and clear communication, creating a harmonious relationship that will last throughout your dog's life.
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
                        Getting Started with Training
                    </Typography>

                    <Typography paragraph>
                        Before diving into specific commands, it's important to understand some basic principles that will set you up for success:
                    </Typography>

                    <Typography paragraph>
                        <strong>Start early:</strong> While the saying "you can't teach an old dog new tricks" isn't true (older dogs can absolutely learn!), beginning training when your dog first joins your family establishes good habits from the start.
                    </Typography>

                    <Typography paragraph>
                        <strong>Keep sessions short:</strong> Dogs, especially puppies, have limited attention spans. Multiple 5-10 minute sessions throughout the day are more effective than one long session.
                    </Typography>

                    <Typography paragraph>
                        <strong>End on a positive note:</strong> Always finish training with something your dog can successfully do, so the experience ends with praise and reward.
                    </Typography>

                    <Typography paragraph>
                        <strong>Be consistent:</strong> Use the same words and hand signals each time. Ensure everyone in the household uses the same commands to avoid confusing your dog.
                    </Typography>

                    <Typography paragraph>
                        <strong>Practice in different environments:</strong> Once your dog masters a command at home, practice in more distracting environments like your yard, then a quiet park, and so on.
                    </Typography>

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
                        Essential Commands Every Dog Should Know
                    </Typography>

                    <Typography paragraph>
                        These five basic commands form the foundation of good canine behavior and can even save your dog's life in dangerous situations.
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
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#ff9800'
                            }}
                        >
                            1. Sit
                        </Typography>
                        <Typography paragraph>
                            "Sit" is often the first command taught to dogs because it's relatively simple and provides a foundation for other commands.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            How to teach it:
                        </Typography>

                        <Typography paragraph sx={{ pl: 2 }}>
                            1. Hold a treat close to your dog's nose.
                            <br />
                            2. Move your hand up, allowing their head to follow the treat and causing their bottom to lower.
                            <br />
                            3. Once they're in sitting position, say "Sit," give them the treat, and share affection.
                            <br />
                            4. Repeat this sequence a few times every day until your dog has it mastered.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            When it's useful:
                        </Typography>
                        <Typography paragraph>
                            Before mealtimes, before crossing streets, when greeting people, or anytime you need your dog to be calm and stationary.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#ff9800'
                            }}
                        >
                            2. Stay
                        </Typography>
                        <Typography paragraph>
                            "Stay" teaches your dog self-control and can keep them safe in potentially dangerous situations.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            How to teach it:
                        </Typography>

                        <Typography paragraph sx={{ pl: 2 }}>
                            1. Ask your dog to "Sit."
                            <br />
                            2. Open the palm of your hand in front of you, and say "Stay."
                            <br />
                            3. Take a few steps back. If they stay, reward them with a treat and affection.
                            <br />
                            4. Gradually increase the number of steps you take before giving the reward.
                            <br />
                            5. Always use a release word like "OK" or "Free" when they can move from the stay position.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            When it's useful:
                        </Typography>
                        <Typography paragraph>
                            When the door is open, when you need to answer the door, during vet examinations, or any situation where movement could be dangerous.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#ff9800'
                            }}
                        >
                            3. Come
                        </Typography>
                        <Typography paragraph>
                            A reliable recall command is possibly the most important command for your dog's safety.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            How to teach it:
                        </Typography>

                        <Typography paragraph sx={{ pl: 2 }}>
                            1. Put a leash and collar on your dog.
                            <br />
                            2. Get down to their level and say "Come" while gently pulling on the leash.
                            <br />
                            3. When they come to you, reward them with affection and a treat.
                            <br />
                            4. Once they've mastered it with the leash, practice in a safe, enclosed area without the leash.
                            <br />
                            5. Never punish your dog when they come to you, even if it took them a while, as this can make them reluctant to come in the future.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            When it's useful:
                        </Typography>
                        <Typography paragraph>
                            If your dog slips out the door, gets off leash, or anytime you need them to return to you immediately.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#ff9800'
                            }}
                        >
                            4. Down
                        </Typography>
                        <Typography paragraph>
                            "Down" or "Lie down" is a submissive position for dogs and can be more challenging to teach than "sit."
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            How to teach it:
                        </Typography>

                        <Typography paragraph sx={{ pl: 2 }}>
                            1. Hold a treat in your closed hand.
                            <br />
                            2. Hold your hand up to your dog's snout. When they sniff it, move your hand to the floor.
                            <br />
                            3. Slide your hand along the ground in front of them to encourage their body to follow.
                            <br />
                            4. Once they're in the down position, say "Down," give them the treat, and offer affection.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            When it's useful:
                        </Typography>
                        <Typography paragraph>
                            At outdoor cafes, during longer stays in public, or when you need your dog to settle for an extended period.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 152, 0, 0.05)',
                            border: '1px solid rgba(255, 152, 0, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#ff9800'
                            }}
                        >
                            5. Leave It
                        </Typography>
                        <Typography paragraph>
                            "Leave it" teaches your dog impulse control and can prevent them from picking up dangerous items.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            How to teach it:
                        </Typography>

                        <Typography paragraph sx={{ pl: 2 }}>
                            1. Place a treat in both hands.
                            <br />
                            2. Show your dog one enclosed fist with the treat inside and say "Leave it."
                            <br />
                            3. Let them lick, sniff, mouth, paw, and bark to try to get it. Ignore these behaviors.
                            <br />
                            4. Once they stop trying, give them the treat from your other hand (not the one they were trying to get).
                            <br />
                            5. Repeat until your dog moves away from the first fist when you say "Leave it."
                            <br />
                            6. Next, use this command when you place a treat on the floor and cover it with your hand.
                        </Typography>

                        <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                            When it's useful:
                        </Typography>
                        <Typography paragraph>
                            When your dog approaches something potentially harmful on walks, like garbage or another animal's droppings.
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
                        Positive Reinforcement: The Key to Successful Training
                    </Typography>

                    <Typography paragraph>
                        Modern dog training relies heavily on positive reinforcement—rewarding behaviors you want to see more of, rather than punishing unwanted behaviors. This approach is not only more humane but also more effective for long-term learning.
                    </Typography>

                    <Typography paragraph sx={{ fontWeight: 600, mb: 1 }}>
                        Types of rewards:
                    </Typography>

                    <Box sx={{ pl: 2, mb: 3 }}>
                        <Typography paragraph>
                            • <strong>Food treats:</strong> Small, soft, and high-value treats work best for training. Break them into pea-sized pieces to avoid overfeeding.
                            <br />
                            • <strong>Verbal praise:</strong> An enthusiastic "Good dog!" in a happy tone reinforces good behavior.
                            <br />
                            • <strong>Physical affection:</strong> Petting, scratching favorite spots, or a quick play session can be powerful rewards.
                            <br />
                            • <strong>Toys:</strong> For play-motivated dogs, a quick toss of a favorite toy can be more valuable than food.
                        </Typography>
                    </Box>

                    <Typography paragraph>
                        As your dog becomes more proficient, you can begin to vary the rewards and gradually reduce how often you give treats (known as "intermittent reinforcement"), which actually strengthens the behavior.
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
                        Common Training Challenges
                    </Typography>

                    <Typography paragraph>
                        Even with the best techniques, you may encounter some challenges during training:
                    </Typography>

                    <Typography paragraph>
                        <strong>Short attention span:</strong> If your dog seems distracted, make training sessions shorter but more frequent. Ensure you're training in a low-distraction environment to start.
                    </Typography>

                    <Typography paragraph>
                        <strong>Inconsistent responses:</strong> This often happens when different family members use different commands or reward systems. Create a "training dictionary" that everyone follows.
                    </Typography>

                    <Typography paragraph>
                        <strong>Regression:</strong> Sometimes dogs seem to forget commands they previously mastered. This is normal during adolescence or periods of stress. Go back to basics and rebuild gradually.
                    </Typography>

                    <Typography paragraph>
                        <strong>Breed-specific challenges:</strong> Some breeds are more independent or stubborn than others. Research your dog's breed tendencies and adjust your expectations and methods accordingly.
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
                        When to Consider Professional Help
                    </Typography>

                    <Typography paragraph>
                        While many dogs can be successfully trained at home, there are situations where professional help is beneficial:
                    </Typography>

                    <Box sx={{ pl: 2, mb: 3 }}>
                        <Typography paragraph>
                            • You're a first-time dog owner and feeling overwhelmed
                            <br />
                            • Your dog shows signs of fear, aggression, or anxiety
                            <br />
                            • You've tried consistent training but aren't seeing progress
                            <br />
                            • Your dog has developed problematic behaviors like excessive barking or destructiveness
                        </Typography>
                    </Box>

                    <Typography paragraph>
                        Options include group classes, private training sessions, or working with a certified animal behaviorist for more complex issues. Look for trainers who use positive, force-free methods and have good credentials.
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
                        Beyond Basic Obedience
                    </Typography>

                    <Typography paragraph>
                        Once your dog has mastered these basics, you might want to explore more advanced training:
                    </Typography>

                    <Box sx={{ pl: 2, mb: 3 }}>
                        <Typography paragraph>
                            • <strong>Advanced commands:</strong> "Go to your place," "Drop it," "Heel," or "Wait"
                            <br />
                            • <strong>Trick training:</strong> Shake hands, roll over, play dead
                            <br />
                            • <strong>Canine sports:</strong> Agility, rally obedience, nose work, or flyball
                            <br />
                            • <strong>Therapy dog training:</strong> For dogs with the right temperament to visit hospitals or nursing homes
                        </Typography>
                    </Box>

                    <Typography paragraph>
                        These activities provide mental stimulation and can strengthen your bond even further.
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
                        Basic obedience training is one of the most important gifts you can give your dog. A well-trained dog has more freedom, more interaction with humans, and a clearer understanding of what's expected of them—all of which contribute to a happier, more balanced canine companion.
                    </Typography>

                    <Typography paragraph>
                        Remember that training is a lifelong process, not a one-time event. Regular practice sessions throughout your dog's life will maintain their skills and reinforce your bond. With patience, consistency, and positive reinforcement, you'll build a foundation of communication and trust that will serve you both well for years to come.
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

export default BasicObedienceDogTrainingArticle;
