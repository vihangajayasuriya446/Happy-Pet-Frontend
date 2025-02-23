import React from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Success icon

interface Pet {
    name: string;
    image: string;
    text: string;
}

interface AdoptionFormProps {
    pet: Pet;
    onClose: () => void;
    onSubmit: (formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }) => void;
}

const steps = ['Your Details', 'Terms & Conditions', 'Confirmation'];

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    const handleConfirmAdoption = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(formData); // Submit the form data
            setIsSubmitting(false);
        }, 2000); // Simulate a 2-second delay for submission
    };

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
                            name="name"
                            value={formData.name}
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
                            1. By adopting {pet.name}, you agree to provide a safe and loving home.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            2. You agree to cover all necessary expenses, including food, medical care, and grooming.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            3. You understand that {pet.name} will be delivered to your doorstep within 3-5 business days.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                            4. If you can no longer care for {pet.name}, you agree to return them to our shelter.
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
                        ) : (
                            <>
                                <CheckCircleIcon sx={{ fontSize: '60px', color: '#4CAF50', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, color: '#003366', fontWeight: 'bold' }}>
                                    Adoption Confirmed!
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    Thank you for choosing to adopt {pet.name}! 🎉
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                                    We will deliver {pet.name} to your doorstep within 3-5 business days.
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
                                    onClick={handleConfirmAdoption}
                                >
                                    Close
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
                Adopt {pet.name}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <img
                        src={pet.image}
                        alt={pet.name}
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
                        disabled={!formData.name || !formData.email || !formData.phone || !formData.address}
                    >
                        Next
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AdoptionForm;