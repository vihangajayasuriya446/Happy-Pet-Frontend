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

  const { data: users = [], isLoading, error } = useQuery<UserDetails[], Error>({
    queryKey: ['users'],
    queryFn: async (): Promise<UserDetails[]> => {
      const response = await axios.get<UserDetails[]>('http://localhost:8080/api/v1/users');
      return response.data;
    },
  });

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

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`http://localhost:8080/api/v1/users/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const addUser = (data: UserDetails) => {
    addUserMutation.mutate(data);
  };

  const updateUser = (data: UserDetails) => {
    updateUserMutation.mutate(data);
  };

  const deleteUser = (user: UserDetails) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.user_id);
    }
  };

  const handleSelectUser = (user: UserDetails) => {
    setSelectedUser(user);
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
        updateUser={updateUser}
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
          deleteUser={deleteUser}
          isLoading={isLoading}
          error={error ? error.message : null} 
        />
      </Box>
    </Box>
  );
};

export default UserDetailsDashboard;
