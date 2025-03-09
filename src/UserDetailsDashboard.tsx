import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import UserDetailsTable from './UserDetailsTable';
import UserDetailsForm from './UserDetailsForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllUsers, createUser, updateUser, deleteUser } from './UserService';
import { UserDetails } from './types';
import { useNavigate } from 'react-router-dom';

const UserDetailsDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // Add state for notifications
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  // Use fetchAllUsers from your service
  const { data: users = [], isLoading, error } = useQuery<UserDetails[], Error>({
    queryKey: ['users'],
    queryFn: fetchAllUsers
  });

  // Use createUser from your service
  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSubmitted(true);
      resetForm();
      showNotification('User added successfully!', 'success');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error('Error adding user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add user. Please try again.';
      showNotification(errorMessage, 'error');
    }
  });

  // Use updateUser from your service
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSubmitted(true);
      setIsEdit(false);
      resetForm();
      showNotification('User updated successfully!', 'success');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user. Please try again.';
      showNotification(errorMessage, 'error');
    }
  });

  // Use deleteUser from your service
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification('User deleted successfully!', 'success');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete user. Please try again.';
      showNotification(errorMessage, 'error');
    }
  });

  const addUser = (data: UserDetails) => {
    addUserMutation.mutate(data);
  };

  const updateUserHandler = (data: UserDetails) => {
    if (!data.user_id) {
      console.error('Cannot update user without ID');
      showNotification('User ID is missing. Cannot update.', 'error');
      return;
    }
    updateUserMutation.mutate(data);
  };

  const deleteUserHandler = (user: UserDetails) => {
    if (!user || !user.user_id) {
      console.error('Cannot delete user without ID');
      showNotification('User ID is missing. Cannot delete.', 'error');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(Number(user.user_id));
    }
  };

  const handleSelectUser = (user: UserDetails) => {
    console.log('Selected user for editing:', user);
    // Create a deep copy to avoid reference issues
    setSelectedUser(JSON.parse(JSON.stringify(user)));
    setIsEdit(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setSubmitted(false);
  };

  const goToPetManagementDashboard = () => {
    navigate('/admin/pets');
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: 'auto', mt: 10, p: 2 }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4, 
          flexWrap: 'wrap'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#002855', 
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          User Management Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToPetManagementDashboard}
          sx={{ textTransform: 'none', borderRadius: '4px' }}
        >
          Pet Management Dashboard
        </Button>
      </Box>

      {/* Form */}
      <UserDetailsForm
        addUser={addUser}
        updateUser={updateUserHandler}
        submitted={submitted}
        data={selectedUser || undefined}
        isEdit={isEdit}
        resetForm={resetForm}
      />

      {/* Table */}
      <Box sx={{ mt: 4, overflowX: 'auto' }}>
        <UserDetailsTable 
          rows={users} 
          selectedUser={handleSelectUser} 
          deleteUser={deleteUserHandler}
          isLoading={isLoading}
          error={error ? error.message : null} 
        />
      </Box>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDetailsDashboard;