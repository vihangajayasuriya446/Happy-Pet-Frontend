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
    InputAdornment,
    useTheme,
    useMediaQuery,
    alpha,
    Container
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Enhanced bird detection
        if (breedLower.includes('bird') ||
            breedLower.includes('parrot') ||
            breedLower.includes('finch') ||
            breedLower.includes('canary') ||
            breedLower.includes('budgie') ||
            breedLower.includes('parakeet') ||
            breedLower.includes('cockatiel') ||
            breedLower.includes('cockatoo') ||
            breedLower.includes('macaw') ||
            breedLower.includes('lovebird')) {
            return 'Bird';
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
                    userMessage: `I'm interested in buying ${petData.name}, the ${petData.breed}. Please contact me with more information.`
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

        setIsSubmitting(true);

        // Ensure we're using the correct petId in the submission
        const finalPetId = selectedPet?.id ? parseInt(selectedPet.id.toString()) :
            formData.petId ? formData.petId :
                petId;

        if (!finalPetId && (selectedPet || petId)) {
            setErrors(prev => ({
                ...prev,
                userMessage: 'No pet selected. Please select a pet first.'
            }));
            setIsSubmitting(false);
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
        } finally {
            setIsSubmitting(false);
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

    // Helper function to get pet emoji
    const getPetEmoji = (petType: string | undefined): string => {
        const type = petType?.toLowerCase() || '';
        if (type.includes('dog')) return '🐕';
        if (type.includes('cat')) return '🐈';
        if (type.includes('bird')) return '🦜';
        return '🐾';
    };

    return (
        <Box sx={{ bgcolor: '#003366', minHeight: '100vh', padding: 2 }}>
            <Container maxWidth="lg">
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, md: 4 },
                        borderRadius: '16px',
                        bgcolor: '#ffffff',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {/* Decorative accent */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: 'linear-gradient(90deg, #003366 0%, #0066cc 100%)'
                        }}
                    />

                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: '#003366',
                            mb: 3,
                            mt: 1,
                            position: 'relative'
                        }}
                    >
                        {isEdit ? 'Edit Contact Information' :
                            selectedPet ? `Contact About ${selectedPet.name}` :
                                petId ? `Contact About Pet #${petId}` : 'Contact Us'}
                    </Typography>

                    {/* Display pet information if available */}
                    {selectedPet && (
                        <Box sx={{ mb: 4 }}>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                p: 0,
                                mb: 3,
                                bgcolor: 'transparent',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: alpha(theme.palette.primary.main, 0.2)
                            }}>
                                <Box sx={{
                                    width: { xs: '100%', sm: '40%' },
                                    height: { xs: 200, sm: 180 },
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        image={selectedPet.imageUrl || '/default-pet-image.jpg'}
                                        alt={selectedPet.name}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 10,
                                        bgcolor: alpha('#000', 0.6),
                                        color: 'white',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '12px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}>
                                        <span>{getPetEmoji(selectedPet.petType || derivePetTypeFromBreed(selectedPet.breed))}</span>
                                        {selectedPet.petType || derivePetTypeFromBreed(selectedPet.breed)}
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    p: 3,
                                    width: { xs: '100%', sm: '60%' }
                                }}>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                                        {selectedPet.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#555555', mb: 0.5 }}>
                                        <strong>Breed:</strong> {selectedPet.breed}
                                    </Typography>
                                    {selectedPet.gender && (
                                        <Typography variant="body2" sx={{ color: '#555555', mb: 0.5 }}>
                                            <strong>Gender:</strong> {selectedPet.gender}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" sx={{ color: '#555555', mb: 1 }}>
                                        <strong>Birth Year:</strong> {selectedPet.birthYear}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            mt: 1,
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        {formatPriceLKR(selectedPet.price)}
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    )}

                    {/* Display petId if no pet data but petId is available */}
                    {!selectedPet && petId && (
                        <Box sx={{
                            mb: 4,
                            p: 3,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: '12px',
                            border: '1px solid',
                            borderColor: alpha(theme.palette.primary.main, 0.2)
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PetsOutlinedIcon color="primary" />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    You are inquiring about pet with ID: <strong>{petId}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Your Name"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    error={!!errors.userName}
                                    helperText={errors.userName}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    error={!!errors.userEmail}
                                    helperText={errors.userEmail}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlineIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
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
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneOutlinedIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
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
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeOutlinedIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="message"
                                    name="message"
                                    label="Your Message"
                                    multiline
                                    rows={4}
                                    value={formData.userMessage}
                                    onChange={handleChange}
                                    error={!!errors.userMessage}
                                    helperText={errors.userMessage}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5, mr: 1 }}>
                                                <MessageOutlinedIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            {(isEdit || selectedPet || petId) && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleCancel}
                                    fullWidth={isMobile}
                                    sx={{
                                        borderRadius: '10px',
                                        py: 1.2,
                                        borderWidth: '2px',
                                        '&:hover': {
                                            borderWidth: '2px'
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                fullWidth={isMobile}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white',
                                    borderRadius: '10px',
                                    py: 1.2,
                                    fontWeight: 600,
                                    boxShadow: '0 4px 10px rgba(0,51,102,0.2)',
                                    '&:hover': {
                                        bgcolor: '#002244',
                                        boxShadow: '0 6px 15px rgba(0,51,102,0.3)',
                                    }
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : (isEdit ? 'Update' : 'Send Message')}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default UserDetailsForm;
