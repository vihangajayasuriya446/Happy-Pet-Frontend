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
import PaymentManagementDashboard from "./PaymentManagementDashboard";
import AdoptionPage from './AdoptionPage';
import UserDetailsDashboard from './UserDetailsDashboard';
import UserDetailsDashboard1 from "./components/UserDetailsDashboard";
import Pets from './Pets';
import AboutUs from './AboutUs';
import PaymentHomePage from './components/PaymentHomePage';
import PaymentPage from './components/CardPayment';
import DialogPayment from './components/DialogPayment';
import { CartProvider } from './contexts/CartContext'; // CHANGES - import the CartProvider
import ScrollToTop from '../src/components/ScrollTop'; // Add this import
import ResponsesPage from './ResponsePage';

const App: React.FC = () => {
  return (
    <CartProvider> {/* CHANGES - wrap the entire app in the CartProvider . This is needed for cart to be used anywhere */}
    <Router>
    <ScrollToTop />
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
          <Route path="/aboutus" element={<AboutUs />} />  
          <Route path="/buy" element={<BuyPetPage />} />
          <Route path="/contact-owner/:petId" element={<UserDetailsDashboard1 />} />
          <Route path="/contact" element={<UserDetailsDashboard1 />} />
          <Route path="/admin/pets" element={<PetManagementDashboard />} />
          <Route path="/admin/payments" element={<PaymentManagementDashboard />} />
          <Route path="/admindb" element={<Navigate to="/admin/pets" replace />} />
          <Route path="/payment-home" element={<PaymentHomePage />} />
          <Route path="/card-payment" element={<PaymentPage />} />
          <Route path="/contactusresponses" element={<ResponsesPage/>} />
          <Route path="/dialog-payment" element={<DialogPayment isOpen={true} onClose={() => {}}  />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
    </CartProvider>
  );
};

export default App;
