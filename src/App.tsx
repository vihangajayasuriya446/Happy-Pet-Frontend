import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import Users from './Pets';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
import AdoptionPage from './AdoptionPage';
import UserDetailsDashboard from './UserDetailsDashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2)',
    '0px 3px 1px -2px rgba(0,0,0,0.14)',
    '0px 3px 3px -2px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2)',
    '0px 3px 5px -1px rgba(0,0,0,0.14)',
    '0px 5px 5px -3px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 5px 8px -4px rgba(0,0,0,0.14)',
    '0px 5px 6px -3px rgba(0,0,0,0.12)',
    '0px 7px 10px -5px rgba(0,0,0,0.2)',
    '0px 8px 10px -4px rgba(0,0,0,0.14)',
    '0px 6px 10px -5px rgba(0,0,0,0.12)',
    '0px 7px 10px -5px rgba(0,0,0,0.2)',
    '0px 8px 10px -4px rgba(0,0,0,0.14)',
    '0px 6px 10px -5px rgba(0,0,0,0.12)',
    '0px 7px 10px -5px rgba(0,0,0,0.2)',
    '0px 8px 10px -4px rgba(0,0,0,0.14)',
    '0px 6px 10px -5px rgba(0,0,0,0.12)',
    '0px 7px 10px -5px rgba(0,0,0,0.2)',
    '0px 8px 10px -4px rgba(0,0,0,0.14)',
    '0px 6px 10px -5px rgba(0,0,0,0.12)',
    '0px 7px 10px -5px rgba(0,0,0,0.2)',
    '0px 8px 10px -4px rgba(0,0,0,0.14)',
    '0px 9px 12px -6px rgba(0,0,0,0.12)'
  ],
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Users />} />
            <Route path="/adopt" element={<AdoptionPage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/user-dashboard" element={<UserDetailsDashboard />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
