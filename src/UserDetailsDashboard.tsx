// src/components/UserDetailsDashboard.tsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import UserDetailsTable from './UserDetailsTable';
import UserDetailsForm from './UserDetailsForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserDetails } from './types';
import { useNavigate } from 'react-router-dom';

const UserDetailsDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Fetch all users
  const { data: users = [], isLoading, error } = useQuery<UserDetails[], Error>({
    queryKey: ['users'],
    queryFn: async (): Promise<UserDetails[]> => {
      const response = await axios.get<UserDetails[]>('http://localhost:8080/api/v1/users');
      return response.data;
    },
  });

  // Add a user
  const addUserMutation = useMutation({
    mutationFn: async (data: UserDetails) => {
      const response = await axios.post('http://localhost:8080/api/v1/users/add', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSubmitted(true);
    },
  });

  // Update a user
  const updateUserMutation = useMutation({
    mutationFn: async (data: UserDetails) => {
      const response = await axios.put(`http://localhost:8080/api/v1/users/update/${data.user_id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSubmitted(true);
      setIsEdit(false);
    },
  });

  // Delete a user
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`http://localhost:8080/api/v1/users/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Handle adding a user
  const addUser = (data: UserDetails) => {
    addUserMutation.mutate(data);
  };

  // Handle updating a user
  const updateUser = (data: UserDetails) => {
    updateUserMutation.mutate(data);
  };

  // Handle deleting a user
  const deleteUser = (user: UserDetails) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.user_id);
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
    navigate('/admin/pets'); // Adjust the path as needed
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', mt: 4, p: 2 }}>
      {/* Header with navigation button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#002855', fontWeight: 'bold' }}>
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

      <UserDetailsForm
        addUser={addUser}
        updateUser={updateUser}
        submitted={submitted}
        data={selectedUser || undefined}
        isEdit={isEdit}
        resetForm={resetForm}
      />
      <Box sx={{ mt: 4 }}>
        <UserDetailsTable 
          rows={users} 
          selectedUser={handleSelectUser} 
          deleteUser={deleteUser}
          isLoading={isLoading}
          error={error ? error.message : null} 
        />
      </Box>
    </Box>
  );
};

export default UserDetailsDashboard;
