import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    Card,
    CardMedia,
    Divider
} from '@mui/material';

// Updated interface to match backend model
export interface UserInquiry {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId?: number;
    submissionDate?: string;
}

// Interface for pet data from localStorage
interface PetData {
    id: number;
    name: string;
    breed: string;
    price: number | string;
    gender?: string;
    birthYear: number | string;
    imageUrl: string;
}

interface UserDetailsFormProps {
    addInquiry: (inquiry: Omit<UserInquiry, 'id'>) => Promise<void>;
    updateInquiry: (inquiry: UserInquiry) => Promise<void>;
    submitted: boolean;
    data: UserInquiry | null;
    isEdit: boolean;
    resetForm: () => void;
    petId?: number;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
                                                             addInquiry,
                                                             updateInquiry,
                                                             submitted,
                                                             data,
                                                             isEdit,
                                                             resetForm,
                                                             petId
                                                         }) => {
    const initialFormState: UserInquiry = {
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    };

    const [formData, setFormData] = useState<UserInquiry>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof UserInquiry, string>>>({});
    const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

    // Load pet data from localStorage on component mount
    useEffect(() => {
        const petDataString = localStorage.getItem('selectedPet');
        if (petDataString) {
            try {
                const petData = JSON.parse(petDataString) as PetData;
                setSelectedPet(petData);

                // Pre-populate message with pet info
                setFormData(prev => ({
                    ...prev,
                    petId: petData.id,
                    message: `I'm interested in adopting ${petData.name}, the ${petData.breed}. Please contact me with more information.`
                }));
            } catch (error) {
                console.error('Error parsing pet data from localStorage:', error);
            }
        }
    }, []);

    // Reset form when submitted is true
    useEffect(() => {
        if (submitted) {
            setFormData(initialFormState);
            setErrors({});
            // Clear the localStorage after submission
            localStorage.removeItem('selectedPet');
            setSelectedPet(null);
        }
    }, [submitted]);

    // Update form data when editing an existing inquiry
    useEffect(() => {
        if (data) {
            setFormData(data);
        } else if (!selectedPet) {
            setFormData(initialFormState);
        }
    }, [data]);

    // Optionally pre-populate message with pet info from props
    useEffect(() => {
        if (petId && !selectedPet) {
            setFormData(prev => ({
                ...prev,
                petId: petId,
                message: `I'm interested in learning more about the pet with ID: ${petId}`
            }));
        }
    }, [petId, selectedPet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is modified
        if (errors[name as keyof UserInquiry]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserInquiry, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const inquiryData = {
            ...formData,
            petId: selectedPet?.id || petId,
        };

        if (isEdit && formData.id) {
            await updateInquiry(inquiryData);
        } else {
            await addInquiry(inquiryData);
        }
    };

    const handleCancel = () => {
        resetForm();
        setFormData(initialFormState);
        setErrors({});
        localStorage.removeItem('selectedPet');
        setSelectedPet(null);
    };

    // Helper function to format price
    const formatPriceLKR = (price: number | string): string => {
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        return `LKR ${numericPrice.toFixed(0)}/=`;
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: '8px', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
                {isEdit ? 'Edit Contact Information' :
                    selectedPet ? `Contact About ${selectedPet.name}` :
                        petId ? `Contact About Pet #${petId}` : 'Contact Information'}
            </Typography>

            {/* Display pet information if available */}
            {selectedPet && (
                <Box sx={{ mb: 3 }}>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        p: 2,
                        mb: 2,
                        bgcolor: '#f0f7ff',
                        borderRadius: '8px'
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: { xs: '100%', sm: 120 },
                                height: { xs: 160, sm: 120 },
                                borderRadius: '8px',
                                objectFit: 'cover',
                                mr: { sm: 2 }
                            }}
                            image={selectedPet.imageUrl || '/default-pet-image.jpg'}
                            alt={selectedPet.name}
                        />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            mt: { xs: 2, sm: 0 },
                            width: { xs: '100%', sm: 'auto' }
                        }}>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                {selectedPet.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#555555' }}>
                                {selectedPet.breed}
                            </Typography>
                            {selectedPet.gender && (
                                <Typography variant="body2" sx={{ color: '#555555' }}>
                                    {selectedPet.gender}
                                </Typography>
                            )}
                            <Typography variant="body2" sx={{ color: '#555555' }}>
                                Birth Year: {selectedPet.birthYear}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                                {formatPriceLKR(selectedPet.price)}
                            </Typography>
                        </Box>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                </Box>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="message"
                            name="message"
                            label="Message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors.message}
                            helperText={errors.message}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    {(isEdit || selectedPet) && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            bgcolor: '#003366',
                            '&:hover': {
                                bgcolor: '#002244',
                            }
                        }}
                    >
                        {isEdit ? 'Update' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserDetailsForm;
