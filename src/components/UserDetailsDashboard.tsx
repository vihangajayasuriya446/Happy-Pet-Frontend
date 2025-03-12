import React, { useState } from 'react';
import {
    Box,
    Button,
    Snackbar,
    Alert,
    Typography,
    Paper,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { InquiryService } from '../services/InquiryService';
import UserDetailsForm, { UserInquiry } from './UserDetailsForm';


// Define interfaces
interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

const UserDetailsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [selectedInquiry, setSelectedInquiry] = useState<UserInquiry | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const addInquiry = async (formData: Omit<UserInquiry, 'id'>) => {
        setIsLoading(true);
        try {
            // Call the API service to create a new inquiry
            await InquiryService.createInquiry(formData);

            setSubmitted(true);
            showSnackbar('Your inquiry has been sent successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            showSnackbar('Failed to send inquiry', 'error');
            console.error("Error sending inquiry:", err);
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

            // Call the API service to update an existing inquiry
            await InquiryService.updateInquiry(formData);

            setSubmitted(true);
            showSnackbar('Inquiry updated successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
            setSelectedInquiry(null);
        } catch (err) {
            showSnackbar('Failed to update inquiry', 'error');
            console.error("Error updating inquiry:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Navigation function to the pet management dashboard
    const goToPetManagementDashboard = () => {
        // Navigate to the route where AddPetForm is rendered
        navigate('/admin/pets');
    };

    const resetForm = () => {
        setSelectedInquiry(null);
        setSubmitted(false);
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ width: '100%', margin: 'auto', p: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#002855',
                    color: 'white',
                    p: 2,
                    mb: 3,
                    borderRadius: '8px',
                    position: 'relative',
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        width: '100%'
                    }}
                >
                    Contact Us
                </Typography>

                <Box sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                    <Button
                        variant="contained"
                        onClick={goToPetManagementDashboard}
                        startIcon={<DashboardIcon />}
                        sx={{
                            bgcolor: 'white',
                            color: '#003366',
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                color: '#002244',
                            },
                            textTransform: 'none',
                            fontWeight: 'medium',
                            px: 2,
                            borderRadius: '4px'
                        }}
                    >
                        Pet Buy Management Dashboard
                    </Button>
                </Box>
            </Paper>

            {isLoading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <UserDetailsForm
                    addInquiry={addInquiry}
                    updateInquiry={updateInquiry}
                    submitted={submitted}
                    data={selectedInquiry}
                    isEdit={!!selectedInquiry}
                    resetForm={resetForm}
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

export default UserDetailsDashboard;
