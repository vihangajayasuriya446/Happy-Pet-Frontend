import React, { useState, useEffect } from 'react';
import {
    Box,
   
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { InquiryService } from '../services/InquiryService';
import UserDetailsForm, { UserInquiry } from './UserDetailsForm';

// Define interfaces
interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

const UserDetailsDashboard1: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedInquiry, setSelectedInquiry] = useState<UserInquiry | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [petId, setPetId] = useState<number | undefined>(undefined);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });

    // Scroll to the top of the page when the component mounts or updates
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Extract petId from URL query parameters if present
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const petIdParam = queryParams.get('petId');

        if (petIdParam) {
            const parsedPetId = parseInt(petIdParam, 10);
            if (!isNaN(parsedPetId)) {
                setPetId(parsedPetId);
                console.log(`Pet ID ${parsedPetId} extracted from URL`);
            }
        }
    }, [location.search]);

    // Helper function to derive pet type from breed
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
            breedLower.includes('labrador')) {
            return 'Dog';
        }

        // Check for common cat breeds/terms
        if (breedLower.includes('cat') ||
            breedLower.includes('kitten') ||
            breedLower.includes('persian') ||
            breedLower.includes('siamese') ||
            breedLower.includes('bengal') ||
            breedLower.includes('ragdoll') ||
            breedLower.includes('maine coon')) {
            return 'Cat';
        }

        // Default to the first word of the breed as a fallback
        const firstWord = breed.split(' ')[0];
        return firstWord || 'Pet';
    };

    const addInquiry = async (formData: Omit<UserInquiry, 'id'>) => {
        setIsLoading(true);
        try {
            // Ensure petId is included in the submission if available
            const inquiryWithPetId: Omit<UserInquiry, 'id'> = {
                ...formData,
                petId: formData.petId || petId,
                // Set default status for new inquiries as a specific enum value
                status: 'NEW'
            };

            // Ensure we have a pet type if we have a petId
            if (inquiryWithPetId.petId && !inquiryWithPetId.petType && inquiryWithPetId.petBreed) {
                inquiryWithPetId.petType = derivePetTypeFromBreed(inquiryWithPetId.petBreed);
                console.log(`Derived pet type: ${inquiryWithPetId.petType} from breed: ${inquiryWithPetId.petBreed}`);
            }

            // If we still don't have a pet type but have a petId, try to get it from localStorage
            if (inquiryWithPetId.petId && !inquiryWithPetId.petType) {
                const petDataString = localStorage.getItem('selectedPet');
                if (petDataString) {
                    try {
                        const petData = JSON.parse(petDataString);
                        if (petData.petType) {
                            inquiryWithPetId.petType = petData.petType;
                        } else if (petData.breed) {
                            inquiryWithPetId.petType = derivePetTypeFromBreed(petData.breed);
                        }
                        console.log(`Retrieved pet type from localStorage: ${inquiryWithPetId.petType}`);
                    } catch (error) {
                        console.error('Error parsing pet data from localStorage:', error);
                    }
                }
            }

            // Last resort: set a default pet type if we have a petId
            if (inquiryWithPetId.petId && !inquiryWithPetId.petType) {
                inquiryWithPetId.petType = 'Pet';
                console.log(`Using default pet type: ${inquiryWithPetId.petType}`);
            }

            console.log("Form data being sent:", inquiryWithPetId);

            // Validate required fields
            if (!inquiryWithPetId.userName || !inquiryWithPetId.userEmail || !inquiryWithPetId.userMessage) {
                throw new Error('Please fill in all required fields');
            }

            // Call the API service directly with the form data
            const response = await InquiryService.createInquiry(inquiryWithPetId);
            console.log("API response:", response);

            setSubmitted(true);
            showSnackbar('Your inquiry has been sent successfully', 'success');

            // Clear localStorage after successful submission
            localStorage.removeItem('selectedPet');

            // Clear petId from URL after successful submission
            if (petId) {
                navigate('/contact', { replace: true });
                setPetId(undefined);
            }

            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            console.error("Error sending inquiry:", err);

            // Attempt to extract more meaningful error messages
            let errorMessage = 'Failed to send inquiry';

            if (err instanceof Error) {
                console.error("Error details:", err.stack);
                errorMessage = err.message;

                // Check if this is an Axios error with a server response
                if (errorMessage.includes('Server error:')) {
                    try {
                        // Try to parse the JSON error message for better display
                        const jsonStart = errorMessage.indexOf('{');
                        if (jsonStart > -1) {
                            const jsonPart = errorMessage.substring(jsonStart);
                            const errorData = JSON.parse(jsonPart);
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            }
                        }
                    } catch (parseError) {
                        // If parsing fails, just use the original error message
                        console.warn("Failed to parse error JSON:", parseError);
                    }
                }
            }

            showSnackbar(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const updateInquiry = async (formData: UserInquiry) => {
        setIsLoading(true);
        try {
            if (!formData.id) {
                throw new Error('Inquiry ID is required for updates');
            }

            // Ensure we have a pet type if we have a petId
            const inquiryToUpdate: UserInquiry = { ...formData };

            if (inquiryToUpdate.petId && !inquiryToUpdate.petType && inquiryToUpdate.petBreed) {
                inquiryToUpdate.petType = derivePetTypeFromBreed(inquiryToUpdate.petBreed);
                console.log(`For update, derived pet type: ${inquiryToUpdate.petType} from breed: ${inquiryToUpdate.petBreed}`);
            }

            // If we still don't have a pet type but have a petId, use a default
            if (inquiryToUpdate.petId && !inquiryToUpdate.petType) {
                inquiryToUpdate.petType = 'Pet';
                console.log(`For update, using default pet type: ${inquiryToUpdate.petType}`);
            }

            console.log("Update form data:", inquiryToUpdate);

            // Validate required fields
            if (!inquiryToUpdate.userName || !inquiryToUpdate.userEmail || !inquiryToUpdate.userMessage) {
                throw new Error('Please fill in all required fields');
            }

            // Ensure status is preserved or defaulted to a valid enum value
            inquiryToUpdate.status = inquiryToUpdate.status || 'NEW';

            // Call the API service directly with the form data
            const response = await InquiryService.updateInquiry(inquiryToUpdate);
            console.log("API update response:", response);

            setSubmitted(true);
            showSnackbar('Inquiry updated successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
            setSelectedInquiry(null);
        } catch (err) {
            console.error("Error updating inquiry:", err);

            // Attempt to extract more meaningful error messages
            let errorMessage = 'Failed to update inquiry';

            if (err instanceof Error) {
                console.error("Error details:", err.stack);
                errorMessage = err.message;

                // Check if this is an Axios error with a server response
                if (errorMessage.includes('Server error:')) {
                    try {
                        // Try to parse the JSON error message for better display
                        const jsonStart = errorMessage.indexOf('{');
                        if (jsonStart > -1) {
                            const jsonPart = errorMessage.substring(jsonStart);
                            const errorData = JSON.parse(jsonPart);
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            }
                        }
                    } catch (parseError) {
                        // If parsing fails, just use the original error message
                        console.warn("Failed to parse error JSON:", parseError);
                    }
                }
            }

            showSnackbar(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Navigation function to go back to the "Buy a Pet" page
   
    const resetForm = () => {
        setSelectedInquiry(null);
        setSubmitted(false);

        // Clear localStorage when form is reset
        localStorage.removeItem('selectedPet');

        // Clear petId from URL when form is reset
        if (petId) {
            navigate('/contact', { replace: true });
            setPetId(undefined);
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleFormSubmit = async (formData: Omit<UserInquiry, 'id'>) => {
        setIsLoading(true);
        try {
            // Fall back to the standard endpoint
            await addInquiry(formData);
        } catch (error) {
            console.error("Error in form submission:", error);
            showSnackbar('Failed to submit your inquiry. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitResult = (success: boolean) => {
        if (success) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 100);
        }
    };

    return (
        <Box sx={{ width: '100%', margin: 'auto', p: 2 }}>
            {/* Back button to return to the pet list - now with white styling */}
            <Box sx={{ mb: 3 }}>
                
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <UserDetailsForm
                    addInquiry={handleFormSubmit}
                    updateInquiry={updateInquiry}
                    submitted={submitted}
                    data={selectedInquiry}
                    isEdit={!!selectedInquiry}
                    resetForm={resetForm}
                    petId={petId}
                    onSubmit={handleSubmitResult}
                />
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserDetailsDashboard1;