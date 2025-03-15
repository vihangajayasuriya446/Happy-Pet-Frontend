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

// Updated interface to match backend PetInquiry model and InquiryService.ts
export interface UserInquiry {
    id?: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    address: string;
    userMessage: string;
    petId?: number;
    petName?: string;
    petType?: string;
    petBreed?: string;
    inquiryDate?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
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
    petType?: string;
}

interface UserDetailsFormProps {
    addInquiry: (inquiry: Omit<UserInquiry, 'id'>) => Promise<void>;
    updateInquiry: (inquiry: UserInquiry) => Promise<void>;
    submitted: boolean;
    data: UserInquiry | null;
    isEdit: boolean;
    resetForm: () => void;
    petId?: number;
    onSubmit?: (success: boolean) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
                                                             addInquiry,
                                                             updateInquiry,
                                                             submitted,
                                                             data,
                                                             isEdit,
                                                             resetForm,
                                                             petId,
                                                             onSubmit
                                                         }) => {
    const initialFormState: UserInquiry = {
        userName: '',
        userEmail: '',
        userPhone: '',
        address: '',
        userMessage: ''
    };

    const [formData, setFormData] = useState<UserInquiry>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof UserInquiry, string>>>({});
    const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

    // Enhanced function to derive pet type from breed
    const derivePetTypeFromBreed = (breed: string): string => {
        if (!breed) return 'Pet';

        const breedLower = breed.toLowerCase();

        // Check for common dog breeds/terms
        if (breedLower.includes('dog') ||
            breedLower.includes('puppy') ||
            breedLower.includes('retriever') ||
            breedLower.includes('shepherd') ||
            breedLower.includes('terrier') ||
            breedLower.includes('bulldog') ||
            breedLower.includes('poodle') ||
            breedLower.includes('labrador') ||
            breedLower.includes('beagle') ||
            breedLower.includes('rottweiler')) {
            return 'Dog';
        }

        // Check for common cat breeds/terms
        if (breedLower.includes('cat') ||
            breedLower.includes('kitten') ||
            breedLower.includes('persian') ||
            breedLower.includes('siamese') ||
            breedLower.includes('bengal') ||
            breedLower.includes('ragdoll') ||
            breedLower.includes('maine coon') ||
            breedLower.includes('sphynx') ||
            breedLower.includes('british shorthair')) {
            return 'Cat';
        }


        // Default to the first word of the breed as a fallback
        const firstWord = breed.split(' ')[0];
        return firstWord || 'Pet';
    };

    // Load pet data from localStorage on component mount
    useEffect(() => {
        const petDataString = localStorage.getItem('selectedPet');
        if (petDataString) {
            try {
                const petData = JSON.parse(petDataString) as PetData;
                setSelectedPet(petData);

                // Derive pet type if not available
                const petType = petData.petType || derivePetTypeFromBreed(petData.breed);
                console.log(`Derived pet type: ${petType} from breed: ${petData.breed}`);

                // Pre-populate message with pet info and store pet details
                setFormData(prev => ({
                    ...prev,
                    petId: petData.id,
                    petName: petData.name,
                    petBreed: petData.breed,
                    petType: petType,
                    userMessage: `I'm interested in  buying ${petData.name}, the ${petData.breed}. Please contact me with more information.`
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
            // Map backend field names to form fields if needed
            setFormData({
                ...data,
                // If data comes from backend with different field names, map them here
                userName: data.userName || '',
                userEmail: data.userEmail || '',
                userPhone: data.userPhone || '',
                userMessage: data.userMessage || ''
            });

            // If we're editing and there's no petType but there is a petBreed, derive the type
            if (data.petBreed && !data.petType) {
                const derivedType = derivePetTypeFromBreed(data.petBreed);
                setFormData(prev => ({
                    ...prev,
                    petType: derivedType
                }));
                console.log(`When editing, derived pet type: ${derivedType} from breed: ${data.petBreed}`);
            }
        } else if (!selectedPet && !petId) {
            setFormData(initialFormState);
        }
    }, [data, selectedPet, petId]);

    // Optionally pre-populate message with pet info from props
    useEffect(() => {
        if (petId && !selectedPet && !data) {
            setFormData(prev => ({
                ...prev,
                petId: petId,
                userMessage: prev.userMessage || `I'm interested in learning more about the pet with ID: ${petId}`
            }));
        }
    }, [petId, selectedPet, data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Map form field names to backend field names
        let fieldName = name;
        if (name === 'name') fieldName = 'userName';
        else if (name === 'email') fieldName = 'userEmail';
        else if (name === 'phone') fieldName = 'userPhone';
        else if (name === 'message') fieldName = 'userMessage';

        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        // Clear error when field is modified
        if (errors[fieldName as keyof UserInquiry]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }

        // If changing breed, update pet type automatically
        if (name === 'petBreed') {
            const derivedType = derivePetTypeFromBreed(value);
            setFormData(prev => ({
                ...prev,
                petType: derivedType
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserInquiry, string>> = {};

        if (!formData.userName?.trim()) {
            newErrors.userName = 'Name is required';
        }

        if (!formData.userEmail?.trim()) {
            newErrors.userEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            newErrors.userEmail = 'Email is invalid';
        }

        if (!formData.userPhone?.trim()) {
            newErrors.userPhone = 'Phone number is required';
        }

        if (!formData.userMessage?.trim()) {
            newErrors.userMessage = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Ensure we're using the correct petId in the submission
        const finalPetId = selectedPet?.id ? parseInt(selectedPet.id.toString()) :
            formData.petId ? formData.petId :
                petId;

        if (!finalPetId && (selectedPet || petId)) {
            setErrors(prev => ({
                ...prev,
                userMessage: 'No pet selected. Please select a pet first.'
            }));
            return;
        }

        try {
            console.log("Submitting inquiry data with petId:", finalPetId);

            // Format the data according to what your backend expects
            const inquiryData = {
                ...formData,
                petId: finalPetId,
                // Include pet details if available
                petName: selectedPet?.name || formData.petName,
                petBreed: selectedPet?.breed || formData.petBreed,
                petType: selectedPet?.petType || formData.petType ||
                    (selectedPet?.breed ? derivePetTypeFromBreed(selectedPet.breed) :
                        (formData.petBreed ? derivePetTypeFromBreed(formData.petBreed) : 'Pet')),
                // Set default status for new inquiries
                status: isEdit ? formData.status : 'NEW'
            };

            console.log("Formatted inquiry data:", inquiryData);

            if (isEdit && formData.id) {
                await updateInquiry(inquiryData);
            } else {
                // For new inquiries, create a new object without the id property
                const inquiryDataWithoutId = { ...inquiryData };
                delete inquiryDataWithoutId.id;
                await addInquiry(inquiryDataWithoutId);
            }

            // Notify parent component of successful submission
            if (onSubmit) {
                onSubmit(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error message to user
            setErrors(prev => ({
                ...prev,
                userMessage: 'Failed to submit inquiry. Please try again.'
            }));

            // Notify parent component of failed submission
            if (onSubmit) {
                onSubmit(false);
            }
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
        if (isNaN(numericPrice)) return 'Price not available';
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
                                {selectedPet.petType || derivePetTypeFromBreed(selectedPet.breed)}: {selectedPet.breed}
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

            {/* Display petId if no pet data but petId is available */}
            {!selectedPet && petId && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f7ff', borderRadius: '8px' }}>
                    <Typography variant="body1">
                        You are inquiring about pet with ID: <strong>{petId}</strong>
                    </Typography>
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
                            value={formData.userName}
                            onChange={handleChange}
                            error={!!errors.userName}
                            helperText={errors.userName}
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
                            value={formData.userEmail}
                            onChange={handleChange}
                            error={!!errors.userEmail}
                            helperText={errors.userEmail}
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
                            value={formData.userPhone}
                            onChange={handleChange}
                            error={!!errors.userPhone}
                            helperText={errors.userPhone}
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
                            value={formData.userMessage}
                            onChange={handleChange}
                            error={!!errors.userMessage}
                            helperText={errors.userMessage}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    {(isEdit || selectedPet || petId) && (
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
