import React from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Pet } from './types';

interface AdoptionFormProps {
    pet: Pet;
    onClose: () => void;
    onSubmit?: (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }) => void;
}

const steps = ['Your Details', 'Terms & Conditions', 'Confirmation'];

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        userName: '',
        email: '',
        phone: '',
        address: '',
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [adoptionSuccess, setAdoptionSuccess] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleAgree = () => {
        handleNext();
    };

    const handleConfirmAdoption = async () => {
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Call onSubmit callback if provided (for any local state updates)
            if (onSubmit) {
                onSubmit({
                    name: formData.userName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address
                });
            }
            
            // Format request to match your backend DTO
            const adoptionRequest = {
                petId: pet.pet_id, // Make sure this matches the ID field name from your Pet entity
                userName: formData.userName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address
            };
            
            // Send adoption request to backend
            const response = await fetch('/api/adoptions/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adoptionRequest),
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to submit adoption request');
            }
            
            const data = await response.json();
            console.log('Adoption successful:', data);
            setAdoptionSuccess(true);
            
        } catch (err) {
            console.error('Error submitting adoption:', err);
            setError(err instanceof Error ? err.message : 'Failed to process adoption');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get pet image, with fallback
    const petImage = pet.image_url ? pet.image_url : '/default-pet-image.jpg';

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555', textAlign: 'center' }}>
                            Please provide your details to proceed with the adoption.
                        </Typography>
                        <TextField
                            fullWidth
                            label="Your Name"
                            name="userName" // Changed to match DTO field name
                            value={formData.userName}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                            variant="outlined"
                            InputProps={{ style: { borderRadius: '12px', fontFamily: 'Nunito Sans' } }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                            variant="outlined"
                            InputProps={{ style: { borderRadius: '12px', fontFamily: 'Nunito Sans' } }}
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                            variant="outlined"
                            InputProps={{ style: { borderRadius: '12px', fontFamily: 'Nunito Sans' } }}
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                            multiline
                            rows={3}
                            variant="outlined"
                            InputProps={{ style: { borderRadius: '12px', fontFamily: 'Nunito Sans' } }}
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: '#003366', textAlign: 'center', fontWeight: 'bold' }}>
                            Terms & Conditions
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            1. By adopting {pet.pet_name}, you agree to provide a safe and loving home.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            2. You agree to cover all necessary expenses, including food, medical care, and grooming.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            3. You understand that {pet.pet_name} will be delivered to your doorstep within 3-5 business days.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            4. If you can no longer care for {pet.pet_name}, you agree to return them to our shelter.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                sx={{ 
                                    backgroundColor: '#003366', 
                                    color: 'white', 
                                    borderRadius: '12px',
                                    fontFamily: 'Nunito Sans',
                                    '&:hover': { backgroundColor: '#002244' }
                                }}
                                onClick={handleAgree}
                            >
                                I Agree
                            </Button>
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ textAlign: 'center' }}>
                        {isSubmitting ? (
                            <CircularProgress sx={{ color: '#003366' }} />
                        ) : error ? (
                            <>
                                <ErrorIcon sx={{ fontSize: '60px', color: '#f44336', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, color: '#f44336', fontWeight: 'bold' }}>
                                    Error Processing Adoption
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    {error}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ 
                                        backgroundColor: '#003366', 
                                        color: 'white', 
                                        borderRadius: '12px',
                                        fontFamily: 'Nunito Sans',
                                        '&:hover': { backgroundColor: '#002244' }
                                    }}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </>
                        ) : adoptionSuccess ? (
                            <>
                                <CheckCircleIcon sx={{ fontSize: '60px', color: '#4CAF50', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, color: '#003366', fontWeight: 'bold' }}>
                                    Adoption Confirmed!
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    Thank you for choosing to adopt {pet.pet_name}! 🎉
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    We will deliver {pet.pet_name} to your doorstep within 3-5 business days.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ 
                                        backgroundColor: '#003366', 
                                        color: 'white', 
                                        borderRadius: '12px',
                                        fontFamily: 'Nunito Sans',
                                        '&:hover': { backgroundColor: '#002244' }
                                    }}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="h6" sx={{ mb: 2, color: '#003366', fontWeight: 'bold' }}>
                                    Confirm Your Adoption
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    You're about to adopt {pet.pet_name}!
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    Click "Confirm Adoption" to complete the process.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ 
                                        backgroundColor: '#4CAF50', 
                                        color: 'white', 
                                        borderRadius: '12px',
                                        fontFamily: 'Nunito Sans',
                                        '&:hover': { backgroundColor: '#388E3C' },
                                        mt: 2
                                    }}
                                    onClick={handleConfirmAdoption}
                                >
                                    Confirm Adoption
                                </Button>
                            </>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', color: '#003366', fontWeight: 'bold', fontFamily: 'Nunito Sans' }}>
                Adopt {pet.pet_name}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <img
                        src={petImage}
                        alt={pet.pet_name}
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px' }}
                    />
                </Box>
                <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel sx={{ fontFamily: 'Nunito Sans' }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {renderStepContent(activeStep)}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
                {activeStep > 0 && activeStep < 2 && (
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            borderRadius: '12px',
                            fontFamily: 'Nunito Sans',
                            '&:hover': { backgroundColor: '#d32f2f' }
                        }}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                )}
                {activeStep === 0 && (
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#003366', 
                            color: 'white', 
                            borderRadius: '12px',
                            fontFamily: 'Nunito Sans',
                            '&:hover': { backgroundColor: '#002244' }
                        }}
                        onClick={handleNext}
                        disabled={!formData.userName || !formData.email || !formData.phone || !formData.address}
                    >
                        Next
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AdoptionForm;