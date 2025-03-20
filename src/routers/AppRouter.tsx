import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Checkout";
import PaymentPage from "../PaymentPage";
import DialogPayment from "../DialogPayment";
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