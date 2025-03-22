import { FC, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Breadcrumbs,
    Link as MuiLink,
    Fade,
    Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PetsIcon from '@mui/icons-material/Pets';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './styles.css';

// Define types for our data
interface Article {
    id: string;
    title: string;
    description: string;
    image: string;
    category: keyof typeof articleHeadings;
    slug: string;
}

// Define article headings with proper typing
const articleHeadings = {
    'PREPARATION': 'Essential Home Preparation',
    'BREEDS': 'Finding Your Perfect Breed',
    'TRAINING': 'Basic Training Essentials',
    'BEHAVIOR': 'Understanding Dog Communication',
    'HEALTH': 'Essential Health Care'
} as const;

// Sample article data
const articles: Article[] = [
    {
        id: '1',
        title: 'Preparing Your Home for a New Dog',
        description: 'Essential tips for making your home safe and comfortable for your new canine companion.',
        image: '/images/article1.jpeg',
        category: 'PREPARATION',
        slug: 'preparing-your-home-for-a-new-dog'
    },
    {
        id: '2',
        title: 'Choosing the Right Dog Breed',
        description: 'Learn which type of dog will be the best match for your living situation and activity level.',
        image: '/images/article2.jpeg',
        category: 'BREEDS',
        slug: 'choosing-the-right-dog-breed'
    },
    {
        id: '3',
        title: 'Basic Obedience Training',
        description: 'Start off on the right paw with these essential commands every dog should know.',
        image: '/images/article3.jpeg',
        category: 'TRAINING',
        slug: 'basic-obedience-training'
    },
    {
        id: '4',
        title: 'Understanding Dog Body Language',
        description: 'Learn how to interpret what your dog is trying to tell you through their posture, tail, ears, and other signals.',
        image: '/images/article4.jpeg',
        category: 'BEHAVIOR',
        slug: 'understanding-dog-body-language'
    },
    {
        id: '5',
        title: 'Essential Health Care for Your New Dog',
        description: 'Learn about vaccinations, regular check-ups, and preventative care for your canine companion.',
        image: '/images/article5.jpeg',
        category: 'HEALTH',
        slug: 'essential-health-care-for-your-new-dog'
    }
];

// Define color scheme for categories with proper typing
const categoryColors: Record<keyof typeof articleHeadings, string> = {
    'PREPARATION': '#3f51b5',
    'BREEDS': '#2196f3',
    'TRAINING': '#ff9800',
    'BEHAVIOR': '#4caf50',
    'HEALTH': '#9c27b0'
};

// Define props type for ArticleCard component
interface ArticleCardProps {
    title: string;
    description: string;
    image: string;
    category: keyof typeof articleHeadings;
    slug: string;
}

const ArticleCard: FC<ArticleCardProps> = ({ title, description, image, category, slug }) => (
    <Paper
        component={Link}
        to={`/dog-adoption-articles/${slug}`}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 3,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            position: 'relative',
            '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                '& .articleImage': {
                    transform: 'scale(1.05)'
                },
                '& .readMore': {
                    color: categoryColors[category],
                    transform: 'translateX(5px)'
                }
            }
        }}
    >
        <Box
            sx={{
                position: 'relative',
                paddingTop: '60%',
                overflow: 'hidden'
            }}
        >
            <Box
                component="img"
                src={image}
                alt={title}
                className="articleImage"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                }}
            />
            <Chip
                label={category}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: categoryColors[category],
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            />
        </Box>
        <Box
            sx={{
                p: 3,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)'
            }}
        >
            <Typography
                variant="h6"
                component="h3"
                color="text.primary"
                sx={{
                    mb: 1.5,
                    lineHeight: 1.3,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 2.5,
                    flexGrow: 1,
                    lineHeight: 1.6,
                    opacity: 0.8
                }}
            >
                {description}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 'auto'
                }}
                className="readMore"
            >
                <Typography
                    variant="button"
                    sx={{
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                    className="readMore"
                >
                    READ MORE
                    <ArrowForwardIcon sx={{ fontSize: '1rem', transition: 'transform 0.3s' }} />
                </Typography>
            </Box>
        </Box>
    </Paper>
);

const DogAdoptionArticles: FC = () => {
    // Animation states
    const [animate, setAnimate] = useState(false);

    // Trigger animations on component mount
    useEffect(() => {
        setAnimate(true);
    }, []);

    // Find the health article
    const healthArticle = articles.find(article => article.category === 'HEALTH');
    // Get all non-health articles
    const nonHealthArticles = articles.filter(article => article.category !== 'HEALTH');

    return (
        <Box>
            <Box sx={{ bgcolor: 'background.paper', py: 1.5, px: 2 }}>
                <Container maxWidth="lg">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <MuiLink component={Link} to="/" color="inherit" underline="hover">
                            Home
                        </MuiLink>
                        <Typography color="text.primary">Dog Adoption Articles</Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            {/* Enhanced Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #003366 0%, #1a4d80 100%)',
                    color: 'white',
                    py: 8,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative paw prints */}
                <Box sx={{ position: 'absolute', top: 20, right: 40, opacity: 0.1 }}>
                    <PetsIcon sx={{ fontSize: 60, transform: 'rotate(30deg)' }} />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 30, left: 60, opacity: 0.1 }}>
                    <PetsIcon sx={{ fontSize: 40, transform: 'rotate(-20deg)' }} />
                </Box>

                <Container maxWidth="lg">
                    <Fade in={animate} timeout={800}>
                        <Box>
                            <Typography
                                variant="overline"
                                component="div"
                                sx={{
                                    letterSpacing: 2,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <PetsIcon fontSize="small" /> HELPFUL RESOURCES
                            </Typography>

                            <Typography
                                variant="h2"
                                component="h1"
                                align="center"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    animation: animate ? 'fadeInUp 1s ease' : 'none'
                                }}
                            >
                                Dog Adoption Articles
                            </Typography>

                            <Typography
                                variant="h6"
                                align="center"
                                sx={{
                                    maxWidth: 800,
                                    mx: 'auto',
                                    mb: 4,
                                    fontWeight: 300,
                                    lineHeight: 1.6,
                                    animation: animate ? 'fadeInUp 1.2s ease' : 'none'
                                }}
                            >
                                Find helpful information about adopting and caring for your new furry family member.
                                Our expert-written articles cover everything from choosing the right dog to training and health care.
                            </Typography>
                            <style>{`
                                @keyframes fadeInUp {
                                    from { opacity: 0; transform: translateY(20px); }
                                    to { opacity: 1; transform: translateY(0); }
                                }
                            `}</style>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    {/* Articles Section */}
                    <Grid item xs={12} md={8}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                mb: 4,
                                pb: 1,
                                borderBottom: '2px solid #3f51b5',
                                display: 'inline-block'
                            }}
                        >
                            Preparing for Adoption
                        </Typography>

                        <Grid container spacing={4}>
                            {/* Display articles in a more organized way */}
                            {nonHealthArticles.map((article) => (
                                <Grid item xs={12} sm={6} key={article.id}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            sx={{
                                                mb: 2,
                                                pb: 1,
                                                width: '100%'
                                            }}
                                        >
                                            {articleHeadings[article.category]}
                                        </Typography>
                                        <ArticleCard
                                            title={article.title}
                                            description={article.description}
                                            image={article.image}
                                            category={article.category}
                                            slug={article.slug}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Sidebar Column */}
                    <Grid item xs={12} md={4}>
                        {/* Categories Box */}
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                bgcolor: '#f8f9fa',
                                borderRadius: 3,
                                mb: 4,
                                border: '1px solid #e0e0e0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="h3"
                                sx={{
                                    mb: 3,
                                    pb: 1,
                                    borderBottom: '2px solid #3f51b5',
                                    color: '#003366',
                                    fontWeight: 600
                                }}
                            >
                                Categories
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[
                                    { name: 'Preparation', color: '#3f51b5' },
                                    { name: 'Training', color: '#ff9800' },
                                    { name: 'Breeds', color: '#2196f3' },
                                    { name: 'Behaviour', color: '#4caf50' },
                                    { name: 'Health', color: '#9c27b0' }
                                ].map((category) => (
                                    <Box
                                        key={category.name}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: `${category.color}10`,
                                            color: category.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            border: `1px solid ${category.color}20`,
                                            '&:hover': {
                                                bgcolor: `${category.color}20`,
                                                transform: 'translateX(5px)'
                                            }
                                        }}
                                    >
                                        <PetsIcon
                                            sx={{
                                                fontSize: '1.2rem',
                                                color: category.color
                                            }}
                                        />
                                        <Typography sx={{ fontWeight: 500 }}>{category.name}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        {/* Health Article Card - Positioned below categories */}
                        {healthArticle && (
                            <Box>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        mb: 2,
                                        pb: 1,
                                        width: '100%'
                                    }}
                                >
                                    {articleHeadings[healthArticle.category]}
                                </Typography>
                                <ArticleCard
                                    title={healthArticle.title}
                                    description={healthArticle.description}
                                    image={healthArticle.image}
                                    category={healthArticle.category}
                                    slug={healthArticle.slug}
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DogAdoptionArticles;
