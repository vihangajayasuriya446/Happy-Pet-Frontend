import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import PaymentPage from "../components/PaymentPage";
import DialogPayment from "../components/DialogPayment";
import { useState } from "react";

const AppRouter = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route 
          path="/dialog-payment" 
          element={<DialogPayment isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} amountToPay={50} />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;