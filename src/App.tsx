import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import MainPage from './MainUser';
import Users from './Users';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
import AdminDashboardNav from './AdminDashboardNav';
import Signup from './Signup';
import Login from './Login';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import OwnerForm from './OwnerForm';
import OwnerTable from './OwnerTable';

import User from './Pets';
import AdoptionPage from './AdoptionPage';
import UserDetailsDashboard from './UserDetailsDashboard';
import Pets from './Pets';

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
          <Route path="/admindb" element={<AdminDashboardNav />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/OwnerForm/:petId" element={<OwnerForm />} /> 
          <Route path="/owners" element={<OwnerTable />} />
          <Route path="/adopt" element={<AdoptionPage />} />
          <Route path="/dashboard1" element={<Pets/>} />
          <Route path="/user-dashboard" element={<UserDetailsDashboard />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;