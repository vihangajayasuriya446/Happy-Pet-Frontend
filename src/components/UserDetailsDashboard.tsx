import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import UserDetailsTable from './UserDetailsTable';
import UserDetailsForm from './UserDetailsForm';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { UserService, UserDetails } from '../services/UserService';

const UserDetailsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch all users from the API
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const fetchedUsers = await UserService.getAllUsers();
            setUsers(fetchedUsers);
            setError(null);
        } catch (err) {
            setError("Failed to load users. Please try again later.");
            console.error("Error fetching users:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Add a user
    const addUser = async (data: Omit<UserDetails, 'user_id'>) => {
        setIsLoading(true);
        try {
            const newUser = await UserService.createUser(data);
            setUsers([...users, newUser]);
            setSubmitted(true);
            showSnackbar('User added successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            setError("Failed to add user");
            showSnackbar('Failed to add user', 'error');
            console.error("Error adding user:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Update a user
    const updateUser = async (data: UserDetails) => {
        setIsLoading(true);
        try {
            const updatedUser = await UserService.updateUser(data);
            setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
            setSubmitted(true);
            setIsEdit(false);
            showSnackbar('User updated successfully', 'success');
            setTimeout(() => setSubmitted(false), 100);
        } catch (err) {
            setError("Failed to update user");
            showSnackbar('Failed to update user', 'error');
            console.error("Error updating user:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a user
    const deleteUser = async (user: UserDetails) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            setIsLoading(true);
            try {
                await UserService.deleteUser(user.user_id);
                setUsers(users.filter(u => u.user_id !== user.user_id));
                showSnackbar('User deleted successfully', 'success');
            } catch (err) {
                setError("Failed to delete user");
                showSnackbar('Failed to delete user', 'error');
                console.error("Error deleting user:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle selecting a user for editing
    const handleSelectUser = (user: UserDetails) => {
        setSelectedUser(user);
        setIsEdit(true);
    };

    // Reset the form
    const resetForm = () => {
        setSelectedUser(null);
        setIsEdit(false);
        setSubmitted(false);
    };

    const goToPetManagementDashboard = () => {
        navigate('/admin/pets');
    };

    // Show snackbar notification
    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // Handle closing the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return (
        <Box sx={{ width: '100%', margin: 'auto', p: 2 }}>
            {/* Header with navigation button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={goToPetManagementDashboard}
                    startIcon={<DashboardIcon />}
                    sx={{
                        bgcolor: 'white',
                        color: '#003366',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
                    Pet Management Dashboard
                </Button>
            </Box>

            <UserDetailsForm
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser || undefined}
                isEdit={isEdit}
                resetForm={resetForm}
                includeRegisteredDate={true}
            />
            <Box sx={{ mt: 4 }}>
                <UserDetailsTable
                    rows={users}
                    selectedUser={handleSelectUser}
                    deleteUser={deleteUser}
                    isLoading={isLoading}
                    error={error}
                />
            </Box>

            {/* Snackbar for notifications */}
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
