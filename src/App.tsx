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
import OwnerTable from './OwnerTable';
import PetStore from './PetStore';
import PetShowroom from './PetShowroom';
import BuyerForm from './BuyerForm'; // Import the BuyerForm component
import BuyerTable from './BuyerTable';


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
          <Route path="/OwnerForm/:petId" element={<OwnerForm />} /> 
          <Route path="/owners" element={<OwnerTable />} />
          <Route path="/PetStore" element={<PetStore />} />
          <Route path="/PetShowroom" element={<PetShowroom />} />
          {/* Add new routes for BuyerForm and PaymentGateway */}
          <Route path="/buyer-form" element={<BuyerForm />} />
          <Route path="/buyertable" element={<BuyerTable />} />


        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;