import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Alert,
  Fab,

  Container,
  useTheme,
  styled
} from '@mui/material';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Pets as PetsIcon,
  
} from '@mui/icons-material';
import petImage from './assets/Picture.jpg';

// Styled components with glassmorphism effect
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

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#003366',
  fontWeight: 600,
  fontSize: '1.5rem'
}));

const StyledTable = styled(TableContainer)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(6px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  marginBottom: theme.spacing(3)
}));

const StyledTableCell = styled(TableCell)({
  borderBottom: '1px solid rgba(0, 51, 102, 0.1)',
  fontWeight: 500,
  fontSize: '1rem'
});

const StyledTableHeadCell = styled(TableCell)({
  fontWeight: 600,
  backgroundColor: 'rgba(0, 51, 102, 0.05)',
  fontSize: '1.1rem'
});

// Type definitions
type PetType = 'dog' | 'cat' | 'bird';
type DogSize = 'small' | 'medium' | 'large';
type BirdSpecies = 'budgie' | 'cockatiel' | 'parrot' | 'canary';

interface AgeConversion {
  petAge: number;
  humanAge: number;
}

interface DogAgeData {
  small: AgeConversion[];
  medium: AgeConversion[];
  large: AgeConversion[];
}

interface BirdAgeData {
  [species: string]: {
    lifespan: string;
    conversionRate: string;
  };
}

// Data
const dogData: DogAgeData = {
  small: [
    { petAge: 1, humanAge: 15 },
    { petAge: 2, humanAge: 24 },
    { petAge: 5, humanAge: 36 },
    { petAge: 10, humanAge: 56 },
    { petAge: 15, humanAge: 76 },
  ],
  medium: [
    { petAge: 1, humanAge: 15 },
    { petAge: 2, humanAge: 24 },
    { petAge: 5, humanAge: 40 },
    { petAge: 10, humanAge: 60 },
    { petAge: 15, humanAge: 83 },
  ],
  large: [
    { petAge: 1, humanAge: 14 },
    { petAge: 2, humanAge: 22 },
    { petAge: 5, humanAge: 45 },
    { petAge: 10, humanAge: 75 },
    { petAge: 15, humanAge: 100 },
  ],
};

const catData: AgeConversion[] = [
  { petAge: 1, humanAge: 15 },
  { petAge: 2, humanAge: 24 },
  { petAge: 5, humanAge: 36 },
  { petAge: 10, humanAge: 56 },
  { petAge: 15, humanAge: 76 },
  { petAge: 20, humanAge: 96 },
];

const birdData: BirdAgeData = {
  budgie: {
    lifespan: '5-10',
    conversionRate: '10-15 Human Years',
  },
  cockatiel: {
    lifespan: '15-25',
    conversionRate: '5-6 Human Years',
  },
  parrot: {
    lifespan: '30-80',
    conversionRate: '2-3 Human Years',
  },
  canary: {
    lifespan: '10-15',
    conversionRate: '7-9 Human Years',
  },
};

const PetAgeCalculator: React.FC = () => {
  const theme = useTheme();
  const [petType, setPetType] = useState<PetType>('dog');
  const [dogSize, setDogSize] = useState<DogSize>('medium');
  const [birdSpecies, setBirdSpecies] = useState<BirdSpecies>('cockatiel');
  const [petAge, setPetAge] = useState<number>(2);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
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

  const calculateHumanAge = () => {
    let result: number | null = null;

    if (petType === 'dog') {
      const sizeData = dogData[dogSize];
      const exactMatch = sizeData.find(item => item.petAge === petAge);
      
      if (exactMatch) {
        result = exactMatch.humanAge;
      } else {
        // Find closest ages for interpolation
        let lower = sizeData[0];
        let upper = sizeData[sizeData.length - 1];
        
        for (let i = 0; i < sizeData.length - 1; i++) {
          if (sizeData[i].petAge < petAge && sizeData[i + 1].petAge > petAge) {
            lower = sizeData[i];
            upper = sizeData[i + 1];
            break;
          }
        }
        
        // Linear interpolation
        const ratio = (petAge - lower.petAge) / (upper.petAge - lower.petAge);
        result = Math.round(lower.humanAge + ratio * (upper.humanAge - lower.humanAge));
      }
    } else if (petType === 'cat') {
      const exactMatch = catData.find(item => item.petAge === petAge);
      
      if (exactMatch) {
        result = exactMatch.humanAge;
      } else {
        // Find closest ages for interpolation
        let lower = catData[0];
        let upper = catData[catData.length - 1];
        
        for (let i = 0; i < catData.length - 1; i++) {
          if (catData[i].petAge < petAge && catData[i + 1].petAge > petAge) {
            lower = catData[i];
            upper = catData[i + 1];
            break;
          }
        }
        
        // Linear interpolation
        const ratio = (petAge - lower.petAge) / (upper.petAge - lower.petAge);
        result = Math.round(lower.humanAge + ratio * (upper.humanAge - lower.humanAge));
      }
    } else if (petType === 'bird') {
      // Birds use a different calculation method
      const speciesData = birdData[birdSpecies];
      const rateRange = speciesData.conversionRate.match(/\d+/g);
      
      if (rateRange && rateRange.length === 2) {
        const minRate = parseInt(rateRange[0]);
        const maxRate = parseInt(rateRange[1]);
        const avgRate = (minRate + maxRate) / 2;
        result = Math.round(petAge * avgRate);
      }
    }

    setCalculatedAge(result);
  };

  useEffect(() => {
    calculateHumanAge();
  }, [petType, dogSize, birdSpecies, petAge]);

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 7,
      position: 'relative',
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
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 8,
          p: { xs: 2, sm: 4 },
          boxShadow: '0 8px 32px rgba(0, 51, 102, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          {/* Header Card */}
          <StyledCard>
            <CardContent>
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
                How Old Are Pets in Human Years?
                <PetsIcon fontSize="large" />
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <img 
                  src={petImage} 
                  alt="Various pets" 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    borderRadius: 8,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }} 
                />
              </Box>
              
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
                Have you ever wondered how your pet's age compares to human years? While it's fun to translate pet years into human years, 
                it also helps in understanding their developmental stages, care needs, and life expectancy.
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Calculator Section */}
          <StyledCard>
            <CardContent>
              <SectionHeader variant="h5">
                Pet Age Calculator
                
              </SectionHeader>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="pet-type-label">Pet Type</InputLabel>
                    <Select
                      labelId="pet-type-label"
                      value={petType}
                      label="Pet Type"
                      onChange={(e) => setPetType(e.target.value as PetType)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 1
                      }}
                    >
                      <MenuItem value="dog">Dog</MenuItem>
                      <MenuItem value="cat">Cat</MenuItem>
                      <MenuItem value="bird">Bird</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Pet's Age"
                    value={petAge}
                    onChange={(e) => setPetAge(parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0, max: 100 }}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: 1
                    }}
                  />
                </Grid>
                
                {petType === 'dog' && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="dog-size-label">Dog Size</InputLabel>
                      <Select
                        labelId="dog-size-label"
                        value={dogSize}
                        label="Dog Size"
                        onChange={(e) => setDogSize(e.target.value as DogSize)}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: 1
                        }}
                      >
                        <MenuItem value="small">Small Breeds (Under 20 lbs)</MenuItem>
                        <MenuItem value="medium">Medium Breeds (20–50 lbs)</MenuItem>
                        <MenuItem value="large">Large Breeds (50+ lbs)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                
                {petType === 'bird' && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="bird-species-label">Bird Species</InputLabel>
                      <Select
                        labelId="bird-species-label"
                        value={birdSpecies}
                        label="Bird Species"
                        onChange={(e) => setBirdSpecies(e.target.value as BirdSpecies)}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: 1
                        }}
                      >
                        <MenuItem value="budgie">Budgie</MenuItem>
                        <MenuItem value="cockatiel">Cockatiel</MenuItem>
                        <MenuItem value="parrot">Parrot</MenuItem>
                        <MenuItem value="canary">Canary</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                
                {calculatedAge !== null && (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ 
                      mt: 2,
                      backgroundColor: 'rgba(0, 51, 102, 0.1)',
                      borderLeft: '4px solid #003366'
                    }}>
                      <Typography variant="h6" sx={{ color: '#003366', fontSize: '1.2rem' }}>
                        Your {petType} is approximately <strong>{calculatedAge}</strong> human years old!
                      </Typography>
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </StyledCard>

          {/* Dogs Section */}
          <StyledCard>
            <CardContent>
              <SectionHeader variant="h5">Dogs: Age Conversion</SectionHeader>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                Dogs age much faster in their early years, but the rate varies depending on their size and breed. 
                The traditional "1 dog year = 7 human years" rule is inaccurate. Here's a better approximation:
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ color: '#003366', fontWeight: 600, fontSize: '1.3rem' }}>
                Dog Age Chart by Size
              </Typography>
              
              <StyledTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>Dog's Age</StyledTableHeadCell>
                      <StyledTableHeadCell>Small Breeds (Under 20 lbs)</StyledTableHeadCell>
                      <StyledTableHeadCell>Medium Breeds (20–50 lbs)</StyledTableHeadCell>
                      <StyledTableHeadCell>Large Breeds (50+ lbs)</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 5, 10, 15].map((age) => (
                      <TableRow key={age}>
                        <StyledTableCell>{age} Year{age !== 1 ? 's' : ''}</StyledTableCell>
                        <StyledTableCell>{dogData.small.find(a => a.petAge === age)?.humanAge} Human Years</StyledTableCell>
                        <StyledTableCell>{dogData.medium.find(a => a.petAge === age)?.humanAge} Human Years</StyledTableCell>
                        <StyledTableCell>{dogData.large.find(a => a.petAge === age)?.humanAge} Human Years</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTable>
              
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Larger breeds tend to have shorter lifespans, so they age faster after the first couple of years.
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Cats Section */}
          <StyledCard>
            <CardContent>
              <SectionHeader variant="h5">Cats: Age Conversion</SectionHeader>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                Cats age quickly in their first two years and then slow down compared to dogs. Here's a general conversion:
              </Typography>
              
              <StyledTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>Cat's Age</StyledTableHeadCell>
                      <StyledTableHeadCell>Human Equivalent</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {catData.map((row) => (
                      <TableRow key={row.petAge}>
                        <StyledTableCell>{row.petAge} Year{row.petAge !== 1 ? 's' : ''}</StyledTableCell>
                        <StyledTableCell>{row.humanAge} Human Years</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTable>
              
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Most indoor cats live between 12 to 20 years, while outdoor cats have shorter lifespans due to environmental risks.
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Birds Section */}
          <StyledCard>
            <CardContent>
              <SectionHeader variant="h5">Birds: Age Conversion</SectionHeader>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                Bird aging varies significantly by species. The lifespan of a bird depends on its size, diet, and environment. 
                Here's an estimate for some common pet birds:
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ color: '#003366', fontWeight: 600, fontSize: '1.3rem' }}>
                Bird Age Chart
              </Typography>
              
              <StyledTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>Bird Species</StyledTableHeadCell>
                      <StyledTableHeadCell>Lifespan (Years)</StyledTableHeadCell>
                      <StyledTableHeadCell>Human Equivalent per Year</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(birdData).map(([species, data]) => (
                      <TableRow key={species}>
                        <StyledTableCell>{species.charAt(0).toUpperCase() + species.slice(1)}</StyledTableCell>
                        <StyledTableCell>{data.lifespan}</StyledTableCell>
                        <StyledTableCell>{data.conversionRate}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTable>
              
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Larger bird species like macaws and African grey parrots can live up to 80 years, making them lifelong companions.
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Why It Matters Section */}
          <StyledCard>
            <CardContent>
              <SectionHeader variant="h5">Why Understanding Pet Age Matters</SectionHeader>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                Knowing your pet's equivalent human age helps:
              </Typography>
              
              <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>Provide appropriate nutrition for their life stage.</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>Schedule regular vet visits for age-related concerns.</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>Adjust exercise and mental stimulation for their energy levels.</Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>Recognize signs of aging and provide better senior pet care.</Typography>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                While these conversions are just approximations, they offer insight into your pet's developmental stages 
                and help ensure they get the care they need at every phase of life!
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Container>
    </Box>
  );
};

export default PetAgeCalculator;