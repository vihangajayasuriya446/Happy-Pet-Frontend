import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import MainPage from './MainUser';
import Users from './Users';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
import OwnerForm from './OwnerForm';


const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Users />} />
          <Route path="/matchmaking" element={<MainPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/OwnerForm" element={<OwnerForm />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;