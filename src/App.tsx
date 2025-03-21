import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

import BuyPetPage from "./BuyPetPage";
import UserDetailsDashboard from "./components/UserDetailsDashboard";
import PetManagementDashboard from "./PetManagementDashboard";
import { CartProvider } from "./contexts/CartContext";
import { ContactProvider } from "./contexts/ContactContext";

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
        </Routes>

        <CartProvider>
                <ContactProvider>
                    <Routes>
                        
                        <Route path="/buy" element={<BuyPetPage />} />
                        <Route path="/contact-owner/:petId" element={<UserDetailsDashboard />} />
                        <Route path="/contact" element={<UserDetailsDashboard />} />
                        <Route path="/admin/pets" element={<PetManagementDashboard />} />
                        <Route path="/admindb" element={<Navigate to="/admin/pets" replace />} />
                       
                    </Routes>
                </ContactProvider>
            </CartProvider>
        
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
