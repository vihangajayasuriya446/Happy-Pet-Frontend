import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Divider,
  styled,
  Container,
  useTheme,
  Fab
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Pets as PetsIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

interface Section {
  title: string;
  items: string[];
}

const sections: Section[] = [
  {
    title: "General Preparation",
    items: [
      "Research the Breed or Species",
      "Assess Your Lifestyle",
      "Calculate Expenses",
      "Pet-Proof Your Home",
      "Identify a Veterinarian",
      "Get Essential Supplies"
    ]
  },
  {
    title: "For Pet Adoption",
    items: [
      "Choose a Reputable Shelter",
      "Meet the Pet",
      "Understand the Pet's History",
      "Prepare for Transition Period",
      "Register Your Pet"
    ]
  },
  {
    title: "For Buying a Pet",
    items: [
      "Find a Reputable Breeder",
      "Inspect Living Conditions",
      "Review Medical History",
      "Ensure Proper Socialization",
      "Complete Legal Paperwork"
    ]
  },
  {
    title: "For Pet Matchmaking & Breeding",
    items: [
      "Choose Breeding Partner",
      "Conduct Health Checks",
      "Understand Breeding Ethics",
      "Prepare for Pregnancy",
      "Plan for Offspring"
    ]
  },
  {
    title: "Post-Adoption Care",
    items: [
      "Schedule Vet Visit",
      "Introduce New Environments",
      "Start Basic Training",
      "Monitor Health & Nutrition",
      "Build a Strong Bond"
    ]
  }
];

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)'
  }
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  minWidth: 100,
  color: theme.palette.text.secondary
}));

const PetLoversChecklist = () => {
  const theme = useTheme();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>(
    Object.fromEntries(sections.map((_, i) => [i, true])
  ));

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCheckboxChange = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const calculateSectionScore = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    let checkedCount = 0;
    section.items.forEach((_, itemIndex) => {
      const key = `${sectionIndex}-${itemIndex}`;
      if (checkedItems[key]) checkedCount++;
    });
    return {
      checked: checkedCount,
      total: section.items.length,
      percentage: Math.round((checkedCount / section.items.length) * 100)
    };
  };

  const calculateTotalScore = () => {
    let totalChecked = 0;
    let totalItems = 0;
    sections.forEach((section, sectionIndex) => {
      section.items.forEach((_, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        if (checkedItems[key]) totalChecked++;
        totalItems++;
      });
    });
    return {
      checked: totalChecked,
      total: totalItems,
      percentage: Math.round((totalChecked / totalItems) * 100)
    };
  };

  const totalScore = calculateTotalScore();

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 7,
      position: 'relative'
    }}>
      {/* Back to Top Button */}
      {showScroll && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            backgroundColor: 'rgba(0, 51, 102, 0.9)',
            color: 'white',
            '&:hover': {
              backgroundColor: '#003366',
              boxShadow: theme.shadows[6]
            },
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            
          }}
          size="medium"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      )}

      {/* Main outer container with barely visible border */}
      <Container maxWidth="md" sx={{ 
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          borderRadius: 12,
          border: '1px solid rgba(0, 51, 102, 0.1)',
          pointerEvents: 'none',
          zIndex: -1
        }
      }}>
        <Box sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.13)',
          borderRadius: 8,
          p: { xs: 2, sm: 4 },
          boxShadow: '0 8px 32px rgba(0, 51, 102, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          <Box sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 4,
            p: 4,
            mb: 4,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                color: '#003366',
                textAlign: 'center',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <PetsIcon fontSize="large" />
              Checklist for New Pet Lovers
              <PetsIcon fontSize="large" />
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                textAlign: 'center', 
                mb: 3,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                lineHeight: 1.6
              }}
            >
              Welcoming a pet into your home is an exciting and rewarding experience. 
              Whether you are adopting, buying, or engaging in pet matchmaking for breeding, 
              it's essential to ensure a smooth transition for both you and your new companion.
              <br /><br />
              Completing this checklist will help you understand all the necessary preparations 
              for pet ownership, ensuring you're fully ready to provide a loving and responsible 
              home for your new furry friend.
            </Typography>
            
            <Box sx={{ 
              backgroundColor: 'rgba(0, 51, 102, 0.1)', 
              p: 3, 
              borderRadius: 2,
              borderLeft: '4px solid #003366'
            }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: '#003366',
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }
                }}
              >
                Overall Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={totalScore.percentage} 
                sx={{ 
                  height: 10,
                  borderRadius: 5,
                  mb: 1,
                  backgroundColor: 'rgba(0, 51, 102, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#003366'
                  }
                }}
              />
              <ProgressContainer>
                <ProgressText variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {totalScore.percentage}% Complete
                </ProgressText>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {totalScore.checked} of {totalScore.total} items checked
                </Typography>
              </ProgressContainer>
            </Box>
          </Box>

          {sections.map((section, sectionIndex) => {
            const sectionScore = calculateSectionScore(sectionIndex);
            const isExpanded = expandedSections[sectionIndex];
            
            return (
              <StyledCard key={sectionIndex}>
                <CardHeader
                  title={
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#003366', 
                        fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }
                      }}
                    >
                      {section.title}
                    </Typography>
                  }
                  action={
                    <IconButton 
                      onClick={() => toggleSection(sectionIndex)}
                      sx={{ color: '#003366' }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  }
                  subheader={
                    <ProgressContainer>
                      <LinearProgress 
                        variant="determinate" 
                        value={sectionScore.percentage} 
                        sx={{ 
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(0, 51, 102, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#003366'
                          }
                        }}
                      />
                      <ProgressText variant="caption" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        {sectionScore.checked}/{sectionScore.total} ({sectionScore.percentage}%)
                      </ProgressText>
                    </ProgressContainer>
                  }
                  sx={{
                    '& .MuiCardHeader-content': {
                      overflow: 'hidden'
                    }
                  }}
                />
                
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Divider sx={{ backgroundColor: 'rgba(0, 51, 102, 0.1)' }} />
                  <List dense disablePadding>
                    {section.items.map((item, itemIndex) => {
                      const key = `${sectionIndex}-${itemIndex}`;
                      const isChecked = !!checkedItems[key];
                      
                      return (
                        <ListItem 
                          key={itemIndex} 
                          disablePadding
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(sectionIndex, itemIndex)}
                              icon={<RadioButtonUncheckedIcon sx={{ color: '#003366' }} />}
                              checkedIcon={<CheckCircleOutlineIcon sx={{ color: '#003366' }} />}
                            />
                          }
                        >
                          <ListItemButton onClick={() => handleCheckboxChange(sectionIndex, itemIndex)}>
                            <ListItemText 
                              primary={item} 
                              primaryTypographyProps={{
                                sx: {
                                  textDecoration: isChecked ? 'line-through' : 'none',
                                  color: isChecked ? theme.palette.text.secondary : '#003366',
                                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' }
                                }
                              }} 
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </StyledCard>
            );
          })}

          <Box sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 4,
            p: 4,
            mt: 4,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Typography 
              variant="body1" 
              fontStyle="italic" 
              sx={{ 
                textAlign: 'center', 
                color: '#003366',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
              }}
            >
              "Bringing a pet into your home is a lifelong commitment. By following this checklist, 
              you'll create a loving and responsible environment where your furry friend can thrive!"
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PetLoversChecklist;