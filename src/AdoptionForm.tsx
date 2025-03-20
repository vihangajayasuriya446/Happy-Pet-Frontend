import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Dialog, 
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import { Pet } from './types';
import { submitAdoption } from './api';

interface AdoptionFormProps {
    pet: Pet;
    onClose: () => void;
    onSubmit?: (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
        occupation?: string;
        reason?: string;
    }) => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onClose, onSubmit }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [formData, setFormData] = React.useState({
        userName: '',
        email: '',
        phone: '',
        address: '',
        occupation: '',
        reason: '',
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [adoptionSuccess, setAdoptionSuccess] = React.useState(false);
    const [isExistingUser, setIsExistingUser] = React.useState(false);
    const [userId, setUserId] = React.useState<number>(0);
    const [isCheckingUser, setIsCheckingUser] = React.useState(false);
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (name === 'email') {
            setIsExistingUser(false);
            setUserId(0);
        }
    };

    const checkExistingUser = async () => {
        if (!formData.email) return;
        
        setIsCheckingUser(true);
        try {
            const response = await fetch(`/api/v1/users/lookup?email=${encodeURIComponent(formData.email)}`);
            if (response.ok) {
                const userData = await response.json();
                setFormData({
                    userName: userData.user_name,
                    email: userData.email,
                    phone: userData.phone || '',
                    address: userData.address || '',
                    occupation: userData.occupation || '',
                    reason: userData.reason || '',
                });
                setUserId(userData.user_id);
                setIsExistingUser(true);
            } else {
                setIsExistingUser(false);
            }
        } catch (err) {
            console.log('Error checking for existing user', err);
        } finally {
            setIsCheckingUser(false);
        }
    };

    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreedToTerms(event.target.checked);
    };

    const handleConfirmAdoption = async () => {
        setIsSubmitting(true);
        setError(null);
        
        try {
            if (onSubmit) {
                onSubmit({
                    name: formData.userName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    occupation: formData.occupation,
                    reason: formData.reason,
                });
            }
            
            const adoptionRequest = {
                petId: pet.pet_id,
                userId: userId || undefined,
                userName: formData.userName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                occupation: formData.occupation,
                reason: formData.reason,
            };
            
            const data = await submitAdoption(adoptionRequest);
            console.log('Adoption successful:', data);
            setAdoptionSuccess(true);
            
        } catch (err) {
            console.error('Error submitting adoption:', err);
            setError(err instanceof Error ? err.message : 'Failed to process adoption');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const formIsValid = formData.userName && formData.email && formData.phone && formData.address && agreedToTerms;

    const steps = ['Your Information', 'Terms & Conditions']; // Updated steps

    const primaryDark = '#0d47a1';   // Darker shade of blue
    const primaryDarkHover = '#093271'; // Even darker for hover

    return (
        <Dialog 
            open={true} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)', // Reduced shadow for a subtle effect
                    borderRadius: '4px', // Slight border-radius for softer edges
                    overflow: 'hidden',
                }
            }}
        >
            {!adoptionSuccess && (
                <Box sx={{ 
                    bgcolor: primaryDark,
                    color: 'white',
                    py: 2,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PetsIcon sx={{ mr: 1.5, fontSize: 28 }} />
                        <Typography variant="h5" fontWeight="500">
                            Adopt {pet.pet_name}
                        </Typography>
                    </Box>
                    <Button 
                        onClick={onClose}
                        sx={{ 
                            color: 'white', 
                            borderRadius: '4px',
                            minWidth: '36px', 
                            height: '36px',
                            p: 0,
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.2)'
                            }
                        }}
                    >
                        ✕
                    </Button>
                </Box>
            )}

            <DialogContent sx={{ p: 0 }}>
                {/* Success State */}
                {adoptionSuccess && (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        px: 4,
                        bgcolor: '#f8f9fa'
                    }}>
                        <Avatar 
                            sx={{ 
                                bgcolor: '#4CAF50', 
                                width: 80, 
                                height: 80, 
                                mx: 'auto',
                                mb: 3
                            }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 48 }} />
                        </Avatar>
                        <Typography variant="h4" sx={{ mb: 2, color: '#2C3E50', fontWeight: 600 }}>
                            Adoption Request Submitted!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#5D6D7E', fontSize: '1.1rem' }}>
                            Thank you for choosing to adopt {pet.pet_name}. We will review your application and 
                            contact you within 24 hours to arrange the next steps.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            sx={{
                                mt: 2,
                                bgcolor: primaryDark,
                                '&:hover': {
                                    bgcolor: primaryDarkHover,
                                },
                                px: 4,
                                py: 1.5,
                                borderRadius: '4px',
                                textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // More subtle shadow
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Alert 
                        severity="error"
                        sx={{ 
                            m: 3, 
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                        action={
                            <Button 
                                color="inherit" 
                                size="small"
                                onClick={() => setError(null)}
                                sx={{ 
                                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}
                            >
                                Try Again
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                )}

                {/* Form State */}
                {!adoptionSuccess && (
                    <Box>
                        {/* Stepper */}
                        <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                            <Stepper activeStep={activeStep} alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>

                        {/* Step Content */}
                        <Box sx={{ p: 3 }}>
                            {activeStep === 0 && (
                                <Box>
                                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '4px', mb: 3 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <PersonIcon sx={{ color: primaryDark, mr: 1.5 }} />
                                                <Typography variant="h6" fontWeight="600">
                                                    Your Contact Information
                                                </Typography>
                                            </Box>
                                            
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                            Email Address*
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                            <TextField
                                                                fullWidth
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                required
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder="your.email@example.com"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '4px',
                                                                        '&:hover fieldset': {
                                                                            borderColor: primaryDark,
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: primaryDark,
                                                                        },
                                                                    }
                                                                }}
                                                            />
                                                            <Button 
                                                                variant="outlined"
                                                                onClick={checkExistingUser} 
                                                                disabled={!formData.email || isCheckingUser}
                                                                sx={{ 
                                                                    minWidth: '100px',
                                                                    textTransform: 'none',
                                                                    borderColor: primaryDark,
                                                                    color: primaryDark,
                                                                    borderRadius: '4px',
                                                                    '&:hover': {
                                                                        borderColor: primaryDarkHover,
                                                                        bgcolor: 'rgba(33, 150, 243, 0.04)'
                                                                    }
                                                                }}
                                                                startIcon={<SearchIcon />}
                                                            >
                                                                {isCheckingUser ? 'Checking...' : 'Look Up'}
                                                            </Button>
                                                        </Box>
                                                        {isExistingUser && (
                                                            <Typography variant="caption" sx={{ color: '#2E7D32', mt: 0.5, display: 'block' }}>
                                                                Welcome back! We've pre-filled your information.
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                        Full Name*
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="userName"
                                                        value={formData.userName}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder="John Smith"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '4px',
                                                                '&:hover fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                        Phone Number*
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder="(123) 456-7890"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '4px',
                                                                '&:hover fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                        Address*
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        required
                                                        variant="outlined"
                                                        size="small"
                                                        multiline
                                                        rows={2}
                                                        placeholder="123 Main St, City, State, ZIP"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '4px',
                                                                '&:hover fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <ArticleIcon sx={{ color: primaryDark, mr: 1.5 }} />
                                                <Typography variant="h6" fontWeight="600">
                                                    Additional Information
                                                </Typography>
                                            </Box>
                                            
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                        Occupation
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="occupation"
                                                        value={formData.occupation}
                                                        onChange={handleChange}
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder="Your Occupation"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '4px',
                                                                '&:hover fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#5D6D7E' }}>
                                                        Reason for Adoption
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="reason"
                                                        value={formData.reason}
                                                        onChange={handleChange}
                                                        variant="outlined"
                                                        size="small"
                                                        multiline
                                                        rows={3}
                                                        placeholder="Why do you want to adopt this pet?"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '4px',
                                                                '&:hover fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: primaryDark,
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '4px', mb: 3 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <ArticleIcon sx={{ color: primaryDark, mr: 1.5 }} />
                                                <Typography variant="h6" fontWeight="600">
                                                    Terms & Conditions
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ 
                                                bgcolor: '#f8f9fa', 
                                                p: 2, 
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                mb: 2,
                                                height: '300px',
                                                overflow: 'auto',
                                            }}>
                                                <Accordion defaultExpanded sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            1. Adoption Commitment
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            By adopting {pet.pet_name}, you agree to provide a safe, loving home environment, proper nutrition, regular exercise, and all necessary medical care. You must ensure that {pet.pet_name} is not subjected to any form of abuse, neglect, or harm.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider sx={{ my: 1 }} />

                                                <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            2. Financial Responsibility
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            You agree to cover all necessary expenses, including food, medical care, grooming, and any emergency veterinary services for the life of {pet.pet_name}. Failure to provide adequate care may result in the revocation of the adoption.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider sx={{ my: 1 }} />

                                                <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            3. Home Delivery & Inspection
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            {pet.pet_name} will be delivered to your doorstep within 3-5 business days following approval of your application. Our team may conduct a home inspection to ensure the environment is suitable for {pet.pet_name}.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider sx={{ my: 1 }} />

                                                <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            4. Return Policy
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            If you can no longer care for {pet.pet_name}, you agree to return them to our shelter rather than rehoming independently. Unauthorized rehoming may result in legal action.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider sx={{ my: 1 }} />

                                                <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            5. Legal Ownership
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            Legal ownership of {pet.pet_name} will be transferred to you upon successful completion of the adoption process. You are responsible for complying with all local laws and regulations regarding pet ownership.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider sx={{ my: 1 }} />

                                                <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: primaryDark }}>
                                                            6. Liability Waiver
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                                                            You agree to waive any liability against the shelter for any damages, injuries, or losses caused by {pet.pet_name} after the adoption is finalized.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Box>
                                            
                                            <Box sx={{ 
                                                p: 2, 
                                                borderRadius: '4px',
                                                bgcolor: '#f1f8fe',
                                                border: '1px solid #d0e6f8' 
                                            }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox 
                                                            checked={agreedToTerms}
                                                            onChange={handleTermsChange}
                                                            sx={{
                                                                color: primaryDark,
                                                                '&.Mui-checked': {
                                                                    color: primaryDark,
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 500 }}>
                                                            I have read and agree to the adoption terms and conditions
                                                        </Typography>
                                                    }
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
            </DialogContent>
            
            {!adoptionSuccess && (
                <DialogActions sx={{ 
                    justifyContent: 'space-between', 
                    px: 3, 
                    py: 2, 
                    bgcolor: '#f8f9fa',
                    borderTop: '1px solid #e0e0e0',
                }}>
                    <Button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{
                            textTransform: 'none',
                            color: primaryDark,
                            '&:hover': {
                                bgcolor: 'rgba(33, 150, 243, 0.08)',
                            },
                            borderRadius: '4px',
                            px: 3,
                            py: 1,
                        }}
                    >
                        Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                        <Button
                            onClick={handleConfirmAdoption}
                            disabled={!formIsValid || isSubmitting}
                            variant="contained"
                            sx={{
                                bgcolor: primaryDark,
                                '&:hover': {
                                    bgcolor: primaryDarkHover,
                                },
                                textTransform: 'none',
                                borderRadius: '4px',
                                px: 4,
                                py: 1,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // More subtle shadow
                            }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                'Confirm Adoption'
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={activeStep === steps.length - 1}
                            variant="contained"
                            sx={{
                                bgcolor: primaryDark,
                                '&:hover': {
                                    bgcolor: primaryDarkHover,
                                },
                                textTransform: 'none',
                                borderRadius: '4px',
                                px: 4,
                                py: 1,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // More subtle shadow
                            }}
                        >
                            Next
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default AdoptionForm;