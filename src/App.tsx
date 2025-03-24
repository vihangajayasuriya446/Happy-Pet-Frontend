import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
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
import PetManagementDashboard from "./PetManagementDashboard";
import AdoptionPage from './AdoptionPage';
import UserDetailsDashboard from './UserDetailsDashboard';
import UserDetailsDashboard1 from "./components/UserDetailsDashboard";
import Pets from './Pets';
import AboutUs from './AboutUs';
import { CartProvider } from './contexts/CartContext'; // Adjust the path as needed
import ResponsesPage from './ResponsesPage';
import SupportPage from './SupportPage';
import PaymentPage from './components/PaymentPage';
import DialogPayment from './components/DialogPayment';

const App: React.FC = () => {
  return (
    <CartProvider>
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
          <Route path="/supports" element={<SupportPage />} />
          <Route path="/owners" element={<OwnerTable />} />
          <Route path="/adopt" element={<AdoptionPage />} />
          <Route path="/dashboard1" element={<Pets/>} />
          <Route path="/contactusresponses" element={<ResponsesPage/>} />
          <Route path="/user-dashboard" element={<UserDetailsDashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dialog-payment" element={<DialogPayment isOpen={true} onClose={() => {}} amountToPay={50} />} />
        
                       
                        <Route path="/buy" element={<BuyPetPage />} />
                        <Route path="/contact-owner/:petId" element={<UserDetailsDashboard1 />} />
                        <Route path="/contact" element={<UserDetailsDashboard1 />} />
                        <Route path="/admin/pets" element={<PetManagementDashboard />} />
                        <Route path="/admindb" element={<Navigate to="/admin/pets" replace />} />
                        
        </Routes>
        <Footer />
      </Box>
    </Router>
    </CartProvider>
  );
};

export default App;
