import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sidebar from './Sidebar'; // Adjust the import path as necessary

const AdminDashboardNav: React.FC = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar state
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding={4}
      >
        <Box
          border={1}
          borderColor="divider"
          borderRadius={4}
          padding={6}
          maxWidth={600}
          textAlign="center"
          boxShadow={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.59)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 12,
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#0000b3",
              marginBottom: 4,
            }}
          >
            Welcome to Admin Panel
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "black",
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            This admin dashboard allows you to manage various operations, including adding pets, featuring them, and viewing user activities.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "black",
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: 4,
            }}
          >
            To open the admin dashboard, click the{' '}
            <KeyboardArrowRightIcon
              fontSize="small"
              sx={{ verticalAlign: 'middle', color: "black" }}
            />{' '}
            icon located on the left side of the screen.
          </Typography>
          <IconButton
            aria-label="open admin dashboard"
            color="primary"
            onClick={toggleSidebar} // Use toggleSidebar here
            sx={{
              backgroundColor: "#0000b3",
              color: "white",
              '&:hover': {
                backgroundColor: "#000066",
              },
            }}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar here */}
    </>
  );
};

export default AdminDashboardNav;