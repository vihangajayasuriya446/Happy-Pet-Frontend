import React, { useState } from 'react';
import Sidebar from './Sidebar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  TextField,
  Drawer,
  InputAdornment, Tooltip, IconButton
} from '@mui/material';
import UserDetailsTable from './UserDetailsTable';
import UserDetailsForm from './UserDetailsForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllAdoptions, updateAdoptionStatus, deleteAdoption } from './UserService';
import { Adoption } from './types';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from "@mui/icons-material/Pets";


const UserDetailsDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedAdoption, setSelectedAdoption] = useState<Adoption | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add state for notifications
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Use fetchAllAdoptions from your service
  const { data: adoptions = [], isLoading, error } = useQuery<Adoption[], Error>({
    queryKey: ['adoptions'],
    queryFn: fetchAllAdoptions,
  });

  // Use updateAdoptionStatus from your service
  const updateAdoptionMutation = useMutation({
    mutationFn: updateAdoptionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adoptions'] });
      setSubmitted(true);
      setIsEdit(false);
      setIsDrawerOpen(false); // Close the drawer after successful update
      resetForm();
      showNotification('Adoption status updated successfully!', 'success');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error('Error updating adoption:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update adoption. Please try again.';
      showNotification(errorMessage, 'error');
    },
  });

  // Use deleteAdoption from your service
  const deleteAdoptionMutation = useMutation({
    mutationFn: deleteAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adoptions'] });
      showNotification('Adoption request deleted successfully!', 'success');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error('Error deleting adoption:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete adoption. Please try again.';
      showNotification(errorMessage, 'error');
    },
  });

  const updateAdoptionHandler = (data: Adoption) => {
    if (!data.adoption_id) {
      console.error('Cannot update adoption without ID');
      showNotification('Adoption ID is missing. Cannot update.', 'error');
      return;
    }
    updateAdoptionMutation.mutate(data);
  };

  const deleteAdoptionHandler = (adoption: Adoption) => {
    if (!adoption || !adoption.adoption_id) {
      console.error('Cannot delete adoption without ID');
      showNotification('Adoption ID is missing. Cannot delete.', 'error');
      return;
    }

    if (window.confirm(`Are you sure you want to delete this adoption request from ${adoption.user_name}?`)) {
      deleteAdoptionMutation.mutate(Number(adoption.adoption_id));
    }
  };

  const handleSelectAdoption = (adoption: Adoption) => {
    console.log('Selected adoption for editing:', adoption);
    // Create a deep copy to avoid reference issues
    setSelectedAdoption(JSON.parse(JSON.stringify(adoption)));
    setIsEdit(true);
    setIsDrawerOpen(true); // Open the drawer when selecting an adoption
  };

  const resetForm = () => {
    setSelectedAdoption(null);
    setIsEdit(false);
    setSubmitted(false);
  };

  const goToPetManagementDashboard = () => {
    navigate('/dashboard1');
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  // Function to handle opening the form in the drawer
  const handleOpenForm = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Box
      sx={{
        py: 1,
        paddingTop: "5px",
      }}
    >
      <Box bgcolor="rgba(255, 255, 255, 0.7)"
        sx={{ width: '100%', maxWidth: '1200px', margin: 'auto', mt: 10, p: 2, borderRadius: '10px' }}>
        {/* Header with Search Bar, Button, and Menu Icon */}
        {/* <Typography
          variant="h5"
          sx={{
            color: "#002855",
            fontWeight: "bold",
          }}
        >
          Pet Adoptions
        </Typography> */}


        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#003366",
            p: 2,
            borderRadius: "8px",
            mb: 3,
            textAlign: "center",
            width: "98%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <PetsIcon sx={{ fontSize: 32 }} />
          Pet Adoptions
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        ><Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Tooltip title="Admin Dashboard">
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{
                position: "fixed",
                left: isSidebarOpen ? 240 : 16, // Adjust position based on sidebar state
                top: 60, // Increased top value to move the icon further down
                zIndex: 1300, // High zIndex to ensure it's above other content
                '& svg': {
                  fontSize: '2rem',
                  color: "black"
                },
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(28, 34, 225, 0.61)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Tooltip>
          {/* Search Bar with transparency */}
          <TextField
            placeholder="Search Applicant"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Add User Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
              sx={{ textTransform: 'none', borderRadius: '4px' }}
              startIcon={<AddIcon />}
            >
              Add User
            </Button>
          </Box>
        </Box>

        {/* Drawer */}
        <Drawer
          anchor="right" // Set the drawer to appear from the right
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)} // Function to close the drawer
        >
          <Box sx={{ width: 600, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#002855', fontWeight: 'bold', textAlign: 'center' }}>
              {isEdit ? 'Update Adoption Application Status' : 'Create Adoption Application'}
            </Typography>
            <UserDetailsForm
              updateAdoption={updateAdoptionHandler}
              submitted={submitted}
              data={selectedAdoption || undefined}
              isEdit={isEdit}
              resetForm={resetForm}
            />
          </Box>
        </Drawer>

        {/* Table */}
        <Box sx={{ mt: 4, overflowX: 'auto' }}>
          <UserDetailsTable
            rows={adoptions.filter(
              (row) =>
                row.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.pet_name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            selectedAdoption={handleSelectAdoption}
            deleteAdoption={deleteAdoptionHandler}
            isLoading={isLoading}
            error={error ? error.message : null}
          />
        </Box>

        {/* Pet Management Dashboard button moved to the right side below the table */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={goToPetManagementDashboard}
            sx={{ textTransform: 'none', borderRadius: '4px' }}
          >
            Pet Adoption Details
          </Button>
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
    </Box>
  );
};

export default UserDetailsDashboard;