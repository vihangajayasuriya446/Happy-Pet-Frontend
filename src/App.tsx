import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PaymentPage from './components/PaymentPage';
import DialogPayment from './components/DialogPayment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dialog-payment" element={<DialogPayment isOpen={true} onClose={() => {}} amountToPay={50} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
