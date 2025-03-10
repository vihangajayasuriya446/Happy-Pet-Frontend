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
import UserDetailsForm, { UserDetails } from './UserDetailsForm';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Define interfaces
interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

const UserDetailsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const addUser = async (formData: Omit<UserDetails, 'user_id'>) => {
        setIsLoading(true);
        try {
            // Here you would normally call your API service
            // For example: await UserService.createUser(formData);
            console.log('Adding user with data:', formData); // Use formData to remove the warning

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitted(true);
            showSnackbar('Your message has been sent successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            showSnackbar('Failed to send message', 'error');
            console.error("Error sending message:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (formData: UserDetails) => {
        setIsLoading(true);
        try {
            // Here you would normally call your API service
            // For example: await UserService.updateUser(formData);
            console.log('Updating user with data:', formData); // Use formData to remove the warning

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitted(true);
            showSnackbar('Information updated successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            showSnackbar('Failed to update information', 'error');
            console.error("Error updating information:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const goToPetManagementDashboard = () => {
        navigate('/admin/pets');
    };

    const resetForm = () => {
        setSelectedUser(null);
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
                    addUser={addUser}
                    updateUser={updateUser}
                    submitted={submitted}
                    data={selectedUser}
                    isEdit={!!selectedUser}
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
