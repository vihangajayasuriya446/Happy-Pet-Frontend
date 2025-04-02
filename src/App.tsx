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
import { CartProvider } from './contexts/CartContext';
import ScrollToTop from '../src/components/ScrollTop';
import ResponsesPage from './ResponsePage';
import SupportUsPage from './SupportUs';
import PetLoversChecklist from './Checkilst';
import PetAgeCalculator from './PetageCal';
import FAQPage from './FAQ';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',       // Ensures full viewport width
            margin: 0,             // Removes default margin
            padding: 0,            // Removes default padding
            overflowX: 'hidden',   // Prevents horizontal scroll
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              flex: 1,           // Takes remaining space
              width: '100%',      // Ensures full width
              py: 2,              // Optional padding
            }}
          >
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
              <Route path="/supportus" element={<SupportUsPage/>} />
              <Route path="/checklist" element={<PetLoversChecklist/>} />
              <Route path="/petagecalculator" element={<PetAgeCalculator/>} />
              <Route path="/FAQ" element={<FAQPage/>} />
              <Route path="/dialog-payment" element={<DialogPayment isOpen={true} onClose={() => {}} />} />
            </Routes>
          </Box>
          <Footer /> {/* Footer will now span 100% width */}
        </Box>
      </Router>
    </CartProvider>
  );
};

export default App;