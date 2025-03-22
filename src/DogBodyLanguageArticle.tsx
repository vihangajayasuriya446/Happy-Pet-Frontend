import { FC } from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DogBodyLanguageArticle: FC = () => {
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
                    Understanding Dog Body Language
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
                    Learn how to interpret what your dog is trying to tell you through their posture, tail, ears, and other signals.
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
                    src="/images/article4.jpeg"
                    alt="Dog expressing body language"
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
                        Why Understanding Dog Body Language Matters
                    </Typography>

                    <Typography paragraph>
                        Dogs may not speak our language, but they're constantly communicating with us through their body language. Learning to interpret these signals is like gaining access to a secret conversation that's been happening all along. It allows you to understand your dog's emotional state, respond appropriately to their needs, and build a stronger bond based on mutual understanding.
                    </Typography>

                    <Typography paragraph>
                        Being fluent in dog body language also helps you anticipate potential problems before they escalate. You'll be able to recognize signs of stress, fear, or discomfort early, allowing you to remove your dog from triggering situations or provide reassurance when needed. This knowledge is invaluable for preventing conflicts with other dogs and avoiding situations that might lead to aggressive behavior.
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
                        The Components of Canine Communication
                    </Typography>

                    <Typography paragraph>
                        Dogs use their entire body to communicate. To truly understand what your dog is saying, you need to look at the complete picture rather than focusing on just one element. Here are the key components to observe:
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
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            1. Facial Expressions
                        </Typography>
                        <Typography paragraph>
                            A dog's face can reveal a wealth of information about their emotional state. Pay particular attention to:
                        </Typography>

                        <Typography paragraph>
                            <strong>Eyes:</strong> Relaxed eyes with normal pupil size typically indicate a calm dog. Wide eyes with visible whites (sometimes called "whale eye") often signal fear or anxiety. Narrowed, hard-staring eyes may indicate a threat or aggression.
                        </Typography>

                        <Typography paragraph>
                            <strong>Mouth:</strong> A relaxed, slightly open mouth often indicates a content dog. Tight, closed lips might signal tension or stress. A dog showing teeth with a wrinkled muzzle is typically giving a warning signal.
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Ears:</strong> Forward-facing ears usually indicate interest or alertness. Ears pinned back against the head often suggest fear or submission. The exact positioning varies significantly by breed—floppy-eared dogs will show more subtle ear movements than those with erect ears.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            2. Tail Position and Movement
                        </Typography>
                        <Typography paragraph>
                            Contrary to popular belief, a wagging tail doesn't always mean a happy dog. The position and movement pattern of the tail convey different messages:
                        </Typography>

                        <Typography paragraph>
                            <strong>High, stiff tail:</strong> Alertness, confidence, or potential aggression
                            <br />
                            <strong>Low, tucked tail:</strong> Fear, anxiety, or submission
                            <br />
                            <strong>Relaxed, neutral position:</strong> Calm, comfortable state
                            <br />
                            <strong>Fast, wide wag:</strong> Usually indicates excitement or happiness
                            <br />
                            <strong>Slow, stiff wag:</strong> Often signals caution or potential aggression
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            Remember that tail carriage varies by breed. A Husky's tail naturally curls over the back, while a Greyhound's natural position is low. Learn what's normal for your dog's breed and individual personality.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            3. Body Posture
                        </Typography>
                        <Typography paragraph>
                            A dog's overall body position provides important context for other signals:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Relaxed posture:</strong> Weight evenly distributed, muscles loose, indicates comfort
                            <br />
                            <strong>Tense, stiff body:</strong> Alertness, potential stress or aggression
                            <br />
                            <strong>Lowered body:</strong> Submission, fear, or play invitation (context matters)
                            <br />
                            <strong>Leaning forward:</strong> Interest or potential confrontation
                            <br />
                            <strong>Leaning away/backing up:</strong> Discomfort, desire for space
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            4. Vocalizations
                        </Typography>
                        <Typography paragraph>
                            While not strictly body language, vocalizations often accompany physical signals:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            <strong>Barking:</strong> Can indicate alertness, warning, playfulness, or demand for attention
                            <br />
                            <strong>Growling:</strong> Usually a warning signal indicating discomfort or threat
                            <br />
                            <strong>Whining:</strong> Often signals stress, anxiety, or desire for something
                            <br />
                            <strong>Howling:</strong> Communication with others, response to sounds, or separation anxiety
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
                        Common Emotional States and Their Signals
                    </Typography>

                    <Typography paragraph>
                        Now that we've covered the individual components, let's look at how they combine to express different emotional states:
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
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            Relaxed and Content
                        </Typography>
                        <Typography paragraph>
                            A relaxed dog is the picture of canine contentment. You'll notice:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            • Soft, relaxed facial muscles
                            <br />
                            • Mouth slightly open, possibly with tongue visible
                            <br />
                            • Ears in natural position (neither forward nor back)
                            <br />
                            • Tail in natural position for the breed, with relaxed movement
                            <br />
                            • Even weight distribution
                            <br />
                            • Smooth, fluid body movements
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            Playful
                        </Typography>
                        <Typography paragraph>
                            Play signals are designed to communicate friendly intentions. Look for:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            • The "play bow" – front end down, rear end up, tail wagging
                            <br />
                            • Bouncy, exaggerated movements
                            <br />
                            • Relaxed, open mouth that may look like a "smile"
                            <br />
                            • Play "sneezing" or short bursts of playful barking
                            <br />
                            • Exaggerated, bouncy running patterns
                            <br />
                            • Self-handicapping (deliberately playing less intensely with smaller dogs or puppies)
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            Fearful or Anxious
                        </Typography>
                        <Typography paragraph>
                            A fearful dog is trying to appear smaller and non-threatening. Signs include:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            • Lowered body posture, possibly crouching
                            <br />
                            • Tail tucked between legs
                            <br />
                            • Ears flattened back against head
                            <br />
                            • Whites of eyes visible ("whale eye")
                            <br />
                            • Tense facial muscles
                            <br />
                            • Lip licking, yawning, or panting when not hot or tired
                            <br />
                            • Trembling or shaking
                            <br />
                            • Attempting to hide or escape
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            Alert or Interested
                        </Typography>
                        <Typography paragraph>
                            When something catches your dog's attention, you'll notice:
                        </Typography>

                        <Typography paragraph sx={{ mb: 0 }}>
                            • Forward-facing ears
                            <br />
                            • Intent gaze focused on the object of interest
                            <br />
                            • Tail held horizontally or slightly raised
                            <br />
                            • Weight shifted forward
                            <br />
                            • Still or frozen posture
                            <br />
                            • Head tilting
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            Aggressive or Threatening
                        </Typography>
                        <Typography paragraph>
                            Dogs displaying aggressive signals are communicating that they feel threatened and may defend themselves. Signs include:
                        </Typography>

                        <Typography paragraph>
                            • Stiff, rigid body posture
                            <br />
                            • Weight shifted forward
                            <br />
                            • Raised hackles (hair standing up along the back)
                            <br />
                            • Direct, hard stare
                            <br />
                            • Wrinkled muzzle, possibly showing teeth
                            <br />
                            • Ears either pricked forward or flattened (depending on confidence level)
                            <br />
                            • Low growling or snarling
                            <br />
                            • Stiff, slow tail movement or high, stiff tail
                        </Typography>

                        <Typography paragraph sx={{
                            mb: 0,
                            p: 2,
                            bgcolor: 'rgba(255, 152, 0, 0.1)',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 152, 0, 0.2)',
                            fontWeight: 500
                        }}>
                            <strong>Important note:</strong> If you see these signs, give the dog space immediately. Never punish a dog for growling—it's a warning communication that should be heeded, not suppressed.
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
                        Subtle Stress Signals
                    </Typography>

                    <Typography paragraph>
                        Dogs often show subtle signs of stress before more obvious ones appear. Learning to recognize these early warning signs can help prevent escalation:
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
                            gap: 1.5
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1,
                                color: '#4caf50'
                            }}
                        >
                            Watch for These Early Warning Signs:
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Lip licking</strong> when no food is present</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Yawning</strong> when not tired</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Turning head away</strong> or averting gaze</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Sniffing the ground</strong> suddenly</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Scratching</strong> when not itchy</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Shaking off</strong> as if wet (when dry)</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Increased panting</strong> not related to heat or exercise</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography><strong>Pacing</strong> or inability to settle</Typography>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        These "calming signals" often indicate that a dog is uncomfortable and trying to diffuse tension. When you notice these signs, help your dog by removing them from the stressful situation or giving them more space.
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
                        Context Matters
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
                            When interpreting dog body language, always consider the context. The same signal can mean different things in different situations:
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>1</Box>
                            <Typography>
                                A wagging tail during a greeting likely indicates friendliness, but a wagging tail with a stiff body and hard stare could signal aggression.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>2</Box>
                            <Typography>
                                A play bow between two dogs during play is friendly, but a play bow with stiff movement toward an unfamiliar dog might be testing the waters.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                minWidth: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>3</Box>
                            <Typography>
                                Barking while bringing you a toy indicates playfulness, while barking with hackles raised at a fence line signals alertness or territoriality.
                            </Typography>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        Always look at the complete picture—the entire body, the environment, and what happened just before the behavior. This holistic approach will give you the most accurate reading of your dog's emotional state.
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
                        Breed Differences in Body Language
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
                            Physical differences between breeds can affect how body language is expressed:
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            <Box sx={{
                                minWidth: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                marginTop: 1.5
                            }}/>
                            <Typography>
                                <strong>Tail carriage:</strong> Some breeds naturally hold their tails high (Beagles, Huskies), while others have naturally low-set tails (Greyhounds). Know what's normal for your dog's breed.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            <Box sx={{
                                minWidth: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                marginTop: 1.5
                            }}/>
                            <Typography>
                                <strong>Ear position:</strong> Dogs with floppy ears (Spaniels, Basset Hounds) can't move their ears as visibly as dogs with erect ears (German Shepherds, Chihuahuas).
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            <Box sx={{
                                minWidth: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                marginTop: 1.5
                            }}/>
                            <Typography>
                                <strong>Facial expressions:</strong> Brachycephalic (flat-faced) breeds like Pugs and Bulldogs have limited facial mobility compared to longer-nosed breeds.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                minWidth: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#4caf50',
                                marginTop: 1.5
                            }}/>
                            <Typography>
                                <strong>Eye contact:</strong> Some breeds (like many sighthounds) naturally avoid direct eye contact, while others are more comfortable with it.
                            </Typography>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        These physical differences don't mean these dogs communicate less—you just need to look for more subtle variations and learn what's normal for your specific dog.
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
                        How to Respond to Your Dog's Signals
                    </Typography>

                    <Typography paragraph>
                        Once you understand what your dog is communicating, you can respond appropriately:
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
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            For fearful or anxious signals:
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Remove your dog from the stressful situation if possible. Don't force interactions. Create distance from whatever is causing fear. Use calm, gentle encouragement rather than punishment or excessive reassurance.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            For playful signals:
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Engage in appropriate play if you have time. If you can't play, offer an alternative activity or toy to redirect the energy.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            For warning or aggressive signals:
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Respect these communications. Give your dog space and don't punish warning signals. Address the underlying cause of discomfort with the help of a professional if needed.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)',
                            mb: 3
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 1.5,
                                color: '#4caf50'
                            }}
                        >
                            For attention-seeking behaviors:
                        </Typography>
                        <Typography paragraph sx={{ mb: 0 }}>
                            Respond to polite requests when reasonable, but avoid reinforcing demanding behaviors like barking or pawing by only rewarding calm behavior.
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
                        Teaching Children About Dog Body Language
                    </Typography>

                    <Typography paragraph>
                        Children are often the victims of dog bites because they miss or ignore warning signals. Teaching kids to recognize and respect dog body language is essential for safety:
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
                            gap: 1.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Explain that dogs "talk" with their bodies</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Teach them to recognize a relaxed, happy dog versus a stressed or fearful one</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Show them when it's okay to approach a dog and when to give space</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Establish clear rules about interacting with dogs (ask permission, no hugging, no approaching eating dogs, etc.)</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#4caf50'
                            }}/>
                            <Typography>Practice "be a tree" (stand still with arms folded) if approached by an unfamiliar dog</Typography>
                        </Box>
                    </Box>

                    <Typography paragraph>
                        Make learning about dog body language fun through games, pictures, and videos. This knowledge could prevent a dangerous situation in the future.
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
                        Understanding dog body language is like learning a new language—it takes time, practice, and careful observation. The effort is well worth it, as it allows you to respond appropriately to your dog's needs, prevent potential problems, and build a relationship based on mutual understanding and respect.
                    </Typography>

                    <Typography paragraph>
                        Start by observing your own dog in different situations, noting how their body language changes with their emotional state. With practice, you'll become fluent in your dog's unique dialect and better equipped to meet their needs. This deeper understanding will strengthen your bond and lead to a happier, more harmonious relationship with your canine companion.
                    </Typography>

                    <Typography paragraph>
                        Remember that if your dog consistently shows signs of fear, anxiety, or aggression, consulting with a certified dog behaviorist or trainer can provide additional guidance tailored to your specific situation.
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
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DogBodyLanguageArticle;
