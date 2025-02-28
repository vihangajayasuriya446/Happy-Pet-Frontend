import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import Users from './Pets';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
import AdoptionPage from './AdoptionPage';


const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Users />} />
          <Route path="/adopt" element={<AdoptionPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;