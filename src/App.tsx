import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import Pets from './Pets';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
import AdoptionPage from './AdoptionPage';
import UserDetailsDashboard from './UserDetailsDashboard';

import { Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/petdashboard" element={<Pets />} />
          <Route path="/adopt" element={<AdoptionPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/user-dashboard" element={<UserDetailsDashboard />} />
          {/* Redirect from /dashboard to /petdashboard */}
          <Route path="/dashboard" element={<Navigate to="/petdashboard" replace />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;